import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react'


const RelatedDoctors = ({speciality, docId}) => {

    const {doctors} = useContext(AppContext);
    const [relDoc, setRelDoc] = useState([])
    
    

    const navigate = useNavigate();

    useEffect(() => {
        if(doctors.length > 0 && speciality){
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId );
            setRelDoc(doctorsData)
        }
    },[doctors, speciality, docId])

    // console.log(relDoc);
    

  return (
    
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium'>Related Doctors to Book</h1>
        <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors</p>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 gap-y-10 px-3 sm:px-0">
  {relDoc.slice(0, 5).map((item, index) => (
    <div
      onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0); }}
      className="border border-blue-200 rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 bg-[#F9FAFB] shadow-lg flex flex-col min-h-[380px] max-w-[420px] w-full mx-auto"
      key={index}
    >
      <div className="flex justify-center pt-8">
        <img
          className="w-24 h-24 rounded-full object-cover bg-blue-50 border-4 border-white shadow"
          src={item.image}
          alt={item.name}
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div
          className={`flex items-center gap-2 text-sm justify-center mb-3 ${
            item.available ? "text-green-500" : "text-gray-500"
          }`}
        >
          <span
            className={`w-2 h-2 ${
              item.available ? "bg-green-500" : "bg-gray-400"
            } rounded-full inline-block`}
          />
          {item.available ? (
            <span>Available</span>
          ) : (
            <span>Not Available</span>
          )}
        </div>
        <p className="text-gray-900 text-xl font-semibold text-center">
          {item.name}
        </p>
        <p className="text-gray-600 text-base text-center">
          {item.speciality}
        </p>
        <div className="flex-grow" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/appointment/${item._id}`);
          }}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
        >
          Book Appointment
          {/* If you use lucide-react or similar for ArrowRight: */}
          <ArrowRight className="inline-block ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  ))}
</div>


        {/* <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {relDoc.slice(0,5).map((item, index) => (
                <div 
                onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(0,0)}}
                 className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                    <img className='bg-blue-50' src={item.image} alt="" />
                    <div className='p-4'>
                        <div className={`flex items-center gap-2 text-sm text-center ${item.available ?  'text-green-500' : 'text-gray-500' }`}>
                            <p className={`w-2 h-2 ${item.available ?  'bg-green-500' : 'bg-gray-500' } rounded-full`}></p>{ item. available ?<p>Available</p> :<p>Not Available</p>}
                        </div>
                        <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                        <p className='text-gray-600 text-sm'>{item.speciality}</p>
                    </div>
                </div>
            ))}
        </div> */}
    </div>
  )
}

export default RelatedDoctors