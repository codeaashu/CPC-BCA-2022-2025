document.addEventListener('DOMContentLoaded', function() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }
  loadPayments();
});

async function loadPayments() {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/payments/history', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    if (!res.ok) throw new Error('Failed to load payments');
    const payments = await res.json();
    renderPayments(payments);
  } catch (err) {
    document.getElementById('paymentsTableBody').innerHTML = '<div class="error">Failed to load payments.</div>';
  }
}

function renderPayments(payments) {
  const tableBody = document.getElementById('paymentsTableBody');
  const noPayments = document.getElementById('noPayments');
  if (!payments || payments.length === 0) {
    tableBody.innerHTML = '';
    noPayments.style.display = 'block';
    return;
  }
  noPayments.style.display = 'none';
  tableBody.innerHTML = payments.map(payment => `
    <div class="payments-table-row">
      <div>
        <strong>${payment.bookIssue?.book?.title || 'N/A'}</strong>
        <br><span class="book-author">${payment.bookIssue?.book?.author || ''}</span>
      </div>
      <div>
        <span class="amount">₹${Number(payment.amount).toFixed(2)}</span>
      </div>
      <div>
        ${getMethodIcon(payment.paymentMethod)}
        <span class="method-label">${capitalize(payment.paymentMethod)}</span>
      </div>
      <div>
        <span class="status-badge status-${payment.status}">${capitalize(payment.status)}</span>
      </div>
      <div>
        <span class="date">${formatDate(payment.paymentDate)}</span>
      </div>
    </div>
  `).join('');
}

function getMethodIcon(method) {
  switch (method) {
    case 'upi': return '<i class="fas fa-qrcode method-upi"></i>';
    case 'cash': return '<i class="fas fa-money-bill-wave method-cash"></i>';
    case 'card':
    case 'credit_card':
    case 'debit_card': return '<i class="fas fa-credit-card method-card"></i>';
    default: return '<i class="fas fa-question method-unknown"></i>';
  }
}
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
} 