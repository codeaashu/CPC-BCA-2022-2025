(function() {
const adminUser = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');
const usersTableBody = document.getElementById('usersTableBody');
const usersError = document.getElementById('usersError');

if (!adminUser || !token || adminUser.role !== 'admin') {
  window.location.href = '../login.html';
}

document.getElementById('logoutBtn').addEventListener('click', function(e) {
  e.preventDefault();
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '../login.html';
});

async function fetchUsers() {
  try {
    const res = await fetch('http://localhost:5000/api/users', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const users = await res.json();
    if (!Array.isArray(users)) {
      usersError.textContent = users.message || 'Failed to load users.';
      return;
    }
    usersTableBody.innerHTML = users.map(user => `
      <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>${user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</td>
        <td>
          ${user.role === 'admin' ? `<button class="action-btn demote" onclick="changeRole('${user._id}', 'user')">Demote</button>` : `<button class="action-btn" onclick="changeRole('${user._id}', 'admin')">Promote</button>`}
          <button class="action-btn delete" onclick="deleteUser('${user._id}')">Delete</button>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    usersError.textContent = 'Network error. Please try again.';
  }
}

window.changeRole = async function(userId, newRole) {
  if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;
  try {
    const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ role: newRole })
    });
    if (!res.ok) {
      const data = await res.json();
      usersError.textContent = data.message || 'Failed to update role.';
      return;
    }
    fetchUsers();
  } catch (err) {
    usersError.textContent = 'Network error. Please try again.';
  }
}

window.deleteUser = async function(userId) {
  if (!confirm('Are you sure you want to delete this user?')) return;
  try {
    const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + token }
    });
    if (!res.ok) {
      const data = await res.json();
      usersError.textContent = data.message || 'Failed to delete user.';
      return;
    }
    fetchUsers();
  } catch (err) {
    usersError.textContent = 'Network error. Please try again.';
  }
}

fetchUsers();
})(); 