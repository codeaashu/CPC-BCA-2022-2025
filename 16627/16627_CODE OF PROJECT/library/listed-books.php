<?php
session_start();
error_reporting(0);
include('includes/config.php');
if(strlen($_SESSION['login'])==0)
    {   
header('location:index.php');
}
else{ 



    ?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>Online Library Management System |  Issued Books</title>
    <!-- BOOTSTRAP CORE STYLE  -->
    <link href="assets/css/bootstrap.css" rel="stylesheet" />
    <!-- FONT AWESOME STYLE  -->
    <link href="assets/css/font-awesome.css" rel="stylesheet" />
    <!-- DATATABLE STYLE  -->
    <link href="assets/js/dataTables/dataTables.bootstrap.css" rel="stylesheet" />
    <!-- CUSTOM STYLE  -->
    <link href="assets/css/style.css" rel="stylesheet" />
    <!-- GOOGLE FONT -->
    <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css' />

</head>
<body>
      <!------MENU SECTION START-->
<?php include('includes/header.php');?>
<!-- MENU SECTION END-->
    <div class="content-wrapper">
         <div class="container">
        <div class="row pad-botm">
            <div class="col-md-12">
                <h4 class="header-line">Manage Issued Books</h4>
    </div>
    

            <div class="row">
                <div class="col-md-12">
                    <!-- Advanced Tables -->
                    <div class="panel panel-default">
                        <div class="panel-heading">
                          Issued Books 
                        </div>
                        <div class="panel-body">
                       

<?php $sql = "SELECT tblbooks.BookName,tblcategory.CategoryName,tblauthors.AuthorName,tblbooks.ISBNNumber,tblbooks.BookPrice,tblbooks.id as bookid,tblbooks.bookImage,tblbooks.isIssued,tblbooks.bookQty,  
               COUNT(tblissuedbookdetails.id) AS issuedBooks,
   COUNT(tblissuedbookdetails.RetrunStatus) AS returnedbook

        FROM tblbooks
        LEFT JOIN tblissuedbookdetails ON tblissuedbookdetails.BookId = tblbooks.id
        LEFT JOIN tblauthors ON tblauthors.id = tblbooks.AuthorId
        Left join tblcategory on tblcategory.id=tblbooks.CatId
        GROUP BY tblbooks.id";
$query = $dbh -> prepare($sql);
$query->execute();
$results=$query->fetchAll(PDO::FETCH_OBJ);
$cnt=1;
if($query->rowCount() > 0)
{
foreach($results as $result)
{               ?>  

    <div class="col-md-4" style="height:350px;">

  <table class="table table-bordered">

     <tr>
        <td rowspan="2"><img src="admin/bookimg/<?php echo htmlentities($result->bookImage);?>" width="120"></td>
        <th>Book Name</th>
        <td><?php echo htmlentities($result->BookName);?></td>
    </tr>
    <tr>
        <th>Author</th>
        <td><?php echo htmlentities($result->AuthorName);?></td>
    </tr>
      <tr>
        <th>ISBN Number</th>
        <td colspan="2"><?php echo htmlentities($result->ISBNNumber);?></td>
    </tr>
       <tr>
        <th> Book Quantity</th>
        <td colspan="2"><?php echo htmlentities($result->bookQty);?></td>
    </tr>
     <tr>
        <th> Avaiable Book Quantity</th>
        <td colspan="2"><?php if ($result->issuedBooks == 0) {
        echo htmlentities($result->bookQty);
    } else{
 echo htmlentities($result->bookQty-($result->issuedBooks-$result->returnedbook));
    }?></td>
    </tr>
</table>
                                   
                                        

      
                            </div>
           

                                <?php $cnt=$cnt+1;}} ?>  
                      
                            
                        </div>
                    </div>
                    <!--End Advanced Tables -->
                </div>
            </div>


            
    </div>
    </div>
    </div>

     <!-- CONTENT-WRAPPER SECTION END-->
  <?php include('includes/footer.php');?>
      <!-- FOOTER SECTION END-->
    <!-- JAVASCRIPT FILES PLACED AT THE BOTTOM TO REDUCE THE LOADING TIME  -->
    <!-- CORE JQUERY  -->
    <script src="assets/js/jquery-1.10.2.js"></script>
    <!-- BOOTSTRAP SCRIPTS  -->
    <script src="assets/js/bootstrap.js"></script>
    <!-- DATATABLE SCRIPTS  -->
    <script src="assets/js/dataTables/jquery.dataTables.js"></script>
    <script src="assets/js/dataTables/dataTables.bootstrap.js"></script>
      <!-- CUSTOM SCRIPTS  -->
    <script src="assets/js/custom.js"></script>

</body>
</html>
<?php } ?>
