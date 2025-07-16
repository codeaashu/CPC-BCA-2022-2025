<?php
session_start();
//error_reporting(0);
include('doctor/includes/dbconnection.php');
if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $mobnum = $_POST['phone'];
    $email = $_POST['email'];
    $appdate = $_POST['date'];
    $aaptime = $_POST['time'];
    $specialization = $_POST['specialization'];
    $doctorlist = $_POST['doctorlist'];
    $message = $_POST['message'];
    $aptnumber = mt_rand(100000000, 999999999);
    $cdate = date('Y-m-d');

    if ($appdate <= $cdate) {
        echo '<script>alert("Appointment date must be greater than todays date")</script>';
    } else {
        $sql = "insert into tblappointment(AppointmentNumber,Name,MobileNumber,Email,AppointmentDate,AppointmentTime,Specialization,Doctor,Message)values(:aptnumber,:name,:mobnum,:email,:appdate,:aaptime,:specialization,:doctorlist,:message)";
        $query = $dbh->prepare($sql);
        $query->bindParam(':aptnumber', $aptnumber, PDO::PARAM_STR);
        $query->bindParam(':name', $name, PDO::PARAM_STR);
        $query->bindParam(':mobnum', $mobnum, PDO::PARAM_STR);
        $query->bindParam(':email', $email, PDO::PARAM_STR);
        $query->bindParam(':appdate', $appdate, PDO::PARAM_STR);
        $query->bindParam(':aaptime', $aaptime, PDO::PARAM_STR);
        $query->bindParam(':specialization', $specialization, PDO::PARAM_STR);
        $query->bindParam(':doctorlist', $doctorlist, PDO::PARAM_STR);
        $query->bindParam(':message', $message, PDO::PARAM_STR);

        $query->execute();
        $LastInsertId = $dbh->lastInsertId();
        if ($LastInsertId > 0) {
            echo '<script>alert("Your Appointment Request Has Been Send. We Will Contact You Soon")</script>';
            echo "<script>window.location.href ='index.php'</script>";
        } else {
            echo '<script>alert("Something Went Wrong. Please try again")</script>';
        }
    }
}
?>
<!doctype html>
<html lang="en">

<head>
    <title>Doctor Appointment Management System || Home Page</title>

    <!-- CSS FILES -->
    <link rel="preconnect" href="https://fonts.googleapis.com">

    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">

    <link href="css/bootstrap.min.css" rel="stylesheet">

    <link href="css/bootstrap-icons.css" rel="stylesheet">

    <link href="css/owl.carousel.min.css" rel="stylesheet">

    <link href="css/owl.theme.default.min.css" rel="stylesheet">

    <link href="css/templatemo-medic-care.css" rel="stylesheet">

    <!-- AOS CSS -->
    <link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet">

    <!-- Bootstrap 5
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"> -->

    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">

    <!-- AOS Animation -->
    <link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet">




    <script>
        function getdoctors(val) {
            //  alert(val);
            $.ajax({

                type: "POST",
                url: "get_doctors.php",
                data: 'sp_id=' + val,
                success: function (data) {
                    $("#doctorlist").html(data);
                }
            });
        }
    </script>
</head>

