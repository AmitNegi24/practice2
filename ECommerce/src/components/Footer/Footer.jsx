
import React from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>About Us</h2>
          <p>
            We are XYZ Tech Solutions, a leading technology company dedicated to providing innovative solutions to our clients. With a team of skilled professionals, we specialize in software development, web design, and digital marketing.
          </p>
          <p>
            Our mission is to empower businesses with cutting-edge technologies, helping them thrive in the digital landscape. We are committed to delivering high-quality services that exceed our clients' expectations and contribute to their success.
          </p>
        </div>
        <div className="footer-section contact">
          <h2>Contact Information</h2>
          <p>Email: info@example.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>
        <div className="footer-section social">
          <h2>Connect with Us</h2>
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
      <div className="footer-bottom">
        <p>&copy; 2024 Dabba. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
