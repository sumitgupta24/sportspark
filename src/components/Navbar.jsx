// src/components/Navbar.jsx (Final, Clean Version)
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Adds a shadow when the user scrolls
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar-header ${isScrolled ? "is-scrolled" : ""}`}>
      <nav className="navbar-container">
        {/* Left Side: Brand/Logo */}
        <NavLink to="/" className="navbar-brand">
          <img src="/logo.png" alt="SportSpark Logo" className="navbar-logo" />
          <span>SportSpark</span>
        </NavLink>

        {/* Hamburger Icon for Mobile */}
        <button
          className={`navbar-hamburger ${menuOpen ? "is-active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Right Side: Links and Buttons */}
        <div className={`navbar-menu ${menuOpen ? "is-active" : ""}`}>
          <div className="navbar-links">
            <NavLink to="/" onClick={closeMenu}>Home</NavLink>
            <NavLink to="/products" onClick={closeMenu}>Products</NavLink>
            <NavLink to="/cart" onClick={closeMenu}>Cart</NavLink>
          </div>

          <div className="navbar-auth">
            {!loggedIn ? (
              <>
                <NavLink to="/login" className="nav-button-secondary" onClick={closeMenu}>Login</NavLink>
                <NavLink to="/signup" className="nav-button-primary" onClick={closeMenu}>Sign Up</NavLink>
              </>
            ) : (
              <button className="nav-button-primary" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;