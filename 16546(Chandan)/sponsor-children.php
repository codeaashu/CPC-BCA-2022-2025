<?php include './components/header.php'; ?>

<div class="ui container">

    <!-- Top Navigation Bar -->
    <?php include './components/top-menu.php'; ?>

    <div class="ui grid stackable">
        
        <!-- Sidebar Menu -->
        <div class="four wide column">
            <?php include './components/side-menu.php'; ?>
        </div>

        <!-- Sponsor a Child Section -->
        <div class="twelve wide column">
            
            <h1 class="ui header" style="font-size: 2.5rem; font-weight: 600;">🌟 Sponsor This Child</h1>
            <p style="font-size: 1.2rem; color: #555;">Make a meaningful impact by sponsoring a child's education and well-being.</p>
            
            <?php
                if(isset($_POST['submit'])) {
                    $cid = isset($_GET['cid']) ? $_GET['cid'] : null;
                    $noofyear = htmlspecialchars($_POST['noofyear']);
                    $firstname = htmlspecialchars($_POST['firstname']);
                    $lastname = htmlspecialchars($_POST['lastname']);
                    $email = htmlspecialchars($_POST['email']);
                    $phone = htmlspecialchars($_POST['phone']);
                    $address = htmlspecialchars($_POST['address']);
                    $amount = htmlspecialchars($_POST['amount']);
                    $checkno = htmlspecialchars($_POST['checkno']);

                    $sql = "INSERT INTO sponsorer (spn_firstname, spn_lastname, spnd_date, spn_noofyears, spn_email, spn_phone, spn_bill_address, spn_amount, spn_checkno, cid) 
                                VALUES ('$firstname', '$lastname', NOW(), '$noofyear', '$email', '$phone', '$address', '$amount', '$checkno', '$cid')";
                                
                    $sql2 = "UPDATE children SET sponsored=1 WHERE cid='$cid' ";

                    if ($conn->query($sql) === TRUE && $conn->query($sql2) === TRUE) {
                        echo "<script>alert('Sponsorship successful!');</script>";
                        echo "<script>window.location.href = './child-gallery-sponsored.php';</script>";
                    } else {
                        echo "<script>alert('Error in processing sponsorship. Please try again.');</script>";
                    }
                    
                    $conn->close();
                }
            ?>

            <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]) . "?cid=" . $_GET['cid']; ?>" method="post" class="ui form">
                
                <!-- Child Details -->
                <h4 class="ui dividing header">👦 Child's Details</h4>
                <div class="ui raised segment">
                    <img class="ui small circular image" src="img/defaultimg.png">
                    <?php
                        if(isset($_GET['cid'])) {
                            $cid = $_GET['cid'];
                        } else {
                            header('Location: ./child-gallery-sponsored.php');
                        }

                        $sql = "SELECT cid, cname, cdob, cyoe, cclass FROM children WHERE cid='$cid'";
                        $result = $conn->query($sql);

                        if ($result->num_rows > 0) {
                            while($row = $result->fetch_assoc()) {
                                $dob = $row["cdob"];
                                $age = date('Y') - date('Y', strtotime($dob));
                    ?>

                    <div class="ui horizontal list">
                        <div class="item"><strong>📛 Name:</strong> <?php echo $row["cname"]; ?></div>
                        <div class="item"><strong>🎂 Age:</strong> <?php echo $age; ?></div>
                        <div class="item"><strong>📚 Class:</strong> <?php echo $row["cclass"]; ?></div>
                        <div class="item"><strong>🏫 Year of Enrollment:</strong> <?php echo $row["cyoe"]; ?></div>
                    </div>

                    <?php
                            }
                        }
                    ?>
                </div>

                <!-- Sponsor Type -->
                <h4 class="ui dividing header">🎗 Sponsorship Plan</h4>
                <div class="ui grid">
                    <div class="eight wide column">
                        <div class="field">
                            <label>📅 Select Number of Years</label>
                            <select name="noofyear" class="ui fluid dropdown" required>
                                <option value="">Choose Duration</option>
                                <option value="1">1 Year</option>
                                <option value="2">2 Years</option>
                                <option value="3">3 Years</option>
                                <option value="5">5 Years</option>
                            </select>
                        </div>
                    </div>
                    <div class="eight wide column">
                        <div class="ui message">
                            <strong>💰 Sponsorship Costs:</strong><br>
                            ✅ 1 year - ₹4,800 / $112 USD<br>
                            ✅ 2 years - ₹9,600 / $224 USD<br>
                            ✅ 3 years - ₹15,000 / $335 USD<br>
                            ✅ 5 years - ₹25,000 / $581 USD
                        </div>
                    </div>
                </div>

                <!-- Personal Information -->
                <h4 class="ui dividing header">👤 Your Information</h4>
                <div class="fields">
                    <div class="eight wide field">
                        <label>🙍 First Name</label>
                        <input type="text" name="firstname" placeholder="Enter your first name" required>
                    </div>
                    <div class="eight wide field">
                        <label>🙍 Last Name</label>
                        <input type="text" name="lastname" placeholder="Enter your last name">
                    </div>
                </div>

                <div class="fields">
                    <div class="eight wide field">
                        <label>📧 Email</label>
                        <input type="email" name="email" placeholder="Enter your email" required>
                    </div>
                    <div class="eight wide field">
                        <label>📞 Phone</label>
                        <input type="tel" name="phone" placeholder="Enter your contact number" required>
                    </div>
                </div>

                <div class="field">
                    <label>🏠 Billing Address</label>
                    <input type="text" name="address" placeholder="Enter your address" required>
                </div>

                <!-- Billing Information -->
                <h4 class="ui dividing header">💳 Payment Details</h4>
                <div class="fields">
                    <div class="eight wide field">
                        <label>💵 Sponsorship Amount</label>
                        <input type="number" name="amount" min="1" placeholder="Enter Amount" required>
                    </div>
                    <div class="eight wide field">
                        <label>📜 Check / DD Number</label>
                        <input type="text" name="checkno" required>
                    </div>
                </div>

                <!-- Submit Button -->
                <button name="submit" class="ui primary button">💖 Sponsor Now</button>

            </form>

        </div>
    </div>

</div>

<?php include './components/footer.php'; ?>
