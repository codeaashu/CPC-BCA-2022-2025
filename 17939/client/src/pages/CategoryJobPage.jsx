// CategoryJobsPage.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import JobCard from '../components/JobCard';
import ApplyModal from '../components/ApplyModal';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';

const CategoryJobsPage = () => {
  const { tag } = useParams();
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [sortOption, setSortOption] = useState('title');
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const jobsPerPage = 6;

  useEffect(() => {
    fetch(`/api/jobs?category=${encodeURIComponent(tag)}`)
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(console.error);
  }, [tag]);

  useEffect(() => {
    const filtered = jobs.filter(job =>
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      job.location.toLowerCase().includes(location.toLowerCase())
    );
    const sorted = [...filtered].sort((a, b) =>
      sortOption === 'title'
        ? a.title.localeCompare(b.title)
        : a.company.localeCompare(b.company)
    );
    setFilteredJobs(sorted);
    setSlideIndex(0);
  }, [jobs, search, location, sortOption]);

  const totalSlides = Math.ceil(filteredJobs.length / jobsPerPage);
  const currentJobs = filteredJobs.slice(slideIndex * jobsPerPage, (slideIndex + 1) * jobsPerPage);

  useEffect(() => {
    const interval = setInterval(() => setSlideIndex(idx => (idx + 1) % totalSlides), 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const openModal = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 xl:px-20 py-10">
        <motion.div className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Discover <span className="text-blue-600">{tag} Jobs</span>
          </h1>
          <p className="text-gray-500 mt-2">Explore latest roles in {tag}</p>
        </motion.div>

        <motion.div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <input type="text" placeholder="Search by title" value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2 border rounded w-full" />
          <input type="text" placeholder="Location" value={location}
            onChange={e => setLocation(e.target.value)}
            className="px-4 py-2 border rounded w-full" />
          <select value={sortOption} onChange={e => setSortOption(e.target.value)}
            className="px-4 py-2 border rounded w-full">
            <option value="title">Sort by Title</option>
            <option value="company">Sort by Company</option>
          </select>
          <button onClick={() => { setSearch(''); setLocation(''); setSortOption('title'); }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Reset Filters
          </button>
        </motion.div>

        <motion.div key={slideIndex}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {currentJobs.map((job, idx) => (
            <JobCard key={idx} job={job} highlightTags={[tag]} onApplyClick={() => openModal(job)} />
          ))}
        </motion.div>

        {filteredJobs.length > jobsPerPage && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button onClick={() => setSlideIndex((s => (s - 1 + totalSlides) % totalSlides))}
              className="hover:scale-110 transition">
              <img src={assets.left_arrow_icon} alt="Prev" className="h-5 w-5" />
            </button>
            {Array.from({ length: totalSlides }).map((_, i) => (
              <span key={i} className={`w-3 h-3 rounded-full cursor-pointer ${
                i === slideIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`} onClick={() => setSlideIndex(i)} />
            ))}
            <button onClick={() => setSlideIndex((s => (s + 1) % totalSlides))}
              className="hover:scale-110 transition">
              <img src={assets.right_arrow_icon} alt="Next" className="h-5 w-5" />
            </button>
          </div>
        )}
        {filteredJobs.length === 0 && <p className="text-center text-gray-500 mt-10">No {tag} jobs found.</p>}
      </div>

      {modalOpen && (
        <ApplyModal isOpen={modalOpen} setIsOpen={setModalOpen} job={selectedJob}
          onSuccess={() => toast.success('Applied successfully!')} />
      )}
      <Footer />
    </div>
  );
};

export default CategoryJobsPage;
