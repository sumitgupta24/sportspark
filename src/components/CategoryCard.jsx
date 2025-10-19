// src/components/CategoryCard.jsx
import React from 'react';
import './CategoryCard.css';

const CategoryCard = ({ icon, name, background }) => {
  return (
    <div className="category-card" style={{ backgroundImage: `url(${background})` }}>
      <div className="category-card-overlay">
        <div className="category-card-icon">{icon}</div>
        <h3 className="category-card-name">{name}</h3>
      </div>
    </div>
  );
};

export default CategoryCard;