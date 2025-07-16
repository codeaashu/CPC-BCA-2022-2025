<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
// Include database connection
include 'db_connection.php';


    $teacher_id = $_SESSION['teacherID'];
    $test_id = $_SESSION['testID'];
    
    // Debug: output test_id and teacher_id to check if they're correctly set
    echo "Test ID: $test_id<br>";
    echo "Teacher ID: $teacher_id<br>";

    // Check if the test data is present in the publish table
    $check_sql = "SELECT * FROM publish WHERE test_id = ?";
    $check_stmt = $conn->prepare($check_sql);
    
    if ($check_stmt === false) {
        // Debug: show error if the statement preparation fails
        echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;
        exit();
    }

    $check_stmt->bind_param("i", $test_id);
    $check_stmt->execute();
    $check_result = $check_stmt->get_result();

    if ($check_result->num_rows > 0) {
        // Debug: show that a row is found
        echo "Test found in publish table.<br>";

        // If the test is present, delete it from the publish table
        $delete_students_sql = "DELETE FROM publish WHERE test_id = ?";
        $delete_students_stmt = $conn->prepare($delete_students_sql);
        
        if ($delete_students_stmt === false) {
            // Debug: show error if the statement preparation fails
            echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;
            exit();
        }

        $delete_students_stmt->bind_param("i", $test_id);
        if ($delete_students_stmt->execute()) {
            echo "Test data deleted from publish table.<br>";
        } else {
            echo "Failed to delete test data from publish table.<br>";
        }
    }

    // Get the test name to drop the associated table
    $get_test_name_sql = "SELECT test_name FROM teacher_test WHERE test_id = ?";
    $get_test_name_stmt = $conn->prepare($get_test_name_sql);
    $get_test_name_stmt->bind_param("i", $test_id);
    $get_test_name_stmt->execute();
    $get_test_name_stmt->bind_result($test_name);
    $get_test_name_stmt->fetch();
    $get_test_name_stmt->close();

    // Debug: output test name
    echo "Test Name: $test_name<br>";

    // Convert the test name to the table name format
    $table_name = strtolower(preg_replace('/[^a-zA-Z0-9]/', '_', $test_name));
    $table_name = $test_id . $table_name . $teacher_id;

    // Debug: output table name
    echo "Generated table name: $table_name<br>";

    // Delete the test from the teacher_test table
    $delete_tests_sql = "DELETE FROM teacher_test WHERE test_id = ?";
    $delete_tests_stmt = $conn->prepare($delete_tests_sql);
    $delete_tests_stmt->bind_param("i", $test_id);

    if ($delete_tests_stmt->execute()) {
        // Drop the associated table in the testZone database
        $drop_table_sql = "DROP TABLE IF EXISTS `$table_name`";
        if ($conn->query($drop_table_sql) === TRUE) {
            echo "Associated test table '$table_name' dropped successfully.<br>";
        } else {
            echo "Failed to drop the test table '$table_name'. Error: " . $conn->error . "<br>";
        }

        echo "Test deleted successfully from teacher_test table.<br>";
    } else {
        echo "Failed to delete the test from teacher_test table.<br>";
    }

    // Close the statement and the connection
    $delete_tests_stmt->close();
    $conn->close();

?>
