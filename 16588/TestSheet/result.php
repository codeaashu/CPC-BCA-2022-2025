<?php
// Start the session
session_start();

error_reporting(E_ALL);
ini_set('display_errors', 1);

include('db_connection.php'); // Include the DB connection

// Ensure the necessary session variables and form data are available
if (!isset($_SESSION['original_order']) || !isset($_POST['answers'])) {
    header("Location: student.php");
}


// Retrieve session data
$original_order = $_SESSION['original_order']; // This should contain the original question order
$selected_answers = $_POST['answers']; // The submitted answers by the student

// Sort the selected answers by question ID to maintain the correct sequence
ksort($selected_answers);
// Convert the selected answers array to a string (for storage without serialization)

// Iterate through the original order and check if each question has a selected answer
$final_answers = [];
foreach ($original_order as $questionID => $correct_answer) {
    // If the answer is selected for this question, use it; otherwise, store 'no'
    if (isset($selected_answers[$questionID])) {
        $final_answers[$questionID] = $selected_answers[$questionID]; // Store the selected answer
    } else {
        $final_answers[$questionID] = 'no'; // Store 'no' for unanswered questions
    }
}

// Convert the final answers array to a string (for storage without serialization)
$answer_string = implode(",", $final_answers);


// Check if form data is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get form input values
    $studentName = $_POST['studentName'] ?? '';
    $studentID = $_POST['studentID'] ?? '';
    $teacherID = $_POST['teacherID'] ?? '';
    $testName = $_POST['testName'] ?? '';
    $testID = intval($_POST['testID']) ?? '';
    $subject = $_POST['subject'] ?? '';
    $activity_status = $_POST['activity_status'] ?? '';
    $totalMarks = $_POST['totalMarks'] ?? '';
    $total_questions = $_POST['total_questions'] ?? '';
    $total_time = $_POST['total_time'] ?? '';
    $_SESSION['testID']=$testID;
    $_SESSION['teacherID']=$teacherID;
    $_SESSION['userID']=$studentID;
    $_SESSION['studentID']=$studentID;
    // Fetch the score, correct, incorrect answers, and percentage from session or calculation
    $score = $_SESSION['score'] ?? 0;
    $correct_answers = $_SESSION['correct_answers'] ?? 0;
    $incorrect_answers = $total_questions - $correct_answers;
    $percentage = $_SESSION['percentage'] ?? 0;
}
if(!$activity_status=="Suspicious Activity : Tab Switched" || !$activity_status=="Suspicious Activity : Opening Dev Tool" ){
    $activity_status="Verified activity";
}


// Ensure the user is logged in
if (!isset($_SESSION['userName']) || !isset($_SESSION['userID'])) {
    header("Location: test_login.php");
    exit();
}

// Get the submitted answers and correct answers
$correct_count = 0;
$incorrect_count = 0;
$total_marks = $_POST['totalMarks']; // Get total marks from the form
$max_score = count($original_order); // Assuming each question is worth 1 mark
$not_attempted_count =0;

// Compare the original order with the selected answers
foreach ($original_order as $questionID => $correct_answer) {
    if (isset($final_answers[$questionID]) && $final_answers[$questionID] == $correct_answer) {
        $correct_count++;
    } elseif($final_answers[$questionID]== 'no') {
        $not_attempted_count++;
    } else {
        $incorrect_count++;
    }
}
// Calculate the final score and percentage
$eachQuesMarks = $total_marks / $max_score;
$final_score = $correct_count;
$obtainedMarks = $correct_count * (int)$eachQuesMarks;
$percentage = ($final_score * (int)$eachQuesMarks / $total_marks) * 100;
$status='fail';
if ($percentage >= 30) {
    $status='pass';
}
else{
    $status='fail';
}

// Check if the record already exists
$sql_check = "SELECT COUNT(*) FROM students WHERE s_id = ? AND test_id = ?";
$stmt_check = $conn->prepare($sql_check);
$stmt_check->bind_param("ii", $studentID, $testID);
$stmt_check->execute();
$stmt_check->bind_result($count);
$stmt_check->fetch();
$stmt_check->close();



if ($count > 0) {
    header("Location: test_login.php");
    exit();
} else {
    // Insert the result into the database
    $sql = "INSERT INTO students (s_id, test_id, s_name, test_name, subject, total_questions, total_time, teacher_id, total_marks, correct_answer, not_attempt, incorrect_answer, obtained_marks, percentage,answer,status,activity) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)";
    $stmt = $conn->prepare($sql);
    // Serialize the answers array to store it in the database
    $stmt->bind_param("iisssisiiiiiiisss", $studentID, $testID, $studentName, $testName, $subject, $total_questions, $total_time, $teacherID, $total_marks, $correct_count,$not_attempted_count, $incorrect_count, $obtainedMarks, $percentage, $answer_string,$status,$activity_status);
    $stmt->execute();
    $stmt->close();
}

