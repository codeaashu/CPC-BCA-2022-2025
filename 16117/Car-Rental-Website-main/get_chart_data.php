<?php
require_once 'Php/Conn.php';
header('Content-Type: application/json');
try {
    $conn = Conn::GetConnection();
    // Monthly Rentals (last 6 months)
    $labels = [];
    $data = [];
    for ($i = 5; $i >= 0; $i--) {
        $month = date('Y-m', strtotime("-$i months"));
        $labels[] = date('M', strtotime($month.'-01'));
        $stmt = $conn->prepare("SELECT COUNT(*) FROM vehicle_rental WHERE DATE_FORMAT(start_date, '%Y-%m') = ?");
        $stmt->execute([$month]);
        $data[] = (int)$stmt->fetchColumn();
    }
    $rentals = [
        'labels' => $labels,
        'data' => $data
    ];
    // Vehicle Status Distribution
    $statusCounts = [
        'Available' => 0,
        'Rented' => 0,
        'Maintenance' => 0
    ];
    $stmt = $conn->query("SELECT Status, COUNT(*) as cnt FROM Vehicles GROUP BY Status");
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $status = $row['Status'] ?? 'Available';
        if (isset($statusCounts[$status])) {
            $statusCounts[$status] = (int)$row['cnt'];
        }
    }
    $status = [
        'data' => array_values($statusCounts)
    ];
    echo json_encode(['rentals' => $rentals, 'status' => $status]);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
} 