<?php include './components/header.php'; ?>

<div class="ui container">

    <!-- Top Navigation Bar -->
    <?php include './components/top-menu.php'; ?>

    <!-- Main Content -->
    <div class="ui grid stackable">
        
        <!-- Sidebar Menu -->
        <div class="four wide column">
            <?php include './components/side-menu.php'; ?>
        </div>

        <!-- Send a Gift Section -->
        <div class="twelve wide column">
            
            <h1 class="ui header" style="font-size: 2.5rem; font-weight: 600;">🎁 Send a Gift</h1>
            <p style="font-size: 1.2rem; color: #555;">Make a difference in a child's life by sending a thoughtful gift.</p>
            
            <?php
                if(isset($_POST['submit_gift'])) {
                    $cid = isset($_GET['cid']) ? $_GET['cid'] : null;
                    $gift_type = htmlspecialchars($_POST['gift_type']);
                    $sending_date = htmlspecialchars($_POST['sending_date']);
                    $name = htmlspecialchars($_POST['name']);
                    $email = htmlspecialchars($_POST['email']);
                    $phone = htmlspecialchars($_POST['phone']);
                    $address = htmlspecialchars($_POST['address']);

                    $sql = "INSERT INTO gift (cid, gift_type, sending_date, sender_name, email, phone, sender_address) 
                                VALUES ('$cid', '$gift_type', '$sending_date', '$name', '$email', '$phone', '$address')";

                    if ($conn->query($sql) === TRUE) {
                        echo "<script>alert('Gift request submitted successfully!');</script>";
                        echo "<script>window.location.href = './child-gallery-unsponsored.php';</script>";
                    } else {
                        echo "<script>alert('Error submitting gift request. Please try again.');</script>";
                    }
                    
                    $conn->close();
                }
            ?>

            <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]) . "?cid=" . $_GET['cid']; ?>" method="post" class="ui form">
                
                <!-- Child Details -->
                <h4 class="ui dividing header">👦 Child's Details</h4>
                <?php
                    if(isset($_GET['cid'])) {
                        $cid = $_GET['cid'];
                    }
                    $sql = "SELECT cid, cname, cdob, cyoe, cclass FROM children WHERE cid='$cid' ";
                    $result = $conn->query($sql);
                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            $dob = $row["cdob"];
                            $age = date('Y') - date('Y', strtotime($dob));
                ?>

                <div class="ui raised segment">
                    <div class="ui horizontal list">
                        <div class="item"><strong>📛 Name:</strong> <?php echo $row["cname"]; ?></div>
                        <div class="item"><strong>🎂 Age:</strong> <?php echo $age; ?></div>
                        <div class="item"><strong>📚 Class:</strong> <?php echo $row["cclass"]; ?></div>
                        <div class="item"><strong>🏫 Year of Enrollment:</strong> <?php echo $row["cyoe"]; ?></div>
                    </div>
                </div>

                <?php
                        }
                    } else {
                        echo '<div class="ui warning message">No child details found.</div>';
                    }
                ?>

                <!-- Gift Details -->
                <h4 class="ui dividing header">🎁 Gift Details</h4>
                <div class="field">
                    <label>🎀 Type of Gift</label>
                    <input type="text" name="gift_type" placeholder="E.g., Dress, Toy, Books..." required>
                </div>

                <div class="field">
                    <label>📅 Sending Date</label>
                    <input type="date" name="sending_date" required>
                </div>

                <!-- Personal Information -->
                <h4 class="ui dividing header">👤 Your Details</h4>
                <div class="field">
                    <label>🙍 Full Name</label>
                    <input type="text" name="name" placeholder="Enter your full name" required>
                </div>
                <div class="field">
                    <label>📧 Email</label>
                    <input type="email" name="email" placeholder="Enter your email" required>
                </div>
                <div class="field">
                    <label>📞 Phone</label>
                    <input type="tel" name="phone" placeholder="Enter your contact number" required>
                </div>
                <div class="field">
                    <label>🏠 Address</label>
                    <input type="text" name="address" placeholder="Enter your address" required>
                </div>

                <!-- Submit & Reset Buttons -->
                <button name="submit_gift" class="ui primary button" type="submit">🎁 Submit Gift</button>
                <button class="ui button" type="reset">🔄 Reset</button>
                
            </form>

            <span class="p-20"></span>
        </div>
    </div>

</div>

<?php include './components/footer.php'; ?>
