import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/BG.png";
import AdminNavbar from "./Navbar";
import AdminSidebar from "./AdminSidebar";

const AddProduct = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 992);
      if (window.innerWidth >= 992) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [data, setData] = useState({
    title: "",
    price: "",
    category: "",
    desc: "",
    stock: "",
    img: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img" && files[0]) {
      setData({ ...data, img: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key]) formData.append(key, data[key]);
      });

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/products`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Product Added Successfully");
      navigate("/admin");
    } catch (err) {
      alert("Failed to add product");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
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
          marginLeft: isLargeScreen ? "230px" : "0",
          padding: "25px",
          transition: "margin-left 0.3s ease",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,.95)",
            borderRadius: "20px",
            boxShadow: "0 15px 35px rgba(0,0,0,.3)",
            padding: "30px",
            maxWidth: "900px",
            width: "100%",
          }}
        >
          <h2 className="text-center fw-bold mb-4">Add New Product</h2>

          <form onSubmit={submit} className="row g-3">
            <div className="col-lg-8 col-md-12 row g-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">Title</label>
                <input className="form-control" name="title" required onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">Price</label>
                <input className="form-control" type="number" name="price" required onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">Stock</label>
                <input className="form-control" type="number" name="stock" required onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">Category</label>
                <input className="form-control" name="category" onChange={handleChange} />
              </div>

              <div className="col-12">
                <label className="form-label fw-bold">Description</label>
                <textarea className="form-control" rows="2" name="desc" onChange={handleChange} />
              </div>
            </div>

            <div className="col-lg-4 col-md-12 text-center">
              <label className="form-label fw-bold">Product Image</label>
              <div
                style={{
                  height: "200px",
                  border: "2px dashed #ccc",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#f8f9fa",
                }}
              >
                {preview ? (
                  <img src={preview} alt="preview" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                ) : (
                  <span>No Image</span>
                )}
              </div>

              <input
                type="file"
                id="imgInput"
                name="img"
                hidden
                accept="image/*"
                onChange={handleChange}
              />

              <button
                type="button"
                className="btn btn-outline-secondary w-100 mt-2"
                onClick={() => document.getElementById("imgInput").click()}
              >
                Choose Image
              </button>
            </div>

            <div className="col-12">
              <button className="btn btn-success btn-lg w-100 mt-3" type="submit">
                SUBMIT PRODUCT
              </button>
            </div>

            <div className="col-12">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={() => navigate("/admin")}
              >
                Back to Dashboard
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
