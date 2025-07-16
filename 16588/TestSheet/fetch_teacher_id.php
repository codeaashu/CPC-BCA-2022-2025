<?php
session_start();
include('db_connection.php'); // Include your database connection

if (isset($_POST['testID'])) {
    $testID = $_POST['testID'];

    // Query to fetch teacherID based on testID
    $stmt = $conn->prepare("SELECT teacher_id FROM teacher_test WHERE test_id = ?");
    $stmt->bind_param("i", $testID);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode(['status' => 'success', 'teacherID' => $row['teacher_id']]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Teacher not found for the given Test ID']);
    }

    $stmt->close();
}
?>
