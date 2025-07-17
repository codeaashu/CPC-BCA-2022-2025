<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

session_start();
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';

    if (empty($name) || empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["success" => false, "error" => "Invalid name or email"]);
        exit();
    }

    $otp = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
    $_SESSION['signup_otp'] = $otp;
    $_SESSION['signup_data'] = [
        'name' => $name,
        'email' => $email,
        'gender' => $_POST['satisfaction'] ?? '',
        'mobile' => $_POST['mobile'] ?? ''
    ];

    $mail = new PHPMailer(true);

    try {
        // SMTP Configuration
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'techguru3588@gmail.com';  // Your Gmail
        $mail->Password = 'vamhbughqrxkkrvb';     // App password (see below)
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // Sender and recipient
        $mail->setFrom('techguru3588@gmail.com', 'TestSheet');
        $mail->addAddress($email, $name);

        // Email content
        $mail->isHTML(false);
        $mail->Subject = 'Your OTP for TestSheet Signup';
        $mail->Body    = "Hello $name,\n\nYour OTP is: $otp\n\nRegards,\nTestSheet Team";

        $mail->send();
        echo json_encode(["success" => true, "otp" => $otp]);
    } catch (Exception $e) {
        echo json_encode(["success" => false, "error" => $mail->ErrorInfo]);
    }
}
?>
