import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import { sellingProducts } from "../../assets/Asset";

const SellingProduct = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <section className="selling-section py-5 overflow-hidden">
      <Container>
        <h2 className="mb-4" data-aos="fade-right">Most Selling Products</h2>

        <Row className="g-4">
          {sellingProducts.map((p, i) => (
            <Col 
              key={i} 
              xs={12} 
              md={4} 
              data-aos="fade-up" 
              data-aos-delay={i * 150}
            >
              <div className="product-card p-3 rounded-4 bg-light h-100">
                <div className="product-media bg-white rounded-3 d-flex justify-content-center mb-3">
                  <img src={p.img} alt={p.title} className="product-img" />
                </div>

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="fw-bold mb-0">{p.title}</h6>
                  <div className="fw-bold text-success">₹{p.price}</div>
                </div>

                <p className="text-muted small">{p.desc}</p>

                <Link to="/bestproducts">
                  <Button
                    variant="dark"                               
                    className="rounded-pill w-100 view-btn"
                  >
                    View Products
                  </Button>
                </Link>
              </div>
            </Col>
          ))}
        </Row>

        {/* Animated Progress Bar Container */}
        <div className="mt-5" data-aos="zoom-in">
          <div className="d-flex justify-content-between mb-2 small fw-bold">
            <span>Stock Availability</span>
            <span>42% Sold Out</span>
          </div>
          <div className="progress rounded-pill" style={{ height: "8px" }}>
            <div 
              className="progress-bar bg-dark progress-animated" 
              style={{ width: "42%" }} 
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SellingProduct;