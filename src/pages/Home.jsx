// src/pages/Home.jsx (Completely Revamped)
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard"; // <-- New Component
import "./Home.css";

// --- Data for Categories ---
const categories = [
  { name: "Cricket", icon: "🏏", background: "/cricket-bg.jpg" },
  { name: "Football", icon: "⚽", background: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO1Xy7iCwBYQUjG8YKgIk4f6wDtSC8obBR0Q&s" },
  { name: "Fitness", icon: "🏋️", background: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500" },
  { name: "Footwear", icon: "👟", background: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500" },
];

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      {/* 1. Hero Section */}
      <section className="hero-section">
        <video className="hero-video" autoPlay loop muted playsInline>
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Unleash Your Potential</h1>
          <p className="hero-subtitle">Premium gear for the modern athlete. Engineered for victory.</p>
          <Link to="/products" className="hero-cta-btn">Shop Now</Link>
        </div>
      </section>

      {/* 2. Featured Products Section */}
      <section className="home-section featured-products">
        <div className="section-header">
          <h2 className="section-title">Champion's Choice</h2>
          <p className="section-subtitle">Discover our top-rated gear, trusted by athletes everywhere.</p>
        </div>
        <div className="product-slider">
          {products.length > 0 ? (
            products.slice(0, 10).map((product) => <ProductCard key={product._id} product={product} />)
          ) : (
            <p>Loading products...</p>
          )}
        </div>
      </section>

      {/* 3. Categories Section */}
      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">Explore Your Passion</h2>
          <p className="section-subtitle">Whatever your sport, we've got you covered.</p>
        </div>
        <div className="category-grid">
          {categories.map(cat => (
            <CategoryCard key={cat.name} icon={cat.icon} name={cat.name} background={cat.background} />
          ))}
        </div>
      </section>

       {/* 4. Why Choose Us Section */}
      <section className="home-section why-choose-us">
          <div className="section-header">
              <h2 className="section-title">Why SportSpark?</h2>
          </div>
          <div className="features-grid">
              <div className="feature-item">
                  <h3>🚚</h3>
                  <h4>Fast & Free Shipping</h4>
                  <p>Get your gear in record time with our complimentary express delivery.</p>
              </div>
              <div className="feature-item">
                  <h3>🛡️</h3>
                  <h4>Guaranteed Quality</h4>
                  <p>100% authentic products sourced directly from top-tier brands.</p>
              </div>
              <div className="feature-item">
                  <h3>💬</h3>
                  <h4>Expert Support</h4>
                  <p>Our team of sports enthusiasts is here to help you make the right choice.</p>
              </div>
          </div>
      </section>

    </div>
  );
};

export default Home;