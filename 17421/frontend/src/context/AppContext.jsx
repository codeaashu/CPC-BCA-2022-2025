import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = '$';
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    // console.log(backendUrl);

    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)

    const [userData, setUserData] = useState(false)


    const getDoctorsData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/doctor/list')
            // const {data} = await axios.get(backendUrl + '/api/doctor/list')
            console.log(data);
            
            if (data.success) {
                setDoctors(data.doctors)
                // console.log(data);
                
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
           console.log(error);
           toast.error(error.message)
           
        }
    }

    const loadUserProfileData = async () => {
         try {

            const {data} = await axios.get(backendUrl + '/api/user/get-profile', {headers:{token}})
            // console.log(data);

            if (data.success) {
                setUserData(data.userData)                
            }
            else{
                toast.error(data.message)
            }
            
         } catch (error) {
            console.log(error);
           toast.error(error.message)
         }
    }

    const value = {
        doctors,getDoctorsData,
        currencySymbol,
        // setDoctors,
        token,setToken,
        backendUrl, 
        userData,
        setUserData,
        loadUserProfileData
        
    }

    useEffect(() =>{
        getDoctorsData()
    },[])

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        }
        else{
            setUserData(false)
        }
    },[token])

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;