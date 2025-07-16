<?php
session_start();

// Redirect to login if not logged in
if (!isset($_SESSION['student_Name']) || !isset($_SESSION['student_ID'])) {
    header("Location: login_student.php");
    exit();
}

$student_Name = $_SESSION['student_Name'];
$student_ID = $_SESSION['student_ID'];
$student_Gender = $_SESSION['student_Gender'];


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get teacherID and testID from POST request
    $teacherID = $_POST['teacherID'];
    $testID = $_POST['testID'];
    // Save them in session
    $_SESSION['teacherID'] = $teacherID;
    $_SESSION['testID'] = $testID;

    // Redirect to the test login or another page
    header("Location: test_login.php");
    exit();
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
    <script>
    // Redirect the user to a specified page if they try to navigate back
    function handleBackButton() {
        // Replace 'specified_page.php' with the URL of the page you want to redirect to
        window.location.href = 'logout.php';
    }

    // Push a state to the history stack to prevent the default back button behavior
    window.history.pushState(null, null, window.location.href);

    // Handle the back button behavior
    window.onpopstate = function () {
        handleBackButton();
    };

    // Optionally prevent the back button from functioning as well
    function preventBack() {
        window.history.forward();
    }
    setTimeout(preventBack, 0);
    window.onunload = function () { null };
</script>



    <style>
      dm{
        font-style: normal;
        color: #f5a425;
        font-weight: 900;
        font-size: 6vw;
      }
      tm{
        font-style: normal;
        color: white;
        font-weight: 900;
        font-size: 6vw;
      }
      .profile_images{
  border-radius: 50%;
  width: 20rem;
}

    </style>

  </head>

<body>

   
  <!--header-->
  <header class="main-header clearfix" role="header">
    <img src="assets/images/navi_bar.png" class="icn menuicn" id="menuicn" alt="menu-icon">
    <div class="logo">
      <a style="margin-left: 1.7rem;" href="#"><em>Test</em> Sheet</a>
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
              
            <img class="profile_images" src="<?php echo ($student_Gender == 'male') ? 'assets/images/male.png' : 'assets/images/female.png'; ?>">
            <h2><dm>Hii  </dm><tm>  "<?php echo explode(' ', trim($student_Name))[0]; ?>" !!!</tm></h2>
 
             
            
            
            <div>
              <h2 style="margin-top: 2rem;text-align: center;">Your Progress Report will updoaded as soon as possible</h2>
            </div>
            <div> 
            <img class="profile_images" src="assets/images/chart.png">
            </div>
            </div>


                
        </div>
    </div>
    <script>
    // Passing PHP session variables to JavaScript
    const studentName = '<?php echo $student_Name; ?>';
    const studentID = '<?php echo $student_ID; ?>';
    const studentGen = '<?php echo $student_Gender; ?>';
       
</script>

    <script src="assets/js/student.js"></script>
    <script src="assets/js/isotope.min.js"></script>
    <script src="assets/js/custom.js"></script>
    <script src="assets/js/dynamics_stu.js"></script>
    <script src="assets/js/get_student_data.js"></script>
    
    


</body>
</html>

    
</body>
</html>