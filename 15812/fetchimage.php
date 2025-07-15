<?php include 'config.php' ;
$q = intval($_GET['q']);
$sql="SELECT `Photo` FROM emp_reg WHERE EmployeeId = '".$q."'";
$result = mysqli_query($con,$sql);
$data = mysqli_fetch_assoc($result);
echo $data['Photo'];
?>