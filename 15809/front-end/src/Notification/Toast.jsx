import React from 'react';
import { Toaster, toast } from 'react-hot-toast';


export const ToastContainer = () => (
  <Toaster 
    position="top-center"
    reverseOrder={false}
    gutter={8}
    containerStyle={{
      zIndex: 9999, // Ensures toasts appear above all other elements
    }}
    toastOptions={{
      duration: 3000,
      style: {
        background: '#363636',
        color: '#fff',
        zIndex: 99999999,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        borderRadius: '8px',
      },
      success: {
        duration: 3000,
        style: {
          background: 'rgba(48, 151, 71, 0.95)',
        },
      },
      error: {
        duration: 4000,
        style: {
          background: 'rgba(205, 50, 50, 0.95)',
        },
      },
      loading: {
        duration: Infinity,
        style: {
          background: 'rgba(30, 41, 59, 0.95)',
        },
      },
    }}
  />);


export const showSuccessToast = (message) => {
  toast.success(message);
};

export const showErrorToast = (message) => {
  toast.error(message);
};

export const showLoadingToast = (message) => {
  return toast.loading(message);
};

export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};

export const showPromiseToast = (promise, { loading, success, error }) => {
  return toast.promise(promise, {
    loading,
    success,
    error,
  });
};

