<?php
session_start();
include("Php/Conn.php");
include("Php/vehicleClass.php");

if (!isset($_GET['id'])) {
    header("Location: Home.php");
    exit();
}

$vehicleId = $_GET['id'];
$conn = Conn::GetConnection();
$stmt = $conn->prepare("SELECT * FROM Vehicles WHERE Id = :vehicle_id");
$stmt->bindParam(':vehicle_id', $vehicleId);
$stmt->execute();
$vehicle = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$vehicle) {
    header("Location: Home.php"); 
    exit();
}

// Fetch rental details if rental_id is present
$rental = null;
if (isset($_GET['rental_id'])) {
    $rentalId = $_GET['rental_id'];
    $stmt = $conn->prepare("SELECT * FROM Rentals WHERE id = :rental_id AND vehicle_id = :vehicle_id AND status = 'pending'");
    $stmt->bindParam(':rental_id', $rentalId);
    $stmt->bindParam(':vehicle_id', $vehicleId);
    $stmt->execute();
    $rental = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$rental) {
        header("Location: Home.php");
        exit();
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rent Vehicle</title>
    <link rel="stylesheet" href="Css/homepage.css">
    <link rel="stylesheet" href="Css/rentVehicle.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        .form-error {
            color: #dc3545;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        }
        
        .form-success {
            color: #28a745;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        }
        
        .upi-payment-section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: center;
        }
        
        .qr-code-container {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 20px 0;
        }
        
        .qr-code {
            width: 200px;
            height: 200px;
            background: #fff;
            border: 2px solid #ddd;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: #666;
        }
        
        .receipt-upload {
            margin: 20px 0;
        }
        
        .receipt-preview {
            max-width: 300px;
            max-height: 200px;
            margin-top: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        
        .calendar-container {
            margin: 20px 0;
        }
        
        .date-inputs {
            display: flex;
            gap: 20px;
            margin: 15px 0;
        }
        
        .date-inputs div {
            flex: 1;
        }
        
        .phone-input {
            position: relative;
        }
        
        .phone-prefix {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: #666;
            font-weight: bold;
        }
        
        .phone-input input {
            padding-left: 35px;
        }
        .form-success-icon {
            color: #28a745;
            margin-left: 8px;
            font-size: 1.2em;
            vertical-align: middle;
            display: none;
        }
        .form-error-icon {
            color: #dc3545;
            margin-left: 8px;
            font-size: 1.2em;
            vertical-align: middle;
            display: none;
        }
        .form-section {
            margin-bottom: 32px;
            padding: 24px 18px;
            background: #fafbfc;
            border-radius: 8px;
            box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .rent-form input, .rent-form select, .rent-form button {
            border-radius: 5px;
            border: 1px solid #ccc;
            padding: 10px;
            margin-bottom: 10px;
            font-size: 1rem;
            outline: none;
            transition: border 0.2s;
        }
        .rent-form input:focus, .rent-form select:focus {
            border: 2px solid #007bff;
            box-shadow: 0 0 0 2px #e3f0ff;
        }
        .rent-btn[disabled] {
            background: #aaa;
            cursor: not-allowed;
        }
        .phone-input input:focus {
            border: 2px solid #007bff;
        }
        .form-label {
            font-weight: bold;
            margin-bottom: 4px;
            display: block;
        }
        .section-divider {
            border-top: 2px solid #eee;
            margin: 32px 0 24px 0;
        }
        .help-icon {
            display: inline-block;
            margin-left: 5px;
            color: #007bff;
            cursor: pointer;
            font-size: 1em;
            vertical-align: middle;
            position: relative;
        }
        .help-tooltip {
            display: none;
            position: absolute;
            left: 20px;
            top: 0;
            background: #fff;
            color: #333;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 6px 12px;
            font-size: 0.95em;
            z-index: 10;
            min-width: 180px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .help-icon:focus + .help-tooltip,
        .help-icon:hover + .help-tooltip {
            display: block;
        }
        @media (max-width: 600px) {
            .form-section, .upi-payment-section {
                padding: 10px 4px;
            }
            .vehicle-details {
                flex-direction: column;
            }
            .vehicle-image img {
                max-width: 100%;
            }
            .date-inputs {
                flex-direction: column;
                gap: 8px;
            }
        }
    </style>
</head>

<body>
    <nav class="navbar">
        <div class="navbar-container">
            <div class="brand">
                <a href="#">SL<Span class="subbrand">Moto</Span></a>
            </div>
            <ul class="nav-links">
                <li><a href="./Home.php">Home</a></li>
                <li><a href="#vehicle-list-container">Vehicles</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="./Php/add_vehicle_form.php">Post</a></li>
            </ul>
            <div class="mobile-menu">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="account">
                <?php
                if (isset($_SESSION['user_id'])) {
                    echo '<div class="dropdown">';
                    echo '<button class="dropbtn"><i class="fas fa-user-circle"></i></button>';
                    echo '<div class="dropdown-content">';
                    echo '<a href="Php/account.php">Account</a>';
                    echo '<a href="Php/logout.php">Logout</a>';
                    echo '<a href="Php/activeJob.php">Active Job</a>';
                    echo '</div>';
                    echo '</div>';
                } else {
                    echo '<a href="./Php/login.php" class="login-btn">Login/Register</a>';
                }
                ?>
            </div>
        </div>
    </nav>
    
    <h1 style="text-align: center; font-size:2.5rem;margin:20px">Rent Vehicle</h1>

    <!-- Display vehicle details -->
    <div class="vehicle-details">
        <div class="vehicle-image">
            <img src="<?php echo $vehicle['Image']; ?>" alt="<?php echo $vehicle['Title']; ?>">
        </div>
        <div class="vehicle-info">
            <h2 style="font-size: 2rem;color:red;"><?php echo $vehicle['Title']; ?></h2>
            <p>Description: <?php echo $vehicle['Description']; ?></p>
            <p>Location: <?php echo $vehicle['Location']; ?></p>
            <p>Price: Rs. <?php echo $vehicle['Price']; ?> per day</p>
            <p>Phone Number: <?php echo $vehicle['Phone_Number']; ?></p>
            <p>Active Days: <?php echo $vehicle['Time_Duration']; ?></p>
            <p>User Name: <?php echo $vehicle['User_Name']; ?></p>
            <p>User Email: <?php echo $vehicle['User_Email']; ?></p>
        </div>
    </div>

    <div class="form-container">
        <div class="terms">
            <h3>Terms and Conditions:</h3>
            <ul>
                <li>Renters must be at least 18 years old.</li>
                <li>A valid driver's license is required to rent a vehicle.</li>
                <li>Vehicle rental rates are subject to change without prior notice.</li>
                <li>Additional charges may apply for late returns or damages to the vehicle.</li>
                <li>Smoking and pets are not allowed in the rental vehicles.</li>
                <li>Payment must be made in full before renting a vehicle.</li>
                <li>Refunds are subject to the company's refund policy.</li>
                <li>By renting a vehicle, you agree to abide by the terms and conditions set forth by the rental company.</li>
            </ul>
        </div>

        <?php
        if (isset($_GET['rental_id'])) {
            // If rental_id exists, show payment form
            echo '<form action="./process_payment.php" method="POST" class="rent-form" enctype="multipart/form-data">';
        } else {
            // If no rental_id, show rental form
            echo '<form action="./rent_process.php" method="POST" class="rent-form" enctype="multipart/form-data">';
        }
        ?>
            <?php if (!isset($_GET['rental_id'])): ?>
            <div class="form-section personal-info">
                <h3>Personal Information</h3>
                
                <label for="first_name" class="form-label">First Name:
                    <span class="help-icon" tabindex="0" aria-label="First name help">&#9432;
                        <span class="help-tooltip">Enter your first name (letters only).</span>
                    </span>
                </label>
                <div style="display:flex;align-items:center;gap:4px;">
                    <input type="text" id="first_name" name="first_name" required title="Enter your first name" autocomplete="on" aria-label="First Name">
                    <span id="first-name-success" class="form-success-icon"><i class="fas fa-check-circle"></i></span>
                    <span id="first-name-error-icon" class="form-error-icon"><i class="fas fa-times-circle"></i></span>
                </div>
                <div id="first-name-error" class="form-error"></div>
                <label for="last_name" class="form-label">Last Name:
                    <span class="help-icon" tabindex="0" aria-label="Last name help">&#9432;
                        <span class="help-tooltip">Enter your last name (letters only).</span>
                    </span>
                </label>
                <div style="display:flex;align-items:center;gap:4px;">
                    <input type="text" id="last_name" name="last_name" required title="Enter your last name" autocomplete="on" aria-label="Last Name">
                    <span id="last-name-success" class="form-success-icon"><i class="fas fa-check-circle"></i></span>
                    <span id="last-name-error-icon" class="form-error-icon"><i class="fas fa-times-circle"></i></span>
                </div>
                <div id="last-name-error" class="form-error"></div>
                <label for="phone" class="form-label">Phone Number:
                    <span class="help-icon" tabindex="0" aria-label="Phone number help">&#9432;
                        <span class="help-tooltip">Enter your 10-digit mobile number (numbers only).</span>
                    </span>
                </label>
                <div class="phone-input" style="display:flex;align-items:center;gap:0;">
                    <span class="phone-prefix" style="position:static;margin-right:5px;">+91</span>
                    <input type="tel" id="phone" name="phone" required pattern="[0-9]{10}" title="Phone number must be exactly 10 digits" maxlength="10" style="flex:1;padding-left:10px;" aria-label="Phone Number">
                    <span id="phone-success" class="form-success-icon"><i class="fas fa-check-circle"></i></span>
                    <span id="phone-error-icon" class="form-error-icon"><i class="fas fa-times-circle"></i></span>
                </div>
                <div id="phone-error" class="form-error"></div>
                <div class="calendar-container">
                    <h4>Rental Duration</h4>
                    <div class="date-inputs">
                        <div>
                            <label for="start_date" class="form-label">Start Date:
                                <span class="help-icon" tabindex="0" aria-label="Start date help">&#9432;
                                    <span class="help-tooltip">Select the date you want to start your rental.</span>
                                </span>
                            </label>
                            <input type="date" id="start_date" name="start_date" required aria-label="Start Date">
                        </div>
                        <div>
                            <label for="end_date" class="form-label">End Date:
                                <span class="help-icon" tabindex="0" aria-label="End date help">&#9432;
                                    <span class="help-tooltip">Select the date you want to end your rental.</span>
                                </span>
                            </label>
                            <input type="date" id="end_date" name="end_date" required aria-label="End Date">
                        </div>
                    </div>
                    <div id="duration-error" class="form-error"></div>
                    <p>Duration: <span id="duration-display">0</span> days</p>
                </div>
            </div>
            <div class="section-divider"></div>
            <?php endif; ?>

            <div class="upi-payment-section">
                <h3>UPI Payment</h3>
                <p>Please scan the QR code below to make the payment:</p>
                
                <div class="qr-code-container">
                    <div class="qr-code">
                        <img src="uploads/phonepe_qr.jpg" alt="Scan to pay with PhonePe" style="width: 200px; height: 200px; object-fit: contain;">
                    </div>
                </div>
                
                <p><strong>UPI ID:</strong> slmoto@paytm</p>
                <p><strong>Amount:</strong> Rs. <span id="total-amount"><?php echo isset($rental) ? $rental['total_amount'] : (isset($vehicle['Price']) ? $vehicle['Price'] : '0'); ?></span></p>
                
                <div class="receipt-upload">
                    <label for="receipt">Upload Payment Receipt:</label>
                    <input type="file" id="receipt" name="receipt" accept="image/*,.pdf" required>
                    <div id="receipt-error" class="form-error"></div>
                    <img id="receipt-preview" class="receipt-preview" style="display: none;">
                </div>
                
                <div>
                    <label for="transaction_id">Transaction ID:</label>
                    <input type="text" id="transaction_id" name="transaction_id" required 
                           pattern="[A-Za-z0-9]+" title="Transaction ID should contain only letters and numbers">
                    <div id="transaction-error" class="form-error"></div>
                </div>
            </div>

            <div class="total-amount">
                <h4>Total Amount: Rs. <span id="total-amount"><?php echo isset($rental) ? $rental['total_amount'] : '0'; ?></span></h4>
                <input type="hidden" name="amount" id="amount-input" value="<?php echo isset($rental) ? $rental['total_amount'] : ''; ?>">
            </div>

            <input type="hidden" name="vehicle_id" value="<?php echo $vehicleId; ?>">
            <?php if (isset($_GET['rental_id'])): ?>
                <input type="hidden" name="rental_id" value="<?php echo $_GET['rental_id']; ?>">
            <?php endif; ?>
            <?php
            if (isset($_SESSION['email'])) {
                echo '<input type="hidden" name="email" value="' . $_SESSION['email'] . '">';
            }
            ?>

            <?php if (isset($_SESSION['payment_error'])): ?>
                <div class="error-message">
                    <?php 
                        echo $_SESSION['payment_error'];
                        unset($_SESSION['payment_error']);
                    ?>
                </div>
            <?php endif; ?>

            <?php if (isset($_SESSION['rental_errors'])): ?>
                <div class="error-message">
                    <?php 
                        foreach ($_SESSION['rental_errors'] as $error) {
                            echo $error . '<br>';
                        }
                        unset($_SESSION['rental_errors']);
                    ?>
                </div>
            <?php endif; ?>
        
            <button type="submit" class="rent-btn" id="submit-btn">
                <?php echo isset($_GET['rental_id']) ? 'Complete Payment' : 'Proceed to Payment'; ?>
            </button>
        </form>

        <script>
        // Form validation functions
        function validateName(name) {
            const nameRegex = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/; // Allows spaces and hyphens
            return nameRegex.test(name);
        }

        function validatePhone(phone) {
            const phoneRegex = /^[6-9][0-9]{9}$/;
            return phoneRegex.test(phone);
        }

        function validateAlpha(input) {
            return /^[A-Za-z]+$/.test(input.trim());
        }

        function validateDates() {
            const startDate = new Date(document.getElementById('start_date').value);
            const endDate = new Date(document.getElementById('end_date').value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (startDate < today) {
                return 'Start date cannot be in the past';
            }

            if (endDate <= startDate) {
                return 'End date must be after start date';
            }

            const diffTime = endDate - startDate;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays > 30) {
                return 'Rental duration cannot exceed 30 days';
            }

            return null;
        }

        function updateDuration() {
            const startDate = document.getElementById('start_date').value;
            const endDate = document.getElementById('end_date').value;
            
            if (startDate && endDate) {
                const start = new Date(startDate);
                const end = new Date(endDate);
                const diffTime = end - start;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                document.getElementById('duration-display').textContent = diffDays;
                updateTotalAmount(diffDays);
            }
        }

        function updateTotalAmount(duration = null) {
            <?php if (!isset($_GET['rental_id'])): ?>
            if (!duration) {
                const startDate = document.getElementById('start_date').value;
                const endDate = document.getElementById('end_date').value;
                
                if (startDate && endDate) {
                    const start = new Date(startDate);
                    const end = new Date(endDate);
                    const diffTime = end - start;
                    duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                } else {
                    duration = 0;
                }
            }
            
            const pricePerDay = <?php echo $vehicle['Price']; ?>;
            const total = duration * pricePerDay;
            document.getElementById('total-amount').textContent = total.toLocaleString();
            document.getElementById('amount-input').value = total;
            <?php endif; ?>
        }

        function updateGlobalNameError() {
            const firstName = document.getElementById('first_name').value;
            const lastName = document.getElementById('last_name').value;
            const globalError = document.getElementById('global-error');
            globalError.style.display = 'none';
            globalError.textContent = '';
        }
        function validateForm() {
            updateGlobalNameError();
            let isValid = true;
            
            // Validate first name
            const firstName = document.getElementById('first_name').value;
            const firstNameError = document.getElementById('first-name-error');
            if (!validateAlpha(firstName)) {
                firstNameError.textContent = 'First name is required';
                isValid = false;
            } else {
                firstNameError.textContent = '';
            }

            // Validate last name
            const lastName = document.getElementById('last_name').value;
            const lastNameError = document.getElementById('last-name-error');
            if (!validateAlpha(lastName)) {
                lastNameError.textContent = 'Last name is required';
                isValid = false;
            } else {
                lastNameError.textContent = '';
            }

            // Validate phone
            const phone = document.getElementById('phone').value;
            const phoneError = document.getElementById('phone-error');
            if (!validatePhone(phone)) {
                phoneError.textContent = 'Phone number must be 10 digits and start with 6, 7, 8, or 9';
                isValid = false;
            } else {
                phoneError.textContent = '';
            }

            // Validate dates
            const durationError = document.getElementById('duration-error');
            const dateError = validateDates();
            if (dateError) {
                durationError.textContent = dateError;
                isValid = false;
            } else {
                durationError.textContent = '';
            }

            // Validate receipt upload (for payment form)
            <?php if (isset($_GET['rental_id'])): ?>
            const receipt = document.getElementById('receipt').files[0];
            const receiptError = document.getElementById('receipt-error');
            if (!receipt) {
                receiptError.textContent = 'Please upload a payment receipt';
                isValid = false;
            } else {
                receiptError.textContent = '';
            }

            // Validate transaction ID
            const transactionId = document.getElementById('transaction_id').value;
            const transactionError = document.getElementById('transaction-error');
            if (!transactionId.trim()) {
                transactionError.textContent = 'Please enter the transaction ID';
                isValid = false;
            } else if (!/^[A-Za-z0-9]+$/.test(transactionId)) {
                transactionError.textContent = 'Transaction ID should contain only letters and numbers';
                isValid = false;
            } else {
                transactionError.textContent = '';
            }
            <?php endif; ?>

            return isValid;
        }

        function showValidationIcon(inputId, valid) {
            document.getElementById(inputId + '-success').style.display = valid ? 'inline' : 'none';
            document.getElementById(inputId + '-error-icon').style.display = valid ? 'none' : 'inline';
        }
        document.getElementById('first_name').addEventListener('input', function() {
            const valid = validateAlpha(this.value);
            showValidationIcon('first-name', valid);
            const firstNameError = document.getElementById('first-name-error');
            if (valid) {
                firstNameError.textContent = '';
            }
            updateGlobalNameError();
        });
        document.getElementById('last_name').addEventListener('input', function() {
            const valid = validateAlpha(this.value);
            showValidationIcon('last-name', valid);
            const lastNameError = document.getElementById('last-name-error');
            if (valid) {
                lastNameError.textContent = '';
            }
            updateGlobalNameError();
        });
        document.getElementById('phone').addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
            const valid = validatePhone(this.value);
            showValidationIcon('phone', valid);
            const phoneError = document.getElementById('phone-error');
            if (valid) {
                phoneError.textContent = '';
            }
        });

        document.getElementById('start_date').addEventListener('change', updateDuration);
        document.getElementById('end_date').addEventListener('change', updateDuration);

        // Receipt preview
        document.getElementById('receipt').addEventListener('change', function() {
            const file = this.files[0];
            const preview = document.getElementById('receipt-preview');
            
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    preview.src = e.target.result;
                    preview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            } else {
                preview.style.display = 'none';
            }
        });

        // Form submission
        document.querySelector('.rent-form').addEventListener('submit', function(e) {
            if (!validateForm()) {
                e.preventDefault();
                return false;
            }
        });

        // Set minimum dates
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('start_date').min = today;
        document.getElementById('end_date').min = today;

        // Update end date minimum when start date changes
        document.getElementById('start_date').addEventListener('change', function() {
            document.getElementById('end_date').min = this.value;
            updateDuration();
        });

        // Show payment section on Proceed to Payment
        const rentForm = document.querySelector('.rent-form');
        const submitBtn = document.getElementById('submit-btn');
        <?php if (!isset($_GET['rental_id'])): ?>
        let paymentSectionLoading = false;
        submitBtn.addEventListener('click', function(e) {
            if (!validateForm()) {
                e.preventDefault();
                showError('Please fix the errors above before proceeding.', 'first-name-error');
                return false;
            }
            if (paymentSectionLoading) {
                e.preventDefault();
                return false;
            }
            paymentSectionLoading = true;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
            e.preventDefault();
            setTimeout(function() {
                document.querySelector('.personal-info').style.display = 'none';
                if (!document.getElementById('dynamic-payment')) {
                    const paymentDiv = document.createElement('div');
                    paymentDiv.id = 'dynamic-payment';
                    paymentDiv.innerHTML = `
                    <div class="upi-payment-section" tabindex="0" aria-label="UPI Payment Section">
                        <h3>UPI Payment</h3>
                        <p>Please scan the QR code below to make the payment:</p>
                        <div class="qr-code-container">
                            <div class="qr-code">
                                <i class="fas fa-qrcode" style="font-size: 100px; color: #007bff;"></i>
                            </div>
                        </div>
                        <p><strong>UPI ID:</strong> slmoto@paytm</p>
                        <p><strong>Amount:</strong> Rs. <span id="pay-amount">${document.getElementById('amount-input').value}</span></p>
                        <div class="receipt-upload">
                            <label for="receipt">Upload Payment Receipt:
                                <span class="help-icon" tabindex="0" aria-label="Receipt help">&#9432;
                                    <span class="help-tooltip">Upload a screenshot or PDF of your payment receipt.</span>
                                </span>
                            </label>
                            <input type="file" id="receipt" name="receipt" accept="image/*,.pdf" required aria-label="Upload Payment Receipt">
                            <div id="receipt-error" class="form-error"></div>
                            <img id="receipt-preview" class="receipt-preview" style="display: none;">
                        </div>
                        <div>
                            <label for="transaction_id">Transaction ID:
                                <span class="help-icon" tabindex="0" aria-label="Transaction ID help">&#9432;
                                    <span class="help-tooltip">Enter the transaction/reference ID from your payment.</span>
                                </span>
                            </label>
                            <input type="text" id="transaction_id" name="transaction_id" required pattern="[A-Za-z0-9]+" title="Transaction ID should contain only letters and numbers" aria-label="Transaction ID">
                            <div id="transaction-error" class="form-error"></div>
                        </div>
                        <button type="submit" class="rent-btn">Complete Payment</button>
                    </div>
                    <div id="success-message" style="display:none;margin-top:20px;padding:16px 12px;background:#e6ffe6;color:#155724;border:1px solid #b2f2b2;border-radius:6px;font-size:1.1em;text-align:center;">
                        <i class="fas fa-check-circle"></i> Payment successful! Thank you for your booking.
                    </div>
                    `;
                    rentForm.appendChild(paymentDiv);
                    // Add receipt preview logic
                    document.getElementById('receipt').addEventListener('change', function() {
                        const file = this.files[0];
                        const preview = document.getElementById('receipt-preview');
                        if (file && file.type.startsWith('image/')) {
                            const reader = new FileReader();
                            reader.onload = function(e) {
                                preview.src = e.target.result;
                                preview.style.display = 'block';
                            };
                            reader.readAsDataURL(file);
                        } else if (file) {
                            preview.style.display = 'none';
                            showError('Only image or PDF files are allowed.', 'receipt-error');
                        } else {
                            preview.style.display = 'none';
                        }
                    });
                    // Payment form submit handler
                    rentForm.addEventListener('submit', function(ev) {
                        // Validate receipt and transaction ID
                        const receipt = document.getElementById('receipt').files[0];
                        const transactionId = document.getElementById('transaction_id').value;
                        let valid = true;
                        if (!receipt) {
                            showError('Please upload a payment receipt.', 'receipt-error');
                            valid = true;
                        }
                        if (!transactionId.trim() || !/^[A-Za-z0-9]+$/.test(transactionId)) {
                            showError('Transaction ID should contain only letters and numbers.', 'transaction-error');
                            valid = true;
                        }
                        if (!valid) {
                            ev.preventDefault();
                            return true;
                        }
                        // Show success message and prevent double submit
                        document.getElementById('success-message').style.display = 'block';
                        setTimeout(function() {
                            window.location.href = 'rent_success.php';
                        }, 2000);
                        ev.preventDefault();
                        return true;
                    }, { once: true });
                }
                paymentSectionLoading = true;
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Proceed to Payment';
                // Auto-scroll to payment section
                setTimeout(function() {
                    document.getElementById('dynamic-payment').scrollIntoView({behavior: 'smooth'});
                }, 100);
            }, 700); // Simulate loading
        });
        <?php endif; ?>
        </script>
    </div>
</body>
</html>