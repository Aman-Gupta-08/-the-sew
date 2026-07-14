import React, { useState, useEffect } from 'react';
import { Upload, X, Check, Heart, ShoppingBag, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CustomizationForm({ product }) {
  const { addToCart, setIsCartOpen, toggleWishlist, isWishlisted } = useApp();
  const [formData, setFormData] = useState({});
  const [selectedColor, setSelectedColor] = useState('');
  const [referenceFile, setReferenceFile] = useState(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [addToCartStatus, setAddToCartStatus] = useState('idle'); // idle, adding, success
  const [errors, setErrors] = useState({});

  const wishlisted = isWishlisted(product.id);

  // Initialize form state
  useEffect(() => {
    const initialData = {};
    product.customizationFields.forEach(field => {
      initialData[field.name] = '';
    });
    initialData['extraInstructions'] = '';
    setFormData(initialData);
    
    if (product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
    
    // Reset file uploads
    setReferenceFile(null);
    setFilePreviewUrl('');
    setAddToCartStatus('idle');
    setErrors({});
  }, [product]);

  // Cleanup file preview url to avoid memory leaks
  useEffect(() => {
    return () => {
      if (filePreviewUrl) {
        URL.revokeObjectURL(filePreviewUrl);
      }
    };
  }, [filePreviewUrl]);

  const handleInputChange = (fieldName, val) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: val
    }));
    // Clear error
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: null }));
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleFile = (file) => {
    if (!file) return;
    
    // Check file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      alert('Invalid file format. Please upload PNG, JPG, or PDF.');
      return;
    }

    setReferenceFile(file);
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setFilePreviewUrl(url);
    } else {
      setFilePreviewUrl(''); // PDF file has no preview image
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleRemoveFile = (e) => {
    e.preventDefault();
    setReferenceFile(null);
    if (filePreviewUrl) {
      URL.revokeObjectURL(filePreviewUrl);
      setFilePreviewUrl('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate
    const tempErrors = {};
    product.customizationFields.forEach(field => {
      if (field.required && !formData[field.name]) {
        tempErrors[field.name] = `${field.label} is required`;
      }
    });

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      // Scroll to the first error
      const firstErrorKey = Object.keys(tempErrors)[0];
      const element = document.getElementsByName(firstErrorKey)[0];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Prepare complete customization object
    const finalCustomization = {
      ...formData,
      referenceImage: referenceFile ? {
        name: referenceFile.name,
        size: referenceFile.size,
        type: referenceFile.type,
        previewUrl: filePreviewUrl
      } : null
    };

    setAddToCartStatus('adding');
    
    setTimeout(() => {
      addToCart(product, 1, selectedColor, finalCustomization);
      setAddToCartStatus('success');
      
      setTimeout(() => {
        setAddToCartStatus('idle');
        setIsCartOpen(true); // Automatically slide out the Cart Drawer
      }, 1000);
    }, 800);
  };

  return (
    <div className="row g-4">
      {/* Left: Input Form Fields */}
      <div className="col-lg-7">
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
          
          {/* Color Chooser */}
          {product.colors && product.colors.length > 0 && (
            <div className="p-4 rounded-4" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <h6 className="font-dm text-primary mb-3" style={{ fontSize: '0.85rem', letterSpacing: '0.05em', fontWeight: '600', textTransform: 'uppercase' }}>
                1. Select Custom Color Palette:
              </h6>
              <div className="d-flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className="btn px-3 py-2 text-capitalize"
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      borderRadius: '30px',
                      background: selectedColor === color ? 'var(--accent-gold)' : 'var(--bg-primary)',
                      color: selectedColor === color ? '#fff' : 'var(--text-primary)',
                      border: selectedColor === color ? '1px solid var(--accent-gold)' : '1px solid var(--border-color)',
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form Inputs (Custom Fields) */}
          <div className="p-4 rounded-4" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <h6 className="font-dm text-primary mb-3" style={{ fontSize: '0.85rem', letterSpacing: '0.05em', fontWeight: '600', textTransform: 'uppercase' }}>
              2. Enter Personal Details:
            </h6>
            
            <div className="d-flex flex-column gap-3">
              {product.customizationFields.map((field) => (
                <div key={field.name} className="d-flex flex-column gap-1">
                  <label className="font-dm text-secondary" style={{ fontSize: '0.85rem', fontWeight: '500' }}>
                    {field.label} {field.required && <span className="text-danger">*</span>}
                  </label>
                  
                  {field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      placeholder={field.placeholder || ''}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="form-luxury-input"
                      rows={3}
                      style={{ resize: 'none' }}
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder || ''}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="form-luxury-input"
                    />
                  )}
                  
                  {errors[field.name] && (
                    <span className="text-danger" style={{ fontSize: '0.75rem', fontWeight: '500' }}>⚠️ {errors[field.name]}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Drag & Drop Reference Image Uploader */}
          <div className="p-4 rounded-4" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <h6 className="font-dm text-primary mb-2" style={{ fontSize: '0.85rem', letterSpacing: '0.05em', fontWeight: '600', textTransform: 'uppercase' }}>
              3. Upload Reference File (optional):
            </h6>
            <p className="text-secondary mb-3" style={{ fontSize: '0.75rem' }}>Upload an inspiration design, hand drawing, custom photo, or text document (.png, .jpg, .pdf up to 10MB).</p>

            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`d-flex flex-column align-items-center justify-content-center p-4 rounded-3 text-center cursor-pointer`}
              style={{
                border: isDragOver ? '2px dashed var(--accent-gold)' : '2px dashed var(--border-color)',
                background: isDragOver ? 'rgba(197, 168, 128, 0.05)' : 'var(--bg-primary)',
                transition: 'var(--transition-fast)',
                cursor: 'pointer'
              }}
            >
              <input
                type="file"
                id="ref-file"
                accept=".png,.jpg,.jpeg,.pdf"
                onChange={handleFileInput}
                className="d-none"
              />
              
              {referenceFile ? (
                <div className="position-relative w-100 d-flex flex-column align-items-center">
                  {filePreviewUrl ? (
                    <img 
                      src={filePreviewUrl} 
                      alt="Upload Preview" 
                      className="object-fit-cover rounded mb-2 border" 
                      style={{ width: '80px', height: '80px' }} 
                    />
                  ) : (
                    <span className="mb-2" style={{ fontSize: '2.5rem' }}>📄</span>
                  )}
                  <p className="m-0 font-dm text-primary" style={{ fontSize: '0.85rem', fontWeight: '500' }}>
                    {referenceFile.name}
                  </p>
                  <p className="text-muted m-0" style={{ fontSize: '0.75rem' }}>
                    {(referenceFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  
                  <button 
                    onClick={handleRemoveFile} 
                    className="btn btn-sm btn-outline-danger mt-2 rounded-pill px-3" 
                    style={{ fontSize: '0.7rem' }}
                  >
                    Remove File
                  </button>
                </div>
              ) : (
                <label htmlFor="ref-file" className="w-100 h-100 d-flex flex-column align-items-center cursor-pointer" style={{ cursor: 'pointer' }}>
                  <Upload size={28} className="text-muted mb-2" />
                  <p className="m-0 text-primary font-dm" style={{ fontSize: '0.85rem', fontWeight: '500' }}>
                    Drag & drop files here, or <span className="text-gradient-gold" style={{ fontWeight: '600' }}>browse files</span>
                  </p>
                  <p className="text-muted m-0 mt-1" style={{ fontSize: '0.7rem' }}>Supports JPG, PNG, PDF up to 10MB</p>
                </label>
              )}
            </div>
          </div>

          {/* Extra Custom Instructions */}
          <div className="p-4 rounded-4" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <h6 className="font-dm text-primary mb-2" style={{ fontSize: '0.85rem', letterSpacing: '0.05em', fontWeight: '600', textTransform: 'uppercase' }}>
              4. Special Instructions (optional):
            </h6>
            <textarea
              placeholder="e.g. Please use lavender flowers, shiny silver foil, and write the text in a cursive gold lettering..."
              value={formData.extraInstructions || ''}
              onChange={(e) => handleInputChange('extraInstructions', e.target.value)}
              className="form-luxury-input w-100"
              rows={3}
              style={{ resize: 'none' }}
            />
          </div>

          {/* Cart Buttons & Wishlist Button */}
          <div className="d-flex align-items-center gap-3">
            <button
              type="submit"
              disabled={addToCartStatus !== 'idle'}
              className="btn btn-luxury-solid flex-grow-1 py-3 d-flex align-items-center justify-content-center gap-2"
              style={{ fontSize: '0.9rem', position: 'relative' }}
            >
              {addToCartStatus === 'idle' && (
                <>
                  <ShoppingBag size={18} /> Add Customized Gift to Cart
                </>
              )}
              {addToCartStatus === 'adding' && (
                <>
                  <div className="spinner-border spinner-border-sm text-light" role="status" /> Stitching details...
                </>
              )}
              {addToCartStatus === 'success' && (
                <>
                  <Check size={18} className="text-success" /> Added to Shopping Bag! ✨
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className="btn btn-neumorphic rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: '52px', height: '52px', border: '1px solid var(--border-color)' }}
            >
              <Heart size={20} fill={wishlisted ? '#E91E63' : 'none'} color={wishlisted ? '#E91E63' : 'var(--text-primary)'} />
            </button>
          </div>

        </form>
      </div>

      {/* Right: Interactive Live Preview Box */}
      <div className="col-lg-5">
        <div className="sticky-top" style={{ top: '100px', zIndex: 10 }}>
          <h6 className="font-dm text-primary mb-3 text-uppercase" style={{ fontSize: '0.85rem', letterSpacing: '0.1em', fontWeight: '700' }}>
            ✨ Live Personalized Preview:
          </h6>
          
          <div 
            className="glass-card glowing-preview overflow-hidden text-center d-flex flex-column align-items-center justify-content-center p-4 border shadow"
            style={{
              borderColor: 'var(--border-color)',
              minHeight: '350px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)',
              position: 'relative'
            }}
          >
            {/* Elegant Background Grid Overlay */}
            <div className="position-absolute w-100 h-100 top-0 start-0 opacity-10" style={{ backgroundImage: 'radial-gradient(var(--accent-pink) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

            {/* Custom Color Background Preview Strip */}
            {selectedColor && (
              <div 
                className="position-absolute start-0 top-0 w-100 p-2 text-center text-capitalize text-muted border-bottom"
                style={{
                  background: 'rgba(255, 255, 255, 0.4)',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  letterSpacing: '0.05em',
                  borderColor: 'var(--border-color)'
                }}
              >
                Color Theme: {selectedColor}
              </div>
            )}

            {/* Simulated Frame/Hoop Layout */}
            <div 
              className={`rounded-circle d-flex flex-column align-items-center justify-content-center p-4 mt-3 mb-3 shadow-inner`}
              style={{
                width: '260px',
                height: '260px',
                border: product.category === 'embroidery-hoop' ? '12px solid #C5A880' : '4px solid var(--border-color)', // Gold wooden bezel for hoops
                background: filePreviewUrl ? `url(${filePreviewUrl}) center/cover no-repeat` : 'var(--bg-primary)',
                position: 'relative',
                boxShadow: 'inset 0 4px 15px rgba(0,0,0,0.05)',
                transition: 'background 0.5s ease'
              }}
            >
              {/* If image uploaded, add a glass overlay to texts */}
              {filePreviewUrl && (
                <div 
                  className="position-absolute w-100 h-100 rounded-circle top-0 start-0" 
                  style={{
                    background: 'rgba(255, 255, 255, 0.65)',
                    backdropFilter: 'blur(2px)'
                  }} 
                />
              )}

              {/* Dynamic Overlay Text Elements */}
              <div className="position-relative z-1 d-flex flex-column align-items-center justify-content-center text-center px-3">
                {/* Specific Layout configurations per category */}
                {product.id === 'hoop-couple' && (
                  <>
                    <h4 className="font-serif m-0 text-primary" style={{ fontSize: '1.4rem', fontStyle: 'italic' }}>
                      {formData.partner1 || 'Partner 1'}
                    </h4>
                    <span className="my-1 text-danger" style={{ fontSize: '1.2rem' }}>💖</span>
                    <h4 className="font-serif m-0 text-primary" style={{ fontSize: '1.4rem', fontStyle: 'italic' }}>
                      {formData.partner2 || 'Partner 2'}
                    </h4>
                    {formData.anniversaryDate && (
                      <p className="font-dm text-muted mt-2 m-0" style={{ fontSize: '0.75rem', fontWeight: '500' }}>
                        {new Date(formData.anniversaryDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </p>
                    )}
                    {formData.specialMessage && (
                      <p className="font-sans text-secondary mt-2 mb-0" style={{ fontSize: '0.75rem', fontStyle: 'italic' }}>
                        "{formData.specialMessage}"
                      </p>
                    )}
                  </>
                )}

                {product.id === 'hoop-baby' && (
                  <>
                    <span style={{ fontSize: '1.5rem' }}>👶</span>
                    <h4 className="font-serif m-0 mt-1 text-primary text-capitalize" style={{ fontSize: '1.3rem' }}>
                      {formData.babyName || "Baby's Name"}
                    </h4>
                    {formData.birthDate && (
                      <p className="font-sans text-secondary mt-2 m-0" style={{ fontSize: '0.75rem' }}>
                        🗓️ {new Date(formData.birthDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </p>
                    )}
                    {formData.birthTime && (
                      <p className="font-sans text-secondary m-0" style={{ fontSize: '0.75rem' }}>
                        ⏰ {formData.birthTime}
                      </p>
                    )}
                    {formData.birthWeight && (
                      <p className="font-sans text-secondary m-0" style={{ fontSize: '0.75rem', fontWeight: '500' }}>
                        ⚖️ {formData.birthWeight}
                      </p>
                    )}
                  </>
                )}

                {product.id === 'hoop-wedding' && (
                  <>
                    <h4 className="font-serif m-0 text-primary" style={{ fontSize: '1.15rem' }}>
                      {formData.brideName || 'Bride'}
                    </h4>
                    <span className="my-1 text-gold" style={{ fontSize: '0.8rem', fontStyle: 'italic', letterSpacing: '0.1em' }}>AND</span>
                    <h4 className="font-serif m-0 text-primary" style={{ fontSize: '1.15rem' }}>
                      {formData.groomName || 'Groom'}
                    </h4>
                    {formData.weddingDate && (
                      <p className="font-dm text-muted mt-2 m-0" style={{ fontSize: '0.75rem', borderTop: '1px solid var(--border-color)', pt: '4px' }}>
                        {new Date(formData.weddingDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </p>
                    )}
                    {formData.customQuote && (
                      <p className="font-sans text-secondary mt-2 mb-0" style={{ fontSize: '0.7rem', opacity: 0.8 }}>
                        "{formData.customQuote}"
                      </p>
                    )}
                  </>
                )}

                {/* Default placeholder styling for generic custom products */}
                {['hoop-couple', 'hoop-baby', 'hoop-wedding'].indexOf(product.id) === -1 && (
                  <>
                    {/* Spotify Plaque Layout */}
                    {product.id === 'frame-spotify' ? (
                      <div className="d-flex flex-column align-items-center w-100">
                        {/* Mock Album Art */}
                        <div className="rounded border mb-2 bg-dark-subtle d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px', overflow: 'hidden' }}>
                          {filePreviewUrl ? (
                            <img src={filePreviewUrl} alt="Album Art" className="w-100 h-100 object-fit-cover" />
                          ) : (
                            <span style={{ fontSize: '1.8rem' }}>🎵</span>
                          )}
                        </div>
                        <h6 className="font-sans m-0 text-primary text-truncate w-100" style={{ fontSize: '0.85rem', fontWeight: '600' }}>
                          {formData.songTitle || 'Song Title'}
                        </h6>
                        <p className="text-secondary m-0 text-truncate w-100" style={{ fontSize: '0.75rem' }}>
                          {formData.artistName || 'Artist Name'}
                        </p>
                        {/* Spotify Waves Code */}
                        <div className="mt-2 p-1 bg-secondary rounded d-flex align-items-center gap-1 justify-content-center" style={{ width: '130px', height: '22px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                          <span style={{ fontSize: '0.7rem' }}>🎚️🎚️🎚️🎚️🎚️</span>
                        </div>
                        {formData.customDate && (
                          <p className="text-muted m-0 mt-1" style={{ fontSize: '0.65rem' }}>{formData.customDate}</p>
                        )}
                      </div>
                    ) : (
                      // Normal listing generic inputs
                      <div className="d-flex flex-column gap-2 text-center">
                        {Object.entries(formData).map(([k, v]) => {
                          if (!v || k === 'extraInstructions') return null;
                          const formattedK = k.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                          return (
                            <div key={k}>
                              <span className="text-muted" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{formattedK}</span>
                              <p className="m-0 text-primary font-serif" style={{ fontSize: '0.95rem' }}>{v}</p>
                            </div>
                          );
                        })}
                        {Object.values(formData).filter(v => v).length === 0 && (
                          <>
                            <Sparkles size={20} className="text-gold mb-1" />
                            <p className="m-0 text-muted" style={{ fontSize: '0.8rem' }}>Your customized texts will appear here dynamically</p>
                          </>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <span className="text-muted" style={{ fontSize: '0.7rem' }}>*The preview is a layout simulation. The artist will craft and detail your final layout individually before curing or stitching.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
