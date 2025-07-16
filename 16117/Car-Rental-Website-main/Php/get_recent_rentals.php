<?php
require_once 'Conn.php';

header('Content-Type: application/json');

try {
    $conn = new Conn();
    $pdo = $conn->getConnection();

    // Get the 5 most recent rentals with vehicle and user information
    $query = $pdo->query('
        SELECT r.id as rentalId,
               r.rental_date as rentalDate,
               r.status,
               v.title as vehicleName,
               u.username as userName
        FROM rentals r
        JOIN vehicles v ON r.vehicle_id = v.id
        JOIN users u ON r.user_id = u.id
        ORDER BY r.rental_date DESC
        LIMIT 5
    ');

    $rentals = $query->fetchAll(PDO::FETCH_ASSOC);

    // Format the response
    $formattedRentals = array_map(function($rental) {
        return [
            'rentalId' => $rental['rentalId'],
            'rentalDate' => $rental['rentalDate'],
            'status' => ucfirst(strtolower($rental['status'])),
            'vehicleName' => $rental['vehicleName'],
            'userName' => $rental['userName']
        ];
    }, $rentals);

    echo json_encode($formattedRentals);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}