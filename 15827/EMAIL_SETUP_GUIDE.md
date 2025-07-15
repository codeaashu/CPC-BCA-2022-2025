# 📧 Email Configuration Setup Guide

## **Step 1: Create `.env` File**

Create a `.env` file in the `backend` directory with your email credentials:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/library_management
FINE_PER_DAY=1

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Server Configuration
PORT=5000
NODE_ENV=development
```

## **Step 2: Gmail App Password Setup**

### **For Gmail Users:**

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password:**
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Select "Mail" and "Other (Custom name)"
   - Enter "Library Management System"
   - Copy the generated 16-character password

3. **Update `.env` file:**
   ```env
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASSWORD=your-16-character-app-password
   ```

### **For Other Email Providers:**

Update the email configuration in `backend/config/email.js`:

```javascript
const emailConfig = {
  service: 'outlook', // or 'yahoo', 'hotmail', etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
};
```

## **Step 3: Test Email Configuration**

1. **Start the server:**
   ```bash
   cd backend
   npm start
   ```

2. **Test registration:**
   - Go to `http://localhost:5000/register.html`
   - Fill in the form with your email
   - Check if you receive the verification email

## **Step 4: Troubleshooting**

### **Common Issues:**

1. **"Invalid login" error:**
   - Make sure you're using an App Password, not your regular Gmail password
   - Enable "Less secure app access" (not recommended for production)

2. **"Authentication failed" error:**
   - Check if 2FA is enabled on your Gmail account
   - Verify the App Password is correct

3. **"Connection timeout" error:**
   - Check your internet connection
   - Verify firewall settings

### **Alternative: Use Gmail SMTP Settings**

If App Password doesn't work, try these settings in `backend/config/email.js`:

```javascript
const emailConfig = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
};
```

## **Step 5: Production Setup**

For production, consider using:
- **SendGrid** (recommended)
- **Mailgun**
- **Amazon SES**

Update the email configuration accordingly.

## **Step 6: Verify Setup**

1. **Check server logs** for email sending status
2. **Test both registration and password reset** flows
3. **Verify email templates** are working correctly

## **Security Notes:**

- ✅ Use App Passwords instead of regular passwords
- ✅ Keep your `.env` file secure and never commit it to version control
- ✅ Use environment variables for all sensitive data
- ✅ Regularly rotate your email passwords

## **Quick Test:**

After setup, test the system:

1. **Registration Test:**
   ```
   POST http://localhost:5000/api/auth/send-otp
   {
     "email": "test@example.com",
     "name": "Test User"
   }
   ```

2. **Password Reset Test:**
   ```
   POST http://localhost:5000/api/auth/send-otp
   {
     "email": "test@example.com"
   }
   ```

Both should return success messages and send emails to the specified address. 