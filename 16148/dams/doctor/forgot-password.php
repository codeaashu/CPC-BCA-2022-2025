<?php
session_start();
error_reporting(0);
include('includes/dbconnection.php');

if (isset($_POST['submit'])) {
	$email = $_POST['email'];
	$mobile = $_POST['mobile'];
	$newpassword = $_POST['newpassword'];

	if (!preg_match('/^[a-zA-Z0-9._%+-]+@gmail\.com$/', $email)) {
		echo "<script>alert('Only Gmail addresses are allowed');</script>";
		exit();
	}

	if (!preg_match('/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/', $newpassword)) {
		echo "<script>alert('Password must be at least 6 characters long and include 1 uppercase letter, 1 number, and 1 special character.');</script>";
		exit();
	}

	$hashedPassword = md5($newpassword);

	$sql = "SELECT Email FROM tbldoctor WHERE Email=:email and MobileNumber=:mobile";
	$query = $dbh->prepare($sql);
	$query->bindParam(':email', $email, PDO::PARAM_STR);
	$query->bindParam(':mobile', $mobile, PDO::PARAM_STR);
	$query->execute();
	$results = $query->fetchAll(PDO::FETCH_OBJ);

	if ($query->rowCount() > 0) {
		$con = "UPDATE tbldoctor SET Password=:newpassword WHERE Email=:email AND MobileNumber=:mobile";
		$chngpwd1 = $dbh->prepare($con);
		$chngpwd1->bindParam(':email', $email, PDO::PARAM_STR);
		$chngpwd1->bindParam(':mobile', $mobile, PDO::PARAM_STR);
		$chngpwd1->bindParam(':newpassword', $hashedPassword, PDO::PARAM_STR);
		$chngpwd1->execute();
		echo "<script>alert('Your Password successfully changed');</script>";
	} else {
		echo "<script>alert('Email ID or Mobile number is invalid');</script>";
	}
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
	<title>DAMS - Forgot Password</title>
	<link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css">

	<style>
		body {
			font-family: 'Raleway', sans-serif;
			margin: 0;
			padding: 0;
			height: 100vh;
			background: linear-gradient(270deg, #ff4e50, #f9d423, #fbc7d4, #ff9472);
			background-size: 800% 800%;
			animation: waveBackground 20s ease infinite;
		}

		@keyframes waveBackground {
			0% {
				background-position: 0% 50%;
			}

			50% {
				background-position: 100% 50%;
			}

			100% {
				background-position: 0% 50%;
			}
		}

		.reset-box {
			background: #fff;
			padding: 2.5rem;
			border-radius: 1rem;
			box-shadow: 0 0 25px rgba(0, 0, 0, 0.15);
		}

		.reset-btn {
			background-color: #dc3545;
			color: white;
			transition: 0.3s ease;
		}

		.reset-btn:hover {
			background-color: #0d6efd;
			transform: scale(1.05);
		}

		.input-group-text {
			background-color: #fff;
			border-right: 0;
			color: #dc3545;
		}

		.form-control {
			border-left: 0;
		}

		#back-to-home {
			position: absolute;
			top: 20px;
			left: 20px;
			z-index: 1000;
		}

		#back-to-home .btn {
			border: 2px solid #fff;
			color: #fff;
			background: transparent;
			border-radius: 50px;
			font-size: 18px;
			padding: 10px 14px;
		}

		#back-to-home .btn:hover {
			background-color: #fff;
			color: #dc3545;
			transition: 0.3s ease;
		}

		.btn-link-style {
			background-color: #fff;
			border: 1px solid #dc3545;
			color: #dc3545;
			padding: 0.5rem 1.2rem;
			border-radius: 50px;
			text-decoration: none;
			transition: 0.3s ease;
		}

		.btn-link-style:hover {
			background-color: #dc3545;
			color: white;
			text-decoration: none;
		}

		#pwd-alerts {
			font-size: 0.9rem;
			color: red;
		}

		#strength-text {
			font-size: 0.9rem;
			font-weight: 600;
			margin-top: 5px;
		}
	</style>
</head>

