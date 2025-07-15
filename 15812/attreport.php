<?php
// 
include "adminheader.php";


?>
<script>
    function myprofile(str) {
      

        if (str == "") {
            document.getElementById("profile").innerHTML = "";
            return;
        } else {

            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("profile").src = this.responseText;
                    document.getElementById("profile").style = "width:100px;height:100px; margin-left:2px;";


                }
            }
        };
        xmlhttp.open("GET", "fetchimage.php?q=" + str, true);
        xmlhttp.send();
    }
</script>
<style>
    img:hover {
 
        transform: scale(1.9);
    }

</style>
<div class="main-content">

  <!-- content -->
  <div class="container-fluid content-top-gap">

            <div class="tables">
            <div class="cards__heading">
                <h3> Attendance Report</h3>
            </div>


                <!-- <div class="card-body"> -->
                    <form class="form-inline" method="Post">
                        <?php
                        $query = "SELECT EmployeeId,Name FROM `emp_reg` Where `Status`='Approve' ";
                        $query1 = mysqli_query($con, $query);
                        ?>
                        <div class="form-group">
                            <div class="row">
                                <div class="form-group col-12">
                                    <label for="inputState" class="input__label">Search by Employee Name</label>
                                    <div></div>
                                    <select class="form-control" onchange="myprofile(this.value)" style=" margin:5px" ; id="empname" name="id">
                                        <option value="">Select</option>
                                        <?php
                                        while ($row = mysqli_fetch_assoc($query1)) : ?>
                                            <option value='<?php echo $row['EmployeeId']; ?>'> <?php echo $row['Name']; ?></option>
                                        <?php endwhile; ?>
                                    </select>

                                    <label for="inputState">From</label>
                                    <input type="date" class="form-control"  style=" margin:5px" ; id="month" name="month">

                                    <label for="inputState">To</label>
                                    <input type="date" class="form-control"  style=" margin:5px" ; id="month2" name="month2">


                                    <input type="submit" name="submit" class="btn btn-primary " value="View ">


                                    <img id="profile" src="">
                                </div>


                                <br>
                                <br>
                    </form>
                </div>
            </div>
       
    </div>

         <div class="table-responsive"> 
  <table class="table table-bordered"> 
            <thead>
                <tr>
                    <th>Name</th>

                    <th>Date</th>
                    <th>Entry Time</th>
                    <th>Entry Time Pic</th>
                    <th>Exit Time</th>
                    <th>Exit Time Pic</th>
                    <!-- <th>Location</th> -->


                </tr>
            </thead>
            <?php
            if (isset($_POST['submit'])) {


                $id = $_POST['id'];

                $m = $_POST['month'];
                $to = $_POST['month2'];

                if ($m == "" || $to == "" || $id == "Select") {

            ?>
                    <tbody>
                        <tr>
                            <center>
                                <h4 style="color:tomato" ;>Please Select Name and Month</h4>
                            </center>
                        </tr>
                    </tbody>
                <?php } else {

                    $cquery1 = ("SELECT * FROM attendance 
                            WHERE EmployeeId='" . $id . "'AND AttendanceDate between '" . $m . "'and'" . $to . "' ");
                    $result3 = mysqli_query($con, $cquery1);

                    // ($result2 = mysqli_fetch_assoc($result3));


                    $teach = ("SELECT EmployeeId,Username FROM `emp-login` WHERE EmployeeId='" . $id . "'");
                    $tquery = mysqli_query($con, $teach);
                    ($data = mysqli_fetch_assoc($tquery));

                    $t = ("SELECT `Name` FROM `emp_reg` WHERE EmployeeId='" . $id . "'");
                    $tqry = mysqli_query($con, $t);
                    ($data1 = mysqli_fetch_assoc($tqry));

                ?>
                    <tbody>

                        <tr>


                            <?php
                            while ($result2 = mysqli_fetch_assoc($result3)) {
                            ?>
                                <td><?php echo $data1['Name']; ?> </td>
                                <td><?php echo date("d-m-Y", strtotime($result2['AttendanceDate'])) . ',' . $day = date("l", strtotime($result2['AttendanceDate'])) ?></td>
                                <td><?php echo $result2['EntryTime']; ?> </td>
                                <td><img heigth="100px" width="100" src="./upload/<?php echo $result2['EntryTimePic']; ?>  " </td>

                                <td><?php echo $result2['ExitTime']; ?> </td>
                                <?php if ($result2['ExitTimePic']) { ?>
                                    <td> <img heigth="100px" width="100" src="./upload/<?php echo $result2['ExitTimePic']; ?>" </td>
                                    <?php } else {  ?>
                                    <td>
                                        <p></p>
                                    </td>
                                    <?php }
                                //     $lat=$result2['latitude']; 
                                //     $long=$result2['longitude']; ?>
                                   <!-- <td>  <iframe heigth="100px" width="100" src="https://maps.google.com/maps?q=<?php echo $lat?>,<?php echo $long?>$output=embed"></iframe></td> -->
                               



                        </tr>
                    <?php }
                    ?>


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