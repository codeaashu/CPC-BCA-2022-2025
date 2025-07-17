<?php session_start();
error_reporting(0);
include_once('includes/config.php');
if(strlen( $_SESSION["aid"])==0)
{   
header('location:logout.php');
} else {

// Code for Take Action
if(isset($_POST['takeaction']))
{
    $oid=$_GET['orderid'];
    $status=$_POST['ostatus'];
    $remark=$_POST['remark'];
    $actionby=$_SESSION['aid'];
    $canceledBy='Admin';

    if($status=='Cancelled'):
   $query="insert into ordertrackhistory(orderId,status,remark,actionBy,canceledBy) values('$oid','$status','$remark','$actionby',' $canceledBy');";
   $query.="update orders set orderStatus='$status' where id='$oid'";
else:
  $query="insert into ordertrackhistory(orderId,status,remark,actionBy) values('$oid','$status','$remark','$actionby');";
   $query.="update orders set orderStatus='$status' where id='$oid'";
endif;    
$result = mysqli_multi_query($con, $query);
    if ($result) {
    
    echo '<script>alert("Action has been updated successfully")</script>';
    echo "<script>window.location.href ='all-orders.php'</script>";
  }
  else
    {
     echo '<script>alert("Something Went Wrong. Please try again.")</script>';
    }
}


?>
<!DOCTYPE html>
<html lang="en">
    <head>
      
        <title>Online Book Store | Order Details</title>
        <link href="https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css" rel="stylesheet" />
        <link href="css/styles.css" rel="stylesheet" />
        <script src="js/all.min.js" crossorigin="anonymous"></script>
    </head>
    <body class="sb-nav-fixed">
 <?php include_once('includes/header.php');?>
        <div id="layoutSidenav">
       <?php include_once('includes/sidebar.php');?>
            <div id="layoutSidenav_content">
                <main>
<tbody>
<?php 
$oid=$_GET['orderid'];
$query=mysqli_query($con,"SELECT orders.id,orderNumber,totalAmount,orderStatus,orderDate,users.contactno,orders.txnType,orders.txnNumber
,users.name,users.email,users.contactno,billingAddress,biilingCity,billingState,billingPincode,billingCountry,shippingAddress,shippingCity,shippingState,shippingPincode,shippingCountry
    FROM `orders` join users on users.id=orders.userId 
join addresses on addresses.id=orders.addressId
    where (orders.id='$oid')");
$cnt=1;
while($row=mysqli_fetch_array($query))
{
?>  

                        

                    <div class="container-fluid px-4" >
                        <h1 class="mt-4">#<?php echo htmlentities($row['orderNumber']);?> Details</h1>
                        <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-table me-1"></i>
                                Order Details
                            </div>
                            <div class="card-body" id="print">


                                <div class="row">
                                    <div class="col-5">
                                <table class="table table-bordered" border='1' width="100%">
                            
                                        <tr>
                                            <th colspan="2" style="text-align:center;">Order Details</th>
                                        </tr>
                                        <tr>
                                            <th>Order No.</th>
                                            <td><?php echo htmlentities($row['orderNumber']);?></td>
                                            </tr>
                                            <tr>
                                            <th>Order Amount</th>
                                            <td> <?php echo htmlentities($row['totalAmount']);?></td>
                                            </tr>
                                            <tr>
                                            <th>Order Date</th>
                                            <td><?php echo htmlentities($row['orderDate']);?></td>
                                        </tr>
                                        <tr>
                                            <th>Order Status</th>
                                               <td><?php $ostatus=$row['orderStatus'];
                                               if($ostatus==''):
                                                echo "Not Processed Yet";
                                            else:
                                                echo $ostatus;
                                            endif;

                                           ?></td>
                                           </tr>
                                             <tr>
                                            <th>Txn Type</th>
                                               <td><?php echo htmlentities($row['txnType']);?></td>
                                           </tr>
   <tr>
                                            <th>Txn Number</th>
                                               <td><?php echo htmlentities($row['txnNumber']);?></td>
                                           </tr>                   

                               
                                       
                                    </tbody>
                                </table></div>

<!--Cutomer /Users Details --->
 <div class="col-7" style="float:left;">
        <table class="table table-bordered" border="1" width="100%">
                                        <tr>
                                            <th colspan="2" style="text-align:center;">Customer/User Details</th>
                                        </tr>
                                        <tr>
                                            <th>Cutomer /User Name</th>
                                            <td><?php echo htmlentities($row['name']);?></td>
                                            </tr>
                                            <tr>
                                            <th>Email id </th>
                                            <td> <?php echo htmlentities($row['email']);?></td>
                                            </tr>
                                            <tr>
                                            <th>Contactno</th>
                                            <td><?php echo htmlentities($row['contactno']);?></td>
                                        </tr>
                                        <tr>
                                            <th>Billing Address</th>
                                               <td><?php echo htmlentities($row['billingAddress']);?><br />
                                                <?php echo htmlentities($row['biilingCity']);?>, <?php echo htmlentities($row['billingState']);?><br />
                                                <?php echo htmlentities($row['billingCountry']);?>-<?php echo htmlentities($row['billingPincode']);?>

                                               </td>
                                           </tr>
                                             <tr>
                                            <th>Shipping Address</th>
                                               <td><?php echo htmlentities($row['shippingAddress']);?><br />
                                            <?php echo htmlentities($row['shippingCity']);?>, <?php echo htmlentities($row['shippingState']);?><br />
                                                <?php echo htmlentities($row['shippingCountry']);?>-<?php echo htmlentities($row['shippingPincode']);?>
                                               </td>
                                           </tr>                  

                                    
                                        <?php $cnt=$cnt+1; } ?>
                                       
                                    </tbody>
                                </table></div>

<!-- Products / Item Details --->
 <div class="col-12">
        <table class="table table-bordered" border="1">
                                        <tr>
                                            <th colspan="6" style="text-align:center;">Products / Items Details</th>
                                        </tr>
                                        <tr>
                                            <th>Book</th>
                                            <th>Book Name</th>
                                            <th>Book Price </th>
                                            <th>Book Qty</th>
                                            <th>Total Amount</th>
                                            <th>Shipping Amount</th>
                                        </tr>
<?php 
$oid=$_GET['orderid'];
$query=mysqli_query($con,"SELECT tblbooks.id as pid,tblbooks.BookName,tblbooks.BookImage1,tblbooks.BookPriceAfterDiscount,tblbooks.shippingCharge, ordersdetails.quantity FROM `ordersdetails` 
JOIN orders on orders.orderNumber=ordersdetails.orderNumber
join tblbooks on tblbooks.id=ordersdetails.productId
    where (orders.id='$oid')");
$cnt=1;
while($row=mysqli_fetch_array($query))
{
?>  

             <tr>
                    <td><img src="productimages/<?php echo htmlentities($row['BookImage1']);?>" alt="<?php echo htmlentities($row['BookName']);?>" width="100" height="100"></td>
                    <td>
                       <a href="edit-book.php?id=<?php echo htmlentities($pd=$row['pid']);?>" target="_blank"><?php echo htmlentities($row['BookName']);?></a>
        </td>
<td><?php echo htmlentities($row['BookPriceAfterDiscount']);?></td>
                    <td><?php echo htmlentities($row['quantity']);?></td>
                     <td><?php echo htmlentities($totalamount=$row['quantity']*$row['BookPriceAfterDiscount']);?></td>
                        <td><?php echo htmlentities($tshipping=$row['shippingCharge']);?></td>
             
                </tr>
<?php 
$grandtotalamount+=$totalamount;
$grandtshipping+=$tshipping;
} ?>

<tr>
    <th colspan="4" style="text-align:right;">Sub-Total</th>
    <th><?php echo htmlentities(round($grandtotalamount,2));?></th>
    <th><?php echo htmlentities(round($grandtshipping,2));?></th>
</tr>
<tr>
    <th colspan="4" style="text-align:right;">Grand-Total</th>
    <th colspan="2" style="text-align:center;"><?php echo htmlentities(round($grandtotalamount+$grandtshipping,2));?></th>
</tr>
                                </table></div>

<!-- Order Track/Action History --->
<?php 
$query=mysqli_query($con,"SELECT remark,status,postingDate,tbladmin.username FROM `ordertrackhistory`
join tbladmin on tbladmin.id=ordertrackhistory.actionBy
    where (ordertrackhistory.orderId='$oid')");
$count=mysqli_num_rows($query);
if($count>0){
     ?>
 <div class="col-12">
        <table class="table table-bordered" border="1" width="100%">
                                        <tr>
                                            <th colspan="6" style="text-align:center;">Order History</th>
                                        </tr>
                                        <tr>
                                            <th>Remark</th>
                                            <th>Status</th>
                                            <th>Remark By </th>
                                            <th>Action Date</th>
                                        </tr>
<?php 
while($row=mysqli_fetch_array($query))
{
?>  

<tr>
<td><?php echo htmlentities($row['remark']);?></td>
<td><?php echo htmlentities($row['status']);?></td>
<td><?php echo htmlentities($row['username']);?></td>
<td><?php echo htmlentities($row['postingDate']);?></td>
             
</tr>
<?php } ?>

</table></div>
<?php } ?>



<?php if($ostatus==''|| $ostatus=='Packed' || $ostatus=='Dispatched' || $ostatus=='In Transit' || $ostatus=='Out For Delivery'): ?>
<div align="center"><button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Take Action</button>
</div>
<?php endif;?>


<div style="float:right;">
  <button class="btn btn-primary" style="cursor: pointer;"  OnClick="CallPrint(this.value)" >Print</button></div>
                            </div>
                            </div>
                        </div>
                    </div>
                </main>
<?php include_once('includes/footer.php');?>
                </footer>
            </div>
        </div>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
<form method="post" name="takeaction">

        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Update the Order Status</h5>
                <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
<p><select name="ostatus" class="form-control" required>
    <option value="">Select</option>
    <?php if($ostatus==''): ?>
        <option value="Cancelled">Cancel</option>
    <option value="Packed">Packed</option>
    <option value="Dispatched">Dispatched</option>
    <option value="In Transit">In Transit</option>
     <option value="Out For Delivery">Out For Delivery</option>
    <option value="Delivered">Delivered</option>
    <?php elseif($ostatus=='Packed'):?>
        <option value="Dispatched">Dispatched</option>
    <option value="In Transit">In Transit</option>
     <option value="Out For Delivery">Out For Delivery</option>
    <option value="Delivered">Delivered</option>
   <?php elseif($ostatus=='Dispatched'):?>
     <option value="In Transit">In Transit</option>
     <option value="Out For Delivery">Out For Delivery</option>
    <option value="Delivered">Delivered</option>
    <?php elseif($ostatus=='In Transit'):?>
     <option value="Out For Delivery">Out For Delivery</option>
    <option value="Delivered">Delivered</option>
    <?php elseif($ostatus=='Out For Delivery'):?>
        <option value="Delivered">Delivered</option>
        <?php endif;?>
</select></p>
<p>
<textarea class="form-control" required name="remark" placeholder="Remark"></textarea></p>
            </div>
            <div class="modal-footer"><button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Close</button>
                <button class="btn btn-primary" type="submit" name="takeaction">Save changes</button></div>
        </div>
    </form>
    </div>
</div>
</div>

        <script src="js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
        <script src="js/scripts.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/simple-datatables@latest" crossorigin="anonymous"></script>
        <script src="js/datatables-simple-demo.js"></script>
               <script>
function CallPrint(strid) {
var prtContent = document.getElementById("print");
var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
WinPrint.document.write(prtContent.innerHTML);
WinPrint.document.close();
WinPrint.focus();
WinPrint.print();
}

</script>
    </body>
</html>
<?php } ?>
