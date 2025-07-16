<?php
session_start();
include("Php/Conn.php");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: Home.php');
    exit();
}

try {
    // Get payment details
    $rentalId = $_POST['rental_id'];
    $vehicleId = $_POST['vehicle_id'];
    $amount = $_POST['amount'];
    $transactionId = trim($_POST['transaction_id']);
    
    // Validate rental ID
    if (empty($rentalId)) {
        throw new Exception('Invalid rental information');    
    }

    // Validate payment details
    if (empty($vehicleId) || empty($amount)) {
        throw new Exception('Missing required payment information');
    }

    // Validate transaction ID (alphanumeric only)
    if (empty($transactionId)) {
        throw new Exception('Transaction ID is required');
    }
    
    if (!preg_match('/^[A-Za-z0-9]+$/', $transactionId)) {
        throw new Exception('Transaction ID should contain only letters and numbers');
    }

    // Validate receipt upload
    if (!isset($_FILES['receipt']) || $_FILES['receipt']['error'] !== UPLOAD_ERR_OK) {
        throw new Exception('Please upload a payment receipt');
    }

    $receiptFile = $_FILES['receipt'];
    $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
    $maxSize = 5 * 1024 * 1024; // 5MB

    // Validate file type
    if (!in_array($receiptFile['type'], $allowedTypes)) {
        throw new Exception('Invalid file type. Please upload an image (JPEG, PNG, GIF) or PDF file');
    }

    // Validate file size
    if ($receiptFile['size'] > $maxSize) {
        throw new Exception('File size too large. Maximum size is 5MB');
    }

    // Connect to database
    $conn = Conn::GetConnection();

    // Start transaction
    $conn->beginTransaction();

    try {
        // Check if transaction ID already exists
        $stmt = $conn->prepare("SELECT id FROM Payments WHERE transaction_id = :transaction_id");
        $stmt->bindParam(':transaction_id', $transactionId);
        $stmt->execute();
        
        if ($stmt->rowCount() > 0) {
            throw new Exception('Transaction ID already exists. Please use a different transaction ID');
        }

        // Upload receipt file
        $uploadDir = 'uploads/receipts/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $fileExtension = pathinfo($receiptFile['name'], PATHINFO_EXTENSION);
        $fileName = 'receipt_' . time() . '_' . $rentalId . '.' . $fileExtension;
        $filePath = $uploadDir . $fileName;

        if (!move_uploaded_file($receiptFile['tmp_name'], $filePath)) {
            throw new Exception('Failed to upload receipt file');
        }

        // Create payment record
        $stmt = $conn->prepare("INSERT INTO Payments (vehicle_id, rental_id, amount, payment_method, transaction_id, receipt_file, status, created_at) VALUES (:vehicle_id, :rental_id, :amount, 'upi', :transaction_id, :receipt_file, 'completed', NOW())");
        
        $stmt->bindParam(':vehicle_id', $vehicleId);
        $stmt->bindParam(':rental_id', $rentalId);
        $stmt->bindParam(':amount', $amount);
        $stmt->bindParam(':transaction_id', $transactionId);
        $stmt->bindParam(':receipt_file', $fileName);
        $stmt->execute();

        $paymentId = $conn->lastInsertId();

        // Update rental status
        $stmt = $conn->prepare("UPDATE Rentals SET payment_status = 'paid', payment_id = :payment_id, status = 'confirmed' WHERE id = :rental_id AND status = 'pending'");
        $stmt->bindParam(':payment_id', $paymentId);
        $stmt->bindParam(':rental_id', $rentalId);
        $stmt->execute();

        if ($stmt->rowCount() === 0) {
            throw new Exception('Could not update rental status');    
        }

        // Update vehicle status to confirmed
        $stmt = $conn->prepare("UPDATE Vehicles SET Status = 'Confirmed' WHERE Id = :vehicle_id");
        $stmt->bindParam(':vehicle_id', $vehicleId);
        $stmt->execute();

        // Commit transaction
        $conn->commit();

        // Redirect to success page
        $_SESSION['payment_success'] = true;
        header('Location: rent_success.php');
        exit();

    } catch (Exception $e) {
        // Rollback transaction on error
        $conn->rollBack();
        
        // Delete uploaded file if it exists
        if (isset($filePath) && file_exists($filePath)) {
            unlink($filePath);
        }
        
        throw $e;
    }

} catch (Exception $e) {
    error_log('Payment Error: ' . $e->getMessage());
    $_SESSION['payment_error'] = $e->getMessage();
    header('Location: rent_vehicle.php?id=' . $vehicleId . '&rental_id=' . $rentalId);
    exit();
}