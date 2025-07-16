<?php
if(isset($_SESSION["uid"])){
	header('Location:index.php');
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<title>Register Page</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">


<!-- Google font -->
<link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,700" rel="stylesheet"/>

<!-- Bootstrap -->
<link type="text/css" rel="stylesheet" href="css/bootstrap.min.css"/>

<!-- Font Awesome Icon -->
<link rel="stylesheet" href="css/font-awesome.min.css">


<link rel="stylesheet" type="text/css" href="css/login_reg.css">
<link rel="stylesheet" type="text/css" href="css/utils.css">

</head>
	<body style="background-color: #999999;">
		<div class="limiter">
		<div class="container-login100">
		<div class="login100-more" style="background-image: url('img/erik-mclean-nfoRa6NHTbU-unsplash.jpg');-webkit-transform: scaleX(-1);
  transform: scaleX(-1);"></div>
		<div class="wrap-login100 p-l-50 p-r-50 p-t-72 p-b-50">
		<form id="signup_form" onsubmit="return false" class="login100-form validate-form">
		<span class="login100-form-title p-b-59">
		Sign Up
		</span>
		<div class="wrap-input100 validate-input" data-validate="Name is required">
		<span class="label-input100">Full Name</span>
		<input class="input100" type="text" name="f_name" id="f_name" placeholder="First Name" autocomplete="off">
		<span class="focus-input100"></span>
		<span class="text-danger" id="f_name_error" style="color:red;font-size:13px;"></span>
		</div>
		<div class="wrap-input100 validate-input" data-validate="Name is required">
		<span class="label-input100">Last Name</span>
		<input class="input100" type="text" name="l_name" id="l_name" placeholder="Last Name" autocomplete="off">
		<span class="focus-input100"></span>
		<span class="text-danger" id="l_name_error" style="color:red;font-size:13px;"></span>
		</div>
		<div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
		<span class="label-input100">Email</span>
		<input class="input100" type="email" name="email" id="email" placeholder="Email addess..." autocomplete="off">
		<span class="focus-input100"></span>
		<span class="text-danger" id="email_error" style="color:red;font-size:13px;"></span>
		</div>
		<div class="wrap-input100 validate-input" data-validate="Mobile no is required">
		<span class="label-input100">Mobile</span>
		<input class="input100" type="text" name="mobile" id="mobile" placeholder="mobile...." maxlength="10" pattern="[0-9]{10}" autocomplete="off">
		<span class="focus-input100"></span>
		<span class="text-danger" id="mobile_error" style="color:red;font-size:13px;"></span>
		</div>
		<div class="wrap-input100 validate-input" data-validate="Password is required">
		<span class="label-input100">Password</span>
		<input class="input100" type="password" name="password" id="password" placeholder="*************" autocomplete="off">
		<span class="focus-input100"></span>
		<span class="text-danger" id="password_error" style="color:red;font-size:13px;"></span>
		</div>
		<div class="wrap-input100 validate-input" data-validate="Repeat Password is required">
		<span class="label-input100">Repeat Password</span>
		<input class="input100" type="password" name="repassword" id="repassword" placeholder="*************" autocomplete="off">
		<span class="focus-input100"></span>
		<span class="text-danger" id="repassword_error" style="color:red;font-size:13px;"></span>
		</div>
		<div class="wrap-input100 validate-input" data-validate="Address is required">
		<span class="label-input100">Address</span>
		<input class="input100" type="text" name="address1" id="address1" placeholder="Address" autocomplete="off">
		<span class="focus-input100"></span>
		<span class="text-danger" id="address1_error" style="color:red;font-size:13px;"></span>
		</div>
		<div class="wrap-input100 validate-input" data-validate="City is required">
		<span class="label-input100">City</span>
		<input class="input100" type="text" name="address2" id="address2" placeholder="City" autocomplete="off">
		<span class="focus-input100"></span>
		<span class="text-danger" id="address2_error" style="color:red;font-size:13px;"></span>
		</div>
		<div class="flex-m w-full p-b-33">
		<div class="contact100-form-checkbox">
		<input class="input-checkbox100" id="ckb1" type="checkbox" name="remember-me">
		<label class="label-checkbox100" for="ckb1">
		<span class="txt1">
		I agree to the
		<a href="#" class="txt2 hov1">
		Terms of User
		</a>
		</span>
		</label>
		</div>
		</div>
		<div class="container-login100-form-btn">
		<div class="wrap-login100-form-btn">
			<div class="login100-form-bgbtn"></div>
			<button class="login100-form-btn" type="submit">
				Sign Up
			</button>
			
		</div>
		
		<a href="signin_form.php" class="dis-block txt3 hov1 p-r-30 p-t-10 p-b-10 p-l-30">
		Sign in
		<i class="fa fa-long-arrow-right m-l-5"></i>
		</a>

		<a href="index.php" class="dis-block txt3 hov1 p-r-30 p-t-40 p-b-10 p-l-180">
		Skip SignUp 
		<i class="fa fa-long-arrow-right m-l-5"></i>
		</a>
		<div class="col-md-8" id="signup_msg"></div>
		</div>
		</form>
		</div>
		</div>
		</div>

		<script src="js/jquery.min.js"></script>
				<script src="js/bootstrap.min.js"></script>
				
				<script src="js/login_reg.js"></script>
				<script src="js/actions.js"></script>

		
	</body>
</html>
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Real-time Name validation
    function validateName(inputId, errorId) {
        var value = document.getElementById(inputId).value;
        var regex = /^[A-Za-z ]+$/;
        if (value.length === 0) {
            document.getElementById(errorId).textContent = '';
            return false;
        }
        if (!regex.test(value)) {
            document.getElementById(errorId).textContent = 'Name must contain only letters';
            return false;
        } else {
            document.getElementById(errorId).textContent = '';
            return true;
        }
    }
    document.getElementById('f_name').addEventListener('input', function() {
        validateName('f_name', 'f_name_error');
    });
    document.getElementById('l_name').addEventListener('input', function() {
        validateName('l_name', 'l_name_error');
    });

    // Real-time Email validation
    document.getElementById('email').addEventListener('input', function() {
        var value = this.value.trim();
        var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        var error = '';
        if (value.length === 0) {
            error = '';
        } else if (!regex.test(value)) {
            error = 'Please enter a valid email address';
        }
        document.getElementById('email_error').textContent = error;
    });

    // Real-time Mobile validation
    document.getElementById('mobile').addEventListener('input', function() {
        var value = this.value;
        var regex = /^[0-9]*$/;
        var error = '';
        if (!regex.test(value)) {
            error = 'Please enter only digits';
        } else if (value.length > 0 && value.length !== 10) {
            error = 'Please enter a valid 10-digit mobile number';
        } else if (value.length === 10 && !/^[6-9]/.test(value)) {
            error = 'Mobile number must start with 9, 8, 7, or 6';
        }
        document.getElementById('mobile_error').textContent = error;
    });

    // Real-time Address validation
    document.getElementById('address1').addEventListener('input', function() {
        var value = this.value.trim();
        var error = '';
        if (value.length === 0) {
            error = 'Address is required';
        }
        document.getElementById('address1_error').textContent = error;
    });

    // Real-time City validation
    document.getElementById('address2').addEventListener('input', function() {
        var value = this.value.trim();
        var regex = /^[A-Za-z ]+$/;
        var error = '';
        if (value.length === 0) {
            error = 'City is required';
        } else if (!regex.test(value)) {
            error = 'City must contain only letters';
        }
        document.getElementById('address2_error').textContent = error;
    });

    // Real-time Password validation
    document.getElementById('password').addEventListener('input', function() {
        var value = this.value;
        var error = '';
        // At least 6 chars, 1 letter, 1 number, 1 special char
        var regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;
        if (value.length === 0) {
            error = '';
        } else if (!regex.test(value)) {
            error = 'Password must be at least 6 characters and include a letter, a number, and a special character';
        }
        document.getElementById('password_error').textContent = error;
    });
    // Real-time Repeat Password validation
    document.getElementById('repassword').addEventListener('input', function() {
        var value = this.value;
        var password = document.getElementById('password').value;
        var error = '';
        if (value.length === 0) {
            error = '';
        } else if (value !== password) {
            error = 'Passwords do not match';
        }
        document.getElementById('repassword_error').textContent = error;
    });

    // Prevent form submission if errors exist
    document.getElementById('signup_form').addEventListener('submit', function(e) {
        var valid = true;
        if (!validateName('f_name', 'f_name_error')) valid = false;
        if (!validateName('l_name', 'l_name_error')) valid = false;
        var email = document.getElementById('email').value.trim();
        var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            document.getElementById('email_error').textContent = 'Please enter a valid email address';
            valid = false;
        }
        var mobile = document.getElementById('mobile').value;
        var mobileError = '';
        if (!/^[0-9]{10}$/.test(mobile)) {
            mobileError = 'Please enter a valid 10-digit mobile number';
            valid = false;
        } else if (!/^[6-9]/.test(mobile)) {
            mobileError = 'Mobile number must start with 9, 8, 7, or 6';
            valid = false;
        }
        document.getElementById('mobile_error').textContent = mobileError;
        var address1 = document.getElementById('address1').value.trim();
        if (address1.length === 0) {
            document.getElementById('address1_error').textContent = 'Address is required';
            valid = false;
        }
        var address2 = document.getElementById('address2').value.trim();
        var cityRegex = /^[A-Za-z ]+$/;
        if (address2.length === 0) {
            document.getElementById('address2_error').textContent = 'City is required';
            valid = false;
        } else if (!cityRegex.test(address2)) {
            document.getElementById('address2_error').textContent = 'City must contain only letters';
            valid = false;
        }
        var password = document.getElementById('password').value;
        var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;
        if (!passwordRegex.test(password)) {
            document.getElementById('password_error').textContent = 'Password must be at least 6 characters and include a letter, a number, and a special character';
            valid = false;
        }
        var repassword = document.getElementById('repassword').value;
        if (repassword !== password) {
            document.getElementById('repassword_error').textContent = 'Passwords do not match';
            valid = false;
        }
        if (!valid) {
            e.preventDefault();
            return false;
        }
    });
});
</script>