
import React, { useState } from 'react';
import SellerAccountForm from './SellerAccountForm';
import SellerLoginForm from './SellerLoginForm';
import { Button } from '@mui/material';

const BecomeSeller = () => {
  const [isLogin, setIsLogin] = useState(false);

  const handleShowPage = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      {/* Left Form Section */}
      <section className="w-full px-6 py-12 sm:px-10 md:px-16 lg:px-20 bg-white shadow-md">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            {isLogin ? 'Create Seller Account' : 'Seller Login'}
          </h2>

          {isLogin ? <SellerAccountForm /> : <SellerLoginForm />}

          <div className="mt-8 space-y-2">
            <h3 className="text-md font-semibold text-gray-700">
              {isLogin ? 'Already have an account?' : 'New to selling?'}
            </h3>
            <p className="text-sm text-gray-500">
              {isLogin
                ? 'Login to your seller account to manage your products.'
                : 'Create a new seller account and start your business today!'}
            </p>
            <Button
              onClick={handleShowPage}
              variant="outlined"
              fullWidth
              className="!bg-gray-100 hover:!bg-gray-200 !text-gray-700 !mt-4"
            >
              {isLogin ? 'Login to your account' : 'Create a new account'}
            </Button>
          </div>
        </div>
      </section>

      {/* Right Image & Info Section */}
      <section className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-10">
        <div className="text-center space-y-6 max-w-lg">
          <h1 className="text-4xl font-bold text-gray-800">Become a Seller</h1>
          <p className="text-gray-700 text-lg">
            Join our growing community and start selling your products today. Reach thousands of customers with ease!
          </p>
          <img
            src="https://m.media-amazon.com/images/G/31/amazonservices/NSI_Hero_.webp"
            alt="Seller"
            className="rounded-xl shadow-lg w-full max-w-md mx-auto"
          />
        </div>
      </section>
    </div>
  );
};

export default BecomeSeller;
