import axios from 'axios';

export const getAllMovies = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/movies`);
  return res.data;
};
