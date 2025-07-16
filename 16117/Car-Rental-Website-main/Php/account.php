<?php
session_start();
include("Conn.php");

// Fetch user's booking history
try {
    $conn = Conn::GetConnection();
    $userId = $_SESSION['user_id'];
    
    $stmt = $conn->prepare(
        "SELECT r.*, v.Title as vehicle_name, v.Price, p.amount, p.payment_method, p.transaction_id, p.created_at as payment_date 
        FROM Rentals r 
        JOIN Vehicles v ON r.vehicle_id = v.Id 
        LEFT JOIN Payments p ON r.payment_id = p.id 
        WHERE r.user_id = :user_id 
        ORDER BY r.created_at DESC"
    );
    $stmt->bindParam(':user_id', $userId);
    $stmt->execute();
    $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (Exception $e) {
    error_log('Error fetching booking history: ' . $e->getMessage());
    $bookings = [];
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sl Moto | Account</title>
    <link rel="stylesheet" href="../Css/account.css">
    <link rel="stylesheet" href="../Css/homepage.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>

<body>
    <nav class="navbar">
        <div class="navbar-container">
            <div class="brand">
                <a href="#">SL<Span class="subbrand">Moto</Span></a>
            </div>
            <ul class="nav-links">
                <li><a href="../Home.php">Home</a></li>
                <li><a href="#vehicle-list-container">Vehicles</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="add_vehicle_form.php">Post</a></li>
            </ul>
            <div class="mobile-menu">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="account">
                <?php
                if (isset($_SESSION['user_id'])) {
                    echo '<div class="dropdown">';
                    echo '<button class="dropbtn"><i class="fas fa-user-circle"></i></button>';
                    echo '<div class="dropdown-content">';
                    echo '<a href="account.php">Account</a>';
                    echo '<a href="logout.php">Logout</a>';
                    echo '<a href="activeJob.php">Active Job</a>';
                    echo '</div>';
                    echo '</div>';
                } else {
                    echo '<a href="login.php" class="login-btn">Login/Register</a>';
                }
                ?>
            </div>
        </div>
    </nav>

    <div class="account-container">
        <div class="account-header">
            <h1>My Account</h1>
            <p>Welcome back, <?php echo htmlspecialchars($_SESSION['username'] ?? 'User'); ?>!</p>
        </div>

        <div class="account-content">
            <div class="user-info">
                <h2>User Information</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <label>Username:</label>
                        <span><?php echo htmlspecialchars($_SESSION['username'] ?? 'N/A'); ?></span>
                    </div>
                    <div class="info-item">
                        <label>Email:</label>
                        <span><?php echo htmlspecialchars($_SESSION['email'] ?? 'N/A'); ?></span>
                    </div>
                    <div class="info-item">
                        <label>User Type:</label>
                        <span><?php echo htmlspecialchars(ucfirst($_SESSION['user_type'] ?? 'N/A')); ?></span>
                    </div>
                </div>
            </div>

            <div class="booking-history">
                <h2>Booking History</h2>
                <?php if (!empty($bookings)): ?>
                    <table class="booking-table">
                        <thead>
                            <tr>
                                <th>Vehicle</th>
                                <th>Customer Name</th>
                                <th>Phone</th>
                                <th>Rental Period</th>
                                <th>Duration</th>
                                <th>Amount</th>
                                <th>Payment Method</th>
                                <th>Transaction ID</th>
                                <th>Status</th>
                                <th>Payment Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($bookings as $booking): ?>
                                <tr>
                                    <td><?php echo htmlspecialchars($booking['vehicle_name']); ?></td>
                                    <td><?php echo htmlspecialchars($booking['customer_name']); ?></td>
                                    <td>+91 <?php echo htmlspecialchars($booking['customer_phone']); ?></td>
                                    <td>
                                        <?php echo htmlspecialchars(date('M j', strtotime($booking['start_date']))); ?> - 
                                        <?php echo htmlspecialchars(date('M j, Y', strtotime($booking['end_date']))); ?>
                                    </td>
                                    <td><?php echo htmlspecialchars($booking['duration']); ?> days</td>
                                    <td>Rs. <?php echo htmlspecialchars(number_format($booking['amount'] ?? 0, 2)); ?></td>
                                    <td><?php echo htmlspecialchars(ucfirst($booking['payment_method'] ?? 'N/A')); ?></td>
                                    <td>
                                        <?php if ($booking['transaction_id']): ?>
                                            <code><?php echo htmlspecialchars($booking['transaction_id']); ?></code>
                                        <?php else: ?>
                                            N/A
                                        <?php endif; ?>
                                    </td>
                                    <td class="status-<?php echo strtolower($booking['payment_status']); ?>">
                                        <?php echo htmlspecialchars(ucfirst($booking['payment_status'])); ?>
                                    </td>
                                    <td>
                                        <?php if ($booking['payment_date']): ?>
                                            <?php echo htmlspecialchars(date('M j, Y', strtotime($booking['payment_date']))); ?>
                                        <?php else: ?>
                                            N/A
                                        <?php endif; ?>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                <?php else: ?>
                    <p class="no-bookings">No booking history found.</p>
                <?php endif; ?>
            </div>
        </div>
    </div>
</body>

</html>