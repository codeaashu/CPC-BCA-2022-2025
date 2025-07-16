<?php
// Error reporting for development
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

try {
    require_once("Php/Conn.php");
    require_once("Php/vehicleClass.php");

    $vehicle = new Vehicle();
    $vehicles = $vehicle->GetVehicles();
    
    if (!is_array($vehicles)) {
        throw new Exception('Failed to retrieve vehicles');
    }
} catch (Exception $e) {
    error_log('Error in Home.php: ' . $e->getMessage());
    $vehicles = array(); // Provide empty array as fallback
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SLMoto | Home</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="./Css/homepage.css">
</head>

<body>
    <nav class="navbar">
        <div class="navbar-container">
            <div class="brand">
                <a href="#">SL<Span class="subbrand">Moto</Span></a>
            </div>
            <ul class="nav-links">
                <li><a href="./Home.php">Home</a></li>
                <li><a href="./allvehicle.php">Vehicles</a></li>
                <li><a href="./Home.php#about-us">About</a></li>
                <li><a href="./contactUs.php">Contact</a></li>
                <li><a href="./Php/add_vehicle_form.php">Post</a></li>
            </ul>
            <div class="mobile-menu">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="account">
                <?php
                // Check if the user is logged in
                if (isset($_SESSION['user_id'])) {
                    echo '<div class="dropdown">';
                    echo '<button class="dropbtn"><i class="fas fa-user-circle"></i></button>';
                    echo '<div class="dropdown-content">';
                    echo '<a href="./Php/account.php">Account</a>';
                    echo '<a href="./Php/logout.php">Logout</a>';
                    echo '<a href="./Php/activeJob.php">Active Job</a>';
                    echo '</div>';
                    echo '</div>';
                } else {
                    echo '<a href="./Php/login.php" class="login-btn">Login/Register</a>';
                }
                ?>
            </div>
        </div>
    </nav>
    <header class="header">
        <div class="header-content">
            <h1>Welcome to SL<span class="subtopic">Moto</span></h1>
            <p>Your ultimate destination for car rentals</p>
            <a href="./allvehicle.php" class="btn">Rent a Car</a>
        </div>
    </header>
    <h1 class="vehicle-list-heading">Available Vehicles for Rent</h1>
    <div class="vehicle-list-container" id="vehicle-list-container">
        <a href="./allvehicle.php" class="view-all-btn" style="text-decoration: none;">View All </a>
        <div class="vehicle-slideshow">
            <div class="slide-nav prev-slide" onclick="prevSlide()"><i class="fas fa-chevron-left"></i></div>
            <div class="slide-nav next-slide" onclick="nextSlide()"><i class="fas fa-chevron-right"></i></div>
            <?php

            $chunkedVehicles = array_chunk($vehicles, 4);
            foreach ($chunkedVehicles as $chunk) {
                echo '<div class="vehicle-slide">';
                foreach ($chunk as $vehicle) {
                    echo '<div class="vehicle-card">';
                    echo '<img src="' . $vehicle->Image . '" alt="' . $vehicle->Title . '">';
                    echo '<h2>' . $vehicle->Title . '</h2>';
                    echo '<p>' . $vehicle->Description . '</p>';
                    echo '<p>Location: ' . $vehicle->Location . '</p>';
                    echo '<p>Price: Rs.' . $vehicle->Price . ' per day</p>';
                    echo '<button class="rent-btn" onclick="redirectToRentPage(' . $vehicle->ID . ')">Rent</button>';
                    echo '</div>';
                }
                echo '</div>';
            }
            ?>
            <div class="slide-indicators"></div>
        </div>
    </div>

    <script>
        // Initialize variables with proper scope
        let slideIndex = 0;
        let timer = null;
        let slideContainer = null;
        let slides = null;
        let indicatorContainer = null;

        // Initialize DOM elements when the document is ready
        function initializeDOMElements() {
            try {
                slideContainer = document.querySelector('.vehicle-slideshow');
                slides = document.getElementsByClassName('vehicle-slide');
                indicatorContainer = document.querySelector('.slide-indicators');

                if (!slideContainer || !slides || !indicatorContainer) {
                    console.error('Required DOM elements not found');
                    return false;
                }
                return true;
            } catch (error) {
                console.error('Error initializing DOM elements:', error);
                return false;
            }
        }
        
        // Initialize slide indicators
        function initializeSlideshow() {
            if (!slides.length) return; // Guard against no slides

            // Create indicators
            for (let i = 0; i < slides.length; i++) {
                const indicator = document.createElement('div');
                indicator.className = 'slide-indicator';
                indicator.onclick = () => goToSlide(i + 1);
                indicatorContainer.appendChild(indicator);
            }

            // Start the slideshow
            showSlides();
        }

        function goToSlide(index) {
            if (!slides.length) return;
            clearTimeout(timer);
            slideIndex = index - 1;
            showSlides();
        }

        function updateIndicators() {
            if (!slides.length) return;
            const indicators = document.getElementsByClassName('slide-indicator');
            for (let i = 0; i < indicators.length; i++) {
                indicators[i].classList.remove('active');
            }
            indicators[slideIndex - 1].classList.add('active');
        }

        // Main initialization function
        function initialize() {
            if (!initializeDOMElements()) return;
            initializeSlideshow();
            initializeEventListeners();
        }

        // Initialize when DOM is fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initialize);
        } else {
            initialize();
        }
    </script>

    <section class="about-us" id="about-us">
        <div class="heading">
            <h1>About Us</h1>
        </div>
        <div class="content">
            <p>Welcome to our vehicle rental service! We're dedicated to providing you with the best rental experience.</p>
            <p>At our company, we offer a wide range of vehicles to suit your needs, whether you're looking for a compact car for a weekend getaway or a spacious SUV for a family road trip.</p>
            <p>Our team is committed to ensuring that every aspect of your rental experience is seamless and hassle-free. From booking your vehicle online to picking it up at one of our convenient locations, we're here to help every step of the way.</p>
            
        </div>
    </section>
    <footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-section links">
                <h2>Quick Links</h2>
                <ul>
                    <li><a href="./Home.php">Home</a></li>
                    <li><a href="./allvehicle.php">Vehicles</a></li>
                    <li><a href="./Home.php#about-us">About Us</a></li>
                    <li><a href="./contactUs.php">Contact Us</a></li>
                </ul>
            </div>
            <div class="footer-section about">
                <h2>About Us</h2>
                <p>Welcome to our vehicle rental service! We provide a wide range of vehicles for rent to meet your transportation needs.</p>
            </div>
            <div class="footer-section contact">
                <h2>Contact Information</h2>
                <ul>
                    <li><span><i class="fas fa-map-marker-alt"></i></span>123 Main Street, City, Country</li>
                    <li><span><i class="fas fa-envelope"></i></span>info@vehiclerental.com</li>
                    <li><span><i class="fas fa-phone"></i></span>+123-456-7890</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="footer-bottom">
        &copy; 2024 Vehicle Rental Service. All rights reserved.
    </div>
