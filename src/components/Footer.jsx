// src/components/Footer.jsx (Attractive Dark Revamp)
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      {/* Section 1: Call to Action Banner */}
      <div className="footer-cta-banner">
        <div className="footer-container cta-content">
          <h2>Ready to Elevate Your Game?</h2>
          <p>Explore our curated collection of premium sports gear today.</p>
          <Link to="/products" className="cta-button">Shop All Products</Link>
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-container grid">
          {/* Column 1: Brand */}
          <div className="footer-column brand-column">
            <Link to="/" className="footer-brand-link">
              <img src="/logo.png" alt="SportSpark Logo" className="footer-logo" />
              <span>SportSpark</span>
            </Link>
            <p className="footer-slogan">Engineered for Victory.</p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="YouTube"><FaYoutube /></a>
            </div>
          </div>

          {/* Column 2-4: Links */}
          <div className="footer-column">
            <h4>Shop</h4>
            <Link to="/products">All Products</Link>
            <Link to="/categories/new">New Arrivals</Link>
            <Link to="/categories/sale">On Sale</Link>
          </div>
          <div className="footer-column">
            <h4>Support</h4>
            <Link to="/contact">Contact Us</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/shipping">Shipping & Returns</Link>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>

      {/* Section 3: Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-container bottom-content">
          <p>&copy; {new Date().getFullYear()} SportSpark. Built for the dedicated athlete.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;