"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const DocumentationPage = () => (
  <div className="min-h-screen bg-gray-50 py-8">
    <div className="max-w-6xl mx-auto px-4">
      <Card className="bg-white shadow-md border border-gray-200">
        <CardContent className="p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 mt-5 text-gray-900">
              HireMentis: AI Mock Interview Platform
            </h1>
            <p className="text-sm text-gray-600 mb-8">
              Platform Overview & Features
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Overview
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    <strong>HireMentis</strong> is an AI-powered platform built
                    to help job seekers simulate real interview experiences.
                    Whether you are a fresh graduate or an experienced
                    professional, HireMentis offers personalized mock
                    interviews, instant feedback, and a structured way to
                    prepare for job interviews more confidently and efficiently.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Current Features
                </h2>
                <div className="space-y-6 text-gray-700">
                  <div>
                    <h3 className="text-lg font-medium mb-3 text-gray-800">
                      1. Homepage Navigation
                    </h3>
                    <p>
                      A clean and modern landing page with sections including:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Home</li>
                      <li>Jobs</li>
                      <li>Features</li>
                      <li>How it Works</li>
                      <li>Pricing</li>
                      <li>Testimonials</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3 text-gray-800">
                      2. Jobs Section
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Browse available job listings</li>
                      <li>
                        Each listing includes job title, company, location, and
                        summary
                      </li>
                      <li>Click on a job to open a detailed job page</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3 text-gray-800">
                      3. Job Detail Page
                    </h3>
                    <p>Full description including:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Job responsibilities</li>
                      <li>Required skills</li>
                      <li>Preferred qualifications</li>
                      <li>Salary range (if available)</li>
                      <li>Company information</li>
                      <li>Button to Start Interview (requires login)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3 text-gray-800">
                      4. Authentication
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Secure login and signup process</li>
                      <li>User data protection and session management</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3 text-gray-800">
                      5. Secret Key Access (Temporary)
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        Users are required to enter a secret key to access
                        interview simulations
                      </li>
                      <li>
                        This restriction is temporary (10–15 days) due to credit
                        limitations
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3 text-gray-800">
                      6. Interview Page
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        Instructions page appears before the interview begins
                      </li>
                      <li>
                        Users must read all instructions and click Start
                        Interview
                      </li>
                      <li>
                        Interview is powered by AI and personalized to the
                        selected job
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3 text-gray-800">
                      7. AI-Driven Interview Simulation
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Realistic question/answer interaction</li>
                      <li>Time-limited or open-ended format</li>
                      <li>
                        Covers technical, behavioral, and situational questions
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3 text-gray-800">
                      8. Post-Interview Feedback
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Immediate and detailed feedback</li>
                      <li>
                        Includes strengths, improvement areas, and AI evaluation
                      </li>
                      <li>Feedback stored in user profile</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3 text-gray-800">
                      9. User Profile Dashboard
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        View and edit personal details like name, email,
                        pronouns, and location
                      </li>
                      <li>
                        Add a detailed bio and upload a professional profile
                        picture
                      </li>
                      <li>
                        Include your portfolio website and calendar scheduling
                        link
                      </li>
                      <li>
                        Select up to 10 skills, roles, or tools to highlight
                        your expertise
                      </li>
                      <li>
                        Add social media handles (LinkedIn, Twitter, Instagram,
                        GitHub)
                      </li>
                      <li>
                        View completed interviews and access detailed feedback
                        for each
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Upcoming Features
                </h2>
                <div className="space-y-6 text-gray-700">
                  <div>
                    <h3 className="text-lg font-medium mb-3 text-gray-800">
                      1. Resume Review Tool
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        Upload your resume for AI-based analysis and suggestions
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3 text-gray-800">
                      2. Mock HR & Behavioral Rounds
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Simulate non-technical interview rounds</li>
                      <li>
                        Focus on communication, culture fit, and soft skills
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3 text-gray-800">
                      3. Custom Interview Sets
                    </h3>
                    <p>Users can create or select interview sets based on:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Role</li>
                      <li>Industry</li>
                      <li>Experience level</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3 text-gray-800">
                      4. Interview History Analytics
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Visual insights into progress over time</li>
                      <li>
                        Track performance by category (e.g., technical,
                        communication)
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3 text-gray-800">
                      5. Gamified Practice Mode
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Practice with daily challenges</li>
                      <li>Earn points, badges, and rank on leaderboards</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3 text-gray-800">
                      6. Collaborative Interview Rooms
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Peer-to-peer mock interviews</li>
                      <li>
                        Invite friends or mentors to simulate interviews
                        together
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3 text-gray-800">
                      7. AI-Coach Mode
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Personalized guidance before and after interviews</li>
                      <li>
                        Role-specific tips, common questions, and preparation
                        checklists
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Final Notes
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    HireMentis is committed to making interview preparation
                    smarter and more accessible. The current version focuses on
                    essential features for job simulation and feedback, while
                    upcoming updates aim to make the platform even more powerful
                    with resume reviews, analytics, and social learning
                    features.
                  </p>
                  <p>
                    Stay tuned for new updates and thank you for supporting
                    HireMentis!
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Contact Information
                </h2>
                <div className="text-gray-700">
                  <p>
                    For questions, feedback, or support regarding the HireMentis
                    platform, please contact us at:
                  </p>
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p>
                      <strong>Email:</strong> suprabhat.work@gmail.com
                    </p>
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

export default DocumentationPage;
