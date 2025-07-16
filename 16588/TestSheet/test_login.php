<?php
session_start();  // Start the session
// Redirect to login if not logged in




// Check if 'test_id' and 'teacher_id' are set in the URL
if (isset($_GET['test_id']) && isset($_GET['teacher_id'])) {
    // Retrieve the values
    $testID = $_GET['test_id'];
    $teacherID = $_GET['teacher_id'];

}
elseif(isset($_SESSION['testID']) && isset($_SESSION['teacherID'])){
    // Retrieve the values
    $testID = $_SESSION['testID'];
    $teacherID = $_SESSION['teacherID'];
}

// if (isset($_GET['testID'])) {
//     $testID = $_GET['testID'];  // Prioritize POST data
// } elseif (isset($_SESSION['testID'])) {
//     $testID = $_SESSION['testID'];  // Use SESSION data if POST is not available
// }

    $_SESSION['testID']=$testID;
    $_SESSION['teacherID']=$teacherID;

// Include the database connection
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get form input values
    
    $userName = $_POST['userName'];  // Also retrieve the userName and userID from the form
    $userID = $_POST['userID'];

    $_SESSION['userName'] = $userName;  // Store userName in session
    $_SESSION['userID'] = $userID;      // Store userID in session


    // Fetch the name from the database using test_id
    $sql = "SELECT test_name, subject, total_marks, total_questions, total_time 
    FROM publish WHERE test_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i",$testID);  // assuming test_id is an integer
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $name = $row['test_name'];
        $subject=$row['subject'];
        $totalMarks=$row['total_marks'];
        $total_questions=$row['total_questions'];
        $total_time= $row['total_time'];

        // Concatenate the fetched name with test_id and teacher_id
        $concatenatedData =$name;
        $concatenatedData = preg_replace('/[^a-zA-Z0-9_]/', '_', $concatenatedData);
        $concatenatedData = $testID.$name.$teacherID;
        
        // Store the data in session variables
        
        $_SESSION['testName'] = $name;
        $_SESSION['concatenatedData'] = $concatenatedData;
        $_SESSION['subject'] = $subject;
        $_SESSION['total_marks'] = $totalMarks;
        $_SESSION['total_questions'] = $total_questions;
        $_SESSION['total_time'] = $total_time;

        $sql_check = "SELECT COUNT(*) FROM students WHERE s_id = ? AND test_id = ?";
$stmt_check = $conn->prepare($sql_check);
$stmt_check->bind_param("ii", $userID,$testID);
$stmt_check->execute();
$stmt_check->bind_result($count);
$stmt_check->fetch();
$stmt_check->close();
if ($count > 0) {
  header("Location: test_login.php");
  exit();
}
  else{
        // Redirect to the next page
        header("Location: test.php");
        exit();
    }
  }
    $stmt->close();
    $conn->close();
}
?>



<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,600,700,800,900" rel="stylesheet">
    <title>TestSheet</title>
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
    <link rel="stylesheet" href="assets/css/track.css">
    <style>
      .option, .correct {
        width: 100%; /* Full width to adapt to container */
        max-width: 18rem; /* Maximum width to keep inputs from being too wide */
      }

      .correct {
        max-width: 8rem;
      }

      .form-group {
        margin-bottom: 1rem;
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
        <li><a href="student.php">Home</a></li>
      </ul>
    </nav>
  </header>

  
  <div class="main-container">
        <div class="navcontainer">
            <nav class="nav">
                <div class="nav-upper-options">

                <div class="nav-option option5 slide-option" id="profile">
    <img src="assets/images/profile.png" class="nav-img" alt="blog">
    <h3> Profile</h3>
</div>

                <div class="nav-option option4 slide-option" id="dashboard">
    <img src="assets/images/dashboard.png" class="nav-img" alt="dashboard">
    <h3> Dashboard</h3>
</div>

<div class="nav-option option4 slide-option" id="test">
    <img src="assets/images/institution.png" class="nav-img" alt="test">
    <h3> Test </h3>
</div>


<div class="nav-option option6 slide-option" id="settings">
    <img src="assets/images/settings.png" class="nav-img" alt="settings">
    <h3> Settings</h3>
</div>
<div class="nav-option logout slide-option" id="logout">
    <img src="assets/images/log-out.png" class="nav-img" alt="logout">
    <h3>Logout</h3>
</div>

                </div>
            </nav>
        </div>

    <div class="main">
      <div class="box-container">
      <form id="testForm" method="POST">
    <div class="form-group">
      <label for="username" style="font-size:22px;min-width:114px">UserName :</label>
      <input type="text" name="userName" id="userName" placeholder="Enter your Name " style="color: black;height: 47px;font-size: 18px;" class="test-input" required>
    </div>
    <div class="form-group">
      <label for="UserID" style="font-size:22px;min-width:114px">User ID:</label>
      <input type="number" name="userID" id="userID" placeholder="Enter user ID" style="color: black;height: 47px;font-size: 18px;" class="test-input" required>
    </div>
    <div class="form-group">
      <button class="btn btn-primary start-test-button" id="startTestButton" style="margin-top: 4rem;margin-left: 7rem;" type="submit">Start Test</button>
    </div>
</form>

      </div>
    </div>

<script src="assets/js/student.js"></script>
<script src="assets/js/isotope.min.js"></script>
<script src="assets/js/custom.js"></script>
<script src="assets/js/dynamics_stu.js"></script>
</body>
</html>
