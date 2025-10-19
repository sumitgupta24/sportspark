// src/pages/ProductPage.jsx (Completely Revamped)
import { useEffect, useState } from "react";
import axios from "axios";
import { FaShoppingCart } from 'react-icons/fa';
import './ProductPage.css';

// --- Reusable Product Card Component ---
const ProductCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCartClick = () => {
    onAddToCart(product._id, quantity);
  };

  return (
    <div className="product-card">
      <div className="product-card-image-container">
        <img src={product.imageUrl} alt={product.name} className="product-card-image" />
      </div>
      <div className="product-card-content">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-description">{product.description}</p>
        <p className="product-card-price">₹{product.price}</p>
        <div className="product-card-actions">
          <div className="quantity-selector">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>
          <button className="add-to-cart-button" onClick={handleAddToCartClick}>
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};


// --- Main Product Page Component ---
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch products:", err.message);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (productId, quantity) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to add items to your cart.");
      return;
    }

    axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/cart/add`, { productId, quantity }, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      const product = products.find(p => p._id === productId);
      setNotification(`Added "${product.name}" to cart!`);
      setTimeout(() => setNotification(""), 3000); // Notification disappears after 3 seconds
    }).catch((err) => {
      console.error("❌ Error adding to cart:", err.response?.data || err.message);
      alert("Failed to add item to cart.");
    });
  };

  const filteredAndSortedProducts = products
    .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(product => categoryFilter === "All" || product.category === categoryFilter) // Assuming products have a 'category' field
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

  const categories = ["All", "Cricket", "Football", "Fitness", "Tennis", "Footwear"]; // Example categories

  return (
    <div className="product-page-container">
      {/* --- Page Header --- */}
      <header className="page-header">
        <h1>Our Collection</h1>
        <p>Find the perfect gear to conquer your goals.</p>
      </header>

      <div className="product-page-layout">
        {/* --- Sidebar for Filters --- */}
        <aside className="filter-sidebar">
          <h4>Filters</h4>
          <div className="filter-group">
            <label>Category</label>
            <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="filter-group">
            <label>Search</label>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </aside>

        {/* --- Main Content: Sort + Grid --- */}
        <main className="main-content">
          <div className="toolbar">
            <label>Sort by:</label>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="default">Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {loading ? (
            <div className="loading-spinner"></div>
          ) : (
            <div className="product-grid">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          )}
        </main>
      </div>
      
      {/* Add to Cart Notification */}
      {notification && <div className="cart-notification">{notification}</div>}
    </div>
  );
};

export default ProductPage;