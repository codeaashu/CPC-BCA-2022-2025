<?php

include "adminheader.php";

?>
<style>
   
</style>
<div class="main-content">
    <div class="container-fluid content-top-gap">
        <div class="card card_border py-2 mb-4">
		
		
        <div class="cards__heading">
        <h3>Add Department</h3>
    </div>
        <div class="card-body">
									<form method= "post">
										

										<div class="form-group">
                                       
											<label  class="input__label">Department Name</label>
											
												<input type="text" class="form-control input__label" id="dept" name="dept" required>
											</div>
										

                                        
                                      
										</div>

                                        <center> <input type="submit" name="submit" class="btn btn-primary btn-style mt-4" value="Add"></center>
									</form>
								</div>
						</div>	
					</div>
				
			
				<?php

if(isset($_POST['submit']))
    {
        $dept=$_POST['dept'];
      

$sql="INSERT INTO `department`('dept_name') 
        VALUES  ('".$dept."')";

$result=$con->query($sql);
	if($result==true)
	{
	echo "<script>alert('Department Added.!!!');</script>";
	}
	else
	{
	echo "<script>alert('Failed To Add.!!!');</script>";
	}
	
	}
  ?>

				
		<br>
        <div class="main-content">
        <div class="container-fluid content-top-gap">
<!-- <div class="card card_border py-2 mb-4"> -->
<div class="cards__heading">
        <h3>View Department</h3>
    </div>


 
<?php
            $query = "SELECT * FROM `department` LIMIT 15";
            $result = mysqli_query($con, $query);
            ?>
    <table class="table table-hover">
        <thead>
            <tr>
                <th>Dept Id</th>
                
				<th>Department Name</th>
               
                
            </tr>
        </thead>
        <?php
                 
                 if (mysqli_num_rows($result) > 0) {

                   while ($data = mysqli_fetch_assoc($result)) {
                    
                   ?>
                       <tbody>
                       
                       <tr>
                         
                             <td><?php echo $data['dept_no']; ?> </td>
                             
                             <td><?php echo $data['dept_name']; ?> </td>
                           
							 
                        </tr>
                       
                 
                       </tbody>
                       <?php
           }
        }
        ?>
           
    </table>
		   </div>
		  </div>
		</div>
    </div>

<?php
  include "footer.php";
?>

