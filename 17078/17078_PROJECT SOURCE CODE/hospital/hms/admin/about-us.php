<?php
session_start();
error_reporting(0);
include('include/config.php');

if (strlen($_SESSION['id']) == 0) {
    header('location:logout.php');
    exit();
}

// Handle form submission
if (isset($_POST['submit'])) {
    $pagetitle = $_POST['pagetitle'];
    $pagedes = $con->real_escape_string($_POST['pagedes']);

    $query = mysqli_query($con, "UPDATE tblpage SET PageTitle='$pagetitle', PageDescription='$pagedes' WHERE PageType='aboutus'");

    if ($query) {
        echo '<script>alert("About Us has been updated.")</script>';
    } else {
        echo '<script>alert("Something went wrong. Please try again.")</script>';
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Admin | About Us</title>
    <!-- Include your CSS here -->
    <link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.min.css">
    <!-- other styles omitted for brevity -->
    <script src="http://js.nicedit.com/nicEdit-latest.js" type="text/javascript"></script>
    <script type="text/javascript">
        bkLib.onDomLoaded(nicEditors.allTextAreas);
    </script>
</head>
<body>
<div id="app">
    <?php include('include/sidebar.php'); ?>
    <div class="app-content">
        <?php include('include/header.php'); ?>
        <div class="main-content">
            <div class="wrap-content container" id="container">
                <section id="page-title">
                    <div class="row">
                        <div class="col-sm-8">
                            <h1 class="mainTitle">Admin | Update the About Us Content</h1>
                        </div>
                        <ol class="breadcrumb">
                            <li><span>Admin</span></li>
                            <li class="active"><span>About Us</span></li>
                        </ol>
                    </div>
                </section>
                <div class="container-fluid container-fullw bg-white">
                    <div class="row">
                        <div class="col-md-12">
                            <form method="post">
                                <?php
                                $ret = mysqli_query($con, "SELECT * FROM tblpage WHERE PageType='aboutus'");
                                while ($row = mysqli_fetch_array($ret)) {
                                ?>
                                    <div class="form-group">
                                        <label for="pagetitle">Page Title</label>
                                        <input id="pagetitle" name="pagetitle" type="text" class="form-control" required value="<?php echo htmlspecialchars($row['PageTitle']); ?>">
                                    </div>
                                    <div class="form-group">
                                        <label for="pagedes">Page Description</label>
                                        <textarea class="form-control" name="pagedes" id="pagedes" rows="12"><?php echo htmlspecialchars($row['PageDescription']); ?></textarea>
                                    </div>
                                <?php } ?>
                                <button type="submit" class="btn btn-primary" name="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php include('include/footer.php'); ?>
    </div>
</div>
<!-- JS scripts -->
<script src="vendor/jquery/jquery.min.js"></script>
<script src="vendor/bootstrap/js/bootstrap.min.js"></script>
<script src="assets/js/main.js"></script>
<script>
    jQuery(document).ready(function () {
        Main.init();
    });
</script>
</body>
</html>
