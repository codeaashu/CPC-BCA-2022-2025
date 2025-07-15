// import React from 'react'

// const DealCard = () => {
//   return (
//     <div className='w-[12rem] cursor-pointer'>
//       <img className='border-x-[7px] border-t-[7px] border-pink-500 w-full
//       h-[12rem] object-cover object-top' src="https://m.media-amazon.com/images/I/61-vRq2ulOL._AC_UY327_FMwebp_QL65_.jpg" alt="" />

//       <div className='border-4 border-black bg-black text-white
//       p-2 text-center'>
//         <p className='text-lg font-semibold'>Smart Watch</p>
//         <p className='text-2xl font-bold'>20% Off</p>
//         <p className='text-balance text-lg'>Shop Now</p>
//       </div>
//     </div>
//   )
// }

// export default DealCard

import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const DealCard = () => (
  <Card sx={{ width: 192 }} elevation={5}>
    <CardMedia
      component="img"
      height="180"
      image="https://m.media-amazon.com/images/I/61-vRq2ulOL._AC_UY327_FMwebp_QL65_.jpg"
      alt="Smart Watch"
    />
    <CardContent sx={{ bgcolor: 'black', color: 'white', textAlign: 'center' }}>
      <Typography variant="subtitle1" fontWeight={600}>Smart Watch</Typography>
      <Typography variant="h6" fontWeight="bold">20% Off</Typography>
      <Typography variant="body2">Shop Now</Typography>
    </CardContent>
  </Card>
);

export default DealCard;
