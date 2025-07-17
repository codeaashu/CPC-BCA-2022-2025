import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const {aToken, dashData, getDashData, cancelAppointmentAdmin} = useContext(AdminContext)

  const {slotDateFormat} = useContext(AppContext)

  useEffect(() => {

    if (aToken) {
      getDashData()
    }
  },[aToken])


  return dashData &&  (
    <div className="mx-2 md:mx-5 my-4 space-y-6">

  {/* Stats Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <div className="flex items-center gap-3 bg-white p-4 rounded border border-gray-200 cursor-pointer hover:scale-105 transition-all duration-300">
      <img className="w-14" src={assets.doctor_icon} alt="Doctor Icon" />
      <div>
        <p className="text-xl font-semibold text-gray-600">{dashData.doctors}</p>
        <p className="text-gray-400">Doctors</p>
      </div>
    </div>

    <div className="flex items-center gap-3 bg-white p-4 rounded border border-gray-200 cursor-pointer hover:scale-105 transition-all duration-300">
      <img className="w-14" src={assets.appointments_icon} alt="Appointments Icon" />
      <div>
        <p className="text-xl font-semibold text-gray-600">{dashData.appointments}</p>
        <p className="text-gray-400">Appointments</p>
      </div>
    </div>

    <div className="flex items-center gap-3 bg-white p-4 rounded border border-gray-200 cursor-pointer hover:scale-105 transition-all duration-300">
      <img className="w-14" src={assets.patients_icon} alt="Patients Icon" />
      <div>
        <p className="text-xl font-semibold text-gray-600">{dashData.patient}</p>
        <p className="text-gray-400">Patients</p>
      </div>
    </div>
  </div>

  {/* Latest Bookings */}
  <div className="bg-white rounded border overflow-x-auto">
    <div className="flex items-center gap-2.5 px-4 py-4 rounded-t border-b">
      <img src={assets.list_icon} alt="List Icon" className="w-5 h-5" />
      <p className="font-semibold">Latest Booking</p>
    </div>

    <div className="divide-y">
      {dashData.latestAppointments.slice().reverse().map((item, index) => (
        <div
          key={index}
          className="flex items-center px-4 sm:px-6 py-3 gap-3 hover:bg-gray-50 transition-colors"
        >
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={item.docData.image}
            alt={item.docData.name}
          />
          <div className="flex-1 text-sm">
            <p className="text-gray-800 font-medium">{item.docData.name}</p>
            <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
          </div>

          {item.cancelled ? (
            <p className="text-red-500 text-sm font-medium">Cancelled</p>
          ) : item.isCompleted ? (
            <p className="text-green-500 text-sm font-medium">Completed</p>
          ) : (
            <img
              onClick={() => cancelAppointmentAdmin(item._id)}
              className="w-8 sm:w-10 cursor-pointer"
              src={assets.cancel_icon}
              alt="Cancel Icon"
            />
          )}
        </div>
      ))}
    </div>
  </div>
</div>

  )
}

export default Dashboard