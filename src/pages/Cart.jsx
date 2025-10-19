// src/pages/Cart.jsx (FINAL, STABLE VERSION)
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import './Cart.css';

// --- CartItem Component (No changes needed, but included for completeness) ---
const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
    if (!item.product) return null; // Safety check
    return (
        <div className="cart-item-row">
            <img src={item.product.imageUrl} alt={item.product.name} className="cart-item-image" />
            <div className="cart-item-details">
                <h3 className="cart-item-name">{item.product.name}</h3>
                <p className="cart-item-price">₹{item.product.price}</p>
            </div>
            <div className="cart-item-quantity">
                <button type="button" onClick={() => onUpdateQuantity(item.product._id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => onUpdateQuantity(item.product._id, item.quantity + 1)}>+</button>
            </div>
            <p className="cart-item-subtotal">₹{item.product.price * item.quantity}</p>
            <button type="button" onClick={() => onRemove(item.product._id)} className="cart-item-remove">
                <FaTrashAlt />
            </button>
        </div>
    );
};

// --- Main Cart Component ---
const Cart = () => {
    const [cart, setCart] = useState(null); // Use a single state object for the cart
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    // Fetches the cart and updates the state
    const fetchCart = useCallback(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        setLoading(true);
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cart`, {
            headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
            setCart(res.data); // Set the entire cart object
        }).catch((err) => {
            console.error("Error fetching cart:", err);
        }).finally(() => {
            setLoading(false);
        });
    }, [navigate, token]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    // A single, reliable function to handle API calls and update state
    const handleCartUpdate = async (apiCall) => {
        try {
            const res = await apiCall();
            setCart(res.data); // Always update the cart with the server's response
        } catch (err) {
            console.error("Cart operation failed:", err.message);
        }
    };

    const handleRemove = (productId) => {
        handleCartUpdate(() => axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/cart/remove`, { productId }, {
            headers: { Authorization: `Bearer ${token}` }
        }));
    };

    const handleUpdateQuantity = (productId, newQuantity) => {
        handleCartUpdate(() => axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/cart/update`, { productId, quantity: newQuantity }, {
            headers: { Authorization: `Bearer ${token}` }
        }));
    };

    const cartItems = cart?.items || [];
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

    if (loading) {
        return <div className="loading-spinner"></div>;
    }

    return (
        <div className="cart-page-container">
            <header className="cart-header"><h1>Shopping Cart</h1></header>
            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <h2>Your cart is currently empty.</h2>
                    <Link to="/products" className="continue-shopping-btn">Continue Shopping</Link>
                </div>
            ) : (
                <div className="cart-layout">
                    <div className="cart-items-list">
                        {cartItems.map((item) => (
                            <CartItem
                                key={item._id || item.product._id} // Use a stable key
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
                            <span>₹{totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="summary-row"><span>Shipping</span><span>FREE</span></div>
                        <div className="summary-total">
                            <span>Total</span>
                            <span>₹{totalPrice.toFixed(2)}</span>
                        </div>
                        <button className="checkout-btn">Proceed to Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;