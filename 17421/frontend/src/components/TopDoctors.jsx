import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ArrowRight, Calendar } from 'lucide-react'

const TopDoctors = () => {
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);
  return (
    // Top doctors

    <div className="mx-4 sm:mx-[10%] ">
      <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10  ">
        <h1 className="text-3xl md:text-4xl font-bold">Meet Our Top Doctors</h1>
        <p className="sm:w-1/3 text-center text-sm">
         Experienced professionals dedicated to your health and wellbeing
        </p>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 gap-y-10 px-3 sm:px-0">
          {doctors.slice(0, 6).map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-200 rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 bg-white shadow-lg flex flex-col min-h-[380px] max-w-[420px] w-full mx-auto"
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

        <button
          onClick={() => {
            navigate("/doctors");
            scrollTo(0, 0);
          }}
          className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
        >
          View All Doctors <ArrowRight className="inline-block ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TopDoctors;
