import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const MyAppointment = () => {

  const {backendUrl,  token, getDoctorsData} = useContext(AppContext)

  const [appointments, setAppointments]  = useState([]);
  const navigate = useNavigate()

  const getUserAppointments = async () => {
    try {
      
      const {data} = await axios.get(backendUrl + '/api/user/appointments', {headers:{token}})

      // console.log(data);
      

      if (data.success) {
        setAppointments(data.appointments)
        // console.log(data.appointments);
        
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {

      console.log(appointmentId);

      const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment', {appointmentId}, {headers:{token}})

      if (data.success) {
        toast.success(data.message)
        getUserAppointments();
        getDoctorsData();

      }
      else{
        toast.error(data.message)
      }
      
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Patment",
      order_id: order.id,
      receipt: order.receipt,

      handler: async (response) => {

        console.log(response);
        // { razorpay_payment_id, razorpay_order_id, razorpay_signature }
        try {
          
          const {data} = await axios.post(backendUrl + '/api/user/verifyRazorpay', response, {headers:{token}})

          if (data.success) {
            getUserAppointments()
            navigate('/my-appointments')
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message)
          
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

 const paymentAppointment = async (appointmentId) => {
  try {
    const { data } = await axios.post(
      backendUrl + '/api/user/payment-razorpay',
      { appointmentId },
      { headers: { token } }
    );

    if (data.success) {
      toast.success("Payment order created, opening Razorpay...");
      initPay(data.order);
      console.log(data.order);
      
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};


  useEffect(() =>{
    if (token) {
      getUserAppointments();
    }
  },[token])
  return (
    <div className=' mx-4 sm:mx-[11%]'>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointment</p>

      <div>
        {
          appointments.slice().reverse().map((item, index) => (
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div>
                <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
              </div>

              <div className='flex-1 text-sm text-zinc-0'>
                <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address</p>
                <p className='text-xs'>{item.docData.address.line1}</p>
                <p className='text-xs'>{item.docData.address.line2}</p>
                <p className='text-sm mt-1'> <span className='text-sm text-neutral-700 font-medium'>Date & Time: {item.slotDate} |  {item.slotTime} </span></p>
              </div>

              <div></div>

              <div className='flex flex-col gap-2 justify-end'>
                {!item.cancelled && item.payment && <button className=' sm:min-w-48 py-2 border rounded text-stone-500 bg-gray-300'>Paid</button>}
                {!item.cancelled && !item.isCompleted && !item.payment && <button onClick={() =>paymentAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>}
                
                {
                !item.cancelled && !item.isCompleted && <button  onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel appointment</button>
                }

                {
                  item.cancelled && !item.isCompleted &&  <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancelled</button>
                }

                {item.isCompleted && <button className='sm:min-w-48 py-2 border  border-green-500 rounded text-green-500'>Completed</button>}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointment