<?php include './admin_components/admin_header.php'; ?>

<div class="ui container">
    <!-- Top Navigation Bar -->
    <?php include './admin_components/admin_top-menu.php'; ?>

    <div class="ui grid stackable">
        <!-- Left menu -->
        <div class="four wide column">
            <?php include './admin_components/admin_side-menu.php'; ?>
        </div>
        
        <!-- Right content -->
        <div class="twelve wide column">
            <div class="ui segment">
                <h1 class="ui dividing header">
                     Children - Orphan
                </h1>

                <!-- Search & Filter Bar -->
                <div class="ui action input">
                    <input type="text" id="searchInput" placeholder="🔍 Search for a child..." onkeyup="filterTable()">
                    <button class="ui blue button"><i class="search icon"></i> Search</button>
                </div>

                <!-- Children Table -->
                <table class="ui celled striped table" id="childrenTable">
                    <thead class="full-width">
                        <tr>
                            <th onclick="sortTable(0)">CID ⬍</th>
                            <th onclick="sortTable(1)">Name ⬍</th>
                            <th onclick="sortTable(2)">Date of Birth ⬍</th>
                            <th onclick="sortTable(3)">Year of Enrollment ⬍</th>
                            <th onclick="sortTable(4)">Class ⬍</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                            
                            $sql = "SELECT * FROM children ORDER BY cname ASC";
                            $result = $conn->query($sql);

                            if ($result->num_rows > 0) {
                                while ($row = $result->fetch_assoc()) {
                                    $formattedDate = date("d-m-Y", strtotime($row['cdob']));
                        ?>
                        <tr>
                            <td><?php echo htmlspecialchars($row['cid']); ?></td>
                            <td><strong><?php echo htmlspecialchars($row['cname']); ?></strong></td>
                            <td><?php echo htmlspecialchars($formattedDate); ?></td>
                            <td><?php echo htmlspecialchars($row['cyoe']); ?></td>
                            <td><?php echo htmlspecialchars($row['cclass']); ?></td>
                        </tr>
                        <?php
                                }
                            } else {
                        ?>
                        <tr>
                            <td colspan="5" class="center aligned warning">No records found</td>
                        </tr>
                        <?php } ?>
                    </tbody>
                    <tfoot class="full-width">
                        <tr>
                            <th colspan="5" class="right aligned">
                                <a class="ui huge primary button" href="children-add.php">
                                    <i class="plus circle icon"></i> Add Child
                                </a>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
</div>

<?php include './admin_components/admin_footer.php'; ?>

<!-- JavaScript for Search & Sort -->
<script>
    function filterTable() {
        let input = document.getElementById("searchInput").value.toUpperCase();
        let table = document.getElementById("childrenTable");
        let tr = table.getElementsByTagName("tr");

        for (let i = 1; i < tr.length; i++) {
            let td = tr[i].getElementsByTagName("td")[1]; // Search by Name
            if (td) {
                let textValue = td.textContent || td.innerText;
                tr[i].style.display = textValue.toUpperCase().indexOf(input) > -1 ? "" : "none";
            }
        }
    }

    function sortTable(column) {
        let table = document.getElementById("childrenTable");
        let rows = Array.from(table.rows).slice(1);
        let sortedRows = rows.sort((a, b) => {
            let aText = a.cells[column].innerText.trim();
            let bText = b.cells[column].innerText.trim();
            return aText.localeCompare(bText, undefined, { numeric: true });
        });

        table.tBodies[0].append(...sortedRows);
    }
</script>