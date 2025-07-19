import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/auth/signup", form);
      localStorage.setItem("token", res.data.token);
      navigate("/products");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError("Account already exists with this email.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create <span style={styles.highlight}>SportSpark</span> Account</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
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
          <button type="submit" style={styles.button}>Sign Up</button>
        </form>

        {error && <p style={styles.error}>{error}</p>}

        <p style={styles.footerText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>Login</Link>
        </p>
      </div>
    </div>
  );
};

// 🎨 Blue theme (matches login)
const blueTheme = {
  bg: "#e8f0fe",
  card: "#ffffff",
  accent: "#4285f4",
  inputBorder: "#ccc",
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
    backgroundImage: `url('/sports_bg.jpg')`, // ✅ Update with actual image if needed
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: blueTheme.bg,
    fontFamily: "Segoe UI, sans-serif",
    padding: "20px",
  },
  card: {
    backgroundColor: blueTheme.card,
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#202124",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: `1px solid ${blueTheme.inputBorder}`,
    outlineColor: blueTheme.accent,
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
  error: {
    marginTop: "10px",
    color: "#d93025",
    fontSize: "14px",
  },
  highlight: {
    color: pastel.gradientStart,
  },
  footerText: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#555",
  },
  link: {
    color: blueTheme.accent,
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Signup;
