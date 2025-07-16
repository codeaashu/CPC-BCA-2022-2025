<?php
include_once('include/config.php');
if(isset($_POST['submit']))
{
$fname=trim($_POST['full_name']);
$address=trim($_POST['address']);
$city=trim($_POST['city']);
$gender=$_POST['gender'];
$email=$_POST['email'];
$password=md5($_POST['password']);
$errors = [];
if (!preg_match("/^[a-zA-Z\s]+$/", $fname)) {
    $errors[] = "Name can only contain letters and spaces.";
}

if (!preg_match("/^[a-zA-Z\s]+$/", $city)) {
    $errors[] = "City can only contain letters and spaces.";
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Invalid email format.";
}

$query=mysqli_query($con,"insert into users(fullname,address,city,gender,email,password) values('$fname','$address','$city','$gender','$email','$password')");
if($query)
{
	echo "<script>alert('Successfully Registered. You can login now');</script>";
	//header('location:user-login.php');
}
}
?>


<!DOCTYPE html>
<html lang="en">

	<head>
		<title>User Registration</title>
		
		<link href="http://fonts.googleapis.com/css?family=Lato:300,400,400italic,600,700|Raleway:300,400,500,600,700|Crete+Round:400italic" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="vendor/fontawesome/css/font-awesome.min.css">
		<link rel="stylesheet" href="vendor/themify-icons/themify-icons.min.css">
		<link href="vendor/animate.css/animate.min.css" rel="stylesheet" media="screen">
		<link href="vendor/perfect-scrollbar/perfect-scrollbar.min.css" rel="stylesheet" media="screen">
		<link href="vendor/switchery/switchery.min.css" rel="stylesheet" media="screen">
		<link rel="stylesheet" href="assets/css/styles.css">
		<link rel="stylesheet" href="assets/css/plugins.css">
		<link rel="stylesheet" href="assets/css/themes/theme-1.css" id="skin_color" />
		
		<script type="text/javascript">
function valid()
{
 if(document.registration.password.value!= document.registration.password_again.value)
{
alert("Password and Confirm Password Field do not match  !!");
document.registration.password_again.focus();
return false;
}
return true;
}
</script>
		

	</head>

	<body class="login">
		<!-- start: REGISTRATION -->
		<div class="row">
			<div class="main-login col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
				<div class="logo margin-top-30">
				<a href="../index.php"><h2>HMS | Patient Registration</h2></a>
				</div>
				<!-- start: REGISTER BOX -->
				<div class="box-register">
					<form name="registration" id="registration"  method="post" onSubmit="return valid();">
						<fieldset>
							<legend>
								Sign Up
							</legend>
							<p>
								Enter your personal details below:
							</p>
							<div class="form-group">
								<input type="text" class="form-control" id="full_name" name="full_name" placeholder="Full Name" required>
							</div>
							<div class="form-group">
								<input type="text" class="form-control" name="address" id="address" placeholder="Address" required>
							</div>
							<div class="form-group">
								<input type="text" class="form-control" id="city" name="city" placeholder="City" required>
							</div>
							<div class="form-group">
								<label class="block">
									Gender
								</label>
								<div class="clip-radio radio-primary">
									<input type="radio" id="rg-female" name="gender" value="female" >
									<label for="rg-female">
										Female
									</label>
									<input type="radio" id="rg-male" name="gender" value="male">
									<label for="rg-male">
										Male
									</label>
								</div>
							</div>
							<p>
								Enter your account details below:
							</p>
							<div class="form-group">
								<span class="input-icon">
									<input type="email" class="form-control" id="email"name="email" id="email" onBlur="userAvailability()"  placeholder="Email" required>
									<i class="fa fa-envelope"></i> </span>
									 <span id="user-availability-status1" style="font-size:12px;"></span>
							</div>
							<div class="form-group">
								<span class="input-icon">
									<input type="password" class="form-control" id="password" name="password" placeholder="Password" required>
									<i class="fa fa-lock"></i> </span>
							</div>
							<div class="form-group">
								<span class="input-icon">
									<input type="password" class="form-control"  id="password_again" name="password_again" placeholder="Password Again" required>
									<i class="fa fa-lock"></i> </span>
							</div>
							<div class="form-group">
								<div class="checkbox clip-check check-primary">
									<input type="checkbox" id="agree" value="agree" checked="true" readonly=" true">
									<label for="agree">
										I agree
									</label>
								</div>
							</div>
							<div class="form-actions">
								<p>
									Already have an account?
									<a href="user-login.php">
										Log-in
									</a>
								</p>
								<button type="submit" class="btn btn-primary pull-right" id="submit" name="submit">
									Submit <i class="fa fa-arrow-circle-right"></i>
								</button>
							</div>
						</fieldset>
					</form>

					<div class="copyright">
						&copy; <span class="current-year"></span><span class="text-bold text-uppercase"> HMS</span>. <span>All rights reserved</span>
					</div>

				</div>

			</div>
		</div>
		<script src="vendor/jquery/jquery.min.js"></script>
		<script src="vendor/bootstrap/js/bootstrap.min.js"></script>
		<script src="vendor/modernizr/modernizr.js"></script>
		<script src="vendor/jquery-cookie/jquery.cookie.js"></script>
		<script src="vendor/perfect-scrollbar/perfect-scrollbar.min.js"></script>
		<script src="vendor/switchery/switchery.min.js"></script>
		<script src="vendor/jquery-validation/jquery.validate.min.js"></script>
		<script src="assets/js/main.js"></script>
		<script src="assets/js/login.js"></script>
		<script>
			jQuery(document).ready(function() {
				Main.init();
				Login.init();
			});
		</script>
		
	<script>
function userAvailability() {
$("#loaderIcon").show();
jQuery.ajax({
url: "check_availability.php",
data:'email='+$("#email").val(),
type: "POST",
success:function(data){
$("#user-availability-status1").html(data);
$("#loaderIcon").hide();
},
error:function (){}
});
}
</script>	
<script>
document.addEventListener('DOMContentLoaded', function () {
    // Full Name: Only letters and spaces
    const fullName = document.getElementById('full_name');
    fullName.addEventListener('input', function () {
        const val = this.value;
        if (/[^a-zA-Z\s]/.test(val)) {
            alert("Only letters and spaces are allowed in Full Name.");
            this.value = val.replace(/[^a-zA-Z\s]/g, '');
        }
    });

    // City: Only letters and spaces
    const city = document.getElementById('city');
    city.addEventListener('input', function () {
        const val = this.value;
        if (/[^a-zA-Z\s]/.test(val)) {
            alert("Only letters and spaces are allowed in City.");
            this.value = val.replace(/[^a-zA-Z\s]/g, '');
        }
    });
    
	 const emailField = document.getElementById('email');
    emailField.addEventListener('blur', function () {
        const emailValue = this.value.trim();
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

        if (emailValue !== '' && !emailPattern.test(emailValue)) {
            alert("Please enter a valid email address.");
            
        }
    });

	const address = document.getElementById('address');
    
    address.addEventListener('blur', function () {
        const val = this.value.trim();
        const allowedChars = /^[a-zA-Z0-9\s,./-]{3,}$/; // Allowed characters
        const containsLetter = /[a-zA-Z]/; // Must have at least one letter

        if (val.length < 3 || !allowedChars.test(val) || !containsLetter.test(val)) {
            alert("Patient Address must be at least 3 characters long, contain only valid characters, and include at least one alphabet letter.");
            setTimeout(() => {
                this.focus();
            }, 0);

        }
    });

});
</script>


	</body>
	<!-- end: BODY -->
</html>