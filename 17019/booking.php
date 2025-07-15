<?php
session_start();
header('Content-Type: application/json');
require 'db.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $eventType = $_POST['eventType'] ?? '';
    $eventDate = $_POST['eventDate'] ?? '';
    $venue     = $_POST['venue'] ?? '';
    $phone     = $_POST['phone'] ?? '';
    $username  = $_POST['username'] ?? '';

    // Get user's email from users table
    $stmtUser = $conn->prepare("SELECT email FROM users WHERE email = ?");
    $stmtUser->bind_param("s", $username);
    $stmtUser->execute();
    $stmtUser->bind_result($userEmail);
    $stmtUser->fetch();
    $stmtUser->close();

    // Get venue email from venues table
    $stmtVenue = $conn->prepare("SELECT email FROM venues WHERE name = ?");
    $stmtVenue->bind_param("s", $venue);
    $stmtVenue->execute();
    $stmtVenue->bind_result($venueEmail);
    $stmtVenue->fetch();
    $stmtVenue->close();

    if (!$eventType || !$eventDate || !$venue || !$phone || !$username || !$userEmail || !$venueEmail) {
        echo json_encode(["status" => "error", "message" => "All fields are required or invalid email."]);
        exit;
    }

    // Check if venue is already booked on the given date
    $stmtCheck = $conn->prepare("SELECT COUNT(*) FROM bookings WHERE event_date = ? AND venue = ? AND status = 'confirmed'");
    $stmtCheck->bind_param("ss", $eventDate, $venue);
    $stmtCheck->execute();
    $stmtCheck->bind_result($bookingCount);
    $stmtCheck->fetch();
    $stmtCheck->close();

    if ($bookingCount > 0) {
        echo json_encode(["status" => "error", "message" => "Venue is already booked on this date."]);
        exit;
    }

    $bookingId = uniqid("BK");

    $stmt = $conn->prepare("INSERT INTO bookings (booking_id, event_type, event_date, venue, phone, username, status) VALUES (?, ?, ?, ?, ?, ?, 'pending')");
    $stmt->bind_param("ssssss", $bookingId, $eventType, $eventDate, $venue, $phone, $username);

    if ($stmt->execute()) {
        $_SESSION['booking_id'] = $bookingId;

        // Send email to user
        $mailUser = new PHPMailer(true);
        try {
            $mailUser->isSMTP();
            $mailUser->Host       = 'smtp.gmail.com';
            $mailUser->SMTPAuth   = true;
            $mailUser->Username   = 'yadavprince99395@gmail.com';
            $mailUser->Password   = 'jhgjsmtzwmadysoe';
            $mailUser->SMTPSecure = 'tls';
            $mailUser->Port       = 587;
            $mailUser->setFrom('yadavprince99395@gmail.com', 'Evento System');

            $mailUser->addAddress($userEmail);
            $mailUser->isHTML(true);
            $mailUser->Subject = 'Booking Confirmation - Evento';
            $mailUser->Body = "
                <h2>Booking Confirmed!</h2>
                <p>Hi <strong>$username</strong>,</p>
                <p>Your event booking for <strong>$eventType</strong> at <strong>$venue</strong> on <strong>$eventDate</strong> has been received.</p>
                <p><strong>Booking ID:</strong> $bookingId</p>
                <p>Thank you for choosing Evento!</p>
            ";
            $mailUser->send();
        } catch (Exception $e) {
            error_log("User email error: " . $mailUser->ErrorInfo);
        }

        // Send email to venue
        $mailVenue = new PHPMailer(true);
        try {
            $mailVenue->isSMTP();
            $mailVenue->Host       = 'smtp.gmail.com';
            $mailVenue->SMTPAuth   = true;
            $mailVenue->Username   = 'yadavprince99395@gmail.com';
            $mailVenue->Password   = 'jhgjsmtzwmadysoe';
            $mailVenue->SMTPSecure = 'tls';
            $mailVenue->Port       = 587;
            $mailVenue->setFrom('yadavprince99395@gmail.com', 'Evento System');

            $mailVenue->addAddress($venueEmail);
            $mailVenue->isHTML(true);
            $mailVenue->Subject = 'New Booking Received';
            $mailVenue->Body = "
                <h2>New Booking Request</h2>
                <p>A user has booked an event.</p>
                <ul>
                    <li><strong>Username:</strong> $username</li>
                    <li><strong>Event Type:</strong> $eventType</li>
                    <li><strong>Date:</strong> $eventDate</li>
                    <li><strong>Venue:</strong> $venue</li>
                    <li><strong>Phone:</strong> $phone</li>
                    <li><strong>Booking ID:</strong> $bookingId</li>
                </ul>
                <p>Please review and confirm.</p>
            ";
            $mailVenue->send();
        } catch (Exception $e) {
            error_log("Venue email error: " . $mailVenue->ErrorInfo);
        }

        echo json_encode(["status" => "success", "booking_id" => $bookingId]);
    } else {
        echo json_encode(["status" => "error", "message" => "Database insertion failed"]);
    }

    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
}
