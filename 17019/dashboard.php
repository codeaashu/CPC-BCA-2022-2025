<?php
session_start();
require 'db.php';

if (!isset($_SESSION['user_id'])) {
    die("Access denied.");
}

$role = $_SESSION['role'];
$user_id = $_SESSION['user_id'];

$sql = ($role === 'admin') ? 
    "SELECT b.id, u.name, b.event_type, b.event_date, b.venue, b.phone FROM bookings b JOIN users u ON b.user_id = u.id" :
    "SELECT b.id, u.name, b.event_type, b.event_date, b.venue, b.phone FROM bookings b JOIN users u ON b.user_id = u.id WHERE b.user_id = $user_id";

$result = $conn->query($sql);

echo "<h2>Booking History</h2><table border='1'>";
echo "<tr><th>ID</th><th>User</th><th>Event Type</th><th>Date</th><th>Venue</th><th>Phone</th></tr>";

while ($row = $result->fetch_assoc()) {
    echo "<tr>
        <td>{$row['id']}</td>
        <td>{$row['name']}</td>
        <td>{$row['event_type']}</td>
        <td>{$row['event_date']}</td>
        <td>{$row['venue']}</td>
        <td>{$row['phone']}</td>
    </tr>";
}

echo "</table>";
?>
<a href='logout.php'>Logout</a>
