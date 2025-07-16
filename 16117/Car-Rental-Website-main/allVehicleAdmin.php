<?php
session_start();
include("Php/Conn.php");


try {
    $conn = Conn::GetConnection();
    $stmt = $conn->query("SELECT * FROM Vehicles");
    $vehicles = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $stmtRentals = $conn->query("SELECT * FROM vehicle_rental");
    $rentals = $stmtRentals->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Vehicles</title>
    <link rel="stylesheet" href="Css/adminVehicle.css">
    <link rel="stylesheet" href="Css/admin.css">
</head>

<body>
    <nav class="navbar">
        <div class="navbar-container">
            <div class="brand">
                <a href="#">SL<Span class="subbrand">Moto</Span></a>
            </div>
            <ul class="nav-links">
                <li><a href="./admin.php">Dashboard</a></li>
                <li><a href="./manageAdmin.php">Admin</a></li>
                <li><a href="./allVehicleAdmin.php">Vehicles</a></li>
                <li><a href="Php/logout.php">Logout</a></li>
            </ul>
        </div>
    </nav>

    <main>
        <?php foreach ($vehicles as $vehicle) : ?>
            <div class="vehicle-container">
                <div class="vehicle-details">
                    <h2>Vehicle Details</h2>
                    <ul>
                        <li><strong>Vehicle ID:</strong> <?php echo $vehicle['Id']; ?></li>
                        <li><strong>Title:</strong> <?php echo $vehicle['Title']; ?></li>
                        <li><strong>Description:</strong> <?php echo $vehicle['Description']; ?></li>
                        <li><strong>Price:</strong> $<?php echo $vehicle['Price']; ?> per day</li>
                        <li><strong>Status:</strong> <?php echo $vehicle['Status']; ?></li>
                        <?php if ($vehicle['Status'] === 'pending') : ?>
                            <li>
                                <form action="mark_status.php" method="post">
                                    <input type="hidden" name="vehicle_id" value="<?php echo $vehicle['Id']; ?>">
                                    <button type="submit">Mark as Confirmed</button>
                                </form>
                            </li>
                        <?php elseif ($vehicle['Status'] === 'Confirmed') : ?>
                            <li>
                                <form action="mark_status.php" method="post">
                                    <input type="hidden" name="vehicle_id" value="<?php echo $vehicle['Id']; ?>">
                                    <button type="submit">Mark as Not rented</button>
                                </form>
                            </li>
                        <?php endif; ?>
                    </ul>
                </div>
                <div class="rental-details">
                    <h2>Rental Details</h2>
                    <ul>
                        <?php foreach ($rentals as $rental) : ?>
                            <?php if ($rental['vehicle_id'] == $vehicle['Id']) : ?>
                                <li><strong>Rental ID:</strong> <?php echo $rental['Id']; ?></li>
                                <li><strong>Name:</strong> <?php echo $rental['name']; ?></li>
                                <li><strong>Email:</strong> <?php echo $rental['email']; ?></li>
                                <li><strong>Phone:</strong> <?php echo $rental['phone']; ?></li>
                                <li><strong>Rental Duration:</strong> <?php echo $rental['rental_duration']; ?> days</li>
                                <li><strong>Owner Name:</strong> <?php echo $rental['owner_name']; ?></li>
                                <li><strong>Owner Email:</strong> <?php echo $rental['owner_email']; ?></li>
                                <li><strong>Owner Phone:</strong> <?php echo $rental['owner_phone']; ?></li>
                            <?php endif; ?>
                        <?php endforeach; ?>
                    </ul>
                </div>
            </div>
        <?php endforeach; ?>
    </main>

    <footer class="footer">
        &copy; 2024 SL Moto. All rights reserved.
    </footer>
</body>

</html>