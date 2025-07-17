import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2 className="footer-logo">Medicos</h2>
          <p className="footer-desc">
            Your trusted online medical store with AI-powered support. Quality
            medicines and personalized care delivered to your door.
          </p>
          <div className="social-icons">
            <a href="#">
              <i className="bx bxl-facebook-square"></i>
            </a>
            <a href="#">
              <i className="bx bxl-twitter"></i>
            </a>
            <a href="#">
              <i className="bx bxl-instagram"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">Track Order</a>
            </li>
            <li>
              <a href="#">Store Locator</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Categories</h4>
          <ul>
            <li>
              <a href="#">Medicines</a>
            </li>
            <li>
              <a href="#">Skin Care</a>
            </li>
            <li>
              <a href="#">Baby Care</a>
            </li>
            <li>
              <a href="#">Ayurveda</a>
            </li>
            <li>
              <a href="#">Hair Care</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
            <li>
              <a href="#">Return Policy</a>
            </li>
            <li>
              <a href="#">AI Assistant Help</a>
            </li>
          </ul>
          <div className="support-contact">
            <p>
              <strong>24/7 Support</strong>
            </p>
            <p>📞 +1-800-MEDICOS</p>
            <p>📧 support@medicos.com</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 Medicos. All rights reserved. | Pharmacy License: #PH12345
      </div>
    </footer>
  );
};

export default Footer;
