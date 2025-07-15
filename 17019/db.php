<?php
$host = 'localhost';
$user = 'root';
$pass = 'badshah@7004P'; // Change this if your MySQL Server has a password
$db = 'event_db';

$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
