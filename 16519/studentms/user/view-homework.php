<?php session_start();
error_reporting(0);
include('includes/dbconnection.php');
if (strlen($_SESSION['sturecmsstuid']==0)) {
  header('location:logout.php');
  } else{
if(isset($_POST['upload']))
{
// Posted Values
$hwdescription=$_POST['hwdescription'];
$hwfile=$_FILES["hwfile"]["name"];
$stdid=$_SESSION['sturecmsuid'];
$hwid=intval($_GET['hwid']);
// get the image extension
$extension = substr($hwfile,strlen($hwfile)-4,strlen($hwfile));
// allowed extensions
$allowed_extensions = array(".pdf","docx",".doc",".PDF");
// Validation for allowed extensions .in_array() function searches an array for a specific value.
if(!in_array($extension,$allowed_extensions))
{
echo "<script>alert('Invalid format. Only pdf / doc format allowed');</script>";
}
else
{
//rename the image file
$newhwfile=md5($hwfile).$extension;
// Code for move image into directory
move_uploaded_file($_FILES["hwfile"]["tmp_name"],"uploadedhw/".$newhwfile);
// Query for insertion data into database
$sql="insert into tbluploadedhomeworks(homeworkId,studentId,homeworkDescription,homeworkFile)values(:hwid,:stdid,:hwdescription,:newhwfile)";
$query=$dbh->prepare($sql);
$query->bindParam(':hwdescription',$hwdescription,PDO::PARAM_STR);
$query->bindParam(':newhwfile',$newhwfile,PDO::PARAM_STR);
$query->bindParam(':stdid',$stdid,PDO::PARAM_STR);
$query->bindParam(':hwid',$hwid,PDO::PARAM_STR);
 $query->execute();
   $LastInsertId=$dbh->lastInsertId();
   if ($LastInsertId>0) {
echo "<script>alert('Data inserted successfully');</script>";
echo "<script>window.location.href ='homework.php'</script>";
}
else
{
echo "<script>alert('Data not inserted');</script>";
}}
}
 ?>

<!DOCTYPE html>
<html lang="en">
  <head>
   
    <title>Student  Management System|| View Homework Details</title>
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
                    
                      <?php
$stuclass=$_SESSION['stuclass'];
$hwid=intval($_GET['hwid']);
$stdid=$_SESSION['sturecmsuid'];
$sql="SELECT tblclass.ID,tblclass.ClassName,tblclass.Section,tblhomework.homeworkTitle,tblhomework.postingDate,tblhomework.lastDateofSubmission,tblhomework.id as hwid,homeworkDescription from tblhomework join tblclass on tblclass.ID=tblhomework.classId  where tblhomework.classId=:stuclass and tblhomework.id=:hwid";
$query = $dbh -> prepare($sql);
$query->bindParam(':stuclass',$stuclass,PDO::PARAM_STR);
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


  <?php     $ret=$dbh->prepare("SELECT id,homeworkDescription,homeworkFile,postinDate,adminRemark,adminRemarkDate FROM tbluploadedhomeworks where homeworkId=:hwid and studentId=:stdid");
$ret-> bindParam(':hwid', $hwid, PDO::PARAM_STR);
$ret-> bindParam(':stdid', $stdid, PDO::PARAM_STR);
    $ret-> execute();
    $rows=$ret->fetchAll(PDO::FETCH_OBJ);
    if($ret->rowCount() == 0): 
  $cdate=date('Y-m-d');

if($cdate<=$lds):
      ?>
<form method="post" enctype="multipart/form-data">
<tr>
  <th style="color:blue; font-size:16px;" colspan="2">Upload Homework</th>
</tr>

<tr>
  <th>Homework Description</th>
  <td><textarea class="form-control" name="hwdescription" required="true"></textarea></td>
</tr>
<tr>
  <th>Homework File (doc or pdf only)</th>
  <td><input class="form-control" type="file" name="hwfile" accept=".doc, .docx, .pdf" required="true"></td>
</tr>
<tr>
  <td colspan="2"><input type="submit" name="upload" class="btn btn-primary" value="Upload"></td>
</tr>
</form>
<?php  else: ?>
<tr>
  <th colspan="2" style="color:red">Last Submission Date is over. You cannot upload homework after the last date of Submission</th>
</tr>

<?php endif; else: 
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
  <td><a href="uploadedhw/<?php  echo htmlentities($row->homeworkFile);?>" target="_blank"> Click here</a></td>
</tr>
<?php if($row->adminRemark!=''){?>
<tr>
  <th>Admin Remark </th>
  <td><?php  echo htmlentities($row->adminRemark);?></td>
</tr>

<tr>
  <th>Admin Remark</th>
  <td><?php  echo htmlentities($row->adminRemarkDate);?></td>
</tr>
  <?php } }
endif;$cnt=$cnt+1;}} else { ?>
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