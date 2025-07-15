import { Box, TextField } from '@mui/material'
import React from 'react'

const BecomeSellerFormStep1 = ({formik}:any) => {
  return (
    <Box>
        <p className='text-xl font-bold text-center pb-9'>Contact Details</p>

        <div className='space-y-9'>

            <TextField
                          fullWidth
                          label="Mobile"
                          name="mobile"
                          value={formik.values.mobile}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                          helperText={formik.touched.mobile && formik.errors.mobile}
                          required
                        />
            <TextField
                          fullWidth
                          label="GSTIN"
                          name="GSTIN"
                          value={formik.values.GSTIN}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.GSTIN && Boolean(formik.errors.GSTIN)}
                          helperText={formik.touched.GSTIN && formik.errors.GSTIN}
                          required
                        />            

        </div>
    </Box>
  )
}

export default BecomeSellerFormStep1