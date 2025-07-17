"use client"
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const TermsPage = () => (
  <div className="min-h-screen bg-gray-50 py-8">
    <div className="max-w-6xl mx-auto px-4">
      <Card className="bg-white shadow-md border border-gray-200">
        <CardContent className="p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 mt-5 text-gray-900">Terms of Service</h1>
            <p className="text-sm text-gray-600 mb-8">Last updated: {"20/05/2025"}</p>
            <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">1. Acceptance of Terms</h2>
              <div className="space-y-4 text-gray-700">
                <p>By accessing and using our AI Interview Platform ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
                <p>These Terms of Service ("Terms") govern your use of our platform, including all content, services, and products available at or through the service.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">2. Description of Service</h2>
              <div className="space-y-4 text-gray-700">
                <p>Our AI Interview Platform provides:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>AI-powered mock interview sessions</li>
                  <li>Personalized feedback and performance analytics</li>
                  <li>Industry-specific interview preparation</li>
                  <li>Resume and profile management tools</li>
                  <li>Interview scheduling and recording capabilities</li>
                </ul>
                <p>We reserve the right to modify, suspend, or discontinue the service at any time with or without notice.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">3. User Accounts and Responsibilities</h2>
              <div className="space-y-4 text-gray-700">
                <p>To access certain features of our service, you must create an account. You agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain the security of your password and account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Use the service only for lawful purposes and in accordance with these Terms</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">4. Acceptable Use Policy</h2>
              <div className="space-y-4 text-gray-700">
                <p>You agree not to use the service to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Upload or transmit viruses, malware, or other harmful code</li>
                  <li>Attempt to gain unauthorized access to our systems or networks</li>
                  <li>Interfere with or disrupt the service or servers</li>
                  <li>Use the service for any illegal or unauthorized purpose</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Share false, misleading, or deceptive information</li>
                  <li>Violate any applicable laws or regulations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">5. Intellectual Property Rights</h2>
              <div className="space-y-4 text-gray-700">
                <p>The service and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
                <p>You retain ownership of content you submit to the service, but grant us a license to use, modify, and display such content as necessary to provide the service.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">6. Payment and Subscription Terms</h2>
              <div className="space-y-4 text-gray-700">
                <p>If you choose a paid subscription plan:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Payment is due in advance on a monthly or annual basis</li>
                  <li>Subscriptions automatically renew unless cancelled</li>
                  <li>Refunds are provided according to our refund policy</li>
                  <li>We may change subscription fees with 30 days' notice</li>
                  <li>Accounts may be suspended for non-payment</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">7. Disclaimer of Warranties</h2>
              <div className="space-y-4 text-gray-700">
                <p>The service is provided "as is" and "as available" without any representations or warranties. We disclaim all warranties, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">8. Limitation of Liability</h2>
              <div className="space-y-4 text-gray-700">
                <p>In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">9. Termination</h2>
              <div className="space-y-4 text-gray-700">
                <p>We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.</p>
                <p>You may terminate your account at any time by contacting us or using the account deletion feature in your profile settings.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">10. Contact Information</h2>
              <div className="text-gray-700">
                <p>If you have any questions about these Terms of Service, please contact us at:</p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p><strong>Email:</strong> suprabhat.work@gmail.com</p>
              <div className="flex gap-4">
              <a
                href="https://x.com/HireMentis"
                target="_blank"
                className="text-gray-400 hover:text-emerald-500"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/HireMentis/"
                target="_blank"
                className="text-gray-400 hover:text-emerald-500"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </a>
            </div>
                </div>
              </div>
            </section>


            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default TermsPage;
