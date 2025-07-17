<?php session_start();
include_once('includes/config.php');
if(strlen( $_SESSION["aid"])==0)
{   
header('location:logout.php');
} else {

//For Adding Products
if(isset($_POST['submit']))
{
    $category=$_POST['category'];
    $subcat=$_POST['subcategory'];
    $bookname=$_POST['bookname'];
    $authorname=$_POST['authorname'];
    $publisher=$_POST['publisher'];
    $tenisbn=$_POST['tenisbn'];
    $thirteenisbn=$_POST['thirteenisbn'];
    $blangauge=$_POST['blangauge'];
    $bookpricebd=$_POST['bookpricebd'];
    $bookprice=$_POST['bookprice'];
    $bookdescription=$_POST['bookdescription'];
    $bookshippingcharge=$_POST['bookshippingcharge'];
    $bookavailability=$_POST['bookavailability'];
    $bookimage1=$_FILES["bookimage1"]["name"];
    $bookimage2=$_FILES["bookimage2"]["name"];
    $bookimage3=$_FILES["bookimage3"]["name"];
$extension1 = substr($bookimage1,strlen($bookimage1)-4,strlen($bookimage1));
$extension2 = substr($bookimage2,strlen($bookimage2)-4,strlen($bookimage2));
$extension3 = substr($bookimage3,strlen($bookimage3)-4,strlen($bookimage3));
//Renaming the  image file
$imgnewfile1=md5($bookimage1.time()).$extension1;
$imgnewfile2=md5($bookimage2.time()).$extension2;
$imgnewfile3=md5($bookimage3.time()).$extension3;
$addedby=$_SESSION['aid'];


    move_uploaded_file($_FILES["bookimage1"]["tmp_name"],"productimages/".$imgnewfile1);
    move_uploaded_file($_FILES["bookimage2"]["tmp_name"],"productimages/".$imgnewfile2);
    move_uploaded_file($_FILES["bookimage3"]["tmp_name"],"productimages/".$imgnewfile3);
$sql=mysqli_query($con,"insert into products(Category,SubCategory,BookName,AuthorName,Publisher,TENISBN,THIRTEENISBN,BookLanguage,BookPrice,BookPriceBeforeDiscount,BookDescription,shippingCharge,BookAvailability,BookImage1,BookImage2,BookImage3,addedBy) values('$category','$subcat','$bookname','$authorname','$publisher','$tenisbn','$thirteenisbn','$blangauge','$bookprice','$bookpricebd','$bookdescription','$bookshippingcharge','$bookavailability','$imgnewfile1','$imgnewfile2','$imgnewfile3','$addedby')");
echo "<script>alert('Book Added added successfully');</script>";
echo "<script>window.location.href='manage-subcategories.php'</script>";
}








?>

<!DOCTYPE html>
<html lang="en">
    <head>
      
        <title>OBSMS | Add Books</title>
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
                        <h1 class="mt-4">Add Product</h1>
                        <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item"><a href="dashboard.php">Dashboard</a></li>
                            <li class="breadcrumb-item active">Add Product</li>
                        </ol>
                        <div class="card mb-4">
                            <div class="card-body">
<form  method="post" enctype="multipart/form-data">                                
<div class="row">
<div class="col-2">Category Name</div>
<div class="col-4">
<select name="category" id="category" class="form-control" onChange="getSubcat(this.value);" required>
<option value="">Select Category</option> 
<?php $query=mysqli_query($con,"select * from category");
while($row=mysqli_fetch_array($query))
{?>

<option value="<?php echo $row['id'];?>"><?php echo $row['categoryName'];?></option>
<?php } ?>
</select>    
</div>
</div>

<div class="row" style="margin-top:1%;">
<div class="col-2">Sub Category name</div>
<div class="col-4"><select   name="subcategory"  id="subcategory" class="form-control" required>
</select>
</div>
</div>

<div class="row" style="margin-top:1%;">
<div class="col-2">Book Name</div>
<div class="col-4"><input type="text"    name="bookname"  placeholder="Enter Book Name" class="form-control" required>

</div>
</div>
<div class="row" style="margin-top:1%;">
<div class="col-2">Author Name</div>
<div class="col-4"><input type="text"    name="authorname"  placeholder="Enter Author Name" class="form-control" required>

</div>
</div>

<div class="row" style="margin-top:1%;">
<div class="col-2">Publisher</div>
<div class="col-4"><input type="text"    name="publisher"  placeholder="Enter Publisher" class="form-control" required>

</div>
</div>
<div class="row" style="margin-top:1%;">
<div class="col-2">10 ISBN</div>
<div class="col-4"><input type="text"    name="tenisbn"  placeholder="Enter 10 Digit ISBN number" class="form-control" required>

</div>
</div>
<div class="row" style="margin-top:1%;">
<div class="col-2">13 ISBN</div>
<div class="col-4"><input type="text"    name="thirteenisbn"  placeholder="Enter 13 Digit ISBN number" class="form-control" required>

</div>
</div>
<div class="row" style="margin-top:1%;">
<div class="col-2">Book Language</div>
<div class="col-4"><input type="text"    name="blangauge"  placeholder="Enter Book Language" class="form-control" required>

</div>
</div>

<div class="row" style="margin-top:1%;">
<div class="col-2">Book Price Before Discount</div>
<div class="col-4"><input type="text"    name="bookpricebd"  placeholder="Enter Book Price" class="form-control" required>

</div>
</div>

<div class="row" style="margin-top:1%;">
<div class="col-2">Book Price After Discount(Selling Price)</div>
<div class="col-4"><input type="text"    name="bookprice"  placeholder="Enter Book Price" class="form-control" required>

</div>
</div>

<div class="row" style="margin-top:1%;">
<div class="col-2">Book Description</div>
<div class="col-4"><textarea  name="bookdescription"  placeholder="Enter Book Description" rows="6" class="form-control"></textarea>
</div>
</div>

<div class="row" style="margin-top:1%;">
<div class="col-2">Book Shipping Charge</div>
<div class="col-4"><input type="text"    name="bookshippingcharge"  placeholder="Enter Book Shipping Charge" class="form-control" required>
</select>
</div>
</div>

<div class="row" style="margin-top:1%;">
<div class="col-2">Book Availability</div>
<div class="col-4"><select   name="bookavailability"  id="bookavailability" class="form-control" required>
<option value="">Select</option>
<option value="In Stock">In Stock</option>
<option value="Out of Stock">Out of Stock</option>
</select>

</div>
</div>

<div class="row" style="margin-top:1%;">
<div class="col-2">Book Featured Image</div>
<div class="col-4"><input type="file" name="bookimage1" id="bookimage1"  class="form-control" accept="image/*" title="Accept images only" required>
</div>
</div>

<div class="row" style="margin-top:1%;">
<div class="col-2">Book Image 2</div>
<div class="col-4"><input type="file" name="bookimage2"  class="form-control" accept="image/*" title="Accept images only" required>
</div>
</div>


<div class="row" style="margin-top:1%;">
<div class="col-2">Book Image 3</div>
<div class="col-4"><input type="file" name="bookimage3"  class="form-control" accept="image/*" title="Accept images only" required>
</div>
</div>

<div class="row">
<div class="col-2"><button type="submit" name="submit" class="btn btn-primary">Submit</button></div>
</div>

</form>
                            </div>
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
