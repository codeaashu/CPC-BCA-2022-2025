<?php
session_start();
error_reporting(0);
include("includes/config.php");
if(isset($_POST['submit']))
{
$emailid=$_POST['emailid'];
$cnumber=$_POST['contactno'];
$newpassword=md5($_POST['inputPassword']);
$ret=mysqli_query($con,"SELECT id FROM users WHERE email='$emailid' and contactno='$cnumber'");
$num=mysqli_num_rows($ret);
if($num>0)
{
$query=mysqli_query($con,"update users set password='$newpassword' WHERE  email='$emailid' and contactno='$cnumber'");

echo "<script>alert('Password reset successfully.');</script>";
echo "<script type='text/javascript'> document.location ='login.php'; </script>";
}else{
echo "<script>alert('Invalid username or Contact Number');</script>";
echo "<script type='text/javascript'> document.location ='password-recovery.php'; </script>";
}
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Online Book Store || Password Recovery</title>
	

<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/bootstrap/css/bootstrap.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="fonts/iconic/css/material-design-iconic-font.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="fonts/linearicons-v1.0.0/icon-font.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/animate/animate.css">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="vendor/css-hamburgers/hamburgers.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/animsition/css/animsition.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/select2/select2.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/perfect-scrollbar/perfect-scrollbar.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="css/util.css">
	<link rel="stylesheet" type="text/css" href="css/main.css">
<!--===============================================================================================-->
<script type="text/javascript">
function valid()
{
 if(document.passwordrecovery.inputPassword.value!= document.passwordrecovery.cinputPassword.value)
{
alert("Password and Confirm Password Field do not match  !!");
document.passwordrecovery.cinputPassword.focus();
return false;
}
return true;
}
</script>
</head>
<body class="animsition">
	
	<!-- Header -->
	<?php include_once('includes/header.php');?>



	<!-- Title page -->
	<section class="bg-img1 txt-center p-lr-15 p-tb-92" style="background-image: url('images/bg-01.jpg');">
		<h2 class="ltext-105 cl0 txt-center">
			Password Recovery
		</h2>
	</section>	


	<!-- Content page -->
	<section class="bg0 p-t-104 p-b-116">
		<div class="container">
			<div class="flex-w flex-tr">
				<div class="size-210 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
					<form method="post" name="passwordrecovery" onSubmit="return valid();">
						<h4 class="mtext-105 cl2 txt-center p-b-30">
							Password Recovery
						</h4>

						<div  class="bor8 m-b-20 how-pos4-parent">
							<label>Email Id</label>
							<input type="email" name="emailid" id="emailid" class="form-control" onBlur="emailAvailability()" required>
						</div>
						<div  class="bor8 m-b-20 how-pos4-parent">
							<label>Contact No</label>
							 <input class="form-control" id="contactno" name="contactno" type="text" placeholder="Contact Number" required />
						</div>
						<div  class="bor8 m-b-20 how-pos4-parent">
							<label>New Password</label>
							 <input class="form-control" id="inputPassword" name="inputPassword" type="password" placeholder="Password" required />
						</div>
						<div  class="bor8 m-b-20 how-pos4-parent">
							<label>Confirm Password</label>
							<input class="form-control" id="cinputPassword" name="cinputPassword" type="password" placeholder="Password" required />
							 <small><a href="login.php">Signin</a></small>
						</div>

						<button class="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer" type="submit" name="submit" id="submit">
							Submit
						</button>
					</form>
				</div>

				
			</div>
		</div>
	</section>	
	
	
	
<?php include_once('includes/footer.php');?>

<!--===============================================================================================-->	
	<script src="vendor/jquery/jquery-3.2.1.min.js"></script>
<!--===============================================================================================-->
	<script src="vendor/animsition/js/animsition.min.js"></script>
<!--===============================================================================================-->
	<script src="vendor/bootstrap/js/popper.js"></script>
	<script src="vendor/bootstrap/js/bootstrap.min.js"></script>
<!--===============================================================================================-->
	<script src="vendor/select2/select2.min.js"></script>
	<script>
		$(".js-select2").each(function(){
			$(this).select2({
				minimumResultsForSearch: 20,
				dropdownParent: $(this).next('.dropDownSelect2')
			});
		})
	</script>
<!--===============================================================================================-->
	<script src="vendor/MagnificPopup/jquery.magnific-popup.min.js"></script>
<!--===============================================================================================-->
	<script src="vendor/perfect-scrollbar/perfect-scrollbar.min.js"></script>
	<script>
		$('.js-pscroll').each(function(){
			$(this).css('position','relative');
			$(this).css('overflow','hidden');
			var ps = new PerfectScrollbar(this, {
				wheelSpeed: 1,
				scrollingThreshold: 1000,
				wheelPropagation: false,
			});

			$(window).on('resize', function(){
				ps.update();
			})
		});
	</script>
<!--===============================================================================================-->
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAKFWBqlKAGCeS1rMVoaNlwyayu0e0YRes"></script>
	<script src="js/map-custom.js"></script>
<!--===============================================================================================-->
	<script src="js/main.js"></script>

</body>
</html>