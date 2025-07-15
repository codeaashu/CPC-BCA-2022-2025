(function() {
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));
const userSelect = document.getElementById('userSelect');
const bookSelect = document.getElementById('bookSelect');
const requestError = document.getElementById('requestError');
const adminRequestForm = document.getElementById('adminRequestForm');
const requestedBooksContent = document.getElementById('requestedBooksContent');

if (!token || !user || user.role !== 'admin') {
  window.location.href = '../login.html';
}

async function fetchUsers() {
  try {
    const res = await fetch('http://localhost:5000/api/users', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const users = await res.json();
    if (!Array.isArray(users)) throw new Error(users.message || 'Failed to load users.');
    userSelect.innerHTML = users.map(u => `<option value="${u._id}">${u.name} (${u.email})</option>`).join('');
  } catch (err) {
    requestError.textContent = err.message;
  }
}

async function fetchBooks() {
  try {
    const res = await fetch('http://localhost:5000/api/books');
    const books = await res.json();
    if (!Array.isArray(books)) throw new Error(books.message || 'Failed to load books.');
    bookSelect.innerHTML = books.filter(b => b.availableCopies > 0).map(b => `<option value="${b._id}">${b.title} by ${b.author}</option>`).join('');
  } catch (err) {
    requestError.textContent = err.message;
  }
}

if (adminRequestForm) {
  adminRequestForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    requestError.textContent = '';
    const selectedUser = userSelect.value;
    const selectedBook = bookSelect.value;
    const dueDate = document.getElementById('dueDate').value;
    if (!selectedUser || !selectedBook) {
      requestError.textContent = 'Please select a user and a book.';
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/borrow/admin-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ userId: selectedUser, bookId: selectedBook, dueDate })
      });
      const data = await res.json();
      if (!res.ok) {
        requestError.textContent = data.message || 'Could not request book.';
        return;
      }
      alert('Book request created successfully!');
      adminRequestForm.reset();
    } catch (err) {
      requestError.textContent = 'Network error. Please try again.';
    }
  });
}

// Fetch and render all pending book requests
async function fetchRequestedBooks() {
  if (!requestedBooksContent) return;
  requestedBooksContent.innerHTML = '<div>Loading...</div>';
  try {
    const res = await fetch('http://localhost:5000/api/borrow?status=pending', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const requests = await res.json();
    if (!Array.isArray(requests)) {
      requestedBooksContent.innerHTML = '<div>Failed to load requests.</div>';
      return;
    }
    if (requests.length === 0) {
      requestedBooksContent.innerHTML = '<div>No pending book requests found.</div>';
      return;
    }
    requestedBooksContent.innerHTML = `
      <table class="books-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Book</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Requested</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${requests.map(req => `
            <tr>
              <td>${req.user ? req.user.name : '-'}</td>
              <td>${req.book ? req.book.title : '-'}</td>
              <td><span class="status-badge status-pending">${req.status}</span></td>
              <td>${req.dueDate ? new Date(req.dueDate).toLocaleDateString() : '-'}</td>
              <td>${req.issuedDate ? new Date(req.issuedDate).toLocaleDateString() : '-'}</td>
              <td>
                <button class='action-btn approve' onclick='approveRequest("${req._id}", this)'>Approve</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  } catch (err) {
    requestedBooksContent.innerHTML = '<div>Network error. Please try again.</div>';
  }
}

window.approveRequest = async function(id, btn) {
  if (!confirm('Approve this book request?')) return;
  if (btn) { btn.disabled = true; btn.textContent = 'Approving...'; }
  try {
    const res = await fetch(`http://localhost:5000/api/borrow/approve/${id}`, {
      method: 'PUT',
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.message || 'Failed to approve request.');
      if (btn) { btn.disabled = false; btn.textContent = 'Approve'; }
      return;
    }
    fetchRequestedBooks();
  } catch (err) {
    alert('Network error. Please try again.');
    if (btn) { btn.disabled = false; btn.textContent = 'Approve'; }
  }
}

window.returnRequest = async function(id) {
  if (!confirm('Mark this book as returned?')) return;
  try {
    const res = await fetch(`http://localhost:5000/api/borrow/return/${id}`, {
      method: 'PUT',
      headers: { 'Authorization': 'Bearer ' + token }
    });
    if (!res.ok) {
      const data = await res.json();
      alert(data.message || 'Failed to mark as returned.');
      return;
    }
    fetchRequestedBooks();
  } catch (err) {
    alert('Network error. Please try again.');
  }
}

// Call fetchRequestedBooks when the Requested Books section is shown
const requestedBooksSection = document.getElementById('requested-books-section');
if (requestedBooksSection) {
  // Optionally, you can use a MutationObserver or event to detect section show
  // For now, poll every 2 seconds if visible
  setInterval(() => {
    if (requestedBooksSection.style.display !== 'none') {
      fetchRequestedBooks();
    }
  }, 2000);
}

fetchUsers();
fetchBooks();
})(); 