<?php session_start();
include_once('includes/config.php');
error_reporting(0);
if(strlen($_SESSION['id'])==0)
{   header('location:logout.php');
}else{
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Online Book Store||My Orders Details</title>
	
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
<script language="javascript" type="text/javascript">
var popUpWin=0;
function popUpWindow(URLStr, left, top, width, height)
{
 if(popUpWin)
{
if(!popUpWin.closed) popUpWin.close();
}
popUpWin = open(URLStr,'popUpWin', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no,copyhistory=yes,width='+600+',height='+600+',left='+left+', top='+top+',screenX='+left+',screenY='+top+'');
}

</script>
</head>
<body class="animsition">
	
	<!-- Header -->
<?php include_once('includes/header.php');?>
 <?php
$uid=$_SESSION['id'];
$orderno=intval($_GET['onumber']);
$ret=mysqli_query($con,"select *,orders.id as orderid from orders 
left join addresses on addresses.id=orders.addressId
    where orders.userId='$uid' and orders.orderNumber='$orderno'");
while ($row=mysqli_fetch_array($ret)) {?>

	<section class="bg-img1 txt-center p-lr-15 p-tb-92" style="background-image: url('images/bg-01.jpg');">
		<h2 class="ltext-105 cl0 txt-center" style="color:#000;">
			Orders Details : (<?php echo intval($_GET['onumber']);?>)
		</h2>
	</section>	
<hr>
		

	<!-- Product Detail -->
	<section class="sec-product-detail bg0 p-t-65 p-b-60">

	
		<div class="container">
			<div class="row">
				<div class="col-md-12 col-lg-12 p-b-100">
					<div class="p-l-25 p-r-30 p-lr-0-lg">
						<div class="wrap-slick3">
							<div class="wrap-slick3-dots"></div>
							<div class="wrap-slick3-arrows flex-sb-m flex-w"></div>

							<div>
								
         
           
           <table class="table table-bordered" border="1">
           
<tr>
    <th>Order Number</th>
    <td><?php echo htmlentities($row['orderNumber']);?></td>

    <th>Order Date</th>
    <td><?php echo htmlentities($row['orderDate']);?></td>
</tr>
<tr>
    <th>Total Amount</th>
    <td><?php echo htmlentities($row['totalAmount']);?></td>

    <th>Txn Type</th>
    <td><?php echo htmlentities($row['txnType']);?></td>
</tr>
<tr>
    <th>Txn Number</th>
    <td><?php echo htmlentities($row['txnNumber']);?></td>

    <th>Status</th>
    <td><?php $ostatus=$row['orderStatus'];
                    if( $ostatus==''): echo "Not Processed Yet";
                        else: echo $ostatus; endif;?>
                            <br />
<a href="javascript:void(0);" onClick="popUpWindow('track-order.php?oid=<?php echo $row['orderid'];?>');" title="Track order"> Track order
</a>

                        </td>
</tr>

<tr>
    <th>Billing Address</th>
    <td><address><?php echo htmlentities($row['billingAddress']);?><br />
<?php echo htmlentities($row['biilingCity']);?>,<?php echo htmlentities($row['billingState']);?><br />
<?php echo htmlentities($row['billingPincode']);?>, <?php echo htmlentities($row['billingCountry']);?>
</address>
    </td>

    <th>Shipping Address</th>
    <td><address><?php echo htmlentities($row['shippingAddress']);?><br />
<?php echo htmlentities($row['shippingCity']);?>,<?php echo htmlentities($row['shippingState']);?><br />
<?php echo htmlentities($row['shippingPincode']);?>, <?php echo htmlentities($row['shippingCountry']);?>
</address>
    </td>
</tr>
<tr><td colspan="2"><a href="javascript:void(0);" onClick="popUpWindow('cancelorder.php?oid=<?php echo $row['orderid'];?>');" title="Cancel Order" class="btn-upper btn btn-danger">Canel this Order
</a></td></tr>
    </table>
     
        <?php } ?>


    </div>


    <table class="table table-bordered">
            <thead>
                <tr>
                    <th colspan="4"><h4>Order Products / Items</h4></th>
                </tr>
            </thead>
            <tr>
                <thead>
                    <th>Book</th>
                    <th>Book Name</th>
                    <th>Book Price</th>
                    <th>Quantity</th>
                    <th>Total Amount</th>
                </thead>
            </tr>
            <tbody>
<?php
$ret=mysqli_query($con,"select tblbooks.BookName as pname,tblbooks.BookName as proid,tblbooks.BookImage1 as pimage,tblbooks.BookPriceAfterDiscount as pprice,ordersdetails.productId as pid,ordersdetails.id as cartid,tblbooks.BookPriceBeforeDiscount,ordersdetails.quantity from ordersdetails left join tblbooks on tblbooks.id=ordersdetails.productId where ordersdetails.userId='$uid'  and ordersdetails.orderNumber='$orderno'");
$num=mysqli_num_rows($ret);
    if($num>0)
    {
while ($row=mysqli_fetch_array($ret)) {

?>

                <tr>
                    <td class="col-md-2"><img src="admin/productimages/<?php echo htmlentities($row['pimage']);?>" alt="<?php echo htmlentities($row['pname']);?>" width="100" height="100"></td>
                    <td>
                       <a href="book-details.php?pid=<?php echo htmlentities($pd=$row['pid']);?>" target="_blank"><?php echo htmlentities($row['pname']);?></a></td>
<td>
                           <span  style="text-decoration: line-through;">
                           	$<?php echo htmlentities($row['BookPriceBeforeDiscount']);?></span>
                            <span>$<?php echo htmlentities($row['pprice']);?></span>
                    </td>
                    <td><?php echo htmlentities($row['quantity']);?></td>
                     <td><?php echo htmlentities($totalamount=$row['quantity']*$row['pprice']);?></td>
        
                </tr>
            
                <?php $grantotal+=$totalamount; } ?>
<tr>
    <th colspan="4">Grand Total</th>
    <th colspan="2"><?php echo $grantotal;?></th>
</tr>
                <?php } else{ ?>
                <tr>
                    <td style="font-size: 18px; font-weight:bold; color:red;">Invalid Request

                    </td>

                </tr>
                <?php } ?>
            </tbody>
        </table>
							</div>
						</div>
					</div>
				</div>
					
			
			</div>

		</div>

			

		
		
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
</html><?php } ?> 