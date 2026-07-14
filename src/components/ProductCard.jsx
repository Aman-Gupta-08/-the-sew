import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ProductCard({ product }) {
  const { toggleWishlist, isWishlisted, setQuickViewProduct } = useApp();
  const [isHovered, setIsHovered] = useState(false);
  const [heartScale, setHeartScale] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHeartScale(true);
    toggleWishlist(product.id);
    setTimeout(() => setHeartScale(false), 300);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  // Calculate discount percentage
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div 
      className="glass-card position-relative overflow-hidden h-100 d-flex flex-column"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: '1px solid var(--border-color)',
        transition: 'var(--transition-smooth)'
      }}
    >
      {/* Product Image Section */}
      <div className="hover-zoom-img position-relative overflow-hidden" style={{ aspectRatio: '1/1', background: 'var(--bg-secondary)' }}>
        
        {/* Discount Badge */}
        {discount > 0 && (
          <span 
            className="position-absolute badge-gold top-0 start-0 m-3" 
            style={{ 
              zIndex: 10, 
              background: 'var(--accent-pink)',
              color: '#fff',
              borderRadius: '30px',
              padding: '6px 12px',
              fontWeight: '600'
            }}
          >
            {discount}% OFF
          </span>
        )}

        {/* Wishlist Heart Icon */}
        <button
          onClick={handleWishlistClick}
          className="btn rounded-circle d-flex align-items-center justify-content-center position-absolute top-0 end-0 m-3"
          style={{
            zIndex: 10,
            width: '40px',
            height: '40px',
            background: 'rgba(255, 255, 255, 0.8)',
            border: 'none',
            backdropFilter: 'blur(4px)',
            color: wishlisted ? '#E91E63' : 'var(--text-primary)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            transform: heartScale ? 'scale(1.3)' : 'scale(1)',
            transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), color 0.2s ease'
          }}
        >
          <Heart size={18} fill={wishlisted ? '#E91E63' : 'none'} style={{ strokeWidth: wishlisted ? 0 : 2 }} />
        </button>

        {/* Actual Image */}
        <img 
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]} 
          alt={product.name} 
          className="w-100 h-100 object-fit-cover" 
          style={{ 
            transition: 'transform 1.2s cubic-bezier(0.15, 1, 0.3, 1), opacity 0.5s ease',
            transform: isHovered ? 'scale(1.08)' : 'scale(1)'
          }}
        />

        {/* Quick View Button (Shows on Hover) */}
        <div 
          className="position-absolute bottom-0 start-0 w-100 p-3 d-flex justify-content-center align-items-center gap-2"
          style={{
            zIndex: 10,
            transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.3) 0%, rgba(0,0,0,0) 100%)'
          }}
        >
          <button 
            onClick={handleQuickViewClick} 
            className="btn btn-neumorphic d-flex align-items-center gap-2 py-2 px-3 shadow"
            style={{ 
              fontSize: '0.8rem',
              fontWeight: '600',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              borderRadius: '50px'
            }}
          >
            <Eye size={14} /> Quick View
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3 d-flex flex-column flex-grow-1">
        {/* Subcategory Name */}
        <span className="text-muted text-uppercase mb-1" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', fontWeight: '600' }}>
          {product.subcategory}
        </span>

        {/* Product Title */}
        <Link to={`/product/${product.id}`} className="text-decoration-none flex-grow-1 mb-2">
          <h5 className="font-serif text-primary m-0 fs-6 line-clamp-2 hover-text-gold" style={{ height: '2.4rem', lineHeight: '1.2rem', overflow: 'hidden' }}>
            {product.name}
          </h5>
        </Link>

        {/* Price & Rating Row */}
        <div className="d-flex align-items-center justify-content-between mt-auto">
          {/* Price */}
          <div className="d-flex align-items-center gap-2">
            <span className="font-sans text-primary" style={{ fontSize: '1.05rem', fontWeight: '700' }}>
              ₹{product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-decoration-line-through text-muted" style={{ fontSize: '0.8rem' }}>
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="d-flex align-items-center gap-1" style={{ fontSize: '0.8rem' }}>
            <span className="text-warning">★</span>
            <span className="text-primary font-dm" style={{ fontWeight: '600' }}>{product.rating}</span>
            <span className="text-muted" style={{ fontSize: '0.7rem' }}>({product.reviewCount})</span>
          </div>
        </div>

        {/* Customization call-out button */}
        <Link to={`/product/${product.id}`} className="btn-luxury py-2 px-3 text-center mt-3" style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <Sparkles size={12} /> Customize & Order
        </Link>
      </div>

    </div>
  );
}
