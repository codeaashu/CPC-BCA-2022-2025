// import React from 'react'
// import ShopByCategoryCard from './ShopByCategoryCard'

// const ShopByCategory = () => {
//   return (
//     <div className='flex flex-wrap justify-between lg:px-20 gap-7'>
//         {[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1].map((item)=><ShopByCategoryCard />)}
//     </div>
//   )
// }

// export default ShopByCategory

import React from 'react';
import { Grid } from '@mui/material';
import ShopByCategoryCard from './ShopByCategoryCard';

const ShopByCategory = () => (
  <Grid container spacing={3} justifyContent="center">
    {[...Array(12)].map((_, i) => (
      <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 3, md: 4 }}><ShopByCategoryCard /></Grid>
    ))}
  </Grid>
);

export default ShopByCategory;
