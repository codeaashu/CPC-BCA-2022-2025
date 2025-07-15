

import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import AuthCard from '../../../component/AuthCard';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-400 to-gray-300 flex items-center justify-center px-4">
      <AuthCard>
        <div className="h-48 w-full overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src="https://t3.ftcdn.net/jpg/01/82/04/38/240_F_182043866_cQZwPYqKo2xZvZ8sSwW7rdRbf72GcsH4.jpg"
            alt="Auth Banner"
          />
        </div>

        <div className="px-8 py-6 text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
            >
              {isLogin ? <LoginForm /> : <RegisterForm />}
            </motion.div>
          </AnimatePresence>

          {/* Toggle Link */}
          <div className="mt-6 text-center text-sm">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <Button
              onClick={() => setIsLogin(!isLogin)}
              size="small"
              sx={{ color: '#000000', textTransform: 'none', fontWeight: 'bold' }}
            >
              {isLogin ? 'Create Account' : 'Login'}
            </Button>
          </div>

          {/* Social Login */}
          <div className="mt-6 flex flex-col gap-3">
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              fullWidth
              sx={{ color: 'white', borderColor: 'white', ':hover': { bgcolor: '#ffffff22' } }}
            >
              Continue with Google
            </Button>
            <Button
              variant="outlined"
              startIcon={<GitHubIcon />}
              fullWidth
              sx={{ color: 'white', borderColor: 'white', ':hover': { bgcolor: '#ffffff22' } }}
            >
              Continue with GitHub
            </Button>
          </div>
        </div>
      </AuthCard>
    </div>
  );
};

export default Auth;
