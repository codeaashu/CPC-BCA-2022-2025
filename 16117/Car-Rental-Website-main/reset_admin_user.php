<?php
// reset_admin_user.php
// Run this ONCE to create or reset the admin user.

require_once __DIR__ . '/Php/Conn.php';

try {
    $conn = Conn::GetConnection();
    $adminEmail = 'admin@example.com';
    $adminUsername = 'admin';
    $adminPassword = 'Admin@123';
    $hashedPassword = password_hash($adminPassword, PASSWORD_DEFAULT);

    // Check if admin user exists
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = :email AND user_type = 'admin'");
    $stmt->bindParam(':email', $adminEmail);
    $stmt->execute();

    if ($stmt->rowCount() == 0) {
        // Insert new admin user
        $insert = $conn->prepare("INSERT INTO users (username, email, password, user_type) VALUES (:username, :email, :password, 'admin')");
        $insert->bindParam(':username', $adminUsername);
        $insert->bindParam(':email', $adminEmail);
        $insert->bindParam(':password', $hashedPassword);
        $insert->execute();
        echo "<p>Admin user created.<br>Email: <b>$adminEmail</b><br>Password: <b>$adminPassword</b></p>";
    } else {
        // Update existing admin user
        $update = $conn->prepare("UPDATE users SET username = :username, password = :password WHERE email = :email AND user_type = 'admin'");
        $update->bindParam(':username', $adminUsername);
        $update->bindParam(':password', $hashedPassword);
        $update->bindParam(':email', $adminEmail);
        $update->execute();
        echo "<p>Admin user updated.<br>Email: <b>$adminEmail</b><br>Password: <b>$adminPassword</b></p>";
    }
    echo '<p style="color:green;">You can now log in as admin. Please delete this file after use for security.</p>';
} catch (PDOException $e) {
    echo '<p style="color:red;">Error: ' . htmlspecialchars($e->getMessage()) . '</p>';
} 