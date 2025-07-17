"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

// const PrivacyTermsPages = () => {
//   const [activePage, setActivePage] = useState('privacy');

//   useEffect(() => {
//     // Only run on client
//     if (typeof window === "undefined") return;

//     // Check URL hash to determine which page to show
//     const hash = window.location.hash;
//     if (hash === '#terms') {
//       setActivePage('terms');
//     } else if (hash === '#privacy') {
//       setActivePage('privacy');
//     }

//     // Listen for hash changes
//     const handleHashChange = () => {
//       const newHash = window.location.hash;
//       if (newHash === '#terms') {
//         setActivePage('terms');
//       } else if (newHash === '#privacy') {
//         setActivePage('privacy');
//       }
//     };

//     window.addEventListener('hashchange', handleHashChange);
//     return () => window.removeEventListener('hashchange', handleHashChange);
//   }, []);
const PrivacyPolicy = () => (
  <div className="min-h-screen bg-gray-50 py-8">
    <div className="max-w-6xl mx-auto px-4">
      <Card className="bg-white shadow-md border border-gray-200">
        <CardContent className="p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 mt-6 text-gray-900">Privacy Policy</h1>
            <p className="text-sm text-gray-600 mb-8">Last updated: {"20/05/2025"}</p>
            <div className="space-y-8">
              <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">1. Information We Collect</h2>
              <div className="space-y-4 text-gray-700">
                <p>We collect information you provide directly to us, such as when you:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Create an account and complete your profile</li>
                  <li>Participate in AI interview sessions</li>
                  <li>Upload resumes, cover letters, or other documents</li>
                  <li>Contact us for support or feedback</li>
                  <li>Subscribe to our newsletter or promotional communications</li>
                </ul>
                <p>This information may include your name, email address, phone number, employment history, educational background, and interview recordings.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">2. How We Use Your Information</h2>
              <div className="space-y-4 text-gray-700">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide, maintain, and improve our AI interview platform</li>
                  <li>Generate personalized interview questions and feedback</li>
                  <li>Analyze your interview performance and provide insights</li>
                  <li>Send you technical notices, updates, and support messages</li>
                  <li>Respond to your comments, questions, and customer service requests</li>
                  <li>Develop new features and enhance user experience</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">3. Information Sharing and Disclosure</h2>
              <div className="space-y-4 text-gray-700">
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>With your consent:</strong> We may share information when you explicitly agree</li>
                  <li><strong>Service providers:</strong> We work with trusted third-party companies to help operate our platform</li>
                  <li><strong>Legal requirements:</strong> We may disclose information if required by law or to protect our rights</li>
                  <li><strong>Business transfers:</strong> Information may be transferred in connection with a merger or acquisition</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">4. Data Security</h2>
              <div className="space-y-4 text-gray-700">
                <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication requirements</li>
                  <li>Employee training on data protection practices</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">5. Your Rights and Choices</h2>
              <div className="space-y-4 text-gray-700">
                <p>You have the following rights regarding your personal information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from promotional communications</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">6. Contact Us</h2>
              <div className="text-gray-700">
                <p>If you have any questions about this Privacy Policy, please contact us at:</p>
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






  // const PrivacyPolicy = () => (
  //   <Card className="bg-white shadow-md border border-gray-200">
  //     <CardContent className="p-8">
  //       <div className="max-w-4xl mx-auto">
  //         <h1 className="text-3xl font-bold mb-6 text-gray-900">Privacy Policy</h1>
  //         <p className="text-sm text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
  //         <div className="space-y-8">

  //         </div>
  //       </div>
  //     </CardContent>
  //   </Card>
  // );


//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Navigation Tabs */}
//         <div className="mb-8">
//           <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg max-w-md mx-auto">
//             <a
//               href="#privacy"
//               onClick={() => setActivePage('privacy')}
//               className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors text-center ${
//                 activePage === 'privacy'
//                   ? 'bg-white text-gray-900 shadow-sm'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               Privacy Policy
//             </a>
//             <a
//               href="#terms"
//               onClick={() => setActivePage('terms')}
//               className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors text-center ${
//                 activePage === 'terms'
//                   ? 'bg-white text-gray-900 shadow-sm'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               Terms of Service
//             </a>
//           </div>
//         </div>

//         {/* Page Content */}
//         {activePage === 'privacy' ? <PrivacyPolicy /> : <TermsOfService />}
//       </div>
//     </div>
//   );
// };

export default PrivacyPolicy;