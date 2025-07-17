import dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp-relay.brevo.com',
      port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 587,
      secure: false, // false for TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    console.log("📨 Using EMAIL_USER:", process.env.EMAIL_USER);
    console.log("🔐 Using EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD?.slice(0, 4));

    await transporter.sendMail({
      from: `"CareerConnect 👩‍💻" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent
    });

    console.log(`📧 Email successfully sent to ${to}`);
  } catch (error) {
    console.error("❌ Failed to send email:", error.message);
    throw error;
  }
};

export default sendEmail;
