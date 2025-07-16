<?php
session_start();

error_reporting(E_ALL);
ini_set('display_errors', 1);

include("Php/Conn.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];

    try {
        $conn = Conn::GetConnection();
        
        // Specifically check for regular users only
        $stmt = $conn->prepare("SELECT * FROM users WHERE email = :email AND user_type = 'user'");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['Id'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['user_name'] = $user['username'];
            $_SESSION['user_type'] = $user['user_type'];

            // Update last login timestamp
            $updateStmt = $conn->prepare("UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE Id = :user_id");
            $updateStmt->bindParam(':user_id', $user['Id']);
            $updateStmt->execute();

            header("Location: Home.php");
            exit();
        } else {
            header("Location: Php/login.php?error=invalid_credentials");
            exit();
        }
    } catch (PDOException $e) {
        error_log("User Login Error: " . $e->getMessage());
        header("Location: Php/login.php?error=system_error");
        exit();
    }
} else {
    header("Location: Php/login.php");
    exit();
}
