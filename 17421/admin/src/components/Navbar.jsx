import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

import { Calendar, Clock, MapPin,Phone,Mail, Star, Shield,Users,
  Stethoscope,Heart,Brain,Eye,Bone,Baby,Activity,CheckCircle, ArrowRight,
  Menu, X, ArrowLeft, HomeIcon } from 'lucide-react'
import { useEffect } from 'react'

const Navbar = () => {

    const {aToken, setAToken} = useContext(AdminContext)
    const {dToken, setDToken} = useContext(DoctorContext)
    const navigate = useNavigate();
  

    const logout = () => {
      aToken && setAToken('')
      aToken && localStorage.removeItem('aToken')

      dToken && setDToken('')
      dToken && localStorage.removeItem('dToken')
      navigate('/');
    }
    


  return (

    <>

    {
      aToken || dToken ? (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center gap-2 text-xs'>
          <div className="flex gap-2">
            <div className="w-8 h-8  bg-blue-600 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>

          </div>
          {/* <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" /> */}
          <h1 className='text-lg md:text-3xl font-bold cursor-pointer'>MediBook</h1>
          <p className='border px-2 py-0.5 rounded-full border-gray-500 sm:px-2.5 sm:py-0.5'>{aToken ? 'Admin' : 'Doctor'}</p>
        
        </div>

        <button onClick={logout}
          className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
      </div>

        ) :(
          
            <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
              <div>
                <p className="flex gap-2 px-4 py-2 rounded-lg cursor-pointer border font-bold text-blue-500" onClick={() => {
                      window.location.href = "http://localhost:5173";
                    }} > <ArrowLeft />Home <HomeIcon className='text-blue-500' /> </p>
              </div>

              <div className='flex items-center gap-2 text-xs'>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-white" />
                  </div>

                </div>
                {/* <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" /> */}
                <h1 className='text-3xl hidden sm:block font-bold cursor-pointer'>MediBook</h1>
                <p className='border px-2.5 py-0.5 rounded-full border-gray-500'>{aToken ? 'Admin' ? dToken : 'Doctor' : "Home"}</p>
                 
                 
              </div>

              

            
            </div>
          
         )
    }
      
    </>
    
    

    

  )
}

export default Navbar