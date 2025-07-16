<?php
// Include database connection
include 'db_connection.php';

if (isset($_POST['test_id']) && isset($_POST['total_time'])) {
    $testId = $_POST['test_id'];
    $totalTime = $_POST['total_time'];

    // Check if the test is already published
    $checkQuery = "SELECT * FROM publish WHERE test_id = ?";
    $stmt = $conn->prepare($checkQuery);
    $stmt->bind_param("i", $testId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // If already published, update total_time if necessary
        $updateQuery = "UPDATE publish SET total_time = ? WHERE test_id = ?";
        $stmt = $conn->prepare($updateQuery);
        $stmt->bind_param("ii", $totalTime, $testId);
        if ($stmt->execute()) {
            echo "Test time updated successfully!";
        } else {
            echo "Error updating test time.";
        }
    } else {
        // If not already published, insert into publish table
        $insertQuery = "INSERT INTO publish (teacher_id,test_id, test_name, subject, total_marks, total_questions, total_time)
        SELECT teacher_id,test_id, test_name, subject, total_marks, total_questions, total_time FROM teacher_test WHERE test_id = ?";
        $stmt = $conn->prepare($insertQuery);
        $stmt->bind_param("i", $testId);
        if ($stmt->execute()) {
            echo "Test published successfully!";
        } else {
            echo "Error publishing test.";
        }
    }
    $stmt->close();
}
$conn->close();
?>