<body id="top">

    <main>

        <?php include_once('includes/header.php'); ?>

        <section class="hero" id="hero">
            <div class="container">
                <div class="row">

                    <div class="col-12">
                        <div id="myCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="images/slider/portrait-successful-mid-adult-doctor-with-crossed-arms.jpg"
                                        class="img-fluid" alt="">
                                </div>

                                <div class="carousel-item">
                                    <img src="images/slider/young-asian-female-dentist-white-coat-posing-clinic-equipment.jpg"
                                        class="img-fluid" alt="">
                                </div>

                                <div class="carousel-item">
                                    <img src="images/slider/doctor-s-hand-holding-stethoscope-closeup.jpg"
                                        class="img-fluid" alt="">
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>

        <section class="section-padding" id="about">
            <div class="container">
                <div class="row">

                    <div class="col-lg-6 col-md-6 col-12">
                        <?php
                        $sql = "SELECT * from tblpage where PageType='aboutus'";
                        $query = $dbh->prepare($sql);
                        $query->execute();
                        $results = $query->fetchAll(PDO::FETCH_OBJ);

                        $cnt = 1;
                        if ($query->rowCount() > 0) {
                            foreach ($results as $row) { ?>
                                <h2 class="mb-lg-3 mb-3"><?php echo htmlentities($row->PageTitle); ?></h2>

                                <p><?php echo ($row->PageDescription); ?>.</p>

                                <?php $cnt = $cnt + 1;
                            }
                        } ?>
                    </div>

                    <div class="col-lg-4 col-md-5 col-12 mx-auto">
                        <div
                            class="featured-circle bg-white shadow-lg d-flex justify-content-center align-items-center">
                            <p class="featured-text"><span class="featured-number" style="color: red;">12</span><span
                                    style="color: black;"> Years<br> of Experiences</span>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <section class="gallery">
            <div class="container">
                <div class="row">

                    <div class="col-lg-6 col-6 ps-0">
                        <img src="images/gallery/medium-shot-man-getting-vaccine.jpg" class="img-fluid galleryImage"
                            alt="get a vaccine" title="get a vaccine for yourself">
                    </div>

                    <div class="col-lg-6 col-6 pe-0">
                        <img src="images/gallery/female-doctor-with-presenting-hand-gesture.jpg"
                            class="img-fluid galleryImage" alt="wear a mask" title="wear a mask to protect yourself">
                    </div>

                </div>
            </div>
        </section>





        <!-- Booking Section with Modern UI + AOS Animations -->
        <!-- Booking Section with Modern UI + AOS Animations and Red Theme -->
        <!-- Booking Section with Doctor Login Theme and AOS Animations -->
        <section class="py-5 bg-light" id="booking">
            <div class="container">
                <div class="text-center mb-5" data-aos="fade-down">
                    <h2 class="fw-bold text-danger">Book an Appointment</h2>
                    <p class="text-muted">We’ll contact you shortly after receiving your request</p>
                </div>

                <form method="post" class="row g-4 p-4 bg-white shadow rounded-4" data-aos="zoom-in"
                    data-aos-delay="100">

                    <!-- Full Name -->
                    <div class="col-md-6">
                        <label class="form-label">Full Name</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-person-fill text-danger"></i></span>
                            <input type="text" name="name" class="form-control rounded-end shadow-sm"
                                placeholder="Enter full name" required>
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="col-md-6">
                        <label class="form-label">Email</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-envelope-fill text-danger"></i></span>
                            <input type="email" name="email" class="form-control rounded-end shadow-sm"
                                placeholder="Enter email" required>
                        </div>
                    </div>

                    <!-- Phone -->
                    <div class="col-md-6">
                        <label class="form-label">Phone</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-telephone-fill text-danger"></i></span>
                            <input type="text" name="phone" class="form-control rounded-end shadow-sm"
                                placeholder="Enter phone number" maxlength="10" required>
                        </div>
                    </div>

                    <!-- Date -->
                    <div class="col-md-6">
                        <label class="form-label">Appointment Date</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-calendar-date-fill text-danger"></i></span>
                            <input type="date" name="date" class="form-control rounded-end shadow-sm" required>
                        </div>
                    </div>

                    <!-- Time -->
                    <div class="col-md-6">
                        <label class="form-label">Appointment Time</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-clock-fill text-danger"></i></span>
                            <input type="time" name="time" class="form-control rounded-end shadow-sm" required>
                        </div>
                    </div>

                    <!-- Specialization -->
                    <div class="col-md-6">
                        <label class="form-label">Specialization</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-heart-pulse-fill text-danger"></i></span>
                            <select name="specialization" class="form-select rounded-end shadow-sm"
                                onchange="getdoctors(this.value);" required>
                                <option value="">Select Specialization</option>
                                <?php
                                $sql = "SELECT * FROM tblspecialization";
                                $stmt = $dbh->query($sql);
                                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                                    echo "<option value='{$row['ID']}'>{$row['Specialization']}</option>";
                                }
                                ?>
                            </select>
                        </div>
                    </div>

                    <!-- Doctor List -->
                    <div class="col-md-6">
                        <label class="form-label">Select Doctor</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-person-bounding-box text-danger"></i></span>
                            <select name="doctorlist" id="doctorlist" class="form-select rounded-end shadow-sm"
                                required>
                                <option value="">Select Doctor</option>
                            </select>
                        </div>
                    </div>

                    <!-- Message -->
                    <div class="col-12">
                        <label class="form-label">Additional Message</label>
                        <textarea name="message" class="form-control rounded-3 shadow-sm" rows="4"
                            placeholder="Your message"></textarea>
                    </div>

                    <!-- Submit Button -->
                    <div class="col-12 text-center">
                        <button type="submit" name="submit" class="btn px-5 py-2 rounded-pill shadow"
                            style="background-color:#dc3545; color:white;"
                            onmouseover="this.style.backgroundColor='#0d6efd'"
                            onmouseout="this.style.backgroundColor='#dc3545'">
                            Book Now
                        </button>
                    </div>
                </form>
            </div>
        </section>



    </main>
    <?php include_once('includes/footer.php'); ?>
    <!-- JAVASCRIPT FILES -->
    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.bundle.min.js"></script>
    <script src="js/owl.carousel.min.js"></script>
    <script src="js/scrollspy.min.js"></script>
    <script src="js/custom.js"></script>

    <!-- AOS JS -->

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
    <script>
        AOS.init();
    </script>


</body>

</html>