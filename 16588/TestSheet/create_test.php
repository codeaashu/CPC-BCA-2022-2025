<?php
session_start();
$servername = "sql311.infinityfree.com";
$username = "if0_37331201";  // your database username
$password = "W33LAgXuWC3JFnI";  // your database password
$dbname = "if0_37331201_testzone";  // your database name

// Check if the testID is set in the session
if (!isset($_SESSION['testID'])) {
  header("Location: teacher.php");
  exit();
}

$testID = $_SESSION['testID'];
$teacherID = $_SESSION['teacherID'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch the most recently created test using a prepared statement
$sql = "SELECT * FROM teacher_test WHERE test_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $testID); // Assuming testID is an integer
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $test = $result->fetch_assoc();
    $testId = htmlspecialchars($test['test_id']);
    $testName = htmlspecialchars($test['test_name']);
    $subject = htmlspecialchars($test['subject']);
    $testDate = htmlspecialchars($test['test_date']);
    $totalMarks = htmlspecialchars($test['total_marks']);
    $totalTime = htmlspecialchars($test['total_time']);
    $totalQuestions = htmlspecialchars($test['total_questions']);
} else {
    die("No test found.");
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize table name
    $tableName = preg_replace('/[^a-zA-Z0-9_]/', '_', $testName);
    $tableName = $testID.$tableName.$teacherID;

    // Create a table for the test using a safe query
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

    // Insert questions into the newly created table using prepared statements
    $insertSQL = "INSERT INTO `$tableName` (question, option1, option2, option3, option4, correct_option)
                  VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($insertSQL);

    for ($i = 1; $i <= $totalQuestions; $i++) {
        $question = $conn->real_escape_string($_POST["question_$i"]);
        $option1 = $conn->real_escape_string($_POST["question_{$i}_option_1"]);
        $option2 = $conn->real_escape_string($_POST["question_{$i}_option_2"]);
        $option3 = $conn->real_escape_string($_POST["question_{$i}_option_3"]);
        $option4 = $conn->real_escape_string($_POST["question_{$i}_option_4"]);
        $correctOption = intval($_POST["question_{$i}_correct_option"]);

        // Bind the parameters and execute the statement
        $stmt->bind_param("sssssi", $question, $option1, $option2, $option3, $option4, $correctOption);
        if ($stmt->execute() === FALSE) {
            die("Error inserting question: " . $stmt->error);
        }
    }

    echo "Test created successfully!";
    // Redirect to avoid resubmission
    header("Location: teacher.php");
    exit();
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,600,700,800,900" rel="stylesheet">
    <title>TestZone</title>
    <link rel="icon" href="assets/images/page_logo.png">
    
    <!-- Bootstrap core CSS -->
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Additional CSS Files -->
    <link rel="stylesheet" href="assets/css/fontawesome.css">
    <link rel="stylesheet" href="assets/css/templatemo-grad-school.css">
    <link rel="stylesheet" href="assets/css/owl.css">
    <link rel="stylesheet" href="assets/css/lightbox.css">
    <link rel="stylesheet" href="assets/css/students.css">
    <link rel="stylesheet" href="assets/css/responsive.css">
    <style>
      .option, .correct, textarea {
    width: 100%; /* Make all elements responsive to the container */
    max-width: 18rem; /* Set a maximum width to control their size */
}

.correct {
    max-width: 8rem; /* A smaller max-width for the correct option */
}

.form-group {
    margin-bottom: 1.5rem; /* Ensure consistent spacing between elements */
}

/* Align label and input fields side by side */
.form-group label {
    display: block;
    margin-bottom: 0.5rem; /* Adds some space between label and input */
}

.form-control {
    display: block;
    margin-bottom: 1rem;
}

textarea {
    resize: none; /* Prevent the user from resizing the textarea */
}

.form-group input, .form-group textarea {
    margin-bottom: 10px;
}

button {
    margin-top: 1rem; /* Add some space above the button */
}
.options-row {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
}

.options-row .form-control {
    flex: 1;
}

.correct-option {
    width: 8rem; /* Fixed width for the correct option */
}

    </style>
</head>
<body>

    <!--header-->
  <header class="main-header clearfix" role="header">
    <img src="assets/images/navi_bar.png" class="icn menuicn" id="menuicn" alt="menu-icon">
    <div class="logo">
      <a style="margin-left: 3rem;" href="#"><em>Test</em> Zone</a>
    </div>
    <a href="#menu" class="menu-link"><i class="fa fa-bars"></i></a>
    <nav id="menu" class="main-nav" role="navigation">
      <ul class="main-menu">
        <li><a href="teacher.php">Home</a></li>
      </ul>
    </nav>
  </header>

  <div class="main-container">
    <div class="navcontainer">
      <nav class="nav">
        <div class="nav-upper-options">
          <div class="nav-option option5 slide-option" id="profile">
            <img src="assets/images/profile.png" class="nav-img" alt="Profile">
            <h3>Profile</h3>
          </div>
          <div class="nav-option option4 slide-option" id="create">
            <img src="assets/images/dashboard.png" class="nav-img" alt="Create Test">
            <h3>Create Test</h3>
          </div>
          <div class="nav-option option4 slide-option" id="list">
            <img src="assets/images/institution.png" class="nav-img" alt="View Test">
            <h3>Test List</h3>
          </div>
          <div class="nav-option option6 slide-option" id="details">
            <img src="assets/images/settings.png" class="nav-img" alt="Get Details">
            <h3>Test Details</h3>
          </div>
          <div class="nav-option logout slide-option" id="logout">
            <img src="assets/images/log-out.png" class="nav-img" alt="Logout">
            <h3>Logout</h3>
          </div>
        </div>
      </nav>
    </div>

    <div class="main">
      <div class="box-container">
        <h2>Create Test: <?php echo htmlspecialchars($testName); ?></h2>
        <h2>Test ID: <?php echo htmlspecialchars($testId); ?></h2>
        <h2>Subject: <?php echo htmlspecialchars($subject); ?></h2>
        <h2>Test Date: <?php echo htmlspecialchars($testDate); ?></h2>
        <h2>Total Marks: <?php echo htmlspecialchars($totalMarks); ?></h2>
        <h2>Total Time: <?php echo htmlspecialchars($totalTime); ?> min</h2>
        </div>
        <form method="post" style="margin-bottom:100px">
            <?php for ($i = 1; $i <= $totalQuestions; $i++): ?>
                <div class="form-group">
                    <label for="question_<?php echo $i; ?>">Question <?php echo $i; ?>:</label>
                    <textarea id="question_<?php echo $i; ?>" name="question_<?php echo $i; ?>" class="form-control" required></textarea>
                    
                    <label>Option 1:</label>
                    <input class="option form-control" type="text" name="question_<?php echo $i; ?>_option_1" required>
                    
                    <label>Option 2:</label>
                    <input class="option form-control" type="text" name="question_<?php echo $i; ?>_option_2" required>
                    
                    <label>Option 3:</label>
                    <input class="option form-control" type="text" name="question_<?php echo $i; ?>_option_3" required>
                    
                    <label>Option 4:</label>
                    <input class="option form-control" type="text" name="question_<?php echo $i; ?>_option_4" required>
                    
                    <label>Correct Option:</label>
                    <input class="correct form-control" type="number" name="question_<?php echo $i; ?>_correct_option" required min="1" max="4">
                </div>
            <?php endfor; ?>
            <center>
            <button type="submit" class="btn btn-primary">Create Test</button>
            </center>
        </form>
    </div>

    <script src="assets/js/student.js"></script>
    <script src="assets/js/isotope.min.js"></script>
    <script src="assets/js/custom.js"></script>
</body>
</html>
