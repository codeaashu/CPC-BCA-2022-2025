<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login</title>
    <link rel="stylesheet" href="../styles.css">
    <style>
        .admin-login-container {
            background-color: #2c3e50;
            color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .admin-login-container h2 {
            color: #3498db;
            margin-bottom: 20px;
            text-align: center;
        }
        .admin-login-container button {
            background-color: #3498db;
            width: 100%;
            padding: 12px;
            border: none;
            border-radius: 5px;
            color: white;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .admin-login-container button:hover {
            background-color: #2980b9;
        }
        .admin-login-container a {
            color: #3498db;
            text-decoration: underline;
            transition: color 0.3s;
        }
        .admin-login-container a:hover {
            color: #2980b9;
        }
        .error-message {
            background-color: #e74c3c;
            color: white;
            padding: 12px;
            border-radius: 5px;
            margin-bottom: 20px;
            text-align: center;
            font-size: 14px;
        }
        .warning-message {
            background-color: #f39c12;
            color: white;
            padding: 12px;
            border-radius: 5px;
            margin-bottom: 20px;
            text-align: center;
            font-size: 14px;
        }
        .input-group {
            position: relative;
            margin-bottom: 20px;
        }
        .input-group input {
            width: 100%;
            padding: 12px;
            border: 1px solid #34495e;
            border-radius: 5px;
            background-color: #34495e;
            color: white;
            font-size: 14px;
        }
        .input-group input::placeholder {
            color: #bdc3c7;
        }
    </style>
</head>
<body>
    <?php
    session_start();
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    ?>
    <div class="container admin-login-container">
        <h2>Admin Login</h2>
        <?php
        if (isset($_GET['error'])) {
            switch($_GET['error']) {
                case 'invalid_credentials':
                    echo '<div class="error-message">Invalid admin credentials. Please check your email and password.</div>';
                    break;
                case 'invalid_email':
                    echo '<div class="error-message">Please enter a valid email address.</div>';
                    break;
                case 'too_many_attempts':
                    echo '<div class="warning-message">Too many failed attempts. Please try again after 15 minutes.</div>';
                    break;
                case 'system_error':
                    echo '<div class="error-message">System error occurred. Please try again later.</div>';
                    break;
            }
        }
        ?>
        <form action="../admin_loginhandle.php" method="post" autocomplete="off">
            <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($_SESSION['csrf_token']); ?>">
            <div class="input-group">
                <input type="email" name="email" placeholder="Admin Email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Please enter a valid email address">
            </div>
            <div class="input-group">
                <input type="password" name="password" placeholder="Password" required minlength="6">
            </div>
            <button type="submit">Login as Admin</button>
        </form>
        <p style="text-align: center; margin-top: 20px;">Regular user? <a href="login.php">User Login</a></p>
    </div>
</body>
</html>