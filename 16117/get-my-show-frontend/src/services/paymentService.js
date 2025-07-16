// src/services/paymentService.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const createOrder = async (amount) => {
  const res = await axios.post(`${BASE_URL}/payment/order`, { amount });
  return res.data;
};

export const verifyPayment = async (paymentData) => {
  const res = await axios.post(`${BASE_URL}/payment/verify`, paymentData);
  return res.data;
};
