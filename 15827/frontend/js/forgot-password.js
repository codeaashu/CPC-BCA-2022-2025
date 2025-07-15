document.getElementById('forgotPasswordForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const messageDiv = document.getElementById('forgotPasswordMessage');
  messageDiv.textContent = '';

  // Email format validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    messageDiv.style.color = '#d32f2f';
    messageDiv.textContent = 'Please enter your email address.';
    return;
  }
  if (!emailPattern.test(email)) {
    messageDiv.style.color = '#d32f2f';
    messageDiv.textContent = 'Please enter a valid email address.';
    return;
  }

  try {
    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (res.ok) {
      messageDiv.style.color = '#388e3c';
      messageDiv.textContent = 'Reset link sent! Please check your email.';
    } else {
      messageDiv.style.color = '#d32f2f';
      messageDiv.textContent = data.message || 'Error sending reset link.';
    }
  } catch (err) {
    messageDiv.style.color = '#d32f2f';
    messageDiv.textContent = 'Network error. Please try again.';
  }
}); 