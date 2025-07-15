<?php
session_start();
error_reporting(0);
include('includes/config.php');



   $errors = [];
$formData = ['fullname' => '', 'email' => '', 'password' => ''];

if (isset($_POST['submit'])) {
    $fullname = trim($_POST['fullname']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    $formData['fullname'] = $fullname;
    $formData['email'] = $email;

    // Validations
    if (!preg_match("/^[a-zA-Z\s]+$/", $fullname)) {
        $errors['fullname'] = "Name must contain only letters and spaces.";
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Invalid email format.";
    }

    if (!preg_match("/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/", $password)) {
        $errors['password'] = "Password must be at least 6 characters and contain at least one letter and one number.";
    }

    // If no errors, insert into DB
    if (empty($errors)) {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $sql = "INSERT INTO users(fullname, email, password) VALUES(:fullname, :email, :password)";
        $query = $dbh->prepare($sql);
        $query->bindParam(':fullname', $fullname, PDO::PARAM_STR);
        $query->bindParam(':email', $email, PDO::PARAM_STR);
        $query->bindParam(':password', $hashedPassword, PDO::PARAM_STR);

        if ($query->execute()) {
            echo "<script>alert('Registered successfully!'); window.location.href='login.php';</script>";
        } else {
            $errors['general'] = "Something went wrong. Try again.";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>RidePolish | Register</title>
    <link href="img/favicon.ico" rel="icon">
    <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;700&display=swap" rel="stylesheet"> 
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
</head>

<body>
<?php include_once('includes/header.php'); ?>

<!-- Page Header -->
<div class="page-header">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h2>Register</h2>
            </div>
            <div class="col-12">
                <a href="index.php">Home</a>
                <a href="register.php">Register</a>
            </div>
        </div>
    </div>
</div>

<!-- Registration Start -->
<div class="contact">
    <div class="container">
        <div class="section-header text-center">
            <p>Join Us</p>
            <h2>Create Your Account</h2>
        </div>
        <div class="row justify-content-center">
            <div class="col-md-7">
                <div class="contact-form">
   <form method="post">
    <?php if (!empty($errors['general'])): ?>
        <div class="text-danger mb-3"><?php echo $errors['general']; ?></div>
    <?php endif; ?>

    <div class="control-group">
        <input type="text" class="form-control" name="fullname"
               placeholder="Full Name"
               pattern="[A-Za-z\s]+"
               title="Name should contain only letters and spaces"
               value="<?php echo htmlentities($formData['fullname']); ?>">
        <?php if (!empty($errors['fullname'])): ?>
            <small class="text-danger"><?php echo $errors['fullname']; ?></small>
        <?php endif; ?>
        <br />
    </div>

    <div class="control-group">
        <input type="email" class="form-control" name="email"
               placeholder="Email"
               value="<?php echo htmlentities($formData['email']); ?>">
        <?php if (!empty($errors['email'])): ?>
            <small class="text-danger"><?php echo $errors['email']; ?></small>
        <?php endif; ?>
        <br />
    </div>

    <div class="control-group">
        <input type="password" class="form-control" name="password" id="password"
               placeholder="Password (min 6 characters, 1 letter & 1 number)"
               pattern="(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}"
               title="Password must contain at least one letter and one number">
        <?php if (!empty($errors['password'])): ?>
            <small class="text-danger"><?php echo $errors['password']; ?></small>
        <?php endif; ?>
        <br />
    </div>

    <div>
        <button class="btn btn-custom" type="submit" name="submit">Register</button>
    </div>
</form>


<script>
function validateForm() {
    const name = document.querySelector('[name="fullname"]').value.trim();
    const email = document.querySelector('[name="email"]').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!/^[A-Za-z\s]+$/.test(name)) {
        alert("Name should contain only letters and spaces.");
        return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
        alert("Password must be at least 6 characters long and contain at least one letter and one number.");
        return false;
    }

    return true;
}
</script>


                    <p class="mt-3">Already have an account? <a href="login.php">Login here</a></p>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Registration End -->

<?php include_once('includes/footer.php'); ?>

<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js"></script>
<script src="js/main.js"></script>
</body>
</html>
