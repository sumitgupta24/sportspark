import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [successProductId, setSuccessProductId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/products")
      .then((res) => {
        setProducts(res.data);
        const initialQuantities = {};
        res.data.forEach((product) => {
          initialQuantities[product._id] = 0;
        });
        setQuantities(initialQuantities);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch products:", err.message);
      });
  }, []);

  const handleQuantityChange = (id, change) => {
    setQuantities((prev) => {
      const newQty = Math.max(0, (prev[id] || 0) + change);
      return { ...prev, [id]: newQty };
    });
  };

  const handleAddToCart = (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to add items to your cart.");
      return;
    }

    const quantity = quantities[productId] || 0;

    axios
      .post(
        "http://localhost:4000/api/cart/add",
        { productId, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setSuccessProductId(productId);
        setTimeout(() => setSuccessProductId(null), 2000);
      })
      .catch((err) => {
        console.error("❌ Error adding to cart:", err.response?.data || err.message);
      });
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div style={styles.page}>
        <h2 style={styles.heading}>🏏 Explore Our Premium Sports Gear</h2>

        <input
          type="text"
          placeholder="🔍 Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchBar}
        />

        {filteredProducts.length === 0 ? (
          <p style={styles.loading}>Loading products...</p>
        ) : (
          <div style={styles.grid}>
            {filteredProducts.map((product) => (
              <div key={product._id} style={styles.card}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={styles.image}
                />
                <h3 style={styles.title}>{product.name}</h3>
                <p style={styles.desc}>{product.description}</p>
                <p style={styles.price}>₹{product.price}</p>

                <div style={styles.qtyRow}>
                  <button
                    onClick={() => handleQuantityChange(product._id, -1)}
                    style={styles.qtyBtn}
                  >
                    −
                  </button>
                  <span style={styles.qtyDisplay}>{quantities[product._id] || 0}</span>
                  <button
                    onClick={() => handleQuantityChange(product._id, 1)}
                    style={styles.qtyBtn}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleAddToCart(product._id)}
                  style={{
                    ...styles.button,
                    backgroundColor:
                      (quantities[product._id] || 0) === 0 ? "#ccc" : pastel.accent,
                    cursor:
                      (quantities[product._id] || 0) === 0 ? "not-allowed" : "pointer",
                  }}
                  disabled={(quantities[product._id] || 0) === 0}
                >
                  Add to Cart
                </button>

                {successProductId === product._id && (
                  <div style={styles.successMsg}>✅ Added to cart!</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const pastel = {
  bg: "#f4f7ff",
  card: "#ffffff",
  accent: "#66d9e8",
  dark: "#2a2a2a",
  shadow: "rgba(0, 0, 0, 0.1)",
};

const styles = {
  page: {
    backgroundColor: pastel.bg,
    minHeight: "100vh",
    padding: "40px 20px",
    fontFamily: "Segoe UI, sans-serif",
  },
  heading: {
    fontSize: "32px",
    marginBottom: "30px",
    color: pastel.dark,
    textAlign: "center",
  },
  searchBar: {
    display: "block",
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto 30px",
    padding: "12px 16px",
    fontSize: "16px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    boxShadow: `0 4px 10px ${pastel.shadow}`,
  },
  loading: {
    fontSize: "18px",
    color: "#777",
    textAlign: "center",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    justifyContent: "center",
  },
  card: {
    backgroundColor: pastel.card,
    borderRadius: "16px",
    padding: "20px",
    width: "270px",
    boxShadow: `0 6px 16px ${pastel.shadow}`,
    transition: "transform 0.2s",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "12px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    color: pastel.dark,
    textAlign: "center",
  },
  desc: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "8px",
    textAlign: "center",
  },
  price: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: "10px",
  },
  qtyRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    gap: "10px",
  },
  qtyBtn: {
    padding: "6px 12px",
    fontSize: "16px",
    backgroundColor: "#ddd",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  qtyDisplay: {
    fontSize: "16px",
    fontWeight: "bold",
    minWidth: "20px",
    textAlign: "center",
  },
  button: {
    padding: "10px 16px",
    fontSize: "15px",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontWeight: "bold",
    transition: "background 0.3s",
  },
  successMsg: {
    position: "absolute",
    bottom: "-30px",
    fontSize: "14px",
    color: "green",
    fontWeight: "bold",
    marginTop: "8px",
    animation: "fadeInOut 2s ease-in-out",
  },
};

export default ProductPage;
