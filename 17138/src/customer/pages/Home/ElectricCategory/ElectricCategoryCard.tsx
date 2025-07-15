// import React from 'react'

// const ElectricCategoryCard = () => {
//   return (
//     <div>
//         <img className='object-contain h-10'
//         src="https://m.media-amazon.com/images/I/71pKJ+Mjd8L._AC_UY327_FMwebp_QL65_.jpg" alt="" />
//         <h2 className='font-semibold text-sm'>Laptop</h2>
//     </div>
//   )
// }

// export default ElectricCategoryCard

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LaptopMac } from '@mui/icons-material';

const ElectricCategoryCard = () => (
  <Card sx={{ width: 140, textAlign: 'center' }} elevation={3}>
    <CardContent>
      <LaptopMac fontSize="large" color="primary" />
      <Typography variant="subtitle1" fontWeight={600}>Laptop</Typography>
    </CardContent>
  </Card>
);

export default ElectricCategoryCard;
