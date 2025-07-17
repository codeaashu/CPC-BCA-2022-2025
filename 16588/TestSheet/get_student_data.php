<?php
session_start();
require 'db_connection.php'; // Your database connection file

$studentID = $_SESSION['student_ID']; // Assuming the student's ID is stored in session
$studentName = $_SESSION['student_Name']; // Assuming the student's name is stored in session

if (!isset($studentID) && !isset($studentName)) {
    echo json_encode(["error" => "Student ID or Student Name is not set in session."]);
    exit();

}
    // Fetch all data for the student
    $query = "SELECT * FROM students WHERE s_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $studentID);
    $stmt->execute();
    $result = $stmt->get_result();

$tests_data = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $tests_data[] = $row;
    }
}

// Return results as JSON
echo json_encode($tests_data);

// Close the statement and connection
$stmt->close();
$conn->close();
?>