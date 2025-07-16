import React from 'react';

const Footer = () => (
  <footer className="bg-secondary text-gray-400 py-10 px-6 mt-16">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <h3 className="text-white text-lg font-bold">GetMyShow</h3>
        <p className="text-sm mt-2">Bringing entertainment to your fingertips. Book tickets anytime, anywhere.</p>
      </div>
      <div>
        <h4 className="text-white font-semibold">Company</h4>
        <ul className="text-sm mt-2 space-y-1">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold">Get in Touch</h4>
        <p className="text-sm mt-2">+1 234 567 890<br />contact@example.com</p>
      </div>
    </div>
    <p className="text-center text-xs mt-10">© 2025 GetMyShow. All rights reserved.</p>
  </footer>
);

export default Footer;
