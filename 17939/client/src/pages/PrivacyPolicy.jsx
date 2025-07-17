import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
          <p className="text-gray-500 text-sm mb-8">Last updated: June 28, 2025</p>

          <div className="space-y-10 text-sm text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">1. Introduction</h2>
              <p>
                CareerConnect is committed to protecting your personal data and your right to privacy. This Privacy Policy explains how we collect, store, use, and disclose your information when you use our website or services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">2. Information We Collect</h2>
              <ul className="list-disc ml-6">
                <li>Name, email, and contact details</li>
                <li>Resume and job preferences</li>
                <li>Account credentials and usage data</li>
                <li>IP address, browser type, and device info</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">3. How We Use Your Information</h2>
              <ul className="list-disc ml-6">
                <li>To match you with relevant job opportunities</li>
                <li>To provide job alerts and recommendations</li>
                <li>To improve and personalize our services</li>
                <li>To respond to support requests and inquiries</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">4. Data Sharing & Disclosure</h2>
              <p>
                We do <strong>not</strong> sell or rent your personal information. We only share data with:
              </p>
              <ul className="list-disc ml-6 mt-1">
                <li>Recruiters/employers when you apply for a job</li>
                <li>Trusted third-party service providers (e.g., analytics, cloud storage)</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">5. Data Retention & Security</h2>
              <p>
                We retain your data as long as your account is active or as needed to provide you services. We implement industry-standard encryption, firewalls, and secure servers to protect your data from unauthorized access.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">6. Cookies & Tracking</h2>
              <p>
                We use cookies and similar technologies to enhance your browsing experience, personalize content, and analyze site traffic. You can manage your cookie preferences in your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">7. Your Rights</h2>
              <ul className="list-disc ml-6">
                <li>Access, update, or delete your information</li>
                <li>Withdraw consent for data processing</li>
                <li>Request a copy of your data</li>
                <li>Request to close your account</li>
              </ul>
              <p className="mt-2">
                You can make these requests by contacting us at <a href="mailto:support@careerconnect.com" className="text-green-600 underline">support@careerconnect.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">8. Updates to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised "Last updated" date. Please check back regularly for updates.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">9. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or how we handle your data, reach out to us at <a href="mailto:support@careerconnect.com" className="text-green-600 underline">support@careerconnect.com</a>.
              </p>
            </section>
          </div>
        </div>
      </motion.section>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
