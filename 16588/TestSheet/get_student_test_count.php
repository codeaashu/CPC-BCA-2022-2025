<?php
session_start();
require 'db_connection.php';  // Your database connection

// Check if the student is logged in
if (isset($_SESSION['student_ID'])) {
    $student_ID = $_SESSION['student_ID'];

    // Query to count the number of tests the student has taken
    $query = "SELECT COUNT(*) as test_count FROM students WHERE s_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('s', $student_ID);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    // Send the test count as a JSON response
    echo json_encode(['test_count' => $row['test_count']]);
} else {
    echo json_encode(['error' => 'Student not logged in']);
}
?>
