<?php
session_start();
include("Php/Conn.php");

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["vehicle_id"])) {
    $vehicleId = $_POST['vehicle_id'];

    try {
        $conn = Conn::GetConnection();

    
        $stmt = $conn->prepare("SELECT Status FROM Vehicles WHERE Id = :vehicle_id");
        $stmt->bindParam(':vehicle_id', $vehicleId);
        $stmt->execute();
        $status = $stmt->fetchColumn();

       
        if ($status === 'pending') {
           
            $updateStmt = $conn->prepare("UPDATE Vehicles SET Status = 'Confirmed' WHERE Id = :vehicle_id");
        } elseif ($status === 'Confirmed') { 
            $updateStmt = $conn->prepare("UPDATE Vehicles SET Status = 'not rented yet' WHERE Id = :vehicle_id");
        }

    
        if (isset($updateStmt)) {
        
            $updateStmt->bindParam(':vehicle_id', $vehicleId);
            $updateStmt->execute();
        }
        header("Location: admin.php");
        exit();
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    header("Location: admin.php");
    exit();
}
?>
