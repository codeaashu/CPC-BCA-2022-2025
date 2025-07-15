// import React from 'react';
// import Avatar from '@mui/material/Avatar';
// import { teal } from '@mui/material/colors';
// import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

// const OrderItem = () => {
//   return (
//     <div className='text-sm bg-white p-5 space-y-4 border rounded-md cursor-pointer'>
//       <div className='flex items-center gap-5'>
//         <div>
//           <Avatar sx={{ bgcolor: teal[500] }}>
//             <ElectricBoltIcon />
//           </Avatar>
//         </div>
//         <div>
//           <h1 className="font-bold text-primary-color">PENDING</h1>
//           <p>Order details or description can go here.</p>
//         </div>
//       </div>
//       <div className='p-5 bg-teal-50 flex gap-3'>
//         <div>
//           <img className='w-[70px]' src="https://m.media-amazon.com/images/I/71aTghUQfqL._AC_UL480_FMwebp_QL65_.jpg" alt="" />
//         </div>
//         <div className='w-full space-y-2'>
//           <h1 className='font-bold'>Shubh Shop</h1>
//           <p>NoiseFit Halo 1.43" AMOLED Display, Bluetooth Calling Round Dial Smart Watch, Premium Metallic Build, Always on Display, Smart Gesture Control, 100 Sports Modes (Vintage Brown)</p>
//           <p>
//             <strong>Size : </strong>
//             Free
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderItem;

import React from 'react';
import Avatar from '@mui/material/Avatar';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import { teal } from '@mui/material/colors';

export type OrderStatus = 'PENDING' | 'SHIPPED' | 'DELIVERED';

export interface Order {
  id: number;
  status: OrderStatus;
  shopName: string;
  product: string;
  size: string;
  imageUrl: string;
}

const statusColors: Record<OrderStatus, string> = {
  PENDING: 'text-orange-600',
  SHIPPED: 'text-blue-600',
  DELIVERED: 'text-green-600',
};

interface OrderItemProps {
  order: Order;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const { status, shopName, product, size, imageUrl } = order;

  return (
    <div className='bg-white p-5 space-y-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'>
      <div className='flex items-center gap-5'>
        <Avatar sx={{ bgcolor: teal[500] }}>
          <ElectricBoltIcon />
        </Avatar>
        <div>
          <h1 className={`font-bold uppercase ${statusColors[status]}`}>
            {status}
          </h1>
          <p className='text-gray-500 text-sm'>Status updated recently</p>
        </div>
      </div>

      <div className='p-4 bg-teal-50 rounded-md flex gap-4'>
        <img className='w-20 h-20 object-contain rounded-md' src={imageUrl} alt={product} />
        <div className='space-y-2'>
          <h2 className='font-semibold text-base'>{shopName}</h2>
          <p className='text-sm text-gray-700 line-clamp-3'>{product}</p>
          <p className='text-sm'>
            <strong>Size:</strong> {size}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
