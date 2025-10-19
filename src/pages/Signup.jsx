// src/pages/Signup.jsx (Video Background & Asymmetrical Revamp)
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import './Signup.css'; // We will create this new CSS file

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(AuthContext); // Get setLoggedIn from context

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`, form);
      localStorage.setItem("token", res.data.token);
      setLoggedIn(true); // Update the auth state
      navigate("/products");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError("An account with this email already exists.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page-container">
      {/* Background Video */}
      <video className="background-video" autoPlay loop muted playsInline key="/login-bg.mp4">
        <source src="/hero-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-overlay"></div>

      {/* Left Side: Branding Content */}
      <div className="branding-content">
        <img src="/logo.png" alt="SportSpark Logo" className="logo" />
        <h1>Join the Movement</h1>
        <p>Create your account to unlock exclusive gear and become part of the SportSpark community.</p>
      </div>

      {/* Right Side: Glassmorphism Signup Card */}
      <div className="signup-card">
        <h3>Create Your Account</h3>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <p className="login-link">
          Already a member? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;