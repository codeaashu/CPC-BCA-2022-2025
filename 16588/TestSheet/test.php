
<?php
session_start();  // Start the session
// test.php and result.ph is update and stored in web hosting 12-09
// Redirect to login if not logged in
if (!isset($_SESSION['userName']) || !isset($_SESSION['userID'])) {
    header("Location: test_login.php");
    exit();
}




// Include the database connection
include 'db_connection.php';

// Get the session data
$userName = $_SESSION['userName'];  // You can store this during the login phase
$userID = $_SESSION['userID'];     // Same as above
$concatenatedData = $_SESSION['concatenatedData'];  // From the previous step
$teacherID = $_SESSION['teacherID'];
$testID = $_SESSION['testID'];
$testName = $_SESSION['testName'];
$subject = $_SESSION['subject'];
$totalMarks = $_SESSION['total_marks'] ;
$total_questions = $_SESSION['total_questions'];
$total_time = $_SESSION['total_time'];

$sql_check = "SELECT COUNT(*) FROM students WHERE s_id = ? AND test_id = ?";
$stmt_check = $conn->prepare($sql_check);
$stmt_check->bind_param("ii", $userID,$testID);
$stmt_check->execute();
$stmt_check->bind_result($count);
$stmt_check->fetch();
$stmt_check->close();
if ($count > 0) {
  header("Location: test_login.php");
  exit();}
else{


// Check if suspicious activity is detected and store it in the session
// if (isset($_POST['activity'])) {
//     $_SESSION['activity_status'] = $_POST['activity'];  // Store the activity message in the session
// }

// Check if concatenatedData is empty
if (empty($total_time)) {
    die('Error: teacherID is missing.');
}
if (empty($concatenatedData)) {
    die('Error: Test name is missing.');
}

// Sanitize the table name to avoid SQL injection
$tableName = preg_replace('/[^a-zA-Z0-9_]/', '_', $concatenatedData);

// Check if table name is valid
if (!empty($tableName)) {
    // Query to fetch questions and their respective options
    $sql = "SELECT id,question, option1, option2, option3, option4,correct_option FROM `$tableName`";
    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        die("SQL error: " . $conn->error);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Store questions and options in an array
        $questions = [];
        $original_order =[];//this will store the original order
        while ($row = $result->fetch_assoc()) {
            $questions[] = $row;
            // Store [id: correct_option] in the original order array
            $original_order[$row['id']] = $row['correct_option']; 
        }
        //store original order in session to compare later
        $_SESSION['original_order'] = $original_order;  
        shuffle($questions);// shuffle questions for display
    } else {
        echo "No test data found.";
    }

    $stmt->close();
} else {
    echo "Invalid table name provided.";
}
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,600,700,800,900" rel="stylesheet">
    <title>TestSheet</title>
    <link rel="icon" href="assets/images/page_logo.png">
    <!-- Bootstrap core CSS -->
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <!-- Additional CSS Files -->
    <link rel="stylesheet" href="assets/css/fontawesome.css">
    <link rel="stylesheet" href="assets/css/templatemo-grad-school.css">
    <link rel="stylesheet" href="assets/css/owl.css">
    <link rel="stylesheet" href="assets/css/lightbox.css">
    <link rel="stylesheet" href="assets/css/test.css">
    <link rel="stylesheet" href="assets/css/track.css">
    <style>
    form {
        display: none; /* Initially hidden until full-screen is enabled */
        flex-direction: column;
        align-items: flex-start; /* Align form content to the left */
        background-color: #fff;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
    }
    /* Blurred background */
    .blur {
        filter: blur(10px);
        transition: filter 0.3s ease;
    }
    .question {
        margin-bottom: 20px;
    }
    .question p {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .options {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .options label {
        font-size: 18px;
        display: flex;
        align-items: center;
    }
    .options input {
        margin-right: 10px;
    }
    input[type="submit"] {
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #28a745;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 5px;
    }
    /* Custom modal style */
    #exitModal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
        }
        #modalContent {
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        #modalContent button {
            margin: 10px;
            padding: 10px 20px;
            font-size: 16px;
        }
</style>

<script
      defer
      src="https://unpkg.com/face-api.js@0.22.2/dist/face-api.min.js"
    ></script>

</head>

<body>

<header class="main-header clearfix" role="header">
    <div class="logo">
        <a style="margin-left: 3rem;" href="#"><em>Test</em> Sheet</a>
    </div>
</header>

