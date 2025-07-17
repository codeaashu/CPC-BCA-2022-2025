import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
const PlaceOrder = () => {

  // using getTotalCartAmount to context
  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);

  // store information from these Form field
  const [data,setData] = useState({
    firstName:"",
    middleName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data,[name]:value}))
  }

  // // only verify form field console
  // useEffect(() => {
  //   console.log(data);
  // },[data])

  const placeOrder = async (event) => {
     event.preventDefault(); //not reload the webpage
     let orderItems = [];
     food_list.map((item) => {
      if (cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
     })
     let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
     }
     let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
     console.log(response)
     if (response.data.success) {
      const {success_url} = response.data;
  
      window.location.replace(success_url);
     }
     else{
      alert("Error");
     }
  }

  const navigate = useNavigate();

  // user logout
  useEffect(()=>{
     if (!token) {
      navigate('/cart')
     }
     else if(getTotalCartAmount()===0)
     {
      navigate('/cart')
     }
  },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name'/>

          <input required name='middleName' onChange={onChangeHandler} value={data.middleName} type="text" placeholder='Middle name'/>

          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />

        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />

        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City'/>

          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>

        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code'/>

          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />

        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      
      <div className="place-order-right">
       {/* paste the cart.jsx file cart-total se  proceed the checkout  */}
       <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
