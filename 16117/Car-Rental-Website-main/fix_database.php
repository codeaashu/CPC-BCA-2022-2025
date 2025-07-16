<?php
// fix_database.php
// Run this ONCE to add missing columns to the users table if needed.

require_once __DIR__ . '/Php/Conn.php';

try {
    $conn = Conn::GetConnection();
    $altered = false;
    $messages = [];

    // Check if 'failed_attempts' column exists
    $result = $conn->query("SHOW COLUMNS FROM users LIKE 'failed_attempts'");
    if ($result->rowCount() == 0) {
        $conn->exec("ALTER TABLE users ADD COLUMN failed_attempts INT DEFAULT 0");
        $messages[] = "Added 'failed_attempts' column.";
        $altered = true;
    } else {
        $messages[] = "'failed_attempts' column already exists.";
    }

    // Check if 'last_failed_attempt' column exists
    $result = $conn->query("SHOW COLUMNS FROM users LIKE 'last_failed_attempt'");
    if ($result->rowCount() == 0) {
        $conn->exec("ALTER TABLE users ADD COLUMN last_failed_attempt DATETIME DEFAULT NULL");
        $messages[] = "Added 'last_failed_attempt' column.";
        $altered = true;
    } else {
        $messages[] = "'last_failed_attempt' column already exists.";
    }

    // Check if 'otp_code' column exists
    $result = $conn->query("SHOW COLUMNS FROM users LIKE 'otp_code'");
    if ($result->rowCount() == 0) {
        $conn->exec("ALTER TABLE users ADD COLUMN otp_code VARCHAR(10) DEFAULT NULL");
        $messages[] = "Added 'otp_code' column.";
        $altered = true;
    } else {
        $messages[] = "'otp_code' column already exists.";
    }

    // Check if 'otp_expiry' column exists
    $result = $conn->query("SHOW COLUMNS FROM users LIKE 'otp_expiry'");
    if ($result->rowCount() == 0) {
        $conn->exec("ALTER TABLE users ADD COLUMN otp_expiry DATETIME DEFAULT NULL");
        $messages[] = "Added 'otp_expiry' column.";
        $altered = true;
    } else {
        $messages[] = "'otp_expiry' column already exists.";
    }

    echo '<h3>Database Update Results:</h3><ul>';
    foreach ($messages as $msg) {
        echo '<li>' . htmlspecialchars($msg) . '</li>';
    }
    echo '</ul>';
    if ($altered) {
        echo '<p style="color:green;">Columns added or updated successfully. You can now use admin login and OTP features.</p>';
    } else {
        echo '<p style="color:blue;">No changes were necessary. Columns already exist.</p>';
    }
} catch (PDOException $e) {
    echo '<p style="color:red;">Error: ' . htmlspecialchars($e->getMessage()) . '</p>';
}

// Optional: Remove this file after running for security. 