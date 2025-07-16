<?php
session_start();
error_reporting(0);
include('includes/dbconnection.php');

if (isset($_POST['login'])) {
	$email = $_POST['email'];
	$password = $_POST['password'];

	// Email must be Gmail
	if (!preg_match('/^[a-zA-Z0-9._%+-]+@gmail\.com$/', $email)) {
		echo "<script>alert('Only Gmail addresses are allowed');</script>";
		exit();
	}

	// Password validation
	if (!preg_match('/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/', $password)) {
		echo "<script>alert('Password must include at least 1 uppercase letter, 1 number, 1 special character, and be at least 6 characters long.');</script>";
		exit();
	}

	$hashedPassword = md5($password);
	$sql = "SELECT ID,Email FROM tbldoctor WHERE Email=:email and Password=:password";
	$query = $dbh->prepare($sql);
	$query->bindParam(':email', $email, PDO::PARAM_STR);
	$query->bindParam(':password', $hashedPassword, PDO::PARAM_STR);
	$query->execute();
	$results = $query->fetchAll(PDO::FETCH_OBJ);
	if ($query->rowCount() > 0) {
		foreach ($results as $result) {
			$_SESSION['damsid'] = $result->ID;
			$_SESSION['damsemailid'] = $result->Email;
		}
		$_SESSION['login'] = $_POST['email'];
		echo "<script type='text/javascript'> document.location ='dashboard.php'; </script>";
	} else {
		echo "<script>alert('Invalid Details');</script>";
	}
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
	<title>DAMS - Doctor Login</title>

	<!-- Fonts & Icons -->
	<link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

	<!-- Bootstrap & AOS -->
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

		.login-box {
			background: #fff;
			padding: 2.5rem;
			border-radius: 1rem;
			box-shadow: 0 0 25px rgba(0, 0, 0, 0.15);
		}

		.login-btn {
			background-color: #dc3545;
			color: white;
			transition: 0.3s ease;
		}

		.login-btn:hover {
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
	</style>

	<script>
		function togglePassword() {
			const pwd = document.getElementById("password");
			const icon = document.getElementById("eyeicon");
			if (pwd.type === "password") {
				pwd.type = "text";
				icon.classList.remove("fa-eye");
				icon.classList.add("fa-eye-slash");
			} else {
				pwd.type = "password";
				icon.classList.remove("fa-eye-slash");
				icon.classList.add("fa-eye");
			}
		}
	</script>
</head>

<body>
	<!-- Top-left Home Button -->
	<div id="back-to-home">
		<a href="../index.php" class="btn">
			<i class="fa fa-home animated zoomIn"></i>
		</a>
	</div>

	<!-- Login card -->
	<div class="container vh-100 d-flex align-items-center justify-content-center">
		<div class="col-md-6 col-lg-5">
			<div class="login-box" data-aos="zoom-in" data-aos-delay="100">
				<h3 class="text-center text-danger mb-4 fw-bold">Doctor Login</h3>

				<form method="post" name="login">
					<div class="mb-3">
						<label class="form-label">Gmail Address</label>
						<div class="input-group">
							<span class="input-group-text"><i class="bi bi-envelope-fill"></i></span>
							<input type="email" class="form-control" name="email" placeholder="Enter Gmail only"
								required pattern="^[a-zA-Z0-9._%+-]+@gmail\.com$">
						</div>
					</div>

					<div class="mb-4">
						<label class="form-label">Password</label>
						<div class="input-group">
							<span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
							<input type="password" class="form-control" id="password" name="password"
								placeholder="Enter password" required>
							<span class="input-group-text" onclick="togglePassword()" style="cursor:pointer;">
								<i class="fa fa-eye" id="eyeicon"></i>
							</span>
						</div>
					</div>

					<div class="d-grid mb-3">
						<button type="submit" class="btn login-btn" name="login">Sign In</button>
					</div>
				</form>

				<!-- Signup and forgot password buttons -->
				<div class="text-center d-flex justify-content-between mt-3">
					<a href="signup.php" class="btn-link-style">Sign Up</a>
					<a href="forgot-password.php" class="btn-link-style">Forgot Password?</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Scripts -->
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
	<script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
	<script>
		AOS.init();
	</script>
</body>

</html>