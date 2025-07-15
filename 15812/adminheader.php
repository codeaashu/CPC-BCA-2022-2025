<?php
session_start();
include 'config.php';
$username = $_SESSION['username'];
$EmployeeId = $_SESSION['empid'];

if (isset($_SESSION['username']) && isset($_SESSION['empid']))
 {
 
} else {
  header('Location:index.php');
}
?>
<!doctype html>

<html lang="en">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <title>AMS</title>

  <!-- Template CSS -->
  <link rel="stylesheet" href="assets/css/style-starter.css">

  <!-- google fonts -->
  <link href="//fonts.googleapis.com/css?family=Nunito:300,400,600,700,800,900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>

<body class="sidebar-menu-collapsed">
  <div class="se-pre-con"></div>
  <section>
    <!-- sidebar menu start -->
    <div class="sidebar-menu sticky-sidebar-menu">

      <!-- logo start -->
      <div class="logo">
        <h1></h1>
      </div>

      <!-- if logo is image enable this -->
      <!-- image logo --
    <div class="logo">
      <a href="index.html">
        <img src="image-path" alt="Your logo" title="Your logo" class="img-fluid" style="height:35px;" />
      </a>
    </div>
    <!-- //image logo -->

      <div class="logo-icon text-center">
        <a title="logo"><img src="assets/images/logo.png" alt="logo-icon"> </a>
       
      </div>
      <!-- //logo end -->

      <div class="sidebar-menu-inner">

        <!-- sidebar nav start -->
        <ul class="nav nav-pills nav-stacked custom-nav">
          <li class="active"><a href="admin_page.php"><i class="fa fa-tachometer"></i><span>Dashboard</span></a>
          </li>
          <!-- <li class="menu-list">
            <a href="#"><i class="fa fa-cogs"></i>
              <span>Admin<i class="lnr lnr-chevron-right"></i></span></a>
            <ul class="sub-menu-list">
              <li><a href="reg_status.php">Registration Status</a> </li>
              <li><a href="leave_status.php">Leave Status</a> </li>
              <li><a href="viewattendance.php">View Attendance</a> </li>
              <li><a href="attreport.php">Attendance Report</a> </li>
              <li><a href="emplist.php">Employee List</a> </li>
              <li><a href="dept.php">Add Department</a> </li>
              <li><a href="workingdays.php">Add Working Days</a> </li>
              <li><a href="holiday.php">Add Holiday Details</a> </li>
              <li><a href="adminchangepw.php">Change Password</a> </li>



            </ul>
          </li> -->
          <li><a href="reg_status.php"> <i class="fa fa-group"></i><span>Registration Status</span></a></li>
          <li><a href="leave_status.php"><i class="fa fa-envelope"></i><span>Leave Status</span></a> </li>
            <li><a href="viewattendance.php"><i class="fa fa-eye"></i><span>View Attendance</span></a> </li>
            <li><a href="attreport.php"><i class="fa fa-table"></i> <span>Attendance Report</span></a> </li>
            <li><a href="emplist.php"><i class="fa fa-list-ul"></i> <span>Employee List</span></a> </li>
            <li><a href="dept.php"><i class="fa fa-plus-square-o"></i> <span>Add Department</span></a> </li>
              <li><a href="workingdays.php"><i class="fa fa-calendar-check-o"></i> <span>Add Working Days</span></a> </li>
              <li><a href="holiday.php"><i class="fa fa-calendar-minus-o"></i> <span>Add Holiday Details</span></a> </li>
              <li><a href="adminchangepw.php"><i class="fa fa-edit"></i> <span>Change Password</span></a> </li>

          <!-- <li><a href="pricing.html"><i class="fa fa-table"></i> <span>Pricing tables</span></a></li>
        <li><a href="blocks.html"><i class="fa fa-th"></i> <span>Content blocks</span></a></li> -->
          <li><a href="logout.php"><i class="fa fa-power-off"></i> <span>Logout</span></a></li>
        </ul>
        <!-- //sidebar nav end -->
        <!-- toggle button start -->
        <a class="toggle-btn">
          <i class="fa fa-angle-double-left menu-collapsed__left"><span></span></i>
          <i class="fa fa-angle-double-right menu-collapsed__right"></i>
        </a>
        <!-- //toggle button end -->
      </div>
    </div>
    <!-- //sidebar menu end -->
    <!-- header-starts -->
  
    <div class="header sticky-header">
      <!--notification menu end -->
      <div class="menu-right">
  
      <div class="navbar user-panel-top">
    <!-- <p  id="p1" <i class="fa fa-clock-o" style="font-size:15px" >></i></p><br> -->
      
        <div class="user-dropdown-details d-flex">
     
         
        
        <div class="profile_details_left">
        <p  id="p1" <i class="fa fa-calendar" style="font-size:15px; margin-top:20px;" >></i></p>
           
          </div>
          <div class="profile_details">
            <ul>
              <li class="dropdown profile_details_drop">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" id="dropdownMenu3" aria-haspopup="true"
                  aria-expanded="false">
                  <div class="profile_img">
                    <img src="assets/images/admin.png" class="rounded-circle" alt="" />
                    <div class="user-active">
                      <span></span>
                    </div>
                  </div>
                </a>
                <ul class="dropdown-menu drp-mnu" aria-labelledby="dropdownMenu3">
                  <li class="user-info">
                    <h5 class="user-name">Admin</h5>
                    <span class="status ml-2">Available</span>
                  </li>
                  <li class="logout"> <a href="adminchangepw.php"><i class="fa fa-edit"></i>Change Password</a> </li>
                  <li class="logout"> <a href="logout.php"><i class="fa fa-power-off"></i> Logout</a> </li>
                </ul>
              </li>
            </ul>
          </div>
            
           
          </div>
        
        </div>
      <!-- </div>
    </div>
    </div> -->
    
    </div>
  </section>
  <button onclick="topFunction()" id="movetop" class="bg-primary" title="Go to top">
    <span class="fa fa-angle-up"></span>
  </button>
  <script>
    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {
      scrollFunction()
    };

    function scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("movetop").style.display = "block";
      } else {
        document.getElementById("movetop").style.display = "none";
      }
    }

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  </script>
  <!-- /move top -->


  <script src="assets/js/jquery-3.3.1.min.js"></script>
  <script src="assets/js/jquery-1.10.2.min.js"></script>

  <!-- chart js -->
  <script src="assets/js/Chart.min.js"></script>
  <script src="assets/js/utils.js"></script>
  <!-- //chart js -->

  <!-- Different scripts of charts.  Ex.Barchart, Linechart -->
  <script src="assets/js/bar.js"></script>
  <script src="assets/js/linechart.js"></script>
  <!-- //Different scripts of charts.  Ex.Barchart, Linechart -->


  <script src="assets/js/jquery.nicescroll.js"></script>
  <script src="assets/js/scripts.js"></script>

  <!-- close script -->
  <script>
    var closebtns = document.getElementsByClassName("close-grid");
    var i;

    for (i = 0; i < closebtns.length; i++) {
      closebtns[i].addEventListener("click", function() {
        this.parentElement.style.display = 'none';
      });
    }
  </script>
  <!-- //close script -->

  <!-- disable body scroll when navbar is in active -->
  <script>
    $(function() {
      $('.sidebar-menu-collapsed').click(function() {
        $('body').toggleClass('noscroll');
      })
    });
  </script>
  <!-- disable body scroll when navbar is in active -->

  <!-- loading-gif Js -->
  <script src="assets/js/modernizr.js"></script>
  <script>
    $(window).load(function() {
      // Animate loader off screen
      $(".se-pre-con").fadeOut("slow");;
    });
  </script>
  <!--// loading-gif Js -->

  <!-- Bootstrap Core JavaScript -->
  <script src="assets/js/bootstrap.min.js"></script>
  <!-- //header-ends -->

<script>
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var d = new Date();
var day = days[d.getDay()];
// var hr = d.getHours();
// var min = d.getMinutes();
// if (min < 10) {
//     min = "0" + min;
// } var ampm = hr >= 12 ? 'pm' : 'am';

var date = d.getDate();
var month = months[d.getMonth()];
var year = d.getFullYear();
var x = document.getElementById("p1");
// x.innerHTML = day + " " + hr + ":" + min + ampm + " " + date + " " + month + " " + year;
x.innerHTML = day + " " +date + " " + month + " " + year ;


</script>



  <script src="js/jquery.nicescroll.js"></script>
  <script src="js/scripts.js"></script>
  <script src="js/bootstrap.js"> </script>
</body>

</html>