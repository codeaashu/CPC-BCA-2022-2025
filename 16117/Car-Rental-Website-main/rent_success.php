<?php
session_start();
include("Php/Conn.php");

// Check if we have booking success or payment success
if (!isset($_SESSION['booking_success']) && !isset($_SESSION['payment_success'])) {
    header("Location: Home.php");
    exit();
}

$isPaymentSuccess = isset($_SESSION['payment_success']);
$bookingData = null;

if ($isPaymentSuccess) {
    // Clear the payment success flag
    unset($_SESSION['payment_success']);
    
    try {
        $conn = Conn::GetConnection();
        $userId = $_SESSION['user_id'];

        // Get the latest rental details with payment information
        $stmt = $conn->prepare(
            "SELECT r.*, v.Title as vehicle_name, v.Price, p.amount, p.payment_method, p.transaction_id, p.created_at as payment_date 
            FROM Rentals r 
            JOIN Vehicles v ON r.vehicle_id = v.Id 
            JOIN Payments p ON r.payment_id = p.id 
            WHERE r.user_id = :user_id 
            ORDER BY p.created_at DESC LIMIT 1"
        );
        $stmt->bindParam(':user_id', $userId);
        $stmt->execute();
        $rental = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$rental) {
            throw new Exception('Rental details not found');
        }
    } catch (Exception $e) {
        error_log('Error in rent_success.php: ' . $e->getMessage());
        header("Location: Home.php");
        exit();
    }
} else {
    // Booking success (before payment)
    $bookingData = $_SESSION['booking_success'];
    unset($_SESSION['booking_success']);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $isPaymentSuccess ? 'Payment Successful' : 'Booking Successful'; ?> - SL Moto</title>
    <link rel="stylesheet" href="Css/homepage.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .success-container {
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            text-align: center;
            max-width: 600px;
            width: 90%;
        }

        .success-icon {
            font-size: 80px;
            color: #28a745;
            margin-bottom: 20px;
        }

        .success-message {
            color: #28a745;
            font-size: 2rem;
            margin-bottom: 10px;
        }

        .booking-message {
            color: #ffc107;
            font-size: 2rem;
            margin-bottom: 10px;
        }

        .rental-details {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: left;
        }

        .rental-details h3 {
            color: #333;
            margin-bottom: 15px;
            border-bottom: 2px solid #007bff;
            padding-bottom: 5px;
        }

        .rental-details p {
            margin: 10px 0;
            color: #555;
        }

        .rental-details strong {
            color: #333;
        }

        .buttons {
            margin-top: 30px;
        }

        .view-history, .back-home, .proceed-payment {
            display: inline-block;
            padding: 12px 24px;
            margin: 0 10px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            transition: all 0.3s ease;
        }

        .view-history {
            background: #007bff;
            color: white;
        }

        .view-history:hover {
            background: #0056b3;
            transform: translateY(-2px);
        }

        .back-home {
            background: #6c757d;
            color: white;
        }

        .back-home:hover {
            background: #545b62;
            transform: translateY(-2px);
        }

        .proceed-payment {
            background: #28a745;
            color: white;
        }

        .proceed-payment:hover {
            background: #218838;
            transform: translateY(-2px);
        }

        .transaction-id {
            background: #e9ecef;
            padding: 10px;
            border-radius: 5px;
            font-family: monospace;
            font-size: 1.1em;
            color: #495057;
            margin: 10px 0;
        }

        .payment-notice {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            color: #856404;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="success-container">
        <?php if ($isPaymentSuccess): ?>
            <!-- Payment Success -->
            <i class="fas fa-check-circle success-icon"></i>
            <h2 class="success-message">Payment Successful!</h2>
            <p>Your vehicle rental has been confirmed.</p>
            
            <div class="rental-details">
                <h3>Rental Details</h3>
                <p><strong>Vehicle:</strong> <?php echo htmlspecialchars($rental['vehicle_name']); ?></p>
                <p><strong>Customer Name:</strong> <?php echo htmlspecialchars($rental['customer_name']); ?></p>
                <p><strong>Phone:</strong> +91 <?php echo htmlspecialchars($rental['customer_phone']); ?></p>
                <p><strong>Rental Period:</strong> <?php echo htmlspecialchars(date('F j, Y', strtotime($rental['start_date']))); ?> to <?php echo htmlspecialchars(date('F j, Y', strtotime($rental['end_date']))); ?></p>
                <p><strong>Duration:</strong> <?php echo htmlspecialchars($rental['duration']); ?> days</p>
                <p><strong>Total Amount:</strong> Rs. <?php echo htmlspecialchars(number_format($rental['amount'], 2)); ?></p>
                <p><strong>Payment Method:</strong> <?php echo htmlspecialchars(ucfirst($rental['payment_method'])); ?></p>
                <p><strong>Transaction ID:</strong></p>
                <div class="transaction-id"><?php echo htmlspecialchars($rental['transaction_id']); ?></div>
                <p><strong>Payment Date:</strong> <?php echo htmlspecialchars(date('F j, Y, g:i a', strtotime($rental['payment_date']))); ?></p>
            </div>

            <div class="buttons">
                <a href="Php/account.php" class="view-history">View Booking History</a>
                <a href="Home.php" class="back-home">Back to Home</a>
            </div>
        <?php else: ?>
            <!-- Booking Success (Before Payment) -->
            <i class="fas fa-check-circle success-icon"></i>
            <h2 class="booking-message">Booking Successful!</h2>
            <p>Your vehicle has been booked successfully. Please complete the payment to confirm your rental.</p>
            
            <div class="payment-notice">
                <i class="fas fa-info-circle"></i>
                <strong>Payment Required:</strong> Please complete the payment to confirm your booking. Your booking will be cancelled if payment is not completed within 24 hours.
            </div>
            
            <div class="rental-details">
                <h3>Booking Details</h3>
                <p><strong>Booking ID:</strong> #<?php echo htmlspecialchars($bookingData['rental_id']); ?></p>
                <p><strong>Vehicle:</strong> <?php echo htmlspecialchars($bookingData['vehicle_name']); ?></p>
                <p><strong>Customer Name:</strong> <?php echo htmlspecialchars($bookingData['customer_name']); ?></p>
                <p><strong>Rental Period:</strong> <?php echo htmlspecialchars(date('F j, Y', strtotime($bookingData['start_date']))); ?> to <?php echo htmlspecialchars(date('F j, Y', strtotime($bookingData['end_date']))); ?></p>
                <p><strong>Duration:</strong> <?php echo htmlspecialchars($bookingData['duration']); ?> days</p>
                <p><strong>Total Amount:</strong> Rs. <?php echo htmlspecialchars(number_format($bookingData['total_amount'], 2)); ?></p>
            </div>

            <div class="buttons">
                <a href="rent_vehicle.php?id=<?php echo htmlspecialchars($bookingData['vehicle_id']); ?>&rental_id=<?php echo htmlspecialchars($bookingData['rental_id']); ?>" class="proceed-payment">Proceed to Payment</a>
                <a href="Home.php" class="back-home">Back to Home</a>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>
