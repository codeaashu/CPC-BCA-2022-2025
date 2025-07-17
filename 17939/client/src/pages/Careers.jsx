import { useState } from 'react';
import { motion } from 'framer-motion';
import  careerJobs  from '../data/careerJobs'; 
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Careers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const filteredJobs = careerJobs.filter(job => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      job.location.toLowerCase().includes(locationFilter.toLowerCase())
    );
  });

  return (
    <>
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen px-4 md:px-20 py-14 bg-gradient-to-tr from-blue-50 to-sky-100"
      >
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4 text-blue-700">
            Join Our Team at Career Connect
          </h1>
          <p className="text-center text-gray-600 mb-10">
            Explore 20+ exciting roles and build your future with us.
          </p>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-10 justify-center">
            <input
              type="text"
              placeholder="Search job title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-1/2 focus:outline-none shadow-sm"
            />
            <input
              type="text"
              placeholder="Location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-1/2 focus:outline-none shadow-sm"
            />
          </div>

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="bg-white shadow-lg rounded-lg p-6 border border-gray-100 hover:border-blue-400 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{job.title}</h3>
                <p className="text-gray-600 text-sm mb-1">{job.company} · {job.type}</p>
                <p className="text-gray-500 text-sm mb-1">{job.location}</p>
                <p className="text-sm text-gray-700 mb-4">Salary: {job.salary}</p>
                <Link
                  to={`/apply/${encodeURIComponent(job.title)}`}
                  className="inline-block mt-auto text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Apply Now
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <p className="text-center text-gray-500 mt-10">No matching jobs found.</p>
          )}
        </div>
      </motion.div>

      <Footer />
    </>
  );
};

export default Careers;
