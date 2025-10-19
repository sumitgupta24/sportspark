// src/components/Footer.jsx (Revamped)
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Top Section: Newsletter Signup */}
        <div className="footer-subscribe">
          <h2 className="subscribe-title">Join the Winner's Circle</h2>
          <p className="subscribe-subtitle">Get exclusive deals, new product alerts, and training tips sent straight to your inbox.</p>
          <form className="subscribe-form">
            <input type="email" placeholder="Enter your email" className="subscribe-input" />
            <button type="submit" className="subscribe-button">Subscribe</button>
          </form>
        </div>

        {/* Middle Section: Links */}
        <div className="footer-links-grid">
          <div className="footer-column">
            <h4 className="footer-heading">Shop</h4>
            <Link to="/products">All Products</Link>
            <Link to="/categories/cricket">Cricket</Link>
            <Link to="/categories/football">Football</Link>
            <Link to="/categories/footwear">Footwear</Link>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">Support</h4>
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/shipping">Shipping & Returns</Link>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">Company</h4>
            <Link to="/about">About SportSpark</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">Follow Us</h4>
            <div className="social-icons">
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="YouTube"><FaYoutube /></a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} SportSpark. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;