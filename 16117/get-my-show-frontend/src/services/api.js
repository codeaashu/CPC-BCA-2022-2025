import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Update if deployed
  withCredentials: false
});

// Interceptor to attach token (optional)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
