import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Import the image
import adminImg from "../assets/Admin.png"; 

const AdminLogin = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        email,
        password,
      });

      if (res.data.user.role !== "admin") {
        alert("Admins only");
        setLoading(false);
        return;
      }

      login(res.data.token, res.data.user);
      navigate("/admin", { replace: true });
    } catch (error) {
      alert("Login failed: " + (error.response?.data?.message || error.message));
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center bg-light">
      <div className="container bg-white shadow-lg rounded-4 overflow-hidden">
        <div className="row align-items-center">
          
          {/* Left Side: Illustration */}
          <div className="col-md-6 d-none d-md-block p-5 bg-primary bg-opacity-10 text-center">
            <img 
              src={adminImg} 
              alt="Admin Portal" 
              className="img-fluid mb-4" 
              style={{ maxHeight: "400px" }}
            />
            <h3 className="fw-bold text-primary">Admin Control Panel</h3>
            <p className="text-muted">Manage your products, orders, and users in one place.</p>
          </div>

          {/* Right Side: Login Form */}
          <div className="col-md-6 p-5">
            <div className="mb-4">
              <h2 className="fw-bold">Welcome Back!</h2>
              <p className="text-secondary">Please enter your admin credentials</p>
            </div>

            <form onSubmit={submitLogin}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <input
                  type="email"
                  placeholder="admin@shopcart.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-control form-control-lg border-2 shadow-sm"
                />
              </div>
              
              <div className="mb-4">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-control form-control-lg border-2 shadow-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-lg w-100 fw-bold shadow-sm py-3 transition-all"
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm me-2"></span>
                ) : null}
                {loading ? "Verifying..." : "Login to Dashboard"}
              </button>
            </form>
            
            <div className="mt-4 text-center">
              <small className="text-muted">
                Secure SSL Encrypted Connection
              </small>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminLogin;