<?php
session_start();
include 'db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $role = $_POST['role'] ?? '';
    $username = $_POST['username'] ?? '';

    if ($role === 'admin') {
        $sql = "SELECT * FROM bookings ORDER BY id DESC";
        $stmt = $conn->prepare($sql);
    } else {
        $sql = "SELECT * FROM bookings WHERE username = ? ORDER BY id DESC";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $username);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    $bookings = [];
    while ($row = $result->fetch_assoc()) {
        $bookings[] = $row;
    }

    echo json_encode([
        "status" => "success",
        "bookings" => $bookings
    ]);

    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
}
