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

        <!-- Gallery Section -->
        <div class="twelve wide column">
            
            <h1 class="ui header" style="font-size: 2.5rem; font-weight: 600;">📸 Photo Gallery</h1>
            <p style="font-size: 1.1rem; color: #555;">A glimpse into our impactful initiatives.</p>

            <?php
                // Define gallery categories
                $gallery = [
                    "AAKAR - The First Step" => ["orphan-gallery-1.jpg", "orphan-gallery-2.png", "orphan-gallery-3.jpg", "orphan-gallery-4.jpg"],
                    "AHAR APURTI" => ["orphan-gallery-5.jpg", "orphan-gallery-6.jpg", "orphan-gallery-7.jpg", "orphan-gallery-8.jpg"],
                    "AVSAR - A Chance" => ["orphan-gallery-9.jpg", "orphan-gallery-10.jpg", "orphan-gallery-11.jpg", "orphan-gallery-12.jpg"],
                    "Lakshya" => ["orphan-gallery-13.jpg", "orphan-gallery-14.jpg", "orphan-gallery-15.jpg", "orphan-gallery-16.jpg"],
                    "PARIVARTAN - Change of Direction" => ["orphan-gallery-17.jpg", "orphan-gallery-18.jpg", "orphan-gallery-19.jpg", "orphan-gallery-20.jpg"],
                    "UPHAAR - Gift a Smile" => ["orphan-gallery-1.jpg", "orphan-gallery-3.jpg", "orphan-gallery-5.jpg", "orphan-gallery-7.jpg"],
                    "RAKTHADHAAN - Save a Child" => ["blooddonationcamp1.jpg", "blooddonationcamp2.jpg", "blooddonationcamp3.jpg", "blooddonationcamp4.jpg"],
                ];

                // Loop through each gallery section
                foreach ($gallery as $title => $images) {
                    echo '<h2 class="ui dividing header">' . htmlspecialchars($title) . '</h2>';
                    echo '<div class="ui four column grid">';
                    foreach ($images as $img) {
                        echo '
                            <div class="column">
                                <div class="ui fluid image">
                                    <img src="img/' . htmlspecialchars($img) . '" loading="lazy" alt="Gallery Image">
                                </div>
                            </div>';
                    }
                    echo '</div>';
                }
            ?>

        </div>
    </div>
</div>

<?php include './components/footer.php'; ?>
