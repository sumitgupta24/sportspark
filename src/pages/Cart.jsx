import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchCart = () => {
    axios
      .get("http://localhost:4000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCartItems(res.data.items || []);
      })
      .catch((err) => {
        console.error("Error fetching cart:", err.message);
        navigate("/login");
      });
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchCart();
    }
  }, [navigate, token]);

  const handleRemove = async (productId) => {
    try {
      await axios.put(
        "http://localhost:4000/api/cart/remove",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (err) {
      console.error("Remove failed:", err.message);
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p style={styles.empty}>Your cart is empty. Let’s go shopping!</p>
      ) : (
        <>
          <div style={styles.grid}>
            {cartItems.map((item) => (
              <div key={item._id} style={styles.card}>
                <img
                  src={item.product?.imageUrl}
                  alt={item.product?.name}
                  style={styles.image}
                />
                <h3 style={styles.name}>{item.product?.name}</h3>
                <p style={styles.price}>Price: ₹{item.product?.price || 0}</p>

                <div style={styles.quantity}>
                  <span style={styles.qtyValue}>Quantity: {item.quantity}</span>
                </div>

                <p style={styles.subtotal}>
                  Subtotal: ₹{(item.product?.price || 0) * item.quantity}
                </p>

                <button
                  onClick={() => handleRemove(item.product._id)}
                  style={styles.deleteBtn}
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}
          </div>

          <div style={styles.totalBox}>
            <h3>Total Items: {cartItems.length}</h3>
            <h2>Total: ₹{totalPrice}</h2>
            <button style={styles.checkoutBtn}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  page: {
    background: "linear-gradient(to right, #e8f0ff, #ffffff)",
    minHeight: "100vh",
    padding: "40px 20px",
    fontFamily: "Poppins, sans-serif",
  },
  heading: {
    fontSize: "32px",
    marginBottom: "30px",
    color: "#333",
    textAlign: "center",
  },
  empty: {
    textAlign: "center",
    fontSize: "18px",
    color: "#777",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    width: "250px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.08)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "transform 0.2s ease",
  },
  image: {
    width: "100%",
    height: "160px",
    objectFit: "contain",
    borderRadius: "8px",
  },
  name: {
    fontSize: "18px",
    fontWeight: "600",
    textAlign: "center",
    margin: "12px 0 6px",
  },
  price: {
    fontSize: "16px",
    color: "#555",
  },
  quantity: {
    margin: "10px 0",
  },
  qtyValue: {
    fontWeight: "bold",
    fontSize: "16px",
    color: "#333",
  },
  subtotal: {
    fontWeight: "500",
    color: "#222",
    marginTop: "8px",
  },
  deleteBtn: {
    position: "absolute",
    top: "12px",
    right: "12px",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    color: "#c0392b",
  },
  totalBox: {
    marginTop: "40px",
    textAlign: "center",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    maxWidth: "320px",
    marginInline: "auto",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.08)",
  },
  checkoutBtn: {
    marginTop: "16px",
    padding: "12px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#2ecc71",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
  },
};

export default Cart;
