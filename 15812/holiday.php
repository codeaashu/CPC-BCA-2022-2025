<?php

include "adminheader.php";

?>

<div class="main-content">
    <div class="container-fluid content-top-gap">
        <div class="card card_border py-2 mb-4">
		
		
        <div class="cards__heading">
        <h3>Add Holiday Details</h3>
    </div>
        <div class="card-body">
									<form method= "post">
										

										<div class="form-group">
                                       
											<label  class="input__label">Date of Holiday</label>
											
												<input type="date" class="form-control input__label" id="month" name="month" required>
											</div>
										

                                        
                                        <div class="form-group">
										
                                            <label  class="input__label">Holiday For</label>
												<input type="text" class="form-control input__label" id="for" name="for" required>
											
										</div>
                                        <div class="form-group">
											<label class="input__label">No. of Days</label>
											
												<input type="text" class="form-control input__label" id="days" name="days" required>
											
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
        $month=$_POST['month'];
        $for= $_POST['for'];
        $days=$_POST['days'];
      
      

$sql="INSERT INTO holidayinfo(MonthandYear,HolidayFor,NumberofDays) 
        VALUES  ('".$month."','".$for."','".$days."')";

$result=$con->query($sql);
	if($result==true)
	{
	echo "<script>alert('Details Inserted..!!!');</script>";
	}
	else
	{
	echo "<script>alert('Failed to insert details.!!!');</script>";
	}
	
	}
  ?>

				
		
        <div class="main-content">
        <div class="container-fluid content-top-gap">
<div class="card card_border py-2 mb-4">
<div class="cards__heading">
        <h3>View Holidays</h3>
    </div>


 
<?php
            $query = "SELECT * FROM holidayinfo LIMIT 12";
            $result = mysqli_query($con, $query);
            ?>
    <table class="table table-hover">
        <thead>
            <tr>
                <th>Year-Month</th>
                
				<th>Holiday For</th>
                <th>No. of days</th>
               
                
            </tr>
        </thead>
        <?php
                 
                 if (mysqli_num_rows($result) > 0) {

                   while ($data = mysqli_fetch_assoc($result)) {
                    
                   ?>
                       <tbody>
                       
                       <tr>
                         
                             <td><?php echo $data['MonthandYear']; ?> </td>
                             
                             <td><?php echo $data['HolidayFor']; ?> </td>
                             <td><?php echo $data['NumberofDays']; ?> </td>
                             
							 
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
<BR>
<?php
  include "footer.php";
?>

