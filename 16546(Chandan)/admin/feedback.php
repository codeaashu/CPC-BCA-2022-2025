<?php include './admin_components/admin_header.php'; ?>

<div class="ui container">
    <!-- Top Navigation Bar -->
    <?php include './admin_components/admin_top-menu.php'; ?>

    <div class="ui stackable grid">
        <!-- Left menu -->
        <div class="four wide column">
            <?php include './admin_components/admin_side-menu.php'; ?>
        </div>

        <!-- Right content -->
        <div class="twelve wide column">
            <div class="ui raised segment">
                <h1 class="ui dividing header">
                    
                    User Feedback
                </h1>

                <div class="ui segment" style="max-height: 500px; overflow-y: auto;">
                    <table class="ui selectable celled striped table">
                        <thead class="full-width">
                            <tr class="center aligned">
                                <th>Feed ID</th>
                                <th>Full Name</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Comment</th>
                            </tr>
                        </thead>
                        <tbody>

                            <?php
                            $sql = "SELECT * FROM feedback ORDER BY feed_id DESC";
                            $result = $conn->query($sql);

                            if ($result->num_rows > 0) {
                                while ($row = $result->fetch_assoc()) {
                            ?>
                                    <tr>
                                        <td class="center aligned"><?php echo htmlspecialchars($row['feed_id']); ?></td>
                                        <td><strong><?php echo htmlspecialchars($row['full_name']); ?></strong></td>
                                        <td><?php echo htmlspecialchars($row['full_address']); ?></td>
                                        <td>
                                            <a href="tel:<?php echo htmlspecialchars($row['phone']); ?>" class="ui blue text">
                                                <?php echo htmlspecialchars($row['phone']); ?>
                                            </a>
                                        </td>
                                        <td>
                                            <a href="mailto:<?php echo htmlspecialchars($row['email']); ?>" class="ui blue text">
                                                <?php echo htmlspecialchars($row['email']); ?>
                                            </a>
                                        </td>
                                        <td><?php echo htmlspecialchars($row['comment']); ?></td>
                                    </tr>
                            <?php
                                }
                            } else {
                            ?>
                                <tr>
                                    <td colspan="6" class="center aligned warning">
                                        <div class="ui yellow message">
                                            <i class="info circle icon"></i> No feedback found.
                                        </div>
                                    </td>
                                </tr>
                            <?php } ?>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include './admin_components/admin_footer.php'; ?>