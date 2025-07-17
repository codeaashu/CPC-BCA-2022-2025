<?php
header('Content-Type: application/json');
require 'db_connection.php'; // connection logic here

if (isset($_POST['email'])) {
    $email = trim($_POST['email']);
    $stmt = $conn->prepare("SELECT teacher_id FROM teachers WHERE teacher_email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    echo json_encode(['exists' => $result->num_rows > 0]);
} else {
    echo json_encode(['error' => 'Email not provided']);
}
?>
