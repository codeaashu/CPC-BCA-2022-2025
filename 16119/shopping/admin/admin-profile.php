<?php session_start();
include_once('includes/config.php');
if(strlen($_SESSION["aid"])==0)
{   
header('location:logout.php');
} else {

//For Adding categories
if(isset($_POST['submit']))
{
$contactno=$_POST['cnumber'];
$id=intval($_SESSION["aid"]);
$sql=mysqli_query($con,"update tbladmin set contactNumber='$contactno' where id='$id'");
echo "<script>alert('Profile Updated successfully');</script>";
echo "<script>window.location.href='admin-profile.php'</script>";
}
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Shopping Portal | Admin Profile</title>
        <link href="css/styles.css" rel="stylesheet" />
        <script src="js/all.min.js" crossorigin="anonymous"></script>
    </head>
    <body>
   <?php include_once('includes/header.php');?>
        <div id="layoutSidenav">
   <?php include_once('includes/sidebar.php');?>
            <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid px-4">
                        <h1 class="mt-4">Update Admin Profile</h1>
                        <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item"><a href="dashboard.php">Dashboard</a></li>
                            <li class="breadcrumb-item active">Update Admin Profile</li>
                        </ol>
                        <div class="card mb-4">
                            <div class="card-body">
<?php
$id=intval($_SESSION["aid"]);
$query=mysqli_query($con,"select * from tbladmin where id='$id'");
while($row=mysqli_fetch_array($query))
{
?>	                            	
<form  method="post">                                
<div class="row">
<div class="col-3">Admin userName(used for login)</div>
<div class="col-4"><input type="text" value="<?php echo  htmlentities($row['username']);?>"  name="username" class="form-control" readonly></div>
</div>

<div class="row" style="margin-top:1%;">
<div class="col-3">Contact No.</div>
<div class="col-4"><input type="text" value="<?php echo  htmlentities($row['contactNumber']);?>"  name="cnumber" class="form-control" required></div>
</div>
<div class="row" style="margin-top:1%;">
<div class="col-3">Reg. Date</div>
<div class="col-4"><input type="text" value="<?php echo  htmlentities($row['creationDate']);?>"  name="regdate" class="form-control" readonly></div>
</div>
<div class="row" style="margin-top:1%;">
<div class="col-3">Profile Last Updation Date</div>
<div class="col-4"><input type="text" value="<?php echo  htmlentities($row['updationDate']);?>"  name="updatedate" class="form-control" readonly></div>
</div>

<div class="row" style="margin-top:1%;">
<div class="col-7" align="center"><button type="submit" name="submit" class="btn btn-primary">Update</button></div>
</div>

</form>
<?php } ?>
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
