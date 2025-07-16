<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
session_start(); // Start the session

// Database connection
$servername = "sql311.infinityfree.com"; // Replace with your server name
$username = "if0_37331201";        // Replace with your database username
$password = "W33LAgXuWC3JFnI";            // Replace with your database password
$dbname = "if0_37331201_testzone";      // Replace with your database name


$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


// // Handle AJAX request to send OTP
// if (isset($_POST['forgot']) && isset($_POST['email'])) {
//     $teacher_email = trim($_POST['email']);

//     header('Content-Type: application/json'); // Important

//     if (!filter_var($teacher_email, FILTER_VALIDATE_EMAIL)) {
//         echo json_encode(['success' => false, 'error' => 'Invalid email format']);
//         exit();
//     }

//     $stmt = $conn->prepare("SELECT teacher_id FROM teachers WHERE teacher_email = ?");
//     $stmt->bind_param("s", $teacher_email);
//     $stmt->execute();
//     $result = $stmt->get_result();

//     if ($result && $result->num_rows > 0) {
//         $otp = rand(100000, 999999);
//         $_SESSION['forgot_email'] = $teacher_email;
//         $_SESSION['forgot_otp'] = $otp;

//         $subject = "Password Reset OTP";
//         $message = "Your OTP to reset your TestSheet password is: $otp";
//         $headers = "From: no-reply@testsheet.com";

//         if (mail($teacher_email, $subject, $message, $headers)) {
//             echo json_encode(['success' => true]);
//             exit();
//         } else {
//             echo json_encode(['success' => false, 'error' => 'Failed to send email']);
//             exit();
//         }
//     } else {
//         echo json_encode(['success' => false, 'error' => 'Email not found']);
//         exit();
//     }
// }




// // Handle OTP verification and password reset
// if (isset($_POST['reset_password']) && isset($_POST['otp']) && isset($_POST['new_password'])) {
//     header('Content-Type: application/json');

//     if (!isset($_SESSION['forgot_email']) || !isset($_SESSION['forgot_otp'])) {
//         echo json_encode(['success' => false, 'error' => 'Session expired']);
//         exit();
//     }

//     $entered_otp = $_POST['otp'];
//     $new_password = password_hash($_POST['new_password'], PASSWORD_DEFAULT);

//     if ($entered_otp == $_SESSION['forgot_otp']) {
//         $email = $_SESSION['forgot_email'];
//         $stmt = $conn->prepare("UPDATE teachers SET teacher_pass = ? WHERE teacher_email = ?");
//         $stmt->bind_param("ss", $new_password, $email);
//         if ($stmt->execute()) {
//             unset($_SESSION['forgot_email'], $_SESSION['forgot_otp']);
//             echo json_encode(['success' => true]);
//             exit();
//         } else {
//             echo json_encode(['success' => false, 'error' => 'Failed to update password']);
//             exit();
//         }
//     } else {
//         echo json_encode(['success' => false, 'error' => 'Invalid OTP']);
//         exit();
//     }
// }






if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['login'])) {
        // Sanitize and validate inputs
        $teacher_name  = trim($_POST['name']);
        $teacher_email = trim($_POST['email']);
        $teacher_pass  = $_POST['password'];

        if (!filter_var($teacher_email, FILTER_VALIDATE_EMAIL)) {
            $login_error = "Invalid email format.";
        } else {
            // Use prepared statement to prevent SQL injection
            $stmt = $conn->prepare("SELECT teacher_id, teacher_pass, teacher_gender FROM teachers WHERE teacher_name = ? AND teacher_email = ?");
            $stmt->bind_param("ss", $teacher_name, $teacher_email);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result && $result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $hashed_password = $row['teacher_pass'];

                 if (!empty($hashed_password) && password_verify($teacher_pass, $hashed_password)) {
        // Authentication successful
                    $_SESSION['teacherName']   = $teacher_name;
                    $_SESSION['teacherID']     = $row['teacher_id'];
                    $_SESSION['teacherGender'] = $row['teacher_gender'];

                    header("Location: teacher.php");
                    exit();
                } else {
                    $login_error = "❌ Invalid password.";
                }
            } else {
                $login_error = "❌ Invalid username or email.";
            }
            $stmt->close();
        }
    }


