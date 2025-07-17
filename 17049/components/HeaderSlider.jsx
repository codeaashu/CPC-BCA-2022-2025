import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offer: "Limited Time Offer 30% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: assets.header_headphone_image,
    },
    {
      id: 2,
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      offer: "Hurry up only few lefts!",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: assets.header_playstation_image,
    },
    {
      id: 3,
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      offer: "Exclusive Deal 40% Off",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: assets.header_macbook_image,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="min-w-full flex flex-col-reverse md:flex-row items-center justify-between bg-gradient-to-br from-[#e6e9f2] to-white/80 backdrop-blur-md shadow-lg rounded-xl py-10 px-6 md:px-14 md:mt-8"
          >
            {/* Left Text Content */}
            <div className="md:pl-8 mt-10 md:mt-0 md:w-1/2 space-y-3 md:space-y-5">
              <p className="text-orange-600 text-sm md:text-base">{slide.offer}</p>
              <h1 className="text-2xl md:text-4xl font-semibold leading-snug text-gray-800">
                {slide.title}
              </h1>
              <div className="flex items-center gap-4 mt-4">
                <button className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-6 py-2 md:px-10 md:py-2.5 transition duration-300 font-medium shadow-sm">
                  {slide.buttonText1}
                </button>
                <button className="group flex items-center gap-2 font-medium text-gray-700 hover:text-orange-600 transition">
                  {slide.buttonText2}
                  <Image
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    src={assets.arrow_icon}
                    alt="arrow icon"
                  />
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex items-center justify-center md:w-1/2">
              <Image
                className="md:w-72 w-48 drop-shadow-xl"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-orange-600 scale-110"
                : "bg-gray-400/40 hover:bg-gray-500/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
