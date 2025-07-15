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
                <h3> Employee List</h3>
            </div>

            <div class="table-responsive"> 
  <table class="table table-bordered"> 
                    <thead>
                        <tr>
                        <th>Id</th>
                            <th>Status</th>
                           
                         
                            <th>Name</th>
                            <th>EmailId</th>
                            <th>Mobile No.</th>
                            <th>Details</th>
                           
                        </tr>
                    </thead>
                    <tbody id="result">
                        <?php
                       
                       
                        $sql = "select * from emp_reg";
                        $result = $con->query($sql);
                        if (mysqli_num_rows($result) > 0) {
                            while ($row = mysqli_fetch_assoc($result)) {
                                $status= $row['Status'];
                                $Id = $row['EmployeeId'];
                           
                                $Name = $row['Name'];
                                $Email = $row['Email'];
                                $Mobile = $row['Mobile'];
                                
                        ?>
                                <tr>
                                <td><?php echo $Id; ?> </td>
                                    <td>

            <a class="btn btn-primary" onclick="approve(<?php echo $Id; ?>)"><span>&#10004;</span></a>
            <a class="btn btn-danger" onclick="leave(<?php echo $Id; ?>)"><span>&#10008;</span></a>
                                        <?php echo $status?>
                                    </td>
                                   
                                  
                                    <td><?php echo $Name; ?> </td>
                                  <td><?php echo $Email; ?> </td>
                                    <td><?php echo $Mobile; ?> </td>
                                    <td ><a href="empdetail.php?myid=<?php echo $Id; ?>" target="new window">Detail</a></td>
                                  

                                </tr>
                    </tbody>
            <?php           }
                        }
            ?>
  </div>
                </table>
          
        </div>
    </div>
</div>
<br>
<br>
<?php
include 'footer.php'
?>

































































































