<?php
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $booking_id = $_POST['booking_id'] ?? '';

    if ($booking_id) {
        $stmt = $conn->prepare("DELETE FROM bookings WHERE booking_id = ?");
        $stmt->bind_param("s", $booking_id);
        if ($stmt->execute()) {
            echo "Booking deleted successfully.";
        } else {
            echo "Failed to delete booking.";
        }
        $stmt->close();
    } else {
        echo "Invalid booking ID.";
    }
}
?>