//     if (isset($_POST['signup'])) {
//     $teacher_name = $_POST['name'];
//     $teacher_email = $_POST['email'];
//     $teacher_mobile = $_POST['mobile'];
//     $teacher_gender = $_POST['satisfaction'];

//     $otp = rand(100000, 999999); // Generate 6-digit OTP

//     // Send OTP to email
//     $subject = "Your OTP for TestSheet Registration";
//     $message = "Dear $teacher_name,\n\nYour OTP for registration is: $otp\n\nRegards,\nTestSheet Team";
//     $headers = "From: no-reply@testsheet.com"; // update to your domain

//     if (mail($teacher_email, $subject, $message, $headers)) {
//         $_SESSION['signup_data'] = [
//             'name' => $teacher_name,
//             'email' => $teacher_email,
//             'mobile' => $teacher_mobile,
//             'gender' => $teacher_gender,
//             'otp' => $otp
//         ];
//         header("Location: verify_otp.php");
//         exit();
//     } else {
//         echo "Failed to send OTP. Please check your email address.";
//     }
// }


    // if (isset($_POST['signup'])) {
    //     $teacher_name = $_POST['name'];
    //     $teacher_pass = $_POST['password'];
    //     $teacher_gender = $_POST['satisfaction'];

    //     // Hash the password for security
    //     $hashed_password = password_hash($teacher_pass, PASSWORD_DEFAULT);

    //     // Generate a unique 5-digit teacher_id
    //     do {
    //         $teacher_id = rand(10000, 99999);
    //         $check_id_query = "SELECT teacher_id FROM teachers WHERE teacher_id = $teacher_id";
    //         $result = $conn->query($check_id_query);
    //     } while ($result->num_rows > 0);

    //     // Insert the new teacher into the database
    //     $insert_query = "INSERT INTO teachers (teacher_id, teacher_name, teacher_pass, teacher_gender) 
    //                      VALUES ($teacher_id, '$teacher_name', '$hashed_password', '$teacher_gender')";

    //     if ($conn->query($insert_query) === TRUE) {
    //         $_SESSION['teacherID'] = $teacher_id;
    //         $_SESSION['teacherName'] = $teacher_name;
    //         $_SESSION['teacherGender'] = $teacher_gender;

    //         header("Location: login_signup_teacher.php");
    //         exit();
    //     } else {
    //         echo "Error: " . $insert_query . "<br>" . $conn->error;
    //     }
    // }
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['signup']) && isset($_POST['password'])) {
    $data = $_SESSION['signup_data'];
    $name = $conn->real_escape_string($data['name']);
    $email = $conn->real_escape_string($data['email']);
    $gender = $conn->real_escape_string($data['gender']);
    $pass = password_hash($_POST['password'], PASSWORD_DEFAULT);

    do {
        $teacher_id = rand(10000, 99999);
        $check = $conn->query("SELECT teacher_id FROM teachers WHERE teacher_id = $teacher_id");
    } while ($check->num_rows > 0);

    $sql = "INSERT INTO teachers (teacher_id, teacher_name, teacher_pass, teacher_gender, teacher_email)
            VALUES ($teacher_id, '$name', '$pass', '$gender', '$email')";

    if ($conn->query($sql)) {
        $_SESSION['teacherID'] = $teacher_id;
        $_SESSION['teacherName'] = $name;
        $_SESSION['teacherGender'] = $gender;
        header("Location: login_signup_teacher.php");
        exit();
    } else {
        echo "Error: " . $conn->error;
    }
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
    <link rel="stylesheet" href="assets/css/login_signup.css" />
    <link rel="icon" href="assets/images/page_logo.png">
    <link rel="stylesheet" href="assets/css/fontawesome.css">
    <link rel="stylesheet" href="assets/css/templatemo-grad-school.css">
    <link rel="stylesheet" href="assets/css/owl.css">
    <link rel="stylesheet" href="assets/css/gender.css">
    <link rel="stylesheet" href="assets/css/lightbox.css">
    <link rel="stylesheet" href="assets/css/responsive.css">
    <link rel="stylesheet" href="assets/css/track.css">
</head>
<body>
    <!-- Header -->
    <header class="main-header clearfix" style="display: block;" role="header">
        <div class="logo">
            <a style="margin-left: 3rem;" href="#"><em>Test</em> Sheet</a>
        </div>
        <a href="#menu" class="menu-link"><i class="fa fa-bars"></i></a>
        <nav id="menu" class="main-nav" role="navigation">
            <ul class="main-menu">
                <li><a href="index.php">Home</a></li>
            </ul>
        </nav>
    </header>
    
    <section class="wrapper">
        <div class="form login">
            <header>Login</header>
            <form method="POST">
                <input type="text" name="name" placeholder="Name" required />
                <input type="text" name="email" placeholder="E-Mail" required /> 
                <input type="password" name="password" placeholder="Password" required />
                
                <input type="submit" name="login" value="Login" style="margin-top: 85px;"/>


                <p><a href="#" onclick="showForgotPasswordForm()" style="color:white">Forgot Password?</a></p>

            </form>
            <?php if (isset($login_error)) { echo "<p style='color: red;'>$login_error</p>"; } ?>
        </div>

        <div class="form forgot" style="display:none;">
  <header>Reset Password</header>
  <form id="forgotForm">
    <input type="email" name="email" placeholder="Enter Registered Email" required>
    <button type="button" id="sendForgotOTPs" onclick="sendForgotOTP()">Send OTP</button>

    <div id="forgotOtpSection" style="display: none;">
      <input type="text" name="otp" placeholder="Enter OTP" required style="width: -webkit-fill-available;margin-bottom: 45px;">
      <button type="button" onclick="verifyForgotOTP()" style="width: -webkit-fill-available;">Verify OTP</button>
    </div>
    <div id="forgotpassSection" style="display: none;">
      <input type="password" name="new_password" placeholder="New Password" required style="    width: -webkit-fill-available;margin-bottom: 40px;">
      <button type="button" onclick="resetPassword()" style="margin-top: 45px;width: -webkit-fill-available;">Reset Password</button>
    </div>
    <p id="forgotMessage" style="color:red;"></p>
  </form>
</div>

        <div class="form signup">
            <header>Signup</header>
            <form method="POST" onsubmit="return validatePassword()" id="signupForm">
                <input class="name" type="text" name="name" placeholder="Enter Name" required />
                <input type="email" name="email" placeholder="Enter Email" required />
                <p id="message" style="color: red;"></p>

               <button type="button" id="sendOtpBtn" name="signup" onclick="sendOTP()" style="background: rgba(22, 34, 57, 0.95);color: white;font-size: medium;font-weight: 500;border-radius: 8px;">Send OTP</button>


    <div id="otpSection" style="display:none;">
        <input type="text" id="otpInput" placeholder="Enter OTP" required />
        <button type="button" onclick="verifyOTP()" style="height: 40px;border-radius: 10px;padding: 10px;margin-left: 29px;color: white;background-color: rgba(22, 34, 57, 0.95);">Verify OTP</button>
    </div>
                
                <div class="normal-container">
                    <div class="smile-rating-container">
                        <div class="smile-rating-toggle-container" style="display: inline-flex;">
                            <input id="meh" name="satisfaction" type="radio" value="Male" checked /> 
                            <input id="fun" name="satisfaction" type="radio" value="Female" /> 
                            <label for="meh" class="rating-label rating-label-meh">Male</label>
                            <div class="smile-rating-toggle"></div>
                            <div class="rating-eye rating-eye-left"></div>
                            <div class="rating-eye rating-eye-right"></div>
                            <div class="mouth rating-eye-bad-mouth"></div>
                            <div class="toggle-rating-pill"></div>
                            <label for="fun" class="rating-label rating-label-fun">Female</label>
                        </div>
                    </div>
                </div>
                <div id="passwordSection" style="display: none;">
                 <input id="password" class="password" type="password" name="password" placeholder="Create Password" required style="margin: 10px;width: -webkit-fill-available;"/> 
                <input id="confirm_password" class="password" type="password" placeholder="Confirm Password" required style="margin: 10px;width: -webkit-fill-available;"/> 
                
                <div class="checkbox">
                    <input type="checkbox" id="signupCheck" required />
                    <label for="signupCheck" style="color: black;">I accept all terms & conditions</label>
                </div>
                </div>
                <input type="submit" name="signup" value="Signup" />
            </form>
        </div>

        <script>
            const wrapper = document.querySelector(".wrapper"),
                signupHeader = document.querySelector(".login header"),
                loginHeader = document.querySelector(".signup header");

            loginHeader.addEventListener("click", () => {
                wrapper.classList.add("active");
            });
            signupHeader.addEventListener("click", () => {
                wrapper.classList.remove("active");
            });
        </script>

        <script src="assets/js/isotope.min.js"></script>
        <script src="assets/js/custom.js"></script>
    </section>
    <script>
        function validatePassword() {
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirm_password").value;

            if (password !== confirmPassword) {
                alert("Passwords do not match. Please try again.");
                return false; // Prevent form submission
            }
            return true; // Allow form submission
        }
    </script>
    <script>
function togglePassword() {
    let pass = document.getElementById("password");
    let cpass = document.getElementById("confirm_password");
    pass.type = pass.type === "password" ? "text" : "password";
    cpass.type = cpass.type === "password" ? "text" : "password";
}
</script>

    <script>
let generatedOTP = "";
// let isOTPVerified = false;

function sendOTP() {
    const formData = new FormData(document.getElementById('signupForm'));
    const email = formData.get("email");

    // Step 1: Check if email exists
    fetch('check_email.php', {
        method: 'POST',
        body: new URLSearchParams({ email })
    })
    .then(res => res.json())
    .then(data => {
        if (data.exists) {
            document.getElementById("message").innerText = "❌ Email already registered. Try logging in.";
        } else {
            // Proceed to send OTP
            document.getElementById("sendOtpBtn").remove();
            document.getElementById("otpSection").style.display = "block";
            document.getElementById("message").innerText = "⏳ Sending OTP...";

            fetch('send_otp.php', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    generatedOTP = data.otp;
                    document.getElementById("message").innerText = "✅ OTP sent to your email!";
                } else {
                    document.getElementById("message").innerText = "❌ Error sending OTP.";
                    restoreSendOtpButton(); // Show the button again
                }
            })
            .catch(() => {
                document.getElementById("message").innerText = "❌ Network error. Try again.";
                restoreSendOtpButton();
            });
        }
    })
    .catch(err => {
        console.error(err);
        document.getElementById("message").innerText = "❌ Could not validate email.";
    });
}


