"use client"
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const EnterprisePage = () => (
  <div className="min-h-screen bg-gray-50 py-8">
    <div className="max-w-6xl mx-auto px-4">
      <Card className="bg-white shadow-md border border-gray-200">
        <CardContent className="p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 mt-5 text-gray-900">HireMentis Enterprise</h1>
            <p className="text-sm text-gray-600 mb-8">Tailored solutions for organizations and educational institutions</p>
            
            <div className="space-y-8">
            
            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Overview</h2>
              <div className="space-y-4 text-gray-700">
                <p><strong>HireMentis Enterprise</strong> is a tailored solution for organizations and educational institutions to streamline mock interview training and hiring readiness. Designed for scalability and control, the Enterprise plan enables companies to manage candidate preparation, monitor interview performance, and integrate talent evaluation with organizational workflows.</p>
                <p>Whether you're a university placement cell, a bootcamp, or a large organization with in-house training, HireMentis Enterprise ensures your users receive structured, AI-powered interview preparation customized to your needs.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Key Features</h2>
              <div className="space-y-6 text-gray-700">
                
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">1. Custom Interview Packs</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Organizations can define role-based interview formats</li>
                    <li>Custom question banks per job role, industry, or experience level</li>
                    <li>Assign specific interview types to user groups (e.g., interns, final-year students)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">2. Centralized Admin Dashboard</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Manage user access and permissions</li>
                    <li>Monitor interview activity, success rates, and performance trends</li>
                    <li>Track organization-wide usage and engagement</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">3. Bulk User Onboarding</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Add users via CSV upload or SSO integration</li>
                    <li>Group users by batch, role, or team</li>
                    <li>Automated welcome emails and credential setup</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">4. White-Labeling Support</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Customize branding (logo, colors, URL)</li>
                    <li>Add institution-specific guidelines and pre/post-interview messages</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">5. Advanced Feedback Analytics</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Organization-level insights on common skill gaps</li>
                    <li>Compare performance across departments or groups</li>
                    <li>Exportable reports for internal analysis or review</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">6. Interview Scheduling</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Set interview windows and deadlines</li>
                    <li>Automate reminders and follow-ups</li>
                    <li>Support for both AI-driven and human-evaluator interviews</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">7. Human Evaluator Panel (Optional)</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Invite real interviewers to join sessions</li>
                    <li>Schedule interviews between users and experts</li>
                    <li>Combine human + AI scoring for richer feedback</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">8. Job Posting & Candidate Approval</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Enterprises can post jobs directly on the HireMentis platform</li>
                    <li>Users can apply to listed jobs via their dashboard</li>
                    <li>Enterprises review applications and approve user profiles if they find them a good fit</li>
                    <li>An effective way to discover, evaluate, and shortlist talent</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">9. Security & Compliance</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>GDPR-ready data practices</li>
                    <li>Role-based access control</li>
                    <li>Encrypted interview data and logs</li>
                  </ul>
                </div>

              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Use Cases</h2>
              <div className="space-y-6 text-gray-700">
                
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">🎓 Educational Institutions</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Final-year placement training</li>
                    <li>Department-wise skill analysis</li>
                    <li>Career readiness certification</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">🏢 Enterprises & HR Teams</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Pre-hiring candidate benchmarking</li>
                    <li>Internal mobility and upskilling</li>
                    <li>Training new hires or interns</li>
                    <li>Post job roles, receive student applications, and approve candidates based on profile quality</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">🧑‍🏫 Bootcamps & EdTechs</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>End-of-module assessments</li>
                    <li>Track learner progress over time</li>
                    <li>Combine with course curriculum</li>
                  </ul>
                </div>

              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Pricing</h2>
              <div className="space-y-4 text-gray-700">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <p><strong>Enterprise Job Posting Package:</strong> $99 for 50 interviews</p>
                  <p className="mt-2 text-sm">Ideal for companies looking to source and screen talent</p>
                </div>
                <p>Educational institutions and training providers can subscribe to the Enterprise plan for structured student preparation.</p>
                 {/* contact us at: <strong>enterprise@HireMentis.com</strong> */}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Upcoming Enterprise Features</h2>
              <div className="space-y-6 text-gray-700">
                
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">🔁 LMS Integration</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Plug into existing Learning Management Systems (Moodle, Canvas, etc.)</li>
                    <li>Sync user data, grades, and milestones</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">🤝 API Access</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Endpoints for managing users, results, and interview triggers</li>
                    <li>Custom workflow integration into internal systems</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">🧠 Skill Mapping Engine</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Tag interview questions with industry skill frameworks (like SFIA or NASSCOM)</li>
                    <li>Identify where your talent pipeline needs strengthening</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-800">🌐 Multi-Language Support</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Offer mock interviews in regional and global languages</li>
                    <li>Build inclusive training environments</li>
                  </ul>
                </div>

              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Final Notes</h2>
              <div className="space-y-4 text-gray-700">
                <p>HireMentis Enterprise aims to empower organizations to take control of career readiness and hiring preparation. With powerful tools, analytics, and customization, we help you bridge the gap between learning and employability — at scale.</p>
                <p><strong>Let's build better interview experiences, together.</strong></p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Contact Information</h2>
              <div className="text-gray-700">
                <p>For Enterprise inquiries, custom quotes, or bulk plans, please contact us at:</p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-2">
                  {/* <p><strong>Enterprise Email:</strong> enterprise@HireMentis.com</p> */}
                  <p><strong>General Support:</strong> suprabhat.work@gmail.com</p>
                  <div className="flex gap-4 mt-4">
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

export default EnterprisePage;