<?php session_start();
include_once('includes/config.php');
error_reporting(0);

//Code for Wish List
$pid=intval($_GET['pid']);
if(isset($_POST['wishlist'])){
if(strlen($_SESSION['id'])==0)
{   
echo "<script>alert('Login is required to wishlist a product');</script>";
} else{
$userid=$_SESSION['id'];    
$query=mysqli_query($con,"select id from wishlist where userId='$userid' and productId='$pid'");
$count=mysqli_num_rows($query);
if($count==0){
mysqli_query($con,"insert into wishlist(userId,productId) values('$userid','$pid')");
echo "<script>alert('Product aaded in wishlist');</script>";
  echo "<script type='text/javascript'> document.location ='my-wishlist.php'; </script>";
} else { 
echo "<script>alert('This product is already added in your wishlist.');</script>";
}
}}

//Code for Adding Product in to Cart
if(isset($_POST['addtocart'])){
if(strlen($_SESSION['id'])==0)
{   
echo "<script>alert('Login is required to add a product in to the cart');</script>";
} else{
$userid=$_SESSION['id']; 
$pqty=$_POST['inputQuantity'];  
$query=mysqli_query($con,"select id,productQty from cart where userId='$userid' and productId='$pid'");
$count=mysqli_num_rows($query);
if($count==0){
mysqli_query($con,"insert into cart(userId,productId,productQty) values('$userid','$pid','$pqty')");
echo "<script>alert('Product aaded in cart');</script>";
  echo "<script type='text/javascript'> document.location ='my-cart.php'; </script>";
} else { 
$row=mysqli_fetch_array($query);
$currentpqty=$row['productQty'];
$productqty=$pqty+$currentpqty;
mysqli_query($con,"update cart set productQty='$productqty' where userId='$userid' and productId='$pid'");
echo "<script>alert('Product aaded in cart');</script>";
  echo "<script type='text/javascript'> document.location ='my-cart.php'; </script>";
}
}}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Online Book Store||Book Detail</title>
	
	<link rel="stylesheet" type="text/css" href="vendor/bootstrap/css/bootstrap.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="fonts/iconic/css/material-design-iconic-font.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="fonts/linearicons-v1.0.0/icon-font.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/animate/animate.css">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="vendor/css-hamburgers/hamburgers.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/animsition/css/animsition.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/select2/select2.min.css">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="vendor/daterangepicker/daterangepicker.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/slick/slick.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/MagnificPopup/magnific-popup.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/perfect-scrollbar/perfect-scrollbar.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="css/util.css">
	<link rel="stylesheet" type="text/css" href="css/main.css">
<!--===============================================================================================-->
</head>
<body class="animsition">
	
	<!-- Header -->
<?php include_once('includes/header.php');?>

	
<section class="bg-img1 txt-center p-lr-15 p-tb-92" style="background-image: url('images/bg-01.jpg');">
		<h2 class="ltext-105 cl0 txt-center">
			Single Book Details
		</h2>
	</section>	
<hr>
		

	<!-- Product Detail -->
	<section class="sec-product-detail bg0 p-t-65 p-b-60">
		<?php 
