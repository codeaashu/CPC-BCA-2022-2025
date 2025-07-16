<?php
session_start();
error_reporting(0);
include('include/config.php');
if(strlen($_SESSION['id']==0)) {
 header('location:logout.php');
  } else{

if(isset($_POST['submit']))
{	$docspecialization = $_POST['Doctorspecialization'];
$docname = trim($_POST['docname']);
$docaddress = trim($_POST['clinicaddress']);
$docfees = trim($_POST['docfees']);
$doccontactno = trim($_POST['doccontact']);
$docemail = trim($_POST['docemail']);
$password = md5($_POST['npass']);

$errors = [];

if (!preg_match("/^[a-zA-Z\s]+$/", $docname)) {
    $errors[] = "Doctor name can only contain letters and spaces.";
}

if (!preg_match("/^[0-9]+$/", $docfees)) {
    $errors[] = "Doctor fees must be a numeric value.";
}

if (!preg_match("/^[6-9][0-9]{9}$/", $doccontactno)) {
    $errors[] = "Doctor contact must be a 10-digit number starting with 6, 7, 8, or 9.";
}



if (!filter_var($docemail, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Invalid email format.";
}

if (!empty($errors)) {
    foreach ($errors as $error) {
        echo "<script>alert('$error');</script>";
    }
} else {
    $sql = mysqli_query($con, "INSERT INTO doctors(specilization, doctorName, address, docFees, contactno, docEmail, password)
    VALUES('$docspecialization', '$docname', '$docaddress', '$docfees', '$doccontactno', '$docemail', '$password')");
    
    if ($sql) {
        echo "<script>alert('Doctor info added Successfully');</script>";
        echo "<script>window.location.href ='manage-doctors.php'</script>";
    } else {
        echo "<script>alert('Error inserting data.');</script>";
    }
}
if($sql)
{
echo "<script>alert('Doctor info added Successfully');</script>";
echo "<script>window.location.href ='manage-doctors.php'</script>";

}
}
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Admin | Add Doctor</title>
		
		<link href="http://fonts.googleapis.com/css?family=Lato:300,400,400italic,600,700|Raleway:300,400,500,600,700|Crete+Round:400italic" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="vendor/fontawesome/css/font-awesome.min.css">
		<link rel="stylesheet" href="vendor/themify-icons/themify-icons.min.css">
		<link href="vendor/animate.css/animate.min.css" rel="stylesheet" media="screen">
		<link href="vendor/perfect-scrollbar/perfect-scrollbar.min.css" rel="stylesheet" media="screen">
		<link href="vendor/switchery/switchery.min.css" rel="stylesheet" media="screen">
		<link href="vendor/bootstrap-touchspin/jquery.bootstrap-touchspin.min.css" rel="stylesheet" media="screen">
		<link href="vendor/select2/select2.min.css" rel="stylesheet" media="screen">
		<link href="vendor/bootstrap-datepicker/bootstrap-datepicker3.standalone.min.css" rel="stylesheet" media="screen">
		<link href="vendor/bootstrap-timepicker/bootstrap-timepicker.min.css" rel="stylesheet" media="screen">
		<link rel="stylesheet" href="assets/css/styles.css">
		<link rel="stylesheet" href="assets/css/plugins.css">
		<link rel="stylesheet" href="assets/css/themes/theme-1.css" id="skin_color" />
<script type="text/javascript">
function valid()
{
 if(document.adddoc.npass.value!= document.adddoc.cfpass.value)
{
alert("Password and Confirm Password Field do not match  !!");
document.adddoc.cfpass.focus();
return false;
}
return true;
}
</script>


<script>
function checkemailAvailability() {
$("#loaderIcon").show();
jQuery.ajax({
url: "check_availability.php",
data:'emailid='+$("#docemail").val(),
type: "POST",
success:function(data){
$("#email-availability-status").html(data);
$("#loaderIcon").hide();
},
error:function (){}
});
}
</script>
	</head>
	<body>
		<div id="app">		
<?php include('include/sidebar.php');?>
			<div class="app-content">
				
						<?php include('include/header.php');?>
						
				<!-- end: TOP NAVBAR -->
				<div class="main-content" >
					<div class="wrap-content container" id="container">
						<!-- start: PAGE TITLE -->
						<section id="page-title">
							<div class="row">
								<div class="col-sm-8">
									<h1 class="mainTitle">Admin | Add Doctor</h1>
																	</div>
								<ol class="breadcrumb">
									<li>
										<span>Admin</span>
									</li>
									<li class="active">
										<span>Add Doctor</span>
									</li>
								</ol>
							</div>
						</section>
						<!-- end: PAGE TITLE -->
						<!-- start: BASIC EXAMPLE -->
						<div class="container-fluid container-fullw bg-white">
							<div class="row">
								<div class="col-md-12">
									
									<div class="row margin-top-30">
										<div class="col-lg-8 col-md-12">
											<div class="panel panel-white">
												<div class="panel-heading">
													<h5 class="panel-title">Add Doctor</h5>
												</div>
												<div class="panel-body">
									
													<form role="form" name="adddoc" method="post" onSubmit="return valid();">
														<div class="form-group">
															<label for="DoctorSpecialization">
																Doctor Specialization
															</label>
							<select name="Doctorspecialization" class="form-control" required="true">
																<option value="">Select Specialization</option>
<?php $ret=mysqli_query($con,"select * from doctorspecilization");
while($row=mysqli_fetch_array($ret))
{
?>
																<option value="<?php echo htmlentities($row['specilization']);?>">
																	<?php echo htmlentities($row['specilization']);?>
																</option>
																<?php } ?>
																
															</select>
														</div>

<div class="form-group">
															<label for="doctorname">
																 Doctor Name
															</label>
					<input type="text" name="docname" id="docname" class="form-control" placeholder="Enter Doctor Name" required="true">
						</div>


<div class="form-group">
															<label for="address">
																 Doctor Clinic Address
															</label>
					<textarea name="clinicaddress" class="form-control"  placeholder="Enter Doctor Clinic Address" required="true"></textarea>
														</div>
<div class="form-group">
															<label for="fess">
																 Doctor Consultancy Fees
															</label>
					<input type="text" name="docfees" id="docfees" class="form-control" placeholder="Enter Doctor Consultancy Fees" required="true">
</div>
	
<div class="form-group">
									<label for="fess">
																 Doctor Contact no
															</label>
					<input type="text" name="doccontact" id="doccontact" class="form-control" placeholder="Enter Doctor Contact no" required="true">
<span id="contact-error" style="color:red;"></span></div>

<div class="form-group">
									<label for="fess">
																 Doctor Email
															</label>
<input type="email" id="docemail" name="docemail" class="form-control"  placeholder="Enter Doctor Email id" required="true" onBlur="checkemailAvailability()">
<span id="email-availability-status"></span>
</div>



														
														<div class="form-group">
															<label for="exampleInputPassword1">
																 Password
															</label>
					<input type="password" name="npass" class="form-control"  placeholder="New Password" required="required">
														</div>
														
<div class="form-group">
															<label for="exampleInputPassword2">
																Confirm Password
															</label>
									<input type="password" name="cfpass" class="form-control"  placeholder="Confirm Password" required="required">
														</div>
														
														
														
														<button type="submit" name="submit" id="submit" class="btn btn-o btn-primary">
															Submit
														</button>
													</form>
												</div>
											</div>
										</div>
											
											</div>
										</div>
									<div class="col-lg-12 col-md-12">
											<div class="panel panel-white">
												
												
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- end: BASIC EXAMPLE -->
			
					
					
						
						
					
						<!-- end: SELECT BOXES -->
						
					</div>
				</div>
			</div>
			<!-- start: FOOTER -->
	<?php include('include/footer.php');?>
			<!-- end: FOOTER -->
		
			<!-- start: SETTINGS -->
	<?php include('include/setting.php');?>
			
			<!-- end: SETTINGS -->
		</div>
		<!-- start: MAIN JAVASCRIPTS -->
		<script src="vendor/jquery/jquery.min.js"></script>
		<script src="vendor/bootstrap/js/bootstrap.min.js"></script>
		<script src="vendor/modernizr/modernizr.js"></script>
		<script src="vendor/jquery-cookie/jquery.cookie.js"></script>
		<script src="vendor/perfect-scrollbar/perfect-scrollbar.min.js"></script>
		<script src="vendor/switchery/switchery.min.js"></script>
		<!-- end: MAIN JAVASCRIPTS -->
		<!-- start: JAVASCRIPTS REQUIRED FOR THIS PAGE ONLY -->
		<script src="vendor/maskedinput/jquery.maskedinput.min.js"></script>
		<script src="vendor/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js"></script>
		<script src="vendor/autosize/autosize.min.js"></script>
		<script src="vendor/selectFx/classie.js"></script>
		<script src="vendor/selectFx/selectFx.js"></script>
		<script src="vendor/select2/select2.min.js"></script>
		<script src="vendor/bootstrap-datepicker/bootstrap-datepicker.min.js"></script>
		<script src="vendor/bootstrap-timepicker/bootstrap-timepicker.min.js"></script>
		<!-- end: JAVASCRIPTS REQUIRED FOR THIS PAGE ONLY -->
		<!-- start: CLIP-TWO JAVASCRIPTS -->
		<script src="assets/js/main.js"></script>
		<!-- start: JavaScript Event Handlers for this page -->
		<script src="assets/js/form-elements.js"></script>
		<script>
			jQuery(document).ready(function() {
				Main.init();
				FormElements.init();
			});
		</script>
		<script>
			//This validation allows to write wrong input in the input field 
			//After coming out from the input field it should alert about wrong input
document.addEventListener('DOMContentLoaded', function () {
    // Doctor Name validation
    const docname = document.getElementById('docname');
    docname.addEventListener('blur', function () {
        const val = this.value.trim();
        if (val && !/^[a-zA-Z\s]+$/.test(val)) {
            alert("Doctor name can only contain letters and spaces.");
            setTimeout(() => this.focus(), 0);
        }
    });
	const docaddress = document.querySelector('textarea[name="clinicaddress"]');
    docaddress.addEventListener('blur', function () {
        const val = this.value.trim();
        const allowedChars = /^[a-zA-Z0-9\s,./-]{3,}$/;
        const containsLetter = /[a-zA-Z]/;

        if (val && (!allowedChars.test(val) || !containsLetter.test(val))) {
            alert("Clinic address must be at least 3 characters and contain at least one alphabet character.");
            setTimeout(() => this.focus(), 0);
     }
    });
    // Doctor Fees validation
    const docfees = document.getElementById('docfees');
    docfees.addEventListener('blur', function () {
        const val = this.value.trim();
        if (val && !/^[0-9]+$/.test(val)) {
            alert("Doctor fees must be a numeric value.");
            setTimeout(() => this.focus(), 0);
        }
    });

    // Doctor Contact Number validation
    const doccontact = document.getElementById('doccontact');
    doccontact.addEventListener('blur', function () {
        const val = this.value.trim();
        if (val && !/^[6-9][0-9]{9}$/.test(val)) {
            alert("Contact number must be 10 digits and start with 6, 7, 8, or 9.");
            setTimeout(() => this.focus(), 0);
        }
    });
});
</script>
		
    <!-- <script>
	//This validation do not allow to write wrong input in the input field
	//After just typing one wrong the input in field it should alert about wrong input
	//Validation starts from here
     document.addEventListener('DOMContentLoaded', function () {
    // Doctor Name: Only letters and spaces
    document.getElementById('docname').addEventListener('input', function () {
        const val = this.value;
        if (/[^a-zA-Z\s]/.test(val)) {
            alert("Only letters and spaces are allowed in Doctor Name.");
            this.value = val.replace(/[^a-zA-Z\s]/g, '');
        }
    });

    // Doctor Fees: Only digits
    document.getElementById('docfees').addEventListener('keydown', function (e) {
        const key = e.key;
        if (!/^\d$/.test(key) && !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(key)) {
            e.preventDefault();
            alert("Only digits are allowed in Doctor Fees.");
        }
    });

    // Doctor Contact
    const contactInput = document.getElementById('doccontact');
    const errorField = document.getElementById('contact-error');

    // Allow only digits
    contactInput.addEventListener('keydown', function (e) {
        const key = e.key;
        if (!/^\d$/.test(key) && !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(key)) {
            e.preventDefault();
            alert("Only digits are allowed in Contact Number.");
        }
    });

    // Max length + start digit check
    contactInput.addEventListener('input', function () {
        const val = this.value;

        if (val.length > 10) {
            alert("Contact number cannot exceed 10 digits.");
            this.value = val.slice(0, 10);
        }

        if (val.length === 10 && !/^[6-9]/.test(val)) {
            alert("Contact number must start with 6, 7, 8, or 9.");
            errorField.innerText = "Invalid starting digit.";
        } else {
            errorField.innerText = "";
        }
    });

    // Show alert if number is not exactly 10 digits on blur
    contactInput.addEventListener('blur', function () {
        const val = this.value;
        if (val.length > 0 && val.length !== 10) {
            alert("Contact number must be exactly 10 digits.");
        }
    });
});
</script> -->



        

		<!-- end: JavaScript Event Handlers for this page -->
		<!-- end: CLIP-TWO JAVASCRIPTS -->
	</body>
</html>
<?php } ?>