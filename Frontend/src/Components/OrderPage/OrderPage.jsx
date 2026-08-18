import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import orderBg from "../../assets/OrderImages/Order.png";

const API_BASE = `${import.meta.env.VITE_BACKEND_URL}/api/shop`;

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    setLoading(true);
    setError(null);

    axios
      .get(`${API_BASE}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data))
      .catch(() =>
        setError("Failed to fetch orders. Please try again later.")
      )
      .finally(() => setLoading(false));
  }, [token]);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const res = await axios.delete(`${API_BASE}/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(res.data.message || "Order cancelled successfully");
      setOrders((prev) => prev.filter((o) => o._id !== orderId));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel order");
    }
  };

  const pageWrapperStyle = {
    backgroundImage: `linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.75)), url(${orderBg})`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    padding: "40px 0 60px",
  };

  const glassCardStyle = {
    background: "rgba(255,255,255,0.88)",
    backdropFilter: "blur(10px)",
  };

  if (!token)
    return (
      <div style={pageWrapperStyle}>
        <Container className="text-center py-5" style={glassCardStyle}>
          <h3>Please login to view your orders</h3>
        </Container>
      </div>
    );

  if (loading)
    return (
      <div style={pageWrapperStyle}>
        <Container className="text-center py-5" style={glassCardStyle}>
          <h3>Loading your orders...</h3>
        </Container>
      </div>
    );

  if (error)
    return (
      <div style={pageWrapperStyle}>
        <Container className="text-center py-5" style={glassCardStyle}>
          <h3 className="text-danger">{error}</h3>
        </Container>
      </div>
    );

  if (!orders.length)
    return (
      <div style={pageWrapperStyle}>
        <Container className="text-center py-5" style={glassCardStyle}>
          <h3>No orders found</h3>
        </Container>
      </div>
    );

  return (
    <div style={pageWrapperStyle}>
      <Container>
        <h2 className="fw-bold text-center mb-4">Your Orders</h2>

        {orders.map((order) => {
          const subtotal = Number(order.total) || 0;
          const tax = Number(order.tax) || 0;

          return (
            <Card
              key={order._id}
              className="mb-5 border-0 shadow-lg rounded-4 overflow-hidden"
              style={glassCardStyle}
            >
              <Card.Header className="d-flex justify-content-between align-items-center bg-transparent border-0 px-4 pt-4">
                <div>
                  <h5 className="fw-bold mb-1">Order #{order.orderNumber}</h5>
                  <small className="text-muted">
                    {new Date(order.date).toLocaleString()}
                  </small>
                </div>

                <div className="d-flex align-items-center">
                  <span className="badge bg-success me-3 px-3 py-2">
                    {order.status}
                  </span>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleCancelOrder(order._id)}
                  >
                    Cancel
                  </Button>
                </div>
              </Card.Header>

              <Card.Body className="p-4">
                <Row>
                  {order.items.map((item) => {
                    const key =
                      item._id || item.productId || item.title;

                    return (
                      <Col md={6} lg={4} className="mb-4" key={key}>
                        <Card className="order-item-card h-100 border-0 rounded-4 overflow-hidden">
                          <div className="order-img-wrapper">
                            <img
                              src={item.img}
                              alt={item.title}
                              className="order-img"
                            />
                          </div>

                          <Card.Body>
                            <Card.Title className="fw-bold text-truncate">
                              {item.title}
                            </Card.Title>
                            <Card.Text className="text-muted small line-clamp">
                              {item.desc}
                            </Card.Text>

                            <div className="d-flex justify-content-between">
                              <span className="fw-semibold">
                                ₹{item.price}
                              </span>
                              <span className="badge bg-primary">
                                Qty {item.quantity}
                              </span>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>

                <hr />

                <div className="d-flex justify-content-end">
                  <div style={{ width: "260px" }}>
                    <div className="d-flex justify-content-between">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Tax</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between fw-bold fs-5 mt-2">
                      <span>Total</span>
                      <span>₹{(subtotal + tax).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </Container>

      {/* STYLES */}
      <style>{`
        .order-item-card {
          transition: all 0.3s ease;
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
        }

        .order-item-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 45px rgba(0,0,0,0.15);
        }

        .order-img-wrapper {
          height: 200px;
          background: #f8f9fa;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px;
        }

        .order-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .order-item-card:hover .order-img {
          transform: scale(1.05);
        }

        .line-clamp {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default OrderPage;
