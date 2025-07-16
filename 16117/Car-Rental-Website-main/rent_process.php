<?php
session_start();
include("Php/Conn.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate and sanitize input data
    $firstName = trim($_POST['first_name']);
    $lastName = trim($_POST['last_name']);
    $name = $firstName . ' ' . $lastName; // Combine for database
    $phone = trim($_POST['phone']);
    $startDate = $_POST['start_date'];
    $endDate = $_POST['end_date'];
    $vehicleId = $_POST['vehicle_id'];
    $email = $_SESSION['email'];

    // Debug: Log the received data
    error_log("Rent Process - Received data: firstName=$firstName, lastName=$lastName, phone=$phone, startDate=$startDate, endDate=$endDate, vehicleId=$vehicleId");

    // Validation
    $errors = [];

    // Validate first name (only alphabets and spaces)
    if (!preg_match('/^[A-Za-z\s]+$/', $firstName)) {
        $errors[] = "First name must contain only alphabets";
    }

    // Validate last name (only alphabets and spaces)
    if (!preg_match('/^[A-Za-z\s]+$/', $lastName)) {
        $errors[] = "Last name must contain only alphabets";
    }

    // Validate phone (exactly 10 digits starting with 6, 7, 8, or 9)
    if (!preg_match('/^[6-9][0-9]{9}$/', $phone)) {
        $errors[] = "Phone number must be 10 digits and start with 6, 7, 8, or 9";
    }

    // Validate dates
    $startDateTime = new DateTime($startDate);
    $endDateTime = new DateTime($endDate);
    $today = new DateTime();
    $today->setTime(0, 0, 0);

    if ($startDateTime < $today) {
        $errors[] = "Start date cannot be in the past";
    }

    if ($endDateTime <= $startDateTime) {
        $errors[] = "End date must be after start date";
    }

    $duration = $startDateTime->diff($endDateTime)->days;
    if ($duration > 30) {
        $errors[] = "Rental duration cannot exceed 30 days";
    }

    if ($duration < 1) {
        $errors[] = "Rental duration must be at least 1 day";
    }

    // Debug: Log validation results
    error_log("Rent Process - Validation errors: " . implode(", ", $errors));

    // If there are validation errors, redirect back with errors
    if (!empty($errors)) {
        $_SESSION['rental_errors'] = $errors;
        header("Location: rent_vehicle.php?id=" . $vehicleId);
        exit();
    }

    try {
        $conn = Conn::GetConnection();

        // Get vehicle details
        $stmt = $conn->prepare("SELECT * FROM Vehicles WHERE Id = :vehicle_id");
        $stmt->bindParam(':vehicle_id', $vehicleId);
        $stmt->execute();
        $vehicle = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$vehicle) {
            throw new Exception("Vehicle not found");
        }

        // Calculate total amount based on vehicle price and duration
        $totalAmount = $vehicle['Price'] * $duration;

        // Debug: Log the calculated values
        error_log("Rent Process - Calculated values: duration=$duration, totalAmount=$totalAmount");

        // Insert into Rentals table with new fields
        $stmt = $conn->prepare("INSERT INTO Rentals (vehicle_id, user_id, rental_date, start_date, end_date, duration, total_amount, status, payment_status, customer_name, customer_phone, created_at) 
                               VALUES (:vehicle_id, :user_id, NOW(), :start_date, :end_date, :duration, :total_amount, 'pending', 'pending', :customer_name, :customer_phone, NOW())");
        
        $stmt->bindParam(':vehicle_id', $vehicleId);
        $stmt->bindParam(':user_id', $_SESSION['user_id']);
        $stmt->bindParam(':start_date', $startDate);
        $stmt->bindParam(':end_date', $endDate);
        $stmt->bindParam(':duration', $duration);
        $stmt->bindParam(':total_amount', $totalAmount);
        $stmt->bindParam(':customer_name', $name);
        $stmt->bindParam(':customer_phone', $phone);
        $stmt->execute();

        // Update vehicle status to pending
        $updateStmt = $conn->prepare("UPDATE Vehicles SET Status = 'pending' WHERE Id = :vehicle_id");
        $updateStmt->bindParam(':vehicle_id', $vehicleId);
        $updateStmt->execute();
       
        // Get the rental ID for payment processing
        $rentalId = $conn->lastInsertId();

        // Debug: Log successful insertion
        error_log("Rent Process - Successfully created rental with ID: $rentalId");
        
        // Set success message and redirect to success page
        $_SESSION['booking_success'] = [
            'rental_id' => $rentalId,
            'vehicle_id' => $vehicleId,
            'vehicle_name' => $vehicle['Title'],
            'customer_name' => $name,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'duration' => $duration,
            'total_amount' => $totalAmount
        ];
        
        // Redirect to success page
        header("Location: rent_success.php");
        exit();
    } catch (PDOException $e) {
        error_log("Database error in rent_process.php: " . $e->getMessage());
        $_SESSION['rental_errors'] = ["Database error occurred. Please try again."];
        header("Location: rent_vehicle.php?id=" . $vehicleId);
        exit();
    } catch (Exception $e) {
        error_log("Error in rent_process.php: " . $e->getMessage());
        $_SESSION['rental_errors'] = [$e->getMessage()];
        header("Location: rent_vehicle.php?id=" . $vehicleId);
        exit();
    }
} else {
    // If not POST request, redirect to home
    header("Location: Home.php");
    exit();
}
