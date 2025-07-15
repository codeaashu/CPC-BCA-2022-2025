// import React from 'react'
// import OrderItem from './OrderItem'

// const Orders = () => {
//   return (
//     <div className='text-sm min-h-screen'>
//       <div className='pb-5'>
//         <h1 className='font-semibold'>All Orders</h1>
//         <p>from anytime</p>
//       </div>
//       <div className='space-y-2'>

//         {[1, 2, 3, 4, 5].map((item) => <OrderItem/>)}

//       </div>
//     </div>
//   )
// }

// export default Orders

import React from 'react';
import OrderItem, { Order } from './OrderItem';

const orders: Order[] = [
  {
    id: 1,
    status: 'PENDING',
    shopName: 'Techify Mart',
    product: 'EchoDot 4th Gen Smart Speaker with Alexa (Black)',
    size: 'Compact',
    imageUrl: 'https://m.media-amazon.com/images/I/61EXU8BuGZL._AC_UL480_FMwebp_QL65_.jpg',
  },
  {
    id: 2,
    status: 'SHIPPED',
    shopName: 'Urban Style Co.',
    product: 'Roadster Men Solid Round Neck Pure Cotton T-Shirt (Navy Blue)',
    size: 'M',
    imageUrl: 'https://m.media-amazon.com/images/I/71DCnkvsK0L._SY879_.jpg',
  },
  {
    id: 3,
    status: 'DELIVERED',
    shopName: 'FitGear Pro',
    product: 'Realme Watch 2 Pro with GPS, SpO2, 90 Sports Modes & Large Display',
    size: 'One Size',
    imageUrl: 'https://m.media-amazon.com/images/I/51L7ZzzVnFL._AC_UL480_FMwebp_QL65_.jpg',
  },
  {
    id: 4,
    status: 'SHIPPED',
    shopName: 'HomeNest Essentials',
    product: 'Milton Thermosteel Flip Lid Flask, 1 L, Silver',
    size: '1 Litre',
    imageUrl: 'https://m.media-amazon.com/images/I/61WxQThBKsL._AC_UL480_FMwebp_QL65_.jpg',
  },
  {
    id: 5,
    status: 'DELIVERED',
    shopName: 'Kitchen Bloom',
    product: 'Pigeon Non-Stick Aluminium Cookware Set (3 Pieces)',
    size: 'Standard Set',
    imageUrl: 'https://m.media-amazon.com/images/I/81CkpXo+W9L._AC_UL480_FMwebp_QL65_.jpg',
  },
  {
    id: 6,
    status: 'PENDING',
    shopName: 'BookHaven Store',
    product: 'Atomic Habits by James Clear – Self-help Bestseller',
    size: 'Paperback',
    imageUrl: 'https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UL480_FMwebp_QL65_.jpg',
  },
];

const Orders: React.FC = () => {
  return (
    <div className='min-h-screen p-6 bg-gray-50'>
      <div className='pb-6'>
        <h1 className='text-2xl font-bold text-gray-800'>Your Orders</h1>
        <p className='text-sm text-gray-600'>All your purchases in one place</p>
      </div>
      <div className='space-y-5'>
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
