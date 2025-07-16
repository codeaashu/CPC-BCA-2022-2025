import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card } from '@/components/ui/card'
import { RouteIndex,RouteSignup } from '@/helpers/RouteName'
import { Link, useNavigate } from "react-router-dom";
import { showToast } from '@/helpers/showToast'
import Swal from 'sweetalert2';
import { getEnv } from '@/helpers/getEnv'

import { setUser } from '@/redux/user/user.slice'
import GoogleLogin from '@/components/GoogleLogin'
import { useDispatch } from "react-redux";
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Signin = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false);

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string()
      .min(6, 'Password must be at least 6 characters long')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/, 'Password must contain at least 1 uppercase, 1 lowercase, and 1 number')
  });
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  async function onSubmit(values) {
  
  
  try {
    const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/login`, {

      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials:'include',
      body: JSON.stringify(values)
    });

    const data = await response.json();

    if (!response.ok) {
     return showToast('error', data.message);
    }

    if (data.user) {
      dispatch(setUser(data.user));
      navigate(RouteIndex);
      await Swal.fire({
        title: 'Login Successful!',
        text: 'You are now logged in and can read or post blogs.',
        icon: 'success',
        confirmButtonColor: '#6366f1',
        confirmButtonText: 'OK'
      });
    } else {
      showToast('error', 'Invalid response format');
    }

  } catch (error) {
    showToast('error', error.message);
  }
}

  return (
    <div className='flex justify-center items-center h-screen w-screen'>
      {/* use the card component */}
      <Card className="w-[400px] p-5">
      <h1 className='text-2xl text-center mb-5'>Login Into Account</h1>
      <div>
                        <GoogleLogin />
                          <div className='border   flex justify-center items-center'>
                            <span className='absoulate bg-white text-sm'>
                                or
                            </span>
                          </div>
                     </div>
       
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 bg-white shadow-lg rounded-lg w-96">

            {/*  Email field */}
            <div className='mb-3'>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ✅ Password field */}
            <div className='mb-3'>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          onClick={() => setShowPassword((prev) => !prev)}
                          tabIndex={-1}
                        >
                          {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <Button type="submit" className="w-full">Sign In</Button>
              <div className='mt-5 text-sm flex justify-center items-center gap-2'>
                <p>Don&apos; t have account?</p>
                <Link className='text-blue-500 hover: underline' to={RouteSignup}>Sign up</Link>
              </div>
            </div>
          </form>
        </Form>
      </Card>

    </div>
  );
};

export default Signin;
