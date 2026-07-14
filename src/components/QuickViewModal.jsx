import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Star, Sparkles, ChevronRight, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const navigate = useNavigate();

  if (!quickViewProduct) return null;

  const discount = Math.round(
    ((quickViewProduct.originalPrice - quickViewProduct.price) / quickViewProduct.originalPrice) * 100
  );

  const handleCustomizeClick = () => {
    setQuickViewProduct(null);
    navigate(`/product/${quickViewProduct.id}`);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={() => setQuickViewProduct(null)}
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{
          zIndex: 1060,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(5px)',
          transition: 'opacity 0.3s ease'
        }}
      />

      {/* Modal Dialog */}
      <div 
        className="position-fixed top-50 start-50 translate-middle w-100 p-3"
        style={{
          zIndex: 1070,
          maxWidth: '850px',
        }}
      >
        <div 
          className="glass-panel rounded-4 shadow-lg overflow-hidden position-relative"
          style={{ 
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            animation: 'fadeInScale 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Styles for animations */}
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes fadeInScale {
              0% { opacity: 0; transform: scale(0.95); }
              100% { opacity: 1; transform: scale(1); }
            }
          `}} />

          {/* Close button */}
          <button 
            onClick={() => setQuickViewProduct(null)} 
            className="btn rounded-circle d-flex align-items-center justify-content-center position-absolute"
            style={{ 
              top: '15px', 
              right: '15px', 
              zIndex: 10,
              width: '36px',
              height: '36px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)'
            }}
          >
            <X size={16} />
          </button>

          <div className="row g-0">
            {/* Left Column: Image Section */}
            <div className="col-md-6 bg-secondary-subtle d-flex flex-column align-items-center justify-content-center p-3" style={{ background: 'var(--bg-secondary) !important' }}>
              <div className="w-100 overflow-hidden rounded-3 mb-2" style={{ aspectRatio: '1/1' }}>
                <img 
                  src={quickViewProduct.images[activeImageIndex]} 
                  alt={quickViewProduct.name} 
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
              
              {/* Thumbnail Gallery */}
              {quickViewProduct.images.length > 1 && (
                <div className="d-flex gap-2 justify-content-center mt-2">
                  {quickViewProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className="btn p-0 rounded overflow-hidden"
                      style={{
                        width: '50px',
                        height: '50px',
                        border: activeImageIndex === idx ? '2px solid var(--accent-gold)' : '2px solid transparent',
                        transition: 'border 0.2s ease'
                      }}
                    >
                      <img src={img} alt="thumbnail" className="w-100 h-100 object-fit-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Details Section */}
            <div className="col-md-6 p-4 d-flex flex-column justify-content-center">
              <span className="badge-gold d-inline-block mb-2 align-self-start">Best Seller</span>
              <h3 className="font-serif text-primary mb-2 fs-4">{quickViewProduct.name}</h3>
              
              {/* Rating */}
              <div className="d-flex align-items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    fill={i < Math.floor(quickViewProduct.rating) ? 'var(--accent-gold)' : 'none'} 
                    color="var(--accent-gold)" 
                  />
                ))}
                <span className="ms-2 font-dm text-primary" style={{ fontSize: '0.85rem', fontWeight: '600' }}>{quickViewProduct.rating}</span>
                <span className="text-muted" style={{ fontSize: '0.8rem' }}>({quickViewProduct.reviewCount} customer reviews)</span>
              </div>

              {/* Price & Discounts */}
              <div className="d-flex align-items-baseline gap-3 mb-3">
                <span className="fs-3 font-sans text-primary" style={{ fontWeight: '700' }}>₹{quickViewProduct.price}</span>
                {quickViewProduct.originalPrice > quickViewProduct.price && (
                  <>
                    <span className="text-decoration-line-through text-muted fs-5">₹{quickViewProduct.originalPrice}</span>
                    <span className="text-danger" style={{ fontSize: '0.9rem', fontWeight: '600' }}>({discount}% Off)</span>
                  </>
                )}
              </div>

              <p className="text-secondary mb-4" style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
                {quickViewProduct.description}
              </p>

              {/* Quick Specs */}
              <div className="mb-4">
                <h6 className="font-dm text-primary text-uppercase mb-2" style={{ fontSize: '0.7rem', letterSpacing: '0.1em', fontWeight: '700' }}>Highlights:</h6>
                <ul className="list-unstyled m-0 d-flex flex-column gap-1" style={{ fontSize: '0.8rem' }}>
                  {quickViewProduct.features.slice(0, 2).map((feat, idx) => (
                    <li key={idx} className="d-flex align-items-center gap-2 text-secondary">
                      <Check size={12} className="text-success" /> {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Customize CTA */}
              <button 
                onClick={handleCustomizeClick}
                className="btn btn-luxury-solid w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                style={{ fontSize: '0.85rem' }}
              >
                <Sparkles size={16} /> Personalize & Order <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
