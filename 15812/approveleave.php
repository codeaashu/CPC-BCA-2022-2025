<?php
include 'config.php';

 $Id= $_GET['q'];
 $query = "Update `emp_leave` set Status='Approved' Where Id= '".$Id."'";
 if($con->query($query))
 {
  echo "Approved";
 }
 
?>