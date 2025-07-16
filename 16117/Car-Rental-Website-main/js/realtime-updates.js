class RealtimeUpdates {
    constructor() {
        this.ws = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectDelay = 1000; // Start with 1 second delay
        this.setupWebSocket();
        this.setupEventListeners();
    }

    setupWebSocket() {
        try {
            this.ws = new WebSocket('ws://localhost:8080');
            this.ws.onopen = () => this.handleConnection();
            this.ws.onclose = () => this.handleDisconnection();
            this.ws.onerror = (error) => this.handleError(error);
            this.ws.onmessage = (event) => this.handleMessage(event);
        } catch (error) {
            console.error('WebSocket setup failed:', error);
            this.handleError(error);
        }
    }

    setupEventListeners() {
        // Listen for page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible' && (!this.ws || this.ws.readyState === WebSocket.CLOSED)) {
                this.reconnectAttempts = 0;
                this.setupWebSocket();
            }
        });

        // Refresh data periodically using AJAX as fallback
        this.startPeriodicRefresh();
    }

    handleConnection() {
        console.log('Connected to WebSocket server');
        this.reconnectAttempts = 0;
        this.reconnectDelay = 1000;

        // Subscribe to relevant channels
        this.subscribe(['vehicle_updates', 'rental_updates']);
    }

    handleDisconnection() {
        console.log('Disconnected from WebSocket server');

        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            setTimeout(() => {
                this.reconnectAttempts++;
                this.reconnectDelay *= 2; // Exponential backoff
                this.setupWebSocket();
            }, this.reconnectDelay);
        } else {
            console.log('Max reconnection attempts reached. Falling back to AJAX updates.');
        }
    }

    handleError(error) {
        console.error('WebSocket error:', error);
        notificationManager.addNotification('error', 'Connection error. Some features may be unavailable.');
    }

    handleMessage(event) {
        try {
            const data = JSON.parse(event.data);
            
            switch (data.type) {
                case 'vehicle_status':
                    this.updateVehicleStatus(data);
                    break;
                case 'new_rental':
                    this.handleNewRental(data);
                    break;
                case 'rental_update':
                    this.handleRentalUpdate(data);
                    break;
                case 'error':
                    this.handleServerError(data);
                    break;
                default:
                    console.log('Unknown message type:', data.type);
            }
        } catch (error) {
            console.error('Error processing message:', error);
        }
    }

    subscribe(channels) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({
                type: 'subscribe',
                channels: channels
            }));
        }
    }

    updateVehicleStatus(data) {
        // Update UI elements
        const vehicleElement = document.querySelector(`[data-vehicle-id="${data.vehicleId}"]`);
        if (vehicleElement) {
            // Update status badge
            const statusBadge = vehicleElement.querySelector('.vehicle-status');
            if (statusBadge) {
                statusBadge.className = `vehicle-status ${data.status}`;
                statusBadge.textContent = data.status;
            }

            // Update availability
            const availabilityBadge = vehicleElement.querySelector('.availability-badge');
            if (availabilityBadge) {
                availabilityBadge.className = `availability-badge ${data.available ? 'available' : 'unavailable'}`;
                availabilityBadge.textContent = data.available ? 'Available' : 'Unavailable';
            }
        }

        // Show notification
        notificationManager.handleVehicleStatusUpdate(
            data.vehicleId,
            data.status,
            data.vehicleName
        );

        // Update statistics if on admin dashboard
        this.updateDashboardStats();
    }

    handleNewRental(data) {
        // Show notification
        notificationManager.handleNewRental(data.rental);

        // Update recent rentals list if on admin dashboard
        this.updateRecentRentals();

        // Update statistics
        this.updateDashboardStats();
    }

    handleRentalUpdate(data) {
        // Update rental status in UI
        const rentalElement = document.querySelector(`[data-rental-id="${data.rentalId}"]`);
        if (rentalElement) {
            const statusElement = rentalElement.querySelector('.rental-status');
            if (statusElement) {
                statusElement.className = `rental-status ${data.status}`;
                statusElement.textContent = data.status;
            }
        }

        // Show notification
        notificationManager.addNotification(
            data.status === 'confirmed' ? 'success' : 'info',
            `Rental #${data.rentalId} ${data.status}`
        );
    }

    handleServerError(data) {
        notificationManager.addNotification('error', data.message);
    }

    startPeriodicRefresh() {
        // Refresh vehicle list every 30 seconds as fallback
        setInterval(() => {
            if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
                this.refreshVehicleList();
            }
        }, 30000);
    }

    async refreshVehicleList() {
        try {
            const response = await fetch('get_vehicles.php');
            const data = await response.json();
            this.updateVehicleList(data);
        } catch (error) {
            console.error('Error refreshing vehicle list:', error);
        }
    }

    updateVehicleList(vehicles) {
        const vehicleList = document.querySelector('.vehicle-list');
        if (!vehicleList) return;

        vehicles.forEach(vehicle => {
            const vehicleElement = vehicleList.querySelector(`[data-vehicle-id="${vehicle.id}"]`);
            if (vehicleElement) {
                // Update vehicle information
                const statusBadge = vehicleElement.querySelector('.vehicle-status');
                if (statusBadge) {
                    statusBadge.className = `vehicle-status ${vehicle.status}`;
                    statusBadge.textContent = vehicle.status;
                }

                const pricingElement = vehicleElement.querySelector('.vehicle-pricing');
                if (pricingElement) {
                    pricingElement.textContent = `$${vehicle.price}/day`;
                }
            }
        });
    }

    async updateDashboardStats() {
        if (!document.querySelector('.dashboard-content')) return;

        try {
            const response = await fetch('get_dashboard_stats.php');
            const stats = await response.json();

            // Update statistics cards
            document.querySelector('.stat-card.users .stat-number').textContent = stats.totalUsers;
            document.querySelector('.stat-card.vehicles .stat-number').textContent = stats.totalVehicles;
            document.querySelector('.stat-card.rentals .stat-number').textContent = stats.totalRentals;
            document.querySelector('.stat-card.revenue .stat-number').textContent = 
                `$${parseFloat(stats.totalRevenue).toFixed(2)}`;

            // Update charts if they exist
            if (window.rentalsChart) {
                window.rentalsChart.data.datasets[0].data = stats.monthlyRentals;
                window.rentalsChart.update();
            }

            if (window.statusChart) {
                window.statusChart.data.datasets[0].data = stats.vehicleStatuses;
                window.statusChart.update();
            }
        } catch (error) {
            console.error('Error updating dashboard stats:', error);
        }
    }

    async updateRecentRentals() {
        if (!document.querySelector('.recent-activity')) return;

        try {
            const response = await fetch('get_recent_rentals.php');
            const rentals = await response.json();

            const activityList = document.querySelector('.activity-list');
            if (activityList) {
                rentals.forEach(rental => {
                    const rentalElement = document.createElement('div');
                    rentalElement.className = 'activity-item';
                    rentalElement.innerHTML = `
                        <div class="activity-icon">
                            <i class="fas fa-motorcycle"></i>
                        </div>
                        <div class="activity-details">
                            <h4>${rental.vehicleName}</h4>
                            <p>Rented by ${rental.userName}</p>
                            <span class="activity-time">
                                ${new Date(rental.rentalDate).toLocaleString()}
                            </span>
                        </div>
                        <div class="activity-status ${rental.status.toLowerCase()}">
                            ${rental.status}
                        </div>
                    `;

                    // Insert at the beginning of the list
                    activityList.insertBefore(rentalElement, activityList.firstChild);

                    // Remove oldest item if more than 5
                    if (activityList.children.length > 5) {
                        activityList.removeChild(activityList.lastChild);
                    }
                });
            }
        } catch (error) {
            console.error('Error updating recent rentals:', error);
        }
    }
}

// Initialize realtime updates
const realtimeUpdates = new RealtimeUpdates();