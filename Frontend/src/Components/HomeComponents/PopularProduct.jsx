import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

// Import AOS
import AOS from "aos";
import "aos/dist/aos.css";

import { popularProducts } from "../../assets/Asset";

const PopularProduct = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation speed
      once: false,    // Whether animation should happen every time you scroll
    });
  }, []);

  return (
    <section className="popular-section py-5 overflow-hidden">
      <Container>
        <h2 className="mb-4" data-aos="fade-right">
          Weekly Popular Products
        </h2>

        <Row className="g-4">
          {popularProducts.map((p, i) => (
            <Col 
              key={i} 
              xs={12} 
              md={6} 
              lg={4}
              data-aos="fade-up" // Elements slide up
              data-aos-delay={i * 100} // Staggered entry effect
            >
              <div className="product-card p-4 rounded-3 bg-light h-100">
                <div className="product-media bg-white rounded-3 d-flex justify-content-center mb-3">
                  <img src={p.img} alt={p.title} className="product-img" />
                </div>

                <h5>{p.title}</h5>
                <p className="text-muted small">{p.desc}</p>

                <div className="fw-bold mb-3 price">₹{p.price}</div>

                <Link to="/bestproducts">
                  <Button variant="dark" className="rounded-pill w-100">
                    View Products
                  </Button>
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default PopularProduct;