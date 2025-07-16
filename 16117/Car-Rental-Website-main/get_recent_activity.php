<?php
require_once 'Php/Conn.php';
try {
    $conn = Conn::GetConnection();
    $activities = [];
    // Recent logins
    $stmt = $conn->query("SELECT username, email, last_login FROM users WHERE last_login IS NOT NULL ORDER BY last_login DESC LIMIT 10");
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $activities[] = [
            'type' => 'Login',
            'user' => $row['username'],
            'email' => $row['email'],
            'time' => $row['last_login'],
            'desc' => '<b>' . htmlspecialchars($row['username']) . '</b> (<span style=\'color:#888\'>' . htmlspecialchars($row['email']) . '</span>) logged in.'
        ];
    }
    // Recent rentals
    $stmt = $conn->query("SELECT customer_name, start_date, end_date, created_at FROM vehicle_rental ORDER BY id DESC LIMIT 10");
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $activities[] = [
            'type' => 'Rental',
            'user' => $row['customer_name'],
            'time' => $row['created_at'] ?? $row['start_date'],
            'desc' => '<b>' . htmlspecialchars($row['customer_name']) . '</b> rented a vehicle from <b>' . htmlspecialchars($row['start_date']) . '</b> to <b>' . htmlspecialchars($row['end_date']) . '</b>.'
        ];
    }
    // Recent vehicle additions
    $stmt = $conn->query("SELECT Title, User_Name, Created_At, Id FROM Vehicles ORDER BY Id DESC LIMIT 10");
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $activities[] = [
            'type' => 'Vehicle Added',
            'user' => $row['User_Name'],
            'time' => $row['Created_At'] ?? '',
            'desc' => 'Vehicle <b>' . htmlspecialchars($row['Title']) . '</b> added by <b>' . htmlspecialchars($row['User_Name']) . '</b>.'
        ];
    }
    // Sort all activities by time descending
    usort($activities, function($a, $b) {
        return strtotime($b['time']) <=> strtotime($a['time']);
    });
    $activities = array_slice($activities, 0, 10);
    echo '<ul style="padding-left:20px;">';
    foreach ($activities as $act) {
        echo '<li><span style="font-weight:bold;color:#2196F3;">[' . htmlspecialchars($act['type']) . ']</span> ' . $act['desc'] .
            ' <span style="color:#888;font-size:0.9em;">(' . htmlspecialchars($act['time']) . ')</span></li>';
    }
    echo '</ul>';
} catch (PDOException $e) {
    echo '<p style="color:red;">Error: ' . htmlspecialchars($e->getMessage()) . '</p>';
} 