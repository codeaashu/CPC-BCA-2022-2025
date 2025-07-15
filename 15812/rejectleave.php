<?php

include 'config.php';

$Id = $_GET['q'];
 $query = "Update emp_leave set Status='Rejected' Where Id='".$Id."'";
 if($con->query($query))
 {
  echo "Rejected";
 }
?>