<?php
include "db.php";

session_start();
if(isset($_POST["email"]) && isset($_POST["password"])){
    $email = trim($_POST["email"]);
    $password = $_POST["password"];
    $errors = array();
    // Validate email
    if(empty($email)) {
        $errors[] = "Email is required.";
    } elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    }
    // Validate password
    if(empty($password)) {
        $errors[] = "Password is required.";
    } elseif(strlen($password) < 6) {
        $errors[] = "Password must be at least 6 characters.";
    }
    if(count($errors) > 0) {
        foreach($errors as $error) {
            echo "<div class='alert alert-danger'><b>$error</b></div>";
        }
        exit();
    }
    $email = mysqli_real_escape_string($con, $email);
	$sql = "SELECT * FROM user_info WHERE email = '$email' AND password = '$password'";
	$run_query = mysqli_query($con,$sql);
	$count = mysqli_num_rows($run_query);
    $row = mysqli_fetch_array($run_query);
		
		//we have created a cookie in login_form.php page so if that cookie is available means user is not login
        
	//if user record is available in database then $count will be equal to 1
	if($count == 1){
			
		if (isset($_COOKIE["product_list"]) && isset($_SESSION['uid'])) {
			$p_list = stripcslashes($_COOKIE["product_list"]);
			$product_list = json_decode($p_list, true);
			
			// Prepare the statement
			$verify_cart = "SELECT id FROM cart WHERE user_id = ? AND p_id = ?";
			$stmt = mysqli_prepare($con, $verify_cart);
			mysqli_stmt_bind_param($stmt, "ii", $_SESSION['uid'], $p_id);
		
			foreach ($product_list as $p_id) {
				mysqli_stmt_execute($stmt);
				mysqli_stmt_store_result($stmt);
				$num_rows = mysqli_stmt_num_rows($stmt);
		
				if ($num_rows < 1) {
					// Insert new cart item
					// You need to have your INSERT query here
				} else {
					// Delete existing cart item
					$delete_existing_product = "DELETE FROM cart WHERE user_id = -1 AND ip_add = ? AND p_id = ?";
					$stmt_delete = mysqli_prepare($con, $delete_existing_product);
					mysqli_stmt_bind_param($stmt_delete, "si", $ip_add, $p_id);
					mysqli_stmt_execute($stmt_delete);
				}
			}
			
			// Destroy the product_list cookie
			setcookie("product_list", "", strtotime("-1 day"), "/");
			
			echo "cart_login";
			
			exit();
		}
			//if user is login from page we will send login_success
			$_SESSION["uid"] = $row["user_id"];
			$_SESSION["name"] = $row["first_name"];
			$ip_add = getenv("REMOTE_ADDR");
			$sql = "UPDATE cart SET user_id = '$_SESSION[uid]' WHERE ip_add='$ip_add' AND user_id = -1";
			$wishlist_sql = "UPDATE wishlist SET user_id = '$_SESSION[uid]' WHERE ip_add='$ip_add' AND user_id = -1";
			if(mysqli_query($con,$sql)){
				
				echo "login_success";
				$BackToMyPage = $_SERVER['HTTP_REFERER'];
				if(mysqli_query($con,$wishlist_sql)){
					if(!isset($BackToMyPage)) {
						header('Location: '.$BackToMyPage);
						echo"<script type='text/javascript'>
						
						</script>";
					} else {
						echo "<script> location.href='index.php'; </script>" ;// default page
					} 
				}
			}
			
				
			
            exit;

		}else{
                $email = mysqli_real_escape_string($con,$_POST["email"]);
                $password =md5($_POST["password"]) ;
                $sql = "SELECT * FROM admin_info WHERE admin_email = '$email' AND admin_password = '$password'";
                $run_query = mysqli_query($con,$sql);
                $count = mysqli_num_rows($run_query);

            //if user record is available in database then $count will be equal to 1
            if($count == 1){
                $row = mysqli_fetch_array($run_query);
                $_SESSION["uid"] = $row["admin_id"];
                $_SESSION["name"] = $row["admin_name"];
                $ip_add = getenv("REMOTE_ADDR");
                //we have created a cookie in login_form.php page so if that cookie is available means user is not login


                    //if user is login from page we will send login_success
                    echo "login_success";

                    echo "<script> location.href='admin/add_products.php'; </script>";
                    exit;

                }else{
                    echo "<span style='color:red;'>Please register before login..!</span>";
                    exit();
                }
    
	
}
    
	
}

?>