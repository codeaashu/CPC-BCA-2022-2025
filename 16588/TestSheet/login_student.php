
<?php
session_start();
if (isset($_SESSION['student_Name']) && isset($_SESSION['student_ID']) && isset($_SESSION['student_Gender'])) {
  header("Location: student.php");
  exit();
}
?>

<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  if (isset($_POST['login'])) {
      $s_name = $_POST['s_Name'];
      $s_ID = $_POST['s_ID'];
      $s_gender = $_POST['satisfaction'];
      $_SESSION['student_Name'] = $s_name;
      $_SESSION['student_ID'] = $s_ID;
      $_SESSION['student_Gender'] = $s_gender;
      if (isset($_SESSION['student_Name']) || isset($_SESSION['student_ID'])) {
        header("Location: student.php");
        exit();
    }
  }
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
    <link rel="stylesheet" href="assets/css/login_signup.css" />
    <link rel="icon" href="assets/images/page_logo.png">
    <!-- Bootstrap core CSS -->
    

    <!-- Additional CSS Files -->
    <link rel="stylesheet" href="assets/css/fontawesome.css">
    <link rel="stylesheet" href="assets/css/templatemo-grad-school.css">
    <link rel="stylesheet" href="assets/css/owl.css">
    <link rel="stylesheet" href="assets/css/lightbox.css">
    <link rel="stylesheet" href="assets/css/responsive.css">
    <link rel="stylesheet" href="assets/css/gender.css">
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

  </head>
  


<body>

   
  <!--header-->
  <header class="main-header clearfix" style="display: block;" role="header">
    <div class="logo">
      <a style="margin-left: 3rem;" href="#"><em>Test</em> Sheet</a>
    </div>
    <a href="#menu" class="menu-link"><i class="fa fa-bars"></i></a>
    <nav id="menu" class="main-nav" role="navigation">
      <ul class="main-menu">
        <li><a href="index.php">Home</a></li>
      </ul>
    </nav>
  </header>
    
  <section class="wrapper">
      <div class="form login">
        <header>Login</header>
        <form method="post">  
          <input name="s_Name" type="text" placeholder="Name" required />   
          <input name="s_ID" type="number" placeholder="ID number" required />

          <div class="normal-container" style="left:-8vw">
                    <div class="smile-rating-container">
                        <div class="smile-rating-toggle-container" style="display: inline-flex;">
                            <input id="meh" name="satisfaction" type="radio" value="male"  checked/> 
                            <input id="fun" name="satisfaction" type="radio" value="female"  /> 
                            <label for="meh" class="rating-label rating-label-meh">Male</label>
                            <div class="smile-rating-toggle"></div>
                            <div class="rating-eye rating-eye-left"></div>
                            <div class="rating-eye rating-eye-right"></div>
                            <div class="mouth rating-eye-bad-mouth"></div>
                            <div class="toggle-rating-pill"></div>
                            <label for="fun" class="rating-label rating-label-fun">Female</label>
                        </div>
                    </div>
                </div>
                
          <input type="submit" value="login" name="login" />
        </form>
        <?php if (isset($login_error)) { echo "<p style='color: red;'>$login_error</p>"; } ?>
      </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="assets/js/isotope.min.js"></script>
    <script src="assets/js/custom.js"></script>

  </section>
</body>
</html>
