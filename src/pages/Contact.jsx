import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, HelpCircle } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      setSubmitted(true);
      setFormState({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="container py-5 px-4">
      {/* Page Header */}
      <div className="text-center mb-5">
        <span className="text-muted text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.25em', fontWeight: '600' }}>Get In Touch</span>
        <h2 className="font-serif mt-2 text-primary display-5">Contact Our Studio</h2>
        <div className="mx-auto mt-2" style={{ width: '60px', height: '2px', background: 'var(--accent-gold)' }} />
      </div>

      {/* Main Grid: Form on Left, Contact Details & FAQ on Right */}
      <div className="row g-5 align-items-start mb-5">
        
        {/* Contact Form Column */}
        <div className="col-lg-6">
          <div 
            className="glass-panel p-4 p-md-5 rounded-4 border shadow-sm"
            style={{ 
              background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)',
              borderColor: 'var(--border-color)' 
            }}
          >
            <h4 className="font-serif text-primary mb-3">Send Us a Direct Query</h4>
            <p className="text-secondary mb-4" style={{ fontSize: '0.85rem' }}>Want a specific customization not listed on our website? Drop us a message, and our designer will get in touch!</p>

            <form onSubmit={handleFormSubmit} className="d-flex flex-column gap-3">
              <div className="form-floating mb-2">
                <input 
                  type="text" 
                  name="name" 
                  value={formState.name} 
                  onChange={handleInputChange} 
                  required 
                  className="form-control form-luxury-input border-1 py-3" 
                  id="floatName" 
                  placeholder="Your Name" 
                  style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                />
                <label htmlFor="floatName" className="text-muted" style={{ paddingLeft: '16px' }}>Your Name</label>
              </div>

              <div className="form-floating mb-2">
                <input 
                  type="email" 
                  name="email" 
                  value={formState.email} 
                  onChange={handleInputChange} 
                  required 
                  className="form-control form-luxury-input border-1 py-3" 
                  id="floatEmail" 
                  placeholder="name@example.com"
                  style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                />
                <label htmlFor="floatEmail" className="text-muted" style={{ paddingLeft: '16px' }}>Email Address</label>
              </div>

              <div className="form-floating mb-2">
                <input 
                  type="tel" 
                  name="phone" 
                  value={formState.phone} 
                  onChange={handleInputChange} 
                  className="form-control form-luxury-input border-1 py-3" 
                  id="floatPhone" 
                  placeholder="Phone number"
                  style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                />
                <label htmlFor="floatPhone" className="text-muted" style={{ paddingLeft: '16px' }}>Phone Number (optional)</label>
              </div>

              <div className="form-floating mb-3">
                <textarea 
                  name="message" 
                  value={formState.message} 
                  onChange={handleInputChange} 
                  required 
                  className="form-control form-luxury-input border-1 py-3" 
                  id="floatMessage" 
                  placeholder="Describe your design..." 
                  style={{ height: '120px', resize: 'none', background: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                />
                <label htmlFor="floatMessage" className="text-muted" style={{ paddingLeft: '16px' }}>Message Details</label>
              </div>

              <button 
                type="submit" 
                className="btn btn-luxury-solid py-3 d-flex align-items-center justify-content-center gap-2"
                style={{ fontSize: '0.85rem' }}
              >
                <Send size={14} /> Send Message
              </button>
            </form>

            {submitted && (
              <div className="alert alert-success mt-4 rounded-3 border-0 py-3 font-dm" style={{ fontSize: '0.85rem', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>
                ✨ <strong>Thank you!</strong> Your message has been routed to our concierge team. We will respond within 24 hours.
              </div>
            )}
          </div>
        </div>

        {/* Contact info & FAQ column */}
        <div className="col-lg-6 d-flex flex-column gap-4">
          {/* Quick Contacts details */}
          <div className="glass-card p-4" style={{ border: '1px solid var(--border-color)' }}>
            <h5 className="font-serif text-primary mb-3">Direct Channels</h5>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex gap-3 align-items-start">
                <MapPin size={18} className="text-gold mt-1" style={{ color: 'var(--accent-gold)' }} />
                <div>
                  <h6 className="m-0 font-dm text-primary" style={{ fontSize: '0.85rem', fontWeight: '600' }}>Showroom Atelier</h6>
                  <p className="text-secondary m-0" style={{ fontSize: '0.8rem' }}>404, Luxury Atelier Road, Sector 5, Gurugram, Haryana - 122002</p>
                </div>
              </div>
              
              <div className="d-flex gap-3 align-items-start">
                <Phone size={18} className="text-gold mt-1" style={{ color: 'var(--accent-gold)' }} />
                <div>
                  <h6 className="m-0 font-dm text-primary" style={{ fontSize: '0.85rem', fontWeight: '600' }}>Customer Care</h6>
                  <p className="text-secondary m-0" style={{ fontSize: '0.8rem' }}>+91 XXXXX XXXXX (Mon-Sat, 10 AM to 7 PM)</p>
                </div>
              </div>

              <div className="d-flex gap-3 align-items-start">
                <Mail size={18} className="text-gold mt-1" style={{ color: 'var(--accent-gold)' }} />
                <div>
                  <h6 className="m-0 font-dm text-primary" style={{ fontSize: '0.85rem', fontWeight: '600' }}>Design Inquiries</h6>
                  <p className="text-secondary m-0" style={{ fontSize: '0.8rem' }}>concierge@thesewcreative.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="glass-card p-4" style={{ border: '1px solid var(--border-color)' }}>
            <h5 className="font-serif text-primary mb-3 d-flex align-items-center gap-2">
              <HelpCircle size={18} className="text-gold" style={{ color: 'var(--accent-gold)' }} /> Frequently Asked Questions
            </h5>
            
            <div className="accordion accordion-flush" id="faqAccordion">
              
              <div className="accordion-item mb-2" style={{ background: 'transparent' }}>
                <h2 className="accordion-header">
                  <button 
                    className="accordion-button collapsed font-serif text-primary" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#flush-collapseOne" 
                    style={{ background: 'var(--bg-secondary)', fontSize: '0.9rem', outline: 'none', boxShadow: 'none' }}
                  >
                    How long does a customized gift take to prepare?
                  </button>
                </h2>
                <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body text-secondary" style={{ fontSize: '0.8rem', lineHeight: '1.6' }}>
                    Since all items are 100% hand-crafted by our artists, embroidery hoops take approximately 7-10 working days, resin castings take 6-9 days (due to chemical curing requirements), and flower bouquets take 4-6 days.
                  </div>
                </div>
              </div>

              <div className="accordion-item mb-2" style={{ background: 'transparent' }}>
                <h2 className="accordion-header">
                  <button 
                    className="accordion-button collapsed font-serif text-primary" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#flush-collapseTwo"
                    style={{ background: 'var(--bg-secondary)', fontSize: '0.9rem', outline: 'none', boxShadow: 'none' }}
                  >
                    Can I make changes to my layout after adding to cart?
                  </button>
                </h2>
                <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body text-secondary" style={{ fontSize: '0.8rem', lineHeight: '1.6' }}>
                    Absolutely! Once you complete checkout, the cart details will redirect you to WhatsApp. Our lead designer will review your details, confirm design changes, and share mock layout sketches before beginning production.
                  </div>
                </div>
              </div>

              <div className="accordion-item mb-0" style={{ background: 'transparent' }}>
                <h2 className="accordion-header">
                  <button 
                    className="accordion-button collapsed font-serif text-primary" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#flush-collapseThree"
                    style={{ background: 'var(--bg-secondary)', fontSize: '0.9rem', outline: 'none', boxShadow: 'none' }}
                  >
                    Do you ship fragile items (like Resin Clocks/Glasses) safely?
                  </button>
                </h2>
                <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body text-secondary" style={{ fontSize: '0.8rem', lineHeight: '1.6' }}>
                    Yes, all delicate resin plaques, mirrors, frames, and hoops are packed with heavy-grade air bubble wraps, corners guards, and placed in durable hardboard wooden boxes to ensure they arrive undamaged.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
