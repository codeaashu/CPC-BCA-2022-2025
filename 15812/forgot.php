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
      background-image: url('assets/images/desk.jpg');
      /* background-image: url('https://cdn.shopify.com/s/files/1/0522/0021/0585/products/Windflower-Florist-Dried-LR-view1_1600x.jpg?v=1629289613') ;  */
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-position: center;
      background-size: cover;
    }

    .container {


      width: 30%;
      border-radius: 25px;
      height: 40%;
      background: radial-gradient(circle at 50% 50%, cornflowerblue, white);
      /* backdrop-filter: blur(8px); */
      /* background-color: cornflowerblue; */

      margin-top: 8%;
      margin-bottom: 3%;

    }

    .registerbtn {
      color: palegoldenrod;
      background-color: #007bff;
      border-radius: 1rem;
      width: 20%;
      transition-property: background-color;
    }

    .registerbtn:hover {
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

    .form1 {
      width: 100%;

    }

    table {
      background-color: pink;
    }

    b {
      color: black;
    }
  </style>

</head>

<body>

  <div class="container">

    <form class="form1" method="POST">
      <h3>Reset Password</h3>
      <br>
      <div class=" row" style="align-items: center;">
        <div class="col-12">
          <label for="fname"><b>Your Registered Email</b></label>

          <div class="input-group mb-3" style="align-content:center" ;>
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1"><i class="fa fa-user"></i></span>
            </div>
            <input type="text" class="form-control" name="email" id="email" placeholder="Your Email" required>
          </div>
        </div>
      </div>
     
      <center> <button type="submit" name="submit" class="registerbtn">Reset</button></center>
      <br>
      
      </div>
    </form>
  </div>


  <?php

  include 'config.php';
  if (isset($_POST['submit'])) {

    $email = $_POST['email'];
$emailquery= "select * from emp_reg where Email='".$email."'";
$query= mysqli_query($con,$emailquery);
$emailcount= mysqli_num_rows($query);
if($emailcount){
   
}
   
  }

  ?>
</body>

</html>