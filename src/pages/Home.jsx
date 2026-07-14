import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, Award, Heart, Truck, Settings, Sparkles, ChevronRight, MessageSquare, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { CATEGORIES, PRODUCTS } from '../data/products';

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=1200&auto=format&fit=crop",
    title: "Handmade Gifts Made with Love",
    subtitle: "Customize Every Gift for Someone Special"
  },
  {
    image: "https://images.unsplash.com/photo-1606744824163-985d376605aa?q=80&w=1200&auto=format&fit=crop",
    title: "Elegant Resin Masterpieces",
    subtitle: "Curing your memories in crystal clear luxury resin"
  },
  {
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=1200&auto=format&fit=crop",
    title: "Plush Everlasting Bouquets",
    subtitle: "Forever blooms hand-crafted to never wilt or fade"
  }
];

const TESTIMONIALS = [
  {
    name: "Meera Nair",
    location: "Mumbai",
    rating: 5,
    text: "The Couple Embroidery Hoop was absolutely gorgeous! The details of the thread portraits were spot on, and my husband was so touched by the custom anniversary date. The gold trim made it look extremely premium.",
    avatar: "👩‍💼"
  },
  {
    name: "Kabir Sengupta",
    location: "Kolkata",
    rating: 5,
    text: "Ordered a Spotify LED Plaque for my girlfriend's birthday. The print quality is crisp, the wooden base has a beautiful warm glow, and the scannable Spotify code works perfectly. High-end product indeed!",
    avatar: "👨‍💻"
  },
  {
    name: "Dr. Anisha Patel",
    location: "Bangalore",
    rating: 5,
    text: "The geode resin nameplate looks spectacular at our villa entrance. It has a beautiful shimmer under the light and is fully waterproof. Truly artisanal craftsmanship. Thank you, sewcreative!",
    avatar: "👩‍⚕️"
  }
];

