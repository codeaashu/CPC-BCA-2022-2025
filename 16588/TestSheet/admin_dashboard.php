<?php
session_start();

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: admin_login.php");
    exit();
}

include 'db_connection.php';

// Fetch Messages
$message_query = "SELECT id, name, email, message, created_at FROM message ORDER BY created_at DESC";
$message_result = $conn->query($message_query);
$messages = $message_result->fetch_all(MYSQLI_ASSOC);

// Fetch Teachers
$teacher_query = "SELECT teacher_id, teacher_name, teacher_gender, teacher_email FROM teachers";
$teacher_result = $conn->query($teacher_query);
$teachers = $teacher_result->fetch_all(MYSQLI_ASSOC);

// Fetch Tests
$test_query = "SELECT * FROM teacher_test ORDER BY test_date DESC";
$test_result = $conn->query($test_query);
$tests = $test_result->fetch_all(MYSQLI_ASSOC);

// Fetch Students
$student_query = "SELECT * FROM students ORDER BY reg_date DESC";
$student_result = $conn->query($student_query);
$students = $student_result->fetch_all(MYSQLI_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Dashboard - TestSheet</title>
  <link rel="icon" href="assets/images/page_logo.png">
  <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/fontawesome.css">
  <link rel="stylesheet" href="assets/css/templatemo-grad-school.css">
  <link rel="stylesheet" href="assets/css/owl.css">
  <link rel="stylesheet" href="assets/css/students.css">
  <link rel="stylesheet" href="assets/css/responsive.css">
  <style>
    .section-content { display: none; }
    .section-content.active { display: block; margin-top: 2rem; }
  </style>
</head>
<body>
  <header class="main-header clearfix" role="header">
    <img src="assets/images/navi_bar.png" class="icn menuicn" id="menuicn" alt="menu-icon">
    <div class="logo">
      <a style="margin-left: 1.7rem;" href="#"><em>Test</em> Sheet</a>
    </div>
  </header>

  <div class="main-container">
    <div class="navcontainer">
      <nav class="nav">
        <div class="nav-upper-options">
          <div class="nav-option option4 slide-option" data-section="dashboard">
            <img src="assets/images/dashboard.png" class="nav-img" alt="dashboard">
            <h3> Dashboard</h3>
          </div>
          <div class="nav-option option4 slide-option" data-section="messages">
            <img src="assets/images/institution.png" class="nav-img" alt="messages">
            <h3> Messages</h3>
          </div>
          <div class="nav-option option4 slide-option" data-section="teachers">
            <img src="assets/images/profile.png" class="nav-img" alt="teachers">
            <h3> Teachers</h3>
          </div>
          <div class="nav-option option4 slide-option" data-section="tests">
            <img src="assets/images/test.png" class="nav-img" alt="tests">
            <h3> Tests</h3>
          </div>
          <div class="nav-option option4 slide-option" data-section="students">
            <img src="assets/images/avg.png" class="nav-img" alt="students">
            <h3> Students</h3>
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

        <div id="dashboard" class="section-content active">
          <h2>Welcome, Admin!</h2>
          <p>This is your secure dashboard.</p>
        </div>

        <div id="messages" class="section-content">
          <h3>Messages from Users</h3>
          <table class="table table-bordered">
            <thead>
              <tr><th>ID</th><th>Name</th><th>Email</th><th>Message</th><th>Created At</th></tr>
            </thead>
            <tbody>
              <?php foreach ($messages as $m): ?>
              <tr>
                <td><?= htmlspecialchars($m['id']) ?></td>
                <td><?= htmlspecialchars($m['name']) ?></td>
                <td><?= htmlspecialchars($m['email']) ?></td>
                <td><?= nl2br(htmlspecialchars($m['message'])) ?></td>
                <td><?= htmlspecialchars($m['created_at']) ?></td>
              </tr>
              <?php endforeach; ?>
            </tbody>
          </table>
        </div>

        <div id="teachers" class="section-content">
          <h3>Registered Teachers</h3>
          <table class="table table-striped">
            <thead>
              <tr><th>ID</th><th>Name</th><th>Gender</th><th>Email</th></tr>
            </thead>
            <tbody>
              <?php foreach ($teachers as $t): ?>
              <tr>
                <td><?= $t['teacher_id'] ?></td>
                <td><?= htmlspecialchars($t['teacher_name']) ?></td>
                <td><?= $t['teacher_gender'] ?></td>
                <td><?= $t['teacher_email'] ?></td>
              </tr>
              <?php endforeach; ?>
            </tbody>
          </table>
        </div>

        <div id="tests" class="section-content">
          <h3>All Tests</h3>
          <table class="table table-hover">
            <thead>
              <tr><th>Test ID</th><th>Name</th><th>Subject</th><th>Date</th><th>Marks</th><th>Time</th></tr>
            </thead>
            <tbody>
              <?php foreach ($tests as $test): ?>
              <tr>
                <td><?= $test['test_id'] ?></td>
                <td><?= htmlspecialchars($test['test_name']) ?></td>
                <td><?= $test['subject'] ?></td>
                <td><?= $test['test_date'] ?></td>
                <td><?= $test['total_marks'] ?></td>
                <td><?= $test['total_time'] ?> min</td>
              </tr>
              <?php endforeach; ?>
            </tbody>
          </table>
        </div>

        <div id="students" class="section-content">
          <h3>Student Results Overview</h3>
          <table class="table table-bordered">
            <thead>
              <tr><th>ID</th><th>Name</th><th>Test</th><th>Subject</th><th>Score</th><th>Status</th><th>Percentage</th><th>Date</th></tr>
            </thead>
            <tbody>
              <?php foreach ($students as $s): ?>
              <tr>
                <td><?= $s['s_id'] ?></td>
                <td><?= htmlspecialchars($s['s_name']) ?></td>
                <td><?= htmlspecialchars($s['test_name']) ?></td>
                <td><?= htmlspecialchars($s['subject']) ?></td>
                <td><?= $s['obtained_marks'] ?>/<?= $s['total_marks'] ?></td>
                <td><?= ucfirst($s['status']) ?></td>
                <td><?= $s['percentage'] ?>%</td>
                <td><?= $s['test_date'] ?></td>
              </tr>
              <?php endforeach; ?>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </div>

  <script>
    document.querySelectorAll('.slide-option').forEach(option => {
      option.addEventListener('click', () => {
        const sectionId = option.dataset.section;
        document.querySelectorAll('.section-content').forEach(sec => sec.classList.remove('active'));
        document.getElementById(sectionId).classList.add('active');
      });
    });

    document.getElementById("logout").addEventListener("click", function () {
      if (confirm("Are you sure you want to logout?")) {
        window.location.href = "logout.php";
      }
    });
  </script>
  <script src="assets/js/student.js"></script>
  <script src="assets/js/isotope.min.js"></script>
  <script src="assets/js/custom.js"></script>
</body>
</html>
