<?php 
session_start();
// Database Connection
include('includes/config.php');

// Validating Session
if(strlen($_SESSION['aid']) == 0) { 
    header('location:index.php');
} else {
    if(isset($_POST['submit'])) {
        // Getting Post Values  
        $eid = intval($_GET['id']);
        $addedby = $_SESSION['aid'];

        // Get the uploaded image
        $image = $_FILES['image']['name'];
        $extension = substr($image, strlen($image) - 4, strlen($image));

        // Rename image
        $boatimage = md5($image).time().$extension;

        // Move uploaded file to the 'images' directory
        move_uploaded_file($_FILES["image"]["tmp_name"], "images/" . $boatimage);

        // Update query (fixing the wrong variable reference)
        $query = "UPDATE tblboat SET Image='$boatimage' WHERE ID = $eid";

        // Execute the query
        $result = mysqli_query($con, $query);

        // Check if the query was successful
        if($result) {
            echo "<script>alert('Boat image updated successfully.');</script>";
            echo "<script type='text/javascript'> document.location = 'manage-boat.php'; </script>";
        } else {
            echo "<script>alert('Something went wrong. Please try again.');</script>";
        }
    }

?>


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Boat Booking System  | Update Boat</title>

  <link rel="stylesheet" href="plugins/fontawesome-free/css/all.min.css">

  <link rel="stylesheet" href="plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css">
  <!-- Select2 -->
  <link rel="stylesheet" href="plugins/select2/css/select2.min.css">
  <link rel="stylesheet" href="plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css">
  <!-- Bootstrap4 Duallistbox -->
  <link rel="stylesheet" href="plugins/bootstrap4-duallistbox/bootstrap-duallistbox.min.css">
  <!-- BS Stepper -->
  <link rel="stylesheet" href="plugins/bs-stepper/css/bs-stepper.min.css">
  <!-- dropzonejs -->
  <link rel="stylesheet" href="plugins/dropzone/min/dropzone.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="dist/css/adminlte.min.css">
</head>
<body class="hold-transition sidebar-mini">
<div class="wrapper">
  <!-- Navbar -->
<?php include_once("includes/navbar.php");?>
  <!-- /.navbar -->

  <!-- Main Sidebar Container -->
 <?php include_once("includes/sidebar.php");?>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Update Boat Image</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="dashboard.php">Dashboard</a></li>
              <li class="breadcrumb-item active">Update Boat</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <!-- left column -->
          <div class="col-md-8">
            <!-- general form elements -->
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">Update Boat Image</h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form method="post" enctype="multipart/form-data">
                <?php 
$bid=$_GET['id'];
$query = mysqli_query($con, "SELECT * FROM tblboat WHERE ID='$bid'");
$cnt=1;
while($result=mysqli_fetch_array($query)){
?>
                <div class="card-body">


   <div class="form-group">
                    <label for="exampleInputFullname">Name of Boat</label>
                    <input type="text" class="form-control" id="boatname" name="boatname" value="<?php echo $result['BoatName'];?>" readonly>
                  </div>

<div class="form-group">
    <label for="exampleInputFullname">Old Image</label>
    <img src="images/<?php echo $result['Image'];?>" width="200" height="200">
</div>
             

<div class="form-group">
                    <label for="exampleInputFullname">New Image</label>
                    <input type="file" class="form-control" id="image" name="image" required>
                  </div>

              
<?php } ?>

  <div class="card-footer">
                  <button type="submit" class="btn btn-primary" name="submit" id="submit">Update</button>
                </div>
      
                </div>
                <!-- /.card-body -->
          
            </div>
            <!-- /.card -->
          </div>
          <!--/.col (left) -->








    
              </form>
       
  
        </div>
        <!-- /.row -->
      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
<?php include_once('includes/footer.php');?>

</div>
<!-- ./wrapper -->

<!-- jQuery -->
<script src="plugins/jquery/jquery.min.js"></script>
<!-- Bootstrap 4 -->
<script src="plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- bs-custom-file-input -->
<script src="plugins/bs-custom-file-input/bs-custom-file-input.min.js"></script>
<!-- AdminLTE App -->
<script src="dist/js/adminlte.min.js"></script>
<!-- AdminLTE for demo purposes -->
<script src="dist/js/demo.js"></script>
<!-- Page specific script -->
<script src="plugins/select2/js/select2.full.min.js"></script>
<script>
$(function () {
  bsCustomFileInput.init();
});
  $(function () {
    //Initialize Select2 Elements
    $('.select2').select2()

    //Initialize Select2 Elements
    $('.select2bs4').select2({
      theme: 'bootstrap4'
    })
});
</script>
</body>
</html>
<?php } ?>
