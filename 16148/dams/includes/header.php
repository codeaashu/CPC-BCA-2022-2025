<!-- header.php -->
<nav class="navbar navbar-expand-lg bg-light fixed-top shadow-lg">
    <div class="container">

        <!-- Mobile brand -->
        <a class="navbar-brand mx-auto d-lg-none" href="index.php">
            Doctor Appointment
            <strong class="d-block">Management System</strong>
        </a>

        <!-- Toggler for mobile -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navbar links -->
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mx-auto">

                <!-- Home -->
                <li class="nav-item active">
                    <a class="nav-link" href="index.php">
                        <i class="bi bi-house-door-fill me-1"></i>Home
                    </a>
                </li>

                <!-- About -->
                <li class="nav-item">
                    <a class="nav-link" href="#about">
                        <i class="bi bi-info-circle-fill me-1"></i>About
                    </a>
                </li>

                <!-- Logo center for desktop -->
                <a class="navbar-brand d-none d-lg-block" href="index.php" style="color: red;">
                    Doctor Appointment
                    <strong class="d-block">Management System</strong>
                </a>

                <!-- Check Appointment -->
                <li class="nav-item">
                    <a class="nav-link" href="check-appointment.php">
                        <i class="bi bi-calendar-check-fill me-1"></i>Check Appointment
                    </a>
                </li>

                <!-- Booking -->
                <li class="nav-item">
                    <a class="nav-link" href="#booking">
                        <i class="bi bi-journal-plus me-1"></i>Booking
                    </a>
                </li>

                <!-- Contact -->
                <li class="nav-item">
                    <a class="nav-link" href="#contact">
                        <i class="bi bi-envelope-fill me-1"></i>Contact
                    </a>
                </li>

                <!-- Doctor Login -->
                <li class="nav-item active">
                    <a class="nav-link" href="doctor/login.php">
                        <i class="bi bi-person-badge-fill me-1"></i>Doctor
                    </a>
                </li>

                <!-- User Login
                <li class="nav-item active">
                    <a class="nav-link" href="doctor/user/user-login.php">
                        <i class="bi bi-person-fill me-1"></i>User
                    </a>
                </li> -->

            </ul>
        </div>
    </div>
</nav>

<!-- Required Bootstrap Icons CDN (place in <head> of your HTML if not already present) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
