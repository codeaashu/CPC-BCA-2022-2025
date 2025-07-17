import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '' );

    const [doctors, setDoctors] = useState([])
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(false)
    const [users, setUsers] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async () => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/all-doctors', {}, {headers:{aToken}})
            
            if (data.success) {
                setDoctors(data.doctors)
                console.log(data.doctors);
                
            }
            else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeAvailability = async (docId) => {
        try {

            const {data} = await axios.post(backendUrl + '/api/admin/change-availability', {docId}, {headers:{aToken}})
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            }
            else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAllAppointments = async () => {

        try {

            const {data} = await axios.get(backendUrl + '/api/admin/appointments', {headers:{aToken}})

            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments)
            }
            else{
                toast.error(data.message)
            }

            
        } catch (error) {
            toast.error(error.message)
            
        }
    }

    const cancelAppointmentAdmin = async (appointmentId) => {

        try {
            
            const {data} = await axios.post(backendUrl + '/api/admin/cancel-appointment',  {appointmentId}, {headers:{aToken}})

            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
            }
            else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }


    const getDashData = async () => {
        
        try {

            const {data} = await axios.get(backendUrl + '/api/admin/dashboard', {headers:{aToken}})
            // console.log(data.dashData);
            

            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData);
                
            }
            else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }


    const getAllUsers = async () => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/all-patients', {}, {headers:{aToken}})
            
            if (data.success) {
                setUsers(data.users)
                console.log(data.users);
                
            }
            else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleDeletePatient = async (id) => {
        try {
            const { data } = await axios.delete(
                backendUrl + '/api/admin/delete-patient',{headers: { aToken },data: { userId: id }}
            );

            // console.log(data);

            if (data.success) {
                // console.log("Patient deleted:", data.user);
                setUsers((prev) => prev.filter((p) => p._id !== id));
                toast.success('user deleted')
            } else {
                // console.error("Failed to delete patient:", data.message);
                toast.error(data.message)
            }
        } catch (error) {
            console.error("Error deleting patient:", error.message);
        }
    };

    const handleDeleteDoctor = async (id) => {
        try {
            const { data } = await axios.delete(
                backendUrl + '/api/admin/delete-doctor',{headers: { aToken }, data: { docId: id }}
            );

            // console.log(data);

            if (data.success) {
                // console.log("doctor deleted:", data.doctor);
                setDoctors((prev) => prev.filter((p) => p._id !== id));
                toast.success('deleted', data.message)
            } else {
                console.error("Failed to delete doctor:", data.message);
                toast.error(data.message)
            }
        } catch (error) {
            console.error("Error deleting doctor:", error.message);
        }
    };


    const value ={
        aToken,setAToken,
        backendUrl,doctors,getAllDoctors,changeAvailability,

        appointments,setAppointments, getAllAppointments,cancelAppointmentAdmin,

        dashData,setDashData, getDashData,
        users,setUsers,getAllUsers,
        handleDeletePatient,
        handleDeleteDoctor, setDoctors
    }

    return (
        <AdminContext.Provider value={value} >
            {props.children}
        </AdminContext.Provider>
    )
}
export default AdminContextProvider;