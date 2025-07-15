const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (amount, currency = 'usd', metadata = {}) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency,
      metadata: metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return paymentIntent;
  } catch (error) {
    throw new Error(`Payment intent creation failed: ${error.message}`);
  }
};

const createCustomer = async (email, name) => {
  try {
    const customer = await stripe.customers.create({
      email: email,
      name: name,
    });
    return customer;
  } catch (error) {
    throw new Error(`Customer creation failed: ${error.message}`);
  }
};

const retrievePaymentIntent = async (paymentIntentId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
  } catch (error) {
    throw new Error(`Payment intent retrieval failed: ${error.message}`);
  }
};

const createRefund = async (paymentIntentId, amount) => {
  try {
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: Math.round(amount * 100), // Convert to cents
    });
    return refund;
  } catch (error) {
    throw new Error(`Refund creation failed: ${error.message}`);
  }
};

module.exports = {
  stripe,
  createPaymentIntent,
  createCustomer,
  retrievePaymentIntent,
  createRefund
}; 