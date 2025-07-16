import API from './api';

export const loginUser = async (data) => {
  const res = await API.post('http://localhost:5000/auth/login', data);
  return res.data;
};

export const signupUser = async (data) => {
  const res = await API.post('http://localhost:5000/auth/signup', data);
  return res.data;
};
