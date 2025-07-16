<?php


// Include the database connection file

$servername = "sql311.infinityfree.com"; // Replace with your server name
$username = "if0_37331201";        // Replace with your database username
$password = "W33LAgXuWC3JFnI";            // Replace with your database password
$dbname = "if0_37331201_testzone";      // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


// Fetch counts for teachers, students, and tests
$teacherCountQuery = "SELECT COUNT(*) AS count FROM teachers";
$studentCountQuery = "SELECT COUNT(DISTINCT s_id) AS count FROM students";
$testCountQuery = "SELECT COUNT(*) AS count FROM teacher_test";

$teacherCountResult = $conn->query($teacherCountQuery);
$studentCountResult = $conn->query($studentCountQuery);
$testCountResult = $conn->query($testCountQuery);

if ($teacherCountResult && $studentCountResult && $testCountResult) {
    $teacherCount = $teacherCountResult->fetch_assoc()['count'];
    $studentCount = $studentCountResult->fetch_assoc()['count'];
    $testCount = $testCountResult->fetch_assoc()['count'];
} else {
    $teacherCount = $studentCount = $testCount = 0;
}

// Check if the form has been submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect the data from the form fields
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

    // Add as many fields as necessary

    // Prepare and bind the SQL statement to insert data into the 'message' table
    $stmt = $conn->prepare("INSERT INTO message (name, email, message) VALUES (?, ?, ?)"); // Adjust the column names based on your 'message' table structure
    $stmt->bind_param("sss", $name, $email, $message); // Adjust the data types based on your form field data types (e.g., "s" for string, "i" for integer)

    // Execute the query
    if ($stmt->execute()) {
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
}
?>



<!DOCTYPE html>
<html lang="en" ">

  <head>


    
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="TestZone: The best platform for online tests, student performance tracking, and future test scheduling.">
    <meta name="keywords" content="online test, test performance, take exam,give exam,online test series,online test practice,online test practice free ,online test practice mcq,generate test,generate test paper, secure test,generate exam online,create test online for student,create rtest for anybody,generate quiz online, create quiz,make test online for students,create test online on google form,secured data ,quiz with google form,test your idea,generate question for couligue,google form,test google form,create quiz with google form,quiz with google form, quiz with test sheet , testsheet, test, exam , examination,testsheet for quiz ,testsheet for test, teacher dashboard, test scheduling, TestSheet, online exams, student tracking">
    <meta name="author" content="TestSheet">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,600,700,800,900" rel="stylesheet">

    <title>TestSheet - Online Test Platform for Students & Teachers.</title>
    <link rel="icon" href="assets/images/page_logo.png">
    <!-- Bootstrap core CSS -->
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Additional CSS Files -->
    <link rel="stylesheet" href="assets/css/fontawesome.css">
    <link rel="stylesheet" href="assets/css/templatemo-grad-school.css">
    <link rel="stylesheet" href="assets/css/owl.css">
    <link rel="stylesheet" href="assets/css/lightbox.css">
    <link rel="stylesheet" href="assets/css/track.css">
    <style>
    input:valid, textarea:valid {
  border: 2px solid green;
}

input:invalid, textarea:invalid {
  border: 2px solid red;
}

input, textarea {
  transition: border 0.3s ease;
}

    </style>

  </head>

