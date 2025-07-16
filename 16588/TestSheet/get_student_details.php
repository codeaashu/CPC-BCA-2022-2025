<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection
$conn = new mysqli('sql311.infinityfree.com', 'if0_37331201', 'W33LAgXuWC3JFnI', 'if0_37331201_testzone');

if ($conn->connect_error) {
    die(json_encode(array("error" => "Connection failed: " . $conn->connect_error)));
}
// Get the studentID from the POST request
if (isset($_POST['studentID'])) {
    $studentID = $conn->real_escape_string($_POST['studentID']);

// Initialize an empty response array
// Query to retrieve student data based on testID
$sql = "SELECT * FROM students WHERE s_id = '$studentID'";
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
    echo json_encode(array("error" => "studentID not provided"));
}

$conn->close();
?>