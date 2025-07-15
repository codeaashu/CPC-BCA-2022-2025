<?php
session_start();
error_reporting(0);
include('includes/config.php');

if (isset($_POST['login'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE email = :email";
    $query = $dbh->prepare($sql);
    $query->bindParam(':email', $email, PDO::PARAM_STR);
    $query->execute();
    $user = $query->fetch(PDO::FETCH_OBJ);
    

    if ($user && password_verify($password, $user->password)) {
        $_SESSION['login'] = $user->email;
        $_SESSION['userid'] = $user->id;
        echo "<script>alert('Login successful');</script>";
        echo "<script>window.location.href = 'index.php';</script>";
    } else {
        echo "<script>alert('Invalid email or password');</script>";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>RidePolish | Login</title>
    <link href="img/favicon.ico" rel="icon">
    <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;700&display=swap" rel="stylesheet"> 
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
</head>

<body>
<?php include_once('includes/header.php'); ?>

<div class="page-header">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h2>Login</h2>
            </div>
            <div class="col-12">
                <a href="index.php">Home</a>
                <a href="login.php">Login</a>
            </div>
        </div>
    </div>
</div>

<div class="contact">
    <div class="container">
        <div class="section-header text-center">
            <p>Welcome Back</p>
            <h2>Login to Your Account</h2>
        </div>
        <div class="row justify-content-center">
            <div class="col-md-7">
                <div class="contact-form">
                    <form method="post">
                        <div class="control-group">
                            <input type="email" class="form-control" name="email" placeholder="Email" required>
                            <br />
                        </div>
                        <div class="control-group">
                            <input type="password" class="form-control" name="password" placeholder="Password" required>
                            <br />
                        </div>
                        <div>
                            <button class="btn btn-custom" type="submit" name="login">Login</button>
                        </div>
                    </form>
                    <p class="mt-3">Don’t have an account? <a href="register.php">Register here</a></p>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include_once('includes/footer.php'); ?>

<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js"></script>
<script src="js/main.js"></script>
</body>
</html>
