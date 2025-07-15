
<?php

include 'header.php';

?>

<div class="main-content">
    <div class="container-fluid content-top-gap">
        <div class="card card_border py-2 mb-4">
		
		
        <div class="cards__heading">
        <h3>Employee Leave Application</h3>
    </div>

                <div class="card-body">
                    <form  method="Post">
                  
                        
                            <div class="form-group">
                                <label  class="input__label">From*</label>
                                <input type="date" class="form-control input-style" id="from" name="from"
                                     required>
                            </div>
                          
                        
                        <div class="form-group">
                                <label  class="input__label">To*</label>
                                <input type="date" class="form-control input-style" id="to" name="to"
                                    required>
                            </div>
                        <div class="form-group">
                            <label  class="input__label">Reason*</label>
                            <input type="text" class="form-control input-style" id="reason" name="reason"
                                placeholder="Reason for taking leave" required>
                        </div>
                       
                       
                       <center> <input type="submit" name="submit" class="btn btn-primary btn-style mt-4" value="Submit"></center>
                    </form>
                </div>
            </div>
    </div>
</div>
<br>
<?php
	  include 'config.php';
      if(isset($_POST['submit']))
        {
           
            // $name= $_POST['name'];
            $from= $_POST['from'];
            $to= $_POST['to'];
            $reason= $_POST['reason'];
            $status= 'Pending';
            
            $sql="insert into emp_leave(`EmployeeId`,`Applied_on`,`From`,`To`,`Reason`,`Status`)
             values ('".$EmployeeId."',now(),'".$from."','".$to."','".$reason."','".$status."')";
				
            if($con->query($sql))
            {	
                
            echo "<script>alert('Details inserted successfully');</script>";
            }
            else
{
 echo"<script>alert('Failed to insert details'); </script>";
}


}



?>

            <?php
            include 'empfooter.php'
            ?>