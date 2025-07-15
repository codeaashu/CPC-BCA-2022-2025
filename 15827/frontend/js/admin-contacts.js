class AdminContactsManager {
  constructor() {
    this.contacts = [];
    this.currentPage = 1;
    this.totalPages = 1;
    this.filters = {
      status: 'all',
      priority: 'all',
      subject: 'all'
    };
    
    this.init();
  }

  async init() {
    await this.loadContacts();
    this.setupEventListeners();
    this.updateStats();
  }

  setupEventListeners() {
    // Filter controls
    document.getElementById('statusFilter')?.addEventListener('change', (e) => {
      this.filters.status = e.target.value;
      this.currentPage = 1;
      this.loadContacts();
    });

    document.getElementById('priorityFilter')?.addEventListener('change', (e) => {
      this.filters.priority = e.target.value;
      this.currentPage = 1;
      this.loadContacts();
    });

    document.getElementById('subjectFilter')?.addEventListener('change', (e) => {
      this.filters.subject = e.target.value;
      this.currentPage = 1;
      this.loadContacts();
    });

    // Clear filters
    document.getElementById('clearFilters')?.addEventListener('click', () => {
      this.filters = { status: 'all', priority: 'all', subject: 'all' };
      this.currentPage = 1;
      this.loadContacts();
      this.resetFilters();
    });

    // Pagination
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('pagination-btn')) {
        e.preventDefault();
        const page = parseInt(e.target.dataset.page);
        if (page && page !== this.currentPage) {
          this.currentPage = page;
          this.loadContacts();
        }
      }
    });
  }

  resetFilters() {
    const filters = ['statusFilter', 'priorityFilter', 'subjectFilter'];
    filters.forEach(id => {
      const element = document.getElementById(id);
      if (element) element.value = 'all';
    });
  }

  async loadContacts() {
    try {
      console.log('Loading contacts...');
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, redirecting to login');
        window.location.href = '../login.html';
        return;
      }

      const params = new URLSearchParams({
        page: this.currentPage,
        limit: 10,
        ...this.filters
      });

      const response = await fetch(`http://localhost:5000/api/contact?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '../login.html';
          return;
        }
        throw new Error('Failed to load contacts');
      }

      const data = await response.json();
      
      if (data.success) {
        this.contacts = data.contacts;
        this.totalPages = data.pagination.total;
        this.renderContacts();
        this.renderPagination();
      } else {
        this.showError(data.message || 'Failed to load contacts');
      }
    } catch (error) {
      console.error('Load contacts error:', error);
      this.showError('Error loading contacts. Please try again.');
    }
  }

  renderContacts() {
    console.log('Rendering contacts...', this.contacts);
    const tbody = document.querySelector('#contactsTableBody');
    if (!tbody) {
      console.log('No tbody found');
      return;
    }

    if (this.contacts.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center py-8">
            <div class="empty-state">
              <i class="fas fa-inbox fa-3x text-gray-400 mb-4"></i>
              <h3 class="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
              <p class="text-gray-500">No contact submissions match your current filters.</p>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = this.contacts.map(contact => `
      <tr class="hover:bg-gray-50">
        <td class="py-4 px-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 h-10 w-10">
              <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span class="text-sm font-medium text-blue-600">
                  ${contact.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <div class="ml-4">
              <div class="text-sm font-medium text-gray-900">${contact.name}</div>
              <div class="text-sm text-gray-500">${contact.email}</div>
            </div>
          </div>
        </td>
        <td class="py-4 px-6">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            ${this.getSubjectDisplay(contact.subject)}
          </span>
        </td>
        <td class="py-4 px-6">
          <div class="text-sm text-gray-900">${contact.message.substring(0, 50)}${contact.message.length > 50 ? '...' : ''}</div>
        </td>
        <td class="py-4 px-6">
          <span class="status-badge status-${contact.status}">
            ${this.getStatusDisplay(contact.status)}
          </span>
        </td>
        <td class="py-4 px-6">
          <span class="priority-badge priority-${contact.priority}">
            ${this.getPriorityDisplay(contact.priority)}
          </span>
        </td>
        <td class="py-4 px-6 text-sm text-gray-500">
          ${this.formatDate(contact.createdAt)}
        </td>
        <td class="py-4 px-6 text-right text-sm font-medium">
          <button onclick="adminContacts.viewContact('${contact._id}')" 
                  class="text-blue-600 hover:text-blue-900 mr-3">
            <i class="fas fa-eye"></i> View
          </button>
          <button onclick="adminContacts.updateContact('${contact._id}')" 
                  class="text-green-600 hover:text-green-900">
            <i class="fas fa-edit"></i> Edit
          </button>
        </td>
      </tr>
    `).join('');
  }

  renderPagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;

    if (this.totalPages <= 1) {
      pagination.innerHTML = '';
      return;
    }

    let paginationHTML = '<div class="flex items-center justify-between">';
    
    // Previous button
    paginationHTML += `
      <button class="pagination-btn ${this.currentPage === 1 ? 'disabled' : ''}" 
              data-page="${this.currentPage - 1}" 
              ${this.currentPage === 1 ? 'disabled' : ''}>
        <i class="fas fa-chevron-left"></i> Previous
      </button>
    `;

    // Page numbers
    paginationHTML += '<div class="flex space-x-1">';
    for (let i = 1; i <= this.totalPages; i++) {
      if (i === 1 || i === this.totalPages || (i >= this.currentPage - 2 && i <= this.currentPage + 2)) {
        paginationHTML += `
          <button class="pagination-btn ${i === this.currentPage ? 'active' : ''}" data-page="${i}">
            ${i}
          </button>
        `;
      } else if (i === this.currentPage - 3 || i === this.currentPage + 3) {
        paginationHTML += '<span class="px-3 py-2">...</span>';
      }
    }
    paginationHTML += '</div>';

    // Next button
    paginationHTML += `
      <button class="pagination-btn ${this.currentPage === this.totalPages ? 'disabled' : ''}" 
              data-page="${this.currentPage + 1}" 
              ${this.currentPage === this.totalPages ? 'disabled' : ''}>
        Next <i class="fas fa-chevron-right"></i>
      </button>
    `;

    paginationHTML += '</div>';
    pagination.innerHTML = paginationHTML;
  }

  async viewContact(contactId) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/contact/${contactId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to load contact details');

      const data = await response.json();
      if (data.success) {
        this.showContactModal(data.contact);
      }
    } catch (error) {
      console.error('View contact error:', error);
      this.showError('Error loading contact details');
    }
  }

  showContactModal(contact) {
    const modal = document.getElementById('contactModal');
    const modalContent = document.getElementById('contactModalContent');
    
    if (!modal || !modalContent) return;

    modalContent.innerHTML = `
      <div class="modal-header">
        <h3 class="text-lg font-medium text-gray-900">Contact Details</h3>
        <button onclick="adminContacts.closeModal()" class="text-gray-400 hover:text-gray-600">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <p class="mt-1 text-sm text-gray-900">${contact.name}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <p class="mt-1 text-sm text-gray-900">${contact.email}</p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Subject</label>
            <p class="mt-1 text-sm text-gray-900">${this.getSubjectDisplay(contact.subject)}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Priority</label>
            <span class="priority-badge priority-${contact.priority}">
              ${this.getPriorityDisplay(contact.priority)}
            </span>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Message</label>
          <p class="mt-1 text-sm text-gray-900 whitespace-pre-wrap">${contact.message}</p>
        </div>
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Status</label>
            <select id="contactStatus" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
              <option value="new" ${contact.status === 'new' ? 'selected' : ''}>New</option>
              <option value="in_progress" ${contact.status === 'in_progress' ? 'selected' : ''}>In Progress</option>
              <option value="resolved" ${contact.status === 'resolved' ? 'selected' : ''}>Resolved</option>
              <option value="closed" ${contact.status === 'closed' ? 'selected' : ''}>Closed</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Priority</label>
            <select id="contactPriority" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
              <option value="low" ${contact.priority === 'low' ? 'selected' : ''}>Low</option>
              <option value="medium" ${contact.priority === 'medium' ? 'selected' : ''}>Medium</option>
              <option value="high" ${contact.priority === 'high' ? 'selected' : ''}>High</option>
              <option value="urgent" ${contact.priority === 'urgent' ? 'selected' : ''}>Urgent</option>
            </select>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Admin Notes</label>
          <textarea id="contactNotes" rows="3" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">${contact.adminNotes || ''}</textarea>
        </div>
        <div class="grid grid-cols-2 gap-4 text-sm text-gray-500">
          <div>
            <span>Created:</span> ${this.formatDate(contact.createdAt)}
          </div>
          <div>
            <span>Updated:</span> ${this.formatDate(contact.updatedAt)}
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button onclick="adminContacts.closeModal()" class="btn btn-secondary">Cancel</button>
        <button onclick="adminContacts.saveContact('${contact._id}')" class="btn btn-primary">Save Changes</button>
      </div>
    `;

    modal.style.display = 'block';
  }

  async saveContact(contactId) {
    try {
      const status = document.getElementById('contactStatus').value;
      const priority = document.getElementById('contactPriority').value;
      const adminNotes = document.getElementById('contactNotes').value;

      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/contact/${contactId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status, priority, adminNotes })
      });

      if (!response.ok) throw new Error('Failed to update contact');

      const data = await response.json();
      if (data.success) {
        this.showSuccess('Contact updated successfully');
        this.closeModal();
        this.loadContacts();
        this.updateStats();
      } else {
        this.showError(data.message || 'Failed to update contact');
      }
    } catch (error) {
      console.error('Save contact error:', error);
      this.showError('Error updating contact');
    }
  }

  closeModal() {
    const modal = document.getElementById('contactModal');
    if (modal) modal.style.display = 'none';
  }

  async updateStats() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/contact/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to load stats');

      const data = await response.json();
      if (data.success) {
        this.renderStats(data.stats);
      }
    } catch (error) {
      console.error('Update stats error:', error);
    }
  }

  renderStats(stats) {
    const statsContainer = document.getElementById('contactsStats');
    if (!statsContainer) return;

    statsContainer.innerHTML = `
      <div class="stat-card">
        <div class="stat-number stat-new">${stats.total}</div>
        <div class="stat-label">Total Contacts</div>
      </div>
      <div class="stat-card">
        <div class="stat-number stat-new">${stats.new}</div>
        <div class="stat-label">New</div>
      </div>
      <div class="stat-card">
        <div class="stat-number stat-progress">${stats.inProgress}</div>
        <div class="stat-label">In Progress</div>
      </div>
      <div class="stat-card">
        <div class="stat-number stat-resolved">${stats.resolved}</div>
        <div class="stat-label">Resolved</div>
      </div>
      <div class="stat-card">
        <div class="stat-number stat-urgent">${stats.urgent}</div>
        <div class="stat-label">Urgent</div>
      </div>
    `;
  }

  getSubjectDisplay(subject) {
    const subjectMap = {
      'general': 'General Inquiry',
      'technical': 'Technical Support',
      'billing': 'Billing Question',
      'feedback': 'Feedback',
      'other': 'Other'
    };
    return subjectMap[subject] || subject;
  }

  getStatusDisplay(status) {
    const statusMap = {
      'new': 'New',
      'in_progress': 'In Progress',
      'resolved': 'Resolved',
      'closed': 'Closed'
    };
    return statusMap[status] || status;
  }

  getPriorityDisplay(priority) {
    const priorityMap = {
      'low': 'Low',
      'medium': 'Medium',
      'high': 'High',
      'urgent': 'Urgent'
    };
    return priorityMap[priority] || priority;
  }

  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  showSuccess(message) {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  showError(message) {
    // Create error notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

// Initialize admin contacts manager
let adminContacts;
document.addEventListener('DOMContentLoaded', () => {
  console.log('Admin contacts script loaded');
  adminContacts = new AdminContactsManager();
}); 