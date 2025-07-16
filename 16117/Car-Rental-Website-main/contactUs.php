<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us</title>
   
    <style>
        .contact-us {
            background-color: #f9f9f9;
            padding: 50px 20px;
            text-align: center;
            font-family: Arial, sans-serif;
        }

        .contact-us .heading {
            color: #333;
            font-size: 36px;
            margin-bottom: 20px;
        }

        .contact-us .content {
            max-width: 800px;
            margin: 0 auto;
        }

        .contact-us p {
            font-size: 18px;
            line-height: 1.6;
            color: #666;
            margin-bottom: 30px;
        }

        .contact-us .contact-info {
            text-align: left;
            margin-top: 20px;
        }

        .contact-us .contact-info p {
            margin-bottom: 10px;
            font-size: 16px;
        }

        @media only screen and (max-width: 600px) {
            .contact-us .heading {
                font-size: 24px;
            }
            .contact-us p {
                font-size: 16px;
            }
        }
    </style>
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
    <section class="contact-us" id="contact">
        <div class="heading">
            <h1>Contact Us</h1>
        </div>
        <div class="content">
            <p>If you need assistance or have any questions, feel free to contact us:</p>
            <div class="contact-info">
                <p><strong>Phone:</strong> +123-456-7890</p>
                <p><strong>Email:</strong> info@vehiclerental.com</p>
                <p><strong>Location:</strong> 123 Main Street, City, Country</p>
            </div>
        </div>
    </section>
</body>
</html>
