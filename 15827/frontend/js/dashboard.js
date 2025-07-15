const user = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');
const userProfileDiv = document.getElementById('userProfile');
const issuedBooksDiv = document.getElementById('issuedBooks');
const pendingRequestsDiv = document.getElementById('pendingRequests');
const dashboardError = document.getElementById('dashboardError');

if (!user || !token) {
  window.location.href = 'login.html';
}

document.getElementById('logoutBtn').addEventListener('click', function(e) {
  e.preventDefault();
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'login.html';
});

async function fetchProfile() {
  try {
    const res = await fetch(`http://localhost:5000/api/users/profile/${user.id}`, {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await res.json();
    if (!res.ok) {
      dashboardError.textContent = data.message || 'Failed to load profile.';
      return;
    }
    userProfileDiv.innerHTML = `
      <div><strong>Name:</strong> ${data.user.name}</div>
      <div><strong>Email:</strong> ${data.user.email}</div>
      <div><strong>Role:</strong> ${data.user.role}</div>
      <div><strong>Joined:</strong> ${new Date(data.user.createdAt).toLocaleDateString()}</div>
    `;
    if (data.issuedBooks && data.issuedBooks.length > 0) {
      issuedBooksDiv.innerHTML = data.issuedBooks.map(issue => `
        <div class="issued-card">
          <div class="book-title">${issue.book.title}</div>
          <div class="book-meta">Author: ${issue.book.author}</div>
          <div class="book-meta">Issued: ${new Date(issue.issuedDate).toLocaleDateString()}</div>
          <div class="book-meta">Due: ${new Date(issue.dueDate).toLocaleDateString()}</div>
          <div class="book-meta">Status: ${issue.status}</div>
          <div class="book-meta">Fine: $${issue.fine || 0}</div>
        </div>
      `).join('');
    } else {
      issuedBooksDiv.innerHTML = '<div>No issued books found.</div>';
    }
    if (data.pendingRequests && data.pendingRequests.length > 0) {
      pendingRequestsDiv.innerHTML = '<h3>Pending Book Requests</h3>' + data.pendingRequests.map(issue => `
        <div class="pending-card">
          <div class="book-title">${issue.book.title}</div>
          <div class="book-meta">Author: ${issue.book.author}</div>
          <div class="book-meta">Requested: ${new Date(issue.issuedDate).toLocaleDateString()}</div>
          <div class="book-meta">Status: ${issue.status}</div>
        </div>
      `).join('');
    } else {
      pendingRequestsDiv.innerHTML = '';
    }
  } catch (err) {
    dashboardError.textContent = 'Network error. Please try again.';
  }
}

fetchProfile();

// Check for pending payments and book requests
async function checkPendingRequests() {
  try {
    const token = localStorage.getItem('token');
    if (!token) return;

    // Check pending payments
    const paymentsResponse = await fetch('http://localhost:5000/api/payments/history', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    
    if (paymentsResponse.ok) {
      const payments = await paymentsResponse.json();
      const pendingPayments = payments.filter(p => p.status === 'pending');
      
      if (pendingPayments.length > 0) {
        showDashboardNotification(
          `You have ${pendingPayments.length} payment(s) pending verification. Please wait for admin approval.`,
          'info'
        );
      }
    }

    // Check pending book requests
    const requestsResponse = await fetch('http://localhost:5000/api/borrow?status=pending', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    
    if (requestsResponse.ok) {
      const requests = await requestsResponse.json();
      const pendingRequests = requests.filter(r => r.user === getCurrentUserId());
      
      if (pendingRequests.length > 0) {
        showDashboardNotification(
          `You have ${pendingRequests.length} book request(s) pending approval.`,
          'info'
        );
      }
    }

  } catch (error) {
    console.error('Error checking pending requests:', error);
  }
}

function showDashboardNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `dashboard-notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
      <span>${message}</span>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
    </div>
  `;
  
  // Add to dashboard
  const dashboard = document.querySelector('main');
  if (dashboard) {
    dashboard.insertBefore(notification, dashboard.firstChild);
  }
}

function getCurrentUserId() {
  // This is a simple implementation - in a real app you'd get this from the token
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id;
    } catch (e) {
      return null;
    }
  }
  return null;
}

// Call this when dashboard loads
document.addEventListener('DOMContentLoaded', function() {
  checkPendingRequests();
}); 