const nodemailer = require('nodemailer');

// Email configuration
const emailConfig = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password'
  }
};

// Create transporter
const transporter = nodemailer.createTransport(emailConfig);

// Email templates
const emailTemplates = {
  // Account verification OTP
  accountVerification: (otp, userName) => ({
    subject: 'Email Verification - Library Management System',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
        <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2c3e50; margin: 0;">📚 Library Management System</h1>
            <p style="color: #7f8c8d; margin: 10px 0;">Email Verification</p>
          </div>
          
          <div style="background: #ecf0f1; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #2c3e50; margin: 0 0 15px 0;">Hello ${userName}!</h2>
            <p style="color: #34495e; margin: 0 0 15px 0; line-height: 1.6;">
              Thank you for registering with our Library Management System. To complete your account setup, 
              please use the verification code below:
            </p>
            
            <div style="background: #3498db; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <h1 style="margin: 0; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
              <p style="margin: 10px 0 0 0; font-size: 14px;">Verification Code</p>
            </div>
            
            <p style="color: #e74c3c; font-size: 14px; margin: 15px 0;">
              ⚠️ This code will expire in 10 minutes. Please enter it in the verification form.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ecf0f1;">
            <p style="color: #7f8c8d; font-size: 12px; margin: 0;">
              If you didn't create this account, please ignore this email.
            </p>
          </div>
        </div>
      </div>
    `
  }),

  // Password reset OTP
  passwordReset: (otp, userName) => ({
    subject: 'Password Reset - Library Management System',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
        <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2c3e50; margin: 0;">📚 Library Management System</h1>
            <p style="color: #7f8c8d; margin: 10px 0;">Password Reset Request</p>
          </div>
          
          <div style="background: #ecf0f1; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #2c3e50; margin: 0 0 15px 0;">Hello ${userName}!</h2>
            <p style="color: #34495e; margin: 0 0 15px 0; line-height: 1.6;">
              We received a request to reset your password. Use the verification code below to proceed with the password reset:
            </p>
            
            <div style="background: #e74c3c; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <h1 style="margin: 0; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
              <p style="margin: 10px 0 0 0; font-size: 14px;">Reset Code</p>
            </div>
            
            <p style="color: #e74c3c; font-size: 14px; margin: 15px 0;">
              ⚠️ This code will expire in 10 minutes. If you didn't request this reset, please ignore this email.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ecf0f1;">
            <p style="color: #7f8c8d; font-size: 12px; margin: 0;">
              For security reasons, this code can only be used once.
            </p>
          </div>
        </div>
      </div>
    `
  })
};

// Send email function
const sendEmail = async (to, template, data) => {
  try {
    const emailTemplate = emailTemplates[template](data.otp, data.userName);
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: to,
      subject: emailTemplate.subject,
      html: emailTemplate.html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendEmail,
  emailTemplates
}; 