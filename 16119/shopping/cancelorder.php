<?php
session_start();
error_reporting(0);
include_once('includes/config.php');
if(isset($_POST['submit']))
  {
    
   $orderid=$_GET['oid'];
    $ressta="Cancelled";
    $remark=$_POST['restremark'];
    $canclbyuser='User';
 
  
    $query=mysqli_query($con,"insert into ordertrackhistory(orderId,remark,status,canceledBy) value('$orderid','$remark','$ressta','$canclbyuser')"); 
   $query=mysqli_query($con, "update   orders set orderStatus='$ressta' where id='$orderid'");
    if ($query) {
echo '<script>alert("Your order cancelled now.")</script>';
  }else{
echo '<script>alert("Something went wrong. Please try again.")</script>';
    }

  
}

 ?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title> Order Cancelation</title>
</head>
<body>

<div style="margin-left:50px;">
<?php  
$orderid=$_GET['oid'];
$query=mysqli_query($con,"select orderNumber,orderStatus from orders where id='$orderid'");
$num=mysqli_num_rows($query);
$cnt=1;
?>
<?php  
while ($row=mysqli_fetch_array($query)) {
  ?>
<table border="1"  cellpadding="10" style="border-collapse: collapse; border-spacing:0; width: 100%; text-align: center;">
  <tr align="center">
   <th colspan="4" >Cancel Order #<?php echo  $row['orderNumber'];?></th> 
  </tr>
  <tr>
<th>Order Number </th>
<th>Current Status </th>
</tr>

<tr> 
  <td><?php  echo $row['orderNumber'];?></td> 
   <td><?php  $status=$row['orderStatus'];
if($status==""){
  echo "Waiting for confirmation";
} else { 
echo $status;
}
?></td> 
</tr>
<?php 
} ?>

</table>
     <?php if($status=="" || $status=="Packed" || $status=="Dispatched" || $status=="In Transit") {?>
<form method="post">
      <table>
        <tr>
          <th>Reason for Cancel</th>
<td>    <textarea name="restremark" placeholder="" rows="12" cols="50" class="form-control wd-450" required="true"></textarea></td>
        </tr>
<tr>
  <td colspan="2" align="center"><button type="submit" name="submit" class="btn btn--box btn--small btn--blue btn--uppercase btn--weight">Update order</button></td>

</tr>
      </table>

</form>
    <?php } else { ?>
<?php if($status=='Cancelled'){?>
<p style="color:red; font-size:20px;"> Order already Cancelled. No need to cancel again.</p>
<?php } else { ?>
  <p style="color:red; font-size:20px;"> You can't cancel this. Order is Out For Delivery or delivered</p>

<?php }  } ?>
  
</div>

</body>
</html>

     