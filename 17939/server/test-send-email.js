import dotenv from 'dotenv';
dotenv.config();

import sendEmail from './utils/sendEmail.js';

const runTest = async () => {
  try {
    await sendEmail(
      'mishrahm9136@gmail.com', // 🔁 Replace with your actual email
      'Test Email from CareerConnect SMTP',
      '<h3>This is a test email sent using Brevo SMTP from CareerConnect backend.</h3>'
    );
    console.log('✅ Test email sent successfully!');
  } catch (err) {
    console.error('❌ Test email failed:', err.message);
  }
};

runTest();
