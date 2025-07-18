<?php
session_start();
$ip_add = getenv("REMOTE_ADDR");
include "db.php";

// Admin restock script (for manual use):
if (isset($_GET['restock']) && $_GET['restock'] == '1') {
    include 'db.php';
    $sql = "UPDATE products SET product_quantity = 100 WHERE product_quantity < 1";
    if (mysqli_query($con, $sql)) {
        echo '<div style="color:green;font-weight:bold;">All out-of-stock products have been restocked to 100.</div>';
    } else {
        echo '<div style="color:red;font-weight:bold;">Error restocking products.</div>';
    }
}

if (isset($_POST["category"])) {
	$category_query = "SELECT * FROM categories";

	$run_query = mysqli_query($con, $category_query) or die(mysqli_error($con));
	echo "
		
            
            <div class='aside'>
							<h3 class='aside-title'>Categories</h3>
							<div class='btn-group-vertical'>
	";
	if (mysqli_num_rows($run_query) > 0) {
		$i = 1;
		while ($row = mysqli_fetch_array($run_query)) {

			$cid = $row["cat_id"];
			$cat_name = $row["cat_title"];
			$sql = "SELECT COUNT(*) AS count_items FROM products WHERE product_cat=$i";
			$query = mysqli_query($con, $sql);
			$row = mysqli_fetch_array($query);
			$count = $row["count_items"];
			$i++;
			echo "
					
                    <div type='button' class='btn navbar-btn category' cid='$cid'>
									
									<a href='#'>
										<span  ></span>
										$cat_name
										<small class='qty'>($count)</small>
									</a>
								</div>
                    
			";
		}


		echo "</div>";
	}
}
if (isset($_POST["brand"])) {
	$brand_query = "SELECT * FROM brands";
	$run_query = mysqli_query($con, $brand_query);
	echo "
		<div class='aside'>
							<h3 class='aside-title'>Brand</h3>
							<div class='btn-group-vertical'>
	";
	if (mysqli_num_rows($run_query) > 0) {
		$i = 1;
		while ($row = mysqli_fetch_array($run_query)) {

			$bid = $row["brand_id"];
			$brand_name = $row["brand_title"];
			$sql = "SELECT COUNT(*) AS count_items FROM products WHERE product_brand=$i";
			$query = mysqli_query($con, $sql);
			$row = mysqli_fetch_array($query);
			$count = $row["count_items"];
			$i++;
			echo "
					
                    
                    <div type='button' class='btn navbar-btn selectBrand' bid='$bid'>
									
									<a href='#'>
										<span ></span>
										$brand_name
										<small >($count)</small>
									</a>
								</div>
			";
		}
		echo "</div>";
	}
}
if (isset($_POST["page"])) {
	$cid = $_POST["cid"];
	$sql = "SELECT * FROM products Where product_cat='$cid' AND product_quantity > 0 ";
	$run_query = mysqli_query($con, $sql);
	$count = mysqli_num_rows($run_query);
	$pageno = ceil($count / 9);
	for ($i = 1; $i <= $pageno; $i++) {
		echo "
			<li><a href='#product-row' page='$i' id='page' cid='$cid'  class='active'>$i</a></li>
            
            
		";
	}
}
if (isset($_POST["getProduct"])) {
	$limit = 9;
	if (isset($_POST["setPage"])) {
		$pageno = $_POST["pageNumber"];
		$start = ($pageno * $limit) - $limit;
	} else {
		$start = 0;
	}
	if (isset($_POST["cid"])) {
		$cat_id = $_POST["cid"];
	} else {
		$cat_id = $_POST["cat_id"];
	}

	$product_query = "SELECT * FROM products,categories WHERE product_cat = '$cat_id' AND product_cat=cat_id LIMIT $start,$limit";
	$run_query = mysqli_query($con, $product_query);
	if (mysqli_num_rows($run_query) > 0) {
		while ($row = mysqli_fetch_array($run_query)) {
			$pro_id    = $row['product_id'];
			$pro_cat   = $row['product_cat'];
			$pro_brand = $row['product_brand'];
			$pro_title = $row['product_title'];
			$pro_price = $row['product_price'];
			$pro_image = $row['product_image'];

			$cat_name = $row["cat_title"];
			echo "
				
                        
                        <div class='col-md-4 col-xs-6' >
								<a href='product.php?p=$pro_id'><div class='product'>
									<div class='product-img'>
										<img src='product_images/$pro_image' style='max-height: 170px;' alt=''>
										<div class='product-label'>
											<span class='sale'>-30%</span>
											<span class='new'>NEW</span>
										</div>
									</div></a>
									<div class='product-body'>
										<p class='product-category'>$cat_name</p>
										<h3 class='product-name header-cart-item-name'><a href='product.php?p=$pro_id'>$pro_title</a></h3>
										<h4 class='product-price header-cart-item-info'>Rs.$pro_price<del class='product-old-price'>Rs.0</del></h4>
										<div class='product-rating'>";
			$rating_query = "SELECT ROUND(AVG(rating),1) AS avg_rating  FROM reviews WHERE product_id='$pro_id '";
			$run_review_query = mysqli_query($con, $rating_query);
			$review_row = mysqli_fetch_array($run_review_query);
			if ($review_row > 0) {
				$avg_count = $review_row["avg_rating"];
				$i = 1;
				while ($i <= round($avg_count)) {
					$i++;
					echo '
													<i class="fa fa-star"></i>';
				}
				$i = 1;
				while ($i <= 5 - round($avg_count)) {
					$i++;
					echo '
													<i class="fa fa-star-o empty"></i>';
				}
			}
			echo "</div>
										<div class='product-btns'>
											<!-- <button pid='$pro_id' id='wishlist' class='add-to-wishlist'><i class='fa fa-heart-o'></i><span class='tooltipp'>add to wishlist</span></button>
											<button class='add-to-compare'><i class='fa fa-exchange'></i><span class='tooltipp'>add to compare</span></button>
											<button class='quick-view'><i class='fa fa-eye'></i><span class='tooltipp'>quick view</span></button> -->
										</div>
									</div>
									<div class='add-to-cart'>
										<button pid='$pro_id' id='product' class='add-to-cart-btn block2-btn-towishlist' href='#'><i class='fa fa-shopping-cart'></i> add to cart</button>
									</div>
								</div>
							</div>
                        
			";
		}
	}
}


