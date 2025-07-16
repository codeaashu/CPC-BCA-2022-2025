<?php
session_start();

// If already logged in
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header("Location: admin_dashboard.php");
    exit();
}

// Credentials
$adminName = "abhay9608";
$adminPass = "9608";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    if ($username === $adminName && $password === $adminPass) {
        $_SESSION['admin_logged_in'] = true;
        header("Location: admin_dashboard.php");
        exit();
    } else {
        $error = "Invalid username or password.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Admin Login - TestSheet</title>
  <link rel="icon" href="assets/images/page_logo.png">
  <link rel="stylesheet" href="assets/css/login_signup.css" />
  <link rel="stylesheet" href="assets/css/fontawesome.css">
  <link rel="stylesheet" href="assets/css/templatemo-grad-school.css">
  <link rel="stylesheet" href="assets/css/owl.css">
  <link rel="stylesheet" href="assets/css/lightbox.css">
  <link rel="stylesheet" href="assets/css/responsive.css">
  <link rel="stylesheet" href="assets/css/gender.css">
  <link rel="stylesheet" href="assets/css/track.css">
  <link href="https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,600,700,800,900" rel="stylesheet">

</head>
<body>

<!-- Header -->
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

<!-- Login Form Section -->
<section class="wrapper">
  <div class="form login">
    <header>Admin Login</header>
    <form method="post">
      <input name="username" type="text" placeholder="Username" required />
      <input name="password" type="password" placeholder="Password" required />
      <input type="submit" value="Login" name="login" />
    </form>

    <?php if (!empty($error)) : ?>
      <p style="color: red; margin-top: 10px;"><?php echo htmlspecialchars($error); ?></p>
    <?php endif; ?>
  </div>
</section>

<!-- Scripts -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="assets/js/isotope.min.js"></script>
<script src="assets/js/custom.js"></script>

</body>
</html>
