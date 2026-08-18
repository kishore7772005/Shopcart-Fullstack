import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

// Import AOS
import AOS from "aos";
import "aos/dist/aos.css";

import { bestProducts } from "../../assets/Asset";

const BestProducts = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <Container className="py-5 best-section overflow-hidden">
      <h2 className="mb-4 fw-bold text-start" data-aos="fade-right">
        Best Products
      </h2>

      <Row className="g-4">
        {bestProducts.map((p, idx) => {
          const price = Number(p.price) || 0;

          return (
            <Col md={3} sm={6} xs={12} key={p.id}>
              <div 
                data-aos="fade-up" 
                data-aos-delay={idx * 100} 
                className="h-100"
              >
                <Card className="h-100 border-0 shadow-sm rounded-4 product-card">
                  <div className="product-media">
                    <Card.Img
                      variant="top"
                      src={p.img}
                      alt={p.title}
                      className="product-img"
                      style={{
                        height: "200px",
                        objectFit: "contain", // Changed to contain to match your CSS preference
                        padding: "15px"
                      }}
                    />
                  </div>

                  <Card.Body className="d-flex flex-column">
                    <h6 className="fw-bold">{p.title}</h6>
                    <p className="text-muted small flex-grow-1">
                      {p.desc}
                    </p>

                    <strong className="mb-3 price-text">
                      ₹{price.toFixed(2)}
                    </strong>

                    <Link to="/bestproducts">
                      <Button variant="dark" className="w-100 rounded-pill">
                        View Products
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default BestProducts;