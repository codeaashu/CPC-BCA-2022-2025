import { Button, Card, Divider } from '@mui/material'
import React from 'react'

const Payment = () => {
  return (
    <div className='spyace-y-5'>
      <Card className='rounded-md space-y-4 p-5'>
        <h1 className='text-gray-600 font-medium'>Total Earning</h1>
        <h1 className='font-bold text-xl pb-1'>₹11664</h1>
        <Divider/>
        <p className='text-gray-600 font-medium pt-1'>Last Payment : <strong>₹0</strong></p>
      </Card>
      <div className='mt-10 space-y-3'>
        <Button variant='contained' className='spyace-bg-primary spyace-text-white spyace-px-6 spyace-py-2 spyace-rounded-md hover:spyace-bg-primary-hover'>
        Transaction
      </Button>
      </div>
      
    </div>
  )
}

export default Payment