<?php
//time zone
date_default_timezone_set('Asia/Kolkata');
//database connection
$con=mysqli_connect("localhost","root","","bbsdb","3307");
if(mysqli_connect_errno()){
echo "Connection Fail".mysqli_connect_error();
}

  ?>
