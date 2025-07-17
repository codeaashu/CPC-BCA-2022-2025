import React from 'react'
import Login from './pages/Login';
 import { ToastContainer, toast } from 'react-toastify';
import { useContext } from 'react';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import PatientsList from './pages/Admin/PatientsList';


const App = () => {

  const {aToken} = useContext(AdminContext)
  const {dToken}  = useContext(DoctorContext)

  return aToken || dToken? (
    <div className='bg-[#f8f9fd]' >
     <ToastContainer />
     <Navbar />
     <div className='flex items-start'>
      <Sidebar />
      <Routes>
        {/* Admin Route */}
        <Route path='/' element={<></>} />
        <Route path='/admin-dashboard' element={<Dashboard />} />
        <Route path='/all-appointments' element={<AllAppointments />} />
        <Route path='/add-doctor' element={<AddDoctor />} />
        <Route path='/doctor-list' element={<DoctorsList />} />
        <Route path='/patient-list' element={<PatientsList />}/>


        {/* Doctor Route */}
        <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
        <Route path='/doctor-appointments' element={<DoctorAppointments />} />
        <Route path='/doctor-profile' element={<DoctorProfile />} />
      </Routes>
     </div>
    </div>
  ) : (
    <>
     <Navbar />
      <Login />
      <ToastContainer />
    </>
  )
}

export default App