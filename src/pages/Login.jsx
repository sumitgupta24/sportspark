import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(AuthContext);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // clear error while typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      setLoggedIn(true);
      setShouldNavigate(true);
    } catch (err) {
      setError("❌ Invalid email or password.");
    }
  };

  useEffect(() => {
    if (shouldNavigate) {
      navigate("/products");
    }
  }, [shouldNavigate, navigate]);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login to <span style={styles.highlight}>SportSpark</span></h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          {error && <div style={styles.error}>{error}</div>}
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p style={styles.footerText}>
          New here? <Link to="/signup" style={styles.link}>Create an account</Link>
        </p>
      </div>
    </div>
  );
};

const pastel = {
  bg: "#eaf4ff",
  card: "#ffffff",
  border: "#cfd9e4",
  error: "#e63946",
  gradientStart: "#007cf0",
  gradientEnd: "#00dfd8"
};

const styles = {
  page: {
    backgroundImage: `url('/sports_bg.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Segoe UI, sans-serif",
    padding: "20px",
  },
  card: {
    backgroundColor: pastel.card,
    padding: "40px 30px",
    borderRadius: "12px",
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.12)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    fontSize: "26px",
    fontWeight: "bold",
    color: "#222",
  },
  highlight: {
    color: pastel.gradientStart,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px 14px",
    fontSize: "16px",
    borderRadius: "8px",
    border: `1px solid ${pastel.border}`,
    outline: "none",
    transition: "0.2s ease-in-out",
  },
  button: {
    padding: "12px",
    backgroundImage: `linear-gradient(to right, ${pastel.gradientStart}, ${pastel.gradientEnd})`,
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "opacity 0.3s ease",
  },
  footerText: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#555",
  },
  link: {
    color: pastel.gradientStart,
    textDecoration: "none",
    fontWeight: "bold",
  },
  error: {
    color: pastel.error,
    fontSize: "14px",
    marginTop: "-10px",
    marginBottom: "-5px",
  },
};

export default Login;
