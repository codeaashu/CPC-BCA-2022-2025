<?php

include 'config.php';


$id = $_GET['q'];

$sql="Select * from `emp_reg` Where `EmployeeId`='".$id."'";
$result=$con->query($sql);
$row = mysqli_fetch_assoc($result);
$EmployeeId = $row['EmployeeId'];
$username = $row['Email'];

$password = $row['Password'];
$usertype= "Employee";

$sql1 = "Insert Into `emp-login`(`EmployeeId`,`Username`,`Password`,`Usertype`,`Date`) Values('".$EmployeeId."','".$username."','".$password."','".$usertype."',now())";
$con->query($sql1);
 $query = "Update `emp_reg` set Status='Approve' Where EmployeeId='".$id."'";
 if($con->query($query))
 {
    echo "Approved";
   }
?>