
<footer class="bg3 p-t-75 p-b-32">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 col-lg-3 p-b-50">
                    <h4 class="stext-301 cl0 p-b-30">
                        Categories
                    </h4>
<?php $query=mysqli_query($con,"select category.id as catid,category.categoryName from category ");
$cnt=1;
while($row=mysqli_fetch_array($query))
{
?> 
                    <ul>
                        <li class="p-b-10">
                            <a href="categorywise-books.php?cid=<?php echo htmlentities($row['catid']);?>" class="stext-107 cl7 hov-cl1 trans-04">
                                <?php echo htmlentities($row['categoryName']);?>
                            </a>
                        </li>

                    </ul><?php } ?>
                </div>

                <div class="col-sm-6 col-lg-3 p-b-50">
                    <h4 class="stext-301 cl0 p-b-30">
                        Quick Link
                    </h4>

                    <ul>
                         <li class="p-b-10">
                            <a href="index.php" class="stext-107 cl7 hov-cl1 trans-04">
                                Home
                            </a>
                        </li>
                        <li class="p-b-10">
                            <a href="about.php" class="stext-107 cl7 hov-cl1 trans-04">
                                About Us
                            </a>
                        </li>

                        <li class="p-b-10">
                            <a href="contact.php" class="stext-107 cl7 hov-cl1 trans-04">
                                Contact Us 
                            </a>
                        </li>

                        <li class="p-b-10">
                            <a href="book-shop.php" class="stext-107 cl7 hov-cl1 trans-04">
                                All Books
                            </a>
                        </li>

                       
                    </ul>
                </div>

                <div class="col-sm-6 col-lg-6 p-b-50">
                    <h4 class="stext-301 cl0 p-b-30">
                        GET IN TOUCH
                    </h4>
<?php
$ret=mysqli_query($con,"select * from  tblpage where PageType='contactus'");
$cnt=1;
while ($row=mysqli_fetch_array($ret)) {
?>
                    <div class="p-t-27">
                     
                        <a href="#" class="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                            <span class="lnr lnr-map-marker"></span> : <?php  echo $row['PageDescription'];?>
                        </a>
                    </div>
                    <div class="p-t-27">
                     
                        <a href="#" class="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                            <span class="lnr lnr-phone-handset"></span> : <?php  echo $row['MobileNumber'];?>
                        </a>
                    </div>

                    <div class="p-t-27">
                     
                        <a href="#" class="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                            <span class="lnr lnr-envelope"></span> : <?php  echo $row['Email'];?>
                        </a>
                    </div><?php } ?>
                </div>

            </div>

            <div class="p-t-40">
                <div class="flex-c-m flex-w p-b-18">
                    <a href="#" class="m-all-1">
                        <img src="images/icons/icon-pay-01.png" alt="ICON-PAY">
                    </a>

                    <a href="#" class="m-all-1">
                        <img src="images/icons/icon-pay-02.png" alt="ICON-PAY">
                    </a>

                    <a href="#" class="m-all-1">
                        <img src="images/icons/icon-pay-03.png" alt="ICON-PAY">
                    </a>

                    <a href="#" class="m-all-1">
                        <img src="images/icons/icon-pay-04.png" alt="ICON-PAY">
                    </a>

                    <a href="#" class="m-all-1">
                        <img src="images/icons/icon-pay-05.png" alt="ICON-PAY">
                    </a>
                </div>

                <p class="stext-107 cl6 txt-center">
                    <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
Online Books Store

                </p>
            </div>
        </div>
    </footer>

          <div class="btn-back-to-top" id="myBtn">
        <span class="symbol-btn-back-to-top">
            <i class="zmdi zmdi-chevron-up"></i>
        </span>
    </div>