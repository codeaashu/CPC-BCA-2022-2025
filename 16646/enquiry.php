<?php
session_start();
// error_reporting(E_ALL);
error_reporting(0);
include('includes/config.php');

$error = "";
$msg = "";

function isValidName($name) {
    return preg_match("/^[a-zA-Z ]+$/", $name);
}

function isValidMobile($mobile) {
    return preg_match("/^[0-9]{10}$/", $mobile);
}

if (isset($_POST['submit1'])) {
    $fname = trim($_POST['fname']);
    $email = trim($_POST['email']);
    $mobile = trim($_POST['mobileno']);
    $subject = trim($_POST['subject']);
    $description = trim($_POST['description']);

    // Server-side validation
    if (!isValidName($fname)) {
        $error = "Full name should contain only letters and spaces.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "Invalid email format.";
    } elseif (!isValidMobile($mobile)) {
        $error = "Mobile number must be 10 digits.";
    } elseif (empty($subject) || empty($description)) {
        $error = "Subject and description cannot be empty.";
    } else {
        // Save to DB
        $sql = "INSERT INTO tblenquiry(FullName, EmailId, MobileNumber, Subject, Description) 
                VALUES(:fname, :email, :mobile, :subject, :description)";
        $query = $dbh->prepare($sql);
        $query->bindParam(':fname', $fname, PDO::PARAM_STR);
        $query->bindParam(':email', $email, PDO::PARAM_STR);
        $query->bindParam(':mobile', $mobile, PDO::PARAM_STR);
        $query->bindParam(':subject', $subject, PDO::PARAM_STR);
        $query->bindParam(':description', $description, PDO::PARAM_STR);

        if ($query->execute()) {
            $msg = "Enquiry successfully submitted!";
        } else {
            $error = "Something went wrong. Please try again.";
        }
    }
}
?>

<!DOCTYPE HTML>
<html>
<head>
<title>PlanMyTrip</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="Tourism Management System In PHP" />
<script type="applijewelleryion/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
<link href="css/bootstrap.css" rel='stylesheet' type='text/css' />
<link href="css/style.css" rel='stylesheet' type='text/css' />
<link href='//fonts.googleapis.com/css?family=Open+Sans:400,700,600' rel='stylesheet' type='text/css'>
<link href='//fonts.googleapis.com/css?family=Roboto+Condensed:400,700,300' rel='stylesheet' type='text/css'>
<link href='//fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'>
<link href="css/font-awesome.css" rel="stylesheet">
<!-- Custom Theme files -->
<script src="js/jquery-1.12.0.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<!--animate-->
<link href="css/animate.css" rel="stylesheet" type="text/css" media="all">
<script src="js/wow.min.js"></script>
	<script>
		 new WOW().init();
	</script>
	<style>
    span[id$="Error"] {
        display: block;
        margin-top: 2px;
        color: red;
        font-size: 12px;
    }
</style>

  <style>
		.errorWrap {
    padding: 10px;
    margin: 0 0 20px 0;
    background: #fff;
    border-left: 4px solid #dd3d36;
    -webkit-box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
    box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
}
.succWrap{
    padding: 10px;
    margin: 0 0 20px 0;
    background: #fff;
    border-left: 4px solid #5cb85c;
    -webkit-box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
    box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
}
		</style>
</head>
<body>
<!-- top-header -->
<div class="top-header">
<?php include('includes/header.php');?>
<div class="banner-1 ">
	<div class="container">
		<!-- <h1 class="wow zoomIn animated animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: zoomIn;">TMS-Tourism Management System</h1> -->
	</div>
</div>
<!--- /banner-1 ---->
<!--- privacy ---->
<div class="privacy">
	<div class="container">
		<h3 class="wow fadeInDown animated animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInDown;">Enquiry Form Password</h3>
		
		<form name="enquiry" method="post" onsubmit="return validateForm();">
    <?php if (!empty($error)) { ?>
        <div class="errorWrap"><strong>ERROR:</strong> <?php echo htmlentities($error); ?></div>
    <?php } elseif (!empty($msg)) { ?>
        <div class="succWrap"><strong>SUCCESS:</strong> <?php echo htmlentities($msg); ?></div>
    <?php } ?>
<script>
setTimeout(() => {
    document.querySelectorAll('.succWrap, .errorWrap').forEach(el => el.style.display = 'none');
}, 3000);
</script>

    <p style="width: 350px;">
    <b>Full Name</b><span class="text-danger">*</span>
    <input type="text" name="fname" class="form-control" id="fname">
    <span id="fnameError" style="color:red;font-size:12px;"></span>
</p>

<p style="width: 350px;">
    <b>Email</b><span class="text-danger">*</span>
    <input type="email" name="email" class="form-control" id="email">
    <span id="emailError" style="color:red;font-size:12px;"></span>
</p>

<p style="width: 350px;">
    <b>Mobile No</b><span class="text-danger">*</span>
    <input type="text" name="mobileno" class="form-control" id="mobileno" maxlength="10">
    <span id="mobileError" style="color:red;font-size:12px;"></span>
</p>

<p style="width: 350px;">
    <b>Subject</b><span class="text-danger">*</span>
    <input type="text" name="subject" class="form-control" id="subject">
    <span id="subjectError" style="color:red;font-size:12px;"></span>
</p>

<p style="width: 350px;">
    <b>Description</b><span class="text-danger">*</span>
    <textarea name="description" class="form-control" rows="6" id="description"></textarea>
    <span id="descriptionError" style="color:red;font-size:12px;"></span>
</p>


    <p style="width: 350px;">
        <button type="submit" name="submit1" class="btn btn-primary">Submit</button>
    </p>
</form>


		
	</div>
</div>


<!--- /privacy ---->
<!--- footer-top ---->
<!--- /footer-top ---->
<?php include('includes/footer.php');?>
<!-- signup -->
<?php include('includes/signup.php');?>			
<!-- //signu -->
<!-- signin -->
<?php include('includes/signin.php');?>			
<!-- //signin -->
<!-- write us -->
<?php include('includes/write-us.php');?>
<script>
function validateForm() {
    // Clear all previous errors
    document.getElementById('fnameError').innerText = "";
    document.getElementById('emailError').innerText = "";
    document.getElementById('mobileError').innerText = "";
    document.getElementById('subjectError').innerText = "";
    document.getElementById('descriptionError').innerText = "";

    // Fetch input values
    const fname = document.getElementById('fname').value.trim();
    const email = document.getElementById('email').value.trim();
    const mobile = document.getElementById('mobileno').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const description = document.getElementById('description').value.trim();

    const nameRegex = /^[a-zA-Z ]+$/;
    const mobileRegex = /^[0-9]{10}$/;
    let isValid = true;

    if (!nameRegex.test(fname)) {
        document.getElementById('fnameError').innerText = "Only letters and spaces allowed.";
        isValid = false;
    }

    if (!email || !email.includes('@') || !email.includes('.')) {
        document.getElementById('emailError').innerText = "Enter a valid email address.";
        isValid = false;
    }

    if (!mobileRegex.test(mobile)) {
        document.getElementById('mobileError').innerText = "Mobile number must be 10 digits.";
        isValid = false;
    }

    if (!subject) {
        document.getElementById('subjectError').innerText = "Subject is required.";
        isValid = false;
    }

    if (!description) {
        document.getElementById('descriptionError').innerText = "Description is required.";
        isValid = false;
    }

    return isValid;
}
</script>

</body>
</html>