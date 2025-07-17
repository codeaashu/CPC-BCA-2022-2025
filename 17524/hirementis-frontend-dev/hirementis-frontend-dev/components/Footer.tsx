"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "./ui/logo";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">
                H
              </div>
              <span className="text-lg font-bold">EduPrep-AI</span>
            </div>
            <p className="text-gray-500 mb-6">
              Helping job seekers land their dream roles through AI-powered
              interview preparation.
            </p>
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
              {/* <a href="#" className="text-gray-400 hover:text-emerald-500">
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </a> */}
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

          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/#features"
                  className="text-gray-600 hover:text-emerald-600"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="/#pricing"
                  className="text-gray-600 hover:text-emerald-600"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/#testimonials"
                  className="text-gray-600 hover:text-emerald-600"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="/enterprise"
                  className="text-gray-600 hover:text-emerald-600"
                >
                  Enterprise
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/helpcenter"
                  className="text-gray-600 hover:text-emerald-600"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="/documentation"
                  className="text-gray-600 hover:text-emerald-600"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="mailto:jaiswaldiwakar91@gmail.com"
                  className="text-gray-600 hover:text-emerald-600"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600">
                  Status
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/documentation"
                  className="text-gray-600 hover:text-emerald-600"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/founders"
                  className="text-gray-600 hover:text-emerald-600"
                >
                  Meet the Founders
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600">
                  Press
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-500 text-sm">
              © 2025 EduPrep-AI. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6">
            <a
              href="/privacy"
              className="text-gray-500 text-sm hover:text-emerald-600"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-gray-500 text-sm hover:text-emerald-600"
            >
              Terms of Service
            </a>
          </div>
        </div> */}

        <footer
          className="py-10 relative text-white grid place-items-center"
          style={{
            backgroundImage: `
      radial-gradient(circle at 84.59302325581395% 18.13953488372093%, #6299f2 0px, transparent 80%),
      radial-gradient(circle at 100% 96.74418604651163%, #5746d9 0px, transparent 80%)
    `,
            backgroundColor: "#1f1f2e", // optional fallback
          }}
        >
          <Logo className="w-16" />
          <div className="relative max-w-7xl mt-5 mx-auto px-6 text-center">
            <p>
              © 2025 EduPrep-AI. All rights reserved. Built by{" "}
              <Link href="" target="_blank" className="hover:underline">
                Diwakar
              </Link>{" "}
              and{" "}
              <Link href="" target="_blank" className="hover:underline">
                ChatGpt
              </Link>
              .
            </p>
          </div>
        </footer>
      </div>
    </footer>
  );
};

export default Footer;
