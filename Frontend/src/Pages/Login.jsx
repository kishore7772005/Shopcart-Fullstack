import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Form, Button, Row, Col, Spinner, Alert } from "react-bootstrap";

import CarouselHero from "../assets/HomeImages/carosel.png";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const submitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        { email, password }
      );

      login(res.data.token, res.data.user);

      // ✅ SUCCESS ALERT
      setSuccessMsg("✅ Login successful! Redirecting...");

      setTimeout(() => {
        if (res.data.user.role === "admin") {
          navigate("/admin", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      }, 1200);

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center bg-light">
      <div
        className="container shadow-lg bg-white rounded-4 overflow-hidden p-0"
        style={{ maxWidth: "1000px" }}
      >
        <Row className="g-0">
          {/* Left Side */}
          <Col md={6} className="d-none d-md-block bg-light">
            <div className="h-100 d-flex flex-column justify-content-center p-5">
              <img
                src={CarouselHero}
                alt="Shopping Experience"
                className="img-fluid rounded-3 mb-4"
              />
              <h3 className="fw-bold">Shopcart.</h3>
              <p className="text-muted">
                Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.
              </p>
            </div>
          </Col>

          {/* Right Side */}
          <Col md={6} className="p-5 d-flex flex-column justify-content-center">
            <h2 className="fw-bold mb-1">Welcome Back!</h2>
            <p className="text-muted mb-3">Enter your details to manage your orders.</p>

            {/* ✅ SUCCESS MESSAGE */}
            {successMsg && (
              <Alert variant="success" className="text-center py-2">
                {successMsg}
              </Alert>
            )}

            <Form onSubmit={submitLogin}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  className="py-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <div className="d-flex justify-content-between">
                  <Form.Label className="small fw-semibold">Password</Form.Label>
                  <Link to="#" className="small text-decoration-none">
                    Forgot Password?
                  </Link>
                </div>
                <Form.Control
                  type="password"
                  placeholder="••••••••"
                  className="py-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button
                type="submit"
                disabled={loading}
                className="w-100 py-2 fw-bold"
                style={{ backgroundColor: "#004d40", border: "none" }}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" animation="border" className="me-2" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </Form>

            <div className="text-center mt-4 pt-2 border-top">
              <span className="text-muted">Don’t have an account? </span>
              <Link to="/register" className="fw-bold text-success text-decoration-none">
                Register Now
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
