<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "Testing database connection...\n";

try {
    // Test connection
    $pdo = new PDO("mysql:host=localhost;dbname=sl_moto", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Database connection successful!\n";

    // Check if tables exist
    $tables = ['Vehicles', 'Rentals', 'Payments', 'users'];
    
    foreach ($tables as $table) {
        $stmt = $pdo->prepare("SHOW TABLES LIKE ?");
        $stmt->execute([$table]);
        if ($stmt->rowCount() > 0) {
            echo "✓ Table '$table' exists\n";
            
            // Show table structure
            $stmt = $pdo->prepare("DESCRIBE $table");
            $stmt->execute();
            $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo "  Columns in $table:\n";
            foreach ($columns as $column) {
                echo "    - {$column['Field']}: {$column['Type']}\n";
            }
        } else {
            echo "✗ Table '$table' does not exist\n";
        }
    }

    // Test inserting a sample rental
    echo "\nTesting rental insertion...\n";
    
    // Check if we have a user and vehicle
    $stmt = $pdo->query("SELECT Id FROM users LIMIT 1");
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    $stmt = $pdo->query("SELECT Id FROM Vehicles LIMIT 1");
    $vehicle = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($user && $vehicle) {
        echo "Found user ID: {$user['Id']}\n";
        echo "Found vehicle ID: {$vehicle['Id']}\n";
        
        // Test rental insertion
        $stmt = $pdo->prepare("INSERT INTO Rentals (vehicle_id, user_id, rental_date, start_date, end_date, duration, total_amount, status, payment_status, customer_name, customer_phone, created_at) VALUES (?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY), DATE_ADD(NOW(), INTERVAL 3 DAY), 2, 1000.00, 'pending', 'pending', 'Test User', '1234567890', NOW())");
        $stmt->execute([$vehicle['Id'], $user['Id']]);
        echo "✓ Test rental inserted successfully\n";
        
        // Clean up test data
        $stmt = $pdo->prepare("DELETE FROM Rentals WHERE customer_name = 'Test User'");
        $stmt->execute();
        echo "✓ Test data cleaned up\n";
    } else {
        echo "No users or vehicles found in database\n";
    }

} catch(PDOException $e) {
    echo "Database Error: " . $e->getMessage() . "\n";
} catch(Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?> 