import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Minus, Plus, Trash2, ShoppingBag, Sparkles, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    getCartSubtotal 
  } = useApp();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const subtotal = getCartSubtotal();
  const shipping = subtotal > 1500 ? 'FREE' : '₹150';

  // Handle checkout via navigating to Checkout Page
  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };


  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{
          zIndex: 1040,
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(4px)',
          transition: 'opacity 0.3s ease'
        }}
      />

      {/* Drawer */}
      <div 
        className="position-fixed top-0 end-0 h-100 d-flex flex-column"
        style={{
          zIndex: 1050,
          width: '100%',
          maxWidth: '450px',
          background: 'var(--bg-primary)',
          boxShadow: '-10px 0 35px rgba(0,0,0,0.15)',
          borderLeft: '1px solid var(--border-color)',
          animation: 'slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Style tag for animations */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes slideIn {
            0% { transform: translateX(100%); }
            100% { transform: translateX(0); }
          }
        `}} />

        {/* Drawer Header */}
        <div className="p-4 border-bottom d-flex align-items-center justify-content-between" style={{ borderColor: 'var(--border-color) !important' }}>
          <h5 className="m-0 font-serif text-primary d-flex align-items-center gap-2">
            <ShoppingBag size={20} className="text-gold" style={{ color: 'var(--accent-gold)' }} />
            Shopping Cart ({cart.reduce((tot, it) => tot + it.quantity, 0)})
          </h5>
          <button 
            onClick={() => setIsCartOpen(false)} 
            className="btn p-1 border-0 text-secondary"
            style={{ background: 'transparent' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body (Items List) */}
        <div className="flex-grow-1 overflow-y-auto p-4 d-flex flex-column gap-4" style={{ overflowY: 'auto' }}>
          {cart.length === 0 ? (
            <div className="my-auto text-center py-5">
              <span style={{ fontSize: '3rem' }}>🛍️</span>
              <h5 className="font-serif mt-3 text-primary">Your cart is empty</h5>
              <p className="text-secondary mb-4" style={{ fontSize: '0.85rem' }}>Add a touch of handcrafted love to your shopping bag!</p>
              <button 
                onClick={() => setIsCartOpen(false)} 
                className="btn btn-luxury-solid py-2"
                style={{ fontSize: '0.8rem' }}
              >
                Shop Collection
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div 
                key={item.uniqueId} 
                className="d-flex gap-3 pb-3 border-bottom position-relative" 
                style={{ borderColor: 'var(--border-color-light) !important' }}
              >
                {/* Thumb */}
                <img 
                  src={item.product.images[0]} 
                  alt={item.product.name} 
                  className="object-fit-cover rounded-3"
                  style={{ width: '80px', height: '80px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
                />

                {/* Details */}
                <div className="flex-grow-1 overflow-hidden">
                  <h6 className="font-serif text-primary text-truncate mb-1" style={{ fontSize: '0.9rem' }}>
                    {item.product.name}
                  </h6>
                  
                  {item.selectedColor && (
                    <p className="m-0 text-muted" style={{ fontSize: '0.75rem' }}>
                      Color: <span className="text-primary" style={{ fontWeight: '500' }}>{item.selectedColor}</span>
                    </p>
                  )}

                  {/* Render compact customizations summary */}
                  <div className="mt-1 ps-2 border-start" style={{ borderColor: 'var(--accent-pink) !important' }}>
                    {Object.entries(item.customization).map(([k, v]) => {
                      if (!v || k === 'referenceImage') return null;
                      const formattedK = k.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                      return (
                        <p key={k} className="m-0 text-muted text-truncate" style={{ fontSize: '0.7rem' }}>
                          <strong>{formattedK}:</strong> {v}
                        </p>
                      );
                    })}
                    {item.customization.referenceImage && (
                      <p className="m-0 text-muted" style={{ fontSize: '0.7rem' }}>
                        📎 Reference: <span className="text-success" style={{ fontWeight: '500' }}>{item.customization.referenceImage.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Quantity & Price Adjuster */}
                  <div className="d-flex align-items-center justify-content-between mt-3">
                    {/* Qty controls */}
                    <div className="d-flex align-items-center border rounded-pill" style={{ borderColor: 'var(--border-color)' }}>
                      <button 
                        onClick={() => updateQuantity(item.uniqueId, -1)} 
                        className="btn btn-sm px-2 py-1 text-secondary"
                        style={{ border: 'none', background: 'transparent' }}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-2" style={{ fontSize: '0.85rem', fontWeight: '600' }}>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.uniqueId, 1)} 
                        className="btn btn-sm px-2 py-1 text-secondary"
                        style={{ border: 'none', background: 'transparent' }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Price */}
                    <span className="font-sans text-primary" style={{ fontSize: '0.9rem', fontWeight: '700' }}>
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                </div>

                {/* Remove button */}
                <button 
                  onClick={() => removeFromCart(item.uniqueId)}
                  className="btn p-1 text-muted hover-text-danger position-absolute top-0 end-0"
                  style={{ background: 'transparent', border: 'none' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer (Checkout Panel) */}
        {cart.length > 0 && (
          <div className="p-4 border-top" style={{ borderColor: 'var(--border-color) !important', background: 'var(--bg-secondary)' }}>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary" style={{ fontSize: '0.9rem' }}>Subtotal:</span>
              <span className="text-primary font-sans" style={{ fontSize: '1rem', fontWeight: '700' }}>₹{subtotal}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span className="text-secondary" style={{ fontSize: '0.9rem' }}>Shipping:</span>
              <span className="text-primary font-sans" style={{ fontSize: '0.9rem', fontWeight: '500' }}>
                {shipping === 'FREE' ? <span className="text-success" style={{ fontWeight: '600' }}>FREE</span> : `₹150`}
              </span>
            </div>
            
            <div className="d-flex justify-content-between border-top pt-3 mb-4" style={{ borderColor: 'var(--border-color) !important' }}>
              <span className="text-primary" style={{ fontSize: '1rem', fontWeight: '600' }}>Estimated Total:</span>
              <span className="text-primary font-sans" style={{ fontSize: '1.25rem', fontWeight: '700' }}>
                ₹{subtotal + (shipping === 'FREE' ? 0 : 150)}
              </span>
            </div>

            <button 
              onClick={handleCheckout}
              className="btn btn-luxury-solid w-100 py-3 d-flex align-items-center justify-content-center gap-2"
              style={{ fontSize: '0.85rem' }}
            >
              <Sparkles size={16} /> Complete Custom Order
            </button>
            <p className="text-center text-muted mt-2 mb-0" style={{ fontSize: '0.7rem' }}>
              *Order details and customizations will be sent directly to the artist on WhatsApp for confirmation.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
