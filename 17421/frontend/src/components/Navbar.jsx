import React, { useContext, useState } from "react";
import { assets } from "../assets/assets/assets_frontend/assets";

import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

import { Calendar, Clock, MapPin,Phone,Mail, Star, Shield,Users,
  Stethoscope,Heart,Brain,Eye,Bone,Baby,Activity,CheckCircle, ArrowRight,
  Menu, X, } from 'lucide-react'


const Navbar = () => {
  const navigate = useNavigate();

  const { token, setToken, userData } = useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);
 

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
    navigate('/')
  }

 


  return (
    <div className=" sticky top-0 z-50 flex items-center justify-around text-sm py-4  bg-white">
      {/* <img
        onClick={() => navigate("/")}
        className="cursor-pointer w-44"
        src={assets.logo}
        alt=""
      /> */}
      <div className="flex gap-2">
      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
        <Stethoscope className="w-5 h-5 text-white" />
      </div>
      <p className="text-3xl font-semibold cursor-pointer"
        onClick={() => navigate("/")}>
        MediBook 
      </p>
      </div>
      <ul className="hidden md:flex items-center gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>

      {/* .............Profile and create account................... */}

      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-8 rounded-full "
              src={userData.image}
              alt=""
            />

            {/* Dropdown icon */}
            <img className="w-2.5 " src={assets.dropdown_icon} alt="" />

            {/* Dropdown */}
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 ">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointment
                </p>
                <p
                  onClick={logout}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative group cursor-pointer">

            <button
              className="bg-primary text-white px-8 py-3 rounded-full font-bold hidden md:block "
            >
              Login
            </button>

            {/* Dropdown on hover */}
            <div className="absolute top-0 right-0 pt-12 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 ">
                  <p
                    onClick={() => {
                      window.location.href = "http://localhost:5174";
                    }}
                    className="hover:text-black cursor-pointer"
                  >
                    Admin Login
                  </p>
                  <p
                    onClick={() => {
                      window.location.href = "http://localhost:5174";
                    }}
                    className="hover:text-black cursor-pointer"
                  >
                    Doctor Login
                  </p>
                <p
                  onClick={() => navigate("/login")}
                  className="hover:text-black cursor-pointer"
                >
                 User Login
                </p>
              </div>
            </div>
          </div>
        )}
 

        <img
          onClick={() => setShowMenu(true)}
          className="w-6 sm:hidden cursor-pointer"
          src={assets.menu_icon}
          alt=""
        />

        {/* ............mobile menu........ */}

        

        <div
          className={`${
            showMenu ? "fixed w-full" : "fixed h-0 w-0"
          }md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-[width,height] duration-1000 `}
        >
          <div className="flex items-center justify-between px-5 py-6 gap-32">

            <div className="flex gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <p className="text-3xl font-semibold cursor-pointer"
                onClick={() => navigate("/")}>
                MediBook
              </p>
            </div>
            {/* <img className="w-36" src={assets.logo} alt="" /> */}
            <img
              className="w-7 cursor-pointer"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>

          {
          token && userData ? (
              <ul className="flex flex-col items-start gap-2 mt-5 px-8 text-lg font-medium hover:bg-gray-100">
                <NavLink onClick={() => setShowMenu(false)} to="/">
                  <p className="px-4 py-2 rounded inline-block">Home</p>
                </NavLink>
                <NavLink onClick={() => setShowMenu(false)} to="/doctors">
                  <p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p>
                </NavLink>
                <NavLink onClick={() => setShowMenu(false)} to="/about">
                  <p className="px-4 py-2 rounded inline-block">ABOUT</p>
                </NavLink>
                <NavLink onClick={() => setShowMenu(false)} to="/contact">
                  <p className="px-4 py-2 rounded inline-block">CONTACT</p>
                </NavLink>

                {/* <p
                  onClick={logout}
                  className="hover:text-black cursor-pointer px-4 py-2 rounded inline-block"
                >
                  Logout
                </p> */}
              </ul>
            ) : (
              <ul className="flex flex-col items-start gap-2 mt-5 px-8 text-lg font-medium hover:bg-gray-100">
                  <p className="px-4 py-2 rounded inline-block cursor-pointer"  onClick={() => {
                      window.location.href = "http://localhost:5174";
                    }}>Admin Login</p>

                    <p className="px-4 py-2 rounded inline-block cursor-pointer" onClick={() => {
                      window.location.href = "http://localhost:5174";
                    }}  >Doctor Login</p>
                  
                <NavLink onClick={() => setShowMenu(false)} to="/login">
                  <p className="px-4 py-2 rounded inline-block">Login</p>
                </NavLink>
                
                {/* <p className="px-4 py-2 rounded inline-block">Admin Login</p>
                <p className="px-4 py-2 rounded inline-block" onClick={() => navigate("/doctor-login")} >Doctor Login</p>
                <p className="px-4 py-2 rounded inline-block" onClick={() => navigate("/login")}>User Login</p> */}
                
              </ul>
            )
         }

          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
