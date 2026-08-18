import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AOS from 'aos'
import 'aos/dist/aos.css'

import { trendingProducts } from '../../assets/Asset'

const Trending = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <section className="trending-section py-5 overflow-hidden">
      <Container>
        <h2 className="mb-4" data-aos="fade-right">Trending Products For You!</h2>
        <Row className="g-4">
          {trendingProducts.map((t, i) => (
            <Col 
              key={i} 
              xs={12} 
              md={6}
              data-aos="fade-up"
              data-aos-delay={i * 200} // Staggered entry for the two large cards
            >
              <div className="trend-card rounded-4 overflow-hidden shadow-sm">
                <div className="trend-media">
                  <img src={t.img} alt={t.title} className="trend-img" />
                </div>
                <div className="trend-body p-4 bg-white">
                  <h4 className="mb-1">{t.title}</h4>
                  <p className="text-muted mb-3">{t.subtitle}</p>
                  <button className="btn btn-dark rounded-pill px-4 py-2 trend-btn">
                    {t.btnText}
                  </button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Trending