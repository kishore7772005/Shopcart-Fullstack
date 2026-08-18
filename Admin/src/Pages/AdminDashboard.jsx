import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./Navbar";
import AdminSidebar from "./AdminSidebar";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/BG.png";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // 🔑 IMPORTANT

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const isLargeScreen = window.innerWidth >= 992; // lg breakpoint

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      setError("Failed to load products");
      if (err.response?.status === 401) navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) navigate("/login");
    else fetchProducts();
  }, [token, navigate]);

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,.8), rgba(255,255,255,.8)), url(${bgImage})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      {/* NAVBAR */}
      <AdminNavbar onToggle={() => setSidebarOpen(true)} />

      {/* SIDEBAR */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* MAIN CONTENT */}
      <div
        style={{
          marginTop: "70px",
          marginLeft: isLargeScreen ? "230px" : "0", // ✅ KEY FIX
          padding: "20px",
          transition: "margin-left 0.3s ease",
        }}
      >
        <div className="d-flex justify-content-between mb-4 flex-wrap gap-2">
          <h2 className="fw-bold">Product Inventory</h2>
          <button
            className="btn btn-success"
            onClick={() => navigate("/add-product")}
          >
            + Add Product
          </button>
        </div>

        <div className="table-responsive bg-white rounded shadow p-3">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <table className="table table-hover align-middle text-center">
              <thead className="table-dark">
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <img
                        src={p.img}
                        alt={p.title}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td>{p.title}</td>
                    <td>₹{p.price}</td>
                    <td>
                      <span
                        className={`badge ${
                          p.stock > 0 ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {p.stock}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => navigate(`/edit/${p._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteProduct(p._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
