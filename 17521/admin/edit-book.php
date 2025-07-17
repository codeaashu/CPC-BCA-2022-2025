<?php session_start();
include_once('includes/config.php');
if(strlen( $_SESSION["aid"])==0)
{   
header('location:logout.php');
} else {
//For Adding Products
if(isset($_POST['submit']))
{

    $pid=intval($_GET['id']);
   $category=$_POST['category'];
    $subcat=$_POST['subcategory'];
    $bookname=$_POST['bookname'];
    $authorname=$_POST['authorname'];
    $publisher=$_POST['publisher'];
    $tenisbn=$_POST['tenisbn'];
    $thirteenisbn=$_POST['thirteenisbn'];
    $blangauge=$_POST['blangauge'];
    $bookpricebd=$_POST['bookpricebd'];
    $bookpricead=$_POST['bookpricead'];
    $bookdescription=addslashes($_POST['bookdescription']);
    $bookshippingcharge=$_POST['bookshippingcharge'];
    $bookavailability=$_POST['bookavailability'];
    $updatedby=$_SESSION['aid'];

$sql=mysqli_query($con,"update tblbooks set category='$category',subCategory='$subcat',BookName='$bookname',AuthorName='$authorname',Publisher='$publisher',TENISBN='$tenisbn',THIRTEENISBN='$thirteenisbn',BookLanguage='$blangauge',BookPriceAfterDiscount='$bookpricead',BookPriceBeforeDiscount='$bookpricebd',BookDescription='$bookdescription',shippingCharge='$bookshippingcharge',BookAvailability='$bookavailability',lastUpdatedBy='$updatedby' where id='$pid'");
echo "<script>alert('Product details updated successfully');</script>";
echo "<script>window.location.href='manage-books.php'</script>";
}
?>

<!DOCTYPE html>
<html lang="en">
    <head>
      
        <title>OBSMS | Edit Book</title>
        <link href="css/styles.css" rel="stylesheet" />
        <script src="js/all.min.js" crossorigin="anonymous"></script>
        <script src="js/jquery-3.5.1.min.js"></script>
   <script>
function getSubcat(val) {
    $.ajax({
    type: "POST",
    url: "get_subcat.php",
    data:'cat_id='+val,
    success: function(data){
        $("#subcategory").html(data);
    }
    });
}
</script>   

    </head>
    <body>
   <?php include_once('includes/header.php');?>
        <div id="layoutSidenav">
   <?php include_once('includes/sidebar.php');?>
            <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid px-4">
                        <h1 class="mt-4">Edit Book</h1>
                        <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item"><a href="dashboard.php">Dashboard</a></li>
                            <li class="breadcrumb-item active">Edit Book</li>
                        </ol>
                        <div class="card mb-4">
                            <div class="card-body">


<?php 
$pid=intval($_GET['id']);
$query=mysqli_query($con,"select tblbooks.id as pid,tblbooks.BookImage1,tblbooks.BookImage2,tblbooks.BookImage3,tblbooks.BookName,category.categoryName,subcategory.subcategoryName as subcatname,tblbooks.postingDate,tblbooks.updationDate,subcategory.id as subid,tbladmin.username,category.id as catid,tblbooks.Publisher,tblbooks.AuthorName,tblbooks.TENISBN,tblbooks.THIRTEENISBN,tblbooks.BookLanguage,tblbooks.BookPriceAfterDiscount,tblbooks.BookPriceBeforeDiscount,tblbooks.BookAvailability,tblbooks.BookDescription,tblbooks.shippingCharge from tblbooks join subcategory on tblbooks.subCategory=subcategory.id join category on tblbooks.category=category.id join tbladmin on tbladmin.id=tblbooks.addedBy where  tblbooks.id='$pid' order by pid desc");
while($row=mysqli_fetch_array($query))
{
?>                                 
<form  method="post" enctype="multipart/form-data">                                
<div class="row">
<div class="col-3">Category Name</div>
<div class="col-7">
<select name="category" id="category" class="form-control" onChange="getSubcat(this.value);" required>
<option value="<?php echo htmlentities($row['catid']);?>"><?php echo htmlentities($row['categoryName']);?></option> 
<?php $ret=mysqli_query($con,"select * from category");
while($result=mysqli_fetch_array($ret))
{?>

<option value="<?php echo $result['id'];?>"><?php echo $result['categoryName'];?></option>
<?php } ?>
</select>    
</div>
</div>

<div class="row" style="margin-top:1%;">
<div class="col-3">Sub Category name</div>
<div class="col-7"><select   name="subcategory"  id="subcategory" class="form-control" required>
    <option value="<?php echo htmlentities($row['subid']);?>"><?php echo htmlentities($row['subcatname']);?>
</select>
</div>
</div>

<div class="row" style="margin-top:1%;">
<div class="col-3">Book Name</div>
<div class="col-7"><input type="text"    name="bookname"  value="<?php echo htmlentities($row['BookName']);?>" class="form-control" required>
</select>
</div>
</div>

<div class="row" style="margin-top:1%;">
<div class="col-3">Author Name</div>
<div class="col-7"><input type="text"    name="authorname"  value="<?php echo htmlentities($row['AuthorName']);?>" class="form-control" required>

</div>
</div>

<div class="row" style="margin-top:1%;">
<div class="col-3">Publisher</div>
<div class="col-7"><input type="text"    name="publisher"  value="<?php echo htmlentities($row['Publisher']);?>" class="form-control" required>

</div>
</div>
<div class="row" style="margin-top:1%;">
<div class="col-3">10 ISBN</div>
<div class="col-7"><input type="text"    name="tenisbn"  value="<?php echo htmlentities($row['TENISBN']);?>" class="form-control" required>

</div>
</div>
<div class="row" style="margin-top:1%;">
<div class="col-3">13 ISBN</div>
<div class="col-7"><input type="text"    name="thirteenisbn"  value="<?php echo htmlentities($row['THIRTEENISBN']);?>" class="form-control" required>

</div>
</div>
<div class="row" style="margin-top:1%;">
<div class="col-3">Book Language</div>
<div class="col-7"><input type="text"    name="blangauge"  value="<?php echo htmlentities($row['BookLanguage']);?>" class="form-control" required>

</div>
</div>

<div class="row" style="margin-top:1%;">
<div class="col-3">Book Price Before Discount(Selling Price)</div>
<div class="col-7"><input type="text"    name="bookpricebd"  value="<?php echo htmlentities($row['BookPriceBeforeDiscount']);?>" class="form-control" required>

</div>
</div>
<div class="row" style="margin-top:1%;">
<div class="col-3">Book Price After Discount(Selling Price)</div>
<div class="col-7"><input type="text"    name="bookpricead"  value="<?php echo htmlentities($row['BookPriceAfterDiscount']);?>" class="form-control" required>

</div>
</div>

<div class="row" style="margin-top:1%;">
<div class="col-3">Book Description</div>
<div class="col-7"><textarea  name="bookdescription"  placeholder="Enter Book Description" rows="6" class="form-control"><?php echo htmlentities($row['BookDescription']);?></textarea>
</div>
</div>

<div class="row" style="margin-top:1%;">
<div class="col-3">Book Shipping Charge</div>
<div class="col-7"><input type="text"    name="bookshippingcharge"  value="<?php echo htmlentities($row['shippingCharge']);?>" class="form-control" required>

</div>
</div>



<div class="row" style="margin-top:1%;">
<div class="col-3">Product Availability</div>
<div class="col-7"><select   name="bookavailability"  id="bookavailability" class="form-control" required>
<?php $pa=$row['BookAvailability'];
if($pa=='In Stock'):
?>
<option value="In Stock">In Stock</option>
<option value="Out of Stock">Out of Stock</option>
<?php else: ?>
<option value="Out of Stock">Out of Stock</option>    
<option value="In Stock">In Stock</option>
<?php endif; ?>
</select>

</div>
</div>

<div class="row" style="margin-top:1%;">
<div class="col-3">Book Featured Image</div>
<div class="col-7"><img src="productimages/<?php echo htmlentities($row['BookImage1']);?>" width="250"><br />
    <a href="change-image1.php?id=<?php echo $row['pid'];?>">Change Image</a>
</div>
</div>

<div class="row" style="margin-top:1%;">
<div class="col-3">Book Image 2</div>
<div class="col-7"><img src="productimages/<?php echo htmlentities($row['BookImage2']);?>" width="250"><br />
    <a href="change-image2.php?id=<?php echo $row['pid'];?>">Change Image</a>
</div>
</div>


<div class="row" style="margin-top:1%;">
<div class="col-3">Book Image 3</div>
<div class="col-7"><img src="productimages/<?php echo htmlentities($row['BookImage3']);?>" width="250"><br />
    <a href="change-image3.php?id=<?php echo $row['pid'];?>">Change Image</a>
</div>
</div>

<div class="row" style="margin-top:1%">
    <div class="col-3">&nbsp;</div>
<div class="col-2"><button type="submit" name="submit" class="btn btn-primary">Update</button></div>
</div>

</form>
      
      <?php } ?>                      </div>
                        </div>
                    </div>
                </main>
          <?php include_once('includes/footer.php');?>
            </div>
        </div>
        <script src="js/bootstrap.bundle.min.js"></script>
        <script src="js/scripts.js"></script>
    </body>
</html>
<?php } ?>
