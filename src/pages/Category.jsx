import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Grid, List, SlidersHorizontal, Search, Star, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { CATEGORIES, PRODUCTS } from '../data/products';

export default function Category() {
  const { catId } = useParams();
  const [searchParams] = useSearchParams();
  const searchFilter = searchParams.get('search') || '';
  const subFilter = searchParams.get('sub') || '';

  // Filter States
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(6000);
  const [minRating, setMinRating] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [searchQuery, setSearchQuery] = useState(searchFilter);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const currentCategory = CATEGORIES.find(c => c.id === catId);
  const categoryTitle = currentCategory ? currentCategory.name : 'All Products Collection';
  const categoryDesc = currentCategory ? currentCategory.description : 'Explore our collection of custom handcrafted frames, resin keepsakes, flower bouquets, and embroidery hoops.';

  // Gather unique colors and materials for filter selection
  const allCategoryProducts = PRODUCTS.filter(p => catId === 'all' || !catId || p.category === catId);
  const uniqueMaterials = [...new Set(allCategoryProducts.flatMap(p => p.materials || []))];
  const uniqueColors = [...new Set(allCategoryProducts.flatMap(p => p.colors || []))];

  // Sync url search query
  useEffect(() => {
    setSearchQuery(searchFilter);
  }, [searchFilter]);

  // Sync subcategory filter if passed from mega menu
  useEffect(() => {
    if (subFilter) {
      setSelectedSubcategories([subFilter]);
    } else {
      setSelectedSubcategories([]);
    }
  }, [subFilter, catId]);

  const handleSubcategoryToggle = (sub) => {
    setSelectedSubcategories(prev => 
      prev.includes(sub) ? prev.filter(item => item !== sub) : [...prev, sub]
    );
  };

  // Filter & Sort Logic
  const filteredProducts = PRODUCTS.filter(product => {
    // 1. Category Filter
    if (catId && catId !== 'all' && product.category !== catId) return false;
    
    // 2. Subcategory Filter
    if (selectedSubcategories.length > 0 && !selectedSubcategories.includes(product.subcategory)) return false;
    
    // 3. Price Filter
    if (product.price > maxPrice) return false;
    
    // 4. Rating Filter
    if (product.rating < minRating) return false;
    
    // 5. Material Filter
    if (selectedMaterial && (!product.materials || !product.materials.includes(selectedMaterial))) return false;
    
    // 6. Color Filter
    if (selectedColor && (!product.colors || !product.colors.includes(selectedColor))) return false;
    
    // 7. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(q);
      const matchesDesc = product.description.toLowerCase().includes(q);
      const matchesSub = product.subcategory.toLowerCase().includes(q);
      if (!matchesName && !matchesDesc && !matchesSub) return false;
    }
    
    return true;
  });

  // Sort implementation
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // default featured
  });

  const resetFilters = () => {
    setSelectedSubcategories([]);
    setMaxPrice(6000);
    setMinRating(0);
    setSelectedMaterial('');
    setSelectedColor('');
    setSearchQuery('');
  };

  return (
    <div className="container py-5 px-4">
      {/* Category Header */}
      <div 
        className="glass-panel p-5 rounded-4 mb-5 text-center position-relative overflow-hidden border shadow-sm"
        style={{ 
          background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)',
          borderColor: 'var(--border-color)'
        }}
      >
        <span className="badge-gold mb-3 d-inline-block">Curated Collection</span>
        <h2 className="font-serif text-primary display-5">{categoryTitle}</h2>
        <p className="text-secondary mx-auto mb-0 mt-3" style={{ maxWidth: '700px', fontSize: '0.9rem', lineHeight: '1.6' }}>
          {categoryDesc}
        </p>
      </div>

      {/* Main Grid: Left Filters, Right Products */}
      <div className="row g-4">
        
        {/* Filters Sidebar (Desktop) */}
        <div className="col-lg-3 d-none d-lg-block">
          <div className="glass-panel p-4 rounded-4" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', position: 'sticky', top: '100px' }}>
            <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
              <h5 className="font-serif m-0 d-flex align-items-center gap-2" style={{ fontSize: '1.1rem' }}>
                <SlidersHorizontal size={16} /> Filters
              </h5>
              <button onClick={resetFilters} className="btn btn-sm text-muted p-0 border-0 hover-text-gold" style={{ fontSize: '0.75rem', background: 'transparent' }}>
                Reset All
              </button>
            </div>

            {/* Subcategories (if category specific) */}
            {currentCategory && currentCategory.subcategories.length > 0 && (
              <div className="mb-4">
                <h6 className="font-dm text-primary text-uppercase mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', fontWeight: '700' }}>Design Type</h6>
                <div className="d-flex flex-column gap-2">
                  {currentCategory.subcategories.map(sub => (
                    <label key={sub} className="d-flex align-items-center gap-2 cursor-pointer text-secondary" style={{ fontSize: '0.85rem' }}>
                      <input 
                        type="checkbox" 
                        checked={selectedSubcategories.includes(sub)}
                        onChange={() => handleSubcategoryToggle(sub)}
                        style={{ accentColor: 'var(--accent-gold)' }}
                      />
                      {sub}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Max Price Filter */}
            <div className="mb-4">
              <div className="d-flex justify-content-between mb-2">
                <h6 className="font-dm text-primary text-uppercase m-0" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', fontWeight: '700' }}>Max Price</h6>
                <span className="text-primary font-sans" style={{ fontSize: '0.85rem', fontWeight: '600' }}>₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="300"
                max="6000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-100"
                style={{ accentColor: 'var(--accent-gold)' }}
              />
            </div>

            {/* Rating Filter */}
            <div className="mb-4">
              <h6 className="font-dm text-primary text-uppercase mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', fontWeight: '700' }}>Min Rating</h6>
              <div className="d-flex flex-column gap-2">
                {[4, 4.5, 4.8].map(rate => (
                  <label key={rate} className="d-flex align-items-center gap-2 cursor-pointer text-secondary" style={{ fontSize: '0.85rem' }}>
                    <input 
                      type="radio" 
                      name="rating-filter" 
                      checked={minRating === rate}
                      onChange={() => setMinRating(rate)}
                      style={{ accentColor: 'var(--accent-gold)' }}
                    />
                    {rate} ★ & above
                  </label>
                ))}
                <label className="d-flex align-items-center gap-2 cursor-pointer text-secondary" style={{ fontSize: '0.85rem' }}>
                  <input 
                    type="radio" 
                    name="rating-filter" 
                    checked={minRating === 0}
                    onChange={() => setMinRating(0)}
                    style={{ accentColor: 'var(--accent-gold)' }}
                  />
                  Show All Ratings
                </label>
              </div>
            </div>

            {/* Materials Filter */}
            {uniqueMaterials.length > 0 && (
              <div className="mb-4">
                <h6 className="font-dm text-primary text-uppercase mb-2" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', fontWeight: '700' }}>Craft Material</h6>
                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  className="form-select border-1"
                  style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)', fontSize: '0.85rem' }}
                >
                  <option value="">Select Material</option>
                  {uniqueMaterials.map(mat => (
                    <option key={mat} value={mat}>{mat}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Colors Filter */}
            {uniqueColors.length > 0 && (
              <div className="mb-2">
                <h6 className="font-dm text-primary text-uppercase mb-2" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', fontWeight: '700' }}>Color Tones</h6>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="form-select border-1"
                  style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)', fontSize: '0.85rem' }}
                >
                  <option value="">Select Color</option>
                  {uniqueColors.map(col => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>
            )}

          </div>
        </div>

        {/* Product Listings Section */}
        <div className="col-lg-9">
          
          {/* Controls Bar (Search/Sort/View toggle) */}
          <div 
            className="glass-panel p-3 rounded-4 mb-4 d-flex flex-wrap align-items-center justify-content-between gap-3 border shadow-sm"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
          >
            {/* Inline search */}
            <div className="position-relative" style={{ width: '100%', maxWidth: '280px' }}>
              <input
                type="text"
                placeholder="Search in this collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control rounded-pill border-1"
                style={{
                  fontSize: '0.8rem',
                  paddingLeft: '16px',
                  paddingRight: '35px',
                  height: '36px',
                  background: 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
              />
              <Search size={14} className="position-absolute end-0 top-50 translate-middle-y me-3 text-secondary" />
            </div>

            {/* Sort/Layout tools */}
            <div className="d-flex align-items-center gap-3 ms-auto">
              {/* Mobile Filter Button */}
              <button 
                onClick={() => setShowMobileFilters(true)}
                className="btn d-lg-none btn-neumorphic d-flex align-items-center gap-1 py-2 px-3 border"
                style={{ fontSize: '0.8rem', fontWeight: '600' }}
              >
                <SlidersHorizontal size={14} /> Filter
              </button>

              {/* Sort By Select */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select border-1"
                style={{
                  fontSize: '0.8rem',
                  height: '36px',
                  width: '150px',
                  background: 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>

              {/* View toggle buttons */}
              <div className="d-flex gap-1 border rounded-pill p-1" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <button
                  onClick={() => setViewMode('grid')}
                  className="btn btn-sm p-1 d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: '28px',
                    height: '28px',
                    border: 'none',
                    background: viewMode === 'grid' ? 'var(--accent-gold)' : 'transparent',
                    color: viewMode === 'grid' ? '#fff' : 'var(--text-secondary)',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  <Grid size={14} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className="btn btn-sm p-1 d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: '28px',
                    height: '28px',
                    border: 'none',
                    background: viewMode === 'list' ? 'var(--accent-gold)' : 'transparent',
                    color: viewMode === 'list' ? '#fff' : 'var(--text-secondary)',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  <List size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mb-4">
            <p className="text-secondary m-0" style={{ fontSize: '0.85rem' }}>
              Showing <strong>{sortedProducts.length}</strong> items {searchQuery && `for "${searchQuery}"`}
            </p>
          </div>

          {/* Product Items Display */}
          {sortedProducts.length === 0 ? (
            <div className="glass-panel p-5 text-center rounded-4 border my-4">
              <span style={{ fontSize: '3rem' }}>🔍</span>
              <h4 className="font-serif mt-3 text-primary">No products found</h4>
              <p className="text-secondary mb-4" style={{ fontSize: '0.85rem' }}>Try clearing filters or trying another query</p>
              <button onClick={resetFilters} className="btn btn-luxury-solid py-2">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'row g-4' : 'd-flex flex-column gap-4'}>
              {sortedProducts.map(prod => (
                <div key={prod.id} className={viewMode === 'grid' ? 'col-sm-6 col-md-4' : 'col-12'}>
                  {viewMode === 'grid' ? (
                    <ProductCard product={prod} />
                  ) : (
                    // Elegant List Card Representation
                    <div 
                      className="glass-card d-flex flex-column flex-sm-row gap-3 overflow-hidden p-3"
                      style={{ border: '1px solid var(--border-color)' }}
                    >
                      <img 
                        src={prod.images[0]} 
                        alt={prod.name} 
                        className="object-fit-cover rounded-3"
                        style={{ width: '100%', maxWidth: '180px', height: '180px', background: 'var(--bg-secondary)' }}
                      />
                      <div className="d-flex flex-column justify-content-center flex-grow-1 mt-2 mt-sm-0">
                        <span className="text-muted text-uppercase mb-1" style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>
                          {prod.subcategory}
                        </span>
                        <h4 className="font-serif text-primary fs-5 mb-2">{prod.name}</h4>
                        
                        <div className="d-flex align-items-center gap-1 mb-2" style={{ fontSize: '0.8rem' }}>
                          <span className="text-warning">★</span>
                          <span className="text-primary font-dm" style={{ fontWeight: '600' }}>{prod.rating}</span>
                          <span className="text-muted">({prod.reviewCount} reviews)</span>
                        </div>

                        <p className="text-secondary line-clamp-2 mb-3" style={{ fontSize: '0.8rem', lineHeight: '1.5', height: '2.4rem', overflow: 'hidden' }}>
                          {prod.description}
                        </p>

                        <div className="d-flex align-items-center justify-content-between mt-auto">
                          <div className="d-flex align-items-baseline gap-2">
                            <span className="fs-5 font-sans text-primary fw-bold">₹{prod.price}</span>
                            {prod.originalPrice > prod.price && (
                              <span className="text-decoration-line-through text-muted" style={{ fontSize: '0.75rem' }}>₹{prod.originalPrice}</span>
                            )}
                          </div>
                          <Link to={`/product/${prod.id}`} className="btn-luxury py-2 px-3 text-center" style={{ fontSize: '0.75rem' }}>
                            <Sparkles size={12} className="me-1" /> Customize
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Mobile Drawer Filters */}
      {showMobileFilters && (
        <>
          <div 
            onClick={() => setShowMobileFilters(false)}
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{ zIndex: 1040, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
          />
          <div 
            className="position-fixed top-0 start-0 h-100 d-flex flex-column p-4"
            style={{
              zIndex: 1050,
              width: '100%',
              maxWidth: '320px',
              background: 'var(--bg-primary)',
              boxShadow: '10px 0 35px rgba(0,0,0,0.15)',
              borderRight: '1px solid var(--border-color)',
              animation: 'slideInLeft 0.3s ease-out'
            }}
          >
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes slideInLeft {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(0); }
              }
            `}} />
            
            <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
              <h5 className="font-serif m-0">Filters</h5>
              <button 
                onClick={() => setShowMobileFilters(false)} 
                className="btn p-1 border-0 text-secondary"
                style={{ background: 'transparent' }}
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-grow-1 overflow-y-auto" style={{ overflowY: 'auto' }}>
              {/* Copy Filter Elements here */}
              {currentCategory && currentCategory.subcategories.length > 0 && (
                <div className="mb-4">
                  <h6 className="font-dm text-primary text-uppercase mb-2" style={{ fontSize: '0.75rem', fontWeight: '700' }}>Design Type</h6>
                  <div className="d-flex flex-column gap-2">
                    {currentCategory.subcategories.map(sub => (
                      <label key={sub} className="d-flex align-items-center gap-2 cursor-pointer text-secondary" style={{ fontSize: '0.85rem' }}>
                        <input 
                          type="checkbox" 
                          checked={selectedSubcategories.includes(sub)}
                          onChange={() => handleSubcategoryToggle(sub)}
                          style={{ accentColor: 'var(--accent-gold)' }}
                        />
                        {sub}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <h6 className="font-dm text-primary text-uppercase m-0" style={{ fontSize: '0.75rem', fontWeight: '700' }}>Max Price</h6>
                  <span className="text-primary font-sans" style={{ fontSize: '0.85rem', fontWeight: '600' }}>₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="6000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-100"
                  style={{ accentColor: 'var(--accent-gold)' }}
                />
              </div>

              <div className="mb-4">
                <h6 className="font-dm text-primary text-uppercase mb-2" style={{ fontSize: '0.75rem', fontWeight: '700' }}>Min Rating</h6>
                <div className="d-flex flex-column gap-2">
                  {[4, 4.5, 4.8].map(rate => (
                    <label key={rate} className="d-flex align-items-center gap-2 cursor-pointer text-secondary" style={{ fontSize: '0.85rem' }}>
                      <input 
                        type="radio" 
                        name="rating-filter-mobile" 
                        checked={minRating === rate}
                        onChange={() => setMinRating(rate)}
                        style={{ accentColor: 'var(--accent-gold)' }}
                      />
                      {rate} ★ & above
                    </label>
                  ))}
                  <label className="d-flex align-items-center gap-2 cursor-pointer text-secondary" style={{ fontSize: '0.85rem' }}>
                    <input 
                      type="radio" 
                      name="rating-filter-mobile" 
                      checked={minRating === 0}
                      onChange={() => setMinRating(0)}
                      style={{ accentColor: 'var(--accent-gold)' }}
                    />
                    Show All Ratings
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-3 border-top mt-auto d-flex gap-2">
              <button onClick={resetFilters} className="btn btn-outline-secondary w-50 py-2 rounded-pill" style={{ fontSize: '0.8rem' }}>Reset</button>
              <button onClick={() => setShowMobileFilters(false)} className="btn btn-luxury-solid w-50 py-2" style={{ fontSize: '0.8rem' }}>Apply</button>
            </div>

          </div>
        </>
      )}

    </div>
  );
}