function verifyOTP() {
    const enteredOTP = document.getElementById("otpInput").value;
    if (enteredOTP === generatedOTP) {
        isOTPVerified = true;
        document.getElementById("passwordSection").style.display = "block";
        document.getElementById("otpSection").remove(); // Remove OTP section
        document.getElementById("sendOtpBtn").remove(); // ✅ Remove the Send OTP button
        document.getElementById("message").innerText = "✅ OTP Verified! Now set your password.";
    } else {
        isOTPVerified = false;
        document.getElementById("message").innerText = "❌ Invalid OTP.";
    }
}




document.getElementById("signupForm").addEventListener("submit", function(e) {
    const pass = document.getElementById("password").value;
    const cpass = document.getElementById("confirm_password").value;

    if (!isOTPVerified) {
        e.preventDefault();
        document.getElementById("message").innerText = "❌ Please verify OTP before signing up.";
        return;
    }

    if (pass !== cpass) {
        e.preventDefault();
        document.getElementById("message").innerText = "❌ Passwords do not match!";
        return;
    }
});
</script>
<script>
document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.querySelector("input[name='name']");
    const emailInput = document.querySelector("input[name='email']");
    const passwordInput = document.getElementById("password");

    const nameMessage = document.createElement("small");
    const emailMessage = document.createElement("small");
    const passMessage = document.createElement("small");

    nameInput.insertAdjacentElement("afterend", nameMessage);
    emailInput.insertAdjacentElement("afterend", emailMessage);
    passwordInput?.insertAdjacentElement("afterend", passMessage);

    // Name validation
    nameInput.addEventListener("input", function () {
        const nameVal = nameInput.value.trim();
        const nameRegex = /^[A-Za-z ]{3,}$/;
        if (!nameRegex.test(nameVal)) {
            nameMessage.innerText = "❌ Name should be at least 3 characters and letters only.";
            nameMessage.style.color = "red";
        } else {
            nameMessage.innerText = "✅ Name looks good.";
            nameMessage.style.color = "green";
        }
    });

    // Email validation
    emailInput.addEventListener("input", function () {
        const emailVal = emailInput.value.trim();
        const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(emailVal)) {
            emailMessage.innerText = "❌ Enter a valid email address.";
            emailMessage.style.color = "red";
        } else {
            emailMessage.innerText = "✅ Email format is valid.";
            emailMessage.style.color = "green";
        }
    });

    // Password strength validation
    passwordInput?.addEventListener("input", function () {
        const passVal = passwordInput.value;
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!strongRegex.test(passVal)) {
            passMessage.innerText = "❌ Password must be 8+ chars, include uppercase, lowercase & number.";
            passMessage.style.color = "red";
        } else {
            passMessage.innerText = "✅ Strong password.";
            passMessage.style.color = "green";
        }
    });
});
</script>
<script>
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signupForm");

    const nameInput = form.querySelector("input[name='name']");
    const emailInput = form.querySelector("input[name='email']");
    const passwordInput = form.querySelector("#password");
    const confirmPasswordInput = form.querySelector("#confirm_password");
    const checkbox = form.querySelector("#signupCheck");
    const messageBox = document.getElementById("message");

    let isOTPVerified = false; // flag already declared

    // Insert validation messages
    const nameMsg = document.createElement("small");
    nameInput.after(nameMsg);
    const emailMsg = document.createElement("small");
    emailInput.after(emailMsg);
    const passMsg = document.createElement("small");
    passwordInput?.after(passMsg);
    const cpassMsg = document.createElement("small");
    confirmPasswordInput?.after(cpassMsg);

    // Regex patterns
    const nameRegex = /^[A-Za-z ]{3,}$/;
    const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    // Live Name Validation
    nameInput.addEventListener("input", () => {
        if (!nameRegex.test(nameInput.value.trim())) {
            nameMsg.innerText = "❌ Name must be 3+ letters (A-Z, a-z)";
            nameMsg.style.color = "red";
        } else {
            nameMsg.innerText = "✅ Valid name";
            nameMsg.style.color = "green";
        }
    });

    // Live Email Validation
    emailInput.addEventListener("input", () => {
        if (!emailRegex.test(emailInput.value.trim())) {
            emailMsg.innerText = "❌ Invalid email format";
            emailMsg.style.color = "red";
        } else {
            emailMsg.innerText = "✅ Valid email";
            emailMsg.style.color = "green";
        }
    });

    // Live Password Validation
    passwordInput?.addEventListener("input", () => {
        if (!passRegex.test(passwordInput.value)) {
            passMsg.innerText = "❌ Password must be 8+ chars, include A-Z, a-z, 0-9";
            passMsg.style.color = "red";
        } else {
            passMsg.innerText = "✅ Strong password";
            passMsg.style.color = "green";
        }
    });

    // Confirm Password Check
    confirmPasswordInput?.addEventListener("input", () => {
        if (passwordInput.value !== confirmPasswordInput.value) {
            cpassMsg.innerText = "❌ Passwords do not match";
            cpassMsg.style.color = "red";
        } else {
            cpassMsg.innerText = "✅ Passwords match";
            cpassMsg.style.color = "green";
        }
    });

    // OTP handling already handled externally — keep track of `isOTPVerified`

    // Final form submission check
    form.addEventListener("submit", function (e) {
        const nameVal = nameInput.value.trim();
        const emailVal = emailInput.value.trim();
        const passVal = passwordInput?.value;
        const cpassVal = confirmPasswordInput?.value;

        if (!nameRegex.test(nameVal)) {
            e.preventDefault();
            messageBox.innerText = "❌ Invalid name.";
            return;
        }

        if (!emailRegex.test(emailVal)) {
            e.preventDefault();
            messageBox.innerText = "❌ Invalid email format.";
            return;
        }

        if (!passRegex.test(passVal)) {
            e.preventDefault();
            messageBox.innerText = "❌ Weak password.";
            return;
        }

        if (passVal !== cpassVal) {
            e.preventDefault();
            messageBox.innerText = "❌ Passwords do not match.";
            return;
        }

        if (!checkbox.checked) {
            e.preventDefault();
            messageBox.innerText = "❌ Please accept terms & conditions.";
            return;
        }

        if (!isOTPVerified) {
            e.preventDefault();
            messageBox.innerText = "❌ Please verify OTP first.";
            return;
        }
    });

    // Preserve OTP flag from global scope
    window.verifyOTP = function () {
        const enteredOTP = document.getElementById("otpInput").value;
        if (enteredOTP === generatedOTP) {
            isOTPVerified = true;
            document.getElementById("passwordSection").style.display = "block";
            document.getElementById("otpSection").remove();
            messageBox.innerText = "✅ OTP Verified! Now set your password.";
        } else {
            isOTPVerified = false;
            messageBox.innerText = "❌ Invalid OTP.";
        }
    };
});
</script>
<script>

