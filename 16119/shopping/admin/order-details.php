
<?php
session_start();
include('include/config.php');
if(strlen($_SESSION['alogin'])==0)
	{	
header('location:index.php');
}
else{
date_default_timezone_set('Asia/Kolkata');// change according timezone
$currentTime = date( 'd-m-Y h:i:s A', time () );


?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Admin| Pending Orders</title>
	<link type="text/css" href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
	<link type="text/css" href="bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet">
	<link type="text/css" href="css/theme.css" rel="stylesheet">
	<link type="text/css" href="images/icons/css/font-awesome.css" rel="stylesheet">
	<link type="text/css" href='http://fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,400,600' rel='stylesheet'>
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
<body>
<?php include('include/header.php');?>

	<div class="wrapper">
		<div class="container">
			<div class="row">
<?php include('include/sidebar.php');?>				
			<div class="span9">
					<div class="content">

	<div class="module">
							<div class="module-head">
								<h3>Order Details #<?php echo intval($_GET['oid']);?></h3>
							</div>
							<div class="module-body table">


									<br />

					<div class="table-responsive">		
			<table cellpadding="0" cellspacing="0" border="0" class="datatable-1 table table-bordered table-striped	 display table-responsive" >
	
<tbody>
<?php 
$orderid=intval($_GET['oid']);
$query=mysqli_query($con,"select orders.id as oid,users.name as username,users.email as useremail,users.contactno as usercontact,users.shippingAddress as shippingaddress,users.shippingCity as shippingcity,users.shippingState as shippingstate,users.shippingPincode as shippingpincode,products.productName as productname,products.shippingCharge as shippingcharge,orders.quantity as quantity,orders.orderDate as orderdate,products.productPrice as productprice,billingAddress,billingState,billingCity,billingPincode,products.id as pid,productImage1,shippingcharge from orders join users on  orders.userId=users.id join products on products.id=orders.productId where orders.id='$orderid'");
$cnt=1;
while($row=mysqli_fetch_array($query))
{
?>										
										<tr>
											<th>Order Id</th>
											<td><?php echo htmlentities($row['oid']);?></td>
											<th>Order Date</th>
											<td><?php echo htmlentities($row['orderdate']);?></td>
										</tr>
										<tr>
											<th>Username</th>
											<td><?php echo htmlentities($row['username']);?></td>
											<th>User Contact Details</th>
											<td><?php echo htmlentities($row['useremail']);?>/<?php echo htmlentities($row['usercontact']);?></td>
										</tr>
										<tr>
										<th>User Shipping Details</th>
										
											<td><?php echo htmlentities($row['billingAddress'].",".$row['billingCity'].",".$row['billingState']."-".$row['shippingpincode']);?></td>

												<th>User Billing Details</th>
										
											<td><?php echo htmlentities($row['shippingaddress'].",".$row['shippingcity'].",".$row['shippingstate']."-".$row['billingPincode']);?></td>
										</tr>
										<tr>
											<th>Product Name</th>
											<td><?php echo htmlentities($row['productname']);?></td>
												<th>Product Image</th>
											<td><img src="productimages/<?php echo htmlentities($row['pid']."/".$row['productImage1']);?>" width="100"></td>
										</tr>
										<tr>
											<th>Product Quantity</th>
											<td><?php echo htmlentities($row['quantity']);?></td>
												<th>Product Price</th>
											<td><?php echo htmlentities($row['productprice']);?></td>
										</tr>
										<tr>
											<th>Shipping Charge</th>
										<td>	<?php echo htmlentities($row['shippingcharge']);?></td>
											<th>Grand Total</th>
											<td><?php echo htmlentities($row['quantity']*$row['productprice']+$row['shippingcharge']);?></td>
										</tr>

										</tbody>
								</table>
								<?php $cnt=$cnt+1; } ?>

<?php 
$ret = mysqli_query($con,"SELECT * FROM ordertrackhistory WHERE orderId='$orderid'");
$count=mysqli_num_rows($ret);

?>

			<table cellpadding="0" cellspacing="0" border="0" class="table table-bordered table-striped" style="margin-top:1%;" >
<?php if($count>0){ ?>
	<tr>
		<th colspan="4" style="color:blue; font-size:16px; text-align:center;">Order History</th>
	</tr>
	<tr>
		<th>Remark</th>
		<th>Status</th>
		<th>Date</th>
	</tr>
<?php while($row=mysqli_fetch_array($ret)){?>
		
    
      <tr>
      <td><?php echo $row['remark'];?></td>
      <td><?php echo $row['status'];?></td>
      <td><?php echo $row['postingDate'];?></td>
    </tr>
   
   <?php }} ?>



										<tr>
											<td colspan="4">    <a href="updateorder.php?oid=<?php echo htmlentities($orderid);?>" title="Update order" target="_blank" class="btn btn-primary">Take Action</a>
											</td>
											</tr>
										</table>

										
							</div>
							</div>
						</div>						

						
						
					</div><!--/.content-->
				</div><!--/.span9-->
			</div>
		</div><!--/.container-->
	</div><!--/.wrapper-->

<?php include('include/footer.php');?>

	<script src="scripts/jquery-1.9.1.min.js" type="text/javascript"></script>
	<script src="scripts/jquery-ui-1.10.1.custom.min.js" type="text/javascript"></script>
	<script src="bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script src="scripts/flot/jquery.flot.js" type="text/javascript"></script>
	<script src="scripts/datatables/jquery.dataTables.js"></script>
	<script>
		$(document).ready(function() {
			$('.datatable-1').dataTable();
			$('.dataTables_paginate').addClass("btn-group datatable-pagination");
			$('.dataTables_paginate > a').wrapInner('<span />');
			$('.dataTables_paginate > a:first-child').append('<i class="icon-chevron-left shaded"></i>');
			$('.dataTables_paginate > a:last-child').append('<i class="icon-chevron-right shaded"></i>');
		} );
	</script>
</body>
<?php } ?>