<?php
session_start();
include 'db_connection.php'; // Adjust to your connection file

$student_id = $_SESSION['student_ID'];
$student_name = $_SESSION['student_Name'];

$sql = "SELECT MAX(percentage) AS highest_percentage FROM students WHERE s_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $student_id);
$stmt->execute();
$result = $stmt->get_result();

$response = [];
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $response['highest_percentage'] = $row['highest_percentage'];
} else {
    $response['highest_percentage'] = 0; // Default if no data is found
}

echo json_encode($response);
$stmt->close();
$conn->close();
?>
