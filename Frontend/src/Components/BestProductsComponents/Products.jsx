import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { CartContext } from "../../ContextProvider";

const Products = () => {
  const { addToCart, updateQuantity, cart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 🔹 Quantity helper
  const getQty = (productId) =>
    cart.find((i) => i.productId === productId)?.quantity || 0;

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="fw-bold text-center mb-5">All Products</h2>

      <Row className="g-4">
        {products.map((p) => {
          const qty = getQty(p._id);

          return (
            <Col key={p._id} xl={3} lg={4} md={6} sm={12}>
              <Card className="h-100 border-0 shadow rounded-4">
                <Card.Img
                  src={p.img}
                  style={{
                    height: "220px",
                    objectFit: "cover",
                    borderRadius: "16px 16px 0 0",
                  }}
                />

                <Card.Body className="d-flex flex-column">
                  <h6 className="fw-bold">{p.title}</h6>
                  <p className="text-muted small flex-grow-1">
                    {p.desc}
                  </p>

                  <h5 className="text-primary mb-3">
                    ₹{Number(p.price).toFixed(2)}
                  </h5>

                  {qty === 0 ? (
                    <Button
                      variant="dark"
                      className="w-100"
                      onClick={() =>
                        addToCart({
                          productId: p._id,
                          title: p.title,
                          price: p.price,
                          img: p.img,
                          desc: p.desc,
                        })
                      }
                    >
                      Add to Cart
                    </Button>
                  ) : (
                    <div className="d-flex justify-content-between align-items-center border rounded p-2">
                      <Button
                        size="sm"
                        variant="light"
                        onClick={() =>
                          updateQuantity(p._id, qty - 1)
                        }
                      >
                        −
                      </Button>

                      <strong>{qty}</strong>

                      <Button
                        size="sm"
                        variant="light"
                        onClick={() =>
                          updateQuantity(p._id, qty + 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Products;
