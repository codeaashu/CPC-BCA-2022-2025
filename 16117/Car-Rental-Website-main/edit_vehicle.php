<?php
session_start();
include("Php/Conn.php");

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: Php/login.php");
    exit();
}

// Check if ID is provided
if (!isset($_GET['id'])) {
    header("Location: active_job.php");
    exit();
}

// Get the vehicle ID
$vehicle_id = $_GET['id'];

// Fetch vehicle details from the database
$conn = Conn::GetConnection();
$stmt = $conn->prepare("SELECT * FROM Vehicles WHERE Id = :vehicle_id AND User_Email = :user_email");
$stmt->bindParam(':vehicle_id', $vehicle_id);
$stmt->bindParam(':user_email', $_SESSION['email']);
$stmt->execute();
$vehicle = $stmt->fetch(PDO::FETCH_ASSOC);

// Check if vehicle exists and belongs to the user
if (!$vehicle) {
    header("Location: active_job.php");
    exit();
}

// Process form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $title = $_POST["title"];
    $description = $_POST["description"];
    $price = $_POST["price"];
    $phone_number = $_POST["phone_number"];
    $time_duration = $_POST["time_duration"];

    // Update vehicle details in the database
    $stmt = $conn->prepare("UPDATE Vehicles SET Title = :title, Description = :description, Price = :price, Phone_Number = :phone_number, Time_Duration = :time_duration WHERE Id = :vehicle_id");
    $stmt->bindParam(':title', $title);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':price', $price);
    $stmt->bindParam(':phone_number', $phone_number);
    $stmt->bindParam(':time_duration', $time_duration);
    $stmt->bindParam(':vehicle_id', $vehicle_id);
    $stmt->execute();

    // Redirect to active job page
    header("Location: active_job.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Vehicle | SL Moto</title>
    <link rel="stylesheet" href="Css/homepage.css">
    <link rel="stylesheet" href="Css/edit_vehicle.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
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
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="Php/add_vehicle_form.php">Post</a></li>
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
                    echo '<a href="Php/login.php" class="login-btn">Login/Register</a>';
                }
                ?>
            </div>
        </div>
    </nav>

    <div class="wrapper">
        <div class="container">
            <h1>Edit Vehicle</h1>
            <form action="" method="POST" enctype="multipart/form-data">
                <label for="title">Title:</label>
                <input type="text" id="title" name="title" value="<?php echo $vehicle['Title']; ?>" required><br><br>
                <label for="description">Description:</label>
                <textarea id="description" name="description" required><?php echo $vehicle['Description']; ?></textarea><br><br>
                <label for="price">Price per Day:</label>
                <input type="number" id="price" name="price" value="<?php echo $vehicle['Price']; ?>" required><br><br>
                <label for="phone_number">Phone Number:</label>
                <input type="tel" id="phone_number" name="phone_number" value="<?php echo $vehicle['Phone_Number']; ?>" required><br><br>
                <label for="time_duration">Active Day:</label>
                <input type="text" id="time_duration" name="time_duration" value="<?php echo $vehicle['Time_Duration']; ?>" required><br><br>
                <label for="location">Location:</label>
                <input type="text" id="location" name="location" value="<?php echo $vehicle['Location']; ?>" required><br><br>
                <input type="submit" style="font-weight:700;font-size:0.9rem" value="Update Vehicle">
            </form>

            <div class="actions">
                <a href="delete_vehicle.php?id=<?php echo $vehicle_id; ?>">Delete Vehicle</a>
            </div>
        </div>
    </div>

</body>

</html>