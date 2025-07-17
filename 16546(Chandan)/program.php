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

        <!-- Programs Section -->
        <div class="twelve wide column">
            
            <h1 class="ui header" style="font-size: 2.5rem; font-weight: 600;">🌟 Our Programs</h1>
            <p style="font-size: 1.2rem; color: #555;">Explore our initiatives aimed at making a meaningful impact.</p>

            <div class="ui divided items">
                <?php
                    $sql = "SELECT * FROM programs";
                    $result = $conn->query($sql);
                    
                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                ?>
                
                <div class="item">
                    <div class="content">
                        <h3 class="header" style="color: #1b1c1d;"><?php echo htmlspecialchars($row['program_title']); ?></h3>
                        <p class="description" style="color: #555;"><?php echo htmlspecialchars($row['program_desc']); ?></p>
                    </div>
                </div>

                <?php
                        }
                    } else {
                        echo '<p>No programs available at the moment.</p>';
                    }
                ?>
            </div>

        </div>
    </div>
</div>

<?php include './components/footer.php'; ?>
