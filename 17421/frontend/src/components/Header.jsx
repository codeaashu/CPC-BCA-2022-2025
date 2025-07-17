import {React, useEffect, useState, useContext} from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets/assets_frontend/assets'
import { Button } from '@mui/material'
import { ArrowRight, Calendar } from 'lucide-react' // Uncomment if you want to use an icon
import { Navigate } from 'react-router-dom'


const Header = () => {

  const { backendUrl, token } = useContext(AppContext)
  const [latestAppointment, setLatestAppointment] = useState(null)



  useEffect(() => {
    const fetchLatestAppointment = async () => {
      try {
        const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
        if (data.success && data.appointments.length > 0) {
          // Filter out cancelled appointments using the cancelled boolean
          const validAppointments = data.appointments.filter(app => !app.cancelled);
          if (validAppointments.length > 0) {
            const sorted = [...validAppointments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setLatestAppointment(sorted[0]);
          } else {
            setLatestAppointment(null);
          }
        }
      } catch (error) {
        toast.error('Failed to fetch latest appointment')
      }
    }
    if (token) fetchLatestAppointment()
  }, [token, backendUrl])


  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-10 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Side */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Your Health, Our Priority
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-4 sm:mt-6 leading-relaxed">
              Book appointments with top-rated doctors instantly. Quality healthcare made accessible, convenient, and affordable for everyone.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 w-full">
              <button
                size="lg"
                className="text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white rounded hover:shadow-blue-300 shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
              >
                <Calendar className="w-5 h-5 mr-2" />
               <a href="#speciality">Book Appointment Now</a> <ArrowRight className="w-5 h-5 mr-2 ml-2" /> 
              </button>
              {/* <button variant="outline" size="lg" className="text-lg px-8 py-4 bg-transparent ">
                Find Doctors Near You
              </button> */}
            </div>

            <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-8">
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">500+</div>
                <div className="text-gray-600 text-xs sm:text-sm">Expert Doctors</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">50K+</div>
                <div className="text-gray-600 text-xs sm:text-sm">Happy Patients</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">4.9</div>
                <div className="text-gray-600 text-xs sm:text-sm">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="relative flex justify-center mt-10 lg:mt-0">
            <div className="w-[250px] h-[250px] xs:w-[320px] xs:h-[320px] sm:w-[400px] sm:h-[400px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] rounded-2xl shadow-2xl bg-[#EAEAEA] flex items-center justify-center mx-auto">
              <img
                className="w-40 xs:w-56 sm:w-72 md:w-80 lg:w-96 opacity-50"
                src={assets.symboldoct3}
                alt=""
              />
            </div>

            <div className="absolute -bottom-4 sm:-bottom-6 -left-2 sm:-left-6 bg-white p-2 sm:p-4 rounded-xl shadow-lg min-w-[180px]">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center overflow-hidden">
                  {latestAppointment?.docData?.image ? (
                    <img
                      src={latestAppointment.docData.image}
                      alt={latestAppointment.docData.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <img src={assets.symboledoc1} alt="" className="w-6 h-6 sm:w-8 sm:h-8" />
                  )}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-xs sm:text-base">
                    Appointment Confirmed
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    {latestAppointment?.docData?.name
                      ? `${latestAppointment.docData.name} - ${latestAppointment.slotTime || ''}`
                      : 'No recent appointment'}
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="absolute -bottom-4 sm:-bottom-6 -left-2 sm:-left-6 bg-white p-2 sm:p-4 rounded-xl shadow-lg min-w-[180px]">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <img src={assets.symboledoc1} alt="" className="w-6 h-6 sm:w-8 sm:h-8" />
                  
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-xs sm:text-base">Appointment Confirmed</div>
                  <div className="text-xs sm:text-sm text-gray-600">Dr. Sarah Johnson - 2:00 PM</div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Header