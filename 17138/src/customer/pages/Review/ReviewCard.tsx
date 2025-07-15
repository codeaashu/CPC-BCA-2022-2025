import { Delete } from '@mui/icons-material'
import { Avatar, Box, Grid, IconButton, Rating, } from '@mui/material'


import React from 'react'

const ReviewCard = () => {
  return (
    <div className='flex justify-between'>
        <Grid container spacing={9}  >
          <Grid  size={{xs:1}}>
            <Box >
              <Avatar className='text-white' sx={{width:56,height:56, bgcolor:"#1976d2"}}>
                S
              </Avatar>
            </Box>
          </Grid>
          <Grid size={{xs:9}}>
          <div className='space-y-2'>
            <div>
              <p className='font-semibold text-lg'>Shubh</p>
              <p className='opacity-70'>2025-05-31T10:06:18</p>
            </div>
          </div>
          <Rating
          readOnly
          value={4.5}
          precision={0.5}

          />
          <p>Value for money product, great product</p>
          <div>
            <img className='w-24 h-24 object-cover' src="https://m.media-amazon.com/images/I/81+6II6O3hL.jpg" alt="" />
          </div>
        </Grid>

        </Grid>
        <div >
          <IconButton>
            <Delete />
          </IconButton>
          </div>        
    </div>
  )
}

export default ReviewCard