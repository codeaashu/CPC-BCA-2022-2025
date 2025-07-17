<?php session_start();
error_reporting(0);
include('includes/dbconnection.php');
if (strlen($_SESSION['sturecmsaid']==0)) {
  header('location:logout.php');
  } else{
if(isset($_POST['upload']))
{
// Posted Values
$aremark=$_POST['adminremark'];
$hwid=intval($_GET['hwid']);
$stdid=$_GET['stid'];

$sql="update tbluploadedhomeworks set adminRemark=:aremark where homeworkId=:hwid and studentId=:stdid";
$query=$dbh->prepare($sql);
$query->bindParam(':aremark',$aremark,PDO::PARAM_STR);
$query->bindParam(':hwid',$hwid,PDO::PARAM_STR);
$query->bindParam(':stdid',$stdid,PDO::PARAM_STR);
$query->execute();
echo "<script>alert('Admin Remark  Updated successfully');</script>";
}

 ?>

<!DOCTYPE html>
<html lang="en">
  <head>
   
    <title>Student  Management System|| View Homework</title>
    <!-- plugins:css -->
    <link rel="stylesheet" href="vendors/simple-line-icons/css/simple-line-icons.css">
    <link rel="stylesheet" href="vendors/flag-icon-css/css/flag-icon.min.css">
    <link rel="stylesheet" href="vendors/css/vendor.bundle.base.css">
    <!-- endinject -->
    <!-- Plugin css for this page -->
    <link rel="stylesheet" href="vendors/select2/select2.min.css">
    <link rel="stylesheet" href="vendors/select2-bootstrap-theme/select2-bootstrap.min.css">
    <!-- End plugin css for this page -->
    <!-- inject:css -->
    <!-- endinject -->
    <!-- Layout styles -->
    <link rel="stylesheet" href="css/style.css" />
    
  </head>
  <body>
    <div class="container-scroller">
      <!-- partial:partials/_navbar.html -->
     <?php include_once('includes/header.php');?>
      <!-- partial -->
      <div class="container-fluid page-body-wrapper">
        <!-- partial:partials/_sidebar.html -->
      <?php include_once('includes/sidebar.php');?>
        <!-- partial -->
        <div class="main-panel">
          <div class="content-wrapper">
            <div class="page-header">
              <h3 class="page-title"> View Homework </h3>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="dashboard.php">Dashboard</a></li>
                  <li class="breadcrumb-item active" aria-current="page"> View Homework</li>
                </ol>
              </nav>
            </div>
            <div class="row">
          
              <div class="col-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    
                    <table border="1" class="table table-bordered mg-b-0">
                    
<?php  $hwid=intval($_GET['hwid']);
$stdid=$_GET['stid'];
$sql="SELECT StudentName,StudentEmail from  tblstudent where ID='$stdid'";
$query = $dbh -> prepare($sql);
$query->execute();
$results=$query->fetchAll(PDO::FETCH_OBJ);

foreach($results as $row)
{   ?>
   <tr>
                             <th class="font-weight-bold">Student Name</th>
                            <td><?php  echo htmlentities($row->StudentName);?></td>
                          </tr>
                          <tr>
                             <th class="font-weight-bold">Student Email</th>
                            <td><?php  echo htmlentities($row->StudentEmail);?></td>
                          </tr>


                      <?php }

$sql="SELECT tblclass.ID,tblclass.ClassName,tblclass.Section,tblhomework.homeworkTitle,tblhomework.postingDate,tblhomework.lastDateofSubmission,tblhomework.id as hwid,homeworkDescription from tblhomework join tblclass on tblclass.ID=tblhomework.classId  where tblhomework.id=:hwid";
$query = $dbh -> prepare($sql);
$query->bindParam(':hwid',$hwid,PDO::PARAM_STR);
$query->execute();
$results=$query->fetchAll(PDO::FETCH_OBJ);
$cnt=1;
if($query->rowCount() > 0)
{
foreach($results as $row)
{               ?>
  <tr>
           <th class="font-weight-bold">Homework Title</th>
                            <td><?php  echo htmlentities($row->homeworkTitle);?></td>
                          </tr>
                          <tr>
                             <th class="font-weight-bold">Class</th>
                            <td><?php  echo htmlentities($row->ClassName);?></td>
                          </tr>
                          <tr>
                             <th class="font-weight-bold">Section</th>
                            <td><?php  echo htmlentities($row->Section);?></td>
                          </tr>
                          <tr>
                            <th class="font-weight-bold">Last Submission Date</th>
                             <td><?php  echo htmlentities($lds=$row->lastDateofSubmission);?></td>
                           </tr>
                           <tr>
                              <th class="font-weight-bold">Posting Date</th>
                            <td><?php  echo htmlentities($row->postingDate);?></td>
                          </tr>
                          <tr>
                                    <th class="font-weight-bold">Homework Description</th>
                            <td><?php  echo htmlentities($row->homeworkDescription);?></td>
  </tr>


  <?php     


  $ret=$dbh->prepare("SELECT id,homeworkDescription,homeworkFile,postinDate,adminRemark,adminRemarkDate FROM tbluploadedhomeworks

   where homeworkId=:hwid and studentId=:stdid");
$ret-> bindParam(':hwid', $hwid, PDO::PARAM_STR);
$ret-> bindParam(':stdid', $stdid, PDO::PARAM_STR);
    $ret-> execute();
    $rows=$ret->fetchAll(PDO::FETCH_OBJ);
    if($ret->rowCount() == 0): 

      ?>


<tr>
  <th colspan="2" style="color:red">Homework not uploaded by the student</th>
</tr>

<?php  else: 
foreach($rows as $row){
  ?>

<tr>
  <th style="color:blue; font-size:16px;" colspan="2">Uploaded Homework</th>
</tr>

<tr>
  <th>Homework Description</th>
  <td><?php  echo htmlentities($row->homeworkDescription);?></td>
</tr>
<tr>
  <th>Homework File (doc or pdf only)</th>
  <td><a href="../user/uploadedhw/<?php  echo htmlentities($row->homeworkFile);?>" target="_blank"> Click here</a></td>
</tr>
  <?php } if($row->adminRemark=='') { ?>

<form method="post" enctype="multipart/form-data">


<tr>
  <th>Admin Remark </th>
  <td><textarea class="form-control" name="adminremark" required="true"></textarea></td>
</tr>

  <td colspan="2"><input type="submit" name="upload" class="btn btn-primary" value="Upload"></td>
</tr>
</form>


<?php } else { ?>
<tr>
  <th>Admin Remark </th>
  <td><?php  echo htmlentities($row->adminRemark);?></td>
</tr>

<tr>
  <th>Admin Remark</th>
  <td><?php  echo htmlentities($row->adminRemarkDate);?></td>
</tr>

<?php } endif;$cnt=$cnt+1;}} else { ?>
<tr>
  <th colspan="2" style="color:red;">No Notice Found</th>
</tr>
  <?php } ?>
</table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- content-wrapper ends -->
          <!-- partial:partials/_footer.html -->
         <?php include_once('includes/footer.php');?>
          <!-- partial -->
        </div>
        <!-- main-panel ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
    <!-- container-scroller -->
    <!-- plugins:js -->
    <script src="vendors/js/vendor.bundle.base.js"></script>
    <!-- endinject -->
    <!-- Plugin js for this page -->
    <script src="vendors/select2/select2.min.js"></script>
    <script src="vendors/typeahead.js/typeahead.bundle.min.js"></script>
    <!-- End plugin js for this page -->
    <!-- inject:js -->
    <script src="js/off-canvas.js"></script>
    <script src="js/misc.js"></script>
    <!-- endinject -->
    <!-- Custom js for this page -->
    <script src="js/typeahead.js"></script>
    <script src="js/select2.js"></script>
    <!-- End custom js for this page -->
  </body>
</html><?php }  ?>