if (isset($_POST["get_seleted_Category"]) || isset($_POST["selectBrand"]) || isset($_POST["search"])) {

	if (isset($_POST["get_seleted_Category"])) {
		$id = $_POST["cat_id"];
		$sql = "SELECT * FROM products,categories WHERE product_cat = '$id' AND product_cat=cat_id AND product_quantity > 0";
	} else if (isset($_POST["selectBrand"])) {
		$id = $_POST["brand_id"];
		$sql = "SELECT * FROM products,categories WHERE product_brand = '$id' AND product_cat=cat_id AND product_quantity > 0";
	} else {

		$keyword = $_POST["keyword"];
		$sql = "SELECT * FROM products,categories WHERE product_keywords AND product_quantity > 0 LIKE '%$keyword%'";
	}

	$run_query = mysqli_query($con, $sql);
	while ($row = mysqli_fetch_array($run_query)) {
		$pro_id    = $row['product_id'];
		$pro_cat   = $row['product_cat'];
		$pro_brand = $row['product_brand'];
		$pro_title = $row['product_title'];
		$pro_price = $row['product_price'];
		$pro_image = $row['product_image'];
		$cat_name = $row["cat_title"];

		echo "
					
                        
                        <div class='col-md-4 col-xs-6'>
								<a href='product.php?p=$pro_id'><div class='product'>
									<div class='product-img'>
										<img  src='product_images/$pro_image'  style='max-height: 170px;' alt=''>
										<div class='product-label'>
											<span class='sale'>-30%</span>
											<span class='new'>NEW</span>
										</div>
									</div></a>
									<div class='product-body'>
										<p class='product-category'>$cat_name</p>
										<h3 class='product-name header-cart-item-name'><a href='product.php?p=$pro_id'>$pro_title</a></h3>
										<h4 class='product-price header-cart-item-info'>Rs.$pro_price<del class='product-old-price'>Rs.990.00</del></h4>
										<div class='product-rating'>";
		$rating_query = "SELECT ROUND(AVG(rating),1) AS avg_rating  FROM reviews WHERE product_id='$pro_id '";
		$run_review_query = mysqli_query($con, $rating_query);
		$review_row = mysqli_fetch_array($run_review_query);
		if ($review_row > 0) {
			$avg_count = $review_row["avg_rating"];
			$i = 1;
			while ($i <= round($avg_count)) {
				$i++;
				echo '
													<i class="fa fa-star"></i>';
			}
			$i = 1;
			while ($i <= 5 - round($avg_count)) {
				$i++;
				echo '
													<i class="fa fa-star-o empty"></i>';
			}
		}
		echo "</div>
										<div class='product-btns'>
											<!-- <button pid='$pro_id' id='wishlist' class='add-to-wishlist' tabindex='0'><i class='fa fa-heart-o'></i><span class='tooltipp'>add to wishlist</span></button>
											<button class='add-to-compare'><i class='fa fa-exchange'></i><span class='tooltipp'>add to compare</span></button>
											<button class='quick-view' ><i class='fa fa-eye'></i><span class='tooltipp'>quick view</span></button> -->
										</div>
									</div>
									<div class='add-to-cart'>
										<button pid='$pro_id' id='product' href='#' tabindex='0' class='add-to-cart-btn'><i class='fa fa-shopping-cart'></i> add to cart</button>
									</div>
								</div>
							</div>
			";
	}
}


