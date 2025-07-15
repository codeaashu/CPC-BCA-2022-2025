// import React from 'react'
// import { useAppDispatch } from '../../../State/Store';
// import { useFormik } from 'formik';
// import { Button, InputAdornment, TextField } from '@mui/material';
// import { sendLoginSignupOtp } from '../../../State/AuthSlice';

// const LoginForm = () => {
//   const dispatch  = useAppDispatch();
//     const formik = useFormik({
//       initialValues: {
//         email: '',
//         otp: '',
//       },
//       onSubmit: (values) => {
//         console.log("Login values:", values);

//       },
//     });

//      const handleSendOtp = () =>{
//         dispatch(sendLoginSignupOtp({email:formik.values.email}))
//       }

//   return (
//     <div>
//         <h1 className='text-center font-bold text-xl text-primary-color pb-8'>Login</h1>
//         <form onSubmit={formik.handleSubmit} className="space-y-9">
//         <TextField
//           fullWidth
//           label="Email"
//           name="email"
//           type="email"
//           value={formik.values.email}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           error={formik.touched.email && Boolean(formik.errors.email)}
//           helperText={formik.touched.email && formik.errors.email}
//           required
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 {/* <MailOutlineIcon className="text-gray-500" /> */}
//               </InputAdornment>
//             ),
//           }}
//         />

//         {true && <div>
//           <p className='font-medium text-sm opacity-55'>Enter Otp Sent to your Email.</p>
//           <TextField
//             fullWidth
//             label="OTP"
//             name="otp"
//             type="text"
//             value={formik.values.otp}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={formik.touched.otp && Boolean(formik.errors.otp)}
//             helperText={formik.touched.otp && formik.errors.otp}
//             required
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   {/* <LockOpenIcon className="text-gray-500" /> */}
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </div>}

//             <Button
//           onClick={handleSendOtp}
//           fullWidth
//           type="submit"
//           variant="contained"
//           color="primary"
//           className="rounded-md"
//         >
//           Send Otp
//         </Button>

//         <Button
//         onClick={()=>formik.handleSubmit()}
//           fullWidth
//           type="submit"
//           variant="contained"
//           color="primary"
//           className="rounded-md"
//         >
//           Login
//         </Button>
//       </form>
//     </div>
//   )
// }

// export default LoginForm

import React from 'react';
import { useFormik } from 'formik';
import { Button, CircularProgress, TextField } from '@mui/material';
import store, { useAppDispatch, useAppSelector } from '../../../State/Store';
import { sendLoginSignupOtp, signin } from '../../../State/AuthSlice';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const{auth}=useAppSelector(store => store);
  const formik = useFormik({
    initialValues: {
      email: '',
      otp: '',
    },
    onSubmit: (values) => {
      console.log('Login values:', values);
      dispatch(signin(values))
    },
  });

  const handleSendOtp = () => {
    dispatch(sendLoginSignupOtp({ email: formik.values.email }));
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5">
      <TextField
        fullWidth
        label="Email"
        variant="filled"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      {auth.otpSent && <TextField
        fullWidth
        label="OTP"
        variant="filled"
        name="otp"
        value={formik.values.otp}
        onChange={formik.handleChange}
      />}
      {auth.otpSent?
      <Button type="submit" fullWidth variant="contained" color="success">
        Login
      </Button> :
      <Button onClick={handleSendOtp} fullWidth variant="contained" color="primary">
        {auth.loading?<CircularProgress/>:""}
        Send OTP
      </Button> 
      }
    </form>
  );
};

export default LoginForm;
