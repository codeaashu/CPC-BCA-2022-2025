<?php
session_start();
include('db_connection.php'); // Assuming you have a db_connection file for connecting to the database

if (isset($_POST['teacherID']) && isset($_POST['testID'])) {
    $teacherID = $_POST['teacherID'];
    $testID = $_POST['testID'];
    
    // Save them in session
    $_SESSION['teacherID'] = $teacherID;
    $_SESSION['testID'] = $testID;

    // Prepare a query to check if the teacherID and testID exist
    $stmt = $conn->prepare("SELECT * FROM publish WHERE teacher_id = ? AND test_id = ?");
    $stmt->bind_param("ii", $teacherID, $testID);
    $stmt->execute();
    $result = $stmt->get_result();

    // If a match is found, return success
    if ($result->num_rows > 0) {
        echo json_encode(['status' => 'success']);
    } else {
        // If no match, return error
        echo json_encode(['status' => 'error', 'message' => 'Incorrect Teacher ID or Test ID']);
    }

    $stmt->close();
}
?>
