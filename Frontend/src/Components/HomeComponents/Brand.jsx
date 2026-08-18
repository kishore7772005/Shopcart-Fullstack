import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AOS from 'aos'
import 'aos/dist/aos.css'

import b1 from '../../assets/BrandImages/B1.png'
import b2 from '../../assets/BrandImages/B2.png'
import b3 from '../../assets/BrandImages/B3.png'
import b4 from '../../assets/BrandImages/B4.png'
import b5 from '../../assets/BrandImages/B5.png'
import b6 from '../../assets/BrandImages/B6.png'
import b7 from '../../assets/BrandImages/B7.png'
import b8 from '../../assets/BrandImages/B8.png'

const brands = [
  { name: 'Staples', img: b1 },
  { name: 'Sprouts', img: b2 },
  { name: 'Grocery outlet', img: b3 },
  { name: 'Mollie stones', img: b4 },
  { name: 'Sports Basement', img: b5 },
  { name: 'Container Store', img: b6 },
  { name: 'Target', img: b7 },
  { name: 'Bevmo!', img: b8 }
]

const Brand = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  return (
    <section className="brands-section py-5 overflow-hidden">
      <Container>
        <h2 className="mb-4" data-aos="fade-right">Choose By Brand</h2>
        <Row className="g-4">
          {brands.map((b, i) => (
            <Col key={i} xs={12} sm={6} md={4} lg={3}>
              <div 
                className="brand-card d-flex align-items-center gap-3 p-3 rounded-3"
                data-aos="fade-up"
                data-aos-delay={i * 50} // Staggered entry
              >
                <div className="brand-logo rounded-circle bg-white d-flex align-items-center justify-content-center shadow-sm">
                  <img src={b.img} alt={b.name} className="brand-img" />
                </div>
                <div className="brand-info">
                  <h6 className="mb-1 fw-bold">{b.name}</h6>
                  <div className="delivery-text">Delivery within 24 hours</div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Brand