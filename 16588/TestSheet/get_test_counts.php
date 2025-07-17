<?php
session_start();
include 'db_connection.php'; // Assuming this file has the database connection

// Check if the teacher is logged in
if (isset($_SESSION['teacherID'])) {
    $teacherID = $_SESSION['teacherID'];

    // Query to count created tests
    $query = "SELECT COUNT(*) AS createdTests FROM teacher_test WHERE teacher_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('s', $teacherID);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $createdTests = $row['createdTests'];

    // Query to count published tests
    $query_published = "SELECT COUNT(*) AS publishedTests FROM publish WHERE teacher_id = ?";
    $stmt_published = $conn->prepare($query_published); // New prepared statement for published tests
    $stmt_published->bind_param('s', $teacherID);
    $stmt_published->execute();
    $result_published = $stmt_published->get_result();
    $col = $result_published->fetch_assoc();
    $publishedTests = $col['publishedTests'];

    // Send the combined test count as a single JSON response
    echo json_encode([
        'total_test' => $createdTests,
        'publish_test' => $publishedTests
    ]);
} else {
    echo json_encode(['error' => 'Teacher not logged in']);
}
?>
