import React from 'react';
import { Box, Grid, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const BecomeSellerFormStep2 = ({formik}:any) => {
  

  return (
    <Box >
      <p className='text-xl font-bold text-center pb-5'>Pickup Address</p>

      <>
        <Grid container spacing={2}>
          <Grid size={{xs:12}}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              required
            />
          </Grid>

          <Grid size={{xs:6}}>
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
          </Grid>

          <Grid size={{xs:6}}>
            <TextField
              fullWidth
              label="Pincode"
              name="pincode"
              value={formik.values.pincode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.pincode && Boolean(formik.errors.pincode)}
              helperText={formik.touched.pincode && formik.errors.pincode}
              required
            />
          </Grid>

          <Grid size={{xs:12}}>
            <TextField
              fullWidth
              label="Address (House No, Building, Street)"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              required
            />
          </Grid>

          <Grid size={{xs:12}}>
            <TextField
              fullWidth
              label="Locality/Town"
              name="locality"
              value={formik.values.locality}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.locality && Boolean(formik.errors.locality)}
              helperText={formik.touched.locality && formik.errors.locality}
              required
            />
          </Grid>

          <Grid size={{xs:6}}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
              required
            />
          </Grid>

          <Grid size={{xs:6}}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
              required
            />
          </Grid>

          
        </Grid>
      </>
    </Box>
  );
};

export default BecomeSellerFormStep2;