const INSTAGRAM_POSTS = [
  "https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=400&auto=format&fit=crop"
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  
  const words = ["Embroidery Hoops", "Resin Artworks", "Everlasting Bouquets", "Luxury Gift Boxes"];

  // Slider effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Typing effect
  useEffect(() => {
    const currentWord = words[wordIndex];
    let typingTimer;

    if (typingIndex < currentWord.length) {
      typingTimer = setTimeout(() => {
        setTypedText(prev => prev + currentWord[typingIndex]);
        setTypingIndex(prev => prev + 1);
      }, 100);
    } else {
      // Hold word, then clear and cycle
      typingTimer = setTimeout(() => {
        setTypedText('');
        setTypingIndex(0);
        setWordIndex((prev) => (prev + 1) % words.length);
      }, 2500);
    }

    return () => clearTimeout(typingTimer);
  }, [typingIndex, wordIndex]);

  const bestSellers = PRODUCTS.slice(0, 4);

  return (
    <div className="w-100">
      
      {/* 1. Hero Section Slider */}
      <section className="position-relative w-100 overflow-hidden d-flex align-items-center" style={{ height: '80vh', minHeight: '550px' }}>
        
        {/* Slides */}
        {HERO_SLIDES.map((slide, idx) => (
          <div 
            key={idx}
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(15, 9, 11, 0.7) 30%, rgba(15, 9, 11, 0.3) 100%), url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: idx === currentSlide ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out',
              zIndex: idx === currentSlide ? 1 : 0
            }}
          />
        ))}

        {/* Hero content overlay */}
        <div className="container position-relative px-4" style={{ zIndex: 10 }}>
          <div className="hero-glow" style={{ top: '-100px', left: '-50px' }}></div>
          <div className="row">
            <div className="col-lg-8 text-white animate-fade-up">
              <span className="badge-gold mb-3 d-inline-block" style={{ background: 'var(--accent-gold)' }}>Exclusive Gift Atelier</span>
              
              <h2 className="display-4 font-serif mb-2 fw-bold text-white">
                {HERO_SLIDES[currentSlide].title}
              </h2>
              
              <h3 className="fs-3 mb-4 text-white font-serif" style={{ fontStyle: 'italic', fontWeight: '400' }}>
                We Craft: <span className="text-gradient-gold" style={{ borderRight: '2px solid var(--accent-gold)', paddingRight: '4px' }}>{typedText}</span>
              </h3>
              
              <p className="lead fs-5 mb-5 opacity-90 text-light" style={{ maxWidth: '600px', lineHeight: '1.6' }}>
                {HERO_SLIDES[currentSlide].subtitle}
              </p>

              <div className="d-flex flex-wrap gap-3">
                <Link to="/category/all" className="btn btn-luxury-solid px-4 py-3" style={{ background: 'var(--accent-gold)', borderColor: 'var(--accent-gold)' }}>
                  Shop Now
                </Link>
                <a href="#featured-categories" className="btn btn-luxury px-4 py-3 text-white border-white">
                  Explore Collection
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 d-flex gap-2" style={{ zIndex: 10 }}>
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className="btn p-0 rounded-circle"
              style={{
                width: '10px',
                height: '10px',
                background: idx === currentSlide ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.4)',
                border: 'none',
                transition: 'background 0.3s ease'
              }}
            />
          ))}
        </div>
      </section>

      {/* 2. Featured Categories */}
      <section id="featured-categories" className="py-5 my-3 container px-4">
        <div className="text-center mb-5">
          <span className="text-muted text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.25em', fontWeight: '600' }}>Collections</span>
          <h2 className="font-serif mt-2 text-primary display-5">Explore Our Specialties</h2>
          <div className="mx-auto mt-2" style={{ width: '60px', height: '2px', background: 'var(--accent-gold)' }} />
        </div>

        <div className="row g-4">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="col-md-6 col-lg-4">
              <Link to={`/category/${cat.id}`} className="text-decoration-none">
                <div 
                  className="glass-card category-card-premium position-relative overflow-hidden" 
                  style={{ 
                    height: '350px', 
                    borderRadius: '24px', 
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--card-shadow)'
                  }}
                >
                  {/* Category Image */}
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-100 h-100 object-fit-cover"
                    style={{ transition: 'transform 0.8s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  
                  {/* Text Overlay */}
                  <div 
                    className="position-absolute bottom-0 start-0 w-100 p-4 d-flex flex-column justify-content-end"
                    style={{ 
                      height: '70%', 
                      background: 'linear-gradient(to top, rgba(15, 9, 11, 0.8) 0%, rgba(15, 9, 11, 0.4) 60%, rgba(0,0,0,0) 100%)'
                    }}
                  >
                    <h4 className="font-serif text-white mb-2">{cat.name}</h4>
                    <p className="text-light opacity-75 mb-3" style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>{cat.description}</p>
                    <span className="text-white font-dm d-flex align-items-center gap-1" style={{ fontSize: '0.85rem', fontWeight: '600' }}>
                      Shop Category <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Best Selling Products */}
      <section className="py-5 bg-secondary-subtle" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container px-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 text-center text-md-start">
            <div>
              <span className="text-muted text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.25em', fontWeight: '600' }}>Handpicked Favorites</span>
              <h2 className="font-serif mt-2 text-primary display-5 m-0">Best Selling Products</h2>
            </div>
            <Link to="/category/all" className="btn-luxury mt-3 mt-md-0 d-flex align-items-center gap-2" style={{ fontSize: '0.8rem' }}>
              View All Products <ArrowRight size={14} />
            </Link>
          </div>

          <div className="row g-4">
            {bestSellers.map((prod) => (
              <div key={prod.id} className="col-sm-6 col-lg-3">
                <ProductCard product={prod} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us Section */}
      <section className="py-5 container px-4 my-4">
        <div className="row align-items-center g-5">
          <div className="col-lg-5">
            <span className="text-muted text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', fontWeight: '600' }}>Atelier Quality</span>
            <h2 className="font-serif mt-2 text-primary display-5 mb-4">Why Choose The sewcreative?</h2>
            <p className="text-secondary mb-4" style={{ fontSize: '0.9rem', lineHeight: '1.7' }}>
              We understand that a gift is more than just an item; it's a physical representation of your feelings. That's why we customize every single detail, select premium raw materials, and curate elegant boxes.
            </p>
            <div className="row g-4">
              <div className="col-6">
                <h3 className="display-6 font-serif text-gold fw-bold m-0" style={{ color: 'var(--accent-gold)' }}>5,000+</h3>
                <p className="text-muted font-dm" style={{ fontSize: '0.8rem' }}>Gifts Handcrafted</p>
              </div>
              <div className="col-6">
                <h3 className="display-6 font-serif text-gold fw-bold m-0" style={{ color: 'var(--accent-gold)' }}>4.9 ★</h3>
                <p className="text-muted font-dm" style={{ fontSize: '0.8rem' }}>Average Rating</p>
              </div>
            </div>
          </div>
          
          <div className="col-lg-7">
            <div className="row g-4">
              <div className="col-sm-6">
                <div className="glass-card p-4 h-100" style={{ border: '1px solid var(--border-color)' }}>
                  <div className="d-flex align-items-center justify-content-center rounded-circle mb-3" style={{ width: '48px', height: '48px', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>
                    <Settings size={22} />
                  </div>
                  <h5 className="font-serif mb-2">100% Customized</h5>
                  <p className="text-secondary m-0" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>Personalized with names, custom dates, quotes, and reference sketches.</p>
                </div>
              </div>
              
              <div className="col-sm-6">
                <div className="glass-card p-4 h-100" style={{ border: '1px solid var(--border-color)' }}>
                  <div className="d-flex align-items-center justify-content-center rounded-circle mb-3" style={{ width: '48px', height: '48px', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>
                    <Award size={22} />
                  </div>
                  <h5 className="font-serif mb-2">Premium Quality</h5>
                  <p className="text-secondary m-0" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>Using European linens, French DMC cotton threads, and crystal-clear UV resistant epoxy.</p>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="glass-card p-4 h-100" style={{ border: '1px solid var(--border-color)' }}>
                  <div className="d-flex align-items-center justify-content-center rounded-circle mb-3" style={{ width: '48px', height: '48px', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>
                    <Heart size={22} />
                  </div>
                  <h5 className="font-serif mb-2">Made With Love</h5>
                  <p className="text-secondary m-0" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>Each gift is individually hand-drawn and crafted by seasoned home artisans.</p>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="glass-card p-4 h-100" style={{ border: '1px solid var(--border-color)' }}>
                  <div className="d-flex align-items-center justify-content-center rounded-circle mb-3" style={{ width: '48px', height: '48px', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>
                    <Truck size={22} />
                  </div>
                  <h5 className="font-serif mb-2">Fast Safe Delivery</h5>
                  <p className="text-secondary m-0" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>Packaged securely in luxury bubble-lined hardcrates with fully trackable shipping.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Customer Reviews (Testimonials) */}
      <section className="py-5" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container px-4">
          <div className="text-center mb-5">
            <span className="text-muted text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.25em', fontWeight: '600' }}>Happy Hearts</span>
            <h2 className="font-serif mt-2 text-primary display-5">What Customers Say</h2>
            <div className="mx-auto mt-2" style={{ width: '60px', height: '2px', background: 'var(--accent-gold)' }} />
          </div>

          <div className="row g-4">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="col-md-4">
                <div 
                  className="glass-card p-4 h-100 d-flex flex-column justify-content-between"
                  style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
                >
                  <div>
                    {/* Stars */}
                    <div className="d-flex gap-1 mb-3">
                      {[...Array(t.rating)].map((_, i) => (
                        <span key={i} className="text-warning" style={{ fontSize: '1rem' }}>★</span>
                      ))}
                    </div>
                    <p className="text-secondary mb-4" style={{ fontSize: '0.85rem', fontStyle: 'italic', lineHeight: '1.6' }}>
                      "{t.text}"
                    </p>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <div className="fs-3">{t.avatar}</div>
                    <div>
                      <h6 className="font-serif text-primary m-0" style={{ fontSize: '0.9rem' }}>{t.name}</h6>
                      <span className="text-muted" style={{ fontSize: '0.75rem' }}>{t.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Instagram Gallery Grid (Pinterest Style) */}
      <section className="py-5 container px-4 mb-4">
        <div className="text-center mb-5">
          <span className="text-muted text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.25em', fontWeight: '600' }}>Instagram Feed</span>
          <h2 className="font-serif mt-2 text-primary display-5">Inspire Your Gifting</h2>
          <p className="text-secondary m-0" style={{ fontSize: '0.85rem' }}>Follow <a href="https://instagram.com/the_sewcreative" target="_blank" rel="noreferrer" className="text-gradient-gold fw-bold">@the_sewcreative</a> on Instagram for workshop moments.</p>
        </div>

        {/* Staggered Grid Layout */}
        <div className="row g-3">
          {INSTAGRAM_POSTS.map((post, idx) => (
            <div key={idx} className="col-6 col-md-4 col-lg-2">
              <div 
                className="overflow-hidden rounded-4 position-relative border"
                style={{ aspectRatio: '1/1', borderColor: 'var(--border-color) !important' }}
              >
                <img 
                  src={post} 
                  alt={`Instagram Post ${idx + 1}`} 
                  className="w-100 h-100 object-fit-cover hover-zoom" 
                  style={{ transition: 'transform 0.5s ease', cursor: 'pointer' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
