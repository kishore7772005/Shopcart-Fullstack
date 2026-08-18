import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AOS from 'aos'
import 'aos/dist/aos.css'

import { services } from '../../assets/Asset'

const Service = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <section className="services-section py-5 overflow-hidden">
      <Container>
        <h2 className="mb-5" data-aos="fade-right">Services To Help You Shop</h2>
        <Row className="g-4">
          {services.map((s, i) => (
            <Col 
              key={i} 
              xs={12} 
              md={4}
              data-aos="fade-up"
              data-aos-delay={i * 200} // Cards pop up one by one
            >
              <div className="service-card rounded-4 p-4 h-100 shadow-sm">
                <h5 className="mb-2 fw-bold">{s.title}</h5>
                <p className="text-muted small mb-4">{s.subtitle}</p>
                <div className="service-img-wrapper rounded-3 overflow-hidden">
                  <img src={s.img} alt={s.title} className="service-img" />
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Service