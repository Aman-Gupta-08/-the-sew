import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';

export default function Wishlist() {
  const { wishlist } = useApp();

  // Filter products in wishlist
  const wishlistedItems = PRODUCTS.filter(prod => wishlist.includes(prod.id));

  return (
    <div className="container py-5 px-4" style={{ minHeight: '60vh' }}>
      
      {/* Header */}
      <div className="text-center mb-5">
        <span className="text-muted text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.25em', fontWeight: '600' }}>Your Saved Favorites</span>
        <h2 className="font-serif mt-2 text-primary display-5">My Wishlist</h2>
        <div className="mx-auto mt-2" style={{ width: '60px', height: '2px', background: 'var(--accent-gold)' }} />
      </div>

      {/* Grid items */}
      {wishlistedItems.length === 0 ? (
        <div 
          className="glass-panel text-center py-5 px-4 rounded-4 border mx-auto shadow-sm"
          style={{ 
            maxWidth: '550px',
            background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)',
            borderColor: 'var(--border-color)' 
          }}
        >
          <div className="d-flex align-items-center justify-content-center bg-pink rounded-circle mx-auto mb-4" style={{ width: '80px', height: '80px', background: 'var(--bg-tertiary)' }}>
            <Heart size={36} className="text-danger" fill="#E91E63" />
          </div>
          <h4 className="font-serif text-primary mb-2">Your wishlist is empty</h4>
          <p className="text-secondary mb-4" style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
            Tap the heart icon on any product card while browsing to save your favorite customized gifts here!
          </p>
          <Link to="/category/all" className="btn btn-luxury-solid py-2">
            Explore Handcrafted Gifts
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {wishlistedItems.map(item => (
            <div key={item.id} className="col-sm-6 col-md-4 col-lg-3">
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
