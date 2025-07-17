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

        <!-- Newsletter Content -->
        <div class="twelve wide column">
            
            <!-- Hero Section -->
            <div class="ui segment" style="background: #f4f4f4; padding: 40px; border-radius: 8px;">
                <h1 class="ui header" style="font-size: 2.5rem; font-weight: 600;">
                    Stay Informed with <span style="color: #2185d0;">Brave-Heart Foundation</span>
                </h1>
                <p style="font-size: 1.2rem; color: #555;">
                    Discover stories, updates, and impactful initiatives. Stay connected with our mission.
                </p>
            </div>

            <!-- About the Foundation -->
            <div class="ui segment">
                <h2 class="ui header">About Us</h2>
                <p>
                    <strong>Brave-Heart Foundation (BHF)</strong> is a non-profit organization committed to
                    supporting underprivileged children through education, empowerment, and care.
                </p>
                <p>
                    Our mission is to provide resources and opportunities for a brighter future.
                </p>
            </div>

            <!-- Latest Newsletters -->
            <div class="ui segment">
                <h2 class="ui header">Latest Newsletters</h2>

                <div class="ui relaxed divided list">
                <?php
                    // Fetching newsletters from the database
                    $sql = "SELECT n_issue, n_story, n_month FROM newsletter ORDER BY n_month DESC LIMIT 6";
                    $result = $conn->query($sql);

                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                ?>
                        <div class="item" style="padding: 20px 0;">
                            <div class="content">
                                <h3 class="ui header" style="color: #2185d0;"><?php echo htmlspecialchars($row["n_month"]); ?></h3>
                                <p style="font-size: 1.1rem;"><strong><?php echo htmlspecialchars($row["n_issue"]); ?>:</strong></p>
                                <p style="color: #555;"><?php echo nl2br(htmlspecialchars($row["n_story"])); ?></p>
                            </div>
                        </div>
                <?php
                        }
                    } else {
                        echo '<p class="ui warning message">No newsletters available at the moment.</p>';
                    }
                ?>
                </div>
            </div>

            <!-- Call to Action -->
            <div class="ui segment" style="background: #fff; padding: 30px; border-radius: 8px; text-align: center;">
                <h3 class="ui header">Want to Make a Difference?</h3>
                <p>Stay updated, support our cause, and be part of something impactful.</p>
                <a href="donation.php"><button class="ui primary button">Get Involved</button></a>
            </div>

        </div>
    </div>
</div>

<?php include './components/footer.php'; ?>
