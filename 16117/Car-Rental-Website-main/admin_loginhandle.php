<?php
session_start();

error_reporting(E_ALL);
ini_set('display_errors', 1);

include("Php/Conn.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // CSRF Protection
    if (!isset($_SESSION['csrf_token']) || !isset($_POST['csrf_token']) || $_SESSION['csrf_token'] !== $_POST['csrf_token']) {
        error_log("CSRF token validation failed");
        header("Location: Php/admin_login.php?error=system_error");
        exit();
    }

    // Rate limiting
    $ip = $_SERVER['REMOTE_ADDR'];
    $timestamp = time();
    if (!isset($_SESSION['login_attempts'])) {
        $_SESSION['login_attempts'] = array();
    }
    
    // Clean up old attempts
    $_SESSION['login_attempts'] = array_filter($_SESSION['login_attempts'], function($attempt) use ($timestamp) {
        return ($timestamp - $attempt) < 3600; // Keep attempts from last hour
    });
    
    // Check rate limit (10 attempts per hour per IP)
    if (count($_SESSION['login_attempts']) >= 10) {
        error_log("Rate limit exceeded for IP: {$ip}");
        header("Location: Php/admin_login.php?error=too_many_attempts");
        exit();
    }
    
    $_SESSION['login_attempts'][] = $timestamp;

    // Validate and sanitize input
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $password = $_POST["password"];

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        error_log("Invalid email format attempt from IP: {$ip}");
        header("Location: Php/admin_login.php?error=invalid_email");
        exit();
    }

    if (strlen($password) < 6) {
        error_log("Password too short attempt from IP: {$ip}");
        header("Location: Php/admin_login.php?error=invalid_credentials");
        exit();
    }

    try {
        $conn = Conn::GetConnection();
        
        // Check if account is locked
        $stmt = $conn->prepare("SELECT failed_attempts, last_failed_attempt FROM users WHERE email = :email AND user_type = 'admin'");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $user = $stmt->fetch();

        if ($user && $user['failed_attempts'] >= 5 && (time() - strtotime($user['last_failed_attempt'])) < 900) {
            error_log("Locked account access attempt for email: {$email} from IP: {$ip}");
            header("Location: Php/admin_login.php?error=too_many_attempts");
            exit();
        }

        // Specifically check for admin users only
        $stmt = $conn->prepare("SELECT * FROM users WHERE email = :email AND user_type = 'admin'");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            // Reset failed attempts on successful login
            $resetStmt = $conn->prepare("UPDATE users SET failed_attempts = 0, last_failed_attempt = NULL WHERE Id = :user_id");
            $resetStmt->bindParam(':user_id', $user['Id']);
            $resetStmt->execute();

            // Session security enhancements
            session_regenerate_id(true); // Prevent session fixation
            $_SESSION['user_id'] = $user['Id'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['user_name'] = $user['username'];
            $_SESSION['user_type'] = $user['user_type'];
            $_SESSION['last_activity'] = time();
            $_SESSION['ip'] = $ip;
            $_SESSION['user_agent'] = $_SERVER['HTTP_USER_AGENT'];

            // Update last login timestamp
            $updateStmt = $conn->prepare("UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE Id = :user_id");
            $updateStmt->bindParam(':user_id', $user['Id']);
            $updateStmt->execute();

            // Log successful login
            error_log("Admin Login Success: {$user['username']} logged in from {$ip}");

            header("Location: admin.php");
            exit();
        } else {
            if ($user) {
                // Increment failed attempts
                $updateStmt = $conn->prepare("UPDATE users SET failed_attempts = failed_attempts + 1, last_failed_attempt = CURRENT_TIMESTAMP WHERE Id = :user_id");
                $updateStmt->bindParam(':user_id', $user['Id']);
                $updateStmt->execute();

                // Get updated failed attempts count
                $checkStmt = $conn->prepare("SELECT failed_attempts FROM users WHERE Id = :user_id");
                $checkStmt->bindParam(':user_id', $user['Id']);
                $checkStmt->execute();
                $attempts = $checkStmt->fetch();

                if ($attempts['failed_attempts'] >= 5) {
                    error_log("Account locked for email: {$email} after 5 failed attempts from IP: {$ip}");
                }
            }

            // Log failed attempt
            error_log("Admin Login Failed: Attempt for email {$email} from {$ip}");

            header("Location: Php/admin_login.php?error=invalid_credentials");
            exit();
        }
    } catch (PDOException $e) {
        error_log("Admin Login Error: " . $e->getMessage());
        header("Location: Php/admin_login.php?error=system_error");
        exit();
    }
} else {
    // Generate CSRF token for the login form
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    header("Location: Php/admin_login.php");
    exit();
}