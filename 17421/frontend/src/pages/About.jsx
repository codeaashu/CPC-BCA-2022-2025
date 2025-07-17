import React from 'react';
import { assets } from '../assets/assets/assets_frontend/assets';

const About = () => {
  return (
    <div className="px-4 sm:px-[8%] max-w-5xl mx-auto">
      {/* Hero Title */}
      <section className="text-center py-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
          About <span className="text-primary">Us</span>
        </h2>
        <p className="mt-2 text-base text-gray-500">
          Empowering seamless healthcare for everyone
        </p>
      </section>

      {/* Image + Description */}
      <section className="flex flex-col md:flex-row items-center gap-10 md:gap-14 my-12">
        <img
          src={assets.about_image}
          alt="About us illustration"
          className="w-full md:max-w-[400px] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
        />
        <div className="flex flex-col gap-4 text-gray-700 text-sm md:w-2/3">
          <p>
            We are dedicated to revolutionizing healthcare by connecting patients
            and healthcare providers efficiently and conveniently. Our platform
            ensures seamless booking, reminders, and access to care aligned with your lifestyle.
          </p>
          <p>
            Our mission is to simplify your healthcare journey with transparency,
            trust, and technology, ensuring you receive the care you deserve when you need it.
          </p>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Our Vision</h3>
            <p>
              To create a seamless healthcare experience by bridging the gap
              between patients and healthcare providers, making it easy to
              access care whenever and wherever needed.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="text-center my-16">
        <h3 className="text-2xl font-semibold text-gray-800">
          Why <span className="text-primary">Choose Us</span>
        </h3>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mb-20">
        {[
          {
            title: 'Efficiency',
            description: 'Streamlined appointments that fit your lifestyle.',
          },
          {
            title: 'Convenience',
            description: 'Access trusted healthcare professionals easily.',
          },
          {
            title: 'Personalization',
            description: 'Tailored recommendations and health reminders.',
          },
        ].map((feature, idx) => (
          <div
            key={idx}
            className="border rounded-lg p-6 sm:p-8 flex flex-col items-start gap-2 hover:bg-primary hover:text-white transition duration-300 cursor-pointer shadow-sm hover:shadow-md"
          >
            <h4 className="text-lg font-semibold">{feature.title}</h4>
            <p className="text-sm">{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default About;
