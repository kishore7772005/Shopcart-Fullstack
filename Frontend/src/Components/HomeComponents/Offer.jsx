import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AOS from 'aos'
import 'aos/dist/aos.css'

import off1 from '../../assets/OfferImages/Off1.png'
import off2 from '../../assets/OfferImages/Off2.png'
import off3 from '../../assets/OfferImages/Off3.png'
import off4 from '../../assets/OfferImages/Off4.png'

const offers = [
  { title: 'Save', amount: '$100', img: off1, color: '#f4e6de', accent: '#d8b04a' },
  { title: 'Save', amount: '$29', img: off2, color: '#f7e6e8', accent: '#b91c1c' },
  { title: 'Save', amount: '$67', img: off3, color: '#f5e9e0', accent: '#8b5a3c' },
  { title: 'Save', amount: '$59', img: off4, color: '#dff8f0', accent: '#0b6d52' }
]

const Offer = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <section className="offers-section py-5 overflow-hidden">
      <Container>
        <h2 className="mb-4" data-aos="fade-down">Get Up To 70% Off</h2>
        <Row className="g-4">
          {offers.map((o, idx) => (
            <Col key={idx} xs={12} md={6} lg={3}>
              <div 
                className="offer-card-wrapper" 
                data-aos="zoom-in-up" 
                data-aos-delay={idx * 150}
              >
                <div className="offer-card">
                  <div className="offer-top p-4" style={{ background: o.color }}>
                    <div className="offer-title mb-1">{o.title}</div>
                    <div className="offer-amount" style={{ color: o.accent }}>
                      {o.amount}
                    </div>
                    <p className="offer-sub mt-2">Explore Our Furniture & Home Furnishing Range</p>
                  </div>
                  <div className="offer-media-container">
                    <img src={o.img} alt={`offer-${idx}`} className="offer-img" />
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Offer