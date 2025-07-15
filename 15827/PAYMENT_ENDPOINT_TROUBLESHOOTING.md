# Payment Endpoint Troubleshooting Guide

## Issue: POST http://localhost:5000/api/payments/borrow 404 (Not Found)

This error occurs when the payment endpoint is not properly configured or the server is not running. Here's how to fix it:

## 🔧 Solutions Applied

### 1. **Added Missing Payment Routes**

**File**: `backend/routes/paymentRoutes.js`

**Added Routes**:
```javascript
// Pay for borrowing a book (with slip upload)
router.post('/borrow', protect, uploadMiddleware, payForBorrow);

// Pay fine (with slip upload)
router.post('/fine', protect, uploadFineMiddleware, payForFine);

// Get user's payment history
router.get('/history', protect, getPaymentHistory);

// Get payment details
router.get('/:paymentId', protect, getPaymentDetails);
```

### 2. **Enhanced Multer Configuration**

**Improved Features**:
- ✅ Automatic uploads directory creation
- ✅ File type validation (images and PDFs only)
- ✅ File size limits (5MB)
- ✅ Better error handling
- ✅ Proper middleware setup

### 3. **Created Uploads Directory**

**Command**: `mkdir -p backend/uploads/payment_slips`

**Purpose**: Ensures the directory exists for file uploads

## 🧪 Testing Steps

### Step 1: Check Server Status
```bash
# Navigate to backend directory
cd backend

# Check if server is running
curl http://localhost:5000/

# If not running, start the server
npm start
```

### Step 2: Test Payment Endpoint
Use the test page: `test_payment_endpoint.html`

1. Open the test page in your browser
2. Click "Test Server Connection"
3. Fill in the payment form
4. Click "Test Payment Submission"

### Step 3: Verify Routes
Check if all routes are properly registered:

```bash
# Test the payment borrow endpoint
curl -X POST http://localhost:5000/api/payments/borrow \
  -H "Content-Type: multipart/form-data" \
  -F "bookId=test" \
  -F "transactionId=test" \
  -F "paymentSlip=@test-file.jpg"
```

## 🔍 Debugging Checklist

### ✅ Server Running
- [ ] Server is running on port 5000
- [ ] No errors in server console
- [ ] Database connection is established

### ✅ Routes Registered
- [ ] Payment routes are imported in `index.js`
- [ ] Routes are mounted at `/api/payments`
- [ ] All middleware is properly configured

### ✅ File Upload
- [ ] Uploads directory exists
- [ ] Multer is properly configured
- [ ] File validation is working

### ✅ Authentication
- [ ] JWT token is valid
- [ ] User is authenticated
- [ ] Authorization headers are sent

## 🚨 Common Issues & Solutions

### Issue 1: Server Not Running
**Error**: `ECONNREFUSED`
**Solution**: Start the server
```bash
cd backend
npm start
```

### Issue 2: Missing Routes
**Error**: `404 Not Found`
**Solution**: Ensure routes are properly added to `paymentRoutes.js`

### Issue 3: File Upload Errors
**Error**: `MulterError`
**Solution**: Check file size and type
- Maximum file size: 5MB
- Allowed types: images and PDFs only

### Issue 4: Authentication Errors
**Error**: `401 Unauthorized`
**Solution**: Ensure valid JWT token is sent
```javascript
headers: {
  'Authorization': 'Bearer ' + localStorage.getItem('token')
}
```

## 📋 Complete Payment Flow Test

### 1. **User Authentication**
```javascript
// Check if user is logged in
const token = localStorage.getItem('token');
if (!token) {
  // Redirect to login
  window.location.href = 'login.html';
}
```

### 2. **Payment Submission**
```javascript
const formData = new FormData();
formData.append('paymentSlip', fileInput.files[0]);
formData.append('bookId', bookId);
formData.append('transactionId', transactionId);

const response = await fetch('http://localhost:5000/api/payments/borrow', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token
  },
  body: formData
});
```

### 3. **Admin Verification**
```javascript
const response = await fetch(`http://localhost:5000/api/payments/${paymentId}/verify`, {
  method: 'PUT',
  headers: {
    'Authorization': 'Bearer ' + adminToken,
    'Content-Type': 'application/json'
  }
});
```

## 🔧 Manual Server Start

If the server is not running, start it manually:

```bash
# Navigate to backend directory
cd backend

# Install dependencies (if needed)
npm install

# Start the server
npm start

# Or use node directly
node index.js
```

## 📊 Expected Server Output

When the server starts successfully, you should see:

```
Server running on port 5000
MongoDB Connected: mongodb://localhost:27017/library_management
```

## 🎯 Quick Fix Commands

```bash
# 1. Stop any existing server
pkill -f "node.*index.js"

# 2. Navigate to backend
cd backend

# 3. Install dependencies
npm install

# 4. Start server
npm start

# 5. Test endpoint
curl http://localhost:5000/
```

## 📞 Support

If you're still experiencing issues:

1. **Check server logs** for specific error messages
2. **Verify database connection** is working
3. **Test with the provided test pages**:
   - `test_payment_endpoint.html`
   - `test_console_errors.html`
4. **Check browser console** for additional error details

## ✅ Success Indicators

When everything is working correctly, you should see:

- ✅ Server running on port 5000
- ✅ No 404 errors for payment endpoints
- ✅ File uploads working
- ✅ Payment submissions successful
- ✅ Admin verification working
- ✅ Dashboard notifications appearing

The payment system should now work without any 404 errors! 