<div class="container" style="margin-top:1vh;max-width:1230px;">
    <br>
    <center><div id="timers">Time Left: <span id="times">00:00</span></div></center>
    <video id="video" width="60" height="50" autoplay muted></video>
    
    <!-- Button to enter full-screen mode -->
    <button id="enterFullScreen" onclick="startMonitoring()">Start the Test in full-Screen Mode</button>
    
    <script defer src="js/script.js"></script>


    <!-- Form for displaying questions -->
    <form id="myForm" method="post" action="result.php" style="color:black;">
        <!-- Hidden inputs for additional data -->
        <input type="hidden" name="studentName" value="<?php echo htmlspecialchars($userName); ?>">
        <input type="hidden" name="studentID" value="<?php echo htmlspecialchars($userID); ?>">
        <input type="hidden" name="teacherID" value="<?php echo htmlspecialchars($teacherID); ?>">
        <input type="hidden" name="testName" value="<?php echo htmlspecialchars($testName); ?>">
        <input type="hidden" name="testID" value="<?php echo htmlspecialchars($testID); ?>">
        <input type="hidden" name="activity_status" id="activity_status" >
        
        <input type="hidden" name="subject" value="<?php echo htmlspecialchars($subject); ?>">
        <input type="hidden" name="totalMarks" value="<?php echo htmlspecialchars($totalMarks); ?>">
        <input type="hidden" name="total_questions" value="<?php echo htmlspecialchars($total_questions); ?>">
        <input type="hidden" name="total_time" id="total_time" value="<?php echo htmlspecialchars($total_time); ?>">

        <?php if (!empty($questions)): ?> 
        <?php foreach ($questions as $index => $question): ?>
            <div class="question">
                <p><?php echo ($index + 1) . ". " . htmlspecialchars($question['question']); ?></p>
                <?php
                // Store options in an array (original order)
                $options = [
                    1 => $question['option1'],
                    2 => $question['option2'],
                    3 => $question['option3'],
                    4 => $question['option4']
                ];
                // Create a shuffled copy of the options array
                $shuffled_options = $options;
                shuffle($shuffled_options);

                // Create a mapping of shuffled option index to original option index
                $option_mapping = [];
                foreach ($shuffled_options as $key => $option) {
                    // Find the original index of the shuffled option
                    $original_index = array_search($option, $options);
                    $option_mapping[$key] = $original_index;
                }
                ?>
                <div class="options">
                <?php foreach ($shuffled_options as $key => $option): ?>
                    <label>
                        <input type="radio" name="answers[<?php echo $question['id']; ?>]" value="<?php echo $option_mapping[$key]; ?>">
                        <?php echo htmlspecialchars($option); ?>
                    </label>
                    <?php endforeach; ?>
                </div>
                
            </div>
            <hr>
        <?php endforeach; ?>
    <?php else: ?>
        <p>No questions available.</p>
    <?php endif; ?>
    <input type="submit" value="Submit">
</form>

</div>
<!-- Custom Exit Full-Screen Modal -->
<div id="exitModal">
    <div id="modalContent">
        <p style="color:black">You are trying to exit full-screen mode.</p>
        <p style="color:black">Click "Submit Test" to submit the test, or "Go Back to Full-Screen" to continue.</p>
        <button id="submitTest">Submit Test</button>
        <button id="goFullScreen">Go Back to Full-Screen</button>
    </div>
</div>

<!-- Scripts -->

<script src="assets/js/test.js"></script>

