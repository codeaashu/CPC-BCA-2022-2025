<?php

include_once("Php/Conn.php");

class Vehicle
{
    public $ID;
    public $Title;
    public $Description;
    public $Price;
    public $Image;
    public $Phone_Number;
    public $Time_Duration;
    public $User_Name;
    public $User_Email;
    public $Location; 
    public $Status;

    // Method to add vehicle details
    private function notifyWebSocket($vehicleId, $action = 'update') {
        $wsClient = new WebSocket\Client('ws://localhost:8080');
        $wsClient->send(json_encode([
            'action' => 'vehicle_update',
            'vehicleId' => $vehicleId
        ]));
        $wsClient->close();
    }

    public function AddVehicle($title, $description, $price, $image, $phone_number, $time_duration, $user_name, $user_email, $location,$status)
    {
        try {
            $query = "INSERT INTO `Vehicles` (`Title`, `Description`, `Price`, `Image`, `Phone_Number`, `Time_Duration`, `User_Name`, `User_Email`, `Location`,`Status`) 
                      VALUES (:Title, :Description, :Price, :Image, :Phone_Number, :Time_Duration, :User_Name, :User_Email, :Location,:Status)";
            $conn = Conn::GetConnection();
            $st = $conn->prepare($query);
            $st->bindValue(":Title", $title, PDO::PARAM_STR);
            $st->bindValue(":Description", $description, PDO::PARAM_STR);
            $st->bindValue(":Price", $price, PDO::PARAM_INT);
            $st->bindValue(":Image", $image, PDO::PARAM_STR);
           
            $st->bindValue(":Phone_Number", $phone_number, PDO::PARAM_STR);
            $st->bindValue(":Time_Duration", $time_duration, PDO::PARAM_STR);
            $st->bindValue(":User_Name", $user_name, PDO::PARAM_STR);
            $st->bindValue(":User_Email", $user_email, PDO::PARAM_STR);
            $st->bindValue(":Location", $location, PDO::PARAM_STR); 
            $st->bindValue(":Status", $status, PDO::PARAM_STR);
            $st->execute();
            $vehicleId = $conn->lastInsertId();
            
            // Notify WebSocket server about the new vehicle
            $this->notifyWebSocket($vehicleId, 'create');
            
            return $vehicleId;
        } catch (Exception $ex) {
            throw $ex;
        }
    }

    // Method to get all vehicle details
    public static function GetVehicles()
    {
        try {
            $query = "SELECT `Id`, `Title`, `Description`, `Price`, `Image`, `Phone_Number`, `Time_Duration`, `User_Name`, `User_Email`, `Location`,`Status` FROM `Vehicles`";
            $conn = Conn::GetConnection();
            $vehicles = array();
            $result = $conn->query($query);
            foreach ($result as $row) {
                $vehicle = new Vehicle();
                $vehicle->ID = $row['Id'];
                $vehicle->Title = $row['Title'];
                $vehicle->Description = $row['Description'];
                $vehicle->Price = $row['Price'];
                $vehicle->Image = $row['Image'];
                $vehicle->Phone_Number = $row['Phone_Number'];
                $vehicle->Time_Duration = $row['Time_Duration'];
                $vehicle->User_Name = $row['User_Name'];
                $vehicle->User_Email = $row['User_Email'];
                $vehicle->Location = $row['Location'];
                $vehicle->Status = $row['Status'];
                array_push($vehicles, $vehicle);
            }
            return $vehicles;
        } catch (Exception $ex) {
            throw $ex;
        }
    }

    // Method to update vehicle details
    public function UpdateVehicle($id, $title, $description, $price, $image, $phone_number, $time_duration, $user_name, $user_email, $location)
    {
        try {
            $query = "UPDATE `Vehicles` SET `Title`=:Title, `Description`=:Description, `Price`=:Price, `Image`=:Image,
                      `Phone_Number`=:Phone_Number, `Time_Duration`=:Time_Duration, `User_Name`=:User_Name, `User_Email`=:User_Email,
                      `Location`=:Location
                      WHERE `ID`=:ID";
            $conn = Conn::GetConnection();
            $st = $conn->prepare($query);
            $st->bindValue(":Title", $title, PDO::PARAM_STR);
            $st->bindValue(":Description", $description, PDO::PARAM_STR);
            $st->bindValue(":Price", $price, PDO::PARAM_INT);
            $st->bindValue(":Image", $image, PDO::PARAM_STR);
            $st->bindValue(":Phone_Number", $phone_number, PDO::PARAM_STR);
            $st->bindValue(":Time_Duration", $time_duration, PDO::PARAM_STR);
            $st->bindValue(":User_Name", $user_name, PDO::PARAM_STR);
            $st->bindValue(":User_Email", $user_email, PDO::PARAM_STR);
            $st->bindValue(":Location", $location, PDO::PARAM_STR); 
            $st->bindValue(":ID", $id, PDO::PARAM_INT);
            $st->execute();
            
            // Notify WebSocket server about the updated vehicle
            $this->notifyWebSocket($id, 'update');
        } catch (Exception $ex) {
            throw $ex;
        }
    }

    // Method to delete vehicle details
    public function DeleteVehicle($id)
    {
        try {
            $query = "DELETE FROM `Vehicles` WHERE `ID`=:ID";
            $conn = Conn::GetConnection();
            $st = $conn->prepare($query);
            $st->bindValue(":ID", $id, PDO::PARAM_INT);
            $st->execute();
            
            // Notify WebSocket server about the deleted vehicle
            $this->notifyWebSocket($id, 'delete');
        } catch (Exception $ex) {
            throw $ex;
        }
    }
}

?>
