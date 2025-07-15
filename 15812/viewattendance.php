<?php

include "adminheader.php";

?>
<script>
 function myprofile(str)
 {

    if (str=="") {
    document.getElementById("profile").innerHTML="";
    return;
  }
  else{
   
 var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("profile").src = this.responseText;
        document.getElementById("profile").style = "width:100px;height:100px; margin-left:2px;";

      
        } 
      }
    };
    xmlhttp.open("GET","fetchimage.php?q="+str,true);
    xmlhttp.send();
  }

 

</script>

<div class="main-content">

  <!-- content -->
  <div class="container-fluid content-top-gap">

            <div class="tables">
            <div class="cards__heading">
                <h3> Employee's Attendance </h3>
            </div>
                        <form class="form-inline" method="Post">
                            <?php
                            $query = "SELECT EmployeeId,Name FROM `emp_reg` Where `Status`='Approve'";
                            $query1 = mysqli_query($con, $query);
                            ?>
                            <div class="form-group">
                                <div class="row">
                                      <div class="form-group col-12"> 
                                <label for="inputState" class="input__label" >Search Employee Name</label>
                                <div></div>
                                <select class="form-control"  onchange="myprofile(this.value)" style="margin:5px"; id="empname" name="id">
                                    <option value="">Select Name</option>
                                    <?php
                                    while ($row = mysqli_fetch_assoc($query1)) : ?>
                                        <option value='<?php echo $row['EmployeeId']; ?>'> <?php echo $row['Name']; ?></option>
                                    <?php endwhile; ?>
                                </select>
                                <?php
                            $query2 = "SELECT * FROM `monthinfo`";
                            $query3 = mysqli_query($con, $query2);
                            ?>
                                <label for="inputState" >Month</label>
                                <select class="form-control"  style="margin:5px"; id="month" name="month">
                                    <option value="">Select Month</option>
                                    <?php
                                    while ($row1 = mysqli_fetch_assoc($query3)) : ?>
                                        <option > <?php echo $row1['MonthandYear']; ?></option>
                                    <?php endwhile; ?>
                                </select>

                               
                                   
                               
                             <input type="submit" name="submit" class="btn btn-primary "  value="View ">
                             
                            
                            <img id="profile" src="" ></div>
                          
                            
                            <br>
                          <br>
                           


                        </form>
                    </div>
            </div>
    
              

            <div class="table-responsive"> 
  <table class="table table-bordered"> 
                        <thead>
                            <tr>
                                <th>Username</th>
                              
                                <th>Month</th>
                                <th>Total Working Days</th>
                                <th>Total Present</th>
                                <th>Total Absent</th>
                                

                            </tr>
                        </thead>
                        <?php
                        if (isset($_POST['submit'])) {

                           
                            $id = $_POST['id'];
                          
                            $m = $_POST['month'];
                       
                            
                            if ($m =="Select Month" || $id=="Select Name") {

                               ?>
                        <tbody><tr><center><h4 style="color:tomato";>Please Select Name and Month</h4></center></tr></tbody>
                           <?php }
                       
                            else{
                           
                            
                            $cquery = ("SELECT count(*) AS Total FROM attendance 
                    WHERE EmployeeId='".$id."'AND SUBSTRING(AttendanceDate,1,7) ='".$m."'");
                            $result = mysqli_query($con, $cquery);

                            ($result1 = mysqli_fetch_assoc($result));


                            $teach = ("SELECT EmployeeId,Username FROM `emp-login` WHERE EmployeeId='".$id."'");
                            $tquery = mysqli_query($con, $teach);
                            ($data = mysqli_fetch_assoc($tquery));

                            $days = ("SELECT NumberofWorkingDays FROM monthinfo WHERE MonthandYear= '".$m."'");

                            $dquery = mysqli_query($con, $days);
                            ($data1 = mysqli_fetch_assoc($dquery));
                            $t = ("SELECT `Name` FROM `emp_reg` WHERE EmployeeId='" . $id . "'");
                            $tqry = mysqli_query($con, $t);
                            ($data2 = mysqli_fetch_assoc($tqry));

                        ?>
                            <tbody>

                                <tr>

                                    <td><?php echo $data2['Name']; ?> </td>
                                   
                                     <td><?php echo $m;?> </td>
                                    <td><?php echo $data1['NumberofWorkingDays']; ?> </td>
                                    <td><?php echo $result1['Total']; ?> </td>
                                    <td><?php echo $absent = $data1['NumberofWorkingDays'] - $result1['Total']; ?> </td>

                                </tr>


                            </tbody>

                        <?php
                        }

                    }

                        ?>


                       
                        <?php
                                    
                                
                            
                        
                    

                        ?>

                    </table>


                </div>

            </div>
        </div>
    </div>

                </div>
                <br>
    <?php
    include "footer.php";
    ?>