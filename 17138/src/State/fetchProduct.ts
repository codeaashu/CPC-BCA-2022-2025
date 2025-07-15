import axios from "axios";

const api="http://localhost:5454/products"
export const fetchProduct = async () => {
  try {
    const response = await axios.get(api);
    
    console.log('Fetch product response:', response);
    
  } catch (error) {
    console.error('Fetch product failed:', error);
    throw error;
  }
}