<?php

include("Php/Conn.php");
include("Php/vehicleClass.php");
session_start();

$vehicle = new Vehicle();
$vehicles = $vehicle->GetVehicles();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SLMoto | Vehicle</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="Css/homepage.css">
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
       
                if (isset($_SESSION['user_id'])) {
                    echo '<div class="dropdown">';
                    echo '<button class="dropbtn"><i class="fas fa-user-circle"></i></button>';
                    echo '<div class="dropdown-content">';
                    echo '<a href="Php/account.php">Account</a>';
                    echo '<a href="Php/logout.php">Logout</a>';
                    echo '<a href="Php/activeJob.php">Active Job</a>';
                    echo '</div>';
                    echo '</div>';
                } else {
                    echo '<a href="./Php/login.php" class="login-btn">Login/Register</a>';
                }
                ?>
            </div>
        </div>
    </nav>

    <h1 class="vehicle-list-heading">Available Vehicles for Rent</h1>

    <div class="search-container">
        <input type="text" id="searchInput" placeholder="Search for cars...">
    </div>

    <div class="vehicle-list-container" id="vehicle-list-container">
        <?php
        foreach ($vehicles as $vehicle) {
            echo '<div class="vehicle-card">';
            echo '<img src="' . $vehicle->Image . '" alt="' . $vehicle->Title . '">';
            echo '<h2>' . $vehicle->Title . '</h2>';
            echo '<p>' . $vehicle->Description . '</p>';
            echo '<p>Location: ' . $vehicle->Location . '</p>'; 
            echo '<p>Price: Rs.' . $vehicle->Price . ' per day</p>';
            echo '<button class="rent-btn" onclick="redirectToRentPage(' . $vehicle->ID . ')">Rent</button>';
            echo '</div>';
        }
        ?>
    </div>

    <script>
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('show');
        });

        function filterVehicles() {
            const searchInput = document.getElementById('searchInput');
            const filter = searchInput.value.toUpperCase();
            const vehicleCards = document.querySelectorAll('.vehicle-card');

            vehicleCards.forEach(card => {
                const title = card.querySelector('h2').innerText.toUpperCase();
                const description = card.querySelector('p').innerText.toUpperCase();
                if (title.includes(filter) || description.includes(filter)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        }
        document.getElementById('searchInput').addEventListener('input', filterVehicles);
    </script>
    <script>
    function redirectToRentPage(vehicleId) {
        window.location.href = './rent_vehicle.php?id=' + vehicleId;
    }
</script>
</body>

</html>
