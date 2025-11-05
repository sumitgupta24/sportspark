// src/components/Footer.jsx (Revamped, No Icons)
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      {/* Section 1: Call to Action Banner (Optional, but nice) */}
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
          <p>&copy; {new Date().getFullYear()} SportSpark. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;