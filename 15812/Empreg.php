<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Registration</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
  <style>
    * {
      margin: 0px;
      padding: 0px;
    }

    body {
      overflow-y: hidden;
      overflow-x: hidden;
      background-image:url('assets/images/office3.jpg');
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-position: center;
      background-size: cover;
    }

    .container {


      width: 40%;

      border-radius: 25px;
      height: 40%;
      backdrop-filter: blur(10px);
      /* background:linear-gradient(to right,#6190e8,#a7bfe8); */


      margin-top: 3%;
      margin-bottom: 3%;

    }

    .btn-primary {
      /* color:; */
      
      border-radius: 1rem;
     
     
    }

    .btn-primary:hover {
      background-color: green;
    }

    form {
      margin: 0%;
      width: 100%;
    }

    h1 {
      text-align: center;

    }

    .shop {

      /* background-image: linear-gradient(to right, brown , white); */
      height: 85px;

      /* background-color: lightgrey; */
    }

    h1 {

      justify-content: center;
      top: 20px;
      font-weight: bolder;
      color: #007bff;
      font-size: 70px;
    }

    h3 {
      font-size: 40px;
      text-align: center;
      color: #007bff
    }

    .form1 {
      width: 100%;

    }

    table {
      background-color: pink;
    }

    b {
      color: black;
    }

    p {
      color: red !important;
      font-size: 14px !important;
    }
   
    @media only screen and (max-width: 999px){
  .container {
    width: 85% ;
    padding:5%;
    height: 100% ;
  
  }
}
@media only screen and (max-width: 600px) {
  .container {
    margin-top: 3%;
    
    height: 100% ;
    width:100%
  }
}

@media only screen and (min-width: 999px){
  .container {
    width: 30% ;
  
    margin-top: 2%;

  }
}


  </style>
  <script>
    
    function PreviewImage() {
      var oFReader = new FileReader();
      oFReader.readAsDataURL(document.getElementById("file").files[0]);

      oFReader.onload = function(oFREvent) {
        document.getElementById("uploadPreview").src = oFREvent.target.result;
      };
    };

    function verifyPassword() {
      var pw = document.getElementById("pswd").value;
      //check empty password field  
      if (pw == "") {
        document.getElementById("message").innerHTML = "**Fill the password please!";
        return false;
      }

      //minimum password length validation  
      if (pw.length < 8) {
        document.getElementById("message").innerHTML = "**Password length must be atleast 8 characters";
        return false;
      }


      var numbers = /[0-9]/g;
  if(!pw.match(numbers)) {

        document.getElementById("message").innerHTML = "**password must contain atleast 1 number";
        return false;

      }
      var upperCaseLetters = /[A-Z]/g;
  if(!pw.match(upperCaseLetters)) {

        document.getElementById("message").innerHTML = "**password must contain atleast 1 capital letter";
        return false;

      }
      var lowerCaseLetters = /[a-z]/g;
  if(!pw.match(lowerCaseLetters)) {
        document.getElementById("message").innerHTML = "**password must contain atleast 1 lowercase letter";
        return false;

      }

    }
  </script>
</head>

<body>

  <div class="container">
<div class="wrapper">
    <form class="form1" onsubmit="return verifyPassword()" method="POST" enctype="multipart/form-data">
      <h3>Register Here</h3>
      <br>
      <div class=" row" style="align-items: center;">
        <div class="col-8 ">
          <label for="fname"><b>Name*</b></label>

          <div class="input-group mb-3" style="align-content:center" ;>
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1"><i class="fa fa-user"></i></span>
            </div>
            <input type="text" class="form-control" name="name" id="name" placeholder="Name" required>
          </div>
        </div>

        <div class="col-4 ">
          <label for="photo"><b>Upload Photo*</b></label>
          <div class="input-group mb-2">

            <img src="assets/images/photo.png" id="uploadPreview" style="height:70px; width:70px; padding:1%;" />
            <input type="file" id="file" name="photo" onChange="PreviewImage();" required>
          </div>
        </div>

      </div>

      <div class="row">
        <div class="col-12">
          <label for="Email"><b>Email*</b></label>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1"><i class="fa fa-envelope"></i></span>
            </div>
            <input type="text" class="form-control" name="email" id="email" placeholder="Email" required>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-8">
          <label for="Mobile"><b>Mobile*</b></label>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1"><i class="fa fa-phone"></i></span>
            </div>
            <input type="text" class="form-control" name="mobile" id="mobile" placeholder="Mobile" required>
          </div>
        </div>
        <div class="col-4">
        <label for="Mobile"><b>Gender*</b></label>
        <div class="form-check">
                                        <input class="form-check-input" type="radio" name="gender" id="gender"
                                            value="Male" >
                                        <label class="form-check-label" for="gridRadios1">
                                            Male
                                        </label>
                                    </div>
                                  

                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="gender" id="gender"
                                            value="Female">
                                        <label class="form-check-label" for="gridRadios2">
                                            Female
                                        </label>
                                    </div>

        </div>
      </div>


      <div class=" row">
        <div class="col-12">
          <label for="psw"><b>Password*</b></label>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon5"><i class="fa fa-lock"></i></span>
            </div>
            <input type="password" class="form-control" name="password" id="pswd" placeholder="Password" required>

          </div>
          <span id="message" style="color:red"> </span>

        </div>
      </div>



      <center> <button type="submit" name="submit" class="btn btn-primary">Register</button></center>
      
      <div class="signin">
        <center>
          <p1><b>Already have an account? <a href="index.php">Sign in</a></b></p1>
        </center><br>
      </div>
    </form>
  </div>
  </div>

  <?php
  include 'config.php';
  if (isset($_POST['submit'])) {


    $allowed = array('jpeg', 'png', 'jpg');
    $file1 = uniqid().$_FILES["photo"]["name"];
    $dst1 = "assets/empphoto/" . $file1;
    $ext = pathinfo($file1, PATHINFO_EXTENSION);
    if ((!empty($file1)) && ($size < 2097152))
{
    $pop = move_uploaded_file($_FILES["photo"]["tmp_name"], $dst1);
  }
  else
  {
  echo "The size of the file must be less than 2MB in order to be uploaded.";	
  }
  
  
$gender=$_POST['gender'];

    $name = $_POST['name'];
    $email = $_POST['email'];
   
    $password = ($_POST["password"]);


    $mobile = $_POST['mobile'];
    $device = $_SERVER['REMOTE_ADDR'];
    $status = 'Pending';

    $sql1 = ("select * from emp_reg where Email= '$email'");
    $result1 = $con->query($sql1);
    $sql2 = ("Select * from `emp-login` Where Username= '$email'");
    $result2 = $con->query($sql2);
    if (mysqli_num_rows($result1) > 0) {

      echo "<script>alert('Email Already Taken');</script>";
    } elseif (mysqli_num_rows($result2) > 0) {
      echo "<script>alert('Email Already Taken');</script>";
    } else {

      $sql = "insert into emp_reg(`Name`,`Mobile`,`Photo`,`Email`,`Gender`,`Password`,`Date`,`DeviceInfo`,`Status`)
             values ('" . $name . "','" . $mobile . "','".$dst1."','" . $email . "','" . $gender . "','" . $password . "',now(),'" . $device . "','" . $status . "' )";

      if ($con->query($sql)) {
        // echo $device;
        echo "<script>alert('Successfully registered, Please wait for admin approval');</script>";
        echo "<script> window.location='index.php';</script>";
      } else {
        echo "<script>alert('Failed to register'); </script>";
      }
    }


    //  echo"<script>alert('Failed to insert details'); </script>";

  }
  ?>

</body>

</html>