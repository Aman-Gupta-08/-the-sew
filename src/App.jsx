import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Category from './pages/Category';
import Product from './pages/Product';
import Wishlist from './pages/Wishlist';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';

// Scroll To Top on page navigation
function ScrollToTopOnNav() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Preloader delay for luxury transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppProvider>
      {isLoading ? (
        <div className="preloader">
          <div className="loader-logo font-serif">
            The <span className="text-gradient-gold">sewcreative</span>
          </div>
          <div className="loader-bar">
            <div className="loader-progress"></div>
          </div>
          <p className="mt-3 font-dm" style={{ color: '#C3B4B9', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Crafting luxury memories...
          </p>
        </div>
      ) : (
        <Router>
          <ScrollToTopOnNav />
          <div className="d-flex flex-column min-vh-100 bg-primary text-primary" style={{ transition: 'background-color 0.3s, color 0.3s' }}>
            
            {/* Global Layout Components */}
            <Navbar />
            <CartDrawer />
            <QuickViewModal />
            <WhatsAppButton />
            <ScrollToTop />

            {/* Main Page Content */}
            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/category/:catId" element={<Category />} />
                <Route path="/product/:prodId" element={<Product />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/checkout" element={<Checkout />} />
                
                {/* Fallback routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      )}
    </AppProvider>
  );
}
