<?php

include 'header.php';

?>

<div class="main-content">

  <!-- content -->
  <div class="container-fluid content-top-gap">

            <div class="tables">
            <div class="cards__heading">
                <h3>View Applied Leave</h3>
            </div>
<br>
<div class="table-responsive"> 
  <table class="table table-bordered"> 
                    <thead>
                        <tr>
                            <th>Status</th>
                         
                           
                            <th>From</th>
                            <th>To</th>
                            <th>Reason</th>
                        </tr>
                    </thead>
                    <tbody id="result">
                        <?php
                        include 'config.php';
                       
                        $sql = "select * from emp_leave Where EmployeeId= $EmployeeId order by Id Desc";
                        $result = $con->query($sql);
                        if (mysqli_num_rows($result) > 0) {
                            while ($row = mysqli_fetch_assoc($result)) {
                                $status = $row['Status'];
                             

                                $from = $row['From'];
                                $to = $row['To'];
                                $reason = $row['Reason'];
                        ?>
                                <tr>
                                    <td> <?php echo $status; ?>  </td>

                        
                                  
                                  <td><?php echo $from; ?> </td>
                                    <td><?php echo $to; ?> </td>
                                    <td><?php echo $reason; ?> </td>

                                </tr>
                    </tbody>
            <?php           }
                        }
            ?>

                </table>
            </div>
        </div>
    </div>
</div>
<br>
<br>
<?php include 'empfooter.php' 
?>