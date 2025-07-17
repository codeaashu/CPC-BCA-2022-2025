



    <header class="header-v4">
        <!-- Header desktop -->
        <div class="container-menu-desktop">
            <!-- Topbar -->
            <div class="top-bar">
                <div class="content-topbar flex-sb-m h-full container">
                    <div class="left-top-bar">
                       &nbsp;
                    </div>

                      <div class="right-top-bar flex-w h-full">

<?php if($_SESSION['id']==0){?>
                       

                        <a href="login.php" class="flex-c-m trans-04 p-lr-25">
                            Login
                        </a>
<?php } else {?>
                        <a href="logout.php" class="flex-c-m trans-04 p-lr-25">
                            Logout
                        </a><?php } ?>  
                    </div>
                </div>
            </div>

            <div class="wrap-menu-desktop how-shadow1">
                <nav class="limiter-menu-desktop container">
                    
                    <!-- Logo desktop -->       
                    <a href="index.php" class="logo" style="font-size:30px; font-weight:bold;">
                       Book Store
                    </a>

                    <!-- Menu desktop -->
                    <div class="menu-desktop">
                                    <ul class="main-menu">
                            <li class="active-menu">
                                <a href="index.php">Home</a>
                               
                            </li>

                           
                             <li>
                                <a href="#">Book Shop</a>
                                <ul class="sub-menu">
                                    <li><a href="book-shop.php">All Book</a></li>
                                    <li><a href="book-categories.php">Categories</a></li>
                                
                                </ul>
                            </li>

                            <li>
                                <a href="about.php">About</a>
                            </li>

                            <li>
                                <a href="contact.php">Contact</a>
                            </li>
                       
                           <?php if($_SESSION['id']!=0):?>
                               <li>
                                <a href="my-wishlist.php">My Wishlist</a>
                            </li>
                            <li>
                                <a href="index.php">My Account</a>
                                <ul class="sub-menu">
                                    <li><a href="profile.php">Profile</a></li>
                                    <li><a href="setting.php">Change Password</a></li>
                                    <li><a href="my-orders.php">Order History</a></li>
                                    <li><a href="manage-addresses.php">Manage Addresses</a></li>
                                    <li><a href="logout.php">Logout</a></li>
                                </ul>
                            </li>
                          

                        <?php endif;?> 
                        </ul>
                    </div>  

                    <!-- Icon header -->
                    <div class="wrap-icon-header flex-w flex-r-m">
                        <div class="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search">
                            <i class="zmdi zmdi-search"></i>
                        </div>
<?php if($_SESSION['id']==0): ?>
                        <div class="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart" data-notify="0">
                            <i class="zmdi zmdi-shopping-cart"></i>
                        </div>
<?php else:
$uid=$_SESSION['id'];
$ret=mysqli_query($con,"select id  from cart where cart.userID='$uid'");
$num=mysqli_num_rows($ret);
?><a href="my-cart.php">
    <div class="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart" data-notify="<?php echo $num;?>">
                            <i class="zmdi zmdi-shopping-cart"></i>
                        </div>
</a>
<?php endif;
if($_SESSION['id']==0):
?>    
                        <a href="#" class="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti" data-notify="0">
                            <i class="zmdi zmdi-favorite-outline"></i>
                        </a>
<?php else: 
$uid=$_SESSION['id'];
$ret1=mysqli_query($con,"select id  from wishlist where userId='$uid'");
$num1=mysqli_num_rows($ret1);
    ?>
                        <a href="my-wishlist.php" class="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti" data-notify="<?php echo $num1;?>">
                            <i class="zmdi zmdi-favorite-outline"></i>
                        </a>
<?php endif; ?>
                    </div>
                </nav>
            </div>  
        </div>

        <!-- Header Mobile -->
        <div class="wrap-header-mobile">
            <!-- Logo moblie -->        
            <div class="logo-mobile">
                    <a href="index.php" class="logo" style="font-size:30px; font-weight:bold;">
                       Book Store
                    </a>
            </div>

            <!-- Icon header -->
            <div class="wrap-icon-header flex-w flex-r-m m-r-15">
                <div class="icon-header-item cl2 hov-cl1 trans-04 p-r-11 js-show-modal-search">
                    <i class="zmdi zmdi-search"></i>
                </div>

                <div class="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart" data-notify="2">
                    <i class="zmdi zmdi-shopping-cart"></i>
                </div>

                <a href="#" class="dis-block icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti" data-notify="0">
                    <i class="zmdi zmdi-favorite-outline"></i>
                </a>
            </div>

            <!-- Button show menu -->
            <div class="btn-show-menu-mobile hamburger hamburger--squeeze">
                <span class="hamburger-box">
                    <span class="hamburger-inner"></span>
                </span>
            </div>
        </div>


        <!-- Menu Mobile -->
        <div class="menu-mobile">
            <ul class="topbar-mobile">
                <li>
                    <div class="left-top-bar">
               &nbsp;
                    </div>
                </li>

                <li>
                    <div class="right-top-bar flex-w h-full">
         <?php if($_SESSION['id']==0){?>
                        <a href="signup.php" class="flex-c-m trans-04 p-lr-25">
                            Registration
                        </a>

                        <a href="login.php" class="flex-c-m trans-04 p-lr-25">
                            Login
                        </a>
<?php } else {?>
                        <a href="logout.php" class="flex-c-m trans-04 p-lr-25">
                            Logout
                        </a><?php } ?>  
              
                    </div>
                </li>
            </ul>

            <ul class="main-menu-m">
                <li>
                    <a href="index.html">Home</a>
                    <ul class="sub-menu-m">
                     <li>
                                <a href="index.php">Home</a>
                               
                            </li>

                           
                             <li>
                                <a href="index.php">Book Shop</a>
                                <ul class="sub-menu">
                                    <li><a href="book-shop.php">All Book</a></li>
                                    <li><a href="book-categories.php">Categories</a></li>
                                
                                </ul>
                            </li>

                            <li>
                                <a href="about.php">About</a>
                            </li>

                            <li>
                                <a href="contact.php">Contact</a>
                            </li>
                              <?php if($_SESSION['id']==0):?>
                            <li>
                                <a href="admin/index.php">Admin</a>
                            </li>
                        <?php endif;?>
                           <?php if($_SESSION['id']!=0):?>
                            <li>
                                <a href="index.php">My Account</a>
                                <ul class="sub-menu">
                                    <li><a href="profile.php">Profile</a></li>
                                    <li><a href="setting.php">Setting</a></li>
                                    <li><a href="my-orders.php">Order History</a></li>
                                    <li><a href="manage-addresses.php">Manage Addresses</a></li>
                                </ul>
                            </li>
                             <li>
                                <a href="my-wishlist.php">My Wishlist</a>
                            </li>

                        <?php endif;?> 
                        </ul>
            </ul>
        </div>

        <!-- Modal Search -->
        <div class="modal-search-header flex-c-m trans-04 js-hide-modal-search">
            <div class="container-search-header">
                <button class="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search">
                    <img src="images/icons/icon-close2.png" alt="CLOSE">
                </button>

                <form class="wrap-search-header flex-w p-l-15" method="post" action="search.php">
                    <button class="flex-c-m trans-04" type="submit">
                        <i class="zmdi zmdi-search"></i>
                    </button>
                    <input class="plh3" type="text" name="search" placeholder="Search..." required>
                </form>
            </div>
        </div>
    </header>