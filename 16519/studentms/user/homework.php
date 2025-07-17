<?php
session_start();
//error_reporting(0);
include('includes/dbconnection.php');
if (strlen($_SESSION['sturecmsstuid']==0)) {
  header('location:logout.php');
  } else{
   
  ?>
<!DOCTYPE html>
<html lang="en">
  <head>
   
    <title>Student  Management System|| Homework</title>
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
                       <tr>
                            <th class="font-weight-bold">S.No</th>
                            <th class="font-weight-bold">Homework Title</th>
                            <th class="font-weight-bold">Class</th>
                            <th class="font-weight-bold">Section</th>
                            <th class="font-weight-bold">Last Submission Date</th>
                            <th class="font-weight-bold">Posting Date</th>
                            <th class="font-weight-bold">Action</th>
                          </tr>
                      <?php
$stuclass=$_SESSION['stuclass'];
$sql="SELECT tblclass.ID,tblclass.ClassName,tblclass.Section,tblhomework.homeworkTitle,tblhomework.postingDate,tblhomework.lastDateofSubmission,tblhomework.id as hwid from tblhomework join tblclass on tblclass.ID=tblhomework.classId  where tblhomework.classId=:stuclass";
$query = $dbh -> prepare($sql);
$query->bindParam(':stuclass',$stuclass,PDO::PARAM_STR);
$query->execute();
$results=$query->fetchAll(PDO::FETCH_OBJ);
$cnt=1;
if($query->rowCount() > 0)
{
foreach($results as $row)
{               ?>
  <tr>
       <td><?php echo htmlentities($cnt);?></td>
                            <td><?php  echo htmlentities($row->homeworkTitle);?></td>
                            <td><?php  echo htmlentities($row->ClassName);?></td>
                            <td><?php  echo htmlentities($row->Section);?></td>
                             <td><?php  echo htmlentities($row->lastDateofSubmission);?></td>
                            <td><?php  echo htmlentities($row->postingDate);?></td>
                            <td><a href="view-homework.php?hwid=<?php echo htmlentities ($row->hwid);?>" class="btn btn-primary btn-xs"  target="blank">View</a></td>
  </tr>
  <?php $cnt=$cnt+1;}} else { ?>
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