if (isset($_POST["addToCart"])) {
	$p_id = $_POST["proId"];
	$qty = isset($_POST["qty"]) ? $_POST["qty"] : 1;

	// Check if the user is logged in
	if (isset($_SESSION["uid"])) {
		$user_id = $_SESSION["uid"];

		// Retrieve the available quantity of the product from the products table
		$sql_check_quantity = "SELECT product_quantity FROM products WHERE product_id = '$p_id'";
		$result = mysqli_query($con, $sql_check_quantity);
		$row = mysqli_fetch_assoc($result);
		$available_quantity = $row['product_quantity'];

		// Check if requested quantity exceeds available quantity
		if ($qty > $available_quantity) {
			echo "<div class='alert alert-danger'>
						<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>
						<b>Sorry, the requested quantity exceeds the available stock!</b>
					</div>";
		} else {
			// Proceed with adding the product to the cart
			$sql = "SELECT * FROM cart WHERE p_id = '$p_id' AND user_id = '$user_id'";
			$run_query = mysqli_query($con, $sql);
			$count = mysqli_num_rows($run_query);

			if ($count > 0) {
				echo "<div class='alert alert-warning'>
							<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>
							<b>Product is already added into the cart. Continue Shopping..!</b>
						</div>";
			} else {
				// Insert the product into the cart
				$sql_insert_cart = "INSERT INTO `cart` (`p_id`, `ip_add`, `user_id`, `qty`) 
										VALUES ('$p_id', '$ip_add', '$user_id', '$qty')";
				if (mysqli_query($con, $sql_insert_cart)) {
					// Decrement the product quantity in the products table
					$sql_update_product_quantity = "UPDATE products SET product_quantity = product_quantity - '$qty' WHERE product_id = '$p_id'";
					mysqli_query($con, $sql_update_product_quantity);

					// Remove the product from the wishlist
					$sql_delete_wishlist = "DELETE FROM wishlist WHERE p_id = '$p_id' AND user_id = '$user_id'";
					if (mysqli_query($con, $sql_delete_wishlist)) {
						echo "<div class='alert alert-success'>
									<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>
									<b>Product added to cart successfully!</b>
								</div>";
					}
				}
			}
		}
	} else {
		// For guests (not logged in)
		$ip_add = $_SERVER['REMOTE_ADDR'];

		// Insert the product into the cart
		$sql_insert_cart = "INSERT INTO `cart` (`p_id`, `ip_add`, `user_id`, `qty`) 
								VALUES ('$p_id', '$ip_add', '-1', '1')";
		if (mysqli_query($con, $sql_insert_cart)) {
			// Decrement the product quantity in the products table
			$sql_update_product_quantity = "UPDATE products SET product_quantity = product_quantity - 1 WHERE product_id = '$p_id'";
			mysqli_query($con, $sql_update_product_quantity);

			// Remove the product from the wishlist
			$sql_delete_wishlist = "DELETE FROM wishlist WHERE p_id = '$p_id' AND ip_add = '$ip_add'";
			if (mysqli_query($con, $sql_delete_wishlist)) {
				echo "<div class='alert alert-success'>
							<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>
							<b>Product added to cart successfully!</b>
						</div>";
			}
		}
	}
}



