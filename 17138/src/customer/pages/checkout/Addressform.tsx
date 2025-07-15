// import { Box, Grid, TextField } from '@mui/material'
// import { useFormik } from 'formik'
// import React from 'react'
// import * as Yup from 'yup'

// const Addressform = () => {
//     const formik= useFormik(
//         {
//             initialValues: {
//                 name: '',
//                 mobile: '',
//                 pincode: '',
//                 address: '',
//                 city: '',
//                 state: '',
//                 locality: ''
//             },
//             validationSchema:  {},
//             onSubmit: (values) => {
//                 console.log('Form submitted:', values);
//             }
//         }
//     )
//   return (
//     <Box sx={{ max:"auto"}}>

//         <p className='text-xl font-bold text-center pb-5'>Contact Details</p>

//             <form>
//                 <Grid container spacing={3}>
//                     <Grid size={{xs:12}}>
//                         <TextField
//                             fullWidth
//                             label="Name"
//                             name='name'
//                             value={formik.values.name}
//                             onChange={formik.handleChange}
//                             error={formik.touched.name && Boolean(formik.errors.name)}
//                             helperText={formik.touched.name && formik.errors.name}
//                             className="w-full p-2 border rounded-md"
//                             required
//                         />
//                     </Grid>
//                 </Grid>
//                 <Grid container spacing={8}>
//                     <Grid size={{xs:12}}>
//                         <TextField
//                             fullWidth
//                             label="Mobile"
//                             name='mobile'
//                             value={formik.values.mobile}
//                             onChange={formik.handleChange}
//                             error={formik.touched.mobile && Boolean(formik.errors.mobile)}
//                             helperText={formik.touched.mobile && formik.errors.mobile}
//                             className="w-full p-2 border rounded-md"
//                             required
//                         />
//                     </Grid>
//                 </Grid>
//                 <Grid container spacing={8}>
//                     <Grid size={{xs:12}}>
//                         <TextField
//                             fullWidth
//                             label="Pincode"
//                             name='pincode'
//                             value={formik.values.pincode}
//                             onChange={formik.handleChange}
//                             error={formik.touched.pincode && Boolean(formik.errors.pincode)}
//                             helperText={formik.touched.pincode && formik.errors.pincode}
//                             className="w-full p-2 border rounded-md"
//                             required
//                         />
//                     </Grid>
//                 </Grid>
//                 <Grid container spacing={8}>
//                     <Grid size={{xs:12}}>
//                         <TextField
//                             fullWidth
//                             label="Address"
//                             name='address'
//                             value={formik.values.address}
//                             onChange={formik.handleChange}
//                             error={formik.touched.address && Boolean(formik.errors.address)}
//                             helperText={formik.touched.address && formik.errors.address}
//                             className="w-full p-2 border rounded-md"
//                             required
//                         />
//                     </Grid>
//                 </Grid>
//                 <Grid container spacing={8}>
//                     <Grid size={{xs:12}}>
//                         <TextField
//                             fullWidth
//                             label="City"
//                             name='city'
//                             value={formik.values.city}
//                             onChange={formik.handleChange}
//                             error={formik.touched.city && Boolean(formik.errors.city)}
//                             helperText={formik.touched.city && formik.errors.city}
//                             className="w-full p-2 border rounded-md"
//                             required
//                         />
//                     </Grid>
//                 </Grid>
//                 <Grid container spacing={8}>
//                     <Grid size={{xs:12}}>
//                         <TextField
//                             fullWidth
//                             label="State"
//                             name='state'
//                             value={formik.values.state}
//                             onChange={formik.handleChange}
//                             error={formik.touched.state && Boolean(formik.errors.state)}
//                             helperText={formik.touched.state && formik.errors.state}
//                             className="w-full p-2 border rounded-md"
//                             required
//                         />
//                     </Grid>
//                 </Grid>
//                 <Grid container spacing={8}>
//                     <Grid size={{xs:12}}>
//                         <TextField
//                             fullWidth
//                             label="Locality"
//                             name='locality'
//                             value={formik.values.locality}
//                             onChange={formik.handleChange}
//                             error={formik.touched.locality && Boolean(formik.errors.locality)}
//                             helperText={formik.touched.locality && formik.errors.locality}
//                             className="w-full p-2 border rounded-md"
//                             required
//                         />
//                     </Grid>
//                 </Grid>
//             </form>
//     </Box>
//   )
// }

// export default Addressform

import React from 'react';
import { Box, Grid, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../../State/Store';
import { createOrder } from '../../../State/customer/orderSlice';

const Addressform = ({paymentGateway}:any) => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
      mobile: '',
      pincode: '',
      address: '',
      city: '',
      state: '',
      locality: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      mobile: Yup.string().matches(/^\d{10}$/, 'Must be 10 digits').required('Required'),
      pincode: Yup.string().matches(/^\d{6}$/, 'Must be 6 digits').required('Required'),
      address: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
      state: Yup.string().required('Required'),
      locality: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      dispatch(createOrder({
         address:values,
         jwt: localStorage.getItem("jwt") || "",
         paymentGateway})); // Dispatch the createOrder action
    },
  });

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <p className='text-xl font-bold text-center pb-5'>Contact Details</p>

      <form onSubmit={formik.handleSubmit}>
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

          <Grid size={{xs:12}} className='text-center'>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Addressform;
