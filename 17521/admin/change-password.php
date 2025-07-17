<?php session_start();
include_once('includes/config.php');
if(strlen($_SESSION["aid"])==0)
{   
header('location:logout.php');
} else {

if(isset($_POST['update']))
{
$adminid=$_SESSION["aid"];
$currentpassword=md5($_POST['cpass']);
$newpassword=md5($_POST['newpass']);
$ret=mysqli_query($con,"SELECT id FROM tbladmin WHERE id='$adminid' and password='$currentpassword'");
$num=mysqli_num_rows($ret);
if($num>0)
{
$query=mysqli_query($con,"update tbladmin set password='$newpassword' WHERE id='$adminid'");

echo "<script>alert('Password changed successfully.');</script>";
echo "<script type='text/javascript'> document.location ='change-password.php'; </script>";
}else{
echo "<script>alert('Current Password is wrong.');</script>";
echo "<script type='text/javascript'> document.location ='change-password.php'; </script>";
}
}
?>

<!DOCTYPE html>
<html lang="en">
    <head>
       
        <title>OBSMS | Admin Change Password</title>
        <link href="css/styles.css" rel="stylesheet" />
        <script src="js/all.min.js" crossorigin="anonymous"></script>
               <script type="text/javascript">
function valid()
{
if(document.chngpwd.newpass.value!= document.chngpwd.cnfpass.value)
{
alert("Password and Confirm Password Field do not match  !!");
document.chngpwd.cnfpass.focus();
return false;
}
return true;
}
</script>
    </head>
    <body>
   <?php include_once('includes/header.php');?>
        <div id="layoutSidenav">
   <?php include_once('includes/sidebar.php');?>
            <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid px-4">
                        <h1 class="mt-4"> Change Password</h1>
                        <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item"><a href="dashboard.php">Dashboard</a></li>
                            <li class="breadcrumb-item active">Change Password</li>
                        </ol>
                        <div class="card mb-4">
                            <div class="card-body">
<form method="post" name="chngpwd" onSubmit="return valid();">
     <div class="row">
         <div class="col-2">Current Password</div>
         <div class="col-6">    
            <input type="password" class="form-control" id="cpass" name="cpass" required="required"></div>
     </div>
       <div class="row mt-3">
         <div class="col-2">New Password</div>
         <div class="col-6">
     <input type="password" class="form-control" id="newpass" name="newpass" required>
         </div>
          
     </div>

       <div class="row mt-3">
         <div class="col-2">Confirm Password</div>
         <div class="col-6"><input type="password" class="form-control" id="cnfpass" name="cnfpass" required="required" ></div>
     </div>



               <div class="row mt-3">
                 <div class="col-4">&nbsp;</div>
         <div class="col-6"><input type="submit" name="update" id="update" class="btn btn-primary" value="Change" required></div>
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
