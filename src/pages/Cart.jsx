// src/pages/Cart.jsx (Industry-Ready Revamp)
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import './Cart.css'; // We'll create this CSS file next

// --- Reusable Cart Item Row Component ---
const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <div className="cart-item-row">
      <img src={item.product?.imageUrl} alt={item.product?.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.product?.name}</h3>
        <p className="cart-item-price">₹{item.product?.price || 0}</p>
      </div>
      <div className="cart-item-quantity">
        <button onClick={() => onUpdateQuantity(item.product._id, item.quantity - 1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(item.product._id, item.quantity + 1)}>+</button>
      </div>
      <p className="cart-item-subtotal">₹{(item.product?.price || 0) * item.quantity}</p>
      <button onClick={() => onRemove(item.product._id)} className="cart-item-remove">
        <FaTrashAlt />
      </button>
    </div>
  );
};

// --- Main Cart Page Component ---
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchCart = useCallback(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    setLoading(true);
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      setCartItems(res.data.items || []);
      setLoading(false);
    }).catch((err) => {
      console.error("Error fetching cart:", err.message);
      setLoading(false);
      navigate("/login");
    });
  }, [navigate, token]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleRemove = async (productId) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/cart/remove`, { productId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCart(); // Re-fetch the cart to get the updated state
    } catch (err) {
      console.error("Remove failed:", err.message);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemove(productId); // Remove item if quantity goes below 1
      return;
    }
    // Optimistic UI update for a snappy feel
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.product._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );

    try {
      // NOTE: Assumes you have a backend endpoint to handle quantity updates
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/cart/update`, { productId, quantity: newQuantity }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error("Update quantity failed:", err.message);
      fetchCart(); // Revert to server state if the API call fails
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

  if (loading) {
    return <div className="loading-spinner"></div>;
  }

  return (
    <div className="cart-page-container">
      <header className="cart-header">
        <h1>Shopping Cart</h1>
      </header>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is currently empty.</h2>
          <p>Looks like you haven't added anything to your cart yet. Let's find something for you!</p>
          <Link to="/products" className="continue-shopping-btn">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <CartItem
                key={item.product._id}
                item={item}
                onRemove={handleRemove}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))}
          </div>
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal ({cartItems.length} items)</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;