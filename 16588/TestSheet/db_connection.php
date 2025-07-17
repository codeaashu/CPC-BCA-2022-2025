<?php
$servername = "sql311.infinityfree.com"; // Replace with your server name
$username = "if0_37331201";        // Replace with your database username
$password = "W33LAgXuWC3JFnI";            // Replace with your database password
$dbname = "if0_37331201_testzone";      // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
