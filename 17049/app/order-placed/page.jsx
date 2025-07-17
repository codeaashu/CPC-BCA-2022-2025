'use client';
import { assets } from '@/assets/assets';
import { useAppContext } from '@/context/AppContext';
import Image from 'next/image';
import { useEffect } from 'react';

const OrderPlaced = () => {
  const { router } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/my-orders');
    }, 9000);

    return () => clearTimeout(timer); 
  }, [router]);

  return (
    <div className='h-screen flex flex-col justify-center items-center gap-5 bg-white text-gray-800'>
      <div className="flex justify-center items-center relative">
        <Image
          className="absolute p-5"
          src={assets.checkmark}
          alt="Order Success Checkmark"
        />
        <div className="animate-spin rounded-full h-24 w-24 border-4 border-t-green-300 border-gray-200"></div>
      </div>

      <div className="text-center text-2xl font-semibold">
        Order Placed Successfully
      </div>

      <p className="text-sm text-gray-500">Redirecting to your orders in a few seconds...</p>
      <button
        onClick={() => router.push('/my-orders')}
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Go to My Orders Now
      </button>
    </div>
  );
};

export default OrderPlaced;
