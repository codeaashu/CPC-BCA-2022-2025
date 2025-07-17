<?php include './db-connection.php'; ?>

<?php
  session_start();

  // If session variables aren't set, try to set them with cookies
  if (!isset($_SESSION['user_id'])) {
    if (isset($_COOKIE['user_id']) && isset($_COOKIE['username'])) {
      $_SESSION['user_id'] = $_COOKIE['user_id'];
      $_SESSION['username'] = $_COOKIE['username'];
    }
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Orphanage Foundation</title>

    <!-- Semantic UI CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css">

    <!-- Custom Styles -->
    <link rel="stylesheet" href="./css/main.css">

    <!-- Semantic UI JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.js"></script>

    <style>
        body {
            background-color:rgb(255, 255, 255);
            margin: 0;
            padding: 0;
        }
        .top-menu {
            background-color:rgb(2, 78, 97) !important;
            padding: 15px 0;
        }
        .top-menu a {
            color: #ffffff !important;
            font-size: 1.2em;
            font-weight: bold;
            margin-right: 20px;
        }
        .logo {
            font-size: 1.8em;
            font-weight: bold;
            color: #ffffff;
        }
    </style>
</head>
<body>

<!-- Navigation Bar -->
<div class="ui fixed inverted menu top-menu">
    <div class="ui container">
        <a href="index.php" class="header item logo">Brave-Heart Foundation</a>
        <div class="right menu">
            <a href="approach-strategy.php" class="item">About Us</a>
            <a href="program.php" class="item">Programs</a>
            <a href="donation-form.php" class="item">Donate</a>
            <a href="newsletter.php" class="item">Newsletter</a>
            <a href="contact-us.php" class="item">Contact</a>
        </div>
    </div>
</div>

<!-- Push content down to avoid overlapping with fixed menu -->
<div style="padding-top: 70px;"></div>
