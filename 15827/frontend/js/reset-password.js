document.getElementById('resetPasswordForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const messageDiv = document.getElementById('resetPasswordMessage');
  messageDiv.textContent = '';

  if (password.length < 6) {
    messageDiv.style.color = '#d32f2f';
    messageDiv.textContent = 'Password must be at least 6 characters.';
    return;
  }
  // Optionally, add more password strength checks here (e.g., uppercase, number, special char)
  if (password !== confirmPassword) {
    messageDiv.style.color = '#d32f2f';
    messageDiv.textContent = 'Passwords do not match.';
    return;
  }
  try {
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password })
    });
    const data = await res.json();
    if (res.ok) {
      messageDiv.style.color = '#388e3c';
      messageDiv.textContent = 'Password reset successful! You can now log in.';
      setTimeout(() => window.location.href = 'login.html', 2000);
    } else {
      messageDiv.style.color = '#d32f2f';
      messageDiv.textContent = data.message || 'Error resetting password.';
    }
  } catch (err) {
    messageDiv.style.color = '#d32f2f';
    messageDiv.textContent = 'Network error. Please try again.';
  }
}); 