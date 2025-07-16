<?php
require 'vendor/autoload.php';
require_once 'Php/Conn.php';

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use React\EventLoop\Factory;

class WebSocketServer implements \Ratchet\MessageComponentInterface {
    protected $clients;
    protected $subscriptions;
    protected $conn;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
        $this->subscriptions = [];
        $this->conn = Conn::GetConnection();
    }

    public function onOpen(\Ratchet\ConnectionInterface $conn) {
        $this->clients->attach($conn);
        echo "New connection! ({$conn->resourceId})\n";
    }

    public function onMessage(\Ratchet\ConnectionInterface $from, $msg) {
        $data = json_decode($msg, true);
        
        if (!isset($data['action'])) {
            return;
        }

        switch ($data['action']) {
            case 'subscribe':
                if (isset($data['vehicleId'])) {
                    $this->subscriptions[$from->resourceId] = $data['vehicleId'];
                }
                break;

            case 'vehicle_update':
                if (isset($data['vehicleId'])) {
                    $this->broadcastVehicleUpdate($data['vehicleId']);
                }
                break;
        }
    }

    public function onClose(\Ratchet\ConnectionInterface $conn) {
        $this->clients->detach($conn);
        unset($this->subscriptions[$conn->resourceId]);
        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(\Ratchet\ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";
        $conn->close();
    }

    protected function broadcastVehicleUpdate($vehicleId) {
        try {
            // Get latest vehicle data
            $stmt = $this->conn->prepare("SELECT * FROM Vehicles WHERE Id = :id");
            $stmt->execute(['id' => $vehicleId]);
            $vehicle = $stmt->fetch(\PDO::FETCH_ASSOC);

            if ($vehicle) {
                $update = json_encode([
                    'type' => 'vehicle_status',
                    'vehicleId' => $vehicleId,
                    'status' => $vehicle['Status'],
                    'available' => $vehicle['Status'] === 'Available'
                ]);

                // Broadcast to all connected clients
                foreach ($this->clients as $client) {
                    $client->send($update);
                }
            }
        } catch (\Exception $e) {
            echo "Error broadcasting update: {$e->getMessage()}\n";
        }
    }
}

// Create event loop and websocket server
$loop = Factory::create();
$webSocket = new WsServer(new WebSocketServer());
$server = new IoServer(
    new HttpServer($webSocket),
    8080,
    '0.0.0.0'
);

echo "WebSocket server started on port 8080\n";
$server->run();