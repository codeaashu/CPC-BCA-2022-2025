import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react'

const CreateDealForm = () => {
    const formik = useFormik({
    initialValues: {
        discount:"",
      category: '',
      
    },
    onSubmit: (values) => {
      console.log(values);
    },
    })
  return (
    <div>
        <Box component={"form"} onSubmit={formik.handleSubmit} 
        className='space-y-6' >
            <Typography>
                Create New Deal
            </Typography>

            <TextField
                          fullWidth
                          label="Discount"
                          name="discount"
                          value={formik.values.discount}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.discount && Boolean(formik.errors.discount)}
                          helperText={formik.touched.discount && formik.errors.discount}
                          required
                        />

                        <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Category</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={formik.values.category}
    label="Category"
    onChange={formik.handleChange}
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
</FormControl>

             <Button fullWidth sx={{py:".9rem"}} type='submit' variant='contained'>
                Create Deal
             </Button>

        </Box>
    </div>
  )
}

export default CreateDealForm