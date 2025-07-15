// import React from 'react';
// import Avatar from '@mui/material/Avatar';
// import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
// import { teal } from '@mui/material/colors';
// import OrderStepper from './OrderStepper';

// const OrderDetails: React.FC = () => {
//   const order = {
//     id: 101,
//     status: 'DELIVERED',
//     shopName: 'Techify Mart',
//     product: 'EchoDot 4th Gen Smart Speaker with Alexa (Black)',
//     description:
//       'Smart speaker with improved bass, LED display showing time, temperature, and timers. Compatible with Alexa voice assistant.',
//     size: 'Compact',
//     quantity: 1,
//     price: 3499,
//     deliveryDate: 'May 31, 2025',
//     imageUrl:
//       'https://m.media-amazon.com/images/I/61EXU8BuGZL._AC_UL480_FMwebp_QL65_.jpg',
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gray-50">
//       <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-6">
//         {/* Header */}
//         <div className="flex items-center gap-4">
//           <Avatar sx={{ bgcolor: teal[500] }}>
//             <ElectricBoltIcon />
//           </Avatar>
//           <div>
//             <h2 className="text-xl font-bold text-gray-800">Order #{order.id}</h2>
//             <p className="text-sm text-green-600 font-medium">{order.status}</p>
//           </div>
//         </div>

//         {/* Product Summary */}
//         <div className="flex gap-6">
//           <img
//             src={order.imageUrl}
//             alt={order.product}
//             className="w-32 h-32 object-contain rounded-md"
//           />
//           <div className="space-y-2">
//             <h3 className="text-lg font-semibold text-gray-800">{order.product}</h3>
//             <p className="text-gray-600 text-sm">{order.description}</p>
//             <p>
//               <strong>Size:</strong> {order.size}
//             </p>
//             <p>
//               <strong>Quantity:</strong> {order.quantity}
//             </p>
//             <p>
//               <strong>Price:</strong> ₹{order.price}
//             </p>
//           </div>
//         </div>

//         {/* Delivery Info */}
//         <div className="border-t pt-4 text-sm text-gray-700 space-y-1">
//           <p>
//             <strong>Shop:</strong> {order.shopName}
//           </p>
//           <p>
//             <strong>Delivered on:</strong> {order.deliveryDate}
//           </p>
//         </div>

//         <section className='border- p-5'>
//           <OrderStepper orderStatus={"PENDING"} />
//         </section>
//       </div>
//     </div>
//   );
// };

// export default OrderDetails;


// import React from 'react';
// import Avatar from '@mui/material/Avatar';
// import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
// import { teal } from '@mui/material/colors';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// const OrderDetails: React.FC = () => {
//   const order = {
//     id: 101,
//     shopName: 'Techify Mart',
//     status: 'DELIVERED', // Can be 'PLACED' | 'SHIPPED' | 'DELIVERED'
//     product: 'EchoDot 4th Gen Smart Speaker with Alexa (Black)',
//     description:
//       'Smart speaker with improved bass, LED display showing time, temperature, and timers. Compatible with Alexa voice assistant.',
//     size: 'Compact',
//     quantity: 1,
//     price: 3499,
//     imageUrl:
//       'https://m.media-amazon.com/images/I/61EXU8BuGZL._AC_UL480_FMwebp_QL65_.jpg',
//     address: {
//       name: 'Rahul Sharma',
//       phone: '9876543210',
//       line1: '221B Baker Street',
//       line2: 'Near Central Mall',
//       city: 'Mumbai',
//       state: 'Maharashtra',
//       zip: '400001',
//     },
//     timeline: {
//       placed: 'May 28, 2025',
//       shipped: 'May 29, 2025',
//       delivered: 'May 31, 2025',
//     },
//   };

//   const statusSteps = [
//     {
//       label: 'Placed',
//       date: order.timeline.placed,
//       icon: <ShoppingCartIcon className="text-white" />,
//     },
//     {
//       label: 'Shipped',
//       date: order.timeline.shipped,
//       icon: <LocalShippingIcon className="text-white" />,
//     },
//     {
//       label: 'Delivered',
//       date: order.timeline.delivered,
//       icon: <CheckCircleIcon className="text-white" />,
//     },
//   ];

//   const getStatusIndex = (status: string) => {
//     if (status === 'PLACED') return 0;
//     if (status === 'SHIPPED') return 1;
//     return 2; // DELIVERED
//   };

//   const currentStep = getStatusIndex(order.status);

//   return (
//     <div className="min-h-screen p-6 bg-gray-50">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-6">
//         {/* Header */}
//         <div className="flex items-center gap-4">
//           <Avatar sx={{ bgcolor: teal[500] }}>
//             <ElectricBoltIcon />
//           </Avatar>
//           <div>
//             <h2 className="text-xl font-bold text-gray-800">Order #{order.id}</h2>
//             <p className="text-sm text-green-600 font-medium uppercase">
//               {order.status}
//             </p>
//           </div>
//         </div>

//         {/* Status Timeline */}
//         <div className="flex justify-between items-center gap-4 py-4 border-t border-b">
//           {statusSteps.map((step, index) => (
//             <div
//               key={step.label}
//               className="flex-1 flex flex-col items-center text-center"
//             >
//               <div
//                 className={`w-10 h-10 flex items-center justify-center rounded-full ${
//                   index <= currentStep
//                     ? 'bg-teal-500'
//                     : 'bg-gray-300'
//                 }`}
//               >
//                 {step.icon}
//               </div>
//               <p
//                 className={`mt-2 text-sm font-semibold ${
//                   index <= currentStep ? 'text-teal-700' : 'text-gray-500'
//                 }`}
//               >
//                 {step.label}
//               </p>
//               <p className="text-xs text-gray-500">{step.date}</p>
//             </div>
//           ))}
//         </div>

