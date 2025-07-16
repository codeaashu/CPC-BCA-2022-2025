<?php
session_start();
include("../../db.php");

if(isset($_POST['btn_save'])) {
    $product_name = trim($_POST['product_name']);
    $details = trim($_POST['details']);
    $price = trim($_POST['price']);
    $c_price = trim($_POST['c_price']);
    $product_type = trim($_POST['product_type']);
    $brand = trim($_POST['brand']);
    $tags = trim($_POST['tags']);
    $quantity = trim($_POST['quantity']);

    //picture coding
    $picture_name = $_FILES['picture']['name'];
    $picture_type = $_FILES['picture']['type'];
    $picture_tmp_name = $_FILES['picture']['tmp_name'];
    $picture_size = $_FILES['picture']['size'];

    $errors = array();
    if(empty($product_name)) $errors[] = "Product name is required.";
    if(empty($details)) $errors[] = "Product description is required.";
    if(empty($price) || !is_numeric($price) || $price <= 0) $errors[] = "Valid price is required.";
    if(empty($quantity) || !is_numeric($quantity) || $quantity < 0) $errors[] = "Valid quantity is required.";
    if(empty($product_type) || !is_numeric($product_type)) $errors[] = "Valid product category is required.";
    if(empty($brand) || !is_numeric($brand)) $errors[] = "Valid product brand is required.";
    if(empty($tags)) $errors[] = "Product keywords are required.";
    if(empty($picture_name)) $errors[] = "Product image is required.";
    $allowed_types = array('image/jpeg', 'image/jpg', 'image/png', 'image/gif');
    if(!in_array($picture_type, $allowed_types)) $errors[] = "Invalid image type. Allowed: jpeg, jpg, png, gif.";
    if($picture_size > 50000000) $errors[] = "Image size must be less than 50MB.";
    if(count($errors) > 0) {
        foreach($errors as $error) {
            echo "<div class='alert alert-danger'><b>$error</b></div>";
        }
        exit();
    }

    $pic_name=time()."_".$picture_name;
    move_uploaded_file($picture_tmp_name,"../../product_images/".$pic_name);

    // Insert product
    $insert_query = "INSERT INTO products (product_cat, product_brand, product_title, product_price, product_desc, product_image, product_keywords, product_quantity)
                                VALUES ('$product_type','$brand','$product_name','$price','$details','$pic_name','$tags','$quantity')";
    mysqli_query($con, $insert_query) or die ("Insertion query incorrect");

    header("location: sumit_form.php?success=1");
    mysqli_close($con);
}
include "sidenav.php";
include "topheader.php";
?>

<!-- End Navbar -->
<div class="content">
    <div class="container-fluid">
        <form action="" method="post" type="form" name="form" enctype="multipart/form-data">
            <div class="row">
                <div class="col-md-7">
                    <div class="card">
                        <div class="card-header card-header-primary">
                            <h5 class="title">Add Product</h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Product Title</label>
                                        <input type="text" id="product_name" required name="product_name" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="">
                                        <label for="">Add Image</label>
                                        <input type="file" name="picture" required class="btn btn-fill btn-success" id="picture" >
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Description</label>
                                        <textarea rows="4" cols="80" id="details" required name="details" class="form-control"></textarea>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Pricing</label>
                                        <input type="text" id="price" name="price" required class="form-control" >
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Quantity</label> <!-- Added field for product quantity -->
                                        <input type="number" id="quantity" name="quantity" required class="form-control" >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-header card-header-primary">
                            <h5 class="title">Categories</h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Product Category</label>
                                        <input type="number" id="product_type" name="product_type" required="[1-6]" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="">Product Brand</label>
                                        <input type="number" id="brand" name="brand" required class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Product Keywords</label>
                                        <input type="text" id="tags" name="tags" required class="form-control" >
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <button type="submit" id="btn_save" name="btn_save" required class="btn btn-fill btn-primary">Update Product</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
<?php
include "footer.php";
?>
