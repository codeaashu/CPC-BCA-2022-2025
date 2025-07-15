# 📧 Email OTP Verification System Setup

This guide will help you set up the complete email OTP verification system for account creation and password reset.

## 🚀 Features Implemented

### ✅ Account Registration with Email Verification
- 6-digit OTP sent to user's email
- 10-minute expiration time
- Resend functionality with 60-second cooldown
- Secure account creation after verification

### ✅ Password Reset with Email Verification
- 6-digit OTP for password reset
- Secure password update after verification
- Email validation and user existence check

### ✅ Enhanced Security
- OTP expiration and one-time use
- Database cleanup of expired OTPs
- Email templates with professional design
- Step-by-step verification process

## 📋 Prerequisites

1. **Node.js** (v14 or higher)
2. **MongoDB** (local or cloud)
3. **Gmail Account** (for sending emails)

## 🔧 Installation Steps

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up Gmail for Email Sending

#### Option A: Gmail App Password (Recommended)
1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password:
   - Go to Security → App passwords
   - Select "Mail" and your device
   - Copy the generated 16-character password

#### Option B: Gmail Less Secure Apps (Not Recommended)
1. Enable "Less secure app access" in Google Account settings
2. Use your regular Gmail password

### 3. Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
# Copy the example file
cp env.example .env
```

Edit `.env` with your actual values:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/library_management

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-character-app-password

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 4. Start the Backend Server

```bash
cd backend
npm start
```

## 🎯 API Endpoints

### Account Verification
- `POST /api/otp/send-verification` - Send verification OTP
- `POST /api/otp/verify-account` - Verify OTP and create account
- `POST /api/otp/resend` - Resend OTP

### Password Reset
- `POST /api/otp/send-reset` - Send password reset OTP
- `POST /api/otp/verify-reset` - Verify OTP and reset password

## 🎨 Frontend Pages

### New Pages Created
1. **`register-with-otp.html`** - Registration with email verification
2. **`reset-password-with-otp.html`** - Password reset with OTP

### Updated Pages
1. **`register.html`** - Now redirects to OTP registration
2. **`forgot-password.html`** - Now offers OTP reset option

## 🔍 Testing the System

### 1. Test Account Registration
1. Open `frontend/register-with-otp.html`
2. Fill in your details
3. Click "Send Verification Code"
4. Check your email for the 6-digit code
5. Enter the code and complete registration

### 2. Test Password Reset
1. Open `frontend/reset-password-with-otp.html`
2. Enter your email
3. Click "Send Reset Code"
4. Check your email for the 6-digit code
5. Enter the code and set new password

### 3. Test Email Templates
The system includes beautiful HTML email templates:
- **Account Verification**: Blue-themed with user name
- **Password Reset**: Red-themed with security warnings

## 🛠️ Troubleshooting

### Email Not Sending
1. **Check Gmail settings**:
   - Ensure 2FA is enabled
   - Use App Password, not regular password
   - Check if "Less secure apps" is enabled (if using regular password)

2. **Check environment variables**:
   ```bash
   # Verify your .env file
   cat backend/.env
   ```

3. **Test email configuration**:
   ```bash
   # Add this to your backend/index.js for testing
   const { sendEmail } = require('./config/email');
   
   // Test email sending
   sendEmail('test@example.com', 'accountVerification', {
     otp: '123456',
     userName: 'Test User'
   }).then(result => console.log(result));
   ```

### OTP Not Working
1. **Check database connection**:
   ```bash
   # Verify MongoDB is running
   mongo
   ```

2. **Check OTP expiration**:
   - OTPs expire after 10 minutes
   - Use the resend function if needed

3. **Check console logs**:
   ```bash
   # Monitor backend logs
   cd backend && npm start
   ```

### Frontend Issues
1. **Check browser console** for JavaScript errors
2. **Verify API endpoints** are accessible
3. **Test with Postman** or similar tool

## 🔒 Security Features

### OTP Security
- ✅ 6-digit numeric codes
- ✅ 10-minute expiration
- ✅ One-time use only
- ✅ Rate limiting (60-second resend cooldown)
- ✅ Database cleanup of expired OTPs

### Email Security
- ✅ Professional HTML templates
- ✅ User name personalization
- ✅ Security warnings and instructions
- ✅ Mobile-responsive design

### Database Security
- ✅ OTP indexing for performance
- ✅ Automatic cleanup of expired OTPs
- ✅ User email verification tracking
- ✅ Secure password hashing

## 📱 User Experience

### Registration Flow
1. User enters name, email, password
2. System sends verification email
3. User enters 6-digit OTP
4. Account is created and user is logged in
5. Redirected to dashboard

### Password Reset Flow
1. User enters email address
2. System sends reset OTP
3. User enters 6-digit OTP
4. User sets new password
5. Redirected to login page

## 🎨 Customization

### Email Templates
Edit `backend/config/email.js` to customize:
- Email design and colors
- Company branding
- Message content
- Expiration warnings

### OTP Settings
Edit `backend/models/OTP.js` to modify:
- OTP length (currently 6 digits)
- Expiration time (currently 10 minutes)
- Resend cooldown (currently 60 seconds)

### Frontend Styling
Edit CSS files to customize:
- Form design and colors
- Button styles
- Responsive layout
- Animation effects

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
EMAIL_USER=your_production_email
EMAIL_PASSWORD=your_production_app_password
```

### Email Service for Production
Consider using professional email services:
- **SendGrid**
- **Mailgun**
- **Amazon SES**
- **Postmark**

Update `backend/config/email.js` for your chosen service.

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify all environment variables are set correctly
3. Test email configuration with a simple test
4. Check MongoDB connection and database setup

## 🎉 Success!

Your email OTP verification system is now ready! Users can:
- ✅ Register with secure email verification
- ✅ Reset passwords with OTP verification
- ✅ Receive beautiful, professional emails
- ✅ Enjoy a smooth, step-by-step process

The system is production-ready with proper security measures and user-friendly interfaces. 