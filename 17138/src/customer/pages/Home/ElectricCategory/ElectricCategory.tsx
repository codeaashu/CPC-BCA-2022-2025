// import React from 'react'
// import ElectricCategoryCard from './ElectricCategoryCard'

// const ElectricCategory = () => {
//   return (
//     <div className='flex flex-wrap justify-between py-5 lg:px-20 border-b'>
//         {[1,1,1,1,1,1,1].map((item) => <ElectricCategoryCard />)}
        
//     </div>
//   )
// }

// export default ElectricCategory

import React from 'react';
import { Grid } from '@mui/material';
import ElectricCategoryCard from './ElectricCategoryCard';

const ElectricCategory = () => (
  <Grid container spacing={2} justifyContent="center">
    {[...Array(7)].map((_, i) => (
      <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 3, md: 4 }}><ElectricCategoryCard /></Grid>
    ))}
  </Grid>
);

export default ElectricCategory;
