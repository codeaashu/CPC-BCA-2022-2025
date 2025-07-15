<?php

include "adminheader.php";

?>

<div class="main-content">
    <div class="container-fluid content-top-gap">
        <div class="card card_border py-2 mb-4">
		
		
        <div class="cards__heading">
        <h3>Add Working Days</h3>
    </div>
        <div class="card-body">
									<form method= "post">
										

										<div class="form-group">
                                       
											<label  class="input__label">Month and Year</label>
											
												<input type="month" class="form-control input__label" id="month" name="month" required>
											</div>
										

                                        
                                        <div class="form-group">
										
                                            <label  class="input__label">Add Working Days</label>
												<input type="text" class="form-control input__label" id="days" name="days" required>
											
										</div>
                                        <div class="form-group">
											<label class="input__label">Add No. of Sundays</label>
											
												<input type="text" class="form-control input__label" id="sunday" name="sunday" required>
											
										</div>

                                        <div class="form-group">
											<label class="input__label">Add No. of Holidays</label>
											
												<input type="text" class="form-control input__label" id="holiday" name="holiday" required>
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
        // $year=$_POST['year'];
        $days=$_POST['days'];
       $sunday= $_POST['sunday'];
       $holiday= $_POST['holiday'];

$sql="INSERT INTO monthinfo(MonthandYear,NumberofWorkingDays,NumberofSundays,NumberofHolidays) 
        VALUES  ('".$month."','".$days."','".$sunday."','".$holiday."')";

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

				
		<br>
        <div class="main-content">
        <div class="container-fluid content-top-gap">
<div class="card card_border py-2 mb-4">
<div class="cards__heading">
        <h3>View Working Days</h3>
    </div>


 
<?php
            $query = "SELECT * FROM monthinfo LIMIT 12";
            $result = mysqli_query($con, $query);
            ?>
    <table class="table table-hover">
        <thead>
            <tr>
                <th>Year-Month</th>
                
				<th>Total Working Days</th>
                <th>Total Sundays</th>
                <th>Total Holidays</th>
                
            </tr>
        </thead>
        <?php
                 
                 if (mysqli_num_rows($result) > 0) {

                   while ($data = mysqli_fetch_assoc($result)) {
                    
                   ?>
                       <tbody>
                       
                       <tr>
                         
                             <td><?php echo $data['MonthandYear']; ?> </td>
                             
                             <td><?php echo $data['NumberofWorkingDays']; ?> </td>
                             <td><?php echo $data['NumberofSundays']; ?> </td>
                             <td><?php echo $data['NumberofHolidays']; ?> </td>
							 
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

