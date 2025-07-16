<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Active Vehicles | SL Moto</title>
    <link rel="stylesheet" href="../Css/homepage.css">
    <link rel="stylesheet" href="../Css/activejobs.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body>

    <nav class="navbar">
        <div class="navbar-container">
            <div class="brand">
                <a href="#">SL<Span class="subbrand">Moto</Span></a>
            </div>
            <ul class="nav-links">
                <li><a href="../Home.php">Home</a></li>
                <li><a href="#vehicle-list-container">Vehicles</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="../Php/add_vehicle_form.php">Post</a></li>
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
                    echo '<a href="account.php">Account</a>';
                    echo '<a href="logout.php">Logout</a>';
                    echo '<a href=".activeJob.php">Active Job</a>';
                    echo '</div>';
                    echo '</div>';
                } else {
                    echo '<a href="login.php" class="login-btn">Login/Register</a>';
                }
                ?>
            </div>
        </div>
    </nav>

    <div class="wrapper">
        <div class="container">
            <h1>Active Vehicles</h1>
            <div class="active-vehicles">
                <?php
                include("../Php/Conn.php");
                $conn = Conn::GetConnection();
                $stmt = $conn->prepare("SELECT * FROM Vehicles WHERE User_Email = :user_email");
                $stmt->bindParam(':user_email', $_SESSION['email']);
                $stmt->execute();
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    echo "<div class='vehicle'>";
                    echo "<p><strong>Vehicle Name:</strong> " . $row['Title'] . "</p>";
                    echo "<p><strong>Description:</strong> " . $row['Description'] . "</p>";
                    echo "<p><strong>Location:</strong> " . $row['Location'] . "</p>";
                    echo "<p><strong>Price per Day:</strong> Rs." . $row['Price'] . "</p>";
                    echo "<p><strong>Phone Number:</strong> " . $row['Phone_Number'] . "</p>";
                    echo "<p><strong>Active Days:</strong> " . $row['Time_Duration'] . "</p>";
                    echo "<p><strong>Status:</strong> " . $row['Status'] . "</p>";
                    echo "<img src='../" . $row['Image'] . "' alt='Vehicle Image'>";
                    echo "<div class='actions'>";
                    echo "<a href='../edit_vehicle.php?id=" . $row['Id'] . "'>Edit</a>";
                    echo "<a href='../delete_vehicle.php?id=" . $row['Id'] . "'>Delete</a>";
                    echo "</div>";
                    echo "</div>";
                }
                ?>
            </div>
        </div>
    </div>

</body>
</html>
