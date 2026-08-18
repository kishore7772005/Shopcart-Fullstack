import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DealsIntro = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <div className="deals-wrapper py-5">
      <Container>
        <div className="main-deals-card shadow-lg border-0 rounded-5 overflow-hidden" data-aos="zoom-in">
          <Row className="g-0">
            
            {/* Left Panel: Green Gradient */}
            <Col lg={7} className="info-panel-green p-4 p-md-5 text-white">
              <div className="content-container" data-aos="fade-right" data-aos-delay="200">
                <div className="promo-badge-green mb-4">LIMITED TIME OFFERS</div>

                <h1 className="display-4 fw-bold mb-4">
                  Amazing Deals <br />
                  <span className="text-white-glow">Just For You.</span>
                </h1>

                <p className="description mb-5 text-light opacity-75">
                  Explore our premium selection of hand-picked products. High performance 
                  meets unbeatable prices for a limited time only.
                </p>

                {/* Staggered Timer Boxes */}
                <div className="timer-container mb-5">
                  <p className="small fw-bold text-uppercase mb-3 text-white-50">Deals expire in:</p>
                  <div className="d-flex gap-3">
                    {['20', '45', '12'].map((time, i) => (
                      <div 
                        key={i} 
                        className="timer-box-green" 
                        data-aos="fade-up" 
                        data-aos-delay={400 + (i * 100)}
                      >
                        <span className="timer-num">{time}</span>
                        <span className="timer-label">{['Days', 'Hours', 'Mins'][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="d-flex flex-wrap gap-3" data-aos="fade-up" data-aos-delay="800">
                  <Button className="btn-white-green px-5 py-3 fw-bold">Shop the Deals</Button>
                  <Button variant="outline-light" className="px-5 py-3 fw-bold rounded-3">Explore All</Button>
                </div>
              </div>
            </Col>

            {/* Right Panel: Gift Box Animation */}
            <Col lg={5} className="visual-panel-light p-5 d-flex align-items-center justify-content-center">
              <div className="text-center" data-aos="fade-left" data-aos-delay="400">
                <div className="discount-tag-green">UP TO 50% OFF</div>
                
                {/* The Animated Gift Box */}
                <div className="gift-box-container">
                  <div className="gift-box-emoji">🎁</div>
                  <div className="gift-shadow"></div>
                </div>

                <div className="mt-4 glass-card-green p-4">
                  <h4 className="fw-bold text-success mb-1">Mystery Box Reveal</h4>
                  <p className="text-muted small mb-0">Exclusive items added weekly</p>
                </div>
              </div>
            </Col>
          </Row>

          <div className="stats-bar py-4 border-top" data-aos="fade-up" data-aos-delay="900">
            <Row className="text-center g-0">
              {[
                { num: '10K+', label: 'Happy Users' },
                { num: '24/7', label: 'Support' },
                { num: '100%', label: 'Guaranteed' }
              ].map((stat, i) => (
                <Col key={i} xs={4} className={i !== 2 ? 'border-end' : ''}>
                  <div className="h3 fw-bold mb-0 text-success">{stat.num}</div>
                  <div className="tiny-label-green">{stat.label}</div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DealsIntro;