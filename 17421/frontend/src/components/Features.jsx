import React from 'react'
import { Calendar,Shield,Clock,MapPin,Activity ,Users} from 'lucide-react'

const Features = () => {
  return (
    <div>
      <section className="py-20 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose MediBook?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience healthcare like never before with our comprehensive
              platform designed for your convenience and peace of mind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white shadow-xl rounded-xl p-6 max-w-sm flex flex-col items-start space-y-4 hover:shadow-gray-300">
              <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                <Calendar className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 text-center ">
                Easy Booking
              </h3>
              <p className="text-gray-500 text-sm leading-tight">
                Book appointments in just a few clicks. Choose your preferred
                time slot and get instant confirmation.
              </p>
            </div>

            <div className="bg-white shadow-xl rounded-xl p-6 max-w-sm flex flex-col items-start space-y-4 hover:shadow-gray-300">
              <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                <Shield className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 text-center ">
                Verified Doctors
              </h3>
              <p className="text-gray-500 text-sm leading-tight">
                All our doctors are licensed, verified, and have years of experience in their respective fields.
              </p>
            </div>
            
            <div className="bg-white shadow-xl rounded-xl p-6 max-w-sm flex flex-col items-start space-y-4 hover:shadow-gray-300">
              <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                <Clock className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 text-center ">
                24/7 Support
              </h3>
              <p className="text-gray-500 text-sm leading-tight">
                Round-the-clock customer support to help you with any queries or emergency situations.
              </p>
            </div>

            <div className="bg-white shadow-xl rounded-xl p-6 max-w-sm flex flex-col items-start space-y-4 hover:shadow-gray-300">
              <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                <MapPin className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 text-center ">
                Multiple Locations
              </h3>
              <p className="text-gray-500 text-sm leading-tight">
                Find doctors and clinics near you with our extensive network across the city.
              </p>
            </div>

            <div className="bg-white shadow-xl rounded-xl p-6 max-w-sm flex flex-col items-start space-y-4 hover:shadow-gray-300">
              <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                <Activity className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 text-center ">
               Health Records
              </h3>
              <p className="text-gray-500 text-sm leading-tight">
                Secure digital health records accessible anytime, anywhere for better continuity of care.
              </p>
            </div>
            
            <div className="bg-white shadow-xl  hover:shadow-gray-300 rounded-xl p-6 max-w-sm flex flex-col items-start space-y-4">
              <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                <Users className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 text-center ">
               Family Care
              </h3>
              <p className="text-gray-500 text-sm leading-tight">
                Manage appointments for your entire family from a single account with ease.
              </p>
            </div>


          </div>
          




        </div>
      </section>
    </div>
  );
}

export default Features