</footer>

    <button id="scroll-to-top" title="Go to top">
        <i class="fas fa-arrow-up"></i>
    </button>

    <script>
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('show');
        });

        // Scroll to top functionality
        const scrollToTopBtn = document.getElementById("scroll-to-top");

        window.onscroll = function() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                scrollToTopBtn.style.display = "block";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        };

        scrollToTopBtn.addEventListener("click", function() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    </script>
    <script>
        function showSlides() {
            if (!slides.length) return;

            try {
                for (let i = 0; i < slides.length; i++) {
                    slides[i].style.opacity = "0";
                    slides[i].style.display = "none";
                }

                slideIndex++;
                if (slideIndex > slides.length) {
                    slideIndex = 1;
                }

                slides[slideIndex - 1].style.display = "flex";
                requestAnimationFrame(() => {
                    slides[slideIndex - 1].style.opacity = "1";
                });

                updateIndicators();
                timer = setTimeout(showSlides, 5000);
            } catch (error) {
                console.error('Error in slideshow:', error);
            }
        }

        // Initialize event listeners when DOM is loaded
        function initializeEventListeners() {
            if (!slideContainer) return;

            // Add hover pause functionality
            slideContainer.addEventListener('mouseenter', () => {
                clearTimeout(timer);
            });

            slideContainer.addEventListener('mouseleave', () => {
                timer = setTimeout(showSlides, 5000);
            });

            // Add touch support for mobile
            let touchStartX = 0;
            let touchEndX = 0;

            slideContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
            });

            slideContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].clientX;
                handleSwipe();
            });
        }

        // Initialize event listeners when DOM is loaded
        document.addEventListener('DOMContentLoaded', initializeEventListeners);

        function handleSwipe() {
            try {
                const swipeThreshold = 50;
                const swipeDistance = touchEndX - touchStartX;

                if (Math.abs(swipeDistance) > swipeThreshold) {
                    if (swipeDistance > 0) {
                        prevSlide();
                    } else {
                        nextSlide();
                    }
                }
            } catch (error) {
                console.error('Error handling swipe:', error);
            }
        }

        function nextSlide() {
            try {
                if (!slides.length) return;
                clearTimeout(timer);
                showSlides();
            } catch (error) {
                console.error('Error in nextSlide:', error);
            }
        }

        function prevSlide() {
            try {
                if (!slides.length) return;
                clearTimeout(timer);
                slideIndex = slideIndex - 2;
                if (slideIndex < 0) {
                    slideIndex = slides.length - 1;
                }
                showSlides();
            } catch (error) {
                console.error('Error in prevSlide:', error);
            }
        }

        function redirectToRentPage(vehicleId) {
            try {
                if (!vehicleId) {
                    console.error('Invalid vehicle ID');
                    return;
                }
                window.location.href = './rent_vehicle.php?id=' + encodeURIComponent(vehicleId);
            } catch (error) {
                console.error('Error redirecting to rent page:', error);
            }
        }
    </script>
</body>

</html>