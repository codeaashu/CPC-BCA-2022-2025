// import React from 'react'
// import './ShopByCategory.css'; // Assuming you have a CSS file for styles

// const ShopByCategoryCard = () => {
//   return (
//     <div className='flex gap-3 flex-col justify-center items-center group cursor-pointer'>

//         <div className='custome-border w-[150px] h-[150px] lg:w-[249px] lg:h-[249px] relative overflow-hidden rounded-full bg-primary-color'>
//             <img className='rounded-full group-hover:scale-95 transition-transform 
//             transition-duration-700 w-full h-full object-cover object-top' 
//             src="https://m.media-amazon.com/images/I/619IDSfXDoL._AC_UL480_FMwebp_QL65_.jpg" alt="" />
//         </div>
//         <h1>Kitchen</h1>
//     </div>
//   )
// }

// export default ShopByCategoryCard

import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActionArea } from '@mui/material';

const ShopByCategoryCard = () => (
  <Card sx={{ width: 180, textAlign: 'center' }} elevation={3}>
    <CardActionArea>
      <CardMedia
        component="img"
        image="https://m.media-amazon.com/images/I/619IDSfXDoL._AC_UL480_FMwebp_QL65_.jpg"
        alt="Kitchen"
        sx={{ height: 180, objectFit: 'cover' }}
      />
      <CardContent>
        <Typography variant="subtitle1" fontWeight={600}>Kitchen</Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default ShopByCategoryCard;
