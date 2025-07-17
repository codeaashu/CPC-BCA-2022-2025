import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const {doctors, aToken, getAllDoctors,handleDeleteDoctor} = useContext(AdminContext)
  const {changeAvailability} = useContext(AdminContext)

    // const addressObj = typeof doctors.address === "string"
    // ? JSON.parse(doctors.address)
    // : doctors.address;

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All doctors</h1>

     <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8 gap-y-10">
    {doctors.map((item, index) => (
      <div
        className=' relative border border-indigo-200 rounded-2xl min-w-[260px] min-h-[320px] overflow-hidden cursor-pointer group flex flex-col items-center shadow-lg bg-white mx-auto'
        key={index}
      >
        <div className="flex justify-center pt-8">
          <img
            className='w-20 h-20 rounded-full object-cover bg-indigo-50 group-hover:bg-primary transition-all duration-500 border-2 border-white shadow'
            src={item.image}
            alt={item.name}
          />
        </div>
        <div className='p-1 w-full'>
          <p className='text-neutral-800 text-xl font-semibold text-center'>{item.name}</p>
          <p className='text-zinc-600 text-base text-center'>{item.speciality}</p>
          <div className='mt-4 flex items-center gap-2 text-sm justify-center'>
            <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} />
            <p>Available</p>
          </div>
        </div>

        <div>
          <p className='text-sm text-gray-500'>{item.address.line1},<br /> {item.address.line2}</p>
        </div>
        <div className='absolute bottom-5 py-1 w-44 border border-red-500 rounded text-center text-red-500'>
            <button onClick={() => handleDeleteDoctor(item._id)}>delete</button>
          </div>
      </div>
    ))}
  </div>

      {/* <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctors.map((item, index) =>(
            <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
              <img className='bg-indigo-50 group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />
              <div className='p-4 '>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input onChange={() => changeAvailability(item._id)} type="checkbox"  checked={item.available}/>
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div> */}
    </div>
  )
}

export default DoctorsList