<?php
session_start();

if (!isset($_SESSION['user_id']) || $_SESSION['user_type'] !== 'admin') {
    header("Location: Php/login.php");
    exit();
}

include("Php/Conn.php");
include("Php/vehicleClass.php");

try {
    $conn = Conn::GetConnection();
    
    // Basic statistics
    $stmt = $conn->query("SELECT COUNT(*) AS total_users FROM Users");
    $totalUsers = $stmt->fetch(PDO::FETCH_ASSOC)['total_users'];

    $stmt = $conn->query("SELECT COUNT(*) AS total_vehicles FROM Vehicles");
    $totalVehicles = $stmt->fetch(PDO::FETCH_ASSOC)['total_vehicles'];

    $stmt = $conn->query("SELECT COUNT(*) AS total_rentals FROM vehicle_rental");
    $totalRentals = $stmt->fetch(PDO::FETCH_ASSOC)['total_rentals'];

    $stmt = $conn->query("SELECT COALESCE(SUM(total_amount), 0) as total_revenue FROM vehicle_rental WHERE status = 'completed'");
    $totalRevenue = $stmt->fetch(PDO::FETCH_ASSOC)['total_revenue'];
} catch (PDOException $e) {
    error_log("Database error: " . $e->getMessage());
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - SL Moto</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="Css/admin.css">
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="Css/realtime-updates.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="admin-container">
        <!-- Sidebar Navigation -->
        <nav class="sidebar">
            <div class="sidebar-header">
                <h2>SL Moto</h2>
                <p>Admin Panel</p>
            </div>
            <ul class="nav-links">
                <li class="active">
                    <a href="#"><i class="fas fa-home"></i> Dashboard</a>
                </li>
                <li>
                    <a href="allVehicleAdmin.php"><i class="fas fa-motorcycle"></i> Vehicles</a>
                </li>
                <li>
                    <a href="manageAdmin.php"><i class="fas fa-users-cog"></i> Manage Admins</a>
                </li>
                <li>
                    <a href="Php/logout.php"><i class="fas fa-sign-out-alt"></i> Logout</a>
                </li>
            </ul>
        </nav>

        <!-- Main Content Area -->
        <main class="admin-main">
            <!-- Top Header -->
            <header class="admin-header">
                <div class="header-search">
                    <input type="text" placeholder="Search...">
                    <i class="fas fa-search"></i>
                </div>
                <div class="header-actions">
                    <button class="notification-btn">
                        <i class="fas fa-bell"></i>
                        <span class="notification-count">0</span>
                    </button>
                    <div class="admin-profile">
                        <img src="images/admin-avatar.svg" alt="Admin Avatar">
                        <span><?php echo htmlspecialchars($_SESSION['username'] ?? 'Admin'); ?></span>
                    </div>
                </div>
            </header>

            <!-- Statistics Cards -->
            <div class="stats-grid">
                <div class="stat-card users" id="show-users-modal" style="cursor:pointer;">
                    <div class="stat-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="stat-info">
                        <h3>Total Users</h3>
                        <p class="stat-number"><?php echo $totalUsers ?? 0; ?></p>
                    </div>
                </div>
                <div class="stat-card vehicles">
                    <div class="stat-icon">
                        <i class="fas fa-motorcycle"></i>
                    </div>
                    <div class="stat-info">
                        <h3>Total Vehicles</h3>
                        <p class="stat-number"><?php echo $totalVehicles ?? 0; ?></p>
                    </div>
                </div>
                <div class="stat-card rentals">
                    <div class="stat-icon">
                        <i class="fas fa-key"></i>
                    </div>
                    <div class="stat-info">
                        <h3>Total Rentals</h3>
                        <p class="stat-number"><?php echo $totalRentals ?? 0; ?></p>
                    </div>
                </div>
                <div class="stat-card revenue">
                    <div class="stat-icon">
                        <i class="fas fa-dollar-sign"></i>
                    </div>
                    <div class="stat-info">
                        <h3>Total Revenue</h3>
                        <p class="stat-number">$<?php echo number_format($totalRevenue ?? 0, 2); ?></p>
                    </div>
                </div>
            </div>

            <!-- User List Modal -->
            <div id="usersModal" class="modal" style="display:none;position:fixed;z-index:1000;left:0;top:0;width:100vw;height:100vh;background:rgba(0,0,0,0.5);align-items:center;justify-content:center;">
                <div style="background:#fff;padding:30px 20px;border-radius:8px;max-width:700px;width:90%;max-height:80vh;overflow:auto;position:relative;">
                    <button onclick="document.getElementById('usersModal').style.display='none'" style="position:absolute;top:10px;right:10px;font-size:20px;background:none;border:none;cursor:pointer;">&times;</button>
                    <h2 style="margin-bottom:20px;">All Users</h2>
                    <div id="usersTableContainer">Loading...</div>
                </div>
            </div>

            <!-- Charts Section -->
            <div class="charts-container" style="display:flex;gap:30px;flex-wrap:wrap;">
                <div class="chart-card" style="flex:2 1 400px;min-width:350px;min-height:350px;">
                    <h3>Monthly Rentals</h3>
                    <canvas id="rentalsChart" style="width:100%;height:320px;"></canvas>
                </div>
                <div class="chart-card" style="flex:1 1 350px;min-width:350px;min-height:350px;">
                    <h3>Vehicle Status Distribution</h3>
                    <canvas id="statusChart" style="width:100%;height:320px;"></canvas>
                </div>
            </div>

            <!-- Recent Activity Section -->
            <div class="recent-activity">
                <h3>Recent Activity</h3>
                <div class="activity-list" id="activity-list">
                    Loading recent activity...
                </div>
            </div>
        </main>
    </div>

    <script src="js/realtime-updates.js" defer></script>
    <script src="js/notifications.js" defer></script>
    <script>
        // Initialize charts
        document.addEventListener('DOMContentLoaded', () => {
            // Monthly Rentals Chart
            const rentalsCtx = document.getElementById('rentalsChart').getContext('2d');
            window.rentalsChart = new Chart(rentalsCtx, {
                type: 'line',
                data: {
                    labels: Array.from({length: 6}, (_, i) => {
                        const date = new Date();
                        date.setMonth(date.getMonth() - (5 - i));
                        return date.toLocaleString('default', { month: 'short' });
                    }),
                    datasets: [{
                        label: 'Rentals',
                        data: [0, 0, 0, 0, 0, 0],
                        borderColor: '#4CAF50',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });

            // Vehicle Status Chart
            const statusCtx = document.getElementById('statusChart').getContext('2d');
            window.statusChart = new Chart(statusCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Available', 'Rented', 'Maintenance'],
                    datasets: [{
                        data: [0, 0, 0],
                        backgroundColor: ['#4CAF50', '#2196F3', '#FFC107']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        });

        document.getElementById('show-users-modal').onclick = function() {
            document.getElementById('usersModal').style.display = 'flex';
            fetch('get_users.php')
                .then(res => res.text())
                .then(html => {
                    document.getElementById('usersTableContainer').innerHTML = html;
                })
                .catch(() => {
                    document.getElementById('usersTableContainer').innerHTML = '<p style="color:red;">Failed to load users.</p>';
                });
        };

        // Fetch recent activity
        fetch('get_recent_activity.php')
            .then(res => res.text())
            .then(html => {
                document.getElementById('activity-list').innerHTML = html;
            })
            .catch(() => {
                document.getElementById('activity-list').innerHTML = '<p style="color:red;">Failed to load activity.</p>';
            });

        // Fetch and update chart data
        fetch('get_chart_data.php')
            .then(res => res.json())
            .then(data => {
                // Update rentals chart
                if (window.rentalsChart && data.rentals) {
                    window.rentalsChart.data.labels = data.rentals.labels;
                    window.rentalsChart.data.datasets[0].data = data.rentals.data;
                    window.rentalsChart.update();
                }
                // Update status chart
                if (window.statusChart && data.status) {
                    window.statusChart.data.datasets[0].data = data.status.data;
                    window.statusChart.update();
                }
            });
    </script>
</body>
</html>