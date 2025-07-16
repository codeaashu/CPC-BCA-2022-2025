<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    // First connect without database selection
    $pdo = new PDO("mysql:host=localhost", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Create database if not exists
    $pdo->exec("CREATE DATABASE IF NOT EXISTS sl_moto");
    $pdo->exec("USE sl_moto");
    
    // Create Vehicles table if it doesn't exist
    $sql = "CREATE TABLE IF NOT EXISTS Vehicles (
        Id INT AUTO_INCREMENT PRIMARY KEY,
        Title VARCHAR(255) NOT NULL,
        Description TEXT,
        Location VARCHAR(255),
        Price DECIMAL(10,2) NOT NULL,
        Phone_Number VARCHAR(20),
        Time_Duration INT,
        User_Name VARCHAR(255),
        User_Email VARCHAR(255),
        Image VARCHAR(255),
        Status VARCHAR(50) DEFAULT 'not rented yet',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    $pdo->exec($sql);
    echo "Vehicles table checked/created successfully\n";

    // Now include the connection class for further operations
    require_once(__DIR__ . "/Conn.php");
    $conn = Conn::GetConnection();
    
    if (!$conn) {
        throw new Exception("Database connection failed");
    }
    
    echo "Connected to database successfully\n";

    // Create Rentals table first
    $sql = "CREATE TABLE IF NOT EXISTS Rentals (
        id INT AUTO_INCREMENT PRIMARY KEY,
        vehicle_id INT NOT NULL,
        user_id INT NOT NULL,
        rental_date DATE NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        duration INT NOT NULL,
        total_amount DECIMAL(12,2) NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        payment_status VARCHAR(20) DEFAULT 'pending',
        payment_id INT,
        customer_name VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(15) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (vehicle_id) REFERENCES Vehicles(Id)
    )";

    $conn->exec($sql);
    echo "Rentals table created successfully\n";

    // Create Payments table with UPI support
    $sql = "CREATE TABLE IF NOT EXISTS Payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        vehicle_id INT NOT NULL,
        rental_id INT NOT NULL,
        amount DECIMAL(12,2) NOT NULL,
        payment_method VARCHAR(50) NOT NULL,
        transaction_id VARCHAR(100),
        receipt_file VARCHAR(255),
        status VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (vehicle_id) REFERENCES Vehicles(Id),
        FOREIGN KEY (rental_id) REFERENCES Rentals(id)
    )";

    $conn->exec($sql);
    echo "Payments table created successfully\n";

    // Add payment_status and payment_id columns to Rentals table if they don't exist
    $sql = "SHOW COLUMNS FROM Rentals LIKE 'payment_status'";
    $result = $conn->query($sql);
    
    if ($result->rowCount() == 0) {
        $sql = "ALTER TABLE Rentals 
               ADD COLUMN payment_status VARCHAR(20) DEFAULT 'pending',
               ADD COLUMN payment_id INT,
               ADD COLUMN customer_name VARCHAR(255) NOT NULL DEFAULT '',
               ADD COLUMN customer_phone VARCHAR(15) NOT NULL DEFAULT '',
               ADD COLUMN start_date DATE NOT NULL DEFAULT CURRENT_DATE,
               ADD COLUMN end_date DATE NOT NULL DEFAULT CURRENT_DATE,
               ADD FOREIGN KEY (payment_id) REFERENCES Payments(id)";
        $conn->exec($sql);
        echo "\nPayment columns added to Rentals table successfully";
    }

    // Add new columns to Payments table if they don't exist
    $sql = "SHOW COLUMNS FROM Payments LIKE 'transaction_id'";
    $result = $conn->query($sql);
    
    if ($result->rowCount() == 0) {
        $sql = "ALTER TABLE Payments 
               ADD COLUMN transaction_id VARCHAR(100),
               ADD COLUMN receipt_file VARCHAR(255),
               ADD COLUMN rental_id INT NOT NULL DEFAULT 0,
               ADD FOREIGN KEY (rental_id) REFERENCES Rentals(id)";
        $conn->exec($sql);
        echo "\nUPI payment columns added to Payments table successfully";
    }

    // Create uploads directory for receipts if it doesn't exist
    $uploadsDir = __DIR__ . "/../uploads/receipts";
    if (!file_exists($uploadsDir)) {
        mkdir($uploadsDir, 0755, true);
        echo "\nReceipts upload directory created successfully";
    }

} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}