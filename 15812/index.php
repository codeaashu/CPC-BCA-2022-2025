<?php
session_start();
?>

<!doctype html>

<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Login</title>
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
      /* background-image:url('assets/images/picc.jpeg'); */
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    
     
    } 

    .container {


      width: 30%;
      
      border-radius: 25px;
      backdrop-filter: blur(10px);
      /* background:linear-gradient(to right,#6190e8,#a7bfe8); */
      
      height: 40%;

      margin-top: 10%;
      margin-bottom: 3%;

    }

    .btn-primary {
      
      
      border-radius: 1rem;
      /* width: 20%; */
     
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
      height: 85px;


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
      color: #007bff;
    }

    b {
      color: black;
    }
    @media only screen and (max-width: 600px){
  .container {
    width: 85% ;
    padding:5%;
    height: 100% ;
    margin-top: 40%;
  }
}
@media only screen and (min-width: 600px) {
  .container {
 
    height: 100% ;
    margin-top: 40%;
  }
}
@media only screen and (min-width: 999px){
  .container {
    width: 50% ;
  
    margin-top: 8%;
    margin-bottom: 5%;
  }
}
@media only screen and (min-width: 1200px){
  .container {
    width: 30% ;
    height: 40%;
   
  }
}


 </style>

</head>

<body>

  <div class="container ">
  <div class="wrapper">
    <form class="form1" method="POST">
      <h3>Login Here</h3>
      <br>
      <div class="form-group">
      <div class=" row" style="align-items: center;">
        <div class="col-12">
          <label for="fname"><b>Username</b></label>

          <div class="input-group mb-3" style="align-content:center" ;>
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1"><i class="fa fa-user"></i></span>
            </div>
            <input type="text" class="form-control" name="name" id="name" placeholder="Your Email" required>
          </div>
        
      </div>
      </div>
    
      <div class=" row">
        <div class="col-12">
          <label for="pw"><b>Password</b></label>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon5"><i class="fa fa-lock"></i></span>
            </div>
            <input type="password" class="form-control" name="password" id="password" placeholder="Password" required>
          </div>
        </div>
      </div>
      </div>
     <div class="form-group">
      <center> <button type="submit" name="submit" class="btn btn-primary">Login</button></center>
      
      <div class="signin">
        <center>
          <!-- <p>Forgot Password? <a href="forgot.php">Reset Password</a></p> -->
        <!-- </center>
        <center> -->
          <p>New Member? <a href="Empreg.php">Register Here</a></p><br>
        </center>
      </div>
      </div>
      </div>
    </form>
  </div>


  <?php

  include 'config.php';
  if (isset($_POST['submit'])) {

    $name = $_POST['name'];

    $password = $_POST['password'];

    $device = gethostbyname(trim(`hostname`));

    $sql = "Select * from `emp-login` Where Username='$name' AND Password='$password'";
    $result = $con->query($sql);
    $row = $result->fetch_array();
    $type = $row['Usertype'];
    $empid = $row['EmployeeId'];
    if ($type=='Admin') {
      $_SESSION["username"] = $name;
      $_SESSION['type'] = 'Admin';
      $_SESSION['empid'] = $empid;
      // echo "<script>alert($empid);</script>";
      echo "<script>window.location='admin_page.php';</script>";
    } elseif ($type == 'Employee') {
      $_SESSION["username"] = $name;
      $_SESSION['type'] = 'Employee';
      $_SESSION['empid'] = $empid;
      echo "<script>window.location='Emp_page.php';</script>";
    } else {
      echo "<script>alert('Invalid Email or Password')</script>";
    }
  }

  ?>
</body>

</html>