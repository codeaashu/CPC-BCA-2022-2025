// Admin Payments Management
class AdminPaymentsManager {
  constructor() {
    this.payments = [];
    this.init();
  }

  init() {
    this.loadPayments();
  }

  async loadPayments() {
    const tableBody = document.getElementById('paymentsTableBody');
    const errorDiv = document.getElementById('paymentsError');
    
    if (!tableBody) return;
    
    tableBody.innerHTML = '<tr><td colspan="9">Loading...</td></tr>';
    errorDiv.textContent = '';
    
    try {
      const response = await fetch('http://localhost:5000/api/payments', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        this.payments = data;
        this.renderPayments();
      } else {
        throw new Error(data.message || 'Failed to load payments');
      }
    } catch (error) {
      console.error('Load payments error:', error);
      tableBody.innerHTML = '';
      errorDiv.textContent = 'Failed to load payments. Please try again.';
    }
  }

  renderPayments() {
    const tableBody = document.getElementById('paymentsTableBody');
    
    if (!tableBody) return;
    
    if (this.payments.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="9">No payments found.</td></tr>';
      return;
    }
    
    tableBody.innerHTML = this.payments.map(payment => `
      <tr>
        <td>${payment.user?.name || 'N/A'}</td>
        <td>${payment.user?.email || 'N/A'}</td>
        <td>
          <span class="payment-type ${payment.type}">
            ${this.getPaymentTypeDisplay(payment.type)}
          </span>
        </td>
        <td>₹${payment.amount?.toFixed(2) || '0.00'}</td>
        <td>
          <span class="payment-status ${payment.status}">
            ${this.getStatusDisplay(payment.status)}
          </span>
        </td>
        <td>${this.getPaymentMethodDisplay(payment.paymentMethod)}</td>
        <td>${payment.transactionId || 'N/A'}</td>
        <td>${new Date(payment.createdAt).toLocaleDateString()}</td>
        <td>
          ${payment.status === 'pending' ? 
            `<button class="action-btn" onclick="adminPayments.verifyPayment('${payment._id}')">
              <i class="fas fa-check"></i> Verify & Approve
            </button>` : 
            '<span class="text-muted">Verified</span>'
          }
        </td>
      </tr>
    `).join('');
  }

  getPaymentTypeDisplay(type) {
    const typeMap = {
      'borrow': 'Book Borrow',
      'fine': 'Fine Payment',
      'other': 'Other'
    };
    return typeMap[type] || type;
  }

  getStatusDisplay(status) {
    const statusMap = {
      'pending': 'Pending',
      'verified': 'Verified',
      'failed': 'Failed',
      'completed': 'Completed'
    };
    return statusMap[status] || status;
  }

  getPaymentMethodDisplay(method) {
    const methodMap = {
      'upi': 'UPI',
      'cash': 'Cash',
      'credit_card': 'Credit Card',
      'debit_card': 'Debit Card',
      'paypal': 'PayPal',
      'stripe': 'Stripe'
    };
    return methodMap[method] || method;
  }

  async verifyPayment(paymentId) {
    if (!confirm('Are you sure you want to verify this payment and approve the book request?')) {
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:5000/api/payments/${paymentId}/verify`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Show success notification
        this.showNotification(data.message || 'Payment verified and book request approved successfully!', 'success');
        this.loadPayments(); // Refresh the list
      } else {
        throw new Error(data.message || 'Failed to verify payment');
      }
    } catch (error) {
      console.error('Verify payment error:', error);
      this.showNotification('Failed to verify payment. Please try again.', 'error');
    }
  }

  showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
      type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

// Initialize admin payments manager
let adminPayments;
document.addEventListener('DOMContentLoaded', () => {
  adminPayments = new AdminPaymentsManager();
}); 