import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { ArrowRight, Calendar } from 'lucide-react'


const Doctors = () => {

  const {speciality} = useParams();

  // console.log(speciality);
  const [filterDoc, setFilterDoc] = useState([])

  const [showFilter, setShowFilter] = useState(false)

  const navigate = useNavigate();

  const {doctors} = useContext(AppContext)


  const applyFilter = () => {
    if(speciality){
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    }

    else{
      setFilterDoc(doctors)
    }
  }

  useEffect(() =>{
      applyFilter();
  },[doctors, speciality])
  
  return (
    <div className='mx-4 sm:mx-[11%]'>
      <p className="text-gray-600"> doctor specialities.</p>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button className={`px-1 py-1 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white': ""}`} onClick={() => setShowFilter(prev => !prev)}>Filters</button>
        <div className={` flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p
            onClick={() =>
              speciality === "General physician"
                ? navigate(`/doctors`)
                : navigate(`/doctors/General physician`)

            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician"
                ? "bg-indigo-100 text-black"
                : ""
              }`}
          >
            General physician
          </p>
          <p
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("./doctors")
                : navigate("/doctors/Gynecologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""
              }`}
          >
            Gynecologist
          </p>
          <p
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("./doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""
              }`}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate(`/doctors`)
                : navigate("/doctors/Pediatricians")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""
              }`}
          >
            Pediatricians
          </p>
          <p
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("./doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""
              }`}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("./doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist"
                ? "bg-indigo-100 text-black"
                : ""
              }`}
          >
            Gastroenterologist
          </p>
        </div>

        
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 gap-y-10 px-3 sm:px-0">
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
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
                  Book Appointment <ArrowRight className="inline-block ml-2 w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              key={index}
            >
              <img className="bg-blue-50" src={item.image} alt="" />
              <div className="p-4">
                <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500'  : 'text-gray-500'}`}>
                  <p className={`w-2 h-2 ${item.available ? 'bg-green-500'  : 'bg-gray-500'} rounded-full`}></p>

                  {
                    item.available ? <p>Available</p> : <p > Not available</p>
                  }
                  
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default Doctors