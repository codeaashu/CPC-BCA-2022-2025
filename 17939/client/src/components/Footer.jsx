import { motion } from 'framer-motion';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const socialLinks = [
  {
    icon: assets.facebook_icon,
    alt: 'Facebook',
    url: 'https://www.facebook.com/',
  },
  {
    icon: assets.twitter_icon,
    alt: 'Twitter',
    url: 'https://twitter.com/',
  },
  {
    icon: assets.instagram_icon,
    alt: 'Instagram',
    url: 'https://www.instagram.com/',
  },
];

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-tr from-gray-900 to-gray-800 text-white py-8 px-6 md:px-16 mt-16 border-t border-gray-700"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">

        <div>
          <div className="flex flex-col items-start gap-1 mb-3">
            <img width={120} className="h-auto rounded-md" src={assets.logo} alt="JobNest Logo" />
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              Career Connect
            </h2>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Empowering job seekers with access to the latest opportunities. Start your career journey with JobNest today.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-white mb-2">Company</h3>
          <ul className="text-xs text-gray-300 space-y-1.5">
            <li><Link to="/about" className="hover:text-green-400 transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-green-400 transition">Contact</Link></li>
            <li><Link to="/careers" className="hover:text-green-400 transition">Careers</Link></li>
            <li><Link to="/press" className="hover:text-green-400 transition">Press</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-base font-semibold text-white mb-2">Resources</h3>
          <ul className="text-xs text-gray-300 space-y-1.5">
            <li><Link to="/blog" className="hover:text-green-400 transition">Blog</Link></li>
            <li><Link to="/help" className="hover:text-green-400 transition">Help Center</Link></li>
            <li><Link to="/privacy" className="hover:text-green-400 transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-green-400 transition">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-base font-semibold text-white mb-2">Connect With Us</h3>
          <div className="flex gap-3 items-center">
            {socialLinks.map(({ icon, alt, url }, idx) => (
              <motion.a
                key={idx}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img
                  width={26}
                  src={icon}
                  alt={alt}
                  className="transition cursor-pointer"
                />
              </motion.a>
            ))}
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-400">Subscribe for updates</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 px-2.5 py-1.5 w-full rounded-md text-xs bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-green-400"
            />
            <button className="mt-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-xs text-white rounded-md w-full transition">
              Subscribe
            </button>
          </div>
        </div>

      </div>
      <div className="text-center text-[10px] text-gray-500 mt-8 border-t border-gray-700 pt-3">
        © {new Date().getFullYear()} <span className="font-semibold">himanshu.dev</span> — All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
