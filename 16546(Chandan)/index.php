<?php include './components/header.php'; ?>

<div class="ui container" style="padding-top: 30px; max-width: 1100px;">
    
    <!-- Top Navigation Bar -->
    <?php include './components/top-menu.php'; ?>
    
    <!-- BODY Content -->
    <div class="ui grid stackable">
        <!-- Left menu -->
        <?php include './components/side-menu.php'; ?>
        
        <!-- Right Content -->
        <div class="twelve wide column">
            <div class="ui raised very padded segment" style="background: #ffffff; border-radius: 12px; box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);">
                <h1 class="ui header" style="color: #2c3e50; text-align: center; font-size: 2.8em; font-weight: 700;">Welcome to BHF</h1>
                <h3 class="ui teal header" style="text-align: center; font-size: 2em;">Brave Heart Foundation</h3>
                
                <p style="text-align: justify; font-size: 1.3em; color: #555; line-height: 1.8;">
                    <strong>BHF</strong> is a non-profit, non-governmental organization committed to supporting and empowering vulnerable individuals. Our mission is to provide aid, education, and resources to those in need, fostering a future full of hope and opportunity.
                </p>
                
                <p style="text-align: justify; font-size: 1.3em; color: #555; line-height: 1.8;">
                    <strong>Who We Are:</strong> We are a team of compassionate individuals striving to make a difference in society. By utilizing available resources effectively, we create meaningful change in the lives of underprivileged communities.
                </p>
                
                <p style="text-align: justify; font-size: 1.3em; color: #555; line-height: 1.8;">
                    <strong>Our Mission:</strong> We aim to provide essential support, including education, healthcare, and personal development, to empower individuals and help them build a brighter, self-sufficient future.
                </p>
                
                <div class="ui horizontal divider" style="margin-top: 30px; margin-bottom: 30px;">
                    <i class="heart icon" style="color: #e74c3c;"></i> Empowering Lives <i class="heart icon" style="color: #e74c3c;"></i>
                </div>
                
                <!-- Image Gallery -->
                <div class="ui stackable centered grid" style="margin-top: 30px;">
                    <div class="fourteen wide column">
                        <div class="ui three column grid">
                            <div class="column">
                                <div class="ui card" style="border-radius: 10px; overflow: hidden; box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);">
                                    <div class="image">
                                        <img class="ui fluid rounded image" src="./img/children-1.jpg" alt="Community Support 1">
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="ui card" style="border-radius: 10px; overflow: hidden; box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);">
                                    <div class="image">
                                        <img class="ui fluid rounded image" src="./img/children-2.jpg" alt="Community Support 2">
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="ui card" style="border-radius: 10px; overflow: hidden; box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);">
                                    <div class="image">
                                        <img class="ui fluid rounded image" src="./img/children-3.jpg" alt="Community Support 3">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="ui center aligned container" style="margin-top: 40px;">
                    <a href="donation.php" class="ui large red button" style="border-radius: 8px; padding: 15px 30px; font-size: 1.3em; font-weight: bold;">
                        <i class="heart icon"></i> Join Our Cause
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include './components/footer.php'; ?>
