<nav class="navbar">
    <div class="navbar-container">
        <div class="brand">
            <a href="Home.php">SL<span class="subbrand">Moto</span></a>
        </div>
        <ul class="nav-links">
            <li><a href="Home.php">Home</a></li>
            <li><a href="allvehicle.php">Vehicles</a></li>
            <li><a href="about.php" class="active">About</a></li>
            <li><a href="contactUs.php">Contact</a></li>
            <?php if (isset($_SESSION['user_id'])): ?>
                <li><a href="Php/add_vehicle_form.php">Post Vehicle</a></li>
            <?php endif; ?>
        </ul>
        <div class="mobile-menu">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="account">
            <?php if (isset($_SESSION['user_id'])): ?>
                <div class="dropdown">
                    <button class="dropbtn"><i class="fas fa-user-circle"></i></button>
                    <div class="dropdown-content">
                        <a href="Php/account.php">Account</a>
                        <a href="Php/activeJob.php">Active Jobs</a>
                        <a href="Php/logout.php">Logout</a>
                    </div>
                </div>
            <?php else: ?>
                <a href="Php/login.php" class="login-btn">Login/Register</a>
            <?php endif; ?>
        </div>
    </div>
</nav>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="Css/realtime-updates.css">
    <script src="js/realtime-updates.js" defer></script>
    <script src="js/notifications.js" defer></script>

<script>
    // Mobile menu toggle
    document.querySelector('.mobile-menu').addEventListener('click', function() {
        document.querySelector('.nav-links').classList.toggle('active');
        this.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const navLinks = document.querySelector('.nav-links');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (!event.target.closest('.nav-links') && 
            !event.target.closest('.mobile-menu') && 
            navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });

    // Add active class to current page link
    document.addEventListener('DOMContentLoaded', function() {
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href').includes(currentPage)) {
                link.classList.add('active');
            }
        });
    });
</script>