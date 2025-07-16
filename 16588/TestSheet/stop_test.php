
<?php
// Include database connection
include 'db_connection.php';

// Check if the test_id is provided via POST request
if (isset($_POST['test_id'])) {
    $testId = $_POST['test_id'];

    // First, check if the test is already in the 'publish' table
    $checkQuery = "SELECT * FROM publish WHERE test_id = ?";
    $stmt = $conn->prepare($checkQuery);
    $stmt->bind_param("i", $testId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Test found in 'publish' table, proceed to delete
        $deleteQuery = "DELETE FROM publish WHERE test_id = ?";
        $deleteStmt = $conn->prepare($deleteQuery);
        $deleteStmt->bind_param("i", $testId);

        if ($deleteStmt->execute()) {
            echo "Test has been stopped successfully.";
        } else {
            echo "Error: Could not stop the test.";
        }
    } else {
        echo "Test not found in the publish table.";
    }
} else {
    echo "Error: Test ID is missing.";
}
?>
