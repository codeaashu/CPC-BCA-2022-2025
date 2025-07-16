<?php

class Conn
{
    public static function GetConnection()
    {
        try
        {
            $dsn = "mysql:host=localhost;dbname=sl_moto";
            $username = "root";
            $password = "";
            $conn = new PDO($dsn, $username, $password);

            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            $conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

            return $conn;
        }
        catch(Exception $ex)
        {
            error_log("Database Connection Error: " . $ex->getMessage());
            header("Location: admin_login.php?error=system_error");
            exit();
        }
    }
}
?>