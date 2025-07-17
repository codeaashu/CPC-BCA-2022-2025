import React from "react";

const NewsLetter = () => {
  return (
    <div className="w-full bg-gradient-to-br from-orange-50 to-white py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl px-6 py-10 text-center space-y-6 border border-gray-100">
        <h1 className="text-2xl md:text-4xl font-semibold text-gray-800">
          Subscribe now & get <span className="text-orange-600">20% off</span>
        </h1>
        <p className="text-sm md:text-base text-gray-500">
          Be the first to know about new arrivals, sales & exclusive offers.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-0 w-full mt-6">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full md:w-3/4 h-12 md:h-14 px-4 rounded-md md:rounded-r-none border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none text-gray-700 transition"
          />
          <button className="w-full md:w-auto h-12 md:h-14 px-6 md:px-10 bg-orange-600 text-white rounded-md md:rounded-l-none hover:bg-orange-700 transition font-medium">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
