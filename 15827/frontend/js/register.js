window.addEventListener('DOMContentLoaded', () => {
  const card = document.querySelector('.auth-card');
  if (card) card.classList.add('animate-in');
  // Animate logo
  const logo = document.querySelector('.logo-bounce');
  if (logo) logo.style.animationPlayState = 'running';
  // Social login buttons
  document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Social login is not implemented in this demo.');
    });
  });

  // Real-time name validation
  const nameInput = document.getElementById('name');
  const errorDiv = document.getElementById('registerError');
  nameInput.addEventListener('input', function() {
    if (!validateName(this.value)) {
      errorDiv.textContent = 'Name must be at least 3 alphabetic characters (A-Z, a-z) only.';
      errorDiv.style.display = 'block';
    } else {
      errorDiv.textContent = '';
      errorDiv.style.display = 'none';
    }
  });
});

function validateName(name) {
  return /^[A-Za-z]{3,}( [A-Za-z]{3,})*$/.test(name.trim());
}

document.getElementById('registerForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();
  const errorDiv = document.getElementById('registerError');
  errorDiv.textContent = '';
  errorDiv.style.display = 'none';

  // Email format validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !email || !password || !confirmPassword) {
    errorDiv.textContent = 'Please fill in all fields.';
    errorDiv.style.display = 'block';
    return;
  }
  if (!validateName(name)) {
    errorDiv.textContent = 'Name must be at least 3 alphabetic characters (A-Z, a-z) only.';
    errorDiv.style.display = 'block';
    return;
  }
  if (!emailPattern.test(email)) {
    errorDiv.textContent = 'Please enter a valid email address.';
    errorDiv.style.display = 'block';
    return;
  }
  if (password.length < 6) {
    errorDiv.textContent = 'Password must be at least 6 characters.';
    errorDiv.style.display = 'block';
    return;
  }
  if (password !== confirmPassword) {
    errorDiv.textContent = 'Passwords do not match.';
    errorDiv.style.display = 'block';
    return;
  }

  try {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (!res.ok) {
      errorDiv.textContent = data.message || 'Registration failed.';
      errorDiv.style.display = 'block';
      return;
    }
    // Save JWT and user info to localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email, role: data.role, id: data._id }));
    // Redirect to home page
    window.location.href = 'index.html';
  } catch (err) {
    errorDiv.textContent = 'Network error. Please try again.';
    errorDiv.style.display = 'block';
  }
}); 