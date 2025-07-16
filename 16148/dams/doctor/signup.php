<?php
session_start();
error_reporting(0);
include('includes/dbconnection.php');

if (isset($_POST['submit'])) {
	$fname = $_POST['fname'];
	$mobno = $_POST['mobno'];
	$email = $_POST['email'];
	$sid = $_POST['specializationid'];
	$password = $_POST['password'];

	if (!preg_match('/^[a-zA-Z0-9._%+-]+@gmail\.com$/', $email)) {
		echo "<script>alert('Only Gmail addresses are allowed');</script>";
		exit();
	}

	if (!preg_match('/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/', $password)) {
		echo "<script>alert('Password must be at least 6 characters long and include 1 uppercase letter, 1 number, and 1 special character.');</script>";
		exit();
	}

	$hashedPassword = md5($password);

	$ret = "SELECT Email FROM tbldoctor WHERE Email=:email";
	$query = $dbh->prepare($ret);
	$query->bindParam(':email', $email, PDO::PARAM_STR);
	$query->execute();
	$results = $query->fetchAll(PDO::FETCH_OBJ);

	if ($query->rowCount() == 0) {
		$sql = "INSERT INTO tbldoctor(FullName,MobileNumber,Email,Specialization,Password) 
                VALUES(:fname,:mobno,:email,:sid,:password)";
		$query = $dbh->prepare($sql);
		$query->bindParam(':fname', $fname, PDO::PARAM_STR);
		$query->bindParam(':email', $email, PDO::PARAM_STR);
		$query->bindParam(':mobno', $mobno, PDO::PARAM_INT);
		$query->bindParam(':sid', $sid, PDO::PARAM_INT);
		$query->bindParam(':password', $hashedPassword, PDO::PARAM_STR);
		$query->execute();
		$lastInsertId = $dbh->lastInsertId();
		echo $lastInsertId ? "<script>alert('Signed up successfully');</script>"
			: "<script>alert('Something went wrong');</script>";
	} else {
		echo "<script>alert('Email already exists');</script>";
	}
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
	<title>DAMS - Doctor Signup</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
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
			background: linear-gradient(270deg, #ff4e50, #f9d423, #fbc7d4, #ff9472);
			background-size: 800% 800%;
			animation: waveBackground 20s ease infinite;
		}

		@keyframes waveBackground {
			0% { background-position: 0% 50%; }
			50% { background-position: 100% 50%; }
			100% { background-position: 0% 50%; }
		}

		.signup-box {
			background: #fff;
			padding: 2rem;
			border-radius: 1rem;
			box-shadow: 0 0 25px rgba(0, 0, 0, 0.15);
			max-width: 600px;
			margin: 0 auto;
		}

		.form-btn {
			background-color: #dc3545;
			color: white;
			transition: 0.3s ease;
		}

		.form-btn:hover {
			background-color: #0d6efd;
			transform: scale(1.05);
		}

		#back-to-home {
			position: absolute;
			top: 20px;
			left: 20px;
		}

		#back-to-home .btn {
			border: 2px solid #fff;
			color: #fff;
			background: transparent;
			border-radius: 50px;
		}

		#back-to-home .btn:hover {
			background-color: #fff;
			color: #dc3545;
			transition: 0.3s ease;
		}

		.strength {
			font-size: 0.875rem;
			font-weight: 600;
		}
	</style>
</head>

<body>
	<div id="back-to-home">
		<a href="../index.php" class="btn d-flex align-items-center gap-2">
			<i class="bi bi-house-door-fill"></i> <span>Home</span>
		</a>
	</div>

	<div class="container min-vh-100 d-flex flex-column justify-content-center align-items-center py-5">
		<div class="signup-box" data-aos="zoom-in" data-aos-delay="100">
			<h3 class="text-center text-danger mb-4 fw-bold">Doctor Signup</h3>
			<form method="post">
				<div class="mb-3">
					<label class="form-label">Full Name</label>
					<div class="input-group">
						<span class="input-group-text text-danger"><i class="fa fa-user"></i></span>
						<input type="text" name="fname" class="form-control" placeholder="Enter full name" required pattern="^[A-Za-z\s]+$">
					</div>
				</div>

				<div class="mb-3">
					<label class="form-label">Email</label>
					<div class="input-group">
						<span class="input-group-text text-danger"><i class="fa fa-envelope"></i></span>
						<input type="email" name="email" class="form-control" placeholder="Enter email" required pattern="^[a-zA-Z0-9._%+-]+@gmail\.com$">
					</div>
				</div>

				<div class="mb-3">
					<label class="form-label">Mobile Number</label>
					<div class="input-group">
						<span class="input-group-text text-danger"><i class="fa fa-phone"></i></span>
						<input type="text" name="mobno" class="form-control" placeholder="Enter mobile" maxlength="10" pattern="[0-9]+" required>
					</div>
				</div>

				<div class="mb-3">
					<label class="form-label">Specialization</label>
					<select name="specializationid" class="form-select" required>
						<option value="">Choose Specialization</option>
						<?php
						$sql1 = "SELECT * FROM tblspecialization";
						$query1 = $dbh->prepare($sql1);
						$query1->execute();
						$results1 = $query1->fetchAll(PDO::FETCH_OBJ);
						foreach ($results1 as $row1) {
							echo '<option value="' . htmlentities($row1->ID) . '">' . htmlentities($row1->Specialization) . '</option>';
						}
						?>
					</select>
				</div>

				<div class="mb-3">
					<label class="form-label">Password</label>
					<div class="input-group">
						<span class="input-group-text text-danger"><i class="fa fa-lock"></i></span>
						<input type="password" id="password" name="password" class="form-control" placeholder="Enter password" required onfocus="showPasswordRules()" oninput="checkStrength()">
						<span class="input-group-text" onclick="togglePassword('password','eyeIcon')">
							<i class="fa fa-eye" id="eyeIcon" style="cursor:pointer;"></i>
						</span>
					</div>
					<div id="pwd-alerts" class="mt-2 text-danger small"></div>
					<div id="strength-text" class="strength"></div>
				</div>

				<div class="d-grid mb-2">
					<button type="submit" name="submit" class="btn form-btn">Register</button>
				</div>
			</form>
		</div>
		<div class="text-center mt-3">
			<p><small>Already have an account?</small></p>
			<a href="login.php" class="btn btn-outline-danger rounded-pill px-4">Login</a>
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
			const pwd = document.getElementById("password").value;
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

		function showPasswordRules() {
			checkStrength();
		}
	</script>
</body>
</html>
