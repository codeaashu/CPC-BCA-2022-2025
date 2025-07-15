# Library Fine Management System

## Overview

This library management system now includes a comprehensive fine management feature that automatically calculates and tracks fines for overdue books. The system is designed with a 7-day borrowing period and $1 per day fine rate.

## Features

### 🕒 7-Day Borrowing Period
- Books are issued for exactly 7 days by default
- Automatic due date calculation
- Configurable borrowing period via admin interface

### 💰 Automatic Fine Calculation
- $1 per day fine rate (configurable via `FINE_PER_DAY` environment variable)
- Real-time fine calculation for overdue books
- Automatic status updates (issued → overdue)
- Fine calculation for returned books

### 📊 Fine Management Dashboard
- **User Dashboard**: View personal fines and payment history
- **Admin Dashboard**: Manage all fines across the library
- Real-time fine statistics and summaries
- Filter and search capabilities

### 💳 Payment System
- Mark fines as paid (simulated payment system)
- Payment tracking with timestamps
- Payment history and receipts
- Integration ready for real payment gateways

## System Architecture

### Backend Components

#### 1. Enhanced BookIssue Model (`backend/models/BookIssue.js`)
```javascript
// Key features:
- calculateFine() - Real-time fine calculation
- checkOverdue() - Automatic overdue detection
- getDaysOverdue() - Days overdue calculation
- markFinePaid() - Payment processing
- Pre-save middleware for automatic updates
```

#### 2. Fine Management Controller (`backend/controllers/borrowController.js`)
```javascript
// New endpoints:
- GET /api/borrow/my-fines - User's fine summary
- GET /api/borrow/fine-details/:id - Detailed fine information
- PUT /api/borrow/pay-fine/:id - Pay fine
- Enhanced existing endpoints with fine calculation
```

#### 3. Fine Routes (`backend/routes/borrowRoutes.js`)
```javascript
// Fine-related routes:
- /my-fines - User fine management
- /fine-details/:id - Fine details
- /pay-fine/:id - Fine payment
```

### Frontend Components

#### 1. User Fines Page (`frontend/fines.html`)
- Modern, responsive design
- Real-time fine calculation display
- Payment modal with multiple payment options
- Fine filtering and search
- Success/error notifications

#### 2. Admin Fines Management (`frontend/admin/admin.html`)
- Comprehensive fine overview
- Bulk fine management
- Fine statistics and reporting
- User communication tools

#### 3. Enhanced Navigation
- "My Fines" link in user navigation
- Admin fines management section
- Integrated with existing dashboard

## Configuration

### Environment Variables
```bash
# Fine rate per day (default: $1)
FINE_PER_DAY=1

# Other required variables
MONGODB_URI=mongodb://localhost:27017/library_management
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

### Fine Rate Customization
The fine rate can be customized by changing the `FINE_PER_DAY` environment variable:
- `FINE_PER_DAY=0.50` - 50 cents per day
- `FINE_PER_DAY=2` - $2 per day
- `FINE_PER_DAY=5` - $5 per day

## Usage Guide

### For Users

1. **Borrowing Books**
   - Request a book through the books page
   - Books are automatically issued for 7 days
   - Receive confirmation with due date

2. **Checking Fines**
   - Navigate to "My Fines" in the main menu
   - View current fines and overdue books
   - See detailed breakdown of charges

3. **Paying Fines**
   - Click "Pay Fine" on any unpaid fine
   - Choose payment method (Card/Cash)
   - Complete payment process
   - Receive confirmation

### For Administrators

1. **Fine Overview**
   - Access "Fines Management" in admin dashboard
   - View total outstanding fines
   - Monitor overdue books count
   - Track daily payment collections

2. **Fine Management**
   - Filter fines by status (All/Overdue/Unpaid/Paid)
   - Mark fines as paid manually
   - Send reminders to users
   - View detailed fine information

3. **Reports and Analytics**
   - Fine collection reports
   - Overdue book statistics
   - User payment history
   - Revenue tracking

## API Endpoints

### Fine Management Endpoints

```javascript
// Get user's fines
GET /api/borrow/my-fines
Authorization: Bearer <token>

