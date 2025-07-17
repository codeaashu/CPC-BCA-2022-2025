import React from 'react'
import { assets } from '../assets/assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { Calendar , ArrowUp} from 'lucide-react'

const Banner = () => {

    const navigate = useNavigate();
  return (
        < section className = "py-20 bg-blue-600 rounded-md  mx-4 sm:mx-[11%]" >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Take Control of Your Health?</h2>
                <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                    Join thousands of satisfied patients who trust MediBook for their healthcare needs. Book your first
                    appointment today and experience the difference.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={() => {navigate('/login'); scrollTo(0,0)}} size="lg" variant="secondary" className="text-lg px-8 py-4 bg-white flex rounded">
                        <ArrowUp className="w-5 h-5 mr-2" />
                        Create account
                    </button>
                    <button onClick={() => {navigate('/about')}}
                        size="lg"
                        variant="outline"
                        className="border rounded text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
                    >
                        Learn More About Us
                    </button>
                </div>
            </div>
      </section >
    // <div className='flex justify-evenly bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>
    //     {/* .........Left side.......... */}
    //     <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5 '>
    //         <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
    //             <p>Book Appointment</p>
    //             <p className='mt-4'>With 100+ Trusted Doctors</p>

    //         </div>
    //         <button 
    //          onClick={() => {navigate('/login'); scrollTo(0,0)}}
    //         className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all duration-200'>Create account</button>
    //     </div>

    //     {/* .........Right side.......... */}

    //     <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
    //         <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="" />
    //     </div>
    // </div>
  )
}

export default Banner