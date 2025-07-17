<?php
session_start();

if (isset($_POST['teacherID']) && isset($_POST['studentID']) && isset($_POST['testID'])) {
    $_SESSION['teacherID'] = $_POST['teacherID'];
    $_SESSION['userID'] = $_POST['studentID'];
    $_SESSION['testID'] = $_POST['testID'];

    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Missing required data']);
}
?>
