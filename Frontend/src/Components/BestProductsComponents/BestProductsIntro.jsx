import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'; 
import AOS from 'aos';
import 'aos/dist/aos.css';

// FIX: Standard default import for lottie-react
import Lottie from 'lottie-react'; 

// Asset Imports
import rowBg from "../../assets/Animations/Row.png";
import bestSaleAnimation from "../../assets/Animations/Best sale.json";

const BestProductsIntro = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 1. Initialize AOS
    AOS.init({
      duration: 1000,
      once: false,
      easing: 'ease-out-quart'
    });

    // 2. Critical Asset Preloading to stop white flash
    const preloadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    };

    preloadImage(rowBg)
      .then(() => {
        // Small delay to allow browser layout calculation
        setTimeout(() => setIsReady(true), 50);
      })
      .catch(() => setIsReady(true)); // Fallback to show content even if image fails
  }, []);

  const iconBoxStyle = (bgColor) => ({
    width: '55px',
    height: '55px',
    backgroundColor: bgColor,
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '26px',
    marginRight: '20px',
    color: 'white',
    flexShrink: 0,
    boxShadow: `0 8px 15px ${bgColor}44`
  });

  return (
    <section 
      className="best-products-intro" 
      style={{
        // 1. Deep fallback color stops white flash before image paints
        backgroundColor: '#0f0f1e', 
        backgroundImage: isReady 
          ? `linear-gradient(rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.88)), url(${rowBg})` 
          : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        // 2. Smooth transition logic for premium feel
        transition: 'opacity 0.6s ease-in-out, visibility 0.6s',
        opacity: isReady ? 1 : 0,
        visibility: isReady ? 'visible' : 'hidden'
      }}
    >
      {/* Background Decorative Shapes */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <Container style={{ position: 'relative', zIndex: '1' }}>
        <Row className="align-items-center g-5 py-5">
          <Col xs={12} lg={7}>
            <div className="best-products-content">
              <div data-aos="fade-down" className="premium-badge">
                <span className="pulse-dot"></span> Premium Collection
              </div>

              <h1 className="mb-4 display-title" data-aos="fade-right" data-aos-delay="200">
                Discover Our <br />
                <span className="text-gradient">Best Products</span>
              </h1>

              <p className="mb-5 lead-text" data-aos="fade-right" data-aos-delay="400">
                A curated selection where high performance meets unbeatable value. 
                Experience a new standard of quality in every handpicked item.
              </p>

              <div className="best-products-features mb-5">
                {[
                  { icon: '🛡️', color: '#0a7a58', title: 'Verified Quality', desc: 'Thoroughly tested standards' },
                  { icon: '🏷️', color: '#ff6b6b', title: 'Best Prices', desc: 'Guaranteed market value' },
                  { icon: '🚚', color: '#0a7a58', title: 'Fast Delivery', desc: 'Quick and reliable shipping' }
                ].map((feature, index) => (
                  <div 
                    key={`feat-intro-${index}`} 
                    className="feature-item-glass"
                    data-aos="fade-up"
                    data-aos-delay={500 + (index * 150)}
                  >
                    <div style={iconBoxStyle(feature.color)}>{feature.icon}</div>
                    <div>
                      <h5 className="mb-1 fw-bold text-dark">{feature.title}</h5>
                      <p className="mb-0 text-muted small-text">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="d-flex gap-4" data-aos="zoom-in" data-aos-delay="1000">
                <Button className="btn-modern-green shadow-lg">Browse Store</Button>
                <Button className="btn-modern-outline">View Categories</Button>
              </div>
            </div>
          </Col>

          <Col xs={12} lg={5}>
            <div className="showcase-visual-wrapper" data-aos="zoom-in-left">
              <div className="lottie-sale-container">
                {/* SAFE RENDER: Check if Lottie is a function to avoid "got object" error */}
                {bestSaleAnimation && typeof Lottie === 'function' && (
                    <Lottie 
                        animationData={bestSaleAnimation} 
                        loop={true} 
                        style={{ width: '180px', height: '180px' }}
                    />
                )}
              </div>

              <div className="glass-card-main">
                <div className="trophy-container">
                  <span className="trophy-emoji">🏆</span>
                </div>
                <h3 className="fw-bold text-dark mt-4">Top Rated 2025</h3>
                <p className="text-muted mb-4 text-center">Handpicked products with verified 5-star quality.</p>
                <div className="stars-container">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <style>{`
        .display-title { font-size: clamp(48px, 6vw, 68px); font-weight: 900; line-height: 1.1; letter-spacing: -2px; }
        .text-gradient { background: linear-gradient(90deg, #0a7a58, #4baa3eff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .lead-text { font-size: 20px; color: #444; line-height: 1.8; max-width: 90%; }
        
        .premium-badge { display: inline-flex; align-items: center; background: rgba(10, 122, 88, 0.1); color: #0a7a58; padding: 10px 25px; border-radius: 50px; font-weight: 800; font-size: 14px; margin-bottom: 25px; border: 1px solid rgba(10, 122, 88, 0.2); }
        .pulse-dot { width: 8px; height: 8px; background: #ff6b6b; border-radius: 50%; margin-right: 12px; animation: dotPulse 2s infinite; }
        
        .feature-item-glass { display: flex; align-items: center; margin-bottom: 25px; padding: 15px; border-radius: 20px; background: rgba(255, 255, 255, 0.5); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.5); transition: 0.3s; }
        .feature-item-glass:hover { transform: translateX(10px); background: rgba(255, 255, 255, 0.8); }

        .glass-card-main { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.8); border-radius: 40px; padding: 60px 40px; text-align: center; box-shadow: 0 30px 60px rgba(0,0,0,0.1); position: relative; }
        .trophy-emoji { font-size: 100px; display: block; animation: floatAnim 4s infinite ease-in-out; }
        
        .lottie-sale-container { position: absolute; top: -60px; right: -20px; z-index: 10; pointer-events: none; }
        
        .blob { position: absolute; border-radius: 50%; filter: blur(80px); z-index: 0; opacity: 0.3; }
        .blob-1 { width: 400px; height: 400px; background: #0a7a58; top: -100px; right: -50px; }
        .blob-2 { width: 300px; height: 300px; background: #ff6b6b; bottom: -50px; left: -50px; }
        
        .btn-modern-green { background: #0a7a58 !important; color: white !important; border: none !important; padding: 18px 45px !important; border-radius: 16px !important; font-weight: 800 !important; }
        .btn-modern-outline { background: transparent !important; color: #1a1a1a !important; border: 2px solid #ddd !important; padding: 18px 45px !important; border-radius: 16px !important; font-weight: 800 !important; }
        .stars-container { color: #FFD700; font-size: 24px; letter-spacing: 5px; }

        @keyframes dotPulse { 0% { box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(255, 107, 107, 0); } 100% { box-shadow: 0 0 0 0 rgba(255, 107, 107, 0); } }
        @keyframes floatAnim { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
      `}</style>
    </section>
  );
};

export default BestProductsIntro;