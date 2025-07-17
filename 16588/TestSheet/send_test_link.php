<?php
// Start the session
session_start();

// Include database connection
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Validate POST data to ensure both test_id and teacher_id are present and are integers
    if (isset($_POST['test_id']) && isset($_POST['teacher_id']) &&
        is_numeric($_POST['test_id']) && is_numeric($_POST['teacher_id'])) {
        
        // Get the test_id and teacher_id from the POST request
        $test_id = (int) $_POST['test_id'];
        $teacher_id = (int) $_POST['teacher_id'];

        // Store test_id and teacher_id in session
        $_SESSION['testID'] = $test_id;
        $_SESSION['teacherID'] = $teacher_id;

        // Send back a response with the link to be copied
        echo json_encode([
            'url' => 'http://testsheet.rf.gd/test_login.php?test_id=' . $test_id . '&teacher_id=' . $teacher_id
        ]);
    } else {
        // Send back an error response if data is invalid
        echo json_encode(['error' => 'Invalid input data']);
    }
}
?>

