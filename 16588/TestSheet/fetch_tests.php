<?php
// db.php
$servername = "sql311.infinityfree.com"; // Replace with your server name
$username = "if0_37331201";        // Replace with your database username
$password = "W33LAgXuWC3JFnI";            // Replace with your database password
$dbname = "if0_37331201_testzone";      // Replace with your database name

session_start();

// Check if the session variable is set
if (!isset($_SESSION['teacherID'])) {
    echo json_encode(["error" => "Teacher ID is not set in session."]);
    exit();
}

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare the SQL statement to prevent SQL injection
$stmt = $conn->prepare("SELECT * FROM teacher_test WHERE teacher_id = ?");
$stmt->bind_param("i", $_SESSION['teacherID']); // Assuming teacher_id is an integer

// Execute the query
$stmt->execute();
$result = $stmt->get_result();

$tests = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $tests[] = $row;
    }
}

// Return results as JSON
echo json_encode($tests);

// Close the statement and connection
$stmt->close();
$conn->close();
?>
