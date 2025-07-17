import React from 'react'
import { Stethoscope } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10 md:gap-0">
          {/* Left Section */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0">
            <div className="flex items-center gap-2 mb-4 cursor-pointer">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-black">MediBook</span>
            </div>
            <p className="text-gray-600 leading-6 max-w-xs md:max-w-sm">
              Making quality healthcare accessible to everyone through technology and compassionate care.
            </p>
          </div>

          {/* Center Section */}
          <div className="flex-1 flex flex-col items-center md:items-center mb-8 md:mb-0">
            <p className="text-lg font-semibold mb-4 text-gray-900">Company</p>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li className="hover:text-blue-600 cursor-pointer">Home</li>
              <li className="hover:text-blue-600 cursor-pointer">About us</li>
              <li className="hover:text-blue-600 cursor-pointer">Contact us</li>
              <li className="hover:text-blue-600 cursor-pointer">Privacy policy</li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="flex-1 flex flex-col items-center md:items-end">
            <p className="text-lg font-semibold mb-4 text-gray-900">Get in Touch</p>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li>
                <a href="tel:8809679377" className="hover:text-blue-600">8809679377</a>
              </li>
              <li>
                <a href="mailto:ritesh@gmail.com" className="hover:text-blue-600">ritesh@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-gray-200" />
        <p className="text-center text-xs text-gray-500 pb-2">
          &copy; 2025 Appointment - All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer