(function() {
const adminUser = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');
const issuesTableBody = document.getElementById('issuesTableBody');
const issuesError = document.getElementById('issuesError');
const statusFilter = document.getElementById('statusFilter');
let allIssues = [];

if (!adminUser || !token || adminUser.role !== 'admin') {
  window.location.href = '../login.html';
}

document.getElementById('logoutBtn').addEventListener('click', function(e) {
  e.preventDefault();
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '../login.html';
});

async function fetchIssues() {
  try {
    const res = await fetch('http://localhost:5000/api/borrow', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const issues = await res.json();
    if (!Array.isArray(issues)) {
      issuesError.textContent = issues.message || 'Failed to load issues.';
      return;
    }
    allIssues = issues;
    renderIssues();
  } catch (err) {
    issuesError.textContent = 'Network error. Please try again.';
  }
}

function renderIssues() {
  const filter = statusFilter ? statusFilter.value : 'issued';
  const filtered = filter === 'all' ? allIssues : allIssues.filter(issue => issue.status === filter);
  issuesTableBody.innerHTML = filtered.map(issue => `
    <tr class="${issue.status === 'pending' ? 'pending-row' : ''}">
      <td>${issue.user ? issue.user.name : '-'}</td>
      <td>${issue.user ? issue.user.email : '-'}</td>
      <td>${issue.book ? issue.book.title : '-'}</td>
      <td><span class="status-badge status-${issue.status}">${issue.status}</span></td>
      <td>${issue.issuedDate ? new Date(issue.issuedDate).toLocaleDateString() : '-'}</td>
      <td>${issue.dueDate ? new Date(issue.dueDate).toLocaleDateString() : '-'}</td>
      <td>${issue.returnDate ? new Date(issue.returnDate).toLocaleDateString() : '-'}</td>
      <td>$${issue.fine || 0}</td>
      <td>
        ${(issue.status === 'issued' || issue.status === 'overdue') ? `<button class=\"action-btn return\" onclick=\"returnIssue('${issue._id}', this)\">Mark Returned</button>` : ''}
      </td>
    </tr>
  `).join('');
}

if (statusFilter) {
  statusFilter.addEventListener('change', renderIssues);
}

window.approveIssue = async function(issueId) {
  if (!confirm('Approve this book issue?')) return;
  try {
    const res = await fetch(`http://localhost:5000/api/borrow/approve/${issueId}`, {
      method: 'PUT',
      headers: { 'Authorization': 'Bearer ' + token }
    });
    if (!res.ok) {
      const data = await res.json();
      issuesError.textContent = data.message || 'Failed to approve.';
      return;
    }
    fetchIssues();
  } catch (err) {
    issuesError.textContent = 'Network error. Please try again.';
  }
}

window.returnIssue = async function(issueId, btn) {
  if (!confirm('Mark this book as returned?')) return;
  if (btn) { btn.disabled = true; btn.textContent = 'Returning...'; }
  try {
    const res = await fetch(`http://localhost:5000/api/borrow/return/${issueId}`, {
      method: 'PUT',
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await res.json();
    if (!res.ok) {
      issuesError.textContent = data.message || 'Failed to mark returned.';
      if (btn) { btn.disabled = false; btn.textContent = 'Mark Returned'; }
      return;
    }
    fetchIssues();
  } catch (err) {
    issuesError.textContent = 'Network error. Please try again.';
    if (btn) { btn.disabled = false; btn.textContent = 'Mark Returned'; }
  }
}

fetchIssues();
})(); 