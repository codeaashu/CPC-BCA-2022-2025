<?php
session_start();
header('Content-Type: application/json');

// Replace with your actual database credentials
$servername = "sql311.infinityfree.com";
$username = "if0_37331201";
$password = "W33LAgXuWC3JFnI";
$dbname = "if0_37331201_testzone";

// Create DB connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check DB connection
if ($conn->connect_error) {
    echo json_encode(["success" => false, "error" => "Database connection failed."]);
    exit;
}

// Check if request is a password reset
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['reset_password'])) {

    // Check if email is stored from OTP verification step
    if (!isset($_SESSION['reset_email'])) {
        echo json_encode(["success" => false, "error" => "Session expired. Please verify OTP again."]);
        exit;
    }

    $email = $_SESSION['reset_email'];
    $newPassword = $_POST['new_password'] ?? '';

    if (empty($newPassword)) {
        echo json_encode(["success" => false, "error" => "Password cannot be empty."]);
        exit;
    }

    // Optionally hash the password
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

    // Prepare and bind
    $stmt = $conn->prepare("UPDATE teachers SET teacher_pass = ? WHERE teacher_email = ?");
    if (!$stmt) {
        echo json_encode(["success" => false, "error" => "Failed to prepare query."]);
        exit;
    }

    $stmt->bind_param("ss", $hashedPassword, $email);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
        // Optionally unset the session to avoid reuse
        unset($_SESSION['reset_email']);
    } else {
        echo json_encode(["success" => false, "error" => "Failed to update password."]);
    }

    $stmt->close();
    $conn->close();
    exit;
}

echo json_encode(["success" => false, "error" => "Invalid request."]);
