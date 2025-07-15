// Fines page functionality
let currentFines = [];
let selectedFineId = null;

// DOM elements
const finesList = document.getElementById('finesList');
const finesError = document.getElementById('finesError');
const filterBtns = document.querySelectorAll('.filter-btn');
const paymentModal = document.getElementById('paymentModal');
const successModal = document.getElementById('successModal');
const closePaymentModal = document.getElementById('closePaymentModal');
const closeSuccessModal = document.getElementById('closeSuccessModal');
const payFineBtn = document.getElementById('payFineBtn');

// Stats elements
const totalFinesElement = document.getElementById('totalFines');
const overdueBooksElement = document.getElementById('overdueBooks');
const paidFinesElement = document.getElementById('paidFines');
const outstandingAmountElement = document.getElementById('outstandingAmount');
const overdueCountElement = document.getElementById('overdueCount');

// Check authentication
const token = localStorage.getItem('token');
if (!token) {
  window.location.href = 'login.html';
}

// Load fines on page load
document.addEventListener('DOMContentLoaded', function() {
  loadFines();
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  // Filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      filterFines(this.dataset.filter);
    });
  });

  // Modal close buttons
  closePaymentModal.addEventListener('click', () => {
    paymentModal.style.display = 'none';
  });

  closeSuccessModal.addEventListener('click', () => {
    successModal.style.display = 'none';
    loadFines(); // Reload fines after successful payment
  });

  // Close modals when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target === paymentModal) {
      paymentModal.style.display = 'none';
    }
    if (event.target === successModal) {
      successModal.style.display = 'none';
      loadFines();
    }
  });

  // Pay fine button
  payFineBtn.addEventListener('click', payFine);
}

