import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsOfService = () => {
  return (
    <div>
      <Navbar />
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen py-16 px-6 md:px-24 bg-gray-50"
      >
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Terms of Service</h1>
          <p className="text-gray-500 text-sm mb-8">Last updated: June 28, 2025</p>

          <div className="space-y-10 text-sm text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">1. Acceptance of Terms</h2>
              <p>
                By accessing or using CareerConnect, you agree to comply with and be bound by these Terms of Service. If you do not agree with these terms, you may not use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">2. Account Registration & Use</h2>
              <p>
                You are responsible for maintaining the confidentiality of your account and password. You agree to provide accurate, complete, and updated information during registration and while using the platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">3. Job Listings & Content</h2>
              <p>
                Job listings and employer content are submitted by third parties. CareerConnect does not guarantee the accuracy, completeness, or authenticity of listings. We are not liable for decisions made based on such content.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">4. User Responsibilities</h2>
              <ul className="list-disc ml-6 mt-2">
                <li>Do not post false or misleading information.</li>
                <li>Do not impersonate another person or company.</li>
                <li>Do not upload viruses, malware, or harmful content.</li>
                <li>Comply with applicable laws and regulations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">5. Prohibited Activities</h2>
              <p>
                You agree not to:
              </p>
              <ul className="list-disc ml-6 mt-1">
                <li>Use automated tools to scrape or access data</li>
                <li>Infringe upon any intellectual property rights</li>
                <li>Harass, abuse, or harm others using the platform</li>
                <li>Violate system integrity or security measures</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">6. Intellectual Property</h2>
              <p>
                All content, branding, and design elements on CareerConnect are the property of CareerConnect or its licensors. You may not reproduce, distribute, or create derivative works without written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">7. Account Termination</h2>
              <p>
                We reserve the right to suspend or terminate your access if you violate these Terms. We may also remove content that violates our policies or is harmful to other users or the platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">8. Disclaimer</h2>
              <p>
                CareerConnect is provided "as is" without warranties of any kind. We do not guarantee job placement or outcomes. Use of the platform is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">9. Limitation of Liability</h2>
              <p>
                CareerConnect shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use the platform, including but not limited to data loss or job outcomes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">10. Governing Law</h2>
              <p>
                These Terms are governed by the laws of India. Any disputes arising from these Terms or the platform shall be resolved in the courts of Uttar Pradesh, India.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">11. Contact Us</h2>
              <p>
                For questions about these Terms, contact us at <a href="mailto:support@careerconnect.com" className="text-green-600 underline">support@careerconnect.com</a>.
              </p>
            </section>
          </div>
        </div>
      </motion.section>
      <Footer />
    </div>
  );
};

export default TermsOfService;