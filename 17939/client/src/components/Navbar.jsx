import { useContext } from 'react';
import { assets } from '../assets/assets';
// import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  // const { openSignIn } = useClerk();
  // const { user } = useUser();
  const navigate = useNavigate();

  const {
    setShowRecruiterLogin,
    userToken,
    userData,
  } = useContext(AppContext);

  return (
    <div className="shadow-md backdrop-blur-md bg-white/70 sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 2xl:px-20 py-3 flex justify-between items-center">

        {/* 🔵 Logo */}
        <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer">
          <img src={assets.logo} alt="CareerConnect Logo" className="h-10 w-auto drop-shadow-md rounded-md" />
          <h1 className="text-xl sm:text-2xl font-bold text-blue-600 hover:text-blue-700 transition duration-200">
            Career<span className="text-green-500">Connect</span>
          </h1>
        </div>

        {/* 🟢 Center Nav Links */}
        <div className="hidden md:flex gap-8 text-gray-700 font-medium text-base animate-fade-in-down">
          <Link to="/" className="hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition duration-200">
            Home
          </Link>
          <Link to="/services" className="hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition duration-200">
            Services
          </Link>
          <Link to="/about" className="hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition duration-200">
            About
          </Link>
          <Link to="/contact" className="hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition duration-200">
            Contact
          </Link>
        </div>

        {/* 🧑‍💼 Auth Buttons */}
        {userToken && userData ? (
          <div className="flex items-center gap-3">
            <Link to="/applications" className="text-gray-700 hover:text-blue-600 font-medium transition duration-200">
              Applied Jobs
            </Link>
            <p className="text-gray-400">|</p>
            <p className="max-sm:hidden text-gray-700 font-medium">
              Hi, {userData.name}
            </p>
            {/* <UserButton /> */}
            <button
              onClick={() => {
                localStorage.removeItem('careerconnect-user-token');
                window.location.reload();
              }}
              className="ml-3 text-red-500 hover:text-red-700 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3 max-sm:text-xs">

            {/* Signup + Login Group */}
            <div className="flex gap-2 items-center">
              <button
                onClick={() => navigate('/register')}
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-1.5 rounded-full transition duration-200"
              >
                Signup
              </button>
              <button
                onClick={() => navigate('/login')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-1.5 rounded-full transition duration-200"
              >
                Login
              </button>
            </div>

            {/* Divider */}
            <span className="text-gray-400 font-semibold px-2">||</span>

            {/* Recruiter Login */}
            <button
              onClick={() => setShowRecruiterLogin(true)}
              className="text-gray-700 hover:text-black hover:underline transition duration-150 font-medium"
            >
              Recruiter Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
