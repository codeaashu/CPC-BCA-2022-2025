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
      
          location.reload();
    
      }
    };
    xmlhttp.open("GET","approveemp.php?q="+str,true);
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
    xmlhttp.open("GET","rejectemp.php?q="+str,true);
    xmlhttp.send();
} 

</script>
<div class="main-content">

  <!-- content -->
  <div class="container-fluid content-top-gap">

      
            <div class="cards__heading">
                <h3>Registration Status</h3>
            
                </div>
            <a style="float:right"; class="btn btn-primary" href="show_reject_emp.php">Show Rejected Employees</a>

<br>
<div class="table-responsive"> 
  <table class="table table-bordered"> 
                    <thead>
                        <tr>
                            <th>Status</th>
                          
                            <th>Name</th>
                            <th>EmailId</th>
                            <th>Mobile</th>
                        </tr>
                    </thead>
                    <tbody id="result">
                        <?php
                        include 'config.php';
                        $sql = "select * from `emp_reg` Where Status='Pending' order by EmployeeId ";
                        $result = $con->query($sql);
                        if (mysqli_num_rows($result) > 0) {
                            while ($row = mysqli_fetch_assoc($result)) {
                              $EmployeeId= $row['EmployeeId'];
                                $Name = $row['Name'];
                                $Email = $row['Email'];
                                $Mobile = $row['Mobile'];
                             ?>
                                <tr>
                                    <td>

                                      
            <a class="btn btn-primary" onclick="approve(<?php echo $EmployeeId; ?>)"><span>&#10004;</span></a>
            <a class="btn btn-danger" onclick="leave(<?php echo $EmployeeId; ?>)"><span>&#10008;</span></a>
                                    </td>

                                   
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
</div>
<br>
<?php
include 'footer.php'
?>