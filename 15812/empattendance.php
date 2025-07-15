<?php
include "header.php";

?>
<!-- <style>

@media only screen and (max-width: 760px),
(min-device-width: 768px) and (max-device-width: 1024px)  {

/* Force table to not be like tables anymore */
table, thead, tbody, th, td, tr { 
    display: block; 
}

/* Hide table headers (but not display: none;, for accessibility) */
thead tr { 
    position: absolute;
    top: -9999px;
    left: -9999px;
}

tr { border: 1px solid #ccc; }

td { 
    /* Behave  like a "row" */
    border: none;
    border-bottom: 1px solid #eee; 
    position: relative;
    padding-left: 50%; 
}

td:before { 
    /* Now like a table header */
    position: absolute;
    /* Top/left values mimic padding */
    top: 6px;
    left: 6px;
    width: 45%; 
    padding-right: 10px; 
    white-space: nowrap;
}


</style> -->
<div class="main-content">

  <!-- content -->
  <div class="container-fluid content-top-gap">

            <div class="tables">
            <div class="cards__heading">
                <h3>Your Attendance</h3>
            </div>


                <!-- <div class="card-body"> -->
                    <form class="form-inline" method="Post">
                       
                        <div class="form-group">
                            <div class="row">
                                <div class="form-group col-12">
                                    
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
       
    

            <div class="table-responsive"> 
  <table class="table table-bordered"> 
            <thead>
                <tr>
                    

                    <th>Date</th>
                    <th>Entry Time</th>
                    <th>Entry Time Pic</th>
                    <th>Exit Time</th>
                    <th>Exit Time Pic</th>


                </tr>
            </thead>
            <?php
            if (isset($_POST['submit'])) {


              
                $m = $_POST['month'];
                $to = $_POST['month2'];

                if ($m =="" || $to=="") {

            ?>
                    <tbody>
                        <tr>
                            <center>
                                <h4 style="color:tomato" ;>Please Select Month Duration</h4>
                            </center>
                        </tr>
                    </tbody>
                <?php } else {

                    $cquery1 = ("SELECT * FROM attendance 
                            WHERE EmployeeId='" .$EmployeeId. "'AND AttendanceDate between '" . $m . "'and'" . $to . "' ");
                    $result3 = mysqli_query($con, $cquery1);

                    // ($result2 = mysqli_fetch_assoc($result3));


                   

                   

                ?>
                    <tbody>

                        <tr>


                            <?php
                            while ($result2 = mysqli_fetch_assoc($result3)) {
                            ?>
                               
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
                                <?php } ?>



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

    <?php include 'empfooter.php' 
?>