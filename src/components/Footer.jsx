import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Create this file if not already

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-cols">
        <div>
          <h3>SportSpark</h3>
          <p>Quality Sports Gear Since 2025</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <p><Link to="/">Home</Link></p>
          <p><Link to="/products">Products</Link></p>
          <p><Link to="/cart">Cart</Link></p>
        </div>
        <div>
          <h4>Contact</h4>
          <p>Email: support@sportspark.com</p>
          <p>Phone: +91 9876543210</p>
        </div>
      </div>
      <p className="copy">© 2025 SportSpark. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
