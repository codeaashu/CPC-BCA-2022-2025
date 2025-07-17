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
                <h1 class="ui header blue"><i class="images icon"></i> Child Gallery</h1>
            </div>
            
            <div class="ui pointing menu">
                <a class="item" href="child-gallery-sponsored.php">
                    Sponsored Children
                </a>
                <a class="item active" href="child-gallery-unsponsored.php">
                    Not Sponsored Children
                </a>
            </div>

            <?php

            $sql = "SELECT cid, cname, cdob, cyoe, cclass FROM children WHERE sponsored=0";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $dob = $row["cdob"];
                    $age = (date('Y') - date('Y',strtotime($dob)));
            ?>

            <div class="ui segment">
                <div class="ui divided items">
                    <div class="item">
                        <div class="ui small image">
                            <img src="img/defaultimg.png" alt="Child Image">
                        </div>
                        <div class="middle aligned content">
                            <div class="meta">
                                <span class="ui sub header"><strong>Child Details:</strong></span>
                            </div>
                            <div class="description">
                                <div class="ui list">
                                    <div class="item"><strong>Name:</strong> <?php echo $row["cname"]; ?></div>
                                    <div class="item"><strong>Age:</strong> <?php echo $age; ?></div>
                                    <div class="item"><strong>Class:</strong> <?php echo $row["cclass"]; ?></div>
                                    <div class="item"><strong>Year of Enrollment:</strong> <?php echo $row["cyoe"]; ?></div>
                                </div>
                            </div>
                            <div class="extra">
                                <a class="ui primary button" href="donation.php"><i class="heart icon"></i> Donate</a>
                                <a class="ui green button" href="sponsor-children.php?cid=<?php echo $row['cid']; ?>">
                                    <i class="handshake icon"></i> Sponsor
                                </a>
                                <a class="ui yellow button" href="send-gift.php?cid=<?php echo $row['cid']; ?>">
                                    <i class="gift icon"></i> Send a Gift
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <?php
                }
            } else {
                echo "<div class='ui warning message'><i class='info icon'></i> No unsponsored children available.</div>";
            }
            ?>

        </div>
    </div>
</div>

<?php include './components/footer.php'; ?>