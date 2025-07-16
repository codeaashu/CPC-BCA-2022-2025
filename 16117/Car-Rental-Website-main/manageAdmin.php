<?php
session_start();

if (!isset($_SESSION['user_id']) || $_SESSION['user_type'] !== 'admin') {
    header("Location: Php/login.php");
    exit();
}

include("Php/Conn.php");

function getAllAdmins($conn) {
    $stmt = $conn->query("SELECT * FROM Users WHERE user_type = 'admin'");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}


function deleteAdmin($conn, $adminId) {
    $stmt = $conn->prepare("DELETE FROM Users WHERE Id = :admin_id");
    $stmt->bindParam(':admin_id', $adminId);
    $stmt->execute();
}


$admins = getAllAdmins(Conn::GetConnection());

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["delete_admin"])) {
    $adminId = $_POST["admin_id"];
    deleteAdmin(Conn::GetConnection(), $adminId);
    header("Location: admin.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Management</title>
    <link rel="stylesheet" href="Css/admin.css">
    <link rel="stylesheet" href="Css/manageAdmin.css">

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
                <li><a href="logout.php">Logout</a></li>
            </ul>
        </div>
    </nav>
    <div class="admin-content">
        <h1>Admin Management</h1>
        <div class="admin-list">
            <h2>All Admins</h2>
            <ul>
                <?php foreach ($admins as $admin) : ?>
                    <li>
                        <strong>Username:</strong> <?php echo $admin['username']; ?><br>
                        <strong>Email:</strong> <?php echo $admin['email']; ?><br>
                        <form action="" method="post">
                            <input type="hidden" name="admin_id" value="<?php echo $admin['Id']; ?>">
                            <button type="submit" name="delete_admin">Delete</button>
                        </form>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
    </div>

</body>

</html>
