(function() {
const adminUser = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');
const issuedBooksReport = document.getElementById('issuedBooksReport');
const overdueBooksReport = document.getElementById('overdueBooksReport');
const userHistoryReport = document.getElementById('userHistoryReport');
const reportsError = document.getElementById('reportsError');

if (!adminUser || !token || adminUser.role !== 'admin') {
  window.location.href = '../login.html';
}

document.getElementById('logoutBtn').addEventListener('click', function(e) {
  e.preventDefault();
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '../login.html';
});

async function fetchReports() {
  try {
    // Issued books
    const issuedRes = await fetch('http://localhost:5000/api/borrow?status=issued', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const issued = await issuedRes.json();
    issuedBooksReport.innerHTML = Array.isArray(issued) && issued.length > 0 ? issued.map(issue => `
      <div>${issue.book ? issue.book.title : '-'} (User: ${issue.user ? issue.user.name : '-'}) - Due: ${issue.dueDate ? new Date(issue.dueDate).toLocaleDateString() : '-'}</div>
    `).join('') : '<div>No issued books.</div>';

    // Overdue books
    const overdueRes = await fetch('http://localhost:5000/api/borrow/overdue', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const overdue = await overdueRes.json();
    overdueBooksReport.innerHTML = Array.isArray(overdue) && overdue.length > 0 ? overdue.map(issue => `
      <div>${issue.book ? issue.book.title : '-'} (User: ${issue.user ? issue.user.name : '-'}) - Due: ${issue.dueDate ? new Date(issue.dueDate).toLocaleDateString() : '-'}</div>
    `).join('') : '<div>No overdue books.</div>';

    // User-wise transaction history
    const usersRes = await fetch('http://localhost:5000/api/users', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const users = await usersRes.json();
    if (Array.isArray(users) && users.length > 0) {
      userHistoryReport.innerHTML = users.map(user => `
        <div style="margin-bottom:1rem;"><strong>${user.name}</strong><br><span id="history-${user._id}">Loading...</span></div>
      `).join('');
      for (const user of users) {
        const res = await fetch(`http://localhost:5000/api/users/profile/${user._id}`, {
          headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await res.json();
        const el = document.getElementById(`history-${user._id}`);
        if (data.issuedBooks && data.issuedBooks.length > 0) {
          el.innerHTML = data.issuedBooks.map(issue => `${issue.book ? issue.book.title : '-'} (${issue.status})`).join(', ');
        } else {
          el.innerHTML = 'No transactions.';
        }
      }
    } else {
      userHistoryReport.innerHTML = '<div>No users found.</div>';
    }
  } catch (err) {
    reportsError.textContent = 'Failed to load reports. Please try again.';
  }
}

fetchReports();
})(); 