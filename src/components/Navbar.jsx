import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Sun, Moon, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, PRODUCTS } from '../data/products';

export default function Navbar() {
  const { theme, toggleTheme, wishlist, getCartCount, setIsCartOpen } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Close search on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchActive(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle live search
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = PRODUCTS.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered.slice(0, 5));
      setIsSearchActive(true);
    } else {
      setSearchResults([]);
      setIsSearchActive(false);
    }
  }, [searchQuery]);

  const handleSearchResultClick = (productId) => {
    setSearchQuery('');
    setIsSearchActive(false);
    navigate(`/product/${productId}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchActive(false);
      navigate(`/category/all?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="glass-panel sticky-top w-100 py-3" style={{ zIndex: 1030, background: 'var(--navbar-bg)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container-fluid container-lg d-flex align-items-center justify-content-between">
        
        {/* Brand Logo */}
        <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
          <div className="d-flex align-items-center justify-content-center bg-pink rounded-circle" style={{ width: '40px', height: '40px', background: 'var(--bg-tertiary)', border: '1px solid var(--accent-pink)' }}>
            <span style={{ fontSize: '1.25rem' }}>🪡</span>
          </div>
          <div>
            <h1 className="m-0 fs-4 font-serif text-primary" style={{ letterSpacing: '0.05em' }}>
              The <span className="text-gradient-gold">sewcreative</span>
            </h1>
            <p className="m-0 text-muted" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: '500' }}>Handmade Luxe Gifts</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="d-none d-lg-flex align-items-center gap-4">
          <Link to="/" className="text-primary font-dm hover-text-gold px-2 py-1" style={{ fontSize: '0.95rem', fontWeight: '500' }}>Home</Link>
          
          {/* Mega Menu Dropdown */}
          <div className="nav-item position-relative py-1">
            <span className="text-primary font-dm hover-text-gold d-flex align-items-center gap-1 cursor-pointer px-2" style={{ fontSize: '0.95rem', fontWeight: '500', cursor: 'pointer' }}>
              Collection <ChevronDown size={14} />
            </span>
            
            <div className="mega-menu glass-panel p-4 rounded-4 shadow-lg" style={{ left: '50%', transform: 'translateX(-50%) translateY(15px)', width: '700px', top: '100%' }}>
              <div className="row g-4">
                <div className="col-8">
                  <div className="row">
                    {CATEGORIES.map((cat) => (
                      <div key={cat.id} className="col-6 mb-3">
                        <Link to={`/category/${cat.id}`} className="text-decoration-none">
                          <h6 className="font-serif text-gold mb-2" style={{ color: 'var(--accent-gold)' }}>{cat.name}</h6>
                        </Link>
                        <ul className="list-unstyled m-0">
                          {cat.subcategories.slice(0, 3).map((sub, idx) => (
                            <li key={idx} className="mb-1">
                              <Link 
                                to={`/category/${cat.id}?sub=${encodeURIComponent(sub)}`} 
                                className="text-secondary font-sans" 
                                style={{ fontSize: '0.85rem' }}
                              >
                                {sub}
                              </Link>
                            </li>
                          ))}
                          {cat.subcategories.length > 3 && (
                            <li>
                              <Link to={`/category/${cat.id}`} className="text-muted font-sans" style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>
                                + {cat.subcategories.length - 3} more
                              </Link>
                            </li>
                          )}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-4 border-start" style={{ borderColor: 'var(--border-color) !important' }}>
                  <div className="p-2 h-100 d-flex flex-column justify-content-between" style={{ background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                    <div>
                      <span className="badge-gold d-inline-block mb-2">Exclusive Design</span>
                      <h6 className="font-serif text-primary mb-1">Custom Creations</h6>
                      <p className="text-muted mb-3" style={{ fontSize: '0.75rem' }}>We turn your sweet memories into lasting handmade keepsakes.</p>
                    </div>
                    <Link to="/category/all" className="btn-luxury py-2 px-3 text-center" style={{ fontSize: '0.75rem' }}>
                      Shop All
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link to="/category/all" className="text-primary font-dm hover-text-gold px-2 py-1" style={{ fontSize: '0.95rem', fontWeight: '500' }}>Shop</Link>
          <Link to="/contact" className="text-primary font-dm hover-text-gold px-2 py-1" style={{ fontSize: '0.95rem', fontWeight: '500' }}>Contact</Link>
        </div>

        {/* Right Menu Icons */}
        <div className="d-flex align-items-center gap-3">
          
          {/* Live Search Bar */}
          <div ref={searchRef} className="position-relative d-none d-md-block" style={{ width: '220px' }}>
            <form onSubmit={handleSearchSubmit} className="w-100">
              <input
                type="text"
                placeholder="Search premium gifts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control rounded-pill border-1"
                style={{
                  fontSize: '0.85rem',
                  paddingLeft: '16px',
                  paddingRight: '35px',
                  height: '38px',
                  background: 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
              />
              <button type="submit" className="btn p-0 border-0 position-absolute end-0 top-50 translate-middle-y me-3" style={{ background: 'transparent', color: 'var(--text-secondary)' }}>
                <Search size={16} />
              </button>
            </form>

            {/* Instant Search Results Panel */}
            {isSearchActive && searchResults.length > 0 && (
              <div className="glass-panel position-absolute w-100 mt-2 p-2 rounded-4 shadow-lg" style={{ top: '100%', right: 0, width: '320px', border: '1px solid var(--border-color)' }}>
                <p className="text-muted px-2 py-1 m-0 font-dm border-bottom" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Instant Results</p>
                <div className="d-flex flex-column gap-1 mt-2">
                  {searchResults.map((prod) => (
                    <div 
                      key={prod.id} 
                      onClick={() => handleSearchResultClick(prod.id)}
                      className="d-flex align-items-center gap-2 p-2 rounded-3 hover-bg cursor-pointer"
                      style={{ cursor: 'pointer', transition: 'var(--transition-fast)' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <img src={prod.images[0]} alt={prod.name} className="object-fit-cover rounded" style={{ width: '40px', height: '40px' }} />
                      <div className="overflow-hidden">
                        <p className="m-0 font-sans text-truncate text-primary" style={{ fontSize: '0.8rem', fontWeight: '500' }}>{prod.name}</p>
                        <p className="m-0 text-gold" style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--accent-gold)' }}>₹{prod.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-top mt-2 text-center">
                  <Link to={`/category/all?search=${searchQuery}`} onClick={() => setIsSearchActive(false)} className="text-gradient-gold font-dm" style={{ fontSize: '0.75rem', fontWeight: '600' }}>
                    View All Results
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="btn rounded-circle d-flex align-items-center justify-content-center p-2"
            style={{ 
              width: '38px', 
              height: '38px', 
              background: 'var(--bg-secondary)', 
              color: 'var(--text-primary)', 
              border: '1px solid var(--border-color)',
              transition: 'var(--transition-fast)'
            }}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Wishlist Button */}
          <Link 
            to="/wishlist" 
            className="btn rounded-circle d-flex align-items-center justify-content-center p-2 position-relative"
            style={{ 
              width: '38px', 
              height: '38px', 
              background: 'var(--bg-secondary)', 
              color: 'var(--text-primary)', 
              border: '1px solid var(--border-color)'
            }}
          >
            <Heart size={18} />
            {wishlist.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Bag Icon */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="btn rounded-circle d-flex align-items-center justify-content-center p-2 position-relative"
            style={{ 
              width: '38px', 
              height: '38px', 
              background: 'var(--bg-secondary)', 
              color: 'var(--text-primary)', 
              border: '1px solid var(--border-color)'
            }}
          >
            <ShoppingBag size={18} />
            {getCartCount() > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" style={{ fontSize: '0.6rem', background: 'var(--accent-gold)', color: '#fff' }}>
                {getCartCount()}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="btn d-lg-none rounded-circle d-flex align-items-center justify-content-center p-2"
            style={{ 
              width: '38px', 
              height: '38px', 
              background: 'var(--bg-secondary)', 
              color: 'var(--text-primary)', 
              border: '1px solid var(--border-color)'
            }}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="w-100 glass-panel d-lg-none mt-3 p-3 position-absolute border-top" style={{ top: '100%', left: 0, zIndex: 1025 }}>
          {/* Mobile Search */}
          <div className="mb-3">
            <form onSubmit={handleSearchSubmit} className="w-100 position-relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control rounded-pill"
                style={{
                  fontSize: '0.85rem',
                  paddingLeft: '16px',
                  paddingRight: '35px',
                  background: 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
              />
              <button type="submit" className="btn p-0 border-0 position-absolute end-0 top-50 translate-middle-y me-3" style={{ background: 'transparent' }}>
                <Search size={16} />
              </button>
            </form>
          </div>

          <div className="d-flex flex-column gap-2">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-primary font-dm py-2 border-bottom" style={{ borderColor: 'var(--border-color-light) !important' }}>Home</Link>
            
            {/* Mobile Dropdowns */}
            <div>
              <div 
                className="text-primary font-dm py-2 d-flex align-items-center justify-content-between border-bottom" 
                style={{ borderColor: 'var(--border-color-light) !important', cursor: 'pointer' }}
                onClick={() => setActiveDropdown(activeDropdown === 'coll' ? null : 'coll')}
              >
                <span>Collections</span>
                <ChevronDown size={14} style={{ transform: activeDropdown === 'coll' ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
              </div>
              
              {activeDropdown === 'coll' && (
                <div className="ps-3 py-2 d-flex flex-column gap-2" style={{ background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                  {CATEGORIES.map(cat => (
                    <div key={cat.id}>
                      <Link to={`/category/${cat.id}`} onClick={() => setIsMobileMenuOpen(false)} className="text-gold font-serif py-1 d-block" style={{ fontSize: '0.9rem', color: 'var(--accent-gold)' }}>
                        {cat.name}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link to="/category/all" onClick={() => setIsMobileMenuOpen(false)} className="text-primary font-dm py-2 border-bottom" style={{ borderColor: 'var(--border-color-light) !important' }}>Shop All Products</Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-primary font-dm py-2 border-bottom" style={{ borderColor: 'var(--border-color-light) !important' }}>Contact Us</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
