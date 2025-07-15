import React from 'react'

const CategoryGrid = () => {
  return (
    <div className='grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20'>
        
        <div className='col-span-3 row-span-12 text-white'>
            <img 
            className='w-full h-full object-cover rounded-md'
            src="https://m.media-amazon.com/images/I/71jF7678loL._SX569_.jpg" alt="" />
        </div>
        <div className='col-span-2 row-span-6 text-white'>
            <img 
            className='w-full h-full object-cover rounded-md'
            src="https://m.media-amazon.com/images/I/61hYT677lhL._AC_UL960_FMwebp_QL65_.jpg" alt="" />
        </div>
        <div className='col-span-4 row-span-6 text-white'>
            <img 
            className='w-full h-full object-cover rounded-md'
            src="https://m.media-amazon.com/images/I/61NjKsactzL._AC_UL480_FMwebp_QL65_.jpg" alt="" />
        </div>
        <div className='col-span-3 row-span-12 text-white'>
            <img 
            className='w-full h-full object-cover rounded-md'
            src="https://m.media-amazon.com/images/I/51j2mBT8iiL.jpg" 
            alt="" />
        </div>
        <div className='col-span-4 row-span-6 text-white'>
            <img 
            className='w-full h-full object-cover rounded-md'
            src="https://m.media-amazon.com/images/I/91HYg7+j3-L._AC_UL480_FMwebp_QL65_.jpg" alt="" />
        </div>
        <div className='col-span-2 row-span-6 text-white'>
            <img 
            className='w-full h-full object-cover rounded-md'
            src="https://m.media-amazon.com/images/I/713o9x-8dUL._SY695_.jpg" alt="" />
        </div>
        
    </div>
  )
}

export default CategoryGrid