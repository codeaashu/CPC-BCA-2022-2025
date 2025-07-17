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
                    </i> Donators
                </h1>

                <!-- Search Bar -->
                <div class="ui action input">
                    <input type="text" id="searchInput" placeholder="🔍 Search donations..." onkeyup="filterTable()">
                    <button class="ui blue button"><i class="search icon"></i> Search</button>
                </div>

                <!-- Scrollable Table Container -->
                <div class="ui segment" style="overflow-x: auto; max-width: 100%;">
                    <table class="ui celled striped table" id="donatorsTable" style="min-width: 1000px;">
                        <thead class="full-width">
                            <tr>
                                <th onclick="sortTable(0)">ID ⬍</th>
                                <th onclick="sortTable(1)">Program Name ⬍</th>
                                <th onclick="sortTable(2)">Amount ⬍</th>
                                <th onclick="sortTable(3)">Check No. ⬍</th>
                                <th onclick="sortTable(4)">Bank Name ⬍</th>
                                <th onclick="sortTable(5)">Place ⬍</th>
                                <th onclick="sortTable(6)">Donator's Name ⬍</th>
                                <th onclick="sortTable(7)">Email ⬍</th>
                                <th onclick="sortTable(8)">Phone ⬍</th>
                                <th onclick="sortTable(9)">Address ⬍</th>
                            </tr>
                        </thead>
                        <tbody>

                            <?php
                                
                                $sql = "SELECT * FROM donation ORDER BY d_name ASC";
                                $result = $conn->query($sql);

                                if ($result->num_rows > 0) {
                                    while ($row = $result->fetch_assoc()) {
                            ?>
                            <tr>
                                <td data-label="ID"><?php echo htmlspecialchars($row['d_id']); ?></td>
                                <td data-label="Program"><?php echo htmlspecialchars($row['program']); ?></td>
                                <td data-label="Amount">₹<?php echo number_format($row['amount'], 2); ?></td>
                                <td data-label="Check No."><?php echo htmlspecialchars($row['checkno']); ?></td>
                                <td data-label="Bank Name"><?php echo htmlspecialchars($row['bank_name']); ?></td>
                                <td data-label="Place"><?php echo htmlspecialchars($row['place']); ?></td>
                                <td data-label="Donator's Name"><strong><?php echo htmlspecialchars($row['d_name']); ?></strong></td>
                                <td data-label="Email"><?php echo htmlspecialchars($row['email']); ?></td>
                                <td data-label="Phone"><?php echo htmlspecialchars($row['phone']); ?></td>
                                <td data-label="Address"><?php echo htmlspecialchars($row['d_address']); ?></td>
                            </tr>

                            <?php
                                    }
                                } else {
                            ?>
                            <tr>
                                <td colspan="10" class="center aligned warning">No donation records found</td>
                            </tr>
                            <?php } ?>

                        </tbody>
                    </table>
                </div> <!-- End Scrollable Container -->
            </div>
        </div>
    </div>
</div>

<?php include './admin_components/admin_footer.php'; ?>

<!-- JavaScript for Search & Sort -->
<script>
    function filterTable() {
        let input = document.getElementById("searchInput").value.toUpperCase();
        let table = document.getElementById("donatorsTable");
        let tr = table.getElementsByTagName("tr");

        for (let i = 1; i < tr.length; i++) {
            let td = tr[i].getElementsByTagName("td")[6]; // Search by Donator's Name
            if (td) {
                let textValue = td.textContent || td.innerText;
                tr[i].style.display = textValue.toUpperCase().indexOf(input) > -1 ? "" : "none";
            }
        }
    }

    function sortTable(column) {
        let table = document.getElementById("donatorsTable");
        let rows = Array.from(table.rows).slice(1);
        let sortedRows = rows.sort((a, b) => {
            let aText = a.cells[column].innerText.trim();
            let bText = b.cells[column].innerText.trim();
            return aText.localeCompare(bText, undefined, { numeric: true });
        });

        table.tBodies[0].append(...sortedRows);
    }
</script>