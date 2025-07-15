<?php
include 'adminheader.php';

?>
<script>
function approve(str)
 {
//alert(str);
 var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function()
     {
      if (this.readyState == 4 && this.status == 200) 
      {
        //document.getElementById("").src = 
        //alert(this.responseText);
          location.reload();
    
      }
    };
    xmlhttp.open("GET","approveleave.php?q="+str,true);
    xmlhttp.send();
} 
function leave(str)
 {
//alert(str);
 var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function()
     {
      if (this.readyState == 4 && this.status == 200) 
      {
        //document.getElementById("").src = 
        //alert(this.responseText);
          location.reload();
    
      }
    };
    xmlhttp.open("GET","rejectleave.php?q="+str,true);
    xmlhttp.send();
} 

</script>


<div class="main-content">

  <!-- content -->
  <div class="container-fluid content-top-gap">

            <div class="tables">
            <div class="cards__heading">
                <h3> Employee Leave Status</h3>
            </div>

            <div class="table-responsive"> 
  <table class="table table-bordered"> 
                    <thead>
                        <tr>
                        <th>Sr. No.</th>
                            <th>Status</th>
                           
                            <th>Name</th>
                            <th>Applied On</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Reason</th>
                        </tr>
                    </thead>
                    <tbody id="result">
                        <?php
                       
                     
                        $sql = "select * from emp_leave order by Id desc ";
                        $result = $con->query($sql);
                        if (mysqli_num_rows($result) > 0) {
                            while ($row = mysqli_fetch_assoc($result)) {
                                $status= $row['Status'];
                                $Id = $row['Id'];
                                $empid= $row['EmployeeId'];
                                $sql2 = "select `Name` from `emp_reg` Where `EmployeeId`= '".$empid."'";

                                $result2 = $con->query($sql2);
                                $row2 = mysqli_fetch_assoc($result2);
                                $name = $row2['Name'];
                                $applied = $row['Applied_on'];
                                $from = $row['From'];
                                $to = $row['To'];
                                $reason = $row['Reason'];
                        ?>
                                <tr>
                                <td><?php echo $Id; ?> </td>
                                    <td>

            <a class="btn btn-primary" onclick="approve(<?php echo $Id; ?>)"><span>&#10004;</span></a>
            <a class="btn btn-danger" onclick="leave(<?php echo $Id; ?>)"><span>&#10008;</span></a>
                                        <?php echo $status?>
                                    </td>
                                   
                                    <td><?php echo $name; ?> </td>
                                    <td><?php echo $applied; ?> </td>
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
<?php
include 'footer.php'
?>
















































