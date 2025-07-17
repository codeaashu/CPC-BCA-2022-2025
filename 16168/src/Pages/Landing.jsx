import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const heroSlides = [
  {
    bg: 'bg-[#c1442e]',
    img: '/landing-screens/slide1.png',
    title: '',
    subtitle: '',
    btn: 'CREATE YOUR BLOG',
    btnLink: '/sign-up',
    icon: '🔥',
  },
  {
    bg: 'bg-[#3b8d8c]',
    img: '/landing-screens/slide2.png',
    title: '',
    subtitle: '',
    btn: 'CREATE YOUR BLOG',
    btnLink: '/sign-up',
    icon: '🌿',
  },
  {
    bg: 'bg-[#5c7a89]',
    img: '/landing-screens/slide3.png',
    title: '',
    subtitle: '',
    btn: 'CREATE YOUR BLOG',
    btnLink: '/sign-up',
    icon: '📊',
  },
  {
    bg: 'bg-[#f57c00]',
    img: '/landing-screens/slide4.png',
    title: '',
    subtitle: '',
    btn: 'CREATE YOUR BLOG',
    btnLink: '/sign-up',
    icon: '🌍',
  },
];

const sections = [
  {
    bg: 'bg-[#5c7a89]',
    img: 'https://www.gstatic.com/blogger/img/blogger_analytics_2x_2020.png',
    title: 'Know your audience',
    subtitle: `Find out which posts are a hit with Blogger's built-in analytics. You'll see where your audience is coming from and what they're interested in. You can even connect your blog directly to Google Analytics for a more detailed look.`,
    icon: '📊',
  },
  {
    bg: 'bg-[#f57c00]',
    img: null,
    title: 'Join millions of others',
    subtitle: `Whether sharing your expertise, breaking news, or whatever's on your mind, you're in good company on Blogger. Sign up to discover why millions of people have published their passions here.`,
    icon: '🌍',
  },
];

const Landing = () => {
  const [showTopbar, setShowTopbar] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);
  const sectionRefs = useRef([]);

  // Hero carousel auto-advance
  useEffect(() => {
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3500);
    return () => clearInterval(slideInterval.current);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setShowTopbar(true);
      } else {
        setShowTopbar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to next section
  const scrollToSection = (idx) => {
    if (sectionRefs.current[idx]) {
      sectionRefs.current[idx].scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Topbar - hidden until scroll */}
      <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${showTopbar ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} bg-white shadow-lg rounded-b-2xl`}>
        <div className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-4xl font-extrabold"><span className="text-red-600">Trend</span><span className="text-green-500">Hub</span></span>
          </div>
          <div className="flex gap-3">
            <Link to="/sign-in" className="text-sm font-semibold text-gray-700 hover:underline">SIGN IN</Link>
            <Link to="/sign-up" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 rounded shadow transition">CREATE YOUR BLOG</Link>
          </div>
        </div>
      </div>

      {/* Hero Carousel Section */}
      <section className={`relative flex flex-col items-center justify-center text-center min-h-screen w-full transition-colors duration-700 overflow-hidden ${heroSlides[currentSlide].bg}`}
        style={{ transition: 'background 0.7s' }}>
        {/* Full-size background image */}
        <div
          className="absolute inset-0 w-full h-full bg-center bg-cover z-0"
          style={{ backgroundImage: `url('${heroSlides[currentSlide].img}')` }}
        >
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 py-16 md:py-24 animate-fadeIn">
          <span className="text-5xl mb-4 animate-bounce">{heroSlides[currentSlide].icon}</span>
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4 animate-fadeIn" style={{ animationDelay: '0.2s' }}>{heroSlides[currentSlide].title}</h1>
          <p className="text-lg md:text-xl text-white mb-8 animate-fadeIn" style={{ animationDelay: '0.4s' }}>{heroSlides[currentSlide].subtitle}</p>
          {heroSlides[currentSlide].btn && (
            <Link to={heroSlides[currentSlide].btnLink} className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded shadow transition mb-8 animate-fadeIn" style={{ animationDelay: '0.6s' }}>{heroSlides[currentSlide].btn}</Link>
          )}
          {/* Dots/indicators */}
          <div className="flex gap-2 justify-center mt-8">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full border-2 border-white transition-all duration-300 ${currentSlide === idx ? 'bg-white scale-125' : 'bg-transparent'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          {/* Down arrow for next section */}
          <button
            onClick={() => scrollToSection(0)}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-3 shadow-lg animate-bounce z-10"
            aria-label="Scroll to next section"
          >
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
        </div>
      </section>

      {/* Blogger-style Blog Card Section (static, below hero) */}
      {/* Blogger-style Blog Card Section (static, below hero) */}

      {/* Animated, scroll-snap sections (rest of landing) */}
      <div className="flex-1 w-full overflow-y-auto scroll-smooth snap-y snap-mandatory" style={{ minHeight: '100vh' }}>
        {sections.map((sec, idx) => (
          <section
            key={idx}
            ref={el => sectionRefs.current[idx] = el}
            className={`relative flex flex-col items-center justify-center text-center min-h-screen snap-start transition-colors duration-700 ${sec.bg}`}
          >
            <div className="flex flex-col items-center justify-center w-full h-full px-4 py-16 md:py-24 animate-fadeIn">
              <span className="text-5xl mb-4 animate-bounce">{sec.icon}</span>
              <h1 className="text-4xl md:text-5xl font-light text-white mb-4 animate-fadeIn" style={{ animationDelay: '0.2s' }}>{sec.title}</h1>
              <p className="text-lg md:text-xl text-white mb-8 animate-fadeIn" style={{ animationDelay: '0.4s' }}>{sec.subtitle}</p>
              {sec.img && (
                <div className="flex justify-center w-full animate-fadeIn" style={{ animationDelay: '0.8s' }}>
                  <img src={sec.img} alt="Section Visual" className="rounded-xl shadow-2xl w-full max-w-2xl mx-auto" />
                </div>
              )}
              {/* Down arrow for next section */}
              {idx < sections.length - 1 && (
                <button
                  onClick={() => scrollToSection(idx + 1)}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-3 shadow-lg animate-bounce z-10"
                  aria-label="Scroll to next section"
                >
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-gray-200 py-10 px-4 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div>
            <h3 className="font-bold mb-2">Help</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:underline">Help Center</a></li>
              <li><a href="#" className="hover:underline">Help Forum</a></li>
              <li><a href="#" className="hover:underline">Video Tutorials</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Community</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:underline">Blogger Buzz</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Developers</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:underline">Blogger API</a></li>
              <li><a href="#" className="hover:underline">Developer Forum</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <div className="flex gap-4 mb-2 md:mb-0">
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Content Policy</a>
          </div>
          <div>
            <select className="bg-gray-800 text-gray-400 border-none outline-none">
              <option>English</option>
              {/* Add more languages if needed */}
            </select>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing; 