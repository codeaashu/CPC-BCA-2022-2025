<?php
session_start();
error_reporting(0);
include('include/config.php');
if(strlen($_SESSION['id']==0)) {
 header('location:logout.php');
  } else{

if (isset($_POST['submit'])) {
    $docid = $_SESSION['id'];
    $patname = $_POST['patname'];
    $patcontact = $_POST['patcontact'];
    $patemail = $_POST['patemail'];
    $gender = $_POST['gender'];
    $pataddress = $_POST['pataddress'];
    $patage = $_POST['patage'];
    $medhis = $_POST['medhis'];

    // Server-side validations
    if (!preg_match("/^[a-zA-Z\s]+$/", $patname)) {
        echo "<script>alert('Invalid patient name. Only letters and spaces allowed.');</script>";
    } elseif (!preg_match("/^[6-9][0-9]{9}$/", $patcontact)) {
        echo "<script>alert('Invalid contact number. Must start with 6–9 and be 10 digits.');</script>";
    } elseif (!is_numeric($patage) || $patage <= 0 || $patage >= 110) {
        echo "<script>alert('Invalid age. Must be between 1 and 109.');</script>";
    } elseif (!preg_match("/^[a-zA-Z\s]+$/", $medhis)) {
        echo "<script>alert('Medical history can only contain letters and spaces.');</script>";
    } else {
        $sql = mysqli_query($con, "INSERT INTO tblpatient(Docid,PatientName,PatientContno,PatientEmail,PatientGender,PatientAdd,PatientAge,PatientMedhis) VALUES('$docid','$patname','$patcontact','$patemail','$gender','$pataddress','$patage','$medhis')");
        if ($sql) {
            echo "<script>alert('Patient info added Successfully');</script>";
            echo "<script>window.location.href ='manage-patient.php'</script>";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Doctor | Add Patient</title>
		
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

	<script>
function userAvailability() {
$("#loaderIcon").show();
jQuery.ajax({
url: "check_availability.php",
data:'email='+$("#patemail").val(),
type: "POST",
success:function(data){
$("#user-availability-status1").html(data);
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
						
<div class="main-content" >
<div class="wrap-content container" id="container">
						<!-- start: PAGE TITLE -->
<section id="page-title">
<div class="row">
<div class="col-sm-8">
<h1 class="mainTitle">Patient | Add Patient</h1>
</div>
<ol class="breadcrumb">
<li>
<span>Patient</span>
</li>
<li class="active">
<span>Add Patient</span>
</li>
</ol>
</div>
</section>
<div class="container-fluid container-fullw bg-white">
<div class="row">
<div class="col-md-12">
<div class="row margin-top-30">
<div class="col-lg-8 col-md-12">
<div class="panel panel-white">
<div class="panel-heading">
<h5 class="panel-title">Add Patient</h5>
</div>
<div class="panel-body">
<form role="form" name="" method="post">

<div class="form-group">
<label for="doctorname">
Patient Name
</label>
<input type="text" id="patname" name="patname" class="form-control"  placeholder="Enter Patient Name" required="true">
</div>
<div class="form-group">
<label for="fess">
 Patient Contact no
</label>
<input type="text" id="patcontact" name="patcontact" class="form-control"  placeholder="Enter Patient Contact no" required="true" maxlength="10" pattern="[0-9]+">
</div>
<div class="form-group">
<label for="fess">
Patient Email
</label>
<input type="email" id="patemail" name="patemail" class="form-control"  placeholder="Enter Patient Email id" required="true" onBlur="userAvailability()">
<span id="user-availability-status1" style="font-size:12px;"></span>
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
<div class="form-group">
<label for="address">
Patient Address
</label>
<textarea name="pataddress" id="pataddress" class="form-control"  placeholder="Enter Patient Address" required="true"></textarea>
</div>
<div class="form-group">
<label for="fess">
 Patient Age
</label>
<input type="text" id="patage" name="patage" class="form-control"  placeholder="Enter Patient Age" required="true">
</div>
<div class="form-group">
<label for="fess">
 Medical History
</label>
<textarea type="text" id="medhis" name="medhis" class="form-control"  placeholder="Enter Patient Medical History(if any)" required="true"></textarea>
</div>	

<button type="submit" name="submit" id="submit" class="btn btn-o btn-primary">
Add
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
        document.addEventListener('DOMContentLoaded', function () {
        console.log("Validation script is running!");

        const patname = document.getElementById('patname');
        patname.addEventListener('input', function () {
            const cleaned = this.value.replace(/[^a-zA-Z\s]/g, '');
            if (this.value !== cleaned) {
                alert("Patient name can only contain letters and spaces.");
                this.value = cleaned;
            }
        });

        const patcontact = document.getElementById('patcontact');
        patcontact.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
            if (this.value.length > 10) {
                alert("Contact number cannot exceed 10 digits.");
                this.value = this.value.slice(0, 10);
            }
        });
        patcontact.addEventListener('blur', function () {
            if (this.value.length !== 10) {
                alert("Contact number must be exactly 10 digits.");
            } else if (!/^[6-9]/.test(this.value)) {
                alert("Contact number must start with 6, 7, 8, or 9.");
            }
        });
        // Doctor Fees: Only digits
    document.getElementById('patage').addEventListener('keydown', function (e) {
        const key = e.key;
        if (!/^\d$/.test(key) && !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(key)) {
            e.preventDefault();
			this.value = this.value.replace(/[^0-9]/g, '');
            alert("Only digits are allowed in Patient Age. Age must be a number between 1 and 109.");
        }
    });
        

    const pataddress = document.getElementById('pataddress');
    
    pataddress.addEventListener('blur', function () {
        const val = this.value.trim();
        const allowedChars = /^[a-zA-Z0-9\s,./-]{3,}$/; // Allowed characters
        const containsLetter = /[a-zA-Z]/; // Must have at least one letter

        if (val.length < 3 || !allowedChars.test(val) || !containsLetter.test(val)) {
            alert("Patient address must be at least 3 characters long, contain only valid characters, and include at least one alphabet letter.");
            setTimeout(() => {
                this.focus();
            }, 0);

        }
    });
});

    </script>


		<!-- end: JavaScript Event Handlers for this page -->
		<!-- end: CLIP-TWO JAVASCRIPTS -->
	</body>
</html>
<?php } ?>
