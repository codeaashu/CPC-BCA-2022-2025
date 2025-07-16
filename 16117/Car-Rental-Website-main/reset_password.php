<?php

session_start();
include("Php/Conn.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $currentPassword = $_POST["current_password"];
    $newPassword = $_POST["new_password"];

    try {
       
        $conn = Conn::GetConnection();

       
        $stmt = $conn->prepare("SELECT password FROM users WHERE Id = :user_id");
        $stmt->bindParam(':user_id', $_SESSION['user_id']);
        $stmt->execute();
        $userData = $stmt->fetch();

     
        if (password_verify($currentPassword, $userData['password'])) {
           
            $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

           
            $stmt = $conn->prepare("UPDATE users SET password = :password WHERE Id = :user_id");
            $stmt->bindParam(':password', $hashedPassword);
            $stmt->bindParam(':user_id', $_SESSION['user_id']);
            $stmt->execute();

            
            header("Location: Php/account.php?password_reset=success");
            exit();
        } else {
           
            header("Location: reset_password.php?error=incorrect_current_password");
            exit();
        }
    } catch (PDOException $e) {
        
        echo "Error: " . $e->getMessage();
    }
} else {
    header("Location: reset_password.php");
    exit();
}
?>
