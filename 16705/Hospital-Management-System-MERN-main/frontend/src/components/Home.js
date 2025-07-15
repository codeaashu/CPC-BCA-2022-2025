import React from 'react';
import { Calendar, Clipboard, Cog, DollarSign, HeartPulse, Hospital, Shield, User, Users, Clock, ChartBar, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Button = ({ children, primary, onClick, ...props }) => (
  <button
    className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
      primary
        ? 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
        : 'text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500'
    }`}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ icon: Icon, title, description, primary }) => (
  <div className={`rounded-lg shadow-md p-6 ${primary ? 'bg-white' : 'bg-gray-100'}`}>
    <Icon className="w-8 h-8 text-blue-600 mb-4" />
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <Button primary>Explore</Button>
  </div>
);

const Section = ({ children, bg, height }) => (
  <section className={`${height || 'py-20'} ${bg} content-center`}>
    <div className="container mx-auto px-4 h-full">
      {children}
    </div>
  </section>
);

const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = (route) => {
    navigate(route);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-6 py-4 bg-white">
        <div className="flex items-center gap-2">
          <Hospital className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-bold">Hospital Management System</span>
        </div>
        <nav className="flex items-center gap-4">
          <Button primary onClick={() => handleButtonClick('/login')}>Login</Button>
          <Button onClick={() => handleButtonClick('/signup')}>Sign Up</Button>
        </nav>
      </header>
      
      <main className="flex-1">
        <Section bg="bg-blue-600" height="min-h-[30rem]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
            <div>
              <h1 className="text-5xl font-bold text-white mb-6 text-left">
                Streamline Your Hospital Management
              </h1>
              <p className="text-xl text-white mb-10 text-left">
                Our comprehensive hospital management system helps you optimize patient care, streamline operations,
                and improve overall efficiency.
              </p>
              <div className="flex gap-4 justify-left">
                <Button primary onClick={() => handleButtonClick('/login')}>Explore Features</Button>
                <Button onClick={() => handleButtonClick('/login')}>Appointments</Button>
              </div>
            </div>
            <div className="bg-gray-200 w-full h-full min-h-[20rem] rounded-lg overflow-hidden">
              <img src="home-1.jpeg" alt="" />
            </div>
          </div>
        </Section>

        <Section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: User, title: "Patient Management", description: "Efficiently manage patient records, appointments, and medical history." },
              { icon: Hospital, title: "Doctor Management", description: "Manage doctor profiles, schedules, and patient assignments." },
              { icon: Calendar, title: "Appointment Scheduling", description: "Streamline appointment booking and management for patients and doctors." }
            ].map((card, index) => (
              <Card key={index} {...card} primary />
            ))}
          </div>
        </Section>

        <Section bg="bg-gray-100" height="min-h-[25rem]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="bg-gray-200 w-full h-64 min-h-[18rem] rounded-lg overflow-hidden flex justify-center items-center">
              <img src="home-2.jpeg" alt="" className='w-full'/>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4 text-left">Modernize Your Hospital Operations</h2>
              <p className="text-xl text-gray-600 mb-8 text-left">
                Our hospital management system provides cutting-edge features to streamline your workflows, improve
                patient satisfaction, and drive better outcomes.
              </p>
              <div className="flex gap-4 justify-left">
                <Button primary onClick={() => handleButtonClick('/login')}>Explore Features</Button>
                <Button onClick={() => handleButtonClick('/login')}>Appointments</Button>
              </div>
            </div>
          </div>
        </Section>

        <Section>
          <h2 className="text-3xl font-bold mb-12 text-center">
            Why Choose Our Hospital Management System?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Clipboard, title: "Improved Efficiency", description: "Our system streamlines administrative tasks, reducing paperwork and improving overall hospital efficiency." },
              { icon: Users, title: "Enhanced Patient Care", description: "With comprehensive patient records and intelligent scheduling, our system helps you provide better care to your patients." },
              { icon: DollarSign, title: "Cost Savings", description: "Our hospital management system helps you optimize operations and reduce overhead costs, leading to significant cost savings." },
              { icon: HeartPulse, title: "Improved Patient Outcomes", description: "By streamlining processes and enhancing patient care, our system helps you improve overall patient outcomes and satisfaction." },
              { icon: Shield, title: "Secure Data Management", description: "Our system ensures the security and confidentiality of all patient data, with robust encryption and access controls." },
              { icon: Cog, title: "Customizable Solutions", description: "Our system is highly configurable, allowing you to tailor it to your specific hospital's needs and workflows." },
              { icon: Clock, title: "Time-Saving Features", description: "Automate routine tasks and streamline workflows to save valuable time for healthcare professionals." },
              { icon: ChartBar, title: "Advanced Analytics", description: "Gain insights into hospital operations with powerful reporting and analytics tools." },
              { icon: Globe, title: "Scalable Infrastructure", description: "Our system grows with your organization, supporting multiple locations and expanding user bases." }
            ].map((card, index) => (
              <Card key={index} {...card} />
            ))}
          </div>
        </Section>
      </main>

      <footer className="bg-white py-6 border-t">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <p className="text-gray-600">&copy; 2024 Hospital Management. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;