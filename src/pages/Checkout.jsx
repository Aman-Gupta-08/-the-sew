import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, QrCode, Send, ArrowLeft, Check, Sparkles, AlertCircle, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Checkout() {
  const { cart, getCartSubtotal, clearCart, setIsCartOpen } = useApp();
  const navigate = useNavigate();

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0 && !orderSuccess) {
      navigate('/category/all');
    }
  }, [cart, navigate]);

  // Form States
  const [address, setAddress] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pinCode: ''
  });
  
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('upi'); // upi, card, whatsapp
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, verified
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderRef, setOrderRef] = useState('');

  // Card input states
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const subtotal = getCartSubtotal();
  const shipping = subtotal > 1500 ? 0 : 150;
  const total = subtotal + shipping;

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'number') {
      // Limit to 16 digits, format with spaces
      const raw = value.replace(/\s?/g, '');
      if (isNaN(raw)) return;
      const chunks = raw.match(/.{1,4}/g);
      formattedValue = chunks ? chunks.join(' ').slice(0, 19) : '';
    } else if (name === 'expiry') {
      // Format MM/YY
      const raw = value.replace(/\//g, '');
      if (isNaN(raw)) return;
      if (raw.length > 2) {
        formattedValue = `${raw.slice(0, 2)}/${raw.slice(2, 4)}`;
      } else {
        formattedValue = raw;
      }
      formattedValue = formattedValue.slice(0, 5);
    } else if (name === 'cvv') {
      const raw = value.replace(/\s?/g, '');
      if (isNaN(raw) || raw.length > 3) return;
      formattedValue = raw;
    }

    setCardData({ ...cardData, [name]: formattedValue });
  };

  // Validate shipping details
  const validateForm = () => {
    const newErrors = {};
    if (!address.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!address.email.trim() || !/\S+@\S+\.\S+/.test(address.email)) newErrors.email = 'Valid Email is required';
    if (!address.phone.trim() || address.phone.length < 10) newErrors.phone = 'Valid Phone is required';
    if (!address.street.trim()) newErrors.street = 'Street Address is required';
    if (!address.city.trim()) newErrors.city = 'City is required';
    if (!address.state.trim()) newErrors.state = 'State is required';
    if (!address.pinCode.trim() || address.pinCode.length < 6) newErrors.pinCode = 'Valid PIN Code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Simulate Payment Process
  const handlePaymentSimulation = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (paymentMethod === 'card' && (!cardData.number || !cardData.name || !cardData.expiry || !cardData.cvv)) {
      alert('Please fill in card credentials');
      return;
    }

    setPaymentStatus('processing');

    setTimeout(() => {
      setPaymentStatus('verified');
      
      // Generate Order Ref ID
      const randomId = `TS-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
      setOrderRef(randomId);

      setTimeout(() => {
        setOrderSuccess(true);
      }, 1000);
    }, 2000);
  };

  // Final Order placement sending to WhatsApp
  const handleConfirmOnWhatsApp = () => {
    let message = `*NEW CONFIRMED ORDER: ${orderRef}*\n`;
    message += `===============================\n\n`;
    message += `*Customer Details:*\n`;
    message += `- Name: ${address.fullName}\n`;
    message += `- Email: ${address.email}\n`;
    message += `- Phone: ${address.phone}\n`;
    message += `- Delivery Address: ${address.street}, ${address.city}, ${address.state} - ${address.pinCode}\n\n`;

    message += `*Ordered Items:*\n`;
    cart.forEach((item, index) => {
      message += `*${index + 1}. ${item.product.name}* (Qty: ${item.quantity})\n`;
      if (item.selectedColor) message += `   Color: ${item.selectedColor}\n`;
      
      Object.entries(item.customization).forEach(([k, v]) => {
        if (v && k !== 'referenceImage') {
          const keyLabel = k.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          message += `   ${keyLabel}: ${v}\n`;
        }
      });
      if (item.customization.referenceImage) {
        message += `   Attachment: [Reference Image Uploaded]\n`;
      }
      message += `   Price: ₹${item.product.price * item.quantity}\n\n`;
    });

    message += `*Subtotal:* ₹${subtotal}\n`;
    message += `*Shipping:* ${shipping === 0 ? 'FREE' : '₹' + shipping}\n`;
    message += `*Total Paid (Simulated):* ₹${total}\n`;
    message += `*Payment Method:* ${paymentMethod.toUpperCase()}\n`;
    message += `*Mock Reference ID:* ${orderRef}\n\n`;
    message += `Please confirm receipt of customization assets and start preparing the order!`;

    const whatsappUrl = `https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Reset and clear
    clearCart();
    navigate('/');
  };

  return (
    <div className="container py-5 px-4">
      {/* Back button */}
      <div className="mb-4">
        <Link to="/category/all" className="d-flex align-items-center gap-2 text-decoration-none text-secondary hover-text-gold">
          <ArrowLeft size={16} /> Back to Catalog
        </Link>
      </div>

      <div className="row g-5">
        
        {/* Left Column: Shipping Address & Payment Selection */}
        <div className="col-lg-7">
          <h3 className="font-serif text-primary mb-4">Shipping & Checkout</h3>

          {/* Form */}
          <form onSubmit={handlePaymentSimulation} className="d-flex flex-column gap-4">
            
            {/* Address box */}
            <div className="glass-panel p-4 rounded-4" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
              <h5 className="font-serif text-gold mb-3" style={{ color: 'var(--accent-gold)' }}>1. Shipping Address</h5>
              
              <div className="row g-3">
                <div className="col-12">
                  <label className="font-dm text-secondary mb-1" style={{ fontSize: '0.8rem' }}>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={address.fullName}
                    onChange={handleAddressChange}
                    className="form-luxury-input w-100"
                    placeholder="e.g. Priyanshu Sharma"
                  />
                  {errors.fullName && <span className="text-danger" style={{ fontSize: '0.75rem' }}>{errors.fullName}</span>}
                </div>

                <div className="col-md-6">
                  <label className="font-dm text-secondary mb-1" style={{ fontSize: '0.8rem' }}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={address.email}
                    onChange={handleAddressChange}
                    className="form-luxury-input w-100"
                    placeholder="name@example.com"
                  />
                  {errors.email && <span className="text-danger" style={{ fontSize: '0.75rem' }}>{errors.email}</span>}
                </div>

                <div className="col-md-6">
                  <label className="font-dm text-secondary mb-1" style={{ fontSize: '0.8rem' }}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={address.phone}
                    onChange={handleAddressChange}
                    className="form-luxury-input w-100"
                    placeholder="e.g. 9876543210"
                  />
                  {errors.phone && <span className="text-danger" style={{ fontSize: '0.75rem' }}>{errors.phone}</span>}
                </div>

                <div className="col-12">
                  <label className="font-dm text-secondary mb-1" style={{ fontSize: '0.8rem' }}>Street Address</label>
                  <input
                    type="text"
                    name="street"
                    value={address.street}
                    onChange={handleAddressChange}
                    className="form-luxury-input w-100"
                    placeholder="Apartment, suite, unit, building, street, etc."
                  />
                  {errors.street && <span className="text-danger" style={{ fontSize: '0.75rem' }}>{errors.street}</span>}
                </div>

                <div className="col-md-4">
                  <label className="font-dm text-secondary mb-1" style={{ fontSize: '0.8rem' }}>City</label>
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                    className="form-luxury-input w-100"
                    placeholder="e.g. New Delhi"
                  />
                  {errors.city && <span className="text-danger" style={{ fontSize: '0.75rem' }}>{errors.city}</span>}
                </div>

                <div className="col-md-4">
                  <label className="font-dm text-secondary mb-1" style={{ fontSize: '0.8rem' }}>State</label>
                  <input
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleAddressChange}
                    className="form-luxury-input w-100"
                    placeholder="e.g. Delhi"
                  />
                  {errors.state && <span className="text-danger" style={{ fontSize: '0.75rem' }}>{errors.state}</span>}
                </div>

                <div className="col-md-4">
                  <label className="font-dm text-secondary mb-1" style={{ fontSize: '0.8rem' }}>PIN Code</label>
                  <input
                    type="text"
                    name="pinCode"
                    value={address.pinCode}
                    onChange={handleAddressChange}
                    className="form-luxury-input w-100"
                    placeholder="e.g. 110001"
                  />
                  {errors.pinCode && <span className="text-danger" style={{ fontSize: '0.75rem' }}>{errors.pinCode}</span>}
                </div>
              </div>
            </div>

            {/* Payment options box */}
            <div className="glass-panel p-4 rounded-4" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
              <h5 className="font-serif text-gold mb-3" style={{ color: 'var(--accent-gold)' }}>2. Simulated Payment Options</h5>
              
              {/* Payment Tab headers */}
              <div className="d-flex border rounded-3 p-1 mb-4" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <button
                  type="button"
                  onClick={() => { setPaymentMethod('upi'); setPaymentStatus('idle'); }}
                  className="btn py-2 flex-grow-1 d-flex align-items-center justify-content-center gap-2 border-0"
                  style={{
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    background: paymentMethod === 'upi' ? 'var(--bg-primary)' : 'transparent',
                    color: paymentMethod === 'upi' ? 'var(--text-primary)' : 'var(--text-secondary)',
                    boxShadow: paymentMethod === 'upi' ? '0 4px 12px rgba(0,0,0,0.05)' : 'none'
                  }}
                >
                  <QrCode size={16} /> UPI Scan
                </button>
                <button
                  type="button"
                  onClick={() => { setPaymentMethod('card'); setPaymentStatus('idle'); }}
                  className="btn py-2 flex-grow-1 d-flex align-items-center justify-content-center gap-2 border-0"
                  style={{
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    background: paymentMethod === 'card' ? 'var(--bg-primary)' : 'transparent',
                    color: paymentMethod === 'card' ? 'var(--text-primary)' : 'var(--text-secondary)',
                    boxShadow: paymentMethod === 'card' ? '0 4px 12px rgba(0,0,0,0.05)' : 'none'
                  }}
                >
                  <CreditCard size={16} /> Credit Card
                </button>
              </div>

              {/* UPI QR layout */}
              {paymentMethod === 'upi' && (
                <div className="text-center py-3 d-flex flex-column align-items-center">
                  {paymentStatus === 'idle' && (
                    <>
                      {/* Stylized QR Box */}
                      <div 
                        className="p-3 bg-white border rounded-4 mb-3"
                        style={{
                          width: '180px',
                          height: '180px',
                          border: '2px solid var(--accent-pink)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: 'var(--card-shadow)'
                        }}
                      >
                        {/* Mock QR SVG */}
                        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="100" height="100" rx="10" fill="#FFF" />
                          <path d="M10 10H35V35H10V10ZM15 15V30H30V15H15Z" fill="var(--text-primary)" />
                          <path d="M65 10H90V35H65V10ZM70 15V30H85V15H70Z" fill="var(--text-primary)" />
                          <path d="M10 65H35V90H10V65ZM15 70V85H30V70H15Z" fill="var(--text-primary)" />
                          <rect x="75" y="75" width="15" height="15" fill="var(--accent-gold)" />
                          <rect x="50" y="50" width="10" height="10" fill="var(--text-primary)" />
                          <rect x="60" y="60" width="10" height="10" fill="var(--text-primary)" />
                          <rect x="50" y="70" width="10" height="10" fill="var(--text-primary)" />
                          <rect x="40" y="40" width="10" height="10" fill="var(--text-primary)" />
                        </svg>
                      </div>
                      
                      <p className="text-muted mb-4" style={{ fontSize: '0.8rem' }}>Scan using GPay, PhonePe, or Paytm.<br />Amount: <strong>₹{total}</strong></p>
                      
                      <button
                        type="button"
                        onClick={handlePaymentSimulation}
                        className="btn btn-luxury"
                        style={{ fontSize: '0.8rem' }}
                      >
                        Simulate Payment Success ✨
                      </button>
                    </>
                  )}

                  {paymentStatus === 'processing' && (
                    <div className="py-4 d-flex flex-column align-items-center">
                      <div className="spinner-border text-gold" style={{ width: '3rem', height: '3rem', color: 'var(--accent-gold)' }} role="status" />
                      <p className="text-muted mt-3 m-0" style={{ fontSize: '0.85rem' }}>Verifying UPI transaction details...</p>
                    </div>
                  )}

                  {paymentStatus === 'verified' && (
                    <div className="py-4 d-flex flex-column align-items-center">
                      <div className="d-flex align-items-center justify-content-center bg-success-subtle border border-success rounded-circle animate-float" style={{ width: '70px', height: '70px', background: 'rgba(25, 135, 84, 0.1)' }}>
                        <Check size={36} className="text-success" />
                      </div>
                      <h5 className="font-serif text-success mt-3 mb-1">Transaction Confirmed</h5>
                      <p className="text-muted m-0" style={{ fontSize: '0.8rem' }}>Reference code verified. Preparing checkouts...</p>
                    </div>
                  )}
                </div>
              )}

              {/* Credit Card layout */}
              {paymentMethod === 'card' && (
                <div className="d-flex flex-column gap-4">
                  {/* Floating Graphic Credit Card */}
                  <div className={`payment-card-wrapper ${isCardFlipped ? 'flipped' : ''}`}>
                    <div className="payment-card-inner">
                      {/* Front face */}
                      <div className="payment-card-front">
                        <div className="d-flex justify-content-between align-items-center w-100">
                          <span style={{ fontSize: '0.8rem', letterSpacing: '0.15em', fontWeight: 'bold' }}>THE SEWCREATIVE CARD</span>
                          <div className="payment-card-chip" />
                        </div>
                        <h4 className="font-mono text-center my-3 w-100" style={{ letterSpacing: '0.12em', fontSize: '1.2rem', fontFamily: 'monospace' }}>
                          {cardData.number || '•••• •••• •••• ••••'}
                        </h4>
                        <div className="d-flex justify-content-between align-items-center w-100" style={{ fontSize: '0.75rem' }}>
                          <div>
                            <span className="text-white-50 d-block" style={{ fontSize: '0.6rem' }}>CARDHOLDER</span>
                            <span className="text-uppercase font-dm" style={{ fontWeight: '500' }}>{cardData.name || 'Your Name'}</span>
                          </div>
                          <div>
                            <span className="text-white-50 d-block" style={{ fontSize: '0.6rem' }}>EXPIRES</span>
                            <span>{cardData.expiry || 'MM/YY'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Back face */}
                      <div className="payment-card-back">
                        <div className="payment-card-black-strip" />
                        <div className="payment-card-signature-strip">
                          {cardData.cvv || '•••'}
                        </div>
                        <span className="text-white-50 mt-auto" style={{ fontSize: '0.55rem', lineHeight: '1.4' }}>
                          Simulated luxury card for the sewcreative. Do not use actual production credit card details.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card input details */}
                  {paymentStatus === 'idle' ? (
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="font-dm text-secondary mb-1" style={{ fontSize: '0.8rem' }}>Card Number</label>
                        <input
                          type="text"
                          name="number"
                          value={cardData.number}
                          onChange={handleCardChange}
                          onFocus={() => setIsCardFlipped(false)}
                          className="form-luxury-input w-100"
                          placeholder="4000 1234 5678 9010"
                        />
                      </div>
                      <div className="col-12">
                        <label className="font-dm text-secondary mb-1" style={{ fontSize: '0.8rem' }}>Cardholder Name</label>
                        <input
                          type="text"
                          name="name"
                          value={cardData.name}
                          onChange={handleCardChange}
                          onFocus={() => setIsCardFlipped(false)}
                          className="form-luxury-input w-100"
                          placeholder="e.g. PRIYANSHU SHARMA"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="font-dm text-secondary mb-1" style={{ fontSize: '0.8rem' }}>Expiration Date</label>
                        <input
                          type="text"
                          name="expiry"
                          value={cardData.expiry}
                          onChange={handleCardChange}
                          onFocus={() => setIsCardFlipped(false)}
                          className="form-luxury-input w-100"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="font-dm text-secondary mb-1" style={{ fontSize: '0.8rem' }}>CVV Code</label>
                        <input
                          type="password"
                          name="cvv"
                          value={cardData.cvv}
                          onChange={handleCardChange}
                          onFocus={() => setIsCardFlipped(true)}
                          onBlur={() => setIsCardFlipped(false)}
                          className="form-luxury-input w-100"
                          placeholder="123"
                        />
                      </div>

                      <div className="col-12 mt-4">
                        <button
                          type="submit"
                          className="btn btn-luxury-solid w-100 py-3"
                          style={{ fontSize: '0.85rem' }}
                        >
                          Place Mock Card Order (₹{total})
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4 d-flex flex-column align-items-center">
                      {paymentStatus === 'processing' && (
                        <>
                          <div className="spinner-border text-gold" style={{ width: '3rem', height: '3rem', color: 'var(--accent-gold)' }} role="status" />
                          <p className="text-muted mt-3 m-0" style={{ fontSize: '0.85rem' }}>Authorizing transaction credentials...</p>
                        </>
                      )}
                      {paymentStatus === 'verified' && (
                        <>
                          <div className="d-flex align-items-center justify-content-center bg-success-subtle border border-success rounded-circle animate-float" style={{ width: '70px', height: '70px', background: 'rgba(25, 135, 84, 0.1)' }}>
                            <Check size={36} className="text-success" />
                          </div>
                          <h5 className="font-serif text-success mt-3 mb-1">Authorization Complete</h5>
                          <p className="text-muted m-0" style={{ fontSize: '0.8rem' }}>Transaction successfully completed.</p>
                        </>
                      )}
                    </div>
                  )}

                </div>
              )}

            </div>

          </form>
        </div>

        {/* Right Column: Order Summary details */}
        <div className="col-lg-5">
          <div className="sticky-top" style={{ top: '100px' }}>
            <h5 className="font-serif text-primary mb-4">Order Summary</h5>
            
            <div className="glass-card p-4 border shadow-sm" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              
              {/* Product list */}
              <div className="d-flex flex-column gap-3 mb-4 max-vh-50 overflow-y-auto" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {cart.map((item) => (
                  <div key={item.uniqueId} className="d-flex align-items-center gap-3">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="object-fit-cover rounded border" 
                      style={{ width: '50px', height: '50px', background: '#fff' }} 
                    />
                    <div className="flex-grow-1 overflow-hidden" style={{ fontSize: '0.8rem' }}>
                      <h6 className="font-serif m-0 text-truncate text-primary" style={{ fontSize: '0.85rem' }}>{item.product.name}</h6>
                      <p className="m-0 text-muted">
                        Qty: {item.quantity} {item.selectedColor && `• Color: ${item.selectedColor}`}
                      </p>
                    </div>
                    <span className="font-sans text-primary" style={{ fontSize: '0.85rem', fontWeight: '600' }}>
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Subtotal & pricing details */}
              <div className="border-top pt-3 d-flex flex-column gap-2" style={{ borderColor: 'var(--border-color) !important', fontSize: '0.85rem' }}>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Subtotal:</span>
                  <span className="text-primary font-sans">₹{subtotal}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Customization Charges:</span>
                  <span className="text-success" style={{ fontWeight: '500' }}>FREE</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Shipping Courier Fee:</span>
                  <span className="text-primary font-sans">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>

                <div 
                  className="d-flex justify-content-between border-top pt-3 mt-2" 
                  style={{ borderColor: 'var(--border-color) !important', fontSize: '1rem', fontWeight: '600' }}
                >
                  <span className="text-primary">Order Total:</span>
                  <span className="text-primary font-sans fs-5" style={{ fontWeight: '700' }}>₹{total}</span>
                </div>
              </div>

            </div>

            {/* Note box */}
            <div className="mt-3 p-3 rounded-3 d-flex gap-2" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <AlertCircle size={16} className="text-warning mt-1" />
              <p className="text-secondary m-0" style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>
                *All customization forms (including date formats and messages) have been gathered. Payment is simulated for testing. Final confirmations will be sent to WhatsApp.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Success Celebration Screen Overlay */}
      {orderSuccess && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center"
          style={{
            zIndex: 9999,
            background: 'rgba(15, 9, 11, 0.95)',
            backdropFilter: 'blur(8px)',
            color: '#fff',
            animation: 'fadeInOverlay 0.5s ease-out'
          }}
        >
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes fadeInOverlay {
              0% { opacity: 0; }
              100% { opacity: 1; }
            }
            @keyframes scaleCheckmark {
              0% { transform: scale(0); }
              100% { transform: scale(1); }
            }
          `}} />

          {/* Floating Confetti (Emoji based) */}
          <div className="position-absolute w-100 h-100 overflow-hidden top-0 start-0 pointer-events-none" style={{ pointerEvents: 'none' }}>
            {[...Array(12)].map((_, i) => (
              <span 
                key={i} 
                className="position-absolute"
                style={{
                  fontSize: '2rem',
                  left: `${Math.random() * 90}%`,
                  top: `${Math.random() * 80}%`,
                  animation: 'float 3s infinite alternate ease-in-out',
                  animationDelay: `${i * 0.25}s`,
                  opacity: 0.6
                }}
              >
                {['✨', '🌸', '💖', '💐', '🎉'][i % 5]}
              </span>
            ))}
          </div>

          <div className="text-center px-4" style={{ maxWidth: '500px', zIndex: 10 }}>
            {/* Checked checkmark */}
            <div 
              className="d-flex align-items-center justify-content-center bg-success border border-success rounded-circle mx-auto mb-4"
              style={{
                width: '90px',
                height: '90px',
                animation: 'scaleCheckmark 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}
            >
              <Check size={48} className="text-light" />
            </div>

            <span className="badge-gold mb-3 d-inline-block" style={{ background: 'var(--accent-gold)' }}>Payment Confirmed</span>
            <h2 className="font-serif text-white mb-2 fs-2">Your Order is Reserved!</h2>
            <p className="text-white-50 mb-2" style={{ fontSize: '0.9rem' }}>Order Reference ID: <strong>{orderRef}</strong></p>
            <p className="text-white-50 mb-4" style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
              We have successfully simulated your transaction. To finalize the custom details and submit any reference photo attachments, click the button below to text the artist on WhatsApp.
            </p>

            <button
              onClick={handleConfirmOnWhatsApp}
              className="btn btn-luxury-solid w-100 py-3 d-flex align-items-center justify-content-center gap-2"
              style={{ background: '#25D366', borderColor: '#25D366', color: '#fff' }}
            >
              <MessageCircle size={18} fill="#fff" /> Share Order on WhatsApp 💬
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
