import React, { useEffect } from 'react';
import heroImg from '../../assets/HomeImages/carosel.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Carosel = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: 'ease-out-quart',
      once: false,
    });
  }, []);

  return (
    <section className="hero-section-green">
      {/* Decorative background element for depth */}
      <div className="bg-shape-overlay"></div>
      
      <div className="container py-lg-5">
        <div className="row align-items-center gx-lg-5 hero-wrapper">
          
          {/* Left Content Area */}
          <div className="col-lg-6 hero-text-box">
            <div data-aos="fade-up" data-aos-delay="200">
              <div className="hero-badge">Spring / Summer 2025</div>
              <h1 className="hero-display">
                Shopping And <br/>
                <span className="text-white-glow">Department Store.</span>
              </h1>
            </div>
            
            <div data-aos="fade-up" data-aos-delay="400">
              <p className="hero-description">
                Elevate your everyday with a curated collection of premium essentials. 
                Experience shopping redefined in our modern department space.
              </p>
            </div>

            <div className="hero-action-group" data-aos="fade-up" data-aos-delay="600">
              <button className="btn-glass-primary">Shop Collection</button>
              <button className="btn-link-white">Learn More →</button>
            </div>
          </div>

          {/* Right Image Area */}
          <div className="col-lg-6 mt-5 mt-lg-0" data-aos="zoom-out-up" data-aos-delay="400">
            <div className="hero-visual-wrapper">
              <div className="image-glass-backdrop"></div>
              <img 
                src={heroImg} 
                alt="Latest Collection" 
                className="hero-main-image img-fluid floating-anim" 
              />
            </div>
          </div>
          
        </div>
      </div>
      
      <div className="scroll-indicator-v2" data-aos="fade-up" data-aos-delay="1000">
        <span className="scroll-text">Explore</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
};

export default Carosel;