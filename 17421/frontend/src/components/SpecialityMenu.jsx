import React from 'react'

import { specialityData } from '../assets/assets/assets_frontend/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <section id='speciality' className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Medical Specialties
          </h2>
          <p className="text-xl text-gray-600">
            Find specialists across various medical fields
          </p>
        </div>

        <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
          {specialityData.map((specialty, index) => (
            
            <Link
              key={index}
              to={`/doctors/${specialty.speciality}`}  onClick={() => scrollTo(0,0)}
              className="bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer group rounded-xl p-6 text-center"
            >
              <div
                className={`w-16 h-16  rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
              >
                <img src={specialty.image} alt="" />
                {/* <specialty.icon className="w-8 h-8" /> */}
              </div>
              <h3 className="font-semibold text-gray-600">{specialty.speciality}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>

    // <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-gray-800'>
    //     <h1 className='text-3xl font-medium'>Medical Specialties</h1>
    //     <p className='w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free </p>

    //     <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
    //         {specialityData.map((item, index) => (
    //             <Link key={index} to={`/doctors/${item.speciality}`}  onClick={() => scrollTo(0,0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' >
    //                 <img className='w-16 sm:w-24 mb-2' src={item.image} alt="" />
    //                 <p>{item.speciality}</p>
    //             </Link>
    //         ))}
    //     </div>
    // </div>
  );
}

export default SpecialityMenu