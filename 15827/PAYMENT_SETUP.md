# Payment System Setup Guide

This guide will help you set up the payment system for your Library Management System using Stripe.

## Prerequisites

- Node.js and npm installed
- MongoDB database running
- Stripe account (free tier available)

## 1. Stripe Account Setup

### Create a Stripe Account
1. Go to [stripe.com](https://stripe.com) and sign up for a free account
2. Complete the account verification process
3. Navigate to the Dashboard

### Get API Keys
1. In your Stripe Dashboard, go to **Developers > API keys**
2. Copy your **Publishable key** (starts with `pk_test_` or `pk_live_`)
3. Copy your **Secret key** (starts with `sk_test_` or `sk_live_`)
4. Keep these keys secure and never commit them to version control

## 2. Backend Setup

### Install Dependencies
```bash
cd backend
npm install stripe uuid
```

### Environment Configuration
1. Copy the example environment file:
```bash
cp env.example .env
```

2. Update your `.env` file with your Stripe keys:
```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

### Database Schema Updates
The payment system adds the following new collections:
- `payments` - Stores payment transactions
- Updated `users` collection with `stripeCustomerId` field
- Updated `bookissues` collection with payment status fields

## 3. Frontend Setup

### Update Stripe Publishable Key
In `frontend/js/payments.js`, replace the placeholder with your actual Stripe publishable key:

```javascript
// Line 19 in payments.js
stripe = Stripe('pk_test_your_actual_stripe_publishable_key_here');
```

### Install Dependencies
The frontend uses CDN for Stripe.js, so no additional installation is needed.

## 4. Testing the Payment System

### Test Cards
Stripe provides test card numbers for development:

**Successful Payment:**
- Card Number: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

**Failed Payment:**
- Card Number: `4000 0000 0000 0002`
- This will result in a declined payment

### Test Scenarios
1. **Create a fine**: Overdue a book to generate a fine
2. **Process payment**: Use the payment page to pay the fine
3. **View payment history**: Check the payment history section
4. **Admin management**: Use the admin panel to view all payments

## 5. API Endpoints

### User Endpoints
- `POST /api/payments/create-fine-payment` - Create payment intent for fine
- `POST /api/payments/process-payment` - Process completed payment
- `GET /api/payments/history` - Get user's payment history
- `GET /api/payments/details/:id` - Get payment details
- `GET /api/payments/pending` - Get pending payments

### Admin Endpoints
- `GET /api/payments/all` - Get all payments (admin only)
- `POST /api/payments/refund/:id` - Process refund (admin only)

## 6. Payment Flow

### User Payment Process
1. User has overdue books with fines
2. User visits `/payments.html`
3. User sees pending payments and payment history
4. User clicks "Pay Fine" on a specific book
5. Payment modal opens with Stripe card form
6. User enters card details and submits
7. Payment is processed through Stripe
8. Success modal shows payment confirmation
9. Payment history is updated

### Admin Management
1. Admin visits `/admin/payments.html`
2. Admin can view all payment transactions
3. Admin can filter and search payments
4. Admin can view payment details
5. Admin can process refunds for completed payments

## 7. Security Considerations

### Backend Security
- All payment endpoints require authentication
- Admin endpoints require admin role
- Stripe webhook verification (recommended for production)
- Input validation on all payment data

### Frontend Security
- Stripe.js handles sensitive card data
- No card data is stored on your servers
- HTTPS required for production

## 8. Production Deployment

### Environment Variables
Update your production environment with live Stripe keys:
```env
STRIPE_SECRET_KEY=sk_live_your_live_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_live_stripe_publishable_key
```

### SSL Certificate
Ensure your production server has a valid SSL certificate for secure payment processing.

### Webhook Setup (Recommended)
1. In Stripe Dashboard, go to **Developers > Webhooks**
2. Add endpoint: `https://yourdomain.com/api/payments/webhook`
3. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copy the webhook signing secret to your environment variables

## 9. Troubleshooting

### Common Issues

**Payment Intent Creation Fails**
- Check Stripe secret key is correct
- Verify account has sufficient funds (for live mode)
- Check network connectivity

**Card Payment Declined**
- Use test card numbers for development
- Check card details are entered correctly
- Verify Stripe account is active

**Payment History Not Loading**
- Check user authentication token
- Verify API endpoints are accessible
- Check browser console for errors

### Debug Mode
Enable debug logging in your backend:
```javascript
// In backend/config/stripe.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
});
```

## 10. Additional Features

### Email Receipts
To enable email receipts, configure SMTP settings in your `.env`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password
```

### Custom Payment Methods
The system supports multiple payment methods:
- Card payments (via Stripe)
- Cash payments (manual entry)
- Online transfers (manual entry)

### Refund Processing
Admins can process refunds through the admin panel:
1. Navigate to payment details
2. Click "Process Refund"
3. Enter refund amount and reason
4. Confirm refund

## Support

For issues related to:
- **Stripe Integration**: Check [Stripe Documentation](https://stripe.com/docs)
- **Library System**: Check the main project documentation
- **Payment Processing**: Review the payment controller code

## License

This payment system is part of the Library Management System and follows the same license terms. 