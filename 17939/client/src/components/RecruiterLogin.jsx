import { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const RecruiterLogin = () => {
  const navigate = useNavigate();

  const [state, setState] = useState('Login');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(false);
  const [isTextDataSubmited, setIsTextDataSubmited] = useState(false);

  const {
    setShowRecruiterLogin,
    backendUrl,
    setCompanyToken,
    setCompanyData,
  } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // ✅ Validate email format (must include @ and .com or other domain)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email address");
    }

    if (state === 'Sign Up' && !isTextDataSubmited) {
      return setIsTextDataSubmited(true);
    }

    try {
      if (state === 'Login') {
        const { data } = await axios.post(backendUrl + '/api/company/login', {
          email,
          password,
        });

        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem('companyToken', data.token);
          setShowRecruiterLogin(false);
          navigate('/dashboard');
        } else {
          toast.error(data.message);
        }
      } else {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('password', password);
        formData.append('email', email);
        formData.append('image', image);

        const { data } = await axios.post(
          backendUrl + '/api/company/register',
          formData
        );

        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem('companyToken', data.token);
          setShowRecruiterLogin(false);
          navigate('/dashboard');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'unset');
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key="recruiter-login"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
        className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center"
      >
        <motion.form
          onSubmit={onSubmitHandler}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-white p-10 rounded-xl text-slate-500 shadow-xl"
        >
          <h1 className="text-center text-2xl text-neutral-700 font-medium">
            Recruiter {state}
          </h1>
          <p className="text-sm mb-4">
            Welcome back! Please sign in to continue
          </p>

          {state === 'Sign Up' && isTextDataSubmited ? (
            <div className="flex items-center gap-4 my-6">
              <label htmlFor="image">
                <img
                  className="w-16 rounded-full"
                  src={
                    image ? URL.createObjectURL(image) : assets.upload_area
                  }
                  alt="Upload Logo"
                />
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                />
              </label>
              <p>
                Upload Company <br /> logo
              </p>
            </div>
          ) : (
            <>
              {state !== 'Login' && (
                <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                  <img src={assets.person_icon} alt="" />
                  <input
                    className="outline-none text-sm"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    placeholder="Company Name"
                    required
                  />
                </div>
              )}

              <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                <img src={assets.email_icon} alt="" />
                <input
                  className="outline-none text-sm"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Email Id"
                  required
                />
              </div>

              <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                <img src={assets.lock_icon} alt="" />
                <input
                  className="outline-none text-sm"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
            </>
          )}

          {/* Forgot Password Link */}
          {state === 'Login' && (
            <p
              className="text-sm text-blue-600 mt-4 cursor-pointer hover:underline transition"
              onClick={() => {
                setShowRecruiterLogin(false);
                navigate('/recruiter-forgot-password');
              }}
            >
              Forgot password?
            </p>
          )}

          <button
            type="submit"
            className="bg-blue-600 w-full text-white py-2 rounded-full mt-4 transition hover:bg-blue-700"
          >
            {state === 'Login'
              ? 'Login'
              : isTextDataSubmited
              ? 'Create Account'
              : 'Next'}
          </button>

          <p className="mt-5 text-center">
            {state === 'Login' ? (
              <>
                Don&apos;t have an account?{' '}
                <span
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={() => setState('Sign Up')}
                >
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <span
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={() => setState('Login')}
                >
                  Login
                </span>
              </>
            )}
          </p>

          <img
            onClick={() => setShowRecruiterLogin(false)}
            className="absolute top-5 right-5 cursor-pointer"
            src={assets.cross_icon}
            alt="Close"
          />
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
};

export default RecruiterLogin;