$pid=intval($_GET['pid']);
$query=mysqli_query($con,"select tblbooks.id as pid,tblbooks.BookImage1,tblbooks.BookImage2,tblbooks.BookImage3,tblbooks.BookName,category.categoryName,subcategory.subcategoryName as subcatname,tblbooks.postingDate,tblbooks.updationDate,subcategory.id as subid,tbladmin.username,category.id as catid,tblbooks.Publisher,tblbooks.AuthorName,tblbooks.TENISBN,tblbooks.THIRTEENISBN,tblbooks.BookLanguage,tblbooks.BookPriceAfterDiscount,tblbooks.BookPriceBeforeDiscount,tblbooks.BookAvailability,tblbooks.BookDescription,tblbooks.shippingCharge from tblbooks join subcategory on tblbooks.subCategory=subcategory.id join category on tblbooks.category=category.id join tbladmin on tbladmin.id=tblbooks.addedBy where  tblbooks.id='$pid'");
while($row=mysqli_fetch_array($query))
{
?>
		<form name="productdetails" method="post">
		<div class="container">
			<div class="row">
				<div class="col-md-6 col-lg-7 p-b-30">
					<div class="p-l-25 p-r-30 p-lr-0-lg">
						<div class="wrap-slick3 flex-sb flex-w">
							<div class="wrap-slick3-dots"></div>
							<div class="wrap-slick3-arrows flex-sb-m flex-w"></div>

							<div class="slick3 gallery-lb">
								<div  data-thumb="admin/productimages/<?php echo htmlentities($row['BookImage1']);?>">
									<div class="wrap-pic-w pos-relative">
										<img src="admin/productimages/<?php echo htmlentities($row['BookImage1']);?>" alt="IMG-PRODUCT">

										<a class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href="admin/productimages/<?php echo htmlentities($row['BookImage1']);?>">
											<i class="fa fa-expand"></i>
										</a>
									</div>
								</div>

								<div  data-thumb="admin/productimages/<?php echo htmlentities($row['BookImage2']);?>">
									<div class="wrap-pic-w pos-relative">
										<img src="admin/productimages/<?php echo htmlentities($row['BookImage2']);?>" alt="IMG-PRODUCT">

										<a class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href="admin/productimages/<?php echo htmlentities($row['BookImage2']);?>">
											<i class="fa fa-expand"></i>
										</a>
									</div>
								</div>

								<div class="item-slick3" data-thumb="admin/productimages/<?php echo htmlentities($row['BookImage3']);?>">
									<div class="wrap-pic-w pos-relative">
										<img src="admin/productimages/<?php echo htmlentities($row['BookImage3']);?>" alt="IMG-PRODUCT">

										<a class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href="admin/productimages/<?php echo htmlentities($row['BookImage3']);?>">
											<i class="fa fa-expand"></i>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
					
				<div class="col-md-6 col-lg-5 p-b-30">
					<div class="p-r-50 p-t-5 p-lr-0-lg">
						<h4 class="mtext-105 cl2 js-name-detail p-b-14">
							<?php echo htmlentities($row['BookName']);?>

						</h4>
						<small><?php echo htmlentities($row['AuthorName']);?></small>
						<br>

						<span class="mtext-106 cl2">
<span  style="text-decoration: line-through;">
							$<?php echo htmlentities($row['BookPriceBeforeDiscount']);?></span> - $<?php echo htmlentities($row['BookPriceAfterDiscount']);?>

						</span>
						<br />
<span>
	<b>Shipping Charge:</b> <?php echo htmlentities($row['shippingCharge']);?>
</span>
						<p class="stext-102 cl3 p-t-23">
							<?php echo htmlentities($row['BookDescription']);?>
						</p>
						
						<!--  -->
						<div class="p-t-33">

							<div class="flex-w flex-r-m p-b-10">
								<div class="size-204 flex-w flex-m respon6-next">
									<div class="wrap-num-product flex-w m-r-20 m-tb-10">
										<div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
											<i class="fs-16 zmdi zmdi-minus"></i>
										</div>
<?php if($row['BookAvailability']=='In Stock'):?>
										<input class="mtext-104 cl3 txt-center num-product"  id="inputQuantity" name="inputQuantity" type="num" value="1">

										<div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
											<i class="fs-16 zmdi zmdi-plus"></i>
										</div>
									</div>

									

									<button  type="submit" name="wishlist" class="btn btn-primary">
										Wishlist
									</button><button   class="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail" type="submit" name="addtocart">
										Add to cart
									</button>

<?php else: ?>
    <h5 style="color:red;">Out of Stock</h5>
      <button class="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail" type="submit" name="wishlist">
                                <i class="bi bi-heart"></i>
                               Wishlist
                            </button>
<?php endif;?>  

								</div>
							</div>	
						</div>

					
					</div>
				</div>
			</div>

			<div class="bor10 m-t-50 p-t-43 p-b-40">
				<!-- Tab01 -->
				<div class="tab01">
					<!-- Nav tabs -->
					<ul class="nav nav-tabs" role="tablist">
						<li class="nav-item p-b-10">
							<a class="nav-link active" data-toggle="tab" href="#description" role="tab">Description</a>
						</li>

						<li class="nav-item p-b-10">
							<a class="nav-link" data-toggle="tab" href="#information" role="tab">Additional information</a>
						</li>

					</ul>

					<!-- Tab panes -->
					<div class="tab-content p-t-43">
						<!-- - -->
						<div class="tab-pane fade show active" id="description" role="tabpanel">
							<div class="how-pos2 p-lr-15-md">
								<p class="stext-102 cl6">
									<?php echo htmlentities($row['BookDescription']);?>
								</p>
							</div>
						</div>

						<!-- - -->
						<div class="tab-pane fade" id="information" role="tabpanel">
							<div class="row">
								<div class="col-sm-10 col-md-8 col-lg-6 m-lr-auto">

    <table class="table table-bordered">

<tr>
	<th>Category</th>
	<td><?php echo htmlentities($row['categoryName']);?></td>
</tr>


<tr>
	<th>Sub-Category</th>
	<td><?php echo htmlentities($row['subcatname']);?></td>
</tr>

<tr>
	<th>10ISBN</th>
	<td><?php echo htmlentities($row['TENISBN']);?></td>
</tr>

<tr>
	<th>13ISBN</th>
	<td><?php echo htmlentities($row['THIRTEENISBN']);?></td>
</tr>

<tr>
	<th>Language</th>
	<td><?php echo htmlentities($row['BookLanguage']);?></td>
</tr>


<tr>
	<th>Publisher</th>
	<td><?php echo htmlentities($row['Publisher']);?></td>
</tr>


<tr>
	<th>Author Name</th>
	<td><?php echo htmlentities($row['AuthorName']);?></td>
</tr>
    </table>


								
								</div>
							</div>
						</div>

						<!-- - -->
					
					</div>
				</div>
			</div>
		</div>

		<div class="bg6 flex-c-m flex-w size-302 m-t-73 p-tb-15">
			

			<span class="stext-107 cl6 p-lr-25">
				Categories: <?php echo htmlentities($row['categoryName']);?>
			</span>
			<span class="stext-107 cl6 p-lr-25">
				Subcategory: <?php echo htmlentities($row['subcatname']);?>
			</span>
		</form></div><?php } ?> 
	</section>


	
		

	<?php include_once('includes/footer.php'); ?>