if (isset($_POST["addToWishlist"])) {


	$p_id = $_POST["proId"];


	if (isset($_SESSION["uid"])) {

		$user_id = $_SESSION["uid"];

		$sql = "SELECT * FROM wishlist WHERE p_id = '$p_id' AND user_id = '$user_id'";
		$run_query = mysqli_query($con, $sql);
		$count = mysqli_num_rows($run_query);
		if ($count > 0) {
			echo "
				<div class='alert alert-warning'>
						<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>
						<b>Product is already added into the wishlist Continue Shopping..!</b>
				</div>
			"; //not in video
		} else {
			$sql = "INSERT INTO `wishlist`
			(`p_id`, `ip_add`, `user_id`) 
			VALUES ('$p_id','$ip_add','$user_id')";
			if (mysqli_query($con, $sql)) {
				$sql = "DELETE FROM cart WHERE p_id = '$p_id' AND user_id = '$_SESSION[uid]'";

				if (mysqli_query($con, $sql)) {
					echo "<div class='alert alert-danger'>
									<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>
									<b>Product is removed from cart and added to wishlist</b>
							</div>";
				}
			}
		}
	} else {
		$sql = "SELECT id FROM wishlist WHERE ip_add = '$ip_add' AND p_id = '$p_id' AND user_id = -1";
		$query = mysqli_query($con, $sql);
		if (mysqli_num_rows($query) > 0) {
			echo "
					<div class='alert alert-warning'>
							<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>
							<b>Product is already added into the wishlist Continue Shopping..!</b>
					</div>";
			exit();
		}
		$sql = "INSERT INTO `wishlist`
			(`p_id`, `ip_add`, `user_id`) 
			VALUES ('$p_id','$ip_add','-1')";
		if (mysqli_query($con, $sql)) {
			$sql = "DELETE FROM cart WHERE p_id = '$p_id' AND ip_add = '$ip_add'";

			if (mysqli_query($con, $sql)) {
				echo "<div class='alert alert-danger'>
									<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>
									<b>Product is removed from cart and added to wishlist</b>
							</div>";
				exit();
			}
		}
	}
}
//Count User cart item
if (isset($_POST["count_item"])) {
	//When user is logged in then we will count number of item in cart by using user session id
	if (isset($_SESSION["uid"])) {
		$sql = "SELECT COUNT(*) AS count_item FROM cart WHERE user_id = $_SESSION[uid]";
	} else {
		//When user is not logged in then we will count number of item in cart by using users unique ip address
		$sql = "SELECT COUNT(*) AS count_item FROM cart WHERE ip_add = '$ip_add' AND user_id < 0";
	}
	$query = mysqli_query($con, $sql);
	$row = mysqli_fetch_array($query);
	echo $row["count_item"];
	exit();
}
//Count User cart item
if (isset($_POST["count_Wishlist_item"])) {
	//When user is logged in then we will count number of item in cart by using user session id
	if (isset($_SESSION["uid"])) {
		$sql = "SELECT COUNT(*) AS count_wishlist_item FROM wishlist WHERE user_id = $_SESSION[uid] AND p_id > 0";
	} else {
		//When user is not logged in then we will count number of item in cart by using users unique ip address
		$sql = "SELECT COUNT(*) AS count_wishlist_item FROM wishlist WHERE ip_add = '$ip_add' AND user_id < 0 AND p_id > 0";
	}
	$query = mysqli_query($con, $sql);
	$row = mysqli_fetch_array($query);
	echo $row["count_wishlist_item"];
	exit();
}
//Get Cart Item From Database to Dropdown menu
if (isset($_POST["Common"])) {

	if (isset($_SESSION["uid"])) {
		//When user is logged in this query will execute
		$sql = "SELECT a.product_id,a.product_title,a.product_price,a.product_desc,a.product_image,b.id,b.qty FROM products a,cart b WHERE a.product_id=b.p_id AND b.user_id='$_SESSION[uid]'";
	} else {
		//When user is not logged in this query will execute
		$sql = "SELECT a.product_id,a.product_title,a.product_price,a.product_image,a.product_desc,b.id,b.qty FROM products a,cart b WHERE a.product_id=b.p_id AND b.ip_add='$ip_add' AND b.user_id < 0";
	}
	$query = mysqli_query($con, $sql);
	if (isset($_POST["getCartItem"])) {
		//display cart item in dropdown menu
		if (mysqli_num_rows($query) > 0) {
			$n = 0;
			$total_price = 0;
			while ($row = mysqli_fetch_array($query)) {
				$n++;
				$product_id = $row["product_id"];
				$product_title = $row["product_title"];
				$product_price = $row["product_price"];
				$product_image = $row["product_image"];
				$cart_item_id = $row["id"];
				$qty = $row["qty"];
				$total_price = $total_price + ($product_price * $qty);
				echo '
					
                    
                    <div class="product-widget">
												<div class="product-img">
													<img src="product_images/' . $product_image . '" alt="">
												</div>
												<div class="product-body">
													<h3 class="product-name"><a href="#">' . $product_title . '</a></h3>
													<h4 class="product-price"><span class="qty">' . $qty . '</span> x Rs. ' . $product_price . '</h4>
												</div>
												
											</div>';
			}

			echo '<div class="cart-summary">
				    <small class="qty">' . $n . ' Item(s) selected</small>
				    <h5>Rs. ' . $total_price . '</h5>
				</div>'
?>
				
				
			<?php

			exit();
		}
	}



	if (isset($_POST["checkOutDetails"])) {
		if (mysqli_num_rows($query) > 0) {
			//display user cart item with "Ready to checkout" button if user is not login
			echo '<div class="main ">
			<div class="table-responsive">
			<form method="post" action="login_form.php">
			
	               <table id="cart" class="table table-hover table-condensed" id="">
    				<thead>
						<tr>
							<th style="width:50%">Product</th>
							<th style="width:10%">Price</th>
							<th style="width:8%">Quantity</th>
							<th style="width:7%" class="text-center">Subtotal</th>
							<th style="width:10%"></th>
						</tr>
					</thead>
					<tbody>
                    ';
			$n = 0;
			while ($row = mysqli_fetch_array($query)) {
				$n++;
				$product_id = $row["product_id"];
				$product_title = $row["product_title"];
				$product_price = $row["product_price"];
				$product_desc = $row["product_desc"];
				$product_image = $row["product_image"];
				$cart_item_id = $row["id"];
				$qty = $row["qty"];

				echo
				'
                             
						<tr>
							<td data-th="Product" >
								<div class="row">
								
									<div class="col-sm-4 "><img src="product_images/' . $product_image . '" style="height: 70px;width:75px;"/>
									<h4 class="nomargin product-name header-cart-item-name"><a href="product.php?p=' . $product_id . '">' . $product_title . '</a></h4>
									</div>
									<div class="col-sm-6">
										<div style="max-width=50px;">
										<p>' . $product_desc . '</p>
										</div>
									</div>
									
									
								</div>
							</td>
                            <input type="hidden" name="product_id[]" value="' . $product_id . '"/>
				            <input type="hidden" name="" value="' . $cart_item_id . '"/>
							<td data-th="Price"><input type="text" class="form-control price" value="' . $product_price . '" readonly="readonly"></td>
							<td data-th="Quantity">
								<input type="text" class="form-control qty" value="' . $qty . '" >
							</td>
							<td data-th="Subtotal" class="text-center"><input type="text" class="form-control total" value="' . ($product_price * $qty) . '" readonly="readonly"></td>
							<td class="actions" data-th="">
							<div class="btn-group">
								<a href="#" class="btn btn-info btn-sm update" update_id="' . $product_id . '"><i class="fa fa-refresh"></i></a>
								
								<a href="#" class="btn btn-danger btn-sm remove" remove_id="' . $product_id . '"><i class="fa fa-trash-o"></i></a>		
							</div>							
							</td>
							<td>
								<a href="#" id="wishlist" pid="' . $product_id . '" class="btn btn-warning">Move to Wishlist <i class="fa fa-angle-right"></i> </a>
							</td>
						</tr>
					
                            
                            ';
			}

			echo '</tbody>
				<tfoot>
					
					<tr>
						<td><a href="store.php" class="btn btn-warning"><i class="fa fa-angle-left"></i> Continue Shopping</a></td>
						<td colspan="2" class="hidden-xs"></td>
						<td class="hidden-xs text-center"><b class="net_total" ></b></td>
						<div id="issessionset"></div>
                        <td>
							
							';
			if (!isset($_SESSION["uid"])) {
				echo '
					
							<a href="signup_form.php" class="btn btn-success">Ready to Checkout</a></td>
								</tr>
							</tfoot>
				
							</table></div></div>';
			} else if (isset($_SESSION["uid"])) {
				//Paypal checkout form
				echo '
					</form>
					
						<form action="checkout.php" method="post">
							<input type="hidden" name="cmd" value="_cart">
							<input type="hidden" name="business" value="shoppingcart@support.com">
							<input type="hidden" name="upload" value="1">';

				$x = 0;
				$sql = "SELECT a.product_id,a.product_title,a.product_price,a.product_image,b.id,b.qty FROM products a,cart b WHERE a.product_id=b.p_id AND b.user_id='$_SESSION[uid]'";
				$query = mysqli_query($con, $sql);
				while ($row = mysqli_fetch_array($query)) {
					$x++;
					echo

					'<input type="hidden" name="total_count" value="' . $x . '">
									<input type="hidden" name="item_name_' . $x . '" value="' . $row["product_title"] . '">
								  	 <input type="hidden" name="item_number_' . $x . '" value="' . $x . '">
								     <input type="hidden" name="amount_' . $x . '" value="' . $row["product_price"] . '">
								     <input type="hidden" name="quantity_' . $x . '" value="' . $row["qty"] . '">';
				}

				echo
				'<input type="hidden" name="return" value="http://localhost/myfiles/public_html/payment_success.php"/>
					                <input type="hidden" name="notify_url" value="http://localhost/myfiles/public_html/payment_success.php">
									<input type="hidden" name="cancel_return" value="http://localhost/myfiles/public_html/cancel.php"/>
									<input type="hidden" name="currency_code" value="USD"/>
									<input type="hidden" name="custom" value="' . $_SESSION["uid"] . '"/>
									<input type="submit" id="submit" name="login_user_with_product" name="submit" class="btn btn-success" value="Ready to Checkout">
									</form></td>
									
									</tr>
									
									</tfoot>
									
							</table></div></div>    
								';
			}
		}
	}
}

