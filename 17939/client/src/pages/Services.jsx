import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    {
      title: 'Resume Building',
      desc: 'Stand out with an ATS-optimized, professionally designed resume tailored to your industry and role.',
      icon: '📄',
    },
    {
      title: 'Career Counseling',
      desc: 'One-on-one career consultations to help you set clear goals and make confident decisions at every stage.',
      icon: '🎯',
    },
    {
      title: 'Mock Interviews',
      desc: 'Prepare for real-world interviews with HR and technical mock sessions and actionable feedback.',
      icon: '🎤',
    },
    {
      title: 'Skill Development',
      desc: 'Upskill through curated learning paths, certifications, coding platforms, and soft skills training.',
      icon: '💻',
    },
    {
      title: 'Job Alerts',
      desc: 'Get personalized job alerts via email and SMS, filtered by domain, location, and experience level.',
      icon: '🔔',
    },
    {
      title: 'Application Tracking',
      desc: 'Monitor application status, view recruiter feedback, and manage interviews in one central dashboard.',
      icon: '📊',
    },
    {
      title: 'Portfolio Reviews',
      desc: 'Get expert feedback on your personal portfolio, GitHub profile, LinkedIn, and online presence.',
      icon: '🗂',
    },
    {
      title: 'Freelance & Remote Jobs',
      desc: 'Explore high-quality freelance, contract-based, and full-time remote job opportunities across the globe.',
      icon: '🌍',
    },
    {
      title: 'Company Insights',
      desc: 'Access real company reviews, salary insights, interview experiences, and cultural fit assessments.',
      icon: '🏢',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 min-h-screen py-16 px-4 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6">Our Services</h1>
        <p className="text-lg text-gray-600 mb-12">
          We offer a comprehensive suite of tools and services to help you navigate your career path—from first job to leadership roles. Our goal is to empower you with knowledge, skills, and confidence.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer"
          >
            <div className="text-4xl mb-4 text-blue-600">{service.icon}</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h2>
            <p className="text-gray-600 text-sm">{service.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-20 bg-blue-600 text-white py-10 px-6 rounded-xl shadow-lg max-w-5xl mx-auto text-center"
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-3">Ready to take the next step in your career?</h2>
        <p className="mb-6 text-sm md:text-base">
          Join thousands of professionals who’ve advanced their careers through CareerConnect. Create your free account today and get access to all premium services.
        </p>
        <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition">
          Get Started
        </button>
      </motion.div>
    </div>
  );
};

export default Services;