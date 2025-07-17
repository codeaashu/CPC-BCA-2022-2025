<?php
session_start();
include("../../db.php");

// Check if delete action is requested
if(isset($_GET['action']) && $_GET['action'] != "" && $_GET['action'] == 'delete') {
    $product_id = $_GET['product_id'];

    // Delete product
    $result_delete = mysqli_query($con, "SELECT product_image FROM products WHERE product_id='$product_id'") or die("Query failed: " . mysqli_error($con));
    if(mysqli_num_rows($result_delete) > 0) {
        $row = mysqli_fetch_assoc($result_delete);
        $picture = $row['product_image'];
        $path = "../product_images/$picture";
        if(file_exists($path)) {
            unlink($path); // Delete product image
        }
    }

    mysqli_query($con, "DELETE FROM products WHERE product_id='$product_id'") or die("Query failed: " . mysqli_error($con));
}

// Pagination
$page = isset($_GET['page']) ? $_GET['page'] : 1;
$records_per_page = 12;
$start_from = ($page - 1) * $records_per_page;

include "sidenav.php";
include "topheader.php";
?>
<!-- End Navbar -->
<div class="content">
    <div class="container-fluid">
        <div class="col-md-14">
            <div class="card ">
                <div class="card-header card-header-primary">
                    <h4 class="card-title">Products List</h4>
                </div>
                <div class="card-body">
                    <div class="table-responsive ps">
                        <table class="table tablesorter" id="page1">
                            <thead class="text-primary">
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>
                                        <?php
                                        
                                            echo '<a class="btn btn-primary" href="add_products.php">Add New</a>';
                                        
                                        ?>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php 
                                $query = "SELECT p.product_id, p.product_image, p.product_title, p.product_price, p.product_quantity
                                            FROM products AS p
                                            ORDER BY p.product_quantity DESC
                                            LIMIT $start_from, $records_per_page";
                                $result = mysqli_query($con, $query) or die("Query failed: " . mysqli_error($con));

                                while($row = mysqli_fetch_assoc($result)) {
                                    $product_id = $row['product_id'];
                                    $image = $row['product_image'];
                                    $product_name = $row['product_title'];
                                    $price = $row['product_price'];
                                    $product_quantity = $row['product_quantity'];

                                    $substr = substr($product_name, 0, 36);

                                    echo "<tr>
                                            <td><img src='../../product_images/$image' style='width:50px; height:50px; border:groove #000'></td>
                                            <td>$substr</td>
                                            <td>$product_quantity</td>
                                            <td>Rs. $price</td>
                                            <td>";                    
                                    
                                        echo "<a class='btn btn-success' href='edit_product.php?product_id=$product_id'>Edit</a>
                                              <a class='btn btn-danger' href='products_list.php?product_id=$product_id&action=delete'>Delete</a>";
                                    }
                                    echo "</td>
                                          </tr>";
                                
                                ?>
                            </tbody>
                        </table>
                        <div class="ps__rail-x" style="left: 0px; bottom: 0px;"><div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div></div><div class="ps__rail-y" style="top: 0px; right: 0px;"><div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 0px;"></div></div>
                    </div>
                </div>
            </div>
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span class="sr-only">Previous</span>
                        </a>
                    </li>
                    <?php 
                    // Count total number of records
                    $total_records_query = "SELECT COUNT(*) AS total_records FROM products";
                    $total_records_result = mysqli_query($con, $total_records_query);
                    $total_records = mysqli_fetch_assoc($total_records_result)['total_records'];

                    // Calculate total number of pages
                    $total_pages = ceil($total_records / $records_per_page);

                    for($i = 1; $i <= $total_pages; $i++) { 
                        echo "<li class='page-item'><a class='page-link' href='products_list.php?page=$i'>$i</a></li>";
                    }
                    ?>
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span class="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</div>
<?php
include "footer.php";
?>
