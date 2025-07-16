<?php
session_start();
require 'db_connection.php'; // Your database connection file

$studentID = $_SESSION['student_ID']; // Assuming the student's ID is stored in session
$studentName = $_SESSION['student_Name']; // Assuming the student's name is stored in session

if (isset($studentID) && isset($studentName)) {
    // Fetch all percentages of the student
    $query = "SELECT percentage FROM students WHERE s_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $studentID);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $totalPercentage = 0;
        $testCount = 0;

        while ($row = $result->fetch_assoc()) {
            $totalPercentage += $row['percentage'];
            $testCount++;
        }

        // Calculate the average percentage
        $averagePercentage = $totalPercentage / $testCount;

        // Return the average percentage as JSON
        echo json_encode(['average_percentage' => $averagePercentage]);
    } else {
        echo json_encode(['error' => 'No tests found for the student.']);
    }
} else {
    echo json_encode(['error' => 'Student not logged in.']);
}

$conn->close();