// Get fine details
GET /api/borrow/fine-details/:id
Authorization: Bearer <token>

// Pay fine
PUT /api/borrow/pay-fine/:id
Authorization: Bearer <token>

// Get overdue books (admin)
GET /api/borrow/overdue
Authorization: Bearer <token>
```

### Response Examples

#### User Fines Summary
```json
{
  "fines": [
    {
      "_id": "fine_id",
      "book": {
        "title": "Book Title",
        "author": "Author Name"
      },
      "currentFine": 5.00,
      "daysOverdue": 5,
      "isOverdue": true,
      "finePaid": false
    }
  ],
  "totalFines": 5.00,
  "unpaidFines": 1,
  "summary": {
    "totalFines": 5.00,
    "unpaidFines": 1,
    "overdueBooks": 1
  }
}
```

#### Fine Details
```json
{
  "bookIssue": {
    "_id": "issue_id",
    "book": { "title": "Book Title" },
    "user": { "name": "User Name", "email": "user@example.com" }
  },
  "fineDetails": {
    "currentFine": 5.00,
    "daysOverdue": 5,
    "isOverdue": true,
    "dueDate": "2024-01-15T00:00:00.000Z",
    "finePerDay": 1,
    "finePaid": false
  }
}
```

## Testing

### Run Fine System Test
```bash
cd backend
node scripts/testFines.js
```

This test script will:
- Create test user and book
- Issue book for 7 days
- Simulate overdue scenarios
- Test fine calculations
- Verify payment processing
- Clean up test data

### Manual Testing Steps

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```

2. **Create a test user account**
   - Register a new user
   - Login to get authentication token

3. **Borrow a book**
   - Browse books and request one
   - Wait for admin approval
   - Book will be issued for 7 days

4. **Test overdue scenario**
   - Wait for due date to pass
   - Check "My Fines" page
   - Verify fine calculation

5. **Test payment**
   - Click "Pay Fine" button
   - Complete payment process
   - Verify payment confirmation

## Database Schema

### BookIssue Model Enhancements
```javascript
{
  // Existing fields...
  fine: { type: Number, default: 0 },
  finePaid: { type: Boolean, default: false },
  finePaidDate: { type: Date },
  fineAmount: { type: Number, default: 0 },
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' }
}
```

### New Methods
- `calculateFine()` - Calculate current fine amount
- `checkOverdue()` - Check and update overdue status
- `getDaysOverdue()` - Get number of days overdue
- `markFinePaid()` - Mark fine as paid

## Security Features

- JWT authentication for all fine operations
- Role-based access control (admin/user)
- Input validation and sanitization
- Secure payment processing simulation
- Audit trail for all fine transactions

## Future Enhancements

### Planned Features
- Email notifications for overdue books
- SMS reminders for due dates
- Integration with real payment gateways (Stripe, PayPal)
- Fine waiver system for special cases
- Bulk fine operations for admins
- Fine history and analytics dashboard
- Automatic fine escalation system

### Payment Gateway Integration
The system is designed to easily integrate with payment gateways:
- Stripe integration ready
- PayPal integration structure
- Cash payment tracking
- Receipt generation

## Troubleshooting

### Common Issues

1. **Fines not calculating**
   - Check `FINE_PER_DAY` environment variable
   - Verify MongoDB connection
   - Check book issue status

2. **Payment not processing**
   - Verify user authentication
   - Check fine status (already paid)
   - Review server logs for errors

3. **Admin dashboard not loading**
   - Ensure user has admin role
   - Check authentication token
   - Verify API endpoints

### Debug Mode
Enable debug logging by setting:
```bash
NODE_ENV=development
DEBUG=fines:*
```

## Support

For technical support or questions about the fine management system:
- Check the API documentation
- Review server logs for errors
- Test with the provided test script
- Contact system administrator

---

**Note**: This fine management system is designed to be flexible and scalable. The 7-day borrowing period and $1 per day fine rate can be easily modified through configuration files or environment variables. 