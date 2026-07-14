import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // --- THEME STATE ---
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // --- WISHLIST STATE ---
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  // --- CART STATE ---
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity, selectedColor, customization) => {
    setCart((prev) => {
      // Create a unique key based on ID, color, and stringified customizations
      const customString = JSON.stringify({
        selectedColor,
        partner1: customization.partner1 || '',
        partner2: customization.partner2 || '',
        anniversaryDate: customization.anniversaryDate || '',
        specialMessage: customization.specialMessage || '',
        babyName: customization.babyName || '',
        birthDate: customization.birthDate || '',
        birthTime: customization.birthTime || '',
        birthWeight: customization.birthWeight || '',
        brideName: customization.brideName || '',
        groomName: customization.groomName || '',
        weddingDate: customization.weddingDate || '',
        customQuote: customization.customQuote || '',
        bookmarkName: customization.bookmarkName || '',
        quote: customization.quote || '',
        familySurname: customization.familySurname || '',
        houseNumber: customization.houseNumber || '',
        familyNames: customization.familyNames || '',
        baseTheme: customization.baseTheme || '',
        cardMsg: customization.cardMsg || '',
        wrapColor: customization.wrapColor || '',
        birthdayPersonName: customization.birthdayPersonName || '',
        age: customization.age || '',
        candleFragrance: customization.candleFragrance || '',
        wishes: customization.wishes || '',
        coupleNames: customization.coupleNames || '',
        specialNotes: customization.specialNotes || '',
        songTitle: customization.songTitle || '',
        artistName: customization.artistName || '',
        spotifyLink: customization.spotifyLink || '',
        customDate: customization.customDate || '',
        engravedNames: customization.engravedNames || '',
        specialYear: customization.specialYear || '',
        extraInstructions: customization.extraInstructions || '',
        referenceImageName: customization.referenceImage?.name || ''
      });
      
      const itemUniqueId = `${product.id}-${btoa(unescape(encodeURIComponent(customString))).slice(0, 16)}`;

      // Check if product with EXACT customization is already in cart
      const existingIndex = prev.findIndex((item) => item.uniqueId === itemUniqueId);

      if (existingIndex > -1) {
        const updatedCart = [...prev];
        updatedCart[existingIndex].quantity += quantity;
        return updatedCart;
      } else {
        return [
          ...prev,
          {
            uniqueId: itemUniqueId,
            product,
            quantity,
            selectedColor,
            customization
          }
        ];
      }
    });
  };

  const removeFromCart = (uniqueId) => {
    setCart((prev) => prev.filter((item) => item.uniqueId !== uniqueId));
  };

  const updateQuantity = (uniqueId, amount) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.uniqueId === uniqueId) {
            const newQty = item.quantity + amount;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartSubtotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // --- FLOATING CART & QUICK VIEW STATE ---
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        wishlist,
        toggleWishlist,
        isWishlisted,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartSubtotal,
        getCartCount,
        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        setQuickViewProduct
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
