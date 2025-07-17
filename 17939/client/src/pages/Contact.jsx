import { motion } from 'framer-motion';

const Contact = () => { return ( <div className="bg-gradient-to-r from-green-50 to-blue-50 py-16 px-4 md:px-20 min-h-screen"> <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-10" > Contact <span className="text-blue-600">Us</span> </motion.h2>

<motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
    className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-10 grid grid-cols-1 md:grid-cols-2 gap-8"
  >
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-700">Get in Touch</h3>
      <p className="text-gray-600">
        Whether you have a question about features, trials, pricing, or anything else — our team is ready to answer all your questions.
      </p>
      <div>
        <p className="text-sm text-gray-600">📍 Address:</p>
        <p className="font-medium">123 Career Lane, Tech City, India</p>
      </div>
      <div>
        <p className="text-sm text-gray-600">📞 Phone:</p>
        <p className="font-medium">‪+91 98765 43210‬</p>
      </div>
      <div>
        <p className="text-sm text-gray-600">✉ Email:</p>
        <p className="font-medium">support@careerconnect.com</p>
      </div>
    </div>

    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Your Name" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Your Email" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Message</label>
        <textarea className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500" rows="4" placeholder="Your Message"></textarea>
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Send Message
      </button>
    </form>
  </motion.div>
</div>

); };

export default Contact;