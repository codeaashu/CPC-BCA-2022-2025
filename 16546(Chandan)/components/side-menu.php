<!-- Left Menu -->
<div class="four wide column" id="sidebar-menu">
    <div class="ui secondary vertical pointing menu fluid">
        <a class="item <?php echo ($_SERVER['PHP_SELF'] == '/orphan/index.php' ? 'active' : ''); ?>" href="index.php">
            <i class="home icon"></i> Home
        </a>
        <a class="item <?php echo ($_SERVER['PHP_SELF'] == '/orphan/child-gallery-sponsored.php' ? 'active' : ''); ?>" href="child-gallery-sponsored.php">
            <i class="users icon"></i> Child Gallery
        </a>
        <a class="item <?php echo ($_SERVER['PHP_SELF'] == '/orphan/program.php' ? 'active' : ''); ?>" href="program.php">
            <i class="calendar alternate outline icon"></i> Programs
        </a>
        <a class="item <?php echo ($_SERVER['PHP_SELF'] == '/orphan/donation.php' ? 'active' : ''); ?>" href="donation.php">
            <i class="heart icon"></i> Donation
        </a>
        <a class="item <?php echo ($_SERVER['PHP_SELF'] == '/orphan/photo-gallery.php' ? 'active' : ''); ?>" href="photo-gallery.php">
            <i class="image icon"></i> Photo Gallery
        </a>
        <a class="item <?php echo ($_SERVER['PHP_SELF'] == '/orphan/feedback-form.php' ? 'active' : ''); ?>" href="feedback-form.php">
            <i class="comments icon"></i> Feedback
        </a>
        <a class="item <?php echo ($_SERVER['PHP_SELF'] == '/orphan/contact-us.php' ? 'active' : ''); ?>" href="contact-us.php">
            <i class="phone icon"></i> Contact Us
        </a>
    </div>
</div>

<style>
    #sidebar-menu {
        background: #f9f9f9;
        padding: 15px;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .ui.vertical.menu .item {
        font-size: 1.1em;
        font-weight: 500;
        padding: 12px 15px;
        transition: 0.3s ease;
        border-radius: 5px;
    }
    .ui.vertical.menu .item:hover, .ui.vertical.menu .item.active {
        background: #2185d0;
        color: #fff;
    }
</style>
