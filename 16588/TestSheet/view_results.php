<?php
session_start();
include('db_connection.php'); // Include the DB connection

// Ensure the user is logged in
if (!isset($_SESSION['testID']) || !isset($_SESSION['userID'])) {
    header("Location: test_login.php");
    exit();
}

// Get test details
$testID = $_SESSION['testID'] ?? '';
$studentID = $_SESSION['userID']?? '';
$teacherID = $_SESSION['teacherID']?? '';

if (empty($testID) || empty($studentID)) {
    die('Error: Test ID or Student ID is missing.');
}

// Fetch the test details from the students table
$sql = "SELECT s_name, test_name, subject, total_questions, total_time, total_marks, correct_answer,not_attempt, incorrect_answer, obtained_marks, percentage, answer
        FROM students 
        WHERE test_id = ? AND s_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $testID, $studentID);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    die('No test results found.');
}

$row = $result->fetch_assoc();

// Convert the answer string (e.g., '1,2,3,1,4') into an array
$answers = explode(',', $row['answer']);

// Get the table name to fetch the questions and options
$tableName = preg_replace('/[^a-zA-Z0-9_]/', '_', $row['test_name']);
$tableName=$testID.$tableName.$teacherID;
// Fetch the questions and options from the test table
$sql_questions = "SELECT question, option1, option2, option3, option4, correct_option FROM `$tableName`";
$stmt_questions = $conn->prepare($sql_questions);
$stmt_questions->execute();
$questions_result = $stmt_questions->get_result();

$questions = [];
while ($question_row = $questions_result->fetch_assoc()) {
    $questions[] = $question_row;
}

$stmt->close();
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
    <title>TestSheet - View Test Results</title>
    <link rel="icon" href="assets/images/page_logo.png">
    
    <!-- Bootstrap core CSS -->
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Additional CSS Files -->
    <link rel="stylesheet" href="assets/css/fontawesome.css">
    <link rel="stylesheet" href="assets/css/templatemo-grad-school.css">
    <link rel="stylesheet" href="assets/css/owl.css">
    <link rel="stylesheet" href="assets/css/lightbox.css">
    <link rel="stylesheet" href="assets/css/test.css">
    <link rel="stylesheet" href="assets/css/track.css">
    <script>
         // Prevent the back button from navigating back
        window.history.pushState(null, "", window.location.href);
        
        // Trigger when the user tries to go back
        window.onpopstate = function() {
            // Redirect to a specified page when back button is pressed
            window.location.href = 'student.php';  // Replace 'student.php' with the desired URL
        };
    </script>
    
    <style>
        .results-container {
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

        }

        .results-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
        }

        .results-item {
            margin-bottom: 15px;
        }

        .results-label {
            font-weight: bold;
        }

        .results-value {
            font-weight: normal;
        }
    </style>
</head>
<body>
<header class="main-header clearfix" style="display: block;" role="header">
    <div class="logo">
      <a style="margin-left: 3rem;" href="#"><em>Test</em> Zone</a>
    </div>
    <a href="#menu" class="menu-link"><i class="fa fa-bars"></i></a>
    <nav id="menu" class="main-nav" role="navigation">
      <ul class="main-menu">
        <li><a href="student.php">Home</a></li>
      </ul>
    </nav>
  </header>

    <div class="container" style="margin-top: 2vh; max-width: 800px;">
        <div class="results-container" style="margin-top: 3vh;">
            <center><div class="results-title"style="font-size:40px">Test Info...</div></center>
            
            <!-- Test Information -->
            <div class="results-item">
                <span class="results-label">Student Name:</span>
                <span class="results-value"><?php echo htmlspecialchars($row['s_name']); ?></span>
            </div>

            <div class="results-item">
                <span class="results-label">Test Name:</span>
                <span class="results-value"><?php echo htmlspecialchars($row['test_name']); ?></span>
            </div>

            <div class="results-item">
                <span class="results-label">Subject:</span>
                <span class="results-value"><?php echo htmlspecialchars($row['subject']); ?></span>
            </div>

            <div class="results-item">
                <span class="results-label">Total Marks:</span>
                <span class="results-value"><?php echo htmlspecialchars($row['total_marks']); ?></span>
            </div>

            <div class="results-item">
                <span class="results-label">Total Questions:</span>
                <span class="results-value"><?php echo htmlspecialchars($row['total_questions']); ?></span>
            </div>

            <div class="results-item">
                <span class="results-label">Score:</span>
                <span class="results-value"><?php echo htmlspecialchars($row['obtained_marks']); ?></span>
            </div>

            <div class="results-item">
                <span class="results-label">Correct Answers:</span>
                <span class="results-value"><?php echo htmlspecialchars($row['correct_answer']); ?></span>
            </div>

            <div class="results-item">
                <span class="results-label">Incorrect Answers:</span>
                <span class="results-value"><?php echo htmlspecialchars($row['incorrect_answer']); ?></span>
            </div>

            <div class="results-item">
                <span class="results-label">Not Attempted:</span>
                <span class="results-value"><?php echo htmlspecialchars($row['not_attempt']); ?></span>
            </div>

            <div class="results-item">
                <span class="results-label">Percentage:</span>
                <span class="results-value"><?php echo htmlspecialchars($row['percentage']); ?>%</span>
            </div>

            <!-- Display Test Questions and Answers -->
            <center><div class="results-title" style="font-size:40px">Test Questions</div></center>
            <div>
            <?php foreach ($questions as $index => $question) : ?>
                <div class="results-item">
                    <div class="results-label" style="float: left;width: 100px;">Question <?php echo ($index + 1); ?>:</div>
                    <div class="results-value"><?php echo htmlspecialchars($question['question']); ?></div>
                </div>
                <div class="results-item">
                    <div class="results-label" style="float: left;width: 100px;">Option 1:</div>
                    <div class="results-value"><?php echo htmlspecialchars($question['option1']); ?></div>
                </div>
                <div class="results-item">
                    <div class="results-label" style="float: left;width: 100px;">Option 2:</div>
                    <div class="results-value"><?php echo htmlspecialchars($question['option2']); ?></div>
                </div>
                <div class="results-item">
                    <div class="results-label" style="float: left;width: 100px;">Option 3:</div>
                    <div class="results-value"><?php echo htmlspecialchars($question['option3']); ?></div>
                </div>
                <div class="results-item">
                    <div class="results-label" style="float: left;width: 100px;">Option 4:</div>
                    <div class="results-value"><?php echo htmlspecialchars($question['option4']); ?></div>
                </div>
                <div class="results-item">
                    <div class="results-label">Correct Option:</div>
                    <div class="results-value"><?php echo htmlspecialchars($question['correct_option']); ?></div>
                </div>
                
                <?php
                // Set color based on whether the selected answer matches the correct answer
                $color = (isset($answers[$index]) && $answers[$index] == $question['correct_option']) ? 'green' : 'red';
                ?>

                <div class="results-item">
                    <div class="results-label" style="color: <?php echo $color; ?>;">Selected Option:</div>
                    <div class="results-value" style="color: <?php echo $color; ?>;">
                        <?php echo htmlspecialchars($answers[$index] ?? 'Not Answered'); ?>
                    </div>
                </div>
                <hr>
            <?php endforeach; ?>
        </div>
    </div>
</div>
    <!-- Scripts -->
    <script src="assets/js/test.js"></script>
    <script src="assets/js/isotope.min.js"></script>
    <script src="assets/js/custom.js"></script>

</body>
</html>