// Close the database connection
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

    window.onpopstate = function () {
    if (window.location.href !== 'https://testsheet.rf.gd') {
        window.location.href = 'https://testsheet.rf.gd';
    }
};

         // Prevent the back button from navigating back
        window.history.pushState(null, "", window.location.href);
        
        // Trigger when the user tries to go back
        window.onpopstate = function() {
            // Redirect to a specified page when back button is pressed
            window.location.href = 'https://testsheet.rf.gd';  // Replace 'student.php' with the desired URL
        };
    </script>

    <style>
        label {
            color: black;
            font-weight: 500;
        }

        .form-container {
            background-color: #f7f7f7;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }

        .form-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
            color: black;
        }

        .form-group {
            margin-bottom: 15px;
        }

        .form-label {
            font-weight: bold;
        }

        .submit-btn {
            background-color: #5cb85c;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 5px;
        }

        .submit-btn:hover {
            background-color: #4cae4c;
        }
    </style>
</head>

<body>
    <header class="main-header clearfix" role="header">
        <div class="logo">
            <a style="margin-left: 3rem;" href="#"><em>Test</em> Sheet</a>
        </div>
    </header>

    <div class="container" style="margin-top: 2vh; max-width: 800px;">
        <!-- Form container -->
        <div class="form-container">
            <div class="form-title">Test Results</div>
            
            <!-- Form for displaying test details -->
            <form id="myForm" method="post" action="view_results.php">
                
                <!-- Student Information Section -->
                <div class="form-group">
                    <label class="form-label" for="studentName">Student Name:</label>
                    <input type="text" class="form-control" id="studentName" name="studentName" value="<?php echo htmlspecialchars($studentName); ?>" readonly>
                </div>

                <div class="form-group">
                    <label class="form-label" for="studentID">Student ID:</label>
                    <input type="text" class="form-control" id="studentID" name="studentID" value="<?php echo htmlspecialchars($studentID); ?>" readonly>
                </div>

                <!-- Test Information Section -->
                <div class="form-group">
                    <label class="form-label" for="testName">Test Name:</label>
                    <input type="text" class="form-control" id="testName" name="testName" value="<?php echo htmlspecialchars($testName); ?>" readonly>
                </div>

                <div class="form-group">
                    <label class="form-label" for="subject">Subject:</label>
                    <input type="text" class="form-control" id="subject" name="subject" value="<?php echo htmlspecialchars($subject); ?>" readonly>
                </div>

                <!-- Test Details Section -->
                <div class="form-group">
                    <label class="form-label" for="totalMarks">Total Marks:</label>
                    <input type="text" class="form-control" id="totalMarks" name="totalMarks" value="<?php echo htmlspecialchars($totalMarks); ?>" readonly>
                </div>

                <div class="form-group">
                    <label class="form-label" for="total_questions">Total Questions:</label>
                    <input type="text" class="form-control" id="total_questions" name="total_questions" value="<?php echo htmlspecialchars($total_questions); ?>" readonly>
                </div>

                <!-- New Section: Score, Correct, Incorrect Answers, and Percentage -->
                <div class="form-group">
                    <label class="form-label" for="score">Score:</label>
                    <input type="text" class="form-control" id="score" name="score" value="<?php echo "Final Score: " . $final_score . " / " . $total_questions; ?>" readonly>
                </div>

                <div class="form-group">
                    <label class="form-label" for="correct_answers">Correct Answers:</label>
                    <input type="text" class="form-control" id="correct_answers" name="correct_answers" value="<?php echo $correct_count ; ?>" readonly>
                </div>

                <div class="form-group">
                    <label class="form-label" for="incorrect_answers">Incorrect Answers:</label>
                    <input type="text" class="form-control" id="incorrect_answers" name="incorrect_answers" value="<?php echo $incorrect_count; ?>" readonly>
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="incorrect_answers">Obtained Marks:</label>
                    <input type="text" class="form-control" id="obtainedMarks" name="obtainedMarks" value="<?php echo $obtainedMarks; ?>" readonly>
                </div>

                <div class="form-group">
                    <label class="form-label" for="percentage">Percentage:</label>
                    <input type="text" class="form-control" id="percentage" name="percentage" value="<?php echo htmlspecialchars($percentage)."%"; ?>" readonly>
                </div>

                <!-- Submit button -->
                <div class="form-group">
                    <button type="submit" class="submit-btn">View Solved Question</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Scripts -->
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
</body>
</html>
