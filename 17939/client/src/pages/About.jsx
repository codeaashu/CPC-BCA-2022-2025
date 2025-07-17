import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-16 px-6 md:px-20 bg-gradient-to-r from-gray-100 to-blue-50 min-h-screen"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          About <span className="text-blue-600">CareerConnect</span>
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto mb-12">
          CareerConnect is a modern job discovery platform designed to empower job seekers and streamline hiring for employers. We are on a mission to create meaningful connections between talent and opportunity using intuitive tools, smart matching, and personalized career support.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[
            {
              title: '🌟 Our Vision',
              color: 'text-blue-600',
              text: 'To become the most trusted global platform where individuals find purpose-driven careers and companies find the right talent to grow.',
            },
            {
              title: '🚀 Our Mission',
              color: 'text-green-600',
              text: 'To provide transparent, accessible, and technology-driven solutions for job discovery, upskilling, and hiring—helping millions thrive professionally.',
            },
            {
              title: '💡 Why Choose Us',
              color: 'text-purple-600',
              text: 'We combine AI-powered recommendations, human expertise, and modern design to deliver a seamless career-building experience.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
            >
              <h3 className={`text-xl font-semibold mb-2 ${item.color}`}>{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.text}</p>
            </motion.div>
          ))}
        </div>
{/* WHO WE HELP */}
<motion.div
  className="mt-20"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.3 }}
>
  <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Who We Help</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto text-left">
    {[
      {
        title: 'Students',
        desc: 'Find internships and early career opportunities.',
        icon: '🎓',
        bg: 'bg-blue-100',
      },
      {
        title: 'Freshers',
        desc: 'Explore job roles tailored for new graduates.',
        icon: '🚀',
        bg: 'bg-green-100',
      },
      {
        title: 'Professionals',
        desc: 'Level up or pivot your career with top roles.',
        icon: '💼',
        bg: 'bg-purple-100',
      },
      {
        title: 'Recruiters',
        desc: 'Access top-tier candidates across domains.',
        icon: '🧑‍💼',
        bg: 'bg-yellow-100',
      },
    ].map((item, i) => (
      <motion.div
        key={i}
        whileHover={{ scale: 1.05 }}
        className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition"
      >
        <div className={`text-3xl w-12 h-12 flex items-center justify-center rounded-full mb-4 ${item.bg}`}>
          {item.icon}
        </div>
        <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
        <p className="text-sm text-gray-600">{item.desc}</p>
      </motion.div>
    ))}
  </div>
</motion.div>

{/* OUR IMPACT */}
<motion.div
  className="mt-20"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.4 }}
>
  <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Our Impact</h2>
  <div className="flex flex-wrap justify-center gap-8 text-left text-sm text-gray-700 max-w-4xl mx-auto">
    {[
      {
        title: 'Registered job seekers',
        stat: '50K+',
        icon: '👥',
        color: 'text-blue-600',
      },
      {
        title: 'Partner companies onboarded',
        stat: '2K+',
        icon: '🏢',
        color: 'text-green-600',
      },
      {
        title: 'Placement success rate',
        stat: '85%',
        icon: '✅',
        color: 'text-purple-600',
      },
    ].map((item, i) => (
      <motion.div
        key={i}
        whileHover={{ scale: 1.05 }}
        className="bg-white p-6 w-60 rounded-xl shadow-md text-center hover:shadow-lg transition"
      >
        <div className={`text-4xl mb-2 ${item.color}`}>{item.icon}</div>
        <div className="text-2xl font-bold mb-1">{item.stat}</div>
        <p className="text-sm text-gray-600">{item.title}</p>
      </motion.div>
    ))}
  </div>
</motion.div>


        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 bg-blue-600 text-white py-10 px-6 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-2">Get Involved</h2>
          <p className="text-sm max-w-xl mx-auto mb-4">
            Whether you're looking to grow your career or grow your company, CareerConnect is your partner in progress. Join our community of passionate individuals and let us help you reach your goals.
          </p>
          <button className="mt-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition">
            Join CareerConnect
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
