import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { products } from "../../assets/Asset";
import { Container, Row, Col, Button } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";

const Deal = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <section className="deals-section py-5 overflow-hidden">
      <Container>
        <h2 className="mb-4" data-aos="fade-right">Today's Best Deals For You!</h2>

        <Row className="g-4">
          {products.map((p, idx) => (
            <Col 
              key={p.id} 
              xs={12} 
              md={6} 
              lg={4}
              data-aos="fade-up"
              data-aos-delay={idx * 100} // Cards appear one after another
            >
              <div className="product-card p-4 rounded-4 shadow-sm h-100">
                <div className="product-media-wrapper mb-3">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="product-img"
                  />
                </div>

                <h5 className="fw-bold">{p.title}</h5>
                <p className="text-muted small mb-2">{p.desc}</p>

                <div className="d-flex justify-content-between align-items-center mt-auto">
                   <strong className="price-tag">₹{p.price.toFixed(2)}</strong>
                </div>

                <div className="mt-3">
                  <Link to="/bestproducts">
                    <Button
                      variant="dark"
                      className="rounded-pill w-100 view-btn"
                    >
                      View Products
                    </Button>
                  </Link>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Deal;