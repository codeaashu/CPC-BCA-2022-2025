<?php
include_once("Php/Conn.php");
include_once("Php/vehicleClass.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
   
    $title = $_POST["vehicle_name"];
    $description = $_POST["description"];
    $price = $_POST["price"];
    $phone_number = $_POST["phone_number"];
    $time_duration = $_POST["time_duration"];
    $user_name = $_POST["user_name"]; 
    $user_email = $_POST["email"]; 
    $location = $_POST["location"];
    $status = $_POST["status"];

    if (isset($_FILES["image_file"]) && $_FILES["image_file"]["error"] == 0) {
        $targetDirectory = "uploads/";
        $fileName = basename($_FILES["image_file"]["name"]);
        $targetFilePath = $targetDirectory . $fileName;

        
        if (file_exists($targetFilePath)) {
            echo "Sorry, the file already exists.";
        } else {
            if (move_uploaded_file($_FILES["image_file"]["tmp_name"], $targetFilePath)) {
                try {
                
                    $vehicle = new Vehicle();
                    $vehicleID = $vehicle->AddVehicle($title, $description, $price, $targetFilePath, $phone_number, $time_duration, $user_name, $user_email,$location,$status);
                    
            
                    header("Location: Php/add_vehicle_form.php");
                    exit();
                } catch (Exception $ex) {
                    unlink($targetFilePath);
                    echo "Error adding vehicle: " . $ex->getMessage();
                }
            } else {
                echo "Sorry, there was an error uploading your file.";
            }
        }
    } else {
        echo "Please select an image file.";
    }
} else {
    // Redirect to the form page if the form is not submitted
    header("Location: add_vehicle_form.php");
    exit();
}
?>