// Load fines from API
async function loadFines() {
  try {
    showLoading();
    
    const response = await fetch('http://localhost:5000/api/borrow/my-fines', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    if (!response.ok) {
      throw new Error('Failed to load fines');
    }

    const data = await response.json();
    currentFines = data.fines || [];
    
    updateStats(data.summary);
    renderFines(currentFines);
    
  } catch (error) {
    console.error('Error loading fines:', error);
    showError('Failed to load fines. Please try again.');
  }
}

// Update statistics
function updateStats(summary) {
  if (summary) {
    totalFinesElement.textContent = `$${summary.totalFines.toFixed(2)}`;
    overdueBooksElement.textContent = summary.overdueBooks;
    paidFinesElement.textContent = summary.totalFines - summary.unpaidFines;
    outstandingAmountElement.textContent = `$${summary.totalFines.toFixed(2)}`;
    overdueCountElement.textContent = summary.overdueBooks;
  }
}

// Render fines list
function renderFines(fines) {
  if (!fines || fines.length === 0) {
    finesList.innerHTML = `
      <div class="no-fines">
        <i class="fas fa-check-circle"></i>
        <h3>No Fines Found</h3>
        <p>You're all caught up! No outstanding fines at this time.</p>
      </div>
    `;
    return;
  }

  finesList.innerHTML = fines.map(fine => `
    <div class="fine-card ${fine.status === 'overdue' ? 'overdue' : fine.finePaid ? 'paid' : ''}" data-id="${fine._id}">
      <div class="fine-header">
        <div class="book-info">
          <h3>${fine.book.title}</h3>
          <p>by ${fine.book.author}</p>
        </div>
        <span class="fine-status ${fine.status === 'overdue' ? 'overdue' : fine.finePaid ? 'paid' : 'unpaid'}">
          ${fine.status === 'overdue' ? 'Overdue' : fine.finePaid ? 'Paid' : 'Unpaid'}
        </span>
      </div>
      
      <div class="fine-details">
        <div class="detail-item">
          <span class="detail-label">Due Date:</span>
          <span class="detail-value">${formatDate(fine.dueDate)}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Days Overdue:</span>
          <span class="detail-value">${fine.daysOverdue || 0}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Fine Amount:</span>
          <span class="detail-value">$${fine.currentFine.toFixed(2)}</span>
        </div>
        ${fine.returnDate ? `
        <div class="detail-item">
          <span class="detail-label">Returned:</span>
          <span class="detail-value">${formatDate(fine.returnDate)}</span>
        </div>
        ` : ''}
      </div>
      
      <div class="fine-actions">
        ${!fine.finePaid && fine.currentFine > 0 ? `
          <button class="btn primary-btn" onclick="openPaymentModal('${fine._id}')">
            <i class="fas fa-credit-card"></i>
            Pay Fine
          </button>
        ` : ''}
        <button class="btn secondary-btn" onclick="viewFineDetails('${fine._id}')">
          <i class="fas fa-info-circle"></i>
          Details
        </button>
      </div>
    </div>
  `).join('');
}

// Filter fines
function filterFines(filter) {
  let filteredFines = [...currentFines];
  
  switch (filter) {
    case 'overdue':
      filteredFines = currentFines.filter(fine => fine.status === 'overdue');
      break;
    case 'unpaid':
      filteredFines = currentFines.filter(fine => !fine.finePaid && fine.currentFine > 0);
      break;
    case 'paid':
      filteredFines = currentFines.filter(fine => fine.finePaid);
      break;
    default:
      // Show all fines
      break;
  }
  
  renderFines(filteredFines);
}

// Open payment modal
async function openPaymentModal(fineId) {
  try {
    const response = await fetch(`http://localhost:5000/api/borrow/fine-details/${fineId}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    if (!response.ok) {
      throw new Error('Failed to load fine details');
    }

    const data = await response.json();
    const fine = data.bookIssue;
    const details = data.fineDetails;

    // Populate modal with fine details
    document.getElementById('modalBookTitle').textContent = fine.book.title;
    document.getElementById('modalBookAuthor').textContent = `by ${fine.book.author}`;
    document.getElementById('modalDaysOverdue').textContent = details.daysOverdue;
    document.getElementById('modalFineAmount').textContent = `$${details.currentFine.toFixed(2)}`;
    document.getElementById('modalDueDate').textContent = formatDate(details.dueDate);

    selectedFineId = fineId;
    paymentModal.style.display = 'block';

  } catch (error) {
    console.error('Error loading fine details:', error);
    showError('Failed to load fine details. Please try again.');
  }
}

// Pay fine
async function payFine() {
  if (!selectedFineId) return;

  try {
    payFineBtn.disabled = true;
    payFineBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

    const response = await fetch(`http://localhost:5000/api/borrow/pay-fine/${selectedFineId}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Payment failed');
    }

    const data = await response.json();
    
    // Close payment modal and show success
    paymentModal.style.display = 'none';
    successModal.style.display = 'block';
    
    // Reset button
    payFineBtn.disabled = false;
    payFineBtn.innerHTML = '<i class="fas fa-lock"></i> Pay Fine Now';

  } catch (error) {
    console.error('Error paying fine:', error);
    showError(error.message || 'Payment failed. Please try again.');
    
    // Reset button
    payFineBtn.disabled = false;
    payFineBtn.innerHTML = '<i class="fas fa-lock"></i> Pay Fine Now';
  }
}

// View fine details
async function viewFineDetails(fineId) {
  try {
    const response = await fetch(`http://localhost:5000/api/borrow/fine-details/${fineId}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    if (!response.ok) {
      throw new Error('Failed to load fine details');
    }

    const data = await response.json();
    const fine = data.bookIssue;
    const details = data.fineDetails;

    // Show detailed information (you could create a separate details modal)
    alert(`
Fine Details:
Book: ${fine.book.title}
Author: ${fine.book.author}
Due Date: ${formatDate(details.dueDate)}
Days Overdue: ${details.daysOverdue}
Fine Amount: $${details.currentFine.toFixed(2)}
Fine Rate: $${details.finePerDay}/day
Status: ${fine.finePaid ? 'Paid' : 'Unpaid'}
${fine.returnDate ? `Returned: ${formatDate(fine.returnDate)}` : ''}
    `);

  } catch (error) {
    console.error('Error loading fine details:', error);
    showError('Failed to load fine details. Please try again.');
  }
}

// Fine Payment Modal Logic
let currentFineId = null;

// Override openPaymentModal to set currentFineId
window.openPaymentModal = async function(fineId) {
  currentFineId = fineId;
  // Optionally fetch and display fine details here
  document.getElementById('paymentModal').style.display = 'block';
  document.getElementById('finePaymentForm').reset();
  document.getElementById('finePaymentError').textContent = '';
  document.getElementById('finePaymentSuccess').textContent = '';
};

document.getElementById('closePaymentModal').onclick = function() {
  document.getElementById('paymentModal').style.display = 'none';
  currentFineId = null;
};

window.onclick = function(event) {
  const modal = document.getElementById('paymentModal');
  if (event.target === modal) {
    modal.style.display = 'none';
    currentFineId = null;
  }
};

document.getElementById('finePaymentForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const slipInput = document.getElementById('finePaymentSlip');
  const txnInput = document.getElementById('fineTransactionId');
  const errorDiv = document.getElementById('finePaymentError');
  const successDiv = document.getElementById('finePaymentSuccess');
  errorDiv.textContent = '';
  successDiv.textContent = '';

  if (!slipInput.files || slipInput.files.length === 0) {
    errorDiv.textContent = 'Please upload your payment slip.';
    return;
  }
  if (!txnInput.value.trim()) {
    errorDiv.textContent = 'Please enter your transaction ID.';
    return;
  }
  if (!currentFineId) {
    errorDiv.textContent = 'No fine selected.';
    return;
  }

  const formData = new FormData();
  formData.append('finePaymentSlip', slipInput.files[0]);
  formData.append('fineTransactionId', txnInput.value.trim());
  formData.append('fineId', currentFineId);

  try {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/payments/fine', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + token },
      body: formData
    });
    const data = await res.json();
    if (!res.ok) {
      errorDiv.textContent = data.message || 'Fine payment submission failed.';
      return;
    }
    successDiv.textContent = 'Fine payment submitted! Your request is pending admin verification.';
    setTimeout(() => {
      document.getElementById('paymentModal').style.display = 'none';
      currentFineId = null;
      loadFines();
    }, 2000);
  } catch (err) {
    errorDiv.textContent = 'Network error. Please try again.';
  }
});

// Utility functions
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function showLoading() {
  finesList.innerHTML = `
    <div class="loading">
      <i class="fas fa-spinner fa-spin"></i>
      <p>Loading fines...</p>
    </div>
  `;
}

function showError(message) {
  finesError.textContent = message;
  finesError.classList.add('show');
  setTimeout(() => {
    finesError.classList.remove('show');
  }, 5000);
}

// Add some CSS for loading and no-fines states
const style = document.createElement('style');
style.textContent = `
  .loading, .no-fines {
    text-align: center;
    padding: 3rem;
    color: #6b7280;
  }
  
  .loading i {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #2563eb;
  }
  
  .no-fines i {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #10b981;
  }
  
  .no-fines h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 0.5rem;
  }
  
  .no-fines p {
    color: #6b7280;
    font-size: 1rem;
  }
`;
document.head.appendChild(style); 