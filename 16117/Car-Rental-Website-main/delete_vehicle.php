<?php
session_start();
include("Php/Conn.php");


if (!isset($_SESSION['user_id'])) {
    header("Location: Php/login.php");
    exit();
}


if (!isset($_GET['id'])) {
    header("Location: Php/activeJob.php");
    exit();
}


$vehicle_id = $_GET['id'];


$conn = Conn::GetConnection();
$stmt = $conn->prepare("SELECT * FROM Vehicles WHERE Id = :vehicle_id AND User_Email = :user_email");
$stmt->bindParam(':vehicle_id', $vehicle_id);
$stmt->bindParam(':user_email', $_SESSION['email']);
$stmt->execute();
$vehicle = $stmt->fetch(PDO::FETCH_ASSOC);


if (!$vehicle) {
    header("Location: Php/activeJob.php");
    exit();
}


$stmt = $conn->prepare("DELETE FROM Vehicles WHERE Id = :vehicle_id");
$stmt->bindParam(':vehicle_id', $vehicle_id);
$stmt->execute();
header("Location: Php/activeJob.php");
exit();
?>
