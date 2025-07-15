<?php session_start();
// Database Connection
include('includes/config.php');

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <title>Boat Booking System || Booking Status</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <link href="https://fonts.googleapis.com/css?family=Oswald:400,700|Dancing+Script:400,700|Muli:300,400" rel="stylesheet">
  <link rel="stylesheet" href="fonts/icomoon/style.css">

  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="css/jquery-ui.css">
  <link rel="stylesheet" href="css/owl.carousel.min.css">
  <link rel="stylesheet" href="css/owl.theme.default.min.css">
  <link rel="stylesheet" href="css/owl.theme.default.min.css">

  <link rel="stylesheet" href="css/jquery.fancybox.min.css">

  <link rel="stylesheet" href="css/bootstrap-datepicker.css">

  <link rel="stylesheet" href="fonts/flaticon/font/flaticon.css">

  <link rel="stylesheet" href="css/aos.css">
  <link href="css/jquery.mb.YTPlayer.min.css" media="all" rel="stylesheet" type="text/css">

  <link rel="stylesheet" href="css/style.css">



</head>

<body data-spy="scroll" data-target=".site-navbar-target" data-offset="300">

  <div class="site-wrap">

  


    
    <?php include_once("includes/navbar.php");?>
    
    <div class="intro-section" style="background-image: url('images/hero_2.jpg');">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-7 mx-auto text-center" data-aos="fade-up">
              <h1>Booking Status</h1>
              <p><a href="contact.php" class="btn btn-primary py-3 px-5">Contact</a></p>
            </div>
          </div>
        </div>
      </div>
    
    <div class="site-section">
      <div class="container">
        <div class="row">

          <div class="col-md-6">
            <h3 class="heading-92913 text-black">Check Booking Status</h3>
            <form action="#" class="row" method="post">


       

            
              <div class="form-group col-md-6">
                <label for="input-6">Email Address</label>
                <input type="text" class="form-control" name="emailid" required="true">
              </div>

              <div class="form-group col-md-6">
                <label for="input-7">Phone Number</label>
                <input type="text" class="form-control" name="phonenumber" maxlength="10" pattern="[0-9]+" required="true"> 
              </div>


              <div class="form-group col-md-12">
                <input type="submit" name="submit" class="btn btn-primary py-3 px-5" value="Check Now">
              </div>

            </form>
          </div>


<?php if(isset($_POST['submit'])){

$emailid=$_POST['emailid'];
$phonenumber=$_POST['phonenumber'];
  ?>
<div class="col-md-12">
         <table id="example1" class="table table-bordered table-striped">
                  <thead>
                 <tr>
                    <th>#</th>
                    <th>Bookings No</th>
                    <th>Name</th>
                    <th>Email Id</th>
                    <th>Mobile No</th>
                    <th>No. People</th>
                    <th>Boking Date/Time</th>
                     <th>Posting Date</th>
                     <th>Status</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
<?php $query=mysqli_query($con,"select * from tblbookings where PhoneNumber='$phonenumber' and EmailId='$emailid'");
$cnt=1;
while($result=mysqli_fetch_array($query)){
?>

                  <tr>
                    <td><?php echo $cnt;?></td>
                    <td><?php echo $result['BookingNumber']?></td>
                    <td><?php echo $result['FullName']?></td>
                    <td><?php echo $result['EmailId']?></td>
                   <td><?php echo $result['PhoneNumber']?></td>
                   <td><?php echo $result['NumnerofPeople']?></td>
                  
                    <td><?php echo $result['BookingDateFrom']?>/<?php echo $result['BookingTime']?></td>
                    <td><?php echo $result['postingDate']?></td>
                    <td><?php if($result['BookingStatus']==''): ?>
                    <span class="badge bg-warning text-dark">Not Processed Yet</span>
                  <?php elseif($result['BookingStatus']=='Accepted'): ?>
                    <span class="badge bg-success">Accepted</span>
                    <?php elseif($result['Rejected']=='Rejected'): ?>
                      <span class="badge bg-danger">Rejected</span>
                    <?php endif;?></td>
                    <th>
     <a href="booking-details.php?bid=<?php echo base64_encode($result['ID']);?>&&eml=<?php echo base64_encode($result['EmailId']);?>&&pno=<?php echo base64_encode($result['PhoneNumber']);?>" title="View Details" class="btn btn-primary btn-sm"> View Details</a> 
 </th>
                  </tr>
         <?php $cnt++;} ?>
             
                  </tbody>
                </table>

              </div>

<?php } ?>

        </div>
      </div>
    </div>
    

    <div class="site-section bg-image overlay" style="background-image: url('images/hero_2.jpg');">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-7 text-center">
            <h2 class="text-white">Get In Touch With Us</h2>
            <p class="mb-0"><a href="contact.php" class="btn btn-warning py-3 px-5 text-white">Contact Us</a></p>
          </div>
        </div>
      </div>
    </div>

    <?php include_once("includes/footer.php");?>
    

  </div>
  <!-- .site-wrap -->


  <!-- loader -->
  <div id="loader" class="show fullscreen"><svg class="circular" width="48px" height="48px"><circle class="path-bg" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke="#eeeeee"/><circle class="path" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke-miterlimit="10" stroke="#ff5e15"/></svg></div>

  <script src="js/jquery-3.3.1.min.js"></script>
  <script src="js/jquery-migrate-3.0.1.min.js"></script>
  <script src="js/jquery-ui.js"></script>
  <script src="js/popper.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <script src="js/owl.carousel.min.js"></script>
  <script src="js/jquery.stellar.min.js"></script>
  <script src="js/jquery.countdown.min.js"></script>
  <script src="js/bootstrap-datepicker.min.js"></script>
  <script src="js/jquery.easing.1.3.js"></script>
  <script src="js/aos.js"></script>
  <script src="js/jquery.fancybox.min.js"></script>
  <script src="js/jquery.sticky.js"></script>
  <script src="js/jquery.mb.YTPlayer.min.js"></script>




  <script src="js/main.js"></script>

</body>
  <script type="text/javascript">
        $(".datepicker").datepicker({
            format: "yyyy-mm-dd",
        });
    </script>

</html>