<script src="assets/js/isotope.min.js"></script>
<script src="assets/js/custom.js"></script>
<script>
    let isFullScreen = false;
    let countdownTime = document.getElementById('total_time').value;
    countdownTime*=60;
    let timerInterval;

     

    // Function to request full-screen mode
    function openFullScreen() {
        let elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { // Firefox
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, and Opera
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { // IE/Edge
            elem.msRequestFullscreen();
        }
        isFullScreen = true;
   
    }





    // Show the form after full-screen is enabled
    function showForm() {
        document.getElementById('enterFullScreen').style.display = 'none'; // Hide the button
        document.getElementById('myForm').style.display = 'flex'; // Show the form
        startTimer(); // Start the countdown timer
    }

    // Add event listener to trigger full-screen mode
    document.getElementById('enterFullScreen').addEventListener('click', function() {
        openFullScreen();
        showForm(); // Show form after entering full-screen 
    });

    // Prevent exiting full-screen mode with keyboard shortcuts
    function preventExitFullScreen(event) {
        if (isFullScreen) {
            const exitKeys = [27, 70, 122]; // ESC, F11, F12
            if (exitKeys.includes(event.keyCode)) {
                event.preventDefault();
            }
        }
    }

    // Timer countdown function
    function startTimer() {
        if (isFullScreen == true ){
        timerInterval = setInterval(function() {
            countdownTime--;
            const minutes = Math.floor(countdownTime / 60);
            const seconds = countdownTime % 60;
            document.getElementById('times').textContent = minutes + ":" + (seconds < 10 ? '0' + seconds : seconds);

            if (countdownTime <= 0) {
                clearInterval(timerInterval);
                alert("Time is up!");
                document.getElementById('myForm').submit(); // Automatically submit the form when time runs out
            }
        }, 1000);
    }
    }

    // Exit the test if full-screen is exited
    document.addEventListener('fullscreenchange', function() {
        if (!document.fullscreenElement) {
            // // Show a custom confirmation dialog to either go back to full-screen mode or submit the test
            
            // const exitConfirmation = confirm("You are attempting to exit full-screen mode. \nClick 'OK' to submit the test, or 'Cancel' to return to full-screen mode.");

            // if (exitConfirmation) {
            //     // If the user confirms, submit the form
            //     document.getElementById('myForm').submit(); 
            // } else if(!exitConfirmation) {
            //     // Otherwise, go back to full-screen mode
            //     openFullScreen();
            // }
            // If the user exits full-screen, show the custom modal
        document.getElementById('exitModal').style.display = 'flex';

        }
    });

    // Prevent user from using certain keys to exit full-screen mode
    document.addEventListener('keydown', preventExitFullScreen);

// Handle modal button clicks
document.getElementById('submitTest').addEventListener('click', function() {
    // Submit the form
    document.getElementById('myForm').submit();
});

document.getElementById('goFullScreen').addEventListener('click', function() {
    // Go back to full-screen mode
    openFullScreen();
    // Hide the modal
    document.getElementById('exitModal').style.display = 'none';
});

// Optional: Start the test in full-screen mode immediately
openFullScreen();

// Detect if user leaves the current tab
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // If the page becomes hidden (user switches tabs), automatically submit the test
        //alert("Switching tabs is not allowed. The test will be submitted.");
        storeSuspiciousActivity('Suspicious Activity : Tab Switched');
        document.getElementById('myForm').submit();
    }
});
// Redirect the user to a specified page if they try to navigate back
    function handleBackButton() {
        // Replace 'specified_page.php' with the URL of the page you want to redirect to
        window.location.href = 'student.php';
    }

    // Push a state to the history stack to prevent the default back button behavior
    window.history.pushState(null, null, window.location.href);

    // Handle the back button behavior
    window.onpopstate = function () {
        handleBackButton();
    };

    // Optionally prevent the back button from functioning as well
    function preventBack() {
        window.history.forward();
    }
    setTimeout(preventBack, 0);
    window.onunload = function () { null };


</script>

<script>
    

    

// Disable Right-Click to prevent "Inspect Element" from being accessed easily
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Disable common developer tools keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) || 
        (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();  // Prevent access to developer tools through shortcuts
    }
});
// Function to submit the form when suspicious activity (like opening dev tools) is detected
function suspiciousActivityDetected() {
    alert('Developer tools detected! Submitting Your tests.');
    storeSuspiciousActivity('Suspicious Activity : Opening Developer Tool');
    document.getElementById('myForm').submit();  // Submit the form
}

// Check if developer tools are opened by measuring execution time
(function detectDevTools() {
    let devtoolsOpen = false;

    const detect = () => {
        // Create a dummy console.log to detect if dev tools are open
        const start = new Date().getTime();
        debugger;  // This keyword will only pause the execution if dev tools are open
        const end = new Date().getTime();

        // If the debugger statement causes a noticeable delay, dev tools might be open
        if (end - start > 100) {  // If execution is delayed by 100ms or more
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                suspiciousActivityDetected();  // Dev tools opened, trigger form submission
            }
        } else {
            devtoolsOpen = false;
        }
    };

    setInterval(detect, 1000);  // Check every second

    window.addEventListener('keydown', detect);  // Check again on key press (F12, etc.)
})();

        // Function to store the suspicious activity text
        function storeSuspiciousActivity(status) {
            document.getElementById('activity_status').value = status;

        }








// Function to blur the background when the modal is visible
    function toggleBackgroundBlur() {
        const exitModal = document.getElementById('exitModal');
        const modalContent = document.getElementById('modalContent');
        const container = document.querySelector('.container');
        
        if (exitModal.style.display === 'flex') {
            container.style.filter = 'blur(10px)';
        } else {
            container.style.filter = 'none';
        }
    }

    // Monitor changes to the modal's visibility
    const observer = new MutationObserver(() => {
        toggleBackgroundBlur();
    });

    // Observe the `display` style of the modal
    const exitModal = document.getElementById('exitModal');
    observer.observe(exitModal, { attributes: true, attributeFilter: ['style'] });

    document.getElementById('exitModal').addEventListener('click', (e) => {
        if (e.target === exitModal) {
            exitModal.style.display = 'none';
        }
    });
    




    
    // Function to handle form submission on browser back button press
function handleBackButtonSubmit() {
    window.addEventListener('popstate', (event) => {
        // Check if the test form exists and is visible
        const form = document.getElementById('myForm');
        if (form && form.style.display !== 'none') {
            storeSuspiciousActivity('Suspicious Activity : leaving test');
            // Prevent default back navigation and submit the form
            form.submit();
        }
    });
}

// Call the function to activate back button handling
handleBackButtonSubmit();



</script>



</body>
</html>