<body  style="width: auto;">

   
  <!--header-->
  <header class="main-header clearfix" style="display: block;" role="header">
    <div class="logo">
      <a style="margin-left: 1.7rem;" href="#"><em>Test</em> Sheet</a>
    </div>
    <a href="#menu" class="menu-link"><i class="fa fa-bars"></i></a>
    <nav id="menu" class="main-nav" role="navigation">
      <ul class="main-menu">
        <li><a href="#top">Home</a></li>
        <li><a href="#section why-us">About Us</a></li>
        <li><a href="login_student.php">Student</a></li>
        <li><a href="login_signup_teacher.php">Teacher</a></li>
        <li><a href="admin_login.php">Admin</a></li>
        
      </ul>
    </nav>
  </header>

  <!-- ***** Main Banner Area Start ***** -->
  <section class="section main-banner" id="top" data-section="section1">
      <video autoplay muted loop id="bg-video">
          <source src="assets/images/course-video.mp4" type="video/mp4" />
      </video>

      <div class="video-overlay header-text">
          <div class="caption">
              <h1 style="font-weight: 500;font-size: 18px;text-transform: uppercase;color: #fff;letter-spacing: 1px;margin-bottom: 0.5rem;line-height: 1.2;">Test your Excellence</h1>
              <h2><em>Your</em> Classroom</h2>
              <div class="main-button">
                  <div class="scroll-to-section"><a href="#section2"><img src="assets/images/android.png" style="height:100px ">COMING SOON !!!</a></div>
              </div>
              <div class="main-button" style="margin-top: 50px;">
                  <div class="scroll-to-section" ><a href="login_student.php">Get Started → </a></div>
              </div>
          </div>
      </div>
  </section>
  <!-- ***** Main Banner Area End ***** -->


  <section class="features">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-12">
          <div class="features-post">
            <div class="features-content">
              <div class="content-show">
                <h4><i class="fa fa-pencil"></i>All Courses Test</h4>
              </div>
              <div class="content-hide">
                <p>It help you to test yourself in every course in which you want to become Excellent and improve your skills.</p>
                <p class="hidden-sm"></p>
                <div class="scroll-to-section"><a href="#section2">More Info.</a></div>
            </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-12">
          <div class="features-post second-features">
            <div class="features-content">
              <div class="content-show">
                <h4><i class="fa fa-graduation-cap"></i>Student Dashboard</h4>
              </div>
              <div class="content-hide">
                <p>It is the most useful feature of this application that enables every student to track their performance and make improvement.</p>
                <p class="hidden-sm"></p>
                <div class="scroll-to-section"><a href="#section3">Details</a></div>
            </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-12">
          <div class="features-post third-features">
            <div class="features-content">
              <div class="content-show">
                <h4><i class="fa fa-book"></i>Future Test</h4>
              </div>
              <div class="content-hide">
                <p>It tells you about the list of test that we conduct in future that makes easy for you to revise that topic and score good in test.</p>
                <p class="hidden-sm"></p>
                <div class="scroll-to-section"><a href="#section4">Read More</a></div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section why-us" id="section why-us">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="section-heading">
            <h2>Why choose TestSheet?</h2>
          </div>
        </div>
        <div class="col-md-12">
          <div id='tabs'>
            <ul>
              <li><a href='#tabs-1'>Secure Test</a></li>
              <li><a href='#tabs-2'>User Friendly</a></li>
              <li><a href='#tabs-3'>Quality Info</a></li>
            </ul>
            <section class='tabs-content'>
              <article id='tabs-1'>
                <div class="row">
                  <div class="col-md-6">
                    <img src="assets/images/choose-us-image-01.png" alt="Secure online testing with TestZone">
                  </div>
                  <div class="col-md-6">
                    <h4>Secure Test</h4>
                    <p>We are the best testing platform that provides various usefull techniques to the evaluate every student based on their current score and previous scores.Please tell your friends about us. Thank you.</p>
                  </div>
                </div>
              </article>
              <article id='tabs-2'>
                <div class="row">
                  <div class="col-md-6">
                    <img src="assets/images/choose-us-image-02.png" alt="">
                  </div>
                  <div class="col-md-6">
                    <h4>User Friendly</h4>
                    <p>We are one of the best user friendly platform to conduct test and store the data of student to evaluate themself.</p> 
                  </div>
                </div>
              </article>
              <article id='tabs-3'>
                <div class="row">
                  <div class="col-md-6">
                    <img src="assets/images/choose-us-image-03.png" alt="">
                  </div>
                  <div class="col-md-6">
                    <h4>Quality Info</h4>
                    <p>We provide you the quality Information that is useful to you after the evaluation of the test.</p>
                  </div>
                </div>
              </article>
            </section>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section coming-soon" id="connected_to">
    <div class="container">
      <div class="row">
        <div class="col-md-7 col-xs-12" style="max-width: 530px;">
          <div class="continer centerIt">
            <div>
              <h4>Till Now, we are <em>Connected </em> to </h4>
              
              
            </div>
          </div>
        </div>
        <div class="col-md-5 container-fluid">
          <div class="continer centerIt">
            
