<?php
session_start();
include "db.php";
if (isset($_SESSION["uid"])) {

	$f_name = trim($_POST["firstname"]);
	$email = trim($_POST['email']);
	$address = trim($_POST['address']);
    $city = trim($_POST['city']);
    $state = trim($_POST['state']);
    $zip = trim($_POST['zip']);
    $cardname = trim($_POST['cardname']);
    $cardnumber = trim($_POST['cardNumber']);
    $expdate = trim($_POST['expdate']);
    $cvv = trim($_POST['cvv']);
    $user_id = $_SESSION["uid"];
    $cardnumberstr = (string)$cardnumber;
    $total_count = $_POST['total_count'];
    $prod_total = $_POST['total_price'];

    $errors = array();
    if(empty($f_name)) $errors[] = "First name is required.";
    if(empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Valid email is required.";
    if(empty($address)) $errors[] = "Address is required.";
    if(empty($city)) $errors[] = "City is required.";
    if(empty($state)) $errors[] = "State is required.";
    if(empty($zip) || !is_numeric($zip)) $errors[] = "Valid ZIP code is required.";
    if(empty($cardname)) $errors[] = "Card name is required.";
    if(empty($cardnumber) || !is_numeric($cardnumber) || strlen($cardnumber) < 12 || strlen($cardnumber) > 19) $errors[] = "Valid card number is required.";
    if(empty($expdate) || !preg_match('/^(0[1-9]|1[0-2])\/[0-9]{2,4}$/', $expdate)) $errors[] = "Valid expiration date is required (MM/YY or MM/YYYY).";
    if(empty($cvv) || !is_numeric($cvv) || strlen($cvv) < 3 || strlen($cvv) > 4) $errors[] = "Valid CVV is required.";
    if(empty($total_count) || !is_numeric($total_count) || $total_count < 1) $errors[] = "Total count must be a positive number.";
    if(empty($prod_total) || !is_numeric($prod_total) || $prod_total < 1) $errors[] = "Total price must be a positive number.";
    if(count($errors) > 0) {
        foreach($errors as $error) {
            echo "<div class='alert alert-danger'><b>$error</b></div>";
        }
        exit();
    }
    
    
    $sql0="SELECT order_id from `orders_info`";
    $runquery=mysqli_query($con,$sql0);
    if (mysqli_num_rows($runquery) == 0) {
        echo( mysqli_error($con));
        $order_id=1;
    }else if (mysqli_num_rows($runquery) > 0) {
        $sql2="SELECT MAX(order_id) AS max_val from `orders_info`";
        $runquery1=mysqli_query($con,$sql2);
        $row = mysqli_fetch_array($runquery1);
        $order_id= $row["max_val"];
        $order_id=$order_id+1;
        echo( mysqli_error($con));
    }

	$sql = "INSERT INTO `orders_info` 
	(`order_id`,`user_id`,`f_name`, `email`,`address`, 
	`city`, `state`, `zip`, `cardname`,`cardnumber`,`expdate`,`prod_count`,`total_amt`,`cvv`) 
	VALUES ($order_id, '$user_id','$f_name','$email', 
    '$address', '$city', '$state', '$zip','$cardname','$cardnumberstr','$expdate','$total_count','$prod_total','$cvv')";


    if(mysqli_query($con,$sql)){
        $i=1;
        $prod_id_=0;
        $prod_price_=0;
        $prod_qty_=0;
        while($i<=$total_count){
            $str=(string)$i;
            $prod_id_+$str = $_POST['prod_id_'.$i];
            $prod_id=$prod_id_+$str;		
            $prod_price_+$str = $_POST['prod_price_'.$i];
            $prod_price=$prod_price_+$str;
            $prod_qty_+$str = $_POST['prod_qty_'.$i];
            $prod_qty=$prod_qty_+$str;
            $sub_total=(int)$prod_price*(int)$prod_qty;
            $sql1="INSERT INTO `order_products` 
            (`order_id`,`product_id`,`qty`,`amt`) 
            VALUES ('$order_id','$prod_id','$prod_qty','$sub_total')";
            if(mysqli_query($con,$sql1)){
                $del_sql="DELETE from cart where user_id=$user_id";
                if(mysqli_query($con,$del_sql)){
                    echo"<script>window.location.href='order_successful.php'</script>";
                }else{
                    echo(mysqli_error($con));
                }

            }else{
                echo(mysqli_error($con));
            }
            $i++;


        }
    }else{

        echo(mysqli_error($con));
        
    }
    
}else{
    echo"<script>window.location.href='index.php'</script>";
}
?>