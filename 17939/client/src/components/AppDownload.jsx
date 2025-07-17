import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const AppDownload = () => {
  return (
    <div className="container px-4 2xl:px-20 mx-auto my-24">
      <motion.div
        className="relative bg-gradient-to-r from-sky-100 via-indigo-100 to-rose-100 p-10 sm:p-20 lg:p-28 rounded-3xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Background Blur Ring Glow */}
        <motion.div
          className="absolute -top-10 -left-10 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Text Content */}
        <div className="max-w-xl z-20 relative text-gray-800">
          <motion.h1
            className="text-3xl sm:text-5xl font-extrabold leading-tight mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Download Our Mobile App
          </motion.h1>
          <motion.p
            className="text-lg mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Get real-time job alerts, apply faster, and manage applications on the go!
          </motion.p>
          <div className="flex gap-4">
            <motion.a
              href="https://play.google.com/store/apps"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-xl shadow px-4 py-2 transition hover:shadow-lg"
            >
              <img className="h-10" src={assets.play_store} alt="Play Store" />
            </motion.a>
            <motion.a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-xl shadow px-4 py-2 transition hover:shadow-lg"
            >
              <img className="h-10" src={assets.app_store} alt="App Store" />
            </motion.a>
          </div>
        </div>

        {/* Phone App Image */}
        <motion.img
          src={assets.app_main_img}
          alt="App Preview"
          className="absolute w-[360px] md:w-[460px] lg:w-[540px] bottom-0 right-0 mr-4 hidden lg:block z-10"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          whileHover={{
            y: [-5, 5, -5], // gentle float animation
            transition: { duration: 2, repeat: Infinity },
          }}
        />
      </motion.div>
    </div>
  );
};

export default AppDownload;
