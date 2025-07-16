<?php
header('Content-Type: application/json');

require_once("Php/Conn.php");
require_once("Php/vehicleClass.php");

try {
    // Get query parameters for filtering and pagination
    $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
    $status = isset($_GET['status']) ? $_GET['status'] : null;
    $location = isset($_GET['location']) ? $_GET['location'] : null;
    
    $offset = ($page - 1) * $limit;
    
    // Build the query
    $query = "SELECT * FROM Vehicles WHERE 1=1";
    $params = [];
    
    if ($status) {
        $query .= " AND Status = :status";
        $params[':status'] = $status;
    }
    
    if ($location) {
        $query .= " AND Location = :location";
        $params[':location'] = $location;
    }
    
    // Add pagination
    $query .= " LIMIT :limit OFFSET :offset";
    $params[':limit'] = $limit;
    $params[':offset'] = $offset;
    
    // Get total count for pagination
    $countQuery = str_replace("*", "COUNT(*) as total", substr($query, 0, strpos($query, 'LIMIT')));
    
    $conn = Conn::GetConnection();
    
    // Get total count
    $countStmt = $conn->prepare($countQuery);
    foreach ($params as $key => $value) {
        if ($key !== ':limit' && $key !== ':offset') {
            $countStmt->bindValue($key, $value);
        }
    }
    $countStmt->execute();
    $totalCount = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];
    
    // Get vehicles
    $stmt = $conn->prepare($query);
    foreach ($params as $key => $value) {
        $stmt->bindValue($key, $value);
    }
    $stmt->execute();
    $vehicles = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Add rental status and availability information
    foreach ($vehicles as &$vehicle) {
        // Check current rentals
        $rentalStmt = $conn->prepare(
            "SELECT * FROM vehicle_rental 
            WHERE vehicle_id = :vehicle_id 
            AND status = 'active' 
            AND end_date >= CURRENT_DATE"
        );
        $rentalStmt->execute([':vehicle_id' => $vehicle['Id']]);
        $currentRental = $rentalStmt->fetch(PDO::FETCH_ASSOC);
        
        $vehicle['is_available'] = !$currentRental && $vehicle['Status'] === 'Available';
        $vehicle['current_rental'] = $currentRental ?: null;
    }
    
    // Prepare response with pagination metadata
    $response = [
        'data' => $vehicles,
        'pagination' => [
            'total' => $totalCount,
            'current_page' => $page,
            'per_page' => $limit,
            'total_pages' => ceil($totalCount / $limit)
        ]
    ];
    
    echo json_encode($response);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => 'Error fetching vehicles: ' . $e->getMessage()
    ]);
}