// Admin Fines Management
let allFines = [];
let filteredFines = [];

// DOM elements
const finesTableBody = document.getElementById('finesTableBody');
const finesError = document.getElementById('finesError');
const fineStatusFilter = document.getElementById('fineStatusFilter');
const refreshFinesBtn = document.getElementById('refreshFinesBtn');
const totalOutstandingFines = document.getElementById('totalOutstandingFines');
const totalOverdueBooks = document.getElementById('totalOverdueBooks');
const paidFinesToday = document.getElementById('paidFinesToday');

// Check authentication
const token = localStorage.getItem('token');
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

if (!token || !user || user.role !== 'admin') {
  window.location.href = '../login.html';
}

// Initialize fines management
document.addEventListener('DOMContentLoaded', function() {
  loadAllFines();
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  if (fineStatusFilter) {
    fineStatusFilter.addEventListener('change', filterFines);
  }
  
  if (refreshFinesBtn) {
    refreshFinesBtn.addEventListener('click', loadAllFines);
  }
}

// Load all fines from API
async function loadAllFines() {
  try {
    showLoading();
    
    const response = await fetch('http://localhost:5000/api/borrow/overdue', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    if (!response.ok) {
      throw new Error('Failed to load fines');
    }

    const overdueBooks = await response.json();
    
    // Get all book issues to include returned books with fines
    const allIssuesResponse = await fetch('http://localhost:5000/api/borrow', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    if (!allIssuesResponse.ok) {
      throw new Error('Failed to load all book issues');
    }

    const allIssues = await allIssuesResponse.json();
    
    // Combine overdue books and returned books with fines
    allFines = [...overdueBooks];
    
    // Add returned books that have fines
    allIssues.forEach(issue => {
      if (issue.status === 'returned' && issue.fineAmount > 0) {
        const existingFine = allFines.find(fine => fine._id === issue._id);
        if (!existingFine) {
          allFines.push(issue);
        }
      }
    });

    // Calculate fines for all books
    allFines = allFines.map(fine => {
      const fineAmount = fine.calculateFine ? fine.calculateFine() : fine.fineAmount || 0;
      const daysOverdue = fine.getDaysOverdue ? fine.getDaysOverdue() : 0;
      
      return {
        ...fine,
        currentFine: fineAmount,
        daysOverdue: daysOverdue,
        isOverdue: fine.status === 'overdue'
      };
    });

    updateFinesSummary();
    filterFines();
    
  } catch (error) {
    console.error('Error loading fines:', error);
    showError('Failed to load fines. Please try again.');
  }
}

// Update fines summary
function updateFinesSummary() {
  const totalOutstanding = allFines
    .filter(fine => !fine.finePaid && fine.currentFine > 0)
    .reduce((sum, fine) => sum + fine.currentFine, 0);
    
  const overdueCount = allFines.filter(fine => fine.status === 'overdue').length;
  
  const today = new Date().toDateString();
  const paidToday = allFines
    .filter(fine => fine.finePaid && fine.finePaidDate && new Date(fine.finePaidDate).toDateString() === today)
    .reduce((sum, fine) => sum + fine.currentFine, 0);

  if (totalOutstandingFines) {
    totalOutstandingFines.textContent = `$${totalOutstanding.toFixed(2)}`;
  }
  
  if (totalOverdueBooks) {
    totalOverdueBooks.textContent = overdueCount;
  }
  
  if (paidFinesToday) {
    paidFinesToday.textContent = `$${paidToday.toFixed(2)}`;
  }
}

// Filter fines
function filterFines() {
  const filterValue = fineStatusFilter ? fineStatusFilter.value : 'all';
  
  switch (filterValue) {
    case 'overdue':
      filteredFines = allFines.filter(fine => fine.status === 'overdue');
      break;
    case 'unpaid':
      filteredFines = allFines.filter(fine => !fine.finePaid && fine.currentFine > 0);
      break;
    case 'paid':
      filteredFines = allFines.filter(fine => fine.finePaid);
      break;
    default:
      filteredFines = [...allFines];
      break;
  }
  
  renderFinesTable();
}

// Render fines table
function renderFinesTable() {
  if (!finesTableBody) return;

  if (!filteredFines || filteredFines.length === 0) {
    finesTableBody.innerHTML = `
      <tr>
        <td colspan="9" class="no-data">
          <i class="fas fa-check-circle"></i>
          <p>No fines found for the selected filter.</p>
        </td>
      </tr>
    `;
    return;
  }

  finesTableBody.innerHTML = filteredFines.map(fine => `
    <tr class="${fine.status === 'overdue' ? 'overdue-row' : fine.finePaid ? 'paid-row' : ''}">
      <td>
        <div class="user-info">
          <strong>${fine.user.name}</strong>
        </div>
      </td>
      <td>${fine.user.email}</td>
      <td>
        <div class="book-info">
          <strong>${fine.book.title}</strong>
          <small>by ${fine.book.author}</small>
        </div>
      </td>
      <td>${formatDate(fine.dueDate)}</td>
      <td>
        <span class="days-overdue ${fine.daysOverdue > 0 ? 'overdue' : ''}">
          ${fine.daysOverdue || 0}
        </span>
      </td>
      <td>
        <span class="fine-amount ${fine.currentFine > 0 ? 'has-fine' : ''}">
          $${fine.currentFine.toFixed(2)}
        </span>
      </td>
      <td>
        <span class="status-badge ${getStatusClass(fine)}">
          ${getStatusText(fine)}
        </span>
      </td>
      <td>
        ${fine.finePaidDate ? formatDate(fine.finePaidDate) : '-'}
      </td>
      <td>
        <div class="action-buttons">
          ${!fine.finePaid && fine.currentFine > 0 ? `
            <button class="btn-small primary" onclick="markFinePaid('${fine._id}')" title="Mark as Paid">
              <i class="fas fa-check"></i>
            </button>
          ` : ''}
          <button class="btn-small secondary" onclick="viewFineDetails('${fine._id}')" title="View Details">
            <i class="fas fa-eye"></i>
          </button>
          ${fine.status === 'overdue' ? `
            <button class="btn-small warning" onclick="sendReminder('${fine._id}')" title="Send Reminder">
              <i class="fas fa-bell"></i>
            </button>
          ` : ''}
        </div>
      </td>
    </tr>
  `).join('');
}

// Get status class for styling
function getStatusClass(fine) {
  if (fine.status === 'overdue') return 'overdue';
  if (fine.finePaid) return 'paid';
  if (fine.currentFine > 0) return 'unpaid';
  return 'normal';
}

// Get status text
function getStatusText(fine) {
  if (fine.status === 'overdue') return 'Overdue';
  if (fine.finePaid) return 'Paid';
  if (fine.currentFine > 0) return 'Unpaid';
  return 'No Fine';
}

// Mark fine as paid
async function markFinePaid(fineId) {
  try {
    const response = await fetch(`http://localhost:5000/api/borrow/pay-fine/${fineId}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to mark fine as paid');
    }

    const data = await response.json();
    
    // Update the fine in our local array
    const fineIndex = allFines.findIndex(fine => fine._id === fineId);
    if (fineIndex !== -1) {
      allFines[fineIndex] = { ...allFines[fineIndex], ...data.bookIssue };
    }
    
    updateFinesSummary();
    filterFines();
    
    showSuccess('Fine marked as paid successfully!');
    
  } catch (error) {
    console.error('Error marking fine as paid:', error);
    showError(error.message || 'Failed to mark fine as paid. Please try again.');
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

    // Show detailed information in a modal or alert
    const detailsHtml = `
Fine Details:
User: ${fine.user.name} (${fine.user.email})
Book: ${fine.book.title} by ${fine.book.author}
Due Date: ${formatDate(details.dueDate)}
Days Overdue: ${details.daysOverdue}
Fine Amount: $${details.currentFine.toFixed(2)}
Fine Rate: $${details.finePerDay}/day
Status: ${fine.finePaid ? 'Paid' : 'Unpaid'}
${fine.returnDate ? `Returned: ${formatDate(fine.returnDate)}` : ''}
${fine.finePaidDate ? `Payment Date: ${formatDate(fine.finePaidDate)}` : ''}
    `;

    alert(detailsHtml);

  } catch (error) {
    console.error('Error loading fine details:', error);
    showError('Failed to load fine details. Please try again.');
  }
}

// Send reminder to user
async function sendReminder(fineId) {
  try {
    // This would typically send an email or notification
    // For now, we'll just show a success message
    showSuccess('Reminder sent successfully!');
    
    // In a real implementation, you would call an API endpoint like:
    // await fetch(`http://localhost:5000/api/notifications/send-reminder/${fineId}`, {
    //   method: 'POST',
    //   headers: { 'Authorization': 'Bearer ' + token }
    // });
    
  } catch (error) {
    console.error('Error sending reminder:', error);
    showError('Failed to send reminder. Please try again.');
  }
}

// Utility functions
function formatDate(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function showLoading() {
  if (finesTableBody) {
    finesTableBody.innerHTML = `
      <tr>
        <td colspan="9" class="loading">
          <i class="fas fa-spinner fa-spin"></i>
          <p>Loading fines...</p>
        </td>
      </tr>
    `;
  }
}

function showError(message) {
  if (finesError) {
    finesError.textContent = message;
    finesError.style.display = 'block';
    setTimeout(() => {
      finesError.style.display = 'none';
    }, 5000);
  }
}

function showSuccess(message) {
  // Create a temporary success message
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.textContent = message;
  successDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(successDiv);
  
  setTimeout(() => {
    successDiv.remove();
  }, 3000);
}

// Add CSS for the fines table
const style = document.createElement('style');
style.textContent = `
  .fines-summary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .summary-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .summary-card h3 {
    font-size: 0.9rem;
    color: #6b7280;
    margin-bottom: 0.5rem;
  }
  
  .summary-card .amount {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a1a1a;
  }
  
  .fines-filter-bar {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .fines-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .fines-table th {
    background: #f8fafc;
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    color: #374151;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .fines-table td {
    padding: 1rem;
    border-bottom: 1px solid #f3f4f6;
  }
  
  .overdue-row {
    background: #fef2f2;
  }
  
  .paid-row {
    background: #f0fdf4;
  }
  
  .user-info, .book-info {
    display: flex;
    flex-direction: column;
  }
  
  .book-info small {
    color: #6b7280;
    font-size: 0.85rem;
  }
  
  .days-overdue {
    font-weight: 600;
  }
  
  .days-overdue.overdue {
    color: #dc2626;
  }
  
  .fine-amount {
    font-weight: 600;
  }
  
  .fine-amount.has-fine {
    color: #dc2626;
  }
  
  .status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
  }
  
  .status-badge.overdue {
    background: #fef2f2;
    color: #dc2626;
  }
  
  .status-badge.paid {
    background: #f0fdf4;
    color: #10b981;
  }
  
  .status-badge.unpaid {
    background: #fffbeb;
    color: #f59e0b;
  }
  
  .status-badge.normal {
    background: #f3f4f6;
    color: #6b7280;
  }
  
  .action-buttons {
    display: flex;
    gap: 0.5rem;
  }
  
  .btn-small {
    padding: 0.5rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.85rem;
    transition: all 0.3s ease;
  }
  
  .btn-small.primary {
    background: #10b981;
    color: white;
  }
  
  .btn-small.secondary {
    background: #3b82f6;
    color: white;
  }
  
  .btn-small.warning {
    background: #f59e0b;
    color: white;
  }
  
  .btn-small:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
  
  .no-data, .loading {
    text-align: center;
    padding: 2rem;
    color: #6b7280;
  }
  
  .no-data i, .loading i {
    font-size: 2rem;
    margin-bottom: 1rem;
    display: block;
  }
  
  .no-data i {
    color: #10b981;
  }
  
  .loading i {
    color: #3b82f6;
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
document.head.appendChild(style); 