// Contact Form Validation and Submission
class ContactFormValidator {
  constructor() {
    this.form = document.getElementById('contactForm');
    this.submitBtn = document.getElementById('submitBtn');
    this.fields = {
      name: document.getElementById('contactName'),
      email: document.getElementById('contactEmail'),
      subject: document.getElementById('contactSubject'),
      message: document.getElementById('contactMessage')
    };
    this.errors = {
      name: document.getElementById('nameError'),
      email: document.getElementById('emailError'),
      subject: document.getElementById('subjectError'),
      message: document.getElementById('messageError')
    };
    this.counters = {
      name: document.getElementById('nameCounter'),
      message: document.getElementById('messageCounter')
    };
    this.validationSummary = document.getElementById('formValidationSummary');
    this.successMsg = document.getElementById('contactSuccess');
    this.errorMsg = document.getElementById('contactError');
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.setupCharacterCounters();
  }
  
  setupEventListeners() {
    // Real-time validation
    Object.keys(this.fields).forEach(fieldName => {
      const field = this.fields[fieldName];
      const error = this.errors[fieldName];
      
      field.addEventListener('input', () => {
        this.validateField(fieldName);
        this.updateFormValidity();
      });
      
      field.addEventListener('blur', () => {
        this.validateField(fieldName);
        this.updateFormValidity();
      });
      
      field.addEventListener('focus', () => {
        this.clearFieldError(fieldName);
      });
    });
    
    // Form submission
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }
  
  setupCharacterCounters() {
    // Name counter
    this.fields.name.addEventListener('input', () => {
      const length = this.fields.name.value.length;
      this.counters.name.textContent = `${length}/50`;
      this.counters.name.className = `char-counter ${length > 45 ? 'warning' : ''}`;
    });
    
    // Message counter
    this.fields.message.addEventListener('input', () => {
      const length = this.fields.message.value.length;
      this.counters.message.textContent = `${length}/1000`;
      this.counters.message.className = `char-counter ${length > 900 ? 'warning' : ''}`;
    });
  }
  
  validateField(fieldName) {
    const field = this.fields[fieldName];
    const value = field.value.trim();
    const error = this.errors[fieldName];
    
    // Clear previous error
    this.clearFieldError(fieldName);
    
    // Validation rules
    const rules = {
      name: {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-Z\s]+$/
      },
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      },
      subject: {
        required: true
      },
      message: {
        required: true,
        minLength: 10,
        maxLength: 1000
      }
    };
    
    const rule = rules[fieldName];
    
    // Required validation
    if (rule.required && !value) {
      this.showFieldError(fieldName, `${this.getFieldLabel(fieldName)} is required`);
      return false;
    }
    
    // Min length validation
    if (rule.minLength && value.length < rule.minLength) {
      this.showFieldError(fieldName, `${this.getFieldLabel(fieldName)} must be at least ${rule.minLength} characters`);
      return false;
    }
    
    // Max length validation
    if (rule.maxLength && value.length > rule.maxLength) {
      this.showFieldError(fieldName, `${this.getFieldLabel(fieldName)} cannot exceed ${rule.maxLength} characters`);
      return false;
    }
    
    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value)) {
      if (fieldName === 'name') {
        this.showFieldError(fieldName, 'Name can only contain letters and spaces');
      } else if (fieldName === 'email') {
        this.showFieldError(fieldName, 'Please enter a valid email address');
      }
      return false;
    }
    
    // Subject validation
    if (fieldName === 'subject' && value === '') {
      this.showFieldError(fieldName, 'Please select a subject');
      return false;
    }
    
    return true;
  }
  
  validateForm() {
    let isValid = true;
    Object.keys(this.fields).forEach(fieldName => {
      if (!this.validateField(fieldName)) {
        isValid = false;
      }
    });
    return isValid;
  }
  
  showFieldError(fieldName, message) {
    const field = this.fields[fieldName];
    const error = this.errors[fieldName];
    
    field.classList.add('error');
    error.textContent = message;
    error.style.display = 'block';
  }
  
  clearFieldError(fieldName) {
    const field = this.fields[fieldName];
    const error = this.errors[fieldName];
    
    field.classList.remove('error');
    error.textContent = '';
    error.style.display = 'none';
  }
  
  getFieldLabel(fieldName) {
    const labels = {
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message'
    };
    return labels[fieldName] || fieldName;
  }
  
  updateFormValidity() {
    const isValid = this.validateForm();
    this.submitBtn.disabled = !isValid;
    
    if (!isValid) {
      this.showValidationSummary();
    } else {
      this.hideValidationSummary();
    }
  }
  
  showValidationSummary() {
    const errorCount = Object.keys(this.errors).filter(fieldName => 
      this.errors[fieldName].textContent
    ).length;
    
    if (errorCount > 0) {
      this.validationSummary.textContent = `Please fix ${errorCount} error${errorCount > 1 ? 's' : ''} before submitting`;
      this.validationSummary.style.display = 'block';
    }
  }
  
  hideValidationSummary() {
    this.validationSummary.style.display = 'none';
  }
  
  async handleSubmit() {
    if (!this.validateForm()) {
      return;
    }
    
    const formData = {
      name: this.fields.name.value.trim(),
      email: this.fields.email.value.trim(),
      subject: this.fields.subject.value,
      message: this.fields.message.value.trim()
    };
    
    // Show loading state
    this.submitBtn.classList.add('loading');
    this.submitBtn.disabled = true;
    
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        this.showSuccess(data.message);
        this.form.reset();
        this.resetCounters();
        this.updateFormValidity();
      } else {
        this.showError(data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      this.showError('Network error. Please check your connection and try again.');
    } finally {
      this.submitBtn.classList.remove('loading');
      this.submitBtn.disabled = false;
    }
  }
  
  showSuccess(message) {
    this.successMsg.textContent = message;
    this.successMsg.style.display = 'block';
    this.errorMsg.style.display = 'none';
    
    setTimeout(() => {
      this.successMsg.style.display = 'none';
    }, 5000);
  }
  
  showError(message) {
    this.errorMsg.textContent = message;
    this.errorMsg.style.display = 'block';
    this.successMsg.style.display = 'none';
    
    setTimeout(() => {
      this.errorMsg.style.display = 'none';
    }, 5000);
  }
  
  resetCounters() {
    this.counters.name.textContent = '0/50';
    this.counters.message.textContent = '0/1000';
    this.counters.name.className = 'char-counter';
    this.counters.message.className = 'char-counter';
  }
}

// Initialize contact form validator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('contactForm')) {
    new ContactFormValidator();
  }
}); 