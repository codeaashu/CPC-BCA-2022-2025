<?php
require_once 'Php/Conn.php';
try {
    $conn = Conn::GetConnection();
    $stmt = $conn->query("SELECT Id, username, email, user_type, last_login FROM users ORDER BY Id DESC");
    echo '<input type="text" id="userSearchInput" placeholder="Search users..." style="margin-bottom:10px;width:100%;padding:8px;">';
    echo '<table id="usersTable" border="1" style="width:100%;border-collapse:collapse;">';
    echo '<thead><tr>';
    echo '<th data-sort="Id">ID</th>';
    echo '<th data-sort="username">Username</th>';
    echo '<th data-sort="email">Email</th>';
    echo '<th data-sort="user_type">User Type</th>';
    echo '<th data-sort="last_login">Last Login</th>';
    echo '</tr></thead><tbody>';
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo '<tr>';
        echo '<td>' . htmlspecialchars($row['Id']) . '</td>';
        echo '<td>' . htmlspecialchars($row['username']) . '</td>';
        echo '<td>' . htmlspecialchars($row['email']) . '</td>';
        echo '<td>' . htmlspecialchars($row['user_type']) . '</td>';
        echo '<td>' . htmlspecialchars($row['last_login']) . '</td>';
        echo '</tr>';
    }
    echo '</tbody></table>';
    echo '<script>
    // Search filter
    document.getElementById("userSearchInput").addEventListener("input", function() {
        const filter = this.value.toLowerCase();
        const rows = document.querySelectorAll("#usersTable tbody tr");
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(filter) ? "" : "none";
        });
    });
    // Sorting
    const getCellValue = (tr, idx) => tr.children[idx].textContent;
    const comparer = (idx, asc) => (a, b) => ((v1, v2) =>
        v1 !== "" && v2 !== "" && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
    )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));
    document.querySelectorAll("#usersTable th").forEach(th => th.addEventListener("click", (() => {
        const table = th.closest("table");
        Array.from(table.querySelectorAll("tbody tr"))
            .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
            .forEach(tr => table.querySelector("tbody").appendChild(tr));
    })));
    </script>';
} catch (PDOException $e) {
    echo '<p style="color:red;">Error: ' . htmlspecialchars($e->getMessage()) . '</p>';
} 