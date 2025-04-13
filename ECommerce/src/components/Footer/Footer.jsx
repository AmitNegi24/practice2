import React from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* About Us Section */}
        <div className="footer-section about">
          <h2>Our Company</h2>
          <p>
            We are InnovateTech, a cutting-edge software company focused on delivering tailored solutions that drive business success.
            Our expertise ranges from AI-driven applications to secure cloud platforms, helping you achieve your goals with technology.
          </p>
          <p>
            Innovation, security, and customer satisfaction are at the heart of everything we do.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <p><a href="/about-us">About Us</a></p>
          <p><a href="/services">Services</a></p>
          <p><a href="/blog">Blog</a></p>
          <p><a href="/contact-us">Contact Us</a></p>
        </div>

        {/* Contact Information Section */}
        <div className="footer-section contact">
          <h2>Contact</h2>
          <p>Email: support@innovatetech.com</p>
          <p>Phone: +1 (800) 123-4567</p>
          <p>Address: 789 Tech Avenue, Silicon Valley, CA</p>
        </div>

        {/* Social Media Links Section */}
        <div className="footer-section social">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <p>&copy; 2024 InnovateTech. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