let generatedForgotOTP="";

function showForgotPasswordForm() {
    document.querySelector('.login').style.display = 'none';
    document.querySelector('.signup').style.display = 'none';
    document.querySelector('.forgot').style.display = 'block';
}


function sendForgotOTP() {
    const forgotForm = document.getElementById('forgotForm');
    const email = forgotForm.querySelector('input[name="email"]').value;

    if (!email) {
        document.getElementById("forgotMessage").innerText = "❌ Please enter your email.";
        return;
    }

    document.getElementById("forgotMessage").innerText = "⏳ Sending OTP...";

    fetch('send_forgot_otp.php', {
        method: 'POST',
        body: new URLSearchParams({ email })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            generatedForgotOTP=data.otp;
            document.getElementById("forgotOtpSection").style.display = "block";
            document.getElementById("sendForgotOTPs").remove();
            document.getElementById("forgotMessage").innerText = "✅ OTP sent to your email.";
        } else {
            document.getElementById("forgotMessage").innerText = "❌ " + data.error;
        }
    })
    .catch(() => {
        document.getElementById("forgotMessage").innerText = "❌ Network error. Try again.";
    });
}

function verifyForgotOTP() {
    const enteredOTP = document.querySelector('input[name="otp"]').value;
    if (enteredOTP === generatedForgotOTP) {
        document.getElementById("forgotMessage").innerText = "✅ OTP is verified successfully.";
        verifiedForgotOTP = enteredOTP;  // ✅ Save the OTP before removing the input
        document.getElementById("forgotOtpSection").remove();
        document.getElementById("forgotpassSection").style.display = "block";
        return true;
    } else {
        document.getElementById("forgotMessage").innerText = "❌ OTP verification failed.";
        return false;
    }
}