<!--===============================================================================================-->	
	<script src="vendor/jquery/jquery-3.2.1.min.js"></script>
<!--===============================================================================================-->
	<script src="vendor/animsition/js/animsition.min.js"></script>
<!--===============================================================================================-->
	<script src="vendor/bootstrap/js/popper.js"></script>
	<script src="vendor/bootstrap/js/bootstrap.min.js"></script>
<!--===============================================================================================-->
	<script src="vendor/select2/select2.min.js"></script>
	<script>
		$(".js-select2").each(function(){
			$(this).select2({
				minimumResultsForSearch: 20,
				dropdownParent: $(this).next('.dropDownSelect2')
			});
		})
	</script>
<!--===============================================================================================-->
	<script src="vendor/daterangepicker/moment.min.js"></script>
	<script src="vendor/daterangepicker/daterangepicker.js"></script>
<!--===============================================================================================-->
	<script src="vendor/slick/slick.min.js"></script>
	<script src="js/slick-custom.js"></script>
<!--===============================================================================================-->
	<script src="vendor/parallax100/parallax100.js"></script>
	<script>
        $('.parallax100').parallax100();
	</script>
<!--===============================================================================================-->
	<script src="vendor/MagnificPopup/jquery.magnific-popup.min.js"></script>
	<script>
		$('.gallery-lb').each(function() { // the containers for all your galleries
			$(this).magnificPopup({
		        delegate: 'a', // the selector for gallery item
		        type: 'image',
		        gallery: {
		        	enabled:true
		        },
		        mainClass: 'mfp-fade'
		    });
		});
	</script>
<!--===============================================================================================-->
	<script src="vendor/isotope/isotope.pkgd.min.js"></script>
<!--===============================================================================================-->
	<script src="vendor/sweetalert/sweetalert.min.js"></script>
	<script>
		$('.js-addwish-b2, .js-addwish-detail').on('click', function(e){
			e.preventDefault();
		});

		$('.js-addwish-b2').each(function(){
			var nameProduct = $(this).parent().parent().find('.js-name-b2').html();
			$(this).on('click', function(){
				swal(nameProduct, "is added to wishlist !", "success");

				$(this).addClass('js-addedwish-b2');
				$(this).off('click');
			});
		});

		$('.js-addwish-detail').each(function(){
			var nameProduct = $(this).parent().parent().parent().find('.js-name-detail').html();

			$(this).on('click', function(){
				swal(nameProduct, "is added to wishlist !", "success");

				$(this).addClass('js-addedwish-detail');
				$(this).off('click');
			});
		});

		/*---------------------------------------------*/

		$('.js-addcart-detail').each(function(){
			var nameProduct = $(this).parent().parent().parent().parent().find('.js-name-detail').html();
			$(this).on('click', function(){
				swal(nameProduct, "is added to cart !", "success");
			});
		});
	
	</script>
<!--===============================================================================================-->
	<script src="vendor/perfect-scrollbar/perfect-scrollbar.min.js"></script>
	<script>
		$('.js-pscroll').each(function(){
			$(this).css('position','relative');
			$(this).css('overflow','hidden');
			var ps = new PerfectScrollbar(this, {
				wheelSpeed: 1,
				scrollingThreshold: 1000,
				wheelPropagation: false,
			});

			$(window).on('resize', function(){
				ps.update();
			})
		});
	</script>
<!--===============================================================================================-->
	<script src="js/main.js"></script>

</body>
</html>