import { motion, AnimatePresence } from 'framer-motion';
import { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const dropdownVariants = {
  hidden: { opacity: 0, y: -10, pointerEvents: 'none' },
  visible: { opacity: 1, y: 0, pointerEvents: 'auto', transition: { duration: 0.2 } },
};

const HeroSection = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const [titleInput, setTitleInput] = useState('');
  const [locationInput, setLocationInput] = useState('');

  const [showJobDropdown, setShowJobDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const categoryTags = [
    'Programming',
    'Data Science',
    'Designing',
    'Networking',
    'Management',
    'Marketing',
    'Cybersecurity',
  ];

  const locationSuggestions = ['Washington', 'Mumbai', 'Bangalore', 'Hyderabad', 'California', 'Chennai', 'New York'];

  const featuredCompanies = [
    { logo: assets.microsoft_logo, name: 'Microsoft' },
    { logo: assets.walmart_logo, name: 'Walmart' },
    { logo: assets.accenture_logo, name: 'Accenture' },
    { logo: assets.samsung_logo, name: 'Samsung' },
    { logo: assets.amazon_logo, name: 'Amazon' },
    { logo: assets.adobe_logo, name: 'Adobe' },
  ];

  const handleSearch = () => {
    const title = titleInput.trim().toLowerCase();
    const location = locationInput.trim().toLowerCase();
    setSearchFilter({ title, location });
    setIsSearched(true);
  };

  const handleTagClick = (tag) => {
    const location = locationInput.trim().toLowerCase();
    setTitleInput(tag);
    setSearchFilter({ title: tag.toLowerCase(), location });
    setIsSearched(true);
  };

  return (
    <motion.div
      className="bg-gradient-to-r from-blue-50 to-green-50 py-16 px-4 md:px-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          Find your <span className="text-blue-600">dream job</span> now
        </motion.h1>

        <motion.p
          className="text-gray-600 mb-8 text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Search from thousands of jobs across top companies
        </motion.p>

        {/* Search Inputs */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 md:gap-2 justify-center relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Title Input */}
          <div className="flex flex-col w-full md:w-1/3 relative">
            <div className="flex items-center bg-white border rounded-md px-4">
              <img src={assets.search_icon} className="h-5 mr-2" alt="search" />
              <input
                type="text"
                placeholder="Job title or category"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                onFocus={() => setShowJobDropdown(true)}
                onBlur={() => setTimeout(() => setShowJobDropdown(false), 150)}
                className="w-full py-3 outline-none text-sm"
              />
            </div>
            <AnimatePresence>
              {showJobDropdown && (
                <motion.ul
                  className="absolute top-full mt-1 left-0 right-0 bg-white border rounded-md shadow-md z-10"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={dropdownVariants}
                >
                  {categoryTags.map((tag, i) => (
                    <motion.li
                      key={i}
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                      onMouseDown={() => handleTagClick(tag)}
                      whileHover={{ scale: 1.01 }}
                    >
                      {tag}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Location Input */}
          <div className="flex flex-col w-full md:w-1/4 relative">
            <div className="flex items-center bg-white border rounded-md px-4">
              <img src={assets.location_icon} className="h-5 mr-2" alt="location" />
              <input
                type="text"
                placeholder="Location"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                onFocus={() => setShowLocationDropdown(true)}
                onBlur={() => setTimeout(() => setShowLocationDropdown(false), 150)}
                className="w-full py-3 outline-none text-sm"
              />
            </div>
            <AnimatePresence>
              {showLocationDropdown && (
                <motion.ul
                  className="absolute top-full mt-1 left-0 right-0 bg-white border rounded-md shadow-md z-10"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={dropdownVariants}
                >
                  {locationSuggestions.map((loc, i) => (
                    <motion.li
                      key={i}
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                      onMouseDown={() => {
                        setLocationInput(loc);
                        setSearchFilter({
                          title: titleInput.trim().toLowerCase(),
                          location: loc.toLowerCase(),
                        });
                        setIsSearched(true);
                      }}
                      whileHover={{ scale: 1.01 }}
                    >
                      {loc}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Search Button */}
          <motion.button
            onClick={handleSearch}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            whileTap={{ scale: 0.95 }}
          >
            Search
          </motion.button>
        </motion.div>

        {/* Job Category Tags */}
        <motion.div
          className="mt-8 overflow-x-auto whitespace-nowrap px-4 scrollbar-hide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div className="inline-flex gap-3">
            {categoryTags.map((tag, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleTagClick(tag)}
                className="px-4 py-2 bg-white border text-gray-700 rounded-full hover:bg-blue-600 hover:text-white transition text-sm"
              >
                {tag}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Featured Companies */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Featured Companies</h2>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {featuredCompanies.map((company, i) => (
              <motion.div
                key={i}
                className="bg-white p-4 shadow-sm rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 },
                }}
              >
                <img className="h-8" src={company.logo} alt={company.name} title={company.name} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
