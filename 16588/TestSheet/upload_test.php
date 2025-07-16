<?php
session_start();

// Database credentials
$servername = "sql311.infinityfree.com";
$username = "if0_37331201";
$password = "W33LAgXuWC3JFnI";
$dbname = "if0_37331201_testzone";

// Ensure testID and teacherID are set in the session
if (!isset($_SESSION['testID'], $_SESSION['teacherID'])) {
    header("Location: teacher.php");
    exit();
}

$testID = $_SESSION['testID'];
$teacherID = $_SESSION['teacherID'];

// Connect to the database
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch test details
$sql = "SELECT * FROM teacher_test WHERE test_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $testID);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $test = $result->fetch_assoc();
    $testName = htmlspecialchars($test['test_name']);
} else {
    die("No test found.");
}

// Handle CSV upload
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES['csv_file'])) {
    $tableName = preg_replace('/[^a-zA-Z0-9_]/', '_', $testName);
    $tableName = $testID . $tableName . $teacherID;

    $createTableSQL = "CREATE TABLE IF NOT EXISTS `$tableName` (
        id INT AUTO_INCREMENT PRIMARY KEY,
        question TEXT NOT NULL,
        option1 VARCHAR(255) NOT NULL,
        option2 VARCHAR(255) NOT NULL,
        option3 VARCHAR(255) NOT NULL,
        option4 VARCHAR(255) NOT NULL,
        correct_option TINYINT NOT NULL
    )";
    if ($conn->query($createTableSQL) === FALSE) {
        die("Error creating table: " . $conn->error);
    }

    $fileTmpPath = $_FILES['csv_file']['tmp_name'];
    $file = fopen($fileTmpPath, 'r');

    if ($file === FALSE) {
        die("Error opening uploaded CSV file.");
    }

    // Skip the first line (header row)
    fgetcsv($file);

    $insertSQL = "INSERT INTO `$tableName` (question, option1, option2, option3, option4, correct_option) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($insertSQL);

    $rowCount = 0;
    while (($row = fgetcsv($file)) !== FALSE) {
        if (count($row) != 6) {
            die("CSV file must contain exactly 6 columns: question, option1, option2, option3, option4, correct_option.");
        }

        [$question, $option1, $option2, $option3, $option4, $correctOption] = $row;
        $stmt->bind_param("sssssi", $question, $option1, $option2, $option3, $option4, $correctOption);

        if ($stmt->execute() === FALSE) {
            die("Error inserting question on row $rowCount: " . $stmt->error);
        }

        $rowCount++;
    }

    fclose($file);

    echo "Test created successfully with $rowCount questions!";
    header("Location: https://testsheet.rf.gd/teacher.php");
    exit();
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload Test</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <title>TestSheet</title>
    <link rel="icon" href="assets/images/page_logo.png">

    
    <link rel="stylesheet" href="assets/css/templatemo-grad-school.css">
    <link rel="stylesheet" href="assets/css/owl.css">
    <link rel="stylesheet" href="assets/css/fontawesome.css">
    <link rel="stylesheet" href="assets/css/lightbox.css">
    <link rel="stylesheet" href="assets/css/students.css">
    <link rel="stylesheet" href="assets/css/responsive.css">
    
</head>
<body>

<header class="main-header clearfix" role="header">
    <img src="assets/images/navi_bar.png" class="icn menuicn" id="menuicn" alt="menu-icon">
    <div class="logo">
      <a style="margin-left: 3rem;" href="#"><em>Test</em> Sheet</a>
    </div>
    <a href="#menu" class="menu-link"><i class="fa fa-bars"></i></a>
    <nav id="menu" class="main-nav" role="navigation">
      <ul class="main-menu">
        <li><a href="teacher.php">Home</a></li>
      </ul>
    </nav>
  </header>


<div class="container mt-5">
    <h2>Upload Questions for Test: <?php echo htmlspecialchars($testName); ?></h2>
    <form id="uploadForm" method="post" enctype="multipart/form-data">
        <div class="form-group">
            <label for="csv_file">Upload CSV File:</label>
            <input type="file" name="csv_file" id="csv_file" class="form-control" accept=".csv" required>
            <small class="form-text text-muted">
    <ul>
        <li>The CSV file must have 6 columns: <strong>question</strong>, <strong>option1</strong>, <strong>option2</strong>, <strong>option3</strong>, <strong>option4</strong>, <strong>correct_option</strong>. The first row (header) will be ignored.</li>
        <li>The <strong>correct_option</strong> column must contain the correct option number from the option list, like <strong>1</strong>, <strong>2</strong>, <strong>3</strong>, and <strong>4</strong>.</li>
    </ul>
    <table class="table table-bordered mt-3">
        <thead>
            <tr>
                <th>question</th>
                <th>option1</th>
                <th>option2</th>
                <th>option3</th>
                <th>option4</th>
                <th>correct_option</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>What is the capital of France?</td>
                <td>Berlin</td>
                <td>Madrid</td>
                <td>Paris</td>
                <td>Rome</td>
                <td>3</td>
            </tr>
            <tr>
                <td>What is 2 + 2?</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>2</td>
            </tr>
            
        </tbody>
    </table>
</small>

        </div>
        <button type="submit" class="btn btn-primary">Upload</button>
    </form>
    <div id="tableDisplay" class="mt-4"></div>
</div>

<script>
$(document).ready(function () {
    $('#csv_file').on('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const lines = e.target.result.split('\n');
                let table = '<table class="table table-bordered"><thead><tr>';

                // Display the header
                const headers = lines[0].split(',');
                headers.forEach(header => table += `<th>${header.trim()}</th>`);
                table += '</tr></thead><tbody>';

                // Display the rows (excluding the header)
                for (let i = 1; i < lines.length; i++) {
                    if (lines[i].trim()) {
                        const cells = lines[i].split(',');
                        table += '<tr>';
                        cells.forEach(cell => table += `<td>${cell.trim()}</td>`);
                        table += '</tr>';
                    }
                }

                table += '</tbody></table>';
                $('#tableDisplay').html(table);
            };
            reader.readAsText(file);
        }
    });

    $('#uploadForm').on('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);

        $.ajax({
            url: '',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                window.location.href = "https://testsheet.rf.gd/teacher.php";
            },
            error: function () {
                $('#tableDisplay').html('<div class="alert alert-danger">Error uploading CSV file.</div>');
            }
        });
    });
});
</script>

    <script src="assets/js/student.js"></script>
    <script src="assets/js/isotope.min.js"></script>
    <script src="assets/js/custom.js"></script>
</body>
</html>
