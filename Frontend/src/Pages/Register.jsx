import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";

// Importing your specific category assets
import Bag from "../assets/Category-Images/Bag.png";
import Books from "../assets/Category-Images/Books.png";
import Furniture from "../assets/Category-Images/Furniture.png";
import Sneaker from "../assets/Category-Images/Sneaker.png";
import Tech from "../assets/Category-Images/Tech.png";
import Travel from "../assets/Category-Images/Travel.png";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await register({ username, email, password });
      alert(res.message || "Account created successfully!");
      navigate("/login");
    } catch (error) {
      const msg = error.response?.data?.message || error.message || "Registration failed.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  const categoryImages = [Bag, Books, Furniture, Sneaker, Tech, Travel];

  return (
    <div className="vh-100 d-flex align-items-center bg-light">
      <div className="container shadow-lg bg-white rounded-4 overflow-hidden p-0" style={{ maxWidth: "1000px" }}>
        <Row className="g-0">
          {/* Left Side: Category Preview Grid */}
          <Col md={6} className="d-none d-md-block bg-dark p-5 text-white">
            <h3 className="fw-bold mb-4">Join Shopcart.</h3>
            <p className="small mb-4 text-secondary">Get access to premium categories and exclusive deals.</p>
            
            <div className="row g-2">
              {categoryImages.map((img, index) => (
                <div key={index} className="col-4">
                  <img 
                    src={img} 
                    alt="Category" 
                    className="img-fluid rounded-3 border border-secondary"
                    style={{ filter: "grayscale(20%)", transition: "0.3s" }}
                    onMouseOver={e => e.currentTarget.style.filter = "grayscale(0%)"}
                    onMouseOut={e => e.currentTarget.style.filter = "grayscale(20%)"}
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-5 p-3 rounded-3" style={{ backgroundColor: "#1a1a1a" }}>
              <p className="small mb-0">"Shopping is a bit of a relaxing hobby for me..."</p>
            </div>
          </Col>

          {/* Right Side: Registration Form */}
          <Col md={6} className="p-5 d-flex flex-column justify-content-center">
            <div className="mb-4">
              <h2 className="fw-bold mb-1">Create Account</h2>
              <p className="text-muted">Start your shopping journey with us today.</p>
            </div>

            <Form onSubmit={submitRegister}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold">Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="johndoe"
                  className="py-2"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  className="py-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="small fw-semibold">Password</Form.Label>
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
                variant="success"
                type="submit"
                disabled={loading}
                className="w-100 py-2 fw-bold"
                style={{ backgroundColor: "#004d40", border: "none" }}
              >
                {loading ? (
                  <><Spinner animation="border" size="sm" className="me-2" /> Creating Account...</>
                ) : (
                  "Register"
                )}
              </Button>
            </Form>

            <div className="text-center mt-4 pt-2 border-top">
              <span className="text-muted">Already have an account? </span>
              <Link to="/login" className="fw-bold text-decoration-none text-success">
                Login here
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Register;