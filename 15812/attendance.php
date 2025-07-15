<?php
include 'header.php';

?>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/webcamjs/1.0.25/webcam.min.js"></script>
<!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css" /> -->
<style type="text/css">
    #results {
        padding: 10px;
        border: 1px solid;
        background: #ccc;
    }.container{
        margin-top: 5%;
    }
   
    
    
</style>
<script>
$(document).ready(function(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showLocation);
    }else{ 
        $('#location').html('Geolocation is not supported by this browser.');
    }
});

function showLocation(position){
    // alert('as');
    var latitude = position.coords.latitude;
    // alert(latitude);
    var longitude = position.coords.longitude;
    //  alert(longitude);
    document.getElementById("location").innerHTML=latitude;
    document.getElementById("location1").innerHTML=longitude;
    
    $.ajax({
        type:'POST',
        url:'getLocation.php',
        data:'latitude='+latitude+'&longitude='+longitude,
        success:function(msg){
            if(msg){
            //   $("#location").html(msg);
            }else{
            //    $("#location").html('Not Available');
            }
        }
    });
}


</script>
  


<div class="main-content">
<!-- <div class="container-fluid content-top-gap"> -->
<!-- <div class="card card_border py-2 mb-6"> -->
<div class="card-body">
    <div class="container">
       

      
        <form method="POST" enctype='multipart/form-data'>
            <div class="row">
                <div class="col-md-6">
                    <div id="my_camera"></div>
                    <br />
                 <center>   <input type="button" style="border-radius:12px"; value="Take Snapshot" onClick="take_snapshot()" /></center><br>

                    <input type="hidden" name="image" class="image-tag" />
                </div>
                <div class="col-md-4">
                    <div id="results">Your captured image will appear here...</div>
                </div>
                <div class="col-md-12 text-center">
                    
                    <textarea hidden <span id="location" name="location"></span> </textarea>
                    <textarea  hidden <span id="location1" name="location1"></span> </textarea>
                    <input type="submit" style="margin-bottom:5px"; class="btn btn-primary" value="Mark as Entry Attendance" name="entry">
                 <br>
                    <input type="submit" class="btn btn-danger" value="Mark as Exit Attendance" name="exit">
                </div>
            </div>
        </form>
    </div>
</div>
</div>
</div>
</div>
<br>
<?php
include 'empfooter.php'
?>
    <!-- Configure a few settings and attach camera -->
    <script language="JavaScript">
        Webcam.set({
            // width: 490,
            // height: 390,
            width: 390,
            height: 290,
            image_format: "jpeg",
            jpeg_quality: 90,
        });

        Webcam.attach("#my_camera");

        function take_snapshot() {
            Webcam.snap(function(data_uri) {
                $(".image-tag").val(data_uri);
                document.getElementById("results").innerHTML =
                    '<img  src="' + data_uri + '"/>';
            });
        }
    </script>




<?php
include 'config.php';
if (isset($_POST['entry'])) {

    $img = $_POST['image'];
    $folderPath = "upload/";
$latlong= $_POST['location'];
    $image_parts = explode(";base64,", $img);
    $image_type_aux = explode("image/", $image_parts[0]);
    $image_type = $image_type_aux[1];

    $image_base64 = base64_decode($image_parts[1]);
    $fileName = uniqid() . '.png';

    $file = $folderPath . $fileName;
    file_put_contents($file, $image_base64);

    // Upload files and store in database

    $device = $_SERVER['REMOTE_ADDR'];
    $devicereg = "Select `DeviceInfo` from emp_reg Where EmployeeId ='".$EmployeeId."'";
    $result = $con->query($devicereg);
    if($row = $result->fetch_assoc()) {
        $devicematch = $row['DeviceInfo'];
        if($device == $devicematch) {
            $match = 'Yes';
        } else {
            $match = 'No';
        }
    }
    
    $query1 = "select * From attendance WHERE `EmployeeId`= '" . $EmployeeId . "' AND `AttendanceDate`= CURDATE()";
    $qry1 = (mysqli_query($con, $query1));
    if (mysqli_num_rows($qry1) == 0) {
        $insert = "INSERT INTO attendance(`EmployeeId`,`AttendanceDate`,`EntryTime`,`EntryTimePic`,`DeviceInfo`,`DeviceMatch`,`latitude`,`longitude`) VALUES('".$EmployeeId."',CURDATE(),CURTIME(),'".$fileName."','".$device."','".$match."','".$lat."','".$long."')";
        if ($con->query($insert)) {
            echo "<script>alert('Entry Attendance Marked!!!');</script>";
        }
    }else{
        echo "<script>alert('Attendance Already Marked For Today!!!');</script>";
    }
}
?>

<!-- exit time start-->

<?php
if (isset($_POST['exit'])) {

    $img = $_POST['image'];
    $folderPath = "upload/";

    $image_parts = explode(";base64,", $img);
    $image_type_aux = explode("image/", $image_parts[0]);
    $image_type = $image_type_aux[1];

    $image_base64 = base64_decode($image_parts[1]);
    $fileName1 = uniqid() . '.png';

    $file = $folderPath . $fileName1;
    file_put_contents($file, $image_base64);

    // Upload files and store in database
    $query = "select * From attendance WHERE `EmployeeId`= '" . $EmployeeId . "' AND `AttendanceDate`= CURDATE()";
    $qry = (mysqli_query($con, $query));

    if (mysqli_num_rows($qry) == 1) {
        $update = "Update attendance set `ExitTime`= CURTIME(),`ExitTimePic`= '" . $fileName1 . "' where   `EmployeeId`= '" . $EmployeeId . "' AND `AttendanceDate`= CURDATE()";
        if (mysqli_query($con, $update)) {
            echo "<script>alert('Exit Attendance Marked!!!');</script>";
        }
    }
}

?>

