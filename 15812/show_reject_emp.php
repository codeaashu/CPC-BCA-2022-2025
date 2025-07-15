<?php

include 'adminheader.php';

?>

<div class="main-content">

  <!-- content -->
  <div class="container-fluid content-top-gap">

          
            <div class="cards__heading">
                <h3>Registration Status</h3>
            
                </div>
       
            <a style="float:right"; class="btn btn-primary" href="reg_status.php">Show Pending Employees</a>

<br>
<div class="table-responsive"> 
  <table class="table table-bordered"> 
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>EmployeeId</th>
                            <th>Name</th>
                            <th>EmailId</th>
                            <th>Mobile</th>
                        </tr>
                    </thead>
                    <tbody id="result">
                        <?php
                        include 'config.php';
                        $sql = "select * from emp_reg Where Status='Reject' order by EmployeeId ";
                        $result = $con->query($sql);
                        if (mysqli_num_rows($result) > 0) {
                            while ($row = mysqli_fetch_assoc($result)) {
                                $EmployeeId = $row['EmployeeId'];
                                $Name = $row['Name'];
                                $Email = $row['Email'];
                                $Mobile = $row['Mobile'];
                             ?>
                                <tr>
                                    <td>

                                      
                                       <a class="btn btn-primary" href="approveemp.php?EmployeeId=<?php echo $row['EmployeeId'];?>"><span>&#10004;</span></a>
                                       
                                  
                                    </td>

                                    <td><?php echo $EmployeeId; ?> </td>
                                    <td><?php echo $Name; ?> </td>

                                    <td><?php echo $Email; ?> </td>
                                    <td><?php echo $Mobile; ?> </td>

                                </tr>
                    </tbody>
            <?php           }
                        }
            ?>

                </table>
            </div>
        </div>
   
</div>
<br>
<?php
include 'footer.php'
?>