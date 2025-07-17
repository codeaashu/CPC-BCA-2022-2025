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
                    
                    Gifts Sent
                </h1>

                <div class="ui segment" style="max-height: 500px; overflow-y: auto;">
                    <table class="ui selectable celled striped table">
                        <thead class="full-width">
                            <tr class="center aligned">
                                <th>Gift ID</th>
                                <th>Child ID</th>
                                <th>Type</th>
                                <th>Sending Date</th>
                                <th>Sender Name</th>
                                <th>Sender Email</th>
                                <th>Sender Phone</th>
                                <th>Sender Address</th>
                            </tr>
                        </thead>
                        <tbody>

                            <?php
                            $sql = "SELECT * FROM gift ORDER BY sending_date DESC";
                            $result = $conn->query($sql);

                            if ($result->num_rows > 0) {
                                while ($row = $result->fetch_assoc()) {
                                    $formattedDate = date("d-m-Y", strtotime($row['sending_date']));
                            ?>
                                    <tr>
                                        <td class="center aligned"><?php echo htmlspecialchars($row['gift_id']); ?></td>
                                        <td class="center aligned"><?php echo htmlspecialchars($row['cid']); ?></td>
                                        <td><?php echo htmlspecialchars($row['gift_type']); ?></td>
                                        <td class="center aligned"><?php echo htmlspecialchars($formattedDate); ?></td>
                                        <td><strong><?php echo htmlspecialchars($row['sender_name']); ?></strong></td>
                                        <td>
                                            <a href="mailto:<?php echo htmlspecialchars($row['email']); ?>" class="ui blue text">
                                                <?php echo htmlspecialchars($row['email']); ?>
                                            </a>
                                        </td>
                                        <td>
                                            <a href="tel:<?php echo htmlspecialchars($row['phone']); ?>" class="ui blue text">
                                                <?php echo htmlspecialchars($row['phone']); ?>
                                            </a>
                                        </td>
                                        <td><?php echo htmlspecialchars($row['sender_address']); ?></td>
                                    </tr>
                            <?php
                                }
                            } else {
                            ?>
                                <tr>
                                    <td colspan="8" class="center aligned warning">
                                        <div class="ui yellow message">
                                            <i class="info circle icon"></i> No gifts sent yet.
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