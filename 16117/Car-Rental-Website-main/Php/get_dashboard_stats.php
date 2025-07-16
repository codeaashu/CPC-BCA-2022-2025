<?php
require_once 'Conn.php';

header('Content-Type: application/json');

try {
    $conn = new Conn();
    $pdo = $conn->getConnection();

    // Get total users
    $userQuery = $pdo->query('SELECT COUNT(*) FROM users WHERE role = "user"');
    $totalUsers = $userQuery->fetchColumn();

    // Get total vehicles
    $vehicleQuery = $pdo->query('SELECT COUNT(*) FROM vehicles');
    $totalVehicles = $vehicleQuery->fetchColumn();

    // Get total rentals
    $rentalQuery = $pdo->query('SELECT COUNT(*) FROM rentals');
    $totalRentals = $rentalQuery->fetchColumn();

    // Get total revenue
    $revenueQuery = $pdo->query('SELECT COALESCE(SUM(total_amount), 0) FROM rentals WHERE status = "completed"');
    $totalRevenue = $revenueQuery->fetchColumn();

    // Get monthly rentals (last 6 months)
    $monthlyQuery = $pdo->query('
        SELECT DATE_FORMAT(rental_date, "%Y-%m") as month,
               COUNT(*) as count
        FROM rentals
        WHERE rental_date >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
        GROUP BY month
        ORDER BY month ASC
    ');
    $monthlyRentals = $monthlyQuery->fetchAll(PDO::FETCH_ASSOC);

    // Get vehicle status distribution
    $statusQuery = $pdo->query('
        SELECT status,
               COUNT(*) as count
        FROM vehicles
        GROUP BY status
    ');
    $vehicleStatuses = $statusQuery->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'totalUsers' => $totalUsers,
        'totalVehicles' => $totalVehicles,
        'totalRentals' => $totalRentals,
        'totalRevenue' => $totalRevenue,
        'monthlyRentals' => array_column($monthlyRentals, 'count'),
        'vehicleStatuses' => array_column($vehicleStatuses, 'count', 'status')
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}