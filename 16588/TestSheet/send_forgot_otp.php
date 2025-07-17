<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

session_start();
header('Content-Type: application/json');

// Database connection
$servername = "sql311.infinityfree.com";
$username   = "if0_37331201";
$password   = "W33LAgXuWC3JFnI";
$dbname     = "if0_37331201_testzone";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(["success" => false, "error" => "Database connection failed"]);
    exit();
}

// Only handle POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["success" => false, "error" => "Invalid email format"]);
        exit();
    }

    // Check if email exists in 'teachers' table
    $stmt = $conn->prepare("SELECT teacher_name FROM teachers WHERE teacher_email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 0) {
        echo json_encode(["success" => false, "error" => "Email not registered"]);
        $stmt->close();
        $conn->close();
        exit();
    }

    $stmt->bind_result($teacherName);
    $stmt->fetch();
    $stmt->close();

    // Generate OTP
    $otp = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
    $_SESSION['forgot_email'] = $email;
    $_SESSION['reset_email'] = $email;
    $_SESSION['forgot_otp'] = $otp;

    // Send OTP via PHPMailer
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'techguru3588@gmail.com';
        $mail->Password   = 'vamhbughqrxkkrvb'; // Replace with your real Gmail App Password
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        $mail->setFrom('techguru3588@gmail.com', 'TestSheet');
        $mail->addAddress($email, $teacherName);

        $mail->isHTML(false);
        $mail->Subject = 'Reset Your TestSheet Password - OTP';
        $mail->Body    = "Dear $teacherName,\n\nYour OTP for resetting your password is: $otp\n\nRegards,\nTestSheet Team";

        $mail->send();
        echo json_encode(["success" => true, "otp" => $otp]); // ✅ Add 'otp' for frontend use
    } catch (Exception $e) {
        echo json_encode(["success" => false, "error" => "Mailer Error: " . $mail->ErrorInfo]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Invalid request method"]);
}
?>
