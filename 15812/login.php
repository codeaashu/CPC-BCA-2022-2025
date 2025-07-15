<?php
session_start();
include 'header.php';
?>

<div class="main-content">
    <div class="container-fluid content-top-gap">
        <div class="card card_border py-2 mb-4">
            <div class="cards__heading">
                <h3>Login Form</h3>
            </div>
            <div class="card-body">
                <form method="Post">

                    <div class="form-group">
                        <label class="input__label">Username*</label>
                        <input type="text" class="form-control input-style" id="name" name="name" placeholder="Name" required>
                    </div>

                    <div class="form-group">
                        <label class="input__label">Password*</label>
                        <input type="password" class="form-control input-style" id="password" name="password" placeholder="password" required>
                    </div>

                    <center> <input type="submit" name="submit" class="btn btn-primary btn-style mt-4" value="Login"></center>
                </form>
            </div>
        </div>
    </div>
</div>
<?php

include 'config.php';
if (isset($_POST['submit'])) {

    $name = $_POST['name'];

    $password = $_POST['password'];

    $device = gethostbyname(trim(`hostname`));
    
    $check = "Select * from ip_list Where `ip` = '".$device."' ";
    $checkresult = $con->query($check);
    if (mysqli_num_rows($checkresult)== 0) {
        echo "<script>alert('Please login with office wifi')</script>";
    }
    else{
        $sql = "Select * from `emp-login` Where Username= '$name' AND Password= '$password'";

        $result = $con->query($sql);
        $row = $result->fetch_array();
        if ($row['Usertype'] == 'Admin') {
            $_SESSION["name"] = $name;
            $EmployeeId = $row['EmployeeId'];
            echo "<script>alert('Successfully LoggedIn');window.location='admin_page.php?EmployeeId=$EmployeeId';</script>";
        } elseif ($row['Usertype'] == 'Employee') {
            $_SESSION["name"] = $name;
            $EmployeeId = $row['EmployeeId'];
            echo "<script>alert('Successfully LoggedIn');window.location='Emp_page.php?EmployeeId=$EmployeeId';</script>";
        } else {
            echo "<script>alert('Invalid name or password')</script>";
        }
    } 
}

?>
<?php
include 'footer.php'
?>