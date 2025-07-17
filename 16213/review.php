<?php
session_start();
include "db.php";
if (isset($_POST["review"])) {

    $name = trim($_POST["name"]);
    $email = trim($_POST["email"]);
    $review = trim($_POST['review']);
    $rating = $_POST['rating'];
    $product_id = $_POST['product_id'];
    $datetime =  date('Y-m-d H:i:s');

    $errors = array();
    if(empty($name)) {
        $errors[] = "Name is required.";
    }
    if(empty($email)) {
        $errors[] = "Email is required.";
    } elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    }
    if(empty($review)) {
        $errors[] = "Review is required.";
    } elseif(strlen($review) < 5) {
        $errors[] = "Review is too short.";
    }
    if(empty($rating)) {
        $errors[] = "Rating is required.";
    } elseif(!is_numeric($rating) || $rating < 1 || $rating > 5) {
        $errors[] = "Rating must be a number between 1 and 5.";
    }
    if(count($errors) > 0) {
        foreach($errors as $error) {
            echo "<div class='alert alert-danger'><b>$error</b></div>";
        }
        exit();
    }
		
		$sql = "SELECT review_id FROM reviews WHERE email = '$email' AND product_id = '$product_id' ";
		$check_query = mysqli_query($con,$sql);
		$count_email = mysqli_num_rows($check_query);
		if($count_email > 0){
			echo "
				<div class='alert alert-danger'>
					<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>
					<b>Multiple reviews are not Allowed</b>
				</div>
			";
			exit();
		}else{
			$sql = "INSERT INTO `reviews` (`review_id`, `product_id`, `name`, `email`, `review`, `datetime`, `rating`) 
			VALUES  (NULL, '$product_id','$name', '$email', 
			'$review','$datetime', '$rating')";
			
			if(mysqli_query($con,$sql)){
				echo "Thanks for Better reach ";
				echo "<script> location.href='product.php?q=$product_id'; </script>";
				exit;
			}else {
				echo "something went wrong";
			}
		}
	
}



?>






















































