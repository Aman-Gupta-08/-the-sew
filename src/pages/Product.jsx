import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Truck, ShieldCheck, HeartHandshake, ChevronRight } from 'lucide-react';
import CustomizationForm from '../components/CustomizationForm';
import { PRODUCTS } from '../data/products';

export default function Product() {
  const { prodId } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const found = PRODUCTS.find((p) => p.id === prodId);
    setProduct(found || null);
    setActiveImageIndex(0); // reset thumbnail choice
  }, [prodId]);

  if (!product) {
    return (
      <div className="container py-5 text-center px-4">
        <span style={{ fontSize: '3rem' }}>🛍️</span>
        <h4 className="font-serif mt-3 text-primary">Product Not Found</h4>
        <p className="text-secondary mb-4">The gift item you are looking for does not exist or has been retired.</p>
        <Link to="/category/all" className="btn btn-luxury-solid py-2">
          Back to Shop
        </Link>
      </div>
    );
  }

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="container py-5 px-4">
      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb" style={{ fontSize: '0.8rem' }}>
          <li className="breadcrumb-item"><Link to="/" className="text-muted text-decoration-none">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/category/all" className="text-muted text-decoration-none">Shop</Link></li>
          <li className="breadcrumb-item"><Link to={`/category/${product.category}`} className="text-muted text-decoration-none text-capitalize">{product.category.replace('-', ' ')}</Link></li>
          <li className="breadcrumb-item active text-primary" aria-current="page" style={{ fontWeight: '500' }}>{product.subcategory}</li>
        </ol>
      </nav>

      {/* Main Grid: Images & Basic Meta */}
      <div className="row g-5 mb-5">
        
        {/* Left Column: Interactive Image Gallery */}
        <div className="col-lg-6">
          <div className="sticky-top" style={{ top: '100px', zIndex: 1 }}>
            
            {/* Big Zoomable Frame */}
            <div 
              className="glass-panel overflow-hidden rounded-4 mb-3" 
              style={{ 
                aspectRatio: '1/1', 
                background: 'var(--bg-secondary)', 
                border: '1px solid var(--border-color)',
                position: 'relative'
              }}
            >
              <img 
                src={product.images[activeImageIndex]} 
                alt={product.name} 
                className="w-100 h-100 object-fit-cover"
                style={{ 
                  transition: 'transform 0.5s ease',
                  cursor: 'zoom-in'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>

            {/* Thumbnail Carousel Selector */}
            {product.images.length > 1 && (
              <div className="d-flex gap-3 justify-content-start overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className="btn p-0 rounded-3 overflow-hidden border-2 shadow-sm"
                    style={{
                      width: '70px',
                      height: '70px',
                      flexShrink: 0,
                      borderColor: activeImageIndex === idx ? 'var(--accent-gold)' : 'transparent',
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    <img src={img} alt="thumbnail" className="w-100 h-100 object-fit-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quality & Trust Badges */}
            <div className="row g-3 mt-4 pt-4 border-top" style={{ borderColor: 'var(--border-color) !important' }}>
              <div className="col-4 text-center">
                <ShieldCheck size={20} className="text-success mb-2" />
                <h6 className="m-0 font-dm text-primary" style={{ fontSize: '0.75rem', fontWeight: '600' }}>Safe Checkout</h6>
                <p className="text-muted m-0" style={{ fontSize: '0.65rem' }}>Encrypted payments</p>
              </div>
              <div className="col-4 text-center border-start border-end" style={{ borderColor: 'var(--border-color) !important' }}>
                <HeartHandshake size={20} className="text-danger mb-2" />
                <h6 className="m-0 font-dm text-primary" style={{ fontSize: '0.75rem', fontWeight: '600' }}>100% Handcrafted</h6>
                <p className="text-muted m-0" style={{ fontSize: '0.65rem' }}>Local home artisans</p>
              </div>
              <div className="col-4 text-center">
                <Truck size={20} className="text-primary mb-2" />
                <h6 className="m-0 font-dm text-primary" style={{ fontSize: '0.75rem', fontWeight: '600' }}>Insured Shipping</h6>
                <p className="text-muted m-0" style={{ fontSize: '0.65rem' }}>Tracked door-step</p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Metadata details */}
        <div className="col-lg-6">
          <span className="badge-gold mb-2 d-inline-block">Personalized Option</span>
          <h2 className="font-serif text-primary fs-3 mb-2">{product.name}</h2>
          
          {/* Subcategory */}
          <p className="text-secondary font-dm text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '0.05em', fontWeight: '500' }}>
            Category: <span className="text-gold" style={{ color: 'var(--accent-gold)' }}>{product.subcategory}</span>
          </p>

          {/* Rating */}
          <div className="d-flex align-items-center gap-2 mb-4 pb-2">
            <div className="d-flex text-warning">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  fill={i < Math.floor(product.rating) ? 'var(--accent-gold)' : 'none'} 
                  color="var(--accent-gold)" 
                />
              ))}
            </div>
            <span className="font-dm text-primary" style={{ fontSize: '0.85rem', fontWeight: '600' }}>{product.rating}</span>
            <span className="text-muted" style={{ fontSize: '0.8rem' }}>({product.reviewCount} customer reviews)</span>
          </div>

          {/* Pricing Box */}
          <div 
            className="glass-panel p-4 rounded-4 mb-4 d-flex align-items-center gap-3 border shadow-sm"
            style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
          >
            <div className="d-flex align-items-baseline gap-2">
              <span className="fs-3 font-sans text-primary fw-bold">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-decoration-line-through text-muted fs-5">₹{product.originalPrice}</span>
                  <span className="badge bg-danger rounded-pill px-2 py-1" style={{ fontSize: '0.75rem' }}>{discount}% OFF</span>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-secondary mb-4" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
            {product.description}
          </p>

          {/* Bullet specifications */}
          <div className="mb-4">
            <h6 className="font-dm text-primary text-uppercase mb-2" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', fontWeight: '700' }}>Highlights & Features:</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0" style={{ fontSize: '0.85rem' }}>
              {product.features.map((feat, idx) => (
                <li key={idx} className="d-flex align-items-baseline gap-2 text-secondary">
                  <span className="text-gold" style={{ color: 'var(--accent-gold)' }}>✔</span> {feat}
                </li>
              ))}
            </ul>
          </div>

          {/* Delivery & Material details */}
          <div className="p-3 rounded-3 mb-4 d-flex align-items-center gap-3" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color-light)' }}>
            <Truck className="text-muted" size={20} />
            <div>
              <p className="m-0 text-primary font-dm" style={{ fontSize: '0.8rem', fontWeight: '600' }}>
                Estimated Delivery: {product.estimatedDelivery}
              </p>
              <p className="m-0 text-muted" style={{ fontSize: '0.75rem' }}>Individually hand-crafted. Fully customizable.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Embedded Customization Form Section (FULL WIDTH ROW) */}
      <section className="border-top pt-5 mb-5" style={{ borderColor: 'var(--border-color) !important' }}>
        <div className="text-center mb-5">
          <span className="text-muted text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', fontWeight: '600' }}>Personalize Gift</span>
          <h2 className="font-serif mt-2 text-primary display-6">Configure Your Custom Details</h2>
          <p className="text-secondary mx-auto mb-0" style={{ maxWidth: '600px', fontSize: '0.85rem' }}>Fill in details below and watch your gift live preview configure instantly before adding to bag.</p>
        </div>

        {/* Customize Panel Form */}
        <CustomizationForm product={product} />
      </section>

      {/* Review Tab Panel */}
      <section className="border-top pt-5" style={{ borderColor: 'var(--border-color) !important' }}>
        <h4 className="font-serif text-primary mb-4">Customer Experience Stories</h4>
        <div className="d-flex flex-column gap-4">
          <div className="glass-card p-4" style={{ border: '1px solid var(--border-color)' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div className="d-flex align-items-center gap-2">
                <span className="fs-4">👩</span>
                <div>
                  <h6 className="m-0 font-serif" style={{ fontSize: '0.9rem' }}>Aishwarya Ramachandran</h6>
                  <span className="text-muted" style={{ fontSize: '0.7rem' }}>Verified Buyer • Chennai</span>
                </div>
              </div>
              <span className="text-warning">★★★★★</span>
            </div>
            <p className="text-secondary m-0" style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
              I ordered this product with customized dates and special messages for my sibling's wedding. The artist was extremely collaborative on WhatsApp and shared references. The final embroidery hoop looks even better in person than the previews. 10/10 recommendation!
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
