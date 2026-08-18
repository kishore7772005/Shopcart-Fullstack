import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AOS from 'aos'
import 'aos/dist/aos.css'

import { bestSelling } from '../../assets/Asset'

const BestSellingImages = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <section className="best-selling-section py-5 overflow-hidden">
      <Container>
        <h2 className="mb-4" data-aos="fade-right">Best Selling Store</h2>
        <Row className="g-4">
          {bestSelling.map((b, i) => (
            <Col key={i} xs={12} md={6} lg={3}>
              <div 
                className="selling-card h-100" 
                data-aos="fade-up" 
                data-aos-delay={i * 100}
              >
                <div className="selling-media position-relative rounded-4 overflow-hidden">
                  <img src={b.img} alt={b.title} className="selling-img" />
                  <span className="selling-badge bounce-in">{b.badge}</span>
                </div>
                <div className="selling-body mt-3">
                  <h6 className="mb-1 fw-bold">{b.title}</h6>
                  <p className="text-muted small mb-2">{b.subtitle}</p>
                  <p className="text-pink small fw-semibold">{b.note}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default BestSellingImages