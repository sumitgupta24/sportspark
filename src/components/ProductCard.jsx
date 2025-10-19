// src/components/ProductCard.jsx
import React from 'react';
import './ProductCard.css'; // We will create this file next

const ProductCard = ({ product }) => {
  if (!product) {
    return null; // Or a loading skeleton
  }

  return (
    <div className="product-card">
      <div className="product-card-image-container">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-card-image"
        />
      </div>
      <div className="product-card-details">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-price">₹{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;