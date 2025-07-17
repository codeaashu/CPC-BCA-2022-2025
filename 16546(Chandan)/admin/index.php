<?php include './admin_components/admin_header.php'; ?>

<div class="ui container">
    <!-- Top Navigation Bar -->
    <?php include './admin_components/admin_top-menu.php'; ?>
</div>

<div class="ui grid">
    <!-- Left Sidebar -->
    <div class="four wide column">
        <div class="ui vertical menu">
            <a class="item" href="index.php"><i class="dashboard icon"></i> Dashboard</a>
            <a class="item" href="children.php"><i class="child icon"></i> Children</a>
            <a class="item" href="sponsors.php"><i class="users icon"></i> Sponsors</a>
            <a class="item" href="donators.php"><i class="hand holding usd icon"></i> Donators</a>
            <a class="item" href="gift_sent.php"><i class="gift icon"></i> Gift Sent</a>
            <a class="item" href="programs.php"><i class="calendar alternate outline icon"></i> Programs</a>
            <a class="item" href="newsletter.php"><i class="envelope icon"></i> Newsletter</a>
            <a class="item" href="feedback.php"><i class="comments icon"></i> Feedback</a>
        </div>
    </div>

    <!-- Main Content -->
    <div class="twelve wide column">
        <div class="ui center aligned segment">
            <h2 class="ui blue header"><i class="heart icon"></i> BRAVE-HEARTS</h2>
            <p class="ui text">Empowering Lives, One Heart at a Time</p>
        </div>

        <div class="ui three stackable cards">
            <div class="ui card">
                <div class="content">
                    <div class="header"><i class="child icon"></i> Total Children</div>
                    <div class="meta">Currently Residing</div>
                    <div class="description">
                        <strong>8</strong>
                    </div>
                </div>
            </div>

            <div class="ui card">
                <div class="content">
                    <div class="header"><i class="user plus icon"></i> Total Sponsors</div>
                    <div class="meta">Supporting the Orphanage</div>
                    <div class="description">
                        <strong>1</strong>
                    </div>
                </div>
            </div>

            <div class="ui card">
                <div class="content">
                    <div class="header"><i class="dollar sign icon"></i> Total Donations</div>
                    <div class="meta">Funds Collected</div>
                    <div class="description">
                        <strong class="ui green text">$21,870.00</strong>
                    </div>
                </div>
            </div>
        </div>

        <div class="ui segment">
            <h3 class="ui header"><i class="history icon"></i> Recent Activities</h3>
            <div class="ui list">
                <div class="item"><i class="money bill alternate icon"></i> A new donation of $500 has been received.</div>
                <div class="item"><i class="plus square icon"></i> A new child has been added to the database.</div>
                <div class="item"><i class="user check icon"></i> A new sponsor has registered.</div>
            </div>
        </div>
    </div>
</div>

<?php include './admin_components/admin_footer.php'; ?>