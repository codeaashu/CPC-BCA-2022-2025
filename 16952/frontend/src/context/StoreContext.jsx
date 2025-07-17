import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useInsertionEffect } from "react";


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  // add to card item
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4001"
  const [token,setToken] = useState("");
  // product images gets on database 
  const [food_list ,setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(url+"/api/cart/add",{itemId}, {headers:{token}})
    }
  };

  // remove card items
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
  };

  // Cart total arrow function (Cart.jsx)
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };


  const fetchFoodList = async () => {
    const response = await axios.get(url+"/api/food/list")
    setFoodList(response.data.data);
    console.log(response.data.data);
  }

  // page refresh then cart select not remove
  const loadCartData = async (token) => {
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
    setCartItems(response.data.cartData);
  }

  // data fetch in DB and page reload then user not logout
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
       }
     }
     loadData();
  },[])

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };


  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
