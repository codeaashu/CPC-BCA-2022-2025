// import React from 'react'
// import ReviewCard from './ReviewCard'
// import { Divider } from '@mui/material'

// const Review = () => {
//   return (
//     <div className='p-5 lg:px-20 flex flex-col lg:flex-row gap-20'>

//       <section className='mt-8 w-full md:w-1/2 lg:w-[30%] space-y-2'>
//         <img src="https://images-eu.ssl-images-amazon.com/images/I/61HS4sTDnPL._AC_SR300,375,0,C_BR3_.jpg" alt="" />
//         <div>
//           <div>
//             <h1 className='text-lg font-semibold'>R Clothing</h1>
//           <p className='text-gray-600'>Stylish Men's Shirt</p>
//           </div>
//           <div>
//             <div className="price flex items-center gap-3 mt-5 text-2xl">
//             <span className="font-sans text-gray-800">₹ 400</span>
//             <span className="line-through text-gray-400">₹ 999</span>
//             <span className="text-primary-color font-semibold">60% off</span>
//           </div>
//           </div>
//         </div>
//       </section>

//       <section className='space-y-5 w-full'>
//         {[1,1,1,1,1,1].map((item, idx) => <div key={idx} className='space-y-3'>
//           <ReviewCard />
//           <Divider className='my-5' />
//         </div> )}
//       </section>
      
//     </div>
//   )
// }

// export default Review
import React from 'react';
import ReviewCard from './ReviewCard';
import {
  Divider,
  LinearProgress,
  Box,
  Rating,
  Typography,
} from '@mui/material';

const Review = () => {
  const ratingData = [
    { label: 'Excellent', value: 60, color: '#2e7d32', count: 19259 }, // green
    { label: 'Very Good', value: 40, color: '#388e3c', count: 19259 }, // darker green
    { label: 'Good', value: 25, color: '#0288d1', count: 19259 },      // blue
    { label: 'Average', value: 15, color: '#f9a825', count: 19259 },   // amber
    { label: 'Poor', value: 5, color: '#d32f2f', count: 19259 },       // red
  ];

  const averageRating = 4.2;

  return (
    <div className="p-5 lg:px-20 flex flex-col lg:flex-row gap-20">
      
      {/* Left section: product */}
      <section className="mt-8 w-full md:w-1/2 lg:w-[30%] space-y-2">
        <img
          src="https://images-eu.ssl-images-amazon.com/images/I/61HS4sTDnPL._AC_SR300,375,0,C_BR3_.jpg"
          alt=""
        />
        <div>
          <h1 className="text-lg font-semibold">R Clothing</h1>
          <p className="text-gray-600">Stylish Men's Shirt</p>
          <div className="price flex items-center gap-3 mt-5 text-2xl">
            <span className="font-sans text-gray-800">₹ 400</span>
            <span className="line-through text-gray-400">₹ 999</span>
            <span className="text-primary-color font-semibold">60% off</span>
          </div>
        </div>
      </section>

      {/* Right section: ratings and reviews */}
      <section className="space-y-5 w-full">

        {/* Review & Ratings Box */}
        <div className="border p-4 rounded-md shadow-sm space-y-4">
          {/* Heading */}
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold">Review & Ratings</span>
            <span className="bg-blue-600 text-white text-sm px-2 py-1 rounded">Ratings</span>
          </div>

          {/* Star Rating Row */}
          <div className="flex items-center gap-2">
            <Rating value={averageRating} precision={0.1} readOnly />
            <Typography variant="body2" className="text-gray-700">
              {averageRating} out of 5
            </Typography>
          </div>

          {/* Ratings Breakdown */}
          {ratingData.map((item, index) => (
            <Box key={index} display="flex" alignItems="center" gap={2}>
              <span
                className="text-sm font-medium px-2 py-1 rounded min-w-[80px] text-center"
                style={{ backgroundColor: item.color, color: 'white' }}
              >
                {item.label}
              </span>
              <LinearProgress
                variant="determinate"
                value={item.value}
                sx={{
                  flexGrow: 1,
                  height: 8,
                  borderRadius: 5,
                  backgroundColor: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: item.color,
                  },
                }}
              />
              <span className="text-sm text-gray-600 min-w-[50px] text-right">
                {item.count}
              </span>
            </Box>
          ))}
        </div>

        {/* Review Cards */}
        {[1, 1, 1, 1, 1, 1].map((item, idx) => (
          <div key={idx} className="space-y-3">
            <ReviewCard />
            <Divider className="my-5" />
          </div>
        ))}
      </section>
    </div>
  );
};

export default Review;
