import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Sparkles, MessageCircle } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="pt-5 pb-4 mt-5" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
      <div className="container px-4">
        
        {/* Top Newsletter & Banner Section */}
        <div className="row pb-4 mb-4 border-bottom align-items-center" style={{ borderColor: 'var(--border-color) !important' }}>
          <div className="col-lg-6 mb-3 mb-lg-0">
            <h4 className="font-serif text-primary mb-1 d-flex align-items-center gap-2">
              <Sparkles size={20} className="text-gold" style={{ color: 'var(--accent-gold)' }} /> Join The sewcreative Circle
            </h4>
            <p className="text-secondary m-0" style={{ fontSize: '0.85rem' }}>Subscribe to receive updates on new products, customizing guides, and exclusive offers.</p>
          </div>
          <div className="col-lg-6">
            <form onSubmit={handleSubscribe} className="position-relative">
              <input
                type="email"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control rounded-pill pe-5 py-3"
                style={{
                  fontSize: '0.85rem',
                  background: 'var(--bg-primary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
              />
              <button 
                type="submit" 
                className="btn btn-luxury-solid position-absolute end-0 top-50 translate-middle-y me-1 px-3 d-flex align-items-center justify-content-center"
                style={{ height: 'calc(100% - 8px)', padding: '0 16px' }}
              >
                <Send size={14} />
              </button>
            </form>
            {subscribed && (
              <p className="text-success mt-2 m-0 ps-2" style={{ fontSize: '0.8rem', fontWeight: '500' }}>
                ✨ Welcome! You are now subscribed to our luxury newsletter.
              </p>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="row g-4 mb-4">
          {/* Brand Info */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span style={{ fontSize: '1.25rem' }}>🪡</span>
              <h5 className="m-0 font-serif text-primary" style={{ letterSpacing: '0.05em' }}>
                The <span className="text-gradient-gold">sewcreative</span>
              </h5>
            </div>
            <p className="text-secondary mb-3" style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
              Handcrafting premium memories into timeless gifts. We specialize in custom embroidery hoops, resin casting, and forever floral creations. Made with pure love, customized for you.
            </p>
            <div className="d-flex gap-2">
              <a 
                href="https://instagram.com/the_sewcreative" 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-neumorphic rounded-circle d-flex align-items-center justify-content-center p-2"
                style={{ width: '38px', height: '38px', color: 'var(--text-primary)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>

              <a 
                href="https://wa.me/91XXXXXXXXXX?text=Hi,%20I%20want%20to%20customize%20a%20handmade%20gift." 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-neumorphic rounded-circle d-flex align-items-center justify-content-center p-2"
                style={{ width: '38px', height: '38px', color: 'var(--text-primary)' }}
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-3 col-6">
            <h6 className="font-dm text-primary text-uppercase mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.15em', fontWeight: '600' }}>Quick Links</h6>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '0.85rem' }}>
              <li><Link to="/" className="text-secondary hover-text-gold">Home</Link></li>
              <li><Link to="/category/all" className="text-secondary hover-text-gold">Shop All Products</Link></li>
              <li><Link to="/wishlist" className="text-secondary hover-text-gold">My Wishlist</Link></li>
              <li><Link to="/contact" className="text-secondary hover-text-gold">Contact Us</Link></li>
            </ul>
          </div>

          {/* Category Links */}
          <div className="col-lg-3 col-md-3 col-6">
            <h6 className="font-dm text-primary text-uppercase mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.15em', fontWeight: '600' }}>Categories</h6>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '0.85rem' }}>
              {CATEGORIES.map(cat => (
                <li key={cat.id}>
                  <Link to={`/category/${cat.id}`} className="text-secondary hover-text-gold">{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="col-lg-3 col-md-6">
            <h6 className="font-dm text-primary text-uppercase mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.15em', fontWeight: '600' }}>Showroom Info</h6>
            <p className="text-secondary mb-2" style={{ fontSize: '0.85rem' }}>
              📍 404, Luxury Atelier Road, Sector 5,<br />Gurugram, Haryana - 122002
            </p>
            <p className="text-secondary mb-2" style={{ fontSize: '0.85rem' }}>
              📞 +91 XXXXX XXXXX
            </p>
            <p className="text-secondary mb-0" style={{ fontSize: '0.85rem' }}>
              ✉️ concierge@thesewcreative.com
            </p>
          </div>
        </div>

        {/* Footer Bottom copyright */}
        <div className="row pt-3 border-top align-items-center" style={{ borderColor: 'var(--border-color) !important', fontSize: '0.8rem' }}>
          <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
            <span className="text-secondary">© 2026 The sewcreative. Crafted with ❤️ for elegant gifting.</span>
          </div>
          <div className="col-md-6 text-center text-md-end d-flex gap-3 justify-content-center justify-content-md-end">
            <a href="#privacy" className="text-secondary hover-text-gold">Privacy Policy</a>
            <a href="#terms" className="text-secondary hover-text-gold">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
