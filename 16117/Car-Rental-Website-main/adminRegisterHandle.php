<?php

include("Php/Conn.php");


$username = $_POST["username"];
$email = $_POST["email"];
$password = $_POST["password"];


$hashed_password = password_hash($password, PASSWORD_DEFAULT);


$user_type = "admin";
try {
 
    $conn = Conn::GetConnection();
    

    $stmt = $conn->prepare("INSERT INTO users (username, email, password, user_type) VALUES (:username, :email, :password, :user_type)");
    

    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $hashed_password);
    $stmt->bindParam(':user_type', $user_type);
    
    
    $stmt->execute();
    $conn = null;

    echo "<script>alert('Registration successful!');</script>";
    header("Location: Php/login.php");
    exit();
} catch(PDOException $e) {
    
    echo "Error: " . $e->getMessage();
}
?>
