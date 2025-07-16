<?php
// fix_admin_user.php
// Run this ONCE to ensure the users table and a default admin user exist.

require_once __DIR__ . '/Php/Conn.php';

try {
    $conn = Conn::GetConnection();

    // 1. Check if 'users' table exists
    $tableCheck = $conn->query("SHOW TABLES LIKE 'users'");
    if ($tableCheck->rowCount() == 0) {
        // Table does not exist, create it
        $createTableSQL = "
        CREATE TABLE users (
            Id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            user_type VARCHAR(20) NOT NULL DEFAULT 'user',
            failed_attempts INT DEFAULT 0,
            last_failed_attempt DATETIME DEFAULT NULL,
            last_login DATETIME DEFAULT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        ";
        $conn->exec($createTableSQL);
        echo "<p>Created 'users' table.</p>";
    } else {
        echo "<p>'users' table already exists.</p>";
    }

    // 2. Check if admin user exists
    $adminEmail = 'admin@example.com';
    $adminUsername = 'admin';
    $adminPassword = 'Admin@123'; // Default password
    $hashedPassword = password_hash($adminPassword, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("SELECT * FROM users WHERE email = :email AND user_type = 'admin'");
    $stmt->bindParam(':email', $adminEmail);
    $stmt->execute();
    if ($stmt->rowCount() == 0) {
        // Insert default admin user
        $insert = $conn->prepare("INSERT INTO users (username, email, password, user_type) VALUES (:username, :email, :password, 'admin')");
        $insert->bindParam(':username', $adminUsername);
        $insert->bindParam(':email', $adminEmail);
        $insert->bindParam(':password', $hashedPassword);
        $insert->execute();
        echo "<p>Default admin user created.<br>Email: <b>$adminEmail</b><br>Password: <b>$adminPassword</b></p>";
    } else {
        echo "<p>Admin user already exists with email: <b>$adminEmail</b></p>";
    }

    echo '<p>Done. You can now try logging in as admin.</p>';
} catch (PDOException $e) {
    echo '<p style="color:red;">Error: ' . htmlspecialchars($e->getMessage()) . '</p>';
}

// Optional: Remove this file after running for security. 