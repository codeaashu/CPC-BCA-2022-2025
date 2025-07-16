

<?php
session_start();
error_reporting(0);
include('includes/config.php');
if(isset($_POST['submit']))
	{
$email=$_POST['email'];
$mobile=$_POST['mobile'];
$newpassword=md5($_POST['newpassword']);
	$sql ="SELECT EmailId FROM admin WHERE EmailId=:email and MobileNumber=:mobile";
$query= $dbh -> prepare($sql);
$query-> bindParam(':email', $email, PDO::PARAM_STR);
$query-> bindParam(':mobile', $mobile, PDO::PARAM_STR);
$query-> execute();
$results = $query -> fetchAll(PDO::FETCH_OBJ);
if($query -> rowCount() > 0)
{
$con="update admin set Password=:newpassword where EmailId=:email and MobileNumber=:mobile";
$chngpwd1 = $dbh->prepare($con);
$chngpwd1-> bindParam(':email', $email, PDO::PARAM_STR);
$chngpwd1-> bindParam(':mobile', $mobile, PDO::PARAM_STR);
$chngpwd1-> bindParam(':newpassword', $newpassword, PDO::PARAM_STR);
$chngpwd1->execute();

echo "<script>alert('Your Password succesfully changed');</script>";
}
else {

echo "<script>alert('Email id or Mobile no is invalid');</script>";
}
}

?>

<!DOCTYPE HTML>
<html>
<head>
<title>PlanMyTrip| Admin Forgot Password	</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
<!-- Bootstrap Core CSS -->
<link href="css/bootstrap.min.css" rel='stylesheet' type='text/css' />
<!-- Custom CSS -->
<link href="css/style.css" rel='stylesheet' type='text/css' />
<link rel="stylesheet" href="css/morris.css" type="text/css"/>
<!-- Graph CSS -->
<link href="css/font-awesome.css" rel="stylesheet">
<link rel="stylesheet" href="css/jquery-ui.css"> 
<!-- jQuery -->
<script src="js/jquery-2.1.4.min.js"></script>
<!-- //jQuery -->
<link href='//fonts.googleapis.com/css?family=Roboto:700,500,300,100italic,100,400' rel='stylesheet' type='text/css'/>
<link href='//fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
<!-- lined-icons -->
<link rel="stylesheet" href="css/icon-font.min.css" type='text/css' />
<script type="text/javascript">
function valid()
{
if(document.chngpwd.newpassword.value!= document.chngpwd.confirmpassword.value)
{
alert("New Password and Confirm Password Field do not match  !!");
document.chngpwd.confirmpassword.focus();
return false;
}
return true;
}
</script>
<!-- //lined-icons -->
</head> 
<body>
	<div class="main-wthree">
	<div class="container">
	<div class="sin-w3-agile">
		<h2>Forgot Password</h2>
		<form  name="chngpwd" method="post" onSubmit="return valid();">
			<div class="username">
				<span class="username">Email id:</span>
				<input type="email" name="email" class="name" placeholder="Reg Email id" required="">
				<div class="clearfix"></div>
			</div>
			<div>
			<div class="username">
				<span class="username">Mobile No:</span>
				<input type="text" name="mobile" class="name" placeholder="Reg Mobile Number" required="" maxlength="10">
				<div class="clearfix"></div>
			</div>
			<div class="password-agileits">
				<span class="username">New Password:</span>
				<input type="password" class="password" name="newpassword" id="newpassword" placeholder="New Password" required="">
				<div class="clearfix"></div>
			</div>
			<div class="password-agileits">
				<span class="username">Confirm Password:</span>
				<input type="password" name="confirmpassword" id="confirmpassword" class="password" placeholder="Confirm Password" required="">
				<div class="clearfix"></div>
			</div>
			<div class="login-w3">
					<input type="submit" class="login" name="submit" value="Reset">
			</div>
			<div class="clearfix"></div>
		</form>
				<div class="back">
					<a href="index.php" style="color: #fff;">Signin</a>
				</div>
				
	</div>
	</div>
	</div>
</body>
</html>