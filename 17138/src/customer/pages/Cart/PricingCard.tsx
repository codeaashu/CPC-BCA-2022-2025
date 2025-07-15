import { Divider } from '@mui/material'
import React from 'react'

const PricingCard = () => {
  return (
    <>
      <div className='space-y-3 p-5'>
        <div className='flex justify-between items-center'>
          <h1 className='text-lg font-semibold'>Price Details</h1>
          <span className='text-gray-500 text-sm'>({5} items)</span>
        </div>

        <div className='flex justify-between items-center'>
          <span>Price ({5} items)</span>
          <span className='font-semibold'>₹3,995.00</span>
        </div>

        <div className='flex justify-between items-center'>
          <span>Discount</span>
          <span className='text-green-600 font-semibold'>- ₹200.00</span>
        </div>

        <div className='flex justify-between items-center'>
          <span>Delivery Charges</span>
          <span className='text-red-600 font-semibold'>Free</span>
        </div>

        <div className='flex justify-between items-center'>
          <span>Platform Fee</span>
          <span className='font-semibold'>₹0.00</span>
        </div>



        <Divider />

        <div className='flex justify-between items-center font-semibold text-lg'>
          <span>Total Amount</span>
          <span>₹3,795.00</span>
        </div>
      </div>
    </>
  )
}

export default PricingCard