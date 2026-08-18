import React, { useContext, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { CartContext } from "../ContextProvider";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = `${import.meta.env.VITE_BACKEND_URL}/api/shop`;

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart,
  } = useContext(CartContext);

  const { token, user, isAdmin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const totalPrice = getTotalPrice();

  // Redirect admin away from cart
  useEffect(() => {
    if (isAdmin) {
      navigate("/admin");
    }
  }, [isAdmin, navigate]);

  // Redirect to login if no token on checkout
  const handlePlaceOrder = async () => {
    if (!token) {
      alert("Please login to place order");
      navigate("/login");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderData = {
        items: cart.map((item) => ({
          productId: item.productId || item._id,
          title: item.title,
          price: Number(item.price),
          quantity: Number(item.quantity),
          img: item.img,
          desc: item.desc,
        })),
        tax: Number((totalPrice * 0.1).toFixed(2)),
        total: Number((totalPrice * 1.1).toFixed(2)),
      };

      const res = await axios.post(`${API_BASE}/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(`Order placed successfully!\nOrder No: ${res.data.order.orderNumber}`);
      clearCart();
      navigate("/orderpage");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <section className="cart-page py-5" style={{ minHeight: "600px" }}>
        <Container>
          <h2 className="mb-4">Shopping Cart</h2>
          <div className="text-center py-5">
            <h4 className="text-muted mb-4">Your cart is empty</h4>
            <Button variant="primary" onClick={() => navigate("/")}>
              Continue Shopping
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="cart-page py-5" style={{ minHeight: "600px" }}>
      <Container>
        <h2 className="mb-4">Shopping Cart</h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <Row className="g-4">
          <Col xs={12} lg={8}>
            {cart.map((item) => (
              <div
                key={item.productId || item._id}
                className="cart-item bg-light p-4 rounded-3 mb-3 d-flex align-items-center"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  style={{ width: "90px" }}
                  className="rounded me-4"
                />

                <div className="flex-grow-1">
                  <h5>{item.title}</h5>
                  <p className="text-muted small">{item.desc}</p>
                  <strong>₹{item.price}</strong>
                </div>

                <div className="mx-3 d-flex align-items-center">
                  <Button
                    size="sm"
                    disabled={item.quantity <= 1}
                    onClick={() =>
                      updateQuantity(
                        item.productId || item._id,
                        item.quantity - 1
                      )
                    }
                  >
                    −
                  </Button>

                  <span className="mx-2 fw-bold">{item.quantity}</span>

                  <Button
                    size="sm"
                    onClick={() =>
                      updateQuantity(
                        item.productId || item._id,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </Button>
                </div>

                <div className="mx-3 fw-bold">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeFromCart(item.productId || item._id)}
                >
                  🗑
                </Button>
              </div>
            ))}
          </Col>

          <Col xs={12} lg={4}>
            <div
              className="bg-light p-4 rounded sticky-top"
              style={{ top: 20 }}
            >
              <h5>Order Summary</h5>

              <p>Items: {getTotalItems()}</p>
              <p>Subtotal: ₹{totalPrice.toFixed(2)}</p>
              <p>Tax (10%): ₹{(totalPrice * 0.1).toFixed(2)}</p>

              <hr />

              <h6>Total: ₹{(totalPrice * 1.1).toFixed(2)}</h6>

              <Button
                className="w-100 mt-3"
                variant="success"
                onClick={handlePlaceOrder}
                disabled={loading}
              >
                {loading ? "Placing Order..." : "Checkout"}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CartPage;
