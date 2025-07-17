import { useContext, useEffect, useState, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import { assets, JobCategories, JobLocations } from '../assets/assets';
import JobCard from './JobCard';
import { motion, AnimatePresence } from 'framer-motion';

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext);

  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  const jobsPerPage = 6;
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev >= totalPages ? 1 : prev + 1));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev <= 1 ? totalPages : prev - 1));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location) ? prev.filter((l) => l !== location) : [...prev, location]
    );
  };

  // ✅ Updated filtering logic to handle case-insensitive search
  useEffect(() => {
    if (!jobs || jobs.length === 0) return;

    const titleFilter = searchFilter.title.trim().toLowerCase();
    const locationFilter = searchFilter.location.trim().toLowerCase();

    const matchesCategory = (job) =>
      selectedCategories.length === 0 || selectedCategories.includes(job.category);

    const matchesLocation = (job) =>
      selectedLocations.length === 0 || selectedLocations.includes(job.location);

    const matchesTitle = (job) => {
      const jobTitle = job.title?.toLowerCase() || '';
      return !titleFilter || jobTitle.includes(titleFilter);
    };

    const matchesSearchLocation = (job) => {
      const jobLocation = job.location?.toLowerCase() || '';
      return !locationFilter || jobLocation.includes(locationFilter);
    };

    const newFilteredJobs = jobs
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchesCategory(job) &&
          matchesLocation(job) &&
          matchesTitle(job) &&
          matchesSearchLocation(job)
      );

    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [jobs, selectedCategories, selectedLocations, searchFilter]);

  useEffect(() => {
    if (filteredJobs.length === 0) return;
    intervalRef.current = setInterval(goToNextPage, 4000);
    return () => clearInterval(intervalRef.current);
  }, [filteredJobs, totalPages]);

  const handleMouseEnter = () => clearInterval(intervalRef.current);
  const handleMouseLeave = () => {
    intervalRef.current = setInterval(goToNextPage, 4000);
  };

  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      {/* Filters Sidebar */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-1/4 bg-white px-4"
      >
        {isSearched && (searchFilter.title || searchFilter.location) && (
          <>
            <h3 className="font-medium text-lg mb-4">Current Search</h3>
            <div className="mb-4 text-gray-600 flex flex-wrap gap-2">
              {searchFilter.title && (
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded"
                >
                  {searchFilter.title}
                  <img
                    onClick={() => setSearchFilter((prev) => ({ ...prev, title: '' }))}
                    className="cursor-pointer"
                    src={assets.cross_icon}
                    alt="Remove title filter"
                  />
                </motion.span>
              )}
              {searchFilter.location && (
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded"
                >
                  {searchFilter.location}
                  <img
                    onClick={() => setSearchFilter((prev) => ({ ...prev, location: '' }))}
                    className="cursor-pointer"
                    src={assets.cross_icon}
                    alt="Remove location filter"
                  />
                </motion.span>
              )}
            </div>
          </>
        )}

        {/* Toggle button for mobile */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilter((prev) => !prev)}
          className="px-6 py-1.5 rounded border border-gray-400 lg:hidden"
        >
          {showFilter ? 'Close' : 'Filters'}
        </motion.button>

        <div className={showFilter ? '' : 'max-lg:hidden'}>
          {/* Category Filter */}
          <h4 className="font-medium text-lg py-4">Search by Categories</h4>
          <ul className="space-y-4 text-gray-600">
            {JobCategories.map((category, index) => (
              <motion.li key={category} className="flex gap-3 items-center" whileHover={{ scale: 1.02 }}>
                <motion.input
                  className="scale-125"
                  type="checkbox"
                  id={`cat-${index}`}
                  onChange={() => handleCategoryChange(category)}
                  checked={selectedCategories.includes(category)}
                  whileTap={{ scale: 0.9 }}
                />
                <label htmlFor={`cat-${index}`}>{category}</label>
              </motion.li>
            ))}
          </ul>

          {/* Location Filter */}
          <h4 className="font-medium text-lg py-4 pt-14">Search by Location</h4>
          <ul className="space-y-4 text-gray-600">
            {JobLocations.map((location, index) => (
              <motion.li key={location} className="flex gap-3 items-center" whileHover={{ scale: 1.02 }}>
                <motion.input
                  className="scale-125"
                  type="checkbox"
                  id={`loc-${index}`}
                  onChange={() => handleLocationChange(location)}
                  checked={selectedLocations.includes(location)}
                  whileTap={{ scale: 0.9 }}
                />
                <label htmlFor={`loc-${index}`}>{location}</label>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Job Listings Section */}
      <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
        <h3 className="font-medium text-3xl py-2" id="job-list">Latest jobs</h3>
        <p className="mb-8">Get your desired job from top companies</p>

        {filteredJobs.length === 0 ? (
          <p className="text-gray-500 italic">No jobs found matching your filters.</p>
        ) : (
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={containerRef}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                layout
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
              >
                {filteredJobs
                  .slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage)
                  .map((job, index) => (
                    <JobCard key={index} job={job} />
                  ))}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Pagination */}
        {filteredJobs.length > 0 && (
          <div className="flex items-center justify-center space-x-2 mt-10">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={goToPrevPage}
              className="p-2 rounded bg-gray-100 hover:bg-gray-200"
            >
              <img src={assets.left_arrow_icon} alt="Prev" />
            </motion.button>

            {Array.from({ length: totalPages }).map((_, index) => (
              <motion.button
                key={index}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h-10 border rounded ${
                  currentPage === index + 1 ? 'bg-blue-100 text-blue-500' : 'text-gray-500'
                }`}
              >
                {index + 1}
              </motion.button>
            ))}

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={goToNextPage}
              className="p-2 rounded bg-gray-100 hover:bg-gray-200"
            >
              <img src={assets.right_arrow_icon} alt="Next" />
            </motion.button>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