//         {/* Product Summary */}
//         <div className="flex gap-6">
//           <img
//             src={order.imageUrl}
//             alt={order.product}
//             className="w-32 h-32 object-contain rounded-md"
//           />
//           <div className="space-y-2">
//             <h3 className="text-lg font-semibold text-gray-800">
//               {order.product}
//             </h3>
//             <p className="text-gray-600 text-sm">{order.description}</p>
//             <p>
//               <strong>Size:</strong> {order.size}
//             </p>
//             <p>
//               <strong>Quantity:</strong> {order.quantity}
//             </p>
//             <p>
//               <strong>Total Price:</strong> ₹{order.price}
//             </p>
//           </div>
//         </div>

//         {/* Address Details */}
//         <div className="bg-gray-50 p-4 rounded-lg space-y-2">
//           <h4 className="font-semibold text-gray-700">Delivery Address</h4>
//           <p>{order.address.name}</p>
//           <p>{order.address.line1}</p>
//           <p>{order.address.line2}</p>
//           <p>
//             {order.address.city}, {order.address.state} - {order.address.zip}
//           </p>
//           <p>Phone: {order.address.phone}</p>
//         </div>

//         {/* Delivered On */}
//         {order.status === 'DELIVERED' && (
//           <div className="text-sm text-green-700 font-medium">
//             Delivered on {order.timeline.delivered}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderDetails;

import React from 'react';
import Avatar from '@mui/material/Avatar';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import { teal } from '@mui/material/colors';
import OrderStepper from './OrderStepper';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const OrderDetails: React.FC = () => {
  const order = {
    id: 101,
    status: 'DELIVERED', // Change this to test: 'PLACED', 'SHIPPED', 'CANCELLED'
    shopName: 'Techify Mart',
    product: 'EchoDot 4th Gen Smart Speaker with Alexa (Black)',
    description:
      'Smart speaker with improved bass, LED display showing time, temperature, and timers. Compatible with Alexa voice assistant.',
    size: 'Compact',
    quantity: 1,
    price: 3499,
    deliveryDate: 'May 31, 2025',
    imageUrl:
      'https://m.media-amazon.com/images/I/61EXU8BuGZL._AC_UL480_FMwebp_QL65_.jpg',
    address: {
      name: 'Rahul Sharma',
      phone: '9876543210',
      line1: '221B Baker Street',
      line2: 'Near Central Mall',
      city: 'Mumbai',
      state: 'Maharashtra',
      zip: '400001',
    },
    timeline: {
      placed: 'May 28, 2025',
      shipped: 'May 29, 2025',
      delivered: 'May 31, 2025',
    },
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-8">
        {/* Order Header */}
        <div className="flex items-center gap-4">
          <Avatar sx={{ bgcolor: teal[500] }}>
            <ElectricBoltIcon />
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Order #{order.id}</h2>
            <p className={`text-sm font-semibold ${order.status === 'CANCELLED' ? 'text-red-500' : 'text-green-600'}`}>
              {order.status}
            </p>
          </div>
        </div>

        

        {/* Product Details */}
        <div className="flex flex-col sm:flex-row gap-6">
          <img
            src={order.imageUrl}
            alt={order.product}
            className="w-full sm:w-32 h-32 object-contain rounded-md"
          />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">{order.product}</h3>
            <p className="text-sm text-gray-600">{order.description}</p>
            <p className="text-sm">
              <strong>Size:</strong> {order.size}
            </p>
            <p className="text-sm">
              <strong>Quantity:</strong> {order.quantity}
            </p>
            <p className="text-sm">
              <strong>Total Price:</strong> ₹{order.price}
            </p>
          </div>
        </div>

        {/* Order Stepper */}
        <section className="border p-4 rounded-md bg-gray-50">
          <OrderStepper orderStatus={order.status} />
        </section>

        {/* Shop & Delivery */}
        <div className="text-sm space-y-1 text-gray-700">
          <p><strong>Sold by:</strong> {order.shopName}</p>
          {order.status === 'DELIVERED' && (
            <p className="flex items-center gap-1 text-green-700 font-medium">
              <LocalShippingIcon fontSize="small" /> Delivered on {order.deliveryDate}
            </p>
          )}
        </div>

        {/* Address Details */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="font-semibold text-gray-800 mb-2">Delivery Address</h4>
          <p>{order.address.name}</p>
          <p>{order.address.line1}</p>
          <p>{order.address.line2}</p>
          <p>{order.address.city}, {order.address.state} - {order.address.zip}</p>
          <p>Phone: {order.address.phone}</p>
        </div>

        {/* Payment Detail */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="font-semibold text-gray-800 mb-2">Payment Details</h4>
          <p>Payment Method: Credit Card</p>
          <p>Total Amount: ₹{order.price}</p>
          <p>Status: {order.status === 'CANCELLED' ? 'Refunded' : 'Paid'}</p>
        </div>
        

      

        {/* Cancel Order */}
        {order.status !== 'CANCELLED' && (
          <button
            className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            onClick={() => alert('Order Cancelled')}
          >
            Cancel Order
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
