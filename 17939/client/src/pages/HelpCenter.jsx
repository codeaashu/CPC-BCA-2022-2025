import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  QuestionMarkCircleIcon,
  InboxIcon,
  UserIcon,
  BriefcaseIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const faqs = [
  {
    category: 'Account & Profile',
    icon: <UserIcon className="w-5 h-5 text-indigo-500" />,
    questions: [
      {
        q: 'How do I create an account?',
        a: 'Click "Sign Up" on the homepage and follow the registration steps.',
      },
      {
        q: 'How can I reset my password?',
        a: 'Click "Forgot Password" on the login page and follow the instructions.',
      },
    ],
  },
  {
    category: 'Job Applications',
    icon: <BriefcaseIcon className="w-5 h-5 text-green-500" />,
    questions: [
      {
        q: 'How do I apply for a job?',
        a: 'Browse jobs, click "Apply Now", fill your details, and upload your resume.',
      },
      {
        q: 'Can I edit my application?',
        a: 'You can’t edit an application once submitted. Please double-check before applying.',
      },
      {
        q: 'How do I check my application status?',
        a: 'Go to your dashboard > Applications to see the current status of each job you\'ve applied to.',
      },
    ],
  },
  {
    category: 'Technical Issues',
    icon: <Cog6ToothIcon className="w-5 h-5 text-yellow-500" />,
    questions: [
      {
        q: 'Website not loading properly?',
        a: 'Try clearing your cache or switching browsers. If issues persist, contact support.',
      },
      {
        q: 'I didn’t receive the verification email',
        a: 'Check your spam folder or click "Resend" on the verification page.',
      },
    ],
  },
  {
    category: 'Recruiter Support',
    icon: <InboxIcon className="w-5 h-5 text-blue-500" />,
    questions: [
      {
        q: 'How do I post a job?',
        a: 'Log in as a recruiter and go to your dashboard > Post a Job.',
      },
      {
        q: 'How can I view applicants?',
        a: 'From your dashboard, select the job > View Applicants.',
      },
    ],
  },
];

const HelpCenter = () => {
  const [expanded, setExpanded] = useState(null);
  const [query, setQuery] = useState('');
  const [customQuestion, setCustomQuestion] = useState('');

  const toggleFAQ = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div>
      <Navbar />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen py-16 px-6 md:px-20 bg-gray-50"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Help Center</h1>
        <p className="text-gray-600 mb-6 text-sm">Find answers to common questions or contact support.</p>

        {/* Search bar */}
        <div className="max-w-xl mb-10">
          <input
            type="text"
            placeholder="Search a question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* FAQ Section */}
        <div className="space-y-10">
          {faqs.map((section, sIdx) => (
            <div key={sIdx}>
              <div className="flex items-center gap-2 mb-3">
                {section.icon}
                <h2 className="text-lg font-semibold text-gray-700">{section.category}</h2>
              </div>
              <div className="space-y-3">
                {section.questions
                  .filter((q) => q.q.toLowerCase().includes(query.toLowerCase()))
                  .map((faq, index) => {
                    const isOpen = expanded === `${sIdx}-${index}`;
                    return (
                      <div key={index} className="bg-white border rounded-md shadow-sm">
                        <button
                          onClick={() => toggleFAQ(`${sIdx}-${index}`)}
                          className="w-full flex justify-between items-center px-4 py-3 text-left text-gray-800 font-medium hover:bg-gray-100"
                        >
                          {faq.q}
                          {isOpen ? (
                            <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 text-sm text-gray-600">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Question */}
        <div className="mt-16">
          <div className="flex items-center gap-2 mb-2">
            <QuestionMarkCircleIcon className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-semibold text-gray-700">Submit Your Question</h2>
          </div>
          <textarea
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            placeholder="Enter your question here..."
            rows={4}
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
          />
          <button
            onClick={() => {
              if (customQuestion) {
                alert('Thank you for submitting your question! Our team will respond shortly.');
                setCustomQuestion('');
              }
            }}
            className="mt-3 px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Submit
          </button>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-16">
          <p className="text-sm text-gray-600">
            Or reach us at{' '}
            <a href="mailto:support@careerconnect.com" className="text-indigo-600 underline">
              support@careerconnect.com
            </a>
          </p>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default HelpCenter;
