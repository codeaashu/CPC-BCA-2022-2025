<?php
// Start the session
session_start();

// Include database connection
include 'db_connection.php'; // Make sure this file contains the correct database connection details


// SQL query to get the maximum percentage
$sql = "SELECT MAX(percentage) AS topper_percentage FROM students";

// Prepare and execute the query
$result = $conn->query($sql);

// Check if query was successful
if ($result) {
    // Fetch the data
    $data = $result->fetch_assoc();

    // Prepare the response
    $response = array(
        'topper_percentage' => isset($data['topper_percentage']) ? $data['topper_percentage'] : '0'
    );
} else {
    // Handle query failure
    $response = array(
        'topper_percentage' => '0'
    );
}

// Return the JSON response
header('Content-Type: application/json');
echo json_encode($response);

// Close the connection
$conn->close();
?>