if (isset($_POST["wishListCommon"])) {

	if (isset($_SESSION["uid"])) {
		//When user is logged in this query will execute
		$sql = "SELECT a.product_id,a.product_title,a.product_price,a.product_image,a.product_desc,b.id FROM products a,wishlist b WHERE a.product_id=b.p_id AND b.user_id='$_SESSION[uid]'";
	} else {
		//When user is not logged in this query will execute
		$sql = "SELECT a.product_id,a.product_title,a.product_price,a.product_image,a.product_desc,b.id FROM products a,wishlist b WHERE a.product_id=b.p_id AND b.ip_add='$ip_add' AND b.user_id < 0";
	}
	$query = mysqli_query($con, $sql);



	if (isset($_POST["wishlistDetails"])) {
		if (mysqli_num_rows($query) > 0) {
			//display user cart item with "Ready to checkout" button if user is not login
			echo '<div class="main ">
			<div class="table-responsive">
			<form method="post" action="login_form.php">
			
	               <table id="wishlist" class="table table-hover table-condensed" id="">
    				<thead>
						<tr>
							<th style="width:50%">Product</th>
							<th style="width:10%">Price</th>
							<th style="width:7%" class="text-center">Subtotal</th>
							<th style="width:10%"></th>
						</tr>
					</thead>
					<tbody>
                    ';
			$n = 0;
			while ($row = mysqli_fetch_array($query)) {
				$n++;
				$product_id = $row["product_id"];
				$product_title = $row["product_title"];
				$product_desc = $row["product_desc"];
				$product_price = $row["product_price"];
				$product_image = $row["product_image"];
				$wishlist_item_id = $row["id"];

				echo
				'
                             
						<tr>
							<td data-th="Product" >
								<div class="row">
								
									<div class="col-sm-4 "><img src="product_images/' . $product_image . '" style="height: 70px;width:75px;"/>
									<h4 class="nomargin product-name header-cart-item-name"><a href="product.php?p=' . $product_id . '">' . $product_title . '</a></h4>
									</div>
									<div class="col-sm-6">
										<div style="max-width=50px;">
										<p>' . $product_desc . '</p>
										</div>
									</div>
									
									
								</div>
							</td>
                            <input type="hidden" name="product_id[]" value="' . $product_id . '"/>
				            <input type="hidden" name="" value="' . $wishlist_item_id . '"/>
							<td data-th="Price"><input type="text" class="form-control price" value="' . $product_price . '" readonly="readonly"></td>
							
							<td data-th="Subtotal" class="text-center"><input type="text" class="form-control total" value="' . $product_price . '" readonly="readonly"></td>
							<td class="actions" data-th="">
							<div class="btn-group">
								
								<a href="#" class="btn btn-danger btn-sm wishlist-remove" remove_id="' . $product_id . '"><i class="fa fa-trash-o"></i></a>	
									
							</div>							
							</td>
							<td class="actions" data-th="">
							<a href="#" id="product" pid="' . $product_id . '" class="btn btn-success">Move to Cart</a>
							</td>
						</tr>
					
                            
                            ';
			}

			echo '</tbody>
				<tfoot>
					
					<tr>
						<td><a href="store.php" class="btn btn-warning"><i class="fa fa-angle-left"></i> Continue Shopping</a></td>
						<td colspan="2" class="hidden-xs"></td>
						<td class="hidden-xs text-center"><b class="net_total" ></b></td>
						</tfoot>
				
						</table></div></div>
							
							';
		}
	}
}
//Remove Item From cart
if (isset($_POST["removeItemFromCart"])) {
	$remove_id = $_POST["rid"];
	$qty = $_POST["qt_y"];
	if (isset($_SESSION["uid"])) {
		$sql = "DELETE FROM cart WHERE p_id = '$remove_id' AND user_id = '$_SESSION[uid]'";
		$sql_update_product_quantity = "UPDATE products SET product_quantity = product_quantity + '$qty' WHERE product_id = '$remove_id'";
		mysqli_query($con, $sql_update_product_quantity);
	} else {
		$sql = "DELETE FROM cart WHERE p_id = '$remove_id' AND ip_add = '$ip_add'";
		$sql_update_product_quantity = "UPDATE products SET product_quantity = product_quantity + '$qty' WHERE product_id = '$remove_id'";
		mysqli_query($con, $sql_update_product_quantity);
	}
	if (mysqli_query($con, $sql)) {
		echo "<div class='alert alert-danger'>
						<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>
						<b>Product is removed from cart</b>
				</div>";
		exit();
	}
}

