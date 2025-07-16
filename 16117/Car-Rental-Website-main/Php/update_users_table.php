<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once(__DIR__ . "/Conn.php");

try {
    $conn = Conn::GetConnection();
    
    // Check if last_login column exists
    $stmt = $conn->prepare("SHOW COLUMNS FROM users LIKE 'last_login'");
    $stmt->execute();
    
    if ($stmt->rowCount() == 0) {
        // Add last_login column if it doesn't exist
        $sql = "ALTER TABLE users ADD COLUMN last_login TIMESTAMP NULL DEFAULT NULL";
        $conn->exec($sql);
        echo "Added last_login column to users table successfully\n";
    } else {
        echo "last_login column already exists\n";
    }
    
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}