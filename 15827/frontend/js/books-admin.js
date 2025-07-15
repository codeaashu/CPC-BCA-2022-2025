(function() {
const adminUser = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');
const booksTableBody = document.getElementById('booksTableBody');
const booksAdminError = document.getElementById('booksAdminError');
const addBookForm = document.getElementById('addBookForm');

if (!adminUser || !token || adminUser.role !== 'admin') {
  window.location.href = '../login.html';
}

document.getElementById('logoutBtn').addEventListener('click', function(e) {
  e.preventDefault();
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '../login.html';
});

async function fetchBooks() {
  try {
    const res = await fetch('http://localhost:5000/api/books');
    const books = await res.json();
    if (!Array.isArray(books)) {
      booksAdminError.textContent = books.message || 'Failed to load books.';
      return;
    }
    booksTableBody.innerHTML = books.map(book => `
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>${book.category}</td>
        <td>${book.publishedYear}</td>
        <td>${book.availableCopies} / ${book.totalCopies}
          ${book.lowStock ? '<span style="color:red;font-weight:bold;"> (Low Stock!)</span>' : ''}
        </td>
        <td>${book.location}</td>
        <td>
          <button class="action-btn edit" onclick="editMinStock('${book._id}', ${book.minStock || 1})">Edit Min Stock</button>
          <button class="action-btn barcode" onclick="generateBarcode('${book.isbn}', '${book.title}')">Generate Barcode</button>
          <button class="action-btn delete" onclick="deleteBook('${book._id}')">Delete</button>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    booksAdminError.textContent = 'Network error. Please try again.';
  }
}

addBookForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  const submitBtn = addBookForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Adding...';
  const book = {
    title: addBookForm.title.value.trim(),
    author: addBookForm.author.value.trim(),
    isbn: addBookForm.isbn.value.trim(),
    category: addBookForm.category.value.trim(),
    publishedYear: Number(addBookForm.publishedYear.value.trim()),
    totalCopies: Number(addBookForm.totalCopies.value.trim()),
    location: addBookForm.location.value.trim(),
    description: addBookForm.description.value.trim(),
    minStock: addBookForm.minStock.value ? Number(addBookForm.minStock.value) : undefined
  };
  booksAdminError.textContent = '';
  try {
    const res = await fetch('http://localhost:5000/api/books', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    });
    const data = await res.json();
    if (!res.ok) {
      booksAdminError.textContent = data.message || 'Failed to add book.';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Add Book';
      return;
    }
    addBookForm.reset();
    booksAdminError.textContent = 'Book added successfully!';
    setTimeout(() => { booksAdminError.textContent = ''; }, 2000);
    fetchBooks();
  } catch (err) {
    booksAdminError.textContent = 'Network error. Please try again.';
  }
  submitBtn.disabled = false;
  submitBtn.textContent = 'Add Book';
});

window.deleteBook = async function(bookId) {
  if (!confirm('Are you sure you want to delete this book?')) return;
  try {
    const res = await fetch(`http://localhost:5000/api/books/${bookId}`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + token }
    });
    if (!res.ok) {
      const data = await res.json();
      booksAdminError.textContent = data.message || 'Failed to delete book.';
      return;
    }
    fetchBooks();
  } catch (err) {
    booksAdminError.textContent = 'Network error. Please try again.';
  }
}

window.editMinStock = async function(bookId, currentMinStock) {
  const newMinStock = prompt('Enter new minimum stock value:', currentMinStock);
  if (newMinStock === null) return;
  const minStockNum = Number(newMinStock);
  if (isNaN(minStockNum) || minStockNum < 0) {
    alert('Invalid minimum stock value.');
    return;
  }
  try {
    const res = await fetch(`http://localhost:5000/api/books/${bookId}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ minStock: minStockNum })
    });
    const data = await res.json();
    if (!res.ok) {
      booksAdminError.textContent = data.message || 'Failed to update min stock.';
      return;
    }
    fetchBooks();
  } catch (err) {
    booksAdminError.textContent = 'Network error. Please try again.';
  }
}

window.generateBarcode = function(isbn, title) {
  // Create modal for barcode display
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `;
  
  const modalContent = document.createElement('div');
  modalContent.style.cssText = `
    background: white;
    padding: 30px;
    border-radius: 10px;
    text-align: center;
    max-width: 400px;
    width: 90%;
  `;
  
  // Ensure ISBN is a string and trimmed
  const cleanIsbn = (isbn ? String(isbn).trim() : '');
  const barcodeId = `barcode-${cleanIsbn.replace(/[^a-zA-Z0-9]/g, '')}`;
  modalContent.innerHTML = `
    <h3>Barcode for: ${title}</h3>
    <p><strong>ISBN:</strong> ${cleanIsbn || '<span style=\'color:red\'>N/A</span>'}</p>
    <div style=\"margin: 20px 0;\">
      <svg id=\"${barcodeId}\"></svg>
      <div id=\"barcode-error\" style=\"color:red;margin-top:10px;display:none;\"></div>
    </div>
    <div style=\"margin-top: 20px;\">
      <button onclick=\"printBarcode('${cleanIsbn}', '${title}')\" style=\"
        background: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 10px;\">Print Barcode</button>
      <button onclick=\"this.closest('.modal').remove()\" style=\"
        background: #6c757d;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;\">Close</button>
    </div>
  `;
  
  modal.className = 'modal';
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  // Helper to generate barcode
  function doBarcode() {
    if (cleanIsbn !== "") {
      try {
        JsBarcode(`#${barcodeId}`, cleanIsbn, {
          format: "CODE128",
          width: 2,
          height: 100,
          displayValue: true,
          fontSize: 16,
          margin: 10
        });
      } catch (e) {
        document.getElementById('barcode-error').textContent = 'Invalid ISBN for barcode.';
        document.getElementById('barcode-error').style.display = 'block';
      }
    } else {
      document.getElementById('barcode-error').textContent = 'No ISBN available for this book.';
      document.getElementById('barcode-error').style.display = 'block';
    }
  }

  // Ensure JsBarcode is loaded before generating barcode
  setTimeout(function() {
    if (typeof window.JsBarcode === 'function') {
      doBarcode();
    } else {
      // Dynamically load JsBarcode if not present
      var script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js';
      script.onload = doBarcode;
      document.head.appendChild(script);
    }
  }, 0);
}

window.printBarcode = function(isbn, title) {
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Barcode - ${title}</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          text-align: center; 
          padding: 20px;
          margin: 0;
        }
        .barcode-container {
          margin: 20px 0;
        }
        .book-info {
          margin-bottom: 20px;
        }
        @media print {
          body { margin: 0; }
          .no-print { display: none; }
        }
      </style>
      <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
    </head>
    <body>
      <div class="book-info">
        <h2>${title}</h2>
        <p><strong>ISBN:</strong> ${isbn}</p>
      </div>
      <div class="barcode-container">
        <svg id="print-barcode"></svg>
      </div>
      <div class="no-print">
        <button onclick="window.print()">Print</button>
        <button onclick="window.close()">Close</button>
      </div>
      <script>
        JsBarcode("#print-barcode", "${isbn}", {
          format: "CODE128",
          width: 2,
          height: 100,
          displayValue: true,
          fontSize: 16,
          margin: 10
        });
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

fetchBooks();
})(); 