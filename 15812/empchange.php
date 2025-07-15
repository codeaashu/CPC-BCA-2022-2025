<?php

include "header.php";

$sql = "select * from `emp_reg` where `EmployeeId`='".$EmployeeId."'";
$result = $con->query($sql);
if($row = $result->fetch_assoc()){
$Name= $row['Name'];


$Mobile = $row['Mobile'];

}
$query = "select * from `empdetail` where `EmployeeId`='".$EmployeeId."'";
$res = $con->query($query);
if($r = $res->fetch_assoc()){
$adhar= $r['Aadhar'];

$dept= $r['Department'];
$address= $r['Address'];
$bank= $r['Bank'];
$ifsc= $r['IFSC'];
$dob= $r['DOB'];
$pan= $r['Pan'];
$father=$r['Father'];
}
else{
    $adhar= "";

    $dept= "";
    $address= "";
    $bank= "";
    $ifsc= "";
    $dob= ""; 
}
?>
<div class="main-content">
    <div class="container-fluid content-top-gap">
        <div class="card card_border py-2 mb-4">
		
		
        <div class="cards__heading">
        <h3>Update Profile</h3>
    </div>
      

                <div class="card-body">
                    <form action="#" method="post">
                        <div class="form-row">
                            <div class="form-group col-md-6">
							<label  class="input__label">Name</label>
											
											<input type="text" class="form-control " id="Name" name="Name" value="<?php echo $Name?>"required>
                                 
                            </div>
                            <div class="form-group col-md-6">
							<label class="input__label">Mobile No.</label>
											
											<input type="text" class="form-control " id="Mobile" name="Mobile" value="<?php echo $Mobile?>" required>
                            </div>
                        </div>
                        <div class="form-group">
						<label class="input__label">Address</label>
											
											<input type="text" class="form-control " id="address" name="address" value="<?php echo $address?>"required>
                        </div>
                      
                        <div class="form-row">
                            <div class="form-group col-md-4">
							<label class="input__label">Aadhar No.</label>
											
											<input type="text" class="form-control " id="adhar" name="adhar" value="<?php echo $adhar?>"required>
                            </div>
                            <div class="form-group col-md-4">
                            <label class="input__label">Bank Account No.</label>
											
											<input type="text" class="form-control " id="bank" name="bank" value="<?php echo $bank?>"required>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="inputZip" class="input__label">IFSC</label>
                                <input type="text" class="form-control" id="ifsc" name="ifsc" value="<?php echo $ifsc?>"required>
                            </div>
                        </div>
                   <div class="form-row">
                        <div class="form-group col-md-6">
                            <label class="input__label">Pan No.</label>
											
											<input type="text" class="form-control " id="pan" name="pan" value="<?php echo $pan?>"required>
                            </div>
                           
                           
                            <div class="form-group col-md-6">
                                <label for="inputZip" class="input__label">Father's Name</label>
                                <input type="text" class="form-control" id="father" name="father" value="<?php echo $father?>"required>
                            </div>
                        </div>
                        <?php
                            $deptqry = "SELECT `dept_name` FROM `department`";
                            $deptqry1 = mysqli_query($con, $deptqry);
                            ?>
                        <div class="form-row">
                        <div class="form-group col-md-8">
                                <label for="inputState" class="input__label">Department</label>
                                <select class="form-control" id="dept" name="dept" required>
                                    <option><?php echo $dept?></option>
                                    <?php
                                    while ($row5 = mysqli_fetch_assoc($deptqry1)) : ?>
                                        <option> <?php echo $row5['dept_name']; ?></option>
                                    <?php endwhile; ?>
                                </select>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="inputZip" class="input__label">Date of Birth</label>
                                <input type="date" class="form-control" id="dob" name="dob"value="<?php echo $dob?>"required>
                            </div>
                        </div>
                     <center>   <input type="submit" value="submit" name="submit" class="btn btn-primary btn-style mt-4"></center>
                    </form>
                </div>
            </div>


<br>
					
			
				<?php

if(isset($_POST['submit']))
    {
        $Name=$_POST['Name'];
       
       $Mobile= $_POST['Mobile'];
       $adhar= $_POST['adhar'];
       $dept= $_POST['dept'];
       $address= $_POST['address'];
$bank= $_POST['bank'];
$ifsc=$_POST['ifsc'];
$dob=$_POST['dob'];
$pan= $_POST['pan'];
$father=$_POST['father'];     
 

$sql6="Update `emp_reg` Set `Name`= '".$Name."', `Mobile`='".$Mobile."' Where EmployeeId='".$EmployeeId."' ";
$result6= $con->query($sql6);

$sql3="Select * from `empdetail`  Where `EmployeeId`= '".$EmployeeId."'";
$result3= $con->query($sql3);
if ($row2 = $result3->fetch_assoc()) {
    $query="Update `empdetail` Set `Aadhar`= '".$adhar."', `Department`='".$dept."', `Address`='".$address."' , `Bank`='".$bank."', `IFSC`='".$ifsc."', `DOB`='".$dob."', `Pan`='".$pan."', `Father`='".$father."' Where EmployeeId='".$EmployeeId."' ";
    $resultqry= $con->query($query);
  

}else{
$sql4= "INSERT INTO `empdetail`(`EmployeeId`,`Aadhar`,`Department`,`Address`,`DOB`,`Bank`,`IFSC`,`Pan`,`Father`) 
VALUES  ('".$EmployeeId."','".$adhar."','".$dept."','".$address."','".$dob."','".$bank."','".$ifsc."','".$pan."','".$father."')";
$result4= $con->query($sql4);

}
echo "<script>alert('Record Inserted'); window.location='empchange.php'</script>";
       }
    
	
  ?>

<?php include 'empfooter.php' 
?>