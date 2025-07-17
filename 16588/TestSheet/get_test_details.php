<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection
$conn = new mysqli('sql311.infinityfree.com', 'if0_37331201', 'W33LAgXuWC3JFnI', 'if0_37331201_testzone');

if ($conn->connect_error) {
    die(json_encode(array("error" => "Connection failed: " . $conn->connect_error)));
}

if (isset($_POST['testID'])) {
    $testID = $conn->real_escape_string($_POST['testID']);

    // Query to retrieve student data based on testID
    $sql = "SELECT s_id, s_name,total_marks,test_date, obtained_marks, percentage, status, activity FROM students WHERE test_id = '$testID'";
    $result = $conn->query($sql);

    $students = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $students[] = $row;
        }
    }

    // Return the result as a JSON response
    echo json_encode($students);
} else {
    echo json_encode(array("error" => "testID not provided"));
}

$conn->close();
?>
