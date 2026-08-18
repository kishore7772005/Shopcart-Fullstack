import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AdminNavbar from "./Navbar";
import backgroundImage from "../assets/BG.png";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [product, setProduct] = useState({
    title: "",
    price: "",
    stock: "",
    desc: "",
    category: "",
    img: "",
  });

  const [newImage, setNewImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Fetch product
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
      .then((res) => {
        const found = res.data.find((p) => p._id === id);
        if (found) setProduct(found);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const updateProduct = async () => {
    try {
      let payload;
      let headers = { Authorization: `Bearer ${token}` };

      if (newImage) {
        payload = new FormData();
        payload.append("title", product.title);
        payload.append("price", product.price);
        payload.append("stock", product.stock);
        payload.append("desc", product.desc);
        payload.append("category", product.category);
        payload.append("img", newImage);
      } else {
        payload = {
          title: product.title,
          price: product.price,
          stock: product.stock,
          desc: product.desc,
          category: product.category,
        };
      }

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
        payload,
        { headers }
      );

      alert("✅ Product Updated Successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("❌ Update failed");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        paddingBottom: "40px",
      }}
    >
      <AdminNavbar />

      {/* Inline Styles */}
      <style>
        {`
        .img-frame {
          width: 100%;
          height: 220px;
          object-fit: contain;
          background: #f8f9fa;
          border-radius: 12px;
          border: 1px solid #ddd;
        }

        @media (max-width: 768px) {
          .card-body {
            padding: 20px !important;
          }
        }
        `}
      </style>

      <div className="container pt-4 pt-md-5">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-md-11 col-sm-12">
            <div className="card border-0 shadow-lg rounded-4 bg-white">
              <div className="card-body p-4 p-md-5">
                {/* Header */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">
                  <h3 className="fw-bold mb-0">✏️ Edit Product</h3>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </button>
                </div>

                <div className="row g-4">
                  {/* FORM SECTION */}
                  <div className="col-md-7">
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Product Title
                      </label>
                      <input
                        className="form-control"
                        value={product.title}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="row">
                      <div className="col-sm-6 mb-3">
                        <label className="form-label fw-semibold">
                          Price (₹)
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          value={product.price}
                          onChange={(e) =>
                            setProduct({
                              ...product,
                              price: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="col-sm-6 mb-3">
                        <label className="form-label fw-semibold">
                          Stock
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          value={product.stock}
                          onChange={(e) =>
                            setProduct({
                              ...product,
                              stock: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Description
                      </label>
                      <textarea
                        rows="4"
                        className="form-control"
                        value={product.desc}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            desc: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* IMAGE SECTION */}
                  <div className="col-md-5 text-center">
                    <label className="form-label fw-semibold">
                      Product Image
                    </label>

                    <img
                      src={preview || product.img}
                      alt="Product"
                      className="img-frame mb-2"
                    />

                    <small className="text-muted d-block mb-3">
                      {preview ? "New image preview" : "Current image"}
                    </small>

                    <input
                      type="file"
                      className="form-control mb-3"
                      accept="image/*"
                      onChange={handleImageChange}
                    />

                    <button
                      className="btn btn-primary w-100 fw-semibold"
                      onClick={updateProduct}
                    >
                      💾 Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* BACK BUTTON */}
      <div className="container text-center mt-4">
        <div>
          <button
            onClick={() => navigate("/admin")}
            className="btn btn-danger mt-3 w-100 w-md-auto"
          >
            🚪 Back to Admin Dashboard
          </button>
        </div>
      </div>
    </div>  // <-- THIS WAS MISSING
  );
};

export default EditProduct;
