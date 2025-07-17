<?php session_start();
// Database Connection
include('includes/config.php');
//Validating Session
if(strlen($_SESSION['aid'])==0)
  { 
header('location:index.php');
}
else{
// Code for update the Contact us content
if(isset($_POST['submit']))
{
$email=$_POST['email'];
 $mobnum=$_POST['mobnum'];
 $pagetitle=$_POST['pagetitle'];
$pagedes=$con->real_escape_string($_POST['pagedes']);
 $query=mysqli_query($con,"update tblpage set PageTitle='$pagetitle',PageDescription='$pagedes',Email='$email',MobileNumber='$mobnum' where  PageType='contactus'");
if ($query) {
echo '<script>alert("Contact Us has been updated.")</script>';
}else{
echo '<script>alert("Something Went Wrong. Please try again.")</script>';
}}
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        
        <title>OBSMS | About us</title>
        <link href="css/styles.css" rel="stylesheet" />
        <script src="js/all.min.js" crossorigin="anonymous"></script>
        <script src="nic.js" type="text/javascript"></script>
<script type="text/javascript">bkLib.onDomLoaded(nicEditors.allTextAreas);</script>
    </head>
    <body>
   <?php include_once('includes/header.php');?>
        <div id="layoutSidenav">
   <?php include_once('includes/sidebar.php');?>
            <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid px-8">
                        <h1 class="mt-4">Edit Contact Us</h1>
                        <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item"><a href="dashboard.php">Dashboard</a></li>
                            <li class="breadcrumb-item active">Edit Contact Us</li>
                        </ol>
                        <div class="card mb-4">
                            <div class="card-body">
<?php
$ret=mysqli_query($con,"select * from  tblpage where PageType='contactus'");
$cnt=1;
while ($row=mysqli_fetch_array($ret)) {
?>	                            	
<form  method="post">                                
<div class="row">
<div class="col-2">Page Title</div>
<div class="col-6"><input type="text" class="form-control" name="pagetitle" value="<?php  echo $row['PageTitle'];?>" required='true'></div>
</div>

<div class="row" style="margin-top:1%;">
<div class="col-2">Page Description</div>
<div class="col-6"><textarea  name="pagedes" class="form-control" required='true' cols="140" rows="10"><?php  echo $row['PageDescription'];?></textarea></div>
</div>

<div class="row" style="margin-top:1%;">
<div class="col-2">Email Address</div>
<div class="col-6"><input type="email" class="form-control" name="email" value="<?php  echo $row['Email'];?>" required='true'></div>
</div>

<div class="row" style="margin-top:1%;">
<div class="col-2">Mobile Number</div>
<div class="col-6"><input type="text" class="form-control" name="mobnum" value="<?php  echo $row['MobileNumber'];?>" required='true' maxlength="10" pattern='[0-9]+'></div>
</div>
<?php } ?>
<div class="row" style="margin-top:1%">
    <div class="col-2">&nbsp;</div>
<div class="col-2"><button type="submit" name="submit" id="submit" class="btn btn-primary">Update</button></div>
</div>

</form>

                            </div>
                        </div>
                    </div>
                </main>
          <?php include_once('includes/footer.php');?>
            </div>
        </div>
        <script src="js/bootstrap.bundle.min.js"></script>
        <script src="js/scripts.js"></script>
    </body>
</html>
<?php } ?>
