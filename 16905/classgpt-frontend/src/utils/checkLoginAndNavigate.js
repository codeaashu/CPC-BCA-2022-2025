// src/utils/checkLoginAndNavigate.js
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const useProtectedRedirect = () => {
  const isLoggedIn = useAuthStore((s) => !!s.user);
  const toggleModal = useAuthStore((s) => s.toggleModal);
  const navigate = useNavigate();

  const tryNavigate = (path) => {
    if (!isLoggedIn) {
      toast.error("⚠️ Please log in first!");
      toggleModal();
    } else {
      navigate(path);
    }
  };

  return tryNavigate;
};