function resetPassword() {
    const forgotForm = document.getElementById('forgotForm');
    const new_password = forgotForm.querySelector('input[name="new_password"]').value;

    fetch("reset_password.php", { // ✅ Call the correct file directly
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            reset_password: true,
            new_password: new_password
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            document.getElementById("forgotMessage").innerText = "✅ Password updated successfully.";
            setTimeout(() => location.reload(), 3000);
        } else {
            document.getElementById("forgotMessage").innerText = "❌ " + data.error;
        }
    })
    .catch(() => {
        document.getElementById("forgotMessage").innerText = "❌ Something went wrong. Try again.";
    });
}





</script>
<script>
document.addEventListener("DOMContentLoaded", function () {
    const newPassInput = document.querySelector('input[name="new_password"]');

    if (newPassInput) {
        const passMsg = document.createElement("small");
        newPassInput.insertAdjacentElement("afterend", passMsg);
        passMsg.style.margin="20px";
        passMsg.style.padding="10px";
        
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        newPassInput.addEventListener("input", () => {
            const val = newPassInput.value;
            if (!passRegex.test(val)) {
                passMsg.innerText = "❌ Must be 8+ chars with A-Z, a-z, 0-9.";
                passMsg.style.color = "red";
            } else {
                passMsg.innerText = "✅ Strong password.";
                passMsg.style.color = "green";
            }
        });
    }

    // Modify resetPassword() to validate before sending request
    window.resetPassword = function () {
        const forgotForm = document.getElementById('forgotForm');
        const new_password = forgotForm.querySelector('input[name="new_password"]').value;
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!passRegex.test(new_password)) {
            document.getElementById("forgotMessage").innerText = "❌ Password is too weak. Must contain A-Z, a-z, 0-9 and 8+ chars.";
            return;
        }

        fetch("reset_password.php", {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                reset_password: true,
                new_password: new_password
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                document.getElementById("forgotMessage").innerText = "✅ Password updated successfully.";
                setTimeout(() => location.reload(), 3000);
            } else {
                document.getElementById("forgotMessage").innerText = "❌ " + data.error;
            }
        })
        .catch(() => {
            document.getElementById("forgotMessage").innerText = "❌ Something went wrong. Try again.";
        });
    }
});
</script>


</body>
</html>
