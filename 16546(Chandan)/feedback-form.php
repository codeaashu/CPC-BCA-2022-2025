<?php include './components/header.php'; ?>

<div class="ui container">

    <!-- Top Navigation Bar -->
    <?php include './components/top-menu.php'; ?>

    <!-- BODY Content -->
    <div class="ui stackable grid">
        <!-- Left menu -->
        <?php include './components/side-menu.php'; ?>
        
        <!-- Right content -->
        <div class="twelve wide column">
            <div class="ui segment raised animated fadeIn">
                <h1 class="ui header blue"><i class="comments icon"></i> Feedback Form</h1>
            </div>
            
            <div class="ui segment">
                <?php
                    if(isset($_POST['submit_feedback'])) {
                        $name = $_POST['full_name'];
                        $address = $_POST['full_address'];
                        $phone = $_POST['phone'];
                        $email = $_POST['email'];
                        $comment = $_POST['comment'];

                        $sql = "INSERT INTO feedback (full_name, full_address, phone, email, comment) 
                                VALUES ('$name', '$address', '$phone', '$email', '$comment')";

                        if ($conn->query($sql) === TRUE) {
                            echo "<div class='ui positive message'><i class='close icon'></i>Feedback successfully sent. Thank you!</div>";
                        } else {
                            echo "<div class='ui negative message'><i class='close icon'></i>Error in submission. Please try again.</div>";
                        }
                        
                        $conn->close();
                    }
                ?>

                <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" class="ui form">
                    <div class="field">
                        <label><i class="user icon"></i> Name</label>
                        <input type="text" name="full_name" placeholder="Enter Your Full Name" required>
                    </div>
                    <div class="field">
                        <label><i class="map marker alternate icon"></i> Address</label>
                        <input type="text" name="full_address" placeholder="Enter Your Address" required>
                    </div>
                    <div class="two fields">
                        <div class="field">
                            <label><i class="phone icon"></i> Phone No.</label>
                            <input type="tel" name="phone" placeholder="Enter Your Phone Number" required>
                        </div>
                        <div class="field">
                            <label><i class="envelope icon"></i> Email Address</label>
                            <input type="email" name="email" placeholder="Enter Your Email" required>
                        </div>
                    </div>
                    <div class="field">
                        <label><i class="comment alternate icon"></i> Comments</label>
                        <textarea rows="3" name="comment" placeholder="Share your feedback here..." required></textarea>
                    </div>
                    <button name="submit_feedback" class="ui primary button" type="submit"><i class="paper plane icon"></i> Submit</button>
                    <button class="ui button" type="reset"><i class="redo icon"></i> Reset</button>
                </form>
            </div>
        </div>
    </div>
</div>

<?php include './components/footer.php'; ?>