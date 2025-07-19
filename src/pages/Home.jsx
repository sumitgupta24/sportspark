import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/products");
      setProducts(res.data);
      console.log("Home products:", res.data); // ✅ Check if image is present here
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };
  fetchProducts();
}, []);


  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="overlay">
          <h1>Elevate Your Game</h1>
          <p>Gear up with the finest sports equipment</p>
          <br></br>
          <Link to="/products" className="cta-btn">Explore Now</Link>
        </div>
      </section>
<section className="slider-section fade-in">
  <h2>🏅 Featured Products</h2>
  <div className="slider">
  {products.slice(0, 10).map((product) => (
    <div className="slide-card" key={product._id}>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="slide-img"
      />
      <div className="slide-details">
        <h3>{product.name}</h3>
        <p>₹{product.price}</p>
      </div>
    </div>
  ))}
</div>

</section>

      {/* Categories */}
      <section className="categories-section fade-in">
        <h2>🛍️ Shop by Category</h2>
        <div className="categories">
          <div className="category glass">🏏 Cricket</div>
          <div className="category glass">⚽ Football</div>
          <div className="category glass">🏋️ Fitness</div>
          <div className="category glass">🎾 Tennis</div>
          <div className="category glass">👟 Footwear</div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section fade-in">
        <div className="feature">🚚 Free Delivery</div>
        <div className="feature">✅ Genuine Products</div>
        <div className="feature">📞 24/7 Support</div>
      </section>
      </div>
  );
};

export default Home;
