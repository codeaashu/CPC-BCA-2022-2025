"use client"
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const HelpCenterPage = () => (
  <div className="min-h-screen bg-gray-50 py-8">
    <div className="max-w-6xl mx-auto px-4">
      <Card className="bg-white shadow-md border border-gray-200">
        <CardContent className="p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 mt-5 text-gray-900">EduPrep-AI Help Center</h1>
            <p className="text-sm text-gray-600 mb-8">Welcome to the EduPrep-AI Help Center! We're here to support you every step of the way. Below you'll find answers to common questions, guides, and resources to help you get the most out of our platform.</p>
            
            <div className="space-y-8">
            
            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">🔐 Getting Started</h2>
              <div className="space-y-6 text-gray-700">
                
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">How do I create an account?</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Click on the <strong>Sign Up</strong> button on the homepage</li>
                    <li>Enter your name, email, and password</li>
                    <li>Confirm your email address and log in</li>
                    <li>We also support <b>Google</b> login</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">How do I log in?</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Click on <strong>Login</strong> at the top right corner</li>
                    <li>Enter your registered email and password</li>
                  </ul>
                </div>

              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">💼 Jobs & Applications(Comming Soon)</h2>
              <div className="space-y-6 text-gray-700">
                
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">How can I view available jobs?</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Go to the <strong>Jobs</strong> section from the top menu</li>
                    <li>Browse through the listings and click on a job to see more details</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">How do I apply for a job?</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Login to your account</li>
                    <li>Open a job listing and click on <strong>Start Interview</strong></li>
                    <li>(If required) Enter the secret key</li>
                  </ul>
                </div>

              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">🎤 Mock Interviews</h2>
              <div className="space-y-6 text-gray-700">
                
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">What is a mock interview?</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>A simulated interview experience powered by AI</li>
                    <li>Helps you practice questions related to your selected job role</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">How do I start a mock interview?</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Visit a job detail page</li>
                    <li>Click on <strong>Start Interview</strong></li>
                    <li>Enter the secret key (temporary phase only)</li>
                    <li>Read instructions and begin the interview</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">When will the secret key be removed?</h3>
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p>Due to credit limitations, the key is required for the first 10–15 days. After that, interviews will be freely accessible to all users.</p>
                  </div>
                </div>

              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">🧠 Interview Feedback</h2>
              <div className="space-y-6 text-gray-700">
                
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">Where can I view my feedback?</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Go to your <strong>Profile</strong> by clicking the icon at the top right</li>
                    <li>View your list of completed interviews</li>
                    <li>Click on any interview to view the detailed feedback</li>
                  </ul>
                </div>

              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">👤 Profile & Settings</h2>
              <div className="space-y-6 text-gray-700">
                
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">How do I update my profile?</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Click on your profile icon</li>
                    <li>Basic Information: Name, profile image, detailed bio (up to 500 characters)</li>
                    <li>Location & Pronouns: Choose your city and preferred pronouns</li>
                    <li>Links: Personal website and calendar booking link</li>
                    <li>Skills and Tags: Add up to 10 relevant skills, tools, or roles (e.g. ReactJS, Fullstack Developer)</li>
                    <li>Suggested Skills: Easily add popular skills from our recommendation list</li>
                    <li>Social Media Links: Add Twitter, LinkedIn, Instagram, and GitHub handles</li>
                    <li>Make sure to Save Profile after making updates!</li>
                  </ul>
                </div>

              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">🏢 Enterprise Support(Comming Soon)</h2>
              <div className="space-y-6 text-gray-700">
                
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">I'm an organization. How do I post a job?</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Subscribe to the <strong>Enterprise Plan</strong></li>
                    <li>Use the dashboard to post jobs and view applications</li>
                    <li>Approve profiles of candidates that match your requirements</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">How much does it cost?</h3>
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <p><strong>Enterprise Job Posting Package:</strong> $99 for 50 interviews</p>
                  </div>
                </div>

              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">🛠 Troubleshooting</h2>
              <div className="space-y-6 text-gray-700">
                
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">I'm not receiving the confirmation email</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Check your spam or promotions folder</li>
                    <li>If it's still missing, contact us at <strong>suprabhat.work@gmail.com</strong></li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">My interview didn't start properly</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Refresh the page or clear your browser cache</li>
                    <li>Ensure you have a stable internet connection</li>
                    <li>Contact support if the issue persists</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">Interview feedback is not loading</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Wait a few minutes after completing the interview for feedback to process</li>
                    <li>Refresh your profile page</li>
                    <li>If the issue continues, reach out to our support team</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">Audio/Video issues during interview</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Check your microphone and camera permissions in browser settings</li>
                    <li>Ensure you're using a supported browser (Chrome, Firefox, Safari)</li>
                    <li>Test your audio/video before starting the interview</li>
                  </ul>
                </div>

              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">🔒 Privacy & Security</h2>
              <div className="space-y-6 text-gray-700">
                
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">How is my data protected?</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All interview data is encrypted and stored securely</li>
                    <li>We follow GDPR-compliant data practices</li>
                    <li>Your personal information is never shared without consent</li>
                    <li>For more details go on : <button className='bg-emerald-400 rounded-md p-18px m-10px'>
                    <a href="/privacy" className="text-white-100 hover:text-emerald-600">
                   Privacy & Security
                </a></button></li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">Can I delete my account?</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Yes, you can request account deletion by contacting support</li>
                    <li>All your data will be permanently removed within 30 days</li>
                  </ul>
                </div>

              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">💡 Tips for Success</h2>
              <div className="space-y-6 text-gray-700">
                
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">How to prepare for a mock interview?</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Research the job role and company beforehand</li>
                    <li>Practice common interview questions</li>
                    <li>Test your audio and video setup</li>
                    <li>Find a quiet, well-lit space for the interview</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">Making the most of feedback</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Review feedback immediately after each interview</li>
                    <li>Take notes on areas for improvement</li>
                    <li>Practice specific skills mentioned in the feedback</li>
                    <li>Retake interviews to track your progress</li>
                  </ul>
                </div>

              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">📬 Contact Us</h2>
              <div className="space-y-4 text-gray-700">
                <p>Still need help? We're here to support you!</p>
                <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                  <p><strong>General Support:</strong> suprabhat.work@gmail.com</p>
                  <p className="text-sm text-gray-600">We typically respond within 24 hours</p>
                  <div className="flex gap-4 mt-4">
                    <a
                      href="https://x.com/HireMentis"
                      target="_blank"
                      className="text-gray-400 hover:text-emerald-500 transition-colors"
                      rel="noopener noreferrer"
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
                      className="text-gray-400 hover:text-emerald-500 transition-colors"
                      rel="noopener noreferrer"
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
                <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <p className="font-medium text-emerald-800">We're here to help you succeed!</p>
                  <p className="text-sm text-emerald-700 mt-2">Your success is our priority. Don't hesitate to reach out with any questions or feedback.</p>
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

export default HelpCenterPage;