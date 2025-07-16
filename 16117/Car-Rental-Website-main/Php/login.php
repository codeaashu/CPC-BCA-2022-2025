<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Login</title>
    <link rel="stylesheet" href="../styles.css">
    <style>
        .user-login-container {
            background-color: #27ae60;
            color: white;
        }
        .user-login-container h2 {
            color: #ffffff;
        }
        .user-login-container button {
            background-color: #2ecc71;
        }
        .user-login-container button:hover {
            background-color: #27ae60;
        }
        .user-login-container a {
            color: #ffffff;
            text-decoration: underline;
        }
        .error-message {
            background-color: #e74c3c;
            color: white;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <div class="container user-login-container">
        <h2>User Login</h2>
        <?php
        if (isset($_GET['error'])) {
            if ($_GET['error'] === 'invalid_credentials') {
                echo '<div class="error-message">Invalid email or password</div>';
            } elseif ($_GET['error'] === 'system_error') {
                echo '<div class="error-message">System error occurred. Please try again later.</div>';
            }
        }
        ?>
        <form action="../loginhandle.php" method="post">
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Login as User</button>
        </form>
        <p>Don't have an account? <a href="registration.php">Register</a></p>
        <p>Are you an admin? <a href="admin_login.php">Admin Login</a></p>
    </div>
</body>
</html>
