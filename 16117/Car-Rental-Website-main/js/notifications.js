class NotificationManager {
    constructor() {
        this.notificationCount = 0;
        this.notificationBadge = document.querySelector('.notification-badge');
        this.notificationBtn = document.querySelector('.notification-btn');
        this.setupEventListeners();
        this.notifications = [];
    }

    setupEventListeners() {
        this.notificationBtn.addEventListener('click', () => this.showNotifications());
    }

    addNotification(type, message) {
        const notification = {
            id: Date.now(),
            type,
            message,
            timestamp: new Date().toLocaleString()
        };

        this.notifications.unshift(notification);
        this.updateNotificationCount(1);
        this.showToast(notification);
    }

    updateNotificationCount(change) {
        this.notificationCount += change;
        this.notificationBadge.textContent = this.notificationCount;
        this.notificationBadge.style.display = this.notificationCount > 0 ? 'block' : 'none';
    }

    showToast(notification) {
        const toast = document.createElement('div');
        toast.className = `notification-toast ${notification.type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas ${this.getIconForType(notification.type)}"></i>
                <div class="toast-message">${notification.message}</div>
            </div>
            <div class="toast-progress"></div>
        `;

        document.body.appendChild(toast);

        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 100);

        // Auto dismiss after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }

    showNotifications() {
        const modal = document.createElement('div');
        modal.className = 'notification-modal';
        modal.innerHTML = `
            <div class="notification-panel">
                <div class="notification-header">
                    <h3>Notifications</h3>
                    <button class="close-btn"><i class="fas fa-times"></i></button>
                </div>
                <div class="notification-list">
                    ${this.notifications.length > 0 ? 
                        this.notifications.map(notif => this.renderNotification(notif)).join('') :
                        '<div class="no-notifications">No new notifications</div>'
                    }
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close button functionality
        modal.querySelector('.close-btn').addEventListener('click', () => {
            modal.remove();
        });

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    renderNotification(notification) {
        return `
            <div class="notification-item ${notification.type}">
                <div class="notification-icon">
                    <i class="fas ${this.getIconForType(notification.type)}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-message">${notification.message}</div>
                    <div class="notification-time">${notification.timestamp}</div>
                </div>
            </div>
        `;
    }

    getIconForType(type) {
        const icons = {
            success: 'fa-check-circle',
            warning: 'fa-exclamation-triangle',
            error: 'fa-times-circle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    // Handle different types of updates
    handleVehicleStatusUpdate(vehicleId, newStatus, vehicleName) {
        const messages = {
            pending: `Vehicle "${vehicleName}" has a new rental request`,
            confirmed: `Rental for "${vehicleName}" has been confirmed`,
            cancelled: `Rental for "${vehicleName}" has been cancelled`,
            available: `"${vehicleName}" is now available for rent`
        };

        const types = {
            pending: 'warning',
            confirmed: 'success',
            cancelled: 'error',
            available: 'info'
        };

        this.addNotification(types[newStatus], messages[newStatus]);
    }

    handleNewRental(rental) {
        this.addNotification('info', 
            `New rental request from ${rental.userName} for ${rental.vehicleName}`
        );
    }

    handlePaymentReceived(rental) {
        this.addNotification('success', 
            `Payment received for ${rental.vehicleName} rental`
        );
    }
}

// Initialize the notification manager
const notificationManager = new NotificationManager();

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification-toast {
        position: fixed;
        top: 20px;
        right: -300px;
        width: 300px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: transform 0.3s ease;
        z-index: 1000;
    }

    .notification-toast.show {
        transform: translateX(-320px);
    }

    .toast-content {
        display: flex;
        align-items: center;
        padding: 15px;
        gap: 12px;
    }

    .toast-content i {
        font-size: 20px;
    }

    .toast-message {
        flex: 1;
        font-size: 14px;
    }

    .toast-progress {
        height: 3px;
        background: #e0e0e0;
        animation: progress 5s linear;
    }

    @keyframes progress {
        from { width: 100%; }
        to { width: 0%; }
    }

    .notification-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding-top: 60px;
        z-index: 1000;
    }

    .notification-panel {
        width: 400px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .notification-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        border-bottom: 1px solid #e0e0e0;
    }

    .notification-header h3 {
        margin: 0;
        font-size: 18px;
    }

    .close-btn {
        background: none;
        border: none;
        cursor: pointer;
        color: #757575;
    }

    .notification-list {
        max-height: 400px;
        overflow-y: auto;
    }

    .notification-item {
        display: flex;
        padding: 15px 20px;
        border-bottom: 1px solid #e0e0e0;
        gap: 12px;
    }

    .notification-icon i {
        font-size: 20px;
    }

    .notification-content {
        flex: 1;
    }

    .notification-message {
        margin-bottom: 5px;
    }

    .notification-time {
        font-size: 12px;
        color: #757575;
    }

    .no-notifications {
        padding: 30px;
        text-align: center;
        color: #757575;
    }

    /* Notification types */
    .notification-toast.success,
    .notification-item.success .notification-icon {
        color: #4caf50;
    }

    .notification-toast.warning,
    .notification-item.warning .notification-icon {
        color: #ff9800;
    }

    .notification-toast.error,
    .notification-item.error .notification-icon {
        color: #f44336;
    }

    .notification-toast.info,
    .notification-item.info .notification-icon {
        color: #2196f3;
    }
`;

document.head.appendChild(style);