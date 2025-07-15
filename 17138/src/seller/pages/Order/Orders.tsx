// import React from 'react'
// import OrderTable from './OrderTable'

// const Orders = () => {
//   return (
//     <div>
//       <h1 className='font-bold mb-5 text-xl'>All Orders</h1>
//       <OrderTable/>
//     </div>
//   )
// }

// export default Orders

import React, { useEffect } from "react";
import OrderTable from "./OrderTable";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchSellerOrders } from "../../../State/customer/sellerOrderSlice";

const Orders = () => {
  const dispatch = useAppDispatch();
  const { orders, loading } = useAppSelector((state) => state.sellerOrder);
  const jwt = localStorage.getItem("jwt") || "";

  useEffect(() => {
    dispatch(fetchSellerOrders(jwt));
  }, [dispatch]);

  return (
    <div>
      <h1 className="font-bold mb-5 text-xl">All Orders</h1>
      {loading ? <p>Loading...</p> : <OrderTable orders={orders} />}
    </div>
  );
};

export default Orders;