<div class="counter">

                <div class="teachers" style="min-width:110px;">
                  <div class="values"><?php echo $teacherCount ?></div>
                  <span>Teachers</span>
                </div>

                <div class="students" style="min-width:110px;width:130px">
                  <div class="values"><?php echo $studentCount ?></div>
                  <span>Students</span>
                </div>

                <!-- <div class="minutes">
                  <div class="value">00</div>
                  <span>Employee</span>
                </div> -->

                <div class="tests" style="min-width:130px;width:150px">
                  <div class="values"><?php echo $testCount ?></div>
                  <span>Test Performed</span>
                </div>

              </div>



          </div>
        </div>
      </div>
    </div>
  </section>

 
  <section class="section contact" data-section="section6">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="section-heading">
            <h2>Let’s Keep In Touch</h2>
          </div>
        </div>
        <div class="col-md-6">
      
                    
          <form id="contact" action="index.php" method="post">
            <div class="row">
              <div class="col-md-6">
                  <fieldset>
                    <input name="name" type="text" class="form-control" id="name" placeholder="Your Name" required="">
                  </fieldset>
                  <small id="nameError" style="color:red;display:none;"></small>
                </div>
                <div class="col-md-6">
                  <fieldset>
                    <input name="email" type="text" class="form-control" id="email" placeholder="Your Email" required="">
                  </fieldset>
                  <small id="emailError" style="color:red;display:none;"></small>
                </div>
              <div class="col-md-12">
                <fieldset>
                  <textarea name="message" rows="6" class="form-control" id="message" placeholder="Your message..." required=""></textarea>
                </fieldset>
                <small id="messageError" style="color:red;display:none;"></small>
              </div>
              <div class="col-md-12">
                <fieldset>
                  <button type="submit" id="form-submit" class="button">Send Message Now</button>
                </fieldset>

              </div>

            </div>
          </form>
        </div>
        
      </div>
    </div>
  </section>

  <footer>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <p><i class="fa fa-copyright"></i> Copyright 2024 by <e style="color:orange">TestSheet</e>
        </div>
      </div>
    </div>
  </footer>

  <!-- Scripts -->
  <!-- Bootstrap core JavaScript -->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script>
document.addEventListener("DOMContentLoaded", function () {
  const nameField = document.getElementById("name");
  const emailField = document.getElementById("email");
  const messageField = document.getElementById("message");
  const submitBtn = document.getElementById("form-submit");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateName() {
  const name = nameField.value.trim();
  const hasLetters = /[a-zA-Z]/.test(name);

  if (name.length < 2) {
    nameError.textContent = "Name must be at least 2 characters";
    nameError.style.display = "block";
    return false;
  } else if (!hasLetters) {
    nameError.textContent = "Name must contain at least one letter";
    nameError.style.display = "block";
    return false;
  } else {
    nameError.style.display = "none";
    return true;
  }
}


  function validateEmail() {
    const email = emailField.value.trim();
    if (!emailRegex.test(email)) {
      emailError.textContent = "Please enter a valid email";
      emailError.style.display = "block";
      return false;
    } else {
      emailError.style.display = "none";
      return true;
    }
  }

  function validateMessage() {
    const message = messageField.value.trim();
    if (message.length < 10) {
      messageError.textContent = "Message must be at least 10 characters";
      messageError.style.display = "block";
      return false;
    } else {
      messageError.style.display = "none";
      return true;
    }
  }

  function checkForm() {
    const valid = validateName() && validateEmail() && validateMessage();
    submitBtn.disabled = !valid;
  }

  nameField.addEventListener("input", () => {
    validateName();
    checkForm();
  });

  emailField.addEventListener("input", () => {
    validateEmail();
    checkForm();
  });

  messageField.addEventListener("input", () => {
    validateMessage();
    checkForm();
  });

  // Initial check
  checkForm();
});
</script>


    <script src="assets/js/isotope.min.js"></script>
    <script src="assets/js/owl-carousel.js"></script>
    <script src="assets/js/lightbox.js"></script>
    <script src="assets/js/tabs.js"></script>
    <script src="assets/js/video.js"></script>
    <script src="assets/js/slick-slider.js"></script>
    <script src="assets/js/customHome.js"></script>
    
</body>
</html>