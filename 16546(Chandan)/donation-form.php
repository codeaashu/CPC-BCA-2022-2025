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
                <h1 class="ui header blue"><i class="hand holding heart icon"></i> Donation Application</h1>
            </div>
            
            <div class="ui segment">
                <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" class="ui form">

                    <h4 class="ui dividing header">Select the Program to Sponsor</h4>
                    <div class="grouped fields">
                        <label for="program">Programs:</label>
                        <?php 
                        $programs = ["Aakar" => "AAKAR - The First Step", "Ahar" => "AHAR APURTI", "Avsar" => "AVSAR - A Chance", "Lakshya" => "Lakshya", "Parivartan" => "PARIVARTAN - Change of Direction", "Uphaar" => "UPHAAR - Gift a Smile"];
                        foreach ($programs as $key => $value) {
                            echo "<div class='field'>
                                    <div class='ui radio checkbox'>
                                        <input type='radio' name='program' value='$key' required>
                                        <label>$value</label>
                                    </div>
                                  </div>";
                        }
                        ?>
                    </div>

                    <div class="field">
                        <label>Amount (INR)</label>
                        <input type="number" name="amount" min="1" placeholder="Enter donation amount" required>
                    </div>

                    <h4 class="ui dividing header">Payment Details</h4>
                    <div class="two fields">
                        <div class="field">
                            <label>Check / DD No.</label>
                            <input type="text" name="check" placeholder="Enter Check/DD No." required>
                        </div>
                        <div class="field">
                            <label>Bank Name</label>
                            <input type="text" name="bank_name" placeholder="Enter Bank Name" required>
                        </div>
                    </div>
                    <div class="field">
                        <label>Place</label>
                        <input type="text" name="place" placeholder="Enter Place" required>
                    </div>

                    <h4 class="ui dividing header">Personal Information</h4>
                    <div class="two fields">
                        <div class="field">
                            <label>Full Name</label>
                            <input type="text" name="name" placeholder="Enter Your Full Name" required>
                        </div>
                        <div class="field">
                            <label>Email</label>
                            <input type="email" name="email" placeholder="Enter Your Email" required>
                        </div>
                    </div>
                    <div class="two fields">
                        <div class="field">
                            <label>Phone Number</label>
                            <input type="tel" name="phone" placeholder="Enter Your Phone Number" required>
                        </div>
                        <div class="field">
                            <label>Address</label>
                            <input type="text" name="address" placeholder="Enter Your Address" required>
                        </div>
                    </div>

                    <button name="submit_donation" class="ui primary button" type="submit"><i class="heart icon"></i> Donate Now</button>
                    <button class="ui button" type="reset">Reset</button>
                </form>
            </div>
        </div>
    </div>
</div>

<?php include './components/footer.php'; ?>
