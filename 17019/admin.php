<?php
$admin_email = 'admin@example.com';
$admin_password = 'admin123';

require 'db.php';

$stmt = $conn->prepare("SELECT password FROM users WHERE email = ?");
$stmt->bind_param("s", $admin_email);
$stmt->execute();
$stmt->bind_result($hash);
$stmt->fetch();

if (password_verify($admin_password, $hash)) {
    echo "✅ Admin login password verified!";
} else {
    echo "❌ Password does not match.";
}

$stmt->close();
?>
