@echo off
echo ========================================
echo Library Management System - ENV Setup
echo ========================================
echo.

cd backend

echo Creating .env file from template...
copy env.template .env

echo.
echo ========================================
echo ✅ .env file created successfully!
echo ========================================
echo.
echo 📝 Next steps:
echo 1. Edit backend\.env file
echo 2. Replace 'your-email@gmail.com' with your Gmail
echo 3. Replace 'your-app-password' with your Gmail App Password
echo 4. Save the file
echo.
echo 🔧 To get Gmail App Password:
echo - Enable 2FA on your Gmail account
echo - Go to Google Account Settings
echo - Security → 2-Step Verification → App passwords
echo - Generate a new app password
echo.
pause 