<?php
// Start the session
session_start();

// Include the Conn.php file to establish a database connection
include("Php/Conn.php");

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $newUsername = $_POST["username"];
    $newEmail = $_POST["email"];

    try {
        // Connect to the database
        $conn = Conn::GetConnection();

        // Prepare the SQL statement to update user details
        $stmt = $conn->prepare("UPDATE users SET username = :username, email = :email WHERE Id = :user_id");

        // Bind parameters
        $stmt->bindParam(':username', $newUsername);
        $stmt->bindParam(':email', $newEmail);
        $stmt->bindParam(':user_id', $_SESSION['user_id']);


        $stmt->execute();

     
        $_SESSION['user_name'] = $newUsername;
        $_SESSION['email'] = $newEmail;

     
        header("Location: Php/account.php?update=success");
        exit();
    } catch (PDOException $e) {
        
        echo "Error: " . $e->getMessage();
    }
} else {
  
    header("Location: Php/account.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Update User Details</title>
    <link rel="stylesheet" href="path/to/your/css/style.css"> 
</head>
<body>



<script>
   
    alert("Your details have been updated successfully!");
    window.location.href = "/Php/account.php";
</script>

</body>
</html>
