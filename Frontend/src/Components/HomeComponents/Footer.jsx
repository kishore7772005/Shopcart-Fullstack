import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AOS from 'aos'
import 'aos/dist/aos.css'

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <footer className="footer-section bg-white">
      <Container>
        <Row className="py-5">
          {/* Brand Section */}
          <Col xs={12} lg={3} className="mb-5 mb-lg-0" data-aos="fade-up">
            <div className="footer-logo-section">
              <h4 className="footer-brand mb-3">
                <span className="logo-icon">🛒</span> Shopcart
              </h4>
              <p className="footer-desc text-muted mb-4">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
              </p>
              <div className="footer-payments">
                <h6 className="section-subtitle mb-3">Accepted Payments</h6>
                <div className="payment-grid">
                  <span className="payment-tag">Stripe</span>
                  <span className="payment-tag">Visa</span>
                  <span className="payment-tag">MasterCard</span>
                  <span className="payment-tag">PayPal</span>
                  <span className="payment-tag">ApplePay</span>
                  <span className="payment-tag">G-Pay</span>
                </div>
              </div>
            </div>
          </Col>

          {/* Links Columns */}
          {[
            { 
              title: "Department", 
              links: ["Fashion", "Education", "Frozen Food", "Beverages", "Organic", "Office", "Beauty"] 
            },
            { 
              title: "About Us", 
              links: ["About Shopcart", "Careers", "News & Blog", "Help", "Press Center", "Brands"] 
            },
            { 
              title: "Services", 
              links: ["Gift Card", "Mobile App", "Shipping", "Order Pickup", "Account Signup"] 
            },
            { 
              title: "Help", 
              links: ["Help Center", "Returns", "Track Orders", "Contact Us", "Feedback"] 
            }
          ].map((col, idx) => (
            <Col key={idx} xs={6} md={3} lg={2} className="mb-4" data-aos="fade-up" data-aos-delay={idx * 100}>
              <h6 className="footer-col-title fw-bold mb-4">{col.title}</h6>
              <ul className="footer-links list-unstyled">
                {col.links.map(link => (
                  <li key={link}><a href={`#${link}`}>{link}</a></li>
                ))}
              </ul>
            </Col>
          ))}
        </Row>

        <hr className="footer-divider" />

        {/* Bottom Bar */}
        <Row className="py-4 align-items-center" data-aos="fade-in">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <div className="footer-utility-links">
              <span>👤 Become Seller</span>
              <span>🎁 Gift Cards</span>
              <span>❓ Help Center</span>
            </div>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <div className="footer-legal">
              <a href="#terms">Terms</a>
              <a href="#privacy">Privacy</a>
              <p className="copyright mt-2">© 2025 Shopcart. All Rights Reserved.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer