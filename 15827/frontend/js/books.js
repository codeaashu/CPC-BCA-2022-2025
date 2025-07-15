// Cleaned-up books.js for LibraryPro

const booksList = document.getElementById('booksList');
const booksError = document.getElementById('booksError');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const token = localStorage.getItem('token');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const clearFiltersBtn = document.getElementById('clearFiltersBtn');

async function fetchBooks(query = '') {
  booksList.innerHTML = '<div style="text-align: center; padding: 20px; color: #666;">Loading books...</div>';
  if (booksError) booksError.textContent = '';
  let url = 'http://localhost:5000/api/books?';
  if (query) {
    url += `search=${encodeURIComponent(query)}&`;
  }
  if (categoryFilter && categoryFilter.value) {
    url += `category=${encodeURIComponent(categoryFilter.value)}&`;
  }
  url = url.replace(/&$/, '');
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    let books = await res.json();
    if (!Array.isArray(books)) {
      booksList.innerHTML = '';
      if (booksError) booksError.textContent = books.message || 'Failed to load books.';
      return;
    }
    // Populate category filter options
    if (categoryFilter && categoryFilter.options.length <= 1) {
      const categoryMap = {};
      books.forEach(b => {
        if (b.category) {
          const key = b.category.trim().toLowerCase();
          if (!categoryMap[key]) categoryMap[key] = b.category.trim();
        }
      });
      const uniqueCategories = Object.values(categoryMap).sort((a, b) => a.localeCompare(b));
      categoryFilter.innerHTML = '<option value="">All Categories</option>' + uniqueCategories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
    }
    // Sort books
    if (sortFilter && sortFilter.value) {
      if (sortFilter.value === 'title') books.sort((a, b) => a.title.localeCompare(b.title));
      if (sortFilter.value === 'author') books.sort((a, b) => a.author.localeCompare(b.author));
      if (sortFilter.value === 'year') books.sort((a, b) => (b.publishedYear || 0) - (a.publishedYear || 0));
      if (sortFilter.value === 'available') books.sort((a, b) => (b.availableCopies || 0) - (a.availableCopies || 0));
    }
    if (books.length === 0) {
      booksList.innerHTML = '<div style="text-align: center; padding: 20px; color: #666;">No books found.</div>';
      return;
    }
    const booksHTML = books.map(book => `
      <div class="book-card animate-in">
        <div class="book-cover">
          <img src="${book.coverUrl || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDEyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik02MCA5MEM2MCA4Mi4zODYgNjYuMzg2IDc2IDc0IDc2QzgxLjYxNCA3NiA4OCA4Mi4zODYgODggOTBDODggOTcuNjE0IDgxLjYxNCAxMDQgNzQgMTA0QzY2LjM4NiAxMDQgNjAgOTcuNjE0IDYwIDkwWiIgZmlsbD0iIzlDQTBBNiIvPgo8cGF0aCBkPSJNNDAgMTIwQzQwIDExMi4zODYgNDYuMzg2IDEwNiA1NCAxMDZINjZDNzMuNjE0IDEwNiA4MCAxMTIuMzg2IDgwIDEyMFYxMzBINDBWMTIwWiIgZmlsbD0iIzlDQTBBNiIvPgo8L3N2Zz4K'}" alt="${book.title} cover">
        </div>
        <div class="book-info">
          <div class="book-title">${book.title}</div>
          <div class="book-author">by ${book.author}</div>
          <div class="book-actions">
            <button class="view-details-btn" onclick='viewBookDetails(${JSON.stringify(book)})'>View Details</button>
            ${token && book.availableCopies > 0 ? `<button class="request-btn" onclick="requestBook('${book._id}')">Request Book</button>` : ''}
            ${token && book.availableCopies === 0 ? `<button class="reserve-btn" onclick="reserveBook('${book._id}')">Reserve</button>` : ''}
          </div>
        </div>
      </div>
    `).join('');
    booksList.innerHTML = booksHTML;
  } catch (err) {
    if (booksList) booksList.innerHTML = '';
    if (booksError) booksError.textContent = 'Network error. Please try again.';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Event listeners
  if (searchForm && !searchForm.hasAttribute('data-listener-added')) {
    searchForm.setAttribute('data-listener-added', 'true');
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      fetchBooks(searchInput.value.trim());
    });
  }
  if (sortFilter && !sortFilter.hasAttribute('data-listener-added')) {
    sortFilter.setAttribute('data-listener-added', 'true');
    sortFilter.addEventListener('change', function() {
      fetchBooks(searchInput.value.trim());
    });
  }
  if (clearFiltersBtn && !clearFiltersBtn.hasAttribute('data-listener-added')) {
    clearFiltersBtn.setAttribute('data-listener-added', 'true');
    clearFiltersBtn.addEventListener('click', function() {
      searchInput.value = '';
      if (categoryFilter) categoryFilter.value = '';
      if (sortFilter) sortFilter.value = '';
      fetchBooks();
    });
  }
  if (categoryFilter && !categoryFilter.hasAttribute('data-listener-added')) {
    categoryFilter.setAttribute('data-listener-added', 'true');
    categoryFilter.addEventListener('change', function() {
      fetchBooks(searchInput.value.trim());
    });
  }
  fetchBooks();
  // Global functions for modals
  window.viewBookDetails = function(book) {
    const modal = document.getElementById('bookDetailsModal');
    const content = document.getElementById('modalBookContent');
    const token = localStorage.getItem('token');
    let statusMsg = '';
    if (book.availableCopies === 0) {
      statusMsg = '<span style="color:#d32f2f;font-weight:600;">Not Available</span>';
    } else if (book.availableCopies > 0) {
      statusMsg = '<span style="color:#388e3c;font-weight:600;">Available</span>';
    }
    content.innerHTML = `
      <div class="modal-book-details">
        <div class="modal-book-cover">
          <img src="${book.coverUrl || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDEyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik02MCA5MEM2MCA4Mi4zODYgNjYuMzg2IDc2IDc0IDc2QzgxLjYxNCA3NiA4OCA4Mi4zODYgODggOTBDODggOTcuNjE0IDgxLjYxNCAxMDQgNzQgMTA0QzY2LjM4NiAxMDQgNjAgOTcuNjE0IDYwIDkwWiIgZmlsbD0iIzlDQTBBNiIvPgo8cGF0aCBkPSJNNDAgMTIwQzQwIDExMi4zODYgNDYuMzg2IDEwNiA1NCAxMDZINjZDNzMuNjE0IDEwNiA4MCAxMTIuMzg2IDgwIDEyMFYxMzBINDBWMTIwWiIgZmlsbD0iIzlDQTBBNiIvPgo8L3N2Zz4K'}" alt="${book.title} cover">
        </div>
        <div class="modal-book-info">
          <h2>${book.title}</h2>
          <h4>by ${book.author}</h4>
          <p><strong>Category:</strong> ${book.category || 'N/A'}</p>
          <p><strong>Year:</strong> ${book.publishedYear || 'N/A'}</p>
          <p><strong>ISBN:</strong> ${book.isbn || 'N/A'}</p>
          <p><strong>Location:</strong> ${book.location || 'N/A'}</p>
          <p><strong>Available:</strong> ${book.availableCopies || 0} / ${book.totalCopies || 0} ${statusMsg}</p>
          <p><strong>Description:</strong><br>${book.description || 'No description.'}</p>
          ${token && book.availableCopies > 0 ? `<button class='request-btn' id='modalRequestBookBtn' data-bookid='${book._id}'>Request Book</button>` : ''}
          ${token && book.availableCopies === 0 ? `<button class='reserve-btn' onclick=\"reserveBook('${book._id}')\">Reserve</button>` : ''}
        </div>
      </div>
    `;
    modal.style.display = 'block';
    // Add event listener for request book in modal
    const reqBtn = document.getElementById('modalRequestBookBtn');
    if (reqBtn) {
      reqBtn.onclick = function() {
        modal.style.display = 'none';
        showPaymentModal(this.getAttribute('data-bookid'));
      };
    }
  };
  window.requestBook = function(bookId) {
    // If details modal is open, close it
    const modal = document.getElementById('bookDetailsModal');
    if (modal && modal.style.display === 'block') {
      modal.style.display = 'none';
    }
    showPaymentModal(bookId);
  };
  // Robust close logic for both modals
  function closeAndNavigateToBooks(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
      window.location.href = 'books.html';
    }
  }
  // Payment modal close
  const closePaymentModalBtn = document.getElementById('closePaymentModal');
  if (closePaymentModalBtn) {
    closePaymentModalBtn.onclick = function() {
      closeAndNavigateToBooks('paymentModal');
    };
  }
  // Book details modal close
  const closeBookDetailsBtn = document.getElementById('closeBookDetailsBtn');
  if (closeBookDetailsBtn) {
    closeBookDetailsBtn.onclick = function() {
      closeAndNavigateToBooks('bookDetailsModal');
    };
  }
});

// Payment Modal Logic
let currentBookId = null;
function showPaymentModal(bookId) {
  currentBookId = bookId;
  const paymentModal = document.getElementById('paymentModal');
  if (paymentModal) {
    paymentModal.style.display = 'block';
  }
  const paymentForm = document.getElementById('paymentForm');
  if (paymentForm) {
    paymentForm.reset();
  }
  const errorDiv = document.getElementById('paymentError');
  if (errorDiv) {
    errorDiv.textContent = '';
  }
  const successDiv = document.getElementById('paymentSuccess');
  if (successDiv) {
    successDiv.textContent = '';
}
}

// Add event listeners only if elements exist
document.addEventListener('DOMContentLoaded', function() {
  const closePaymentModalBtn = document.getElementById('closePaymentModal');
  if (closePaymentModalBtn) {
    closePaymentModalBtn.onclick = function() {
      const paymentModal = document.getElementById('paymentModal');
      if (paymentModal) {
        paymentModal.style.display = 'none';
      }
  currentBookId = null;
  window.location.href = 'books.html';
};
  }

  const closeBookDetailsBtn = document.getElementById('closeBookDetailsBtn');
  if (closeBookDetailsBtn) {
    closeBookDetailsBtn.onclick = function() {
      const bookDetailsModal = document.getElementById('bookDetailsModal');
      if (bookDetailsModal) {
        bookDetailsModal.style.display = 'none';
      }
      window.location.href = 'books.html';
    };
  }

  // Add click event for payment modal backdrop
window.addEventListener('click', function(event) {
  const modal = document.getElementById('paymentModal');
  if (event.target === modal) {
    modal.style.display = 'none';
    currentBookId = null;
  }
});

  // Add payment form submit handler
  const paymentForm = document.getElementById('paymentForm');
  if (paymentForm) {
    paymentForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  const slipInput = document.getElementById('paymentSlip');
  const txnInput = document.getElementById('transactionId');
  const errorDiv = document.getElementById('paymentError');
  const successDiv = document.getElementById('paymentSuccess');
      const submitBtn = document.getElementById('submitPaymentBtn');
      
      if (errorDiv) errorDiv.textContent = '';
      if (successDiv) successDiv.textContent = '';
      
      // Show immediate feedback
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting Payment...';
      }
      
      if (!slipInput || !slipInput.files || slipInput.files.length === 0) {
        if (errorDiv) errorDiv.textContent = 'Please upload your payment slip.';
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Submit Payment';
        }
        showAlert('Please upload your payment slip.', 'error');
    return;
  }
      if (!txnInput || !txnInput.value.trim()) {
        if (errorDiv) errorDiv.textContent = 'Please enter your transaction ID.';
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Submit Payment';
        }
        showAlert('Please enter your transaction ID.', 'error');
    return;
  }
  if (!currentBookId) {
        if (errorDiv) errorDiv.textContent = 'No book selected.';
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Submit Payment';
        }
        showAlert('No book selected.', 'error');
    return;
  }
      
  const formData = new FormData();
  formData.append('paymentSlip', slipInput.files[0]);
  formData.append('transactionId', txnInput.value.trim());
  formData.append('bookId', currentBookId);
      
  try {
    const token = localStorage.getItem('token');
        if (!token) {
          showAlert('Please login to submit payment.', 'error');
          window.location.href = 'login.html';
          return;
        }
        
    const res = await fetch('http://localhost:5000/api/payments/borrow', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + token },
      body: formData
    });
    const data = await res.json();
        
    if (!res.ok) {
          if (errorDiv) errorDiv.textContent = data.message || 'Payment submission failed.';
          showAlert(data.message || 'Payment submission failed.', 'error');
      return;
    }
        
        // Show success message and popup
        if (successDiv) successDiv.textContent = 'Payment submitted successfully! Your request is pending admin verification.';
        showPaymentSuccessModal();
        showToast('Payment submitted! Your book request is pending admin verification.', 'success');
        
        // Close modal after 5 seconds
    setTimeout(() => {
          const paymentModal = document.getElementById('paymentModal');
          if (paymentModal) {
            paymentModal.style.display = 'none';
          }
      currentBookId = null;
          // Refresh the books list to show updated availability
          fetchBooks();
        }, 5000);
        
  } catch (err) {
        if (errorDiv) errorDiv.textContent = 'Network error. Please try again.';
        showAlert('Network error. Please try again.', 'error');
        showToast('Network error. Please try again.', 'error');
      } finally {
        // Reset button
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Submit Payment';
        }
  }
});
  }
});

// Enhanced notification system
function showAlert(message, type = 'info') {
  // Create alert element
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.innerHTML = `
    <div class="alert-content">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
      <span>${message}</span>
      <button class="alert-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
    </div>
  `;
  
  // Add to page
  document.body.appendChild(alert);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (alert.parentElement) {
      alert.remove();
    }
  }, 5000);
}

// Payment success modal
function showPaymentSuccessModal() {
  // Create success modal
  const modal = document.createElement('div');
  modal.className = 'success-modal';
  modal.innerHTML = `
    <div class="success-modal-content">
      <div class="success-icon">
        <i class="fas fa-check-circle"></i>
      </div>
      <h2>Payment Submitted Successfully!</h2>
      <p>Your payment has been submitted and is pending admin verification.</p>
      <div class="success-details">
        <p><strong>Status:</strong> Pending Verification</p>
        <p><strong>Next Step:</strong> Wait for admin approval</p>
        <p><strong>Notification:</strong> You'll be notified when approved</p>
      </div>
      <button class="btn primary-btn" onclick="this.parentElement.parentElement.remove()">Continue</button>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Auto close after 8 seconds
  setTimeout(() => {
    if (modal.parentElement) {
      modal.remove();
    }
  }, 8000);
}

// Enhanced toast notification system
function showToast(message, type = 'success') {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }
  
  // Add icon based on type
  const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
  toast.innerHTML = `
    <div class="toast-content">
      <i class="fas ${icon}"></i>
      <span>${message}</span>
    </div>
  `;
  
  toast.className = `toast-notification ${type}`;
  toast.style.display = 'block';
  
  // Add animation
  toast.style.animation = 'slideInRight 0.3s ease-out';
  
  setTimeout(() => { 
    toast.style.display = 'none'; 
  }, 5000);
}

window.reserveBook = async function(bookId) {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please login to reserve a book.');
    window.location.href = 'login.html';
    return;
  }
  try {
    const res = await fetch('http://localhost:5000/api/borrow/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ bookId })
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.message || 'Could not reserve book.');
      return;
    }
    alert(data.message || 'Reservation successful!');
  } catch (err) {
    alert('Network error. Please try again.');
  }
} 