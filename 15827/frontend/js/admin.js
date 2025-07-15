const adminUser = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');
const adminName = document.getElementById('adminName');
const totalUsers = document.getElementById('totalUsers');
const totalBooks = document.getElementById('totalBooks');
const issuedBooks = document.getElementById('issuedBooks');
const overdueBooks = document.getElementById('overdueBooks');
const adminError = document.getElementById('adminError');

if (!adminUser || !token || adminUser.role !== 'admin') {
  window.location.href = '../login.html';
}

document.getElementById('logoutBtn').addEventListener('click', function(e) {
  e.preventDefault();
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '../login.html';
});

adminName.textContent = adminUser.name || 'Admin';

async function fetchStats() {
  try {
    // Fetch users
    const usersRes = await fetch('http://localhost:5000/api/users', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const users = await usersRes.json();
    totalUsers.textContent = Array.isArray(users) ? users.length : '-';

    // Fetch books
    const booksRes = await fetch('http://localhost:5000/api/books');
    const books = await booksRes.json();
    totalBooks.textContent = Array.isArray(books) ? books.length : '-';

    // Fetch issued books
    const issuedRes = await fetch('http://localhost:5000/api/borrow?status=issued', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const issued = await issuedRes.json();
    issuedBooks.textContent = Array.isArray(issued) ? issued.length : '-';

    // Fetch overdue books
    const overdueRes = await fetch('http://localhost:5000/api/borrow/overdue', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const overdue = await overdueRes.json();
    overdueBooks.textContent = Array.isArray(overdue) ? overdue.length : '-';
  } catch (err) {
    adminError.textContent = 'Failed to load stats. Please try again.';
  }
}

fetchStats();

async function fetchAllFeedback() {
  const feedbackTableBody = document.getElementById('feedbackTableBody');
  const feedbackAdminError = document.getElementById('feedbackAdminError');
  if (!feedbackTableBody) return;
  feedbackTableBody.innerHTML = '<tr><td colspan="5">Loading...</td></tr>';
  feedbackAdminError.textContent = '';
  try {
    const res = await fetch('http://localhost:5000/api/feedback/all');
    const feedbacks = await res.json();
    if (!Array.isArray(feedbacks)) {
      feedbackTableBody.innerHTML = '';
      feedbackAdminError.textContent = feedbacks.message || 'Failed to load feedback.';
      return;
    }
    if (feedbacks.length === 0) {
      feedbackTableBody.innerHTML = '<tr><td colspan="5">No feedback yet.</td></tr>';
      return;
    }
    feedbackTableBody.innerHTML = feedbacks.map(fb => `
      <tr>
        <td>${fb.name || 'Anonymous'}</td>
        <td>${fb.email || '-'}</td>
        <td>${fb.type ? fb.type.charAt(0).toUpperCase() + fb.type.slice(1) : '-'}</td>
        <td>${fb.feedback}</td>
        <td>${fb.createdAt ? new Date(fb.createdAt).toLocaleString() : '-'}</td>
      </tr>
    `).join('');
  } catch (err) {
    feedbackTableBody.innerHTML = '';
    feedbackAdminError.textContent = 'Network error. Please try again.';
  }
}

// Show feedback when admin navigates to Feedback section
const feedbackSection = document.getElementById('feedback-section');
const feedbackSidebarLink = document.querySelector('.sidebar-link[data-section="feedback"]');
if (feedbackSidebarLink) {
  feedbackSidebarLink.addEventListener('click', fetchAllFeedback);
} 