<body>
	<div id="back-to-home">
		<a href="../index.php" class="btn">
			<i class="fa fa-home animated zoomIn"></i>
		</a>
	</div>

	<div class="container vh-100 d-flex align-items-center justify-content-center">
		<div class="col-md-6 col-lg-5">
			<div class="reset-box" data-aos="zoom-in" data-aos-delay="100">
				<h3 class="text-center text-danger mb-4 fw-bold">Reset Password</h3>

				<form method="post" name="chngpwd">
					<div class="mb-3">
						<label class="form-label">Gmail Address</label>
						<div class="input-group">
							<span class="input-group-text"><i class="bi bi-envelope-fill"></i></span>
							<input type="email" class="form-control" name="email" placeholder="Enter Gmail address"
								required pattern="^[a-zA-Z0-9._%+-]+@gmail\.com$">
						</div>
					</div>

					<div class="mb-3">
						<label class="form-label">Mobile Number</label>
						<div class="input-group">
							<span class="input-group-text"><i class="bi bi-phone-fill"></i></span>
							<input type="tel" class="form-control" name="mobile" placeholder="Enter mobile number"
								pattern="[0-9]{10}" maxlength="10" inputmode="numeric"
								oninput="this.value=this.value.replace(/[^0-9]/g,'');" required>
						</div>
					</div>

					<div class="mb-3">
						<label class="form-label">New Password</label>
						<div class="input-group">
							<span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
							<input type="password" class="form-control" id="newpassword" name="newpassword"
								placeholder="Enter new password" oninput="checkStrength()" required>
							<span class="input-group-text" onclick="togglePassword('newpassword','eye1')">
								<i class="fa fa-eye" id="eye1" style="cursor:pointer;"></i>
							</span>
						</div>
						<div id="pwd-alerts"></div>
						<div id="strength-text"></div>
					</div>

					<div class="mb-4">
						<label class="form-label">Confirm Password</label>
						<div class="input-group">
							<span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
							<input type="password" class="form-control" id="confirmpassword" name="confirmpassword"
								placeholder="Confirm password" required onfocus="validateOnConfirmFocus()">
							<span class="input-group-text" onclick="togglePassword('confirmpassword','eye2')">
								<i class="fa fa-eye" id="eye2" style="cursor:pointer;"></i>
							</span>
						</div>
					</div>

					<div class="d-grid mb-3">
						<button type="submit" class="btn reset-btn" name="submit">Reset Password</button>
					</div>
				</form>

				<div class="text-center d-flex justify-content-center mt-3">
					<a href="login.php" class="btn-link-style">Sign In</a>
				</div>
			</div>
		</div>
	</div>

	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
	<script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
	<script>
		AOS.init();

		function togglePassword(id, iconId) {
			const field = document.getElementById(id);
			const icon = document.getElementById(iconId);
			if (field.type === "password") {
				field.type = "text";
				icon.classList.remove("fa-eye");
				icon.classList.add("fa-eye-slash");
			} else {
				field.type = "password";
				icon.classList.remove("fa-eye-slash");
				icon.classList.add("fa-eye");
			}
		}

		function checkStrength() {
			const pwd = document.getElementById("newpassword").value;
			const alertBox = document.getElementById("pwd-alerts");
			const strengthText = document.getElementById("strength-text");

			let alerts = "", strength = 0;

			if (pwd.length >= 6) strength++;
			else alerts += "• Minimum 6 characters<br>";

			if (/[A-Z]/.test(pwd)) strength++;
			else alerts += "• At least 1 uppercase letter<br>";

			if (/\d/.test(pwd)) strength++;
			else alerts += "• At least 1 number<br>";

			if (/[\W_]/.test(pwd)) strength++;
			else alerts += "• At least 1 special character<br>";

			alertBox.innerHTML = alerts;

			if (strength <= 1) {
				strengthText.textContent = "Strength: Weak";
				strengthText.style.color = "red";
			} else if (strength === 2 || strength === 3) {
				strengthText.textContent = "Strength: Medium";
				strengthText.style.color = "orange";
			} else {
				strengthText.textContent = "Strength: Strong";
				strengthText.style.color = "green";
			}
		}

		function validateOnConfirmFocus() {
			const pwd = document.getElementById("newpassword").value;
			let msg = "";

			if (!/[A-Z]/.test(pwd)) msg += "• Uppercase letter missing\n";
			if (!/\d/.test(pwd)) msg += "• Number missing\n";
			if (!/[\W_]/.test(pwd)) msg += "• Special character missing\n";

			if (msg) {
				alert("Password Warning:\n" + msg);
			}
		}
	</script>
</body>

</html>
