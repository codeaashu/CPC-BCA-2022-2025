<?php

include 'config.php';

$EmployeeId = $_GET['q'];
 $query = "Update emp_reg set Status='Reject' Where EmployeeId= '".$EmployeeId."'";
  if($con->query($query))
 {
  echo "Rejected";
 }
 
?>