if (isset($_POST["removeItemFromwishList"])) {
	$remove_id = $_POST["rid"];
	if (isset($_SESSION["uid"])) {
		$sql = "DELETE FROM wishlist WHERE p_id = '$remove_id' AND user_id = '$_SESSION[uid]'";
	} else {
		$sql = "DELETE FROM wishlist WHERE p_id = '$remove_id' AND ip_add = '$ip_add'";
	}
	if (mysqli_query($con, $sql)) {
		echo "<div class='alert alert-danger'>
						<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>
						<b>Product is removed from wishlist</b>
				</div>";
		exit();
	}
}

// Update Item From cart
if (isset($_POST["updateCartItem"])) {
	$update_id = $_POST["update_id"];
	$qty = $_POST["q_ty"];

	// Get the current stock quantity from the database
	$sql_stock = "SELECT product_quantity FROM products WHERE product_id  = '$update_id'";
	$result_stock = mysqli_query($con, $sql_stock);
	$row_stock = mysqli_fetch_assoc($result_stock);
	$product_quantity = $row_stock['product_quantity'];

	// Fetch the existing quantity from the cart
	if (isset($_SESSION["uid"])) {
		$sql_cart = "SELECT qty FROM cart WHERE p_id = '$update_id' AND user_id = '$_SESSION[uid]'";
	} else {
		$sql_cart = "SELECT qty FROM cart WHERE p_id = '$update_id' AND ip_add = '$ip_add'";
	}
	$result_cart = mysqli_query($con, $sql_cart);
	$row_cart = mysqli_fetch_assoc($result_cart);

	// Check if the requested quantity is available
	if ($qty <= $product_quantity) {
		if (isset($_SESSION["uid"])) {
			$sql = "UPDATE cart SET qty='$qty' WHERE p_id = '$update_id' AND user_id = '$_SESSION[uid]'";
		} else {
			$sql = "UPDATE cart SET qty='$qty' WHERE p_id = '$update_id' AND ip_add = '$ip_add'";
		}

		if (mysqli_query($con, $sql)) {
			// Update the stock quantity by adjusting it with the difference in quantity
			$new_product_quantity = $product_quantity + ($row_cart['qty'] - $qty);
			$sql_update_stock = "UPDATE products SET product_quantity = '$new_product_quantity' WHERE product_id = '$update_id'";
			mysqli_query($con, $sql_update_stock);

			echo "<div class='alert alert-info'> <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <b>Product is updated</b> </div>";
			exit();
		}
	} else {
		echo "<div class='alert alert-danger'> <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <b>Requested quantity is not available in stock</b> </div>";
	}
}





			?>






