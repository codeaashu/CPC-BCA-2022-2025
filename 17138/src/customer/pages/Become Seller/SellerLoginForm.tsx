

import { Box, TextField, Button, InputAdornment } from '@mui/material';
import React from 'react';
import { useFormik } from 'formik';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useAppDispatch } from '../../../State/Store';
import { send } from 'process';
import { sendLoginSignupOtp, signin } from '../../../State/AuthSlice';
import { sellerLogin } from '../../../State/seller/sellerSliceAuth';

const SellerLoginForm = () => {
  const dispatch  = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      otp: '',
    },
    onSubmit: (values) => {
      console.log("Login values:", values);
      dispatch(sellerLogin(values));
    },
  });

  const handleSendOtp = () =>{
    dispatch(sendLoginSignupOtp({email:formik.values.email}))
  }

  const handleLogin = () => {
    // dispatch(signin)
  }

  return (
    <Box className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md font-sans">
      <p className="text-xl font-bold text-center pb-9 text-primary-color">Login As Seller</p>

      <form onSubmit={formik.handleSubmit} className="space-y-9">
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineIcon className="text-gray-500" />
              </InputAdornment>
            ),
          }}
        />

        {true && <div>
          <p className='font-medium text-sm opacity-55'>Enter Otp Sent to your Email.</p>
          <TextField
            fullWidth
            label="OTP"
            name="otp"
            type="text"
            value={formik.values.otp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.otp && Boolean(formik.errors.otp)}
            helperText={formik.touched.otp && formik.errors.otp}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOpenIcon className="text-gray-500" />
                </InputAdornment>
              ),
            }}
          />
        </div>}

            <Button
          onClick={handleSendOtp}
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          className="rounded-md"
        >
          Send Otp
        </Button>

        <Button
        onClick={()=>formik.handleSubmit()}
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          className="rounded-md"
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default SellerLoginForm;
