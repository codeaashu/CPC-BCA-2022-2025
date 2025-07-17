<?php
session_start(); // Start the session

// Check if the session variables and POST data are set
if (!isset($_SESSION['original_order']) || !isset($_POST['answers'])) {
    die('Error: Missing session data or form data.');
}

// Retrieve session data
$original_order = $_SESSION['original_order'];
echo '<pre>'; print_r($original_order); echo '</pre>';

$selected_answers = $_POST['answers'];
// Sort the selected answers by question ID
ksort($selected_answers);
echo '<pre>'; print_r($selected_answers); echo '</pre>';

//store $selected_answer into the answer column of student table

?>
