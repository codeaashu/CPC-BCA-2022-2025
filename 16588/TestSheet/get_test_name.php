<?php
// Enable error reporting for debugging (remove this in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set response type to JSON
header('Content-Type: application/json');

// Include your database connection file
include 'db_connection.php';  // Assuming you have a file for DB connection

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if both Teacher ID and Test ID are provided
    if (isset($_POST['techID']) && isset($_POST['testID'])) {
        $teacherID = $_POST['techID'];
        $testID = $_POST['testID'];

        // Prepare SQL query to fetch the test name
        $query = "SELECT test_name FROM teacher_test WHERE test_id = ?";
        
        // Prepare the statement to prevent SQL injection
        if ($stmt = $conn->prepare($query)) {
            $stmt->bind_param("i",$testID);  // "ii" means two integers
            
            // Execute the statement
            $stmt->execute();
            $stmt->store_result();

            // Check if a test name was found
            if ($stmt->num_rows > 0) {
                // Bind the result to a variable
                $stmt->bind_result($testName);
                $stmt->fetch();
                // Return the test name as a JSON response
                echo json_encode([
                    'success' => true,
                    'test_name' => $testName
                ]);
            } else {
                // No matching test found
                echo json_encode([
                    'success' => false,
                    'message' => 'Test not found for the given Teacher ID and Test ID.'
                ]);
            }

            // Close the statement
            $stmt->close();
        } else {
            // Error in preparing the statement
            echo json_encode([
                'success' => false,
                'message' => 'Database query error.'
            ]);
        }
    } else {
        // Missing required parameters
        echo json_encode([
            'success' => false,
            'message' => 'Teacher ID and Test ID are required.'
        ]);
    }
} else {
    // Invalid request method
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method.'
    ]);
}

// Close the database connection
$conn->close();
?>
