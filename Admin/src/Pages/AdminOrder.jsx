import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./Navbar";
import AdminSidebar from "./AdminSidebar";

const PLACEHOLDER =
  "https://via.placeholder.com/80x80.png?text=Product";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [openOrderId, setOpenOrderId] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  /* ================= RESIZE ================= */
  useEffect(() => {
    const resize = () => {
      setIsLargeScreen(window.innerWidth >= 992);
      if (window.innerWidth >= 992) setSidebarOpen(false);
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ================= FETCH ================= */
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data));
  }, []);

  /* ================= STATUS ================= */
  const updateStatus = async (id, status) => {
    await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setOrders((prev) =>
      prev.map((o) => (o._id === id ? { ...o, status } : o))
    );
  };

  /* ================= ROW COLORS ================= */
  const rowColor = (status) => {
    if (status === "confirmed") return "#ecfeff";
    if (status === "shipped") return "#fff7ed";
    if (status === "delivered") return "#f0fdf4";
    if (status === "cancelled") return "#fef2f2";
    return "#fff";
  };

  return (
    <>
      <AdminNavbar onToggle={() => setSidebarOpen(true)} />
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div
        style={{
          marginLeft: isLargeScreen ? "230px" : "0",
          marginTop: "70px",
          padding: "20px",
          background: "#f8fafc",
          minHeight: "100vh",
        }}
      >
        <h2 className="mb-4">📦 Admin Orders</h2>

        <div style={{ overflowX: "auto" }}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Order</th>
                <th style={th}>User</th>
                <th style={th}>Date</th>
                <th style={th}>Products</th>
                <th style={th}>Total</th>
                <th style={th}></th>
                <th style={th}>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <React.Fragment key={order._id}>
                  {/* ================= MAIN ROW ================= */}
                  <tr
                    style={{
                      background: rowColor(order.status),
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      setOpenOrderId(
                        openOrderId === order._id ? null : order._id
                      )
                    }
                  >
                    <td style={td}>
                      {order.orderNumber || order._id.slice(-6)}
                    </td>

                    <td style={td}>
                      {order.userId?.username ||
                        order.userId?.email ||
                        "N/A"}
                    </td>

                    <td style={td}>
                      {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    </td>

                    {/* PRODUCTS COUNT */}
                    <td style={{ ...td, fontWeight: 600 }}>
                      {order.items.length}{" "}
                      {order.items.length === 1 ? "item" : "items"}
                    </td>

                    <td style={{ ...td, fontWeight: 700 }}>
                      ₹{order.total.toFixed(2)}
                    </td>

                    {/* DROPDOWN ICON */}
                    <td
                      style={{ ...td, fontSize: "20px" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenOrderId(
                          openOrderId === order._id ? null : order._id
                        );
                      }}
                    >
                      {openOrderId === order._id ? (
                        <i className="bi bi-chevron-up"></i>
                      ) : (
                        <i className="bi bi-chevron-down"></i>
                      )}
                    </td>

                    {/* STATUS (SEPARATE) */}
                    <td
                      style={td}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(order._id, e.target.value)
                        }
                        style={select}
                      >
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>

                  {/* ================= DROPDOWN ================= */}
                  {openOrderId === order._id && (
                    <tr>
                      <td colSpan="7">
                        <div style={dropdownWrap}>
                          {order.items.map((item, i) => (
                            <div key={i} style={productCard}>
                              <img
                                src={
                                  item.image ||
                                  item.img ||
                                  item.thumbnail ||
                                  PLACEHOLDER
                                }
                                alt={item.title}
                                style={productImg}
                                onError={(e) =>
                                  (e.target.src = PLACEHOLDER)
                                }
                              />
                              <div>
                                <div style={{ fontWeight: 600 }}>
                                  {item.title}
                                </div>
                                <div className="text-muted">
                                  Qty {item.quantity} × ₹{item.price}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/admin")}
            className="btn btn-secondary"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </>
  );
};

/* ================= STYLES ================= */

const table = {
  width: "100%",
  minWidth: "900px",
  borderCollapse: "collapse",
  background: "#fff",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const th = {
  padding: "14px",
  background: "#020617",
  color: "#fff",
  textAlign: "center",
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #e5e7eb",
  textAlign: "center",
  whiteSpace: "nowrap",
};

const select = {
  padding: "6px",
  borderRadius: "6px",
};

const dropdownWrap = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "16px",
  padding: "20px",
  background: "#f1f5f9",
};

const productCard = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  background: "#fff",
  padding: "12px",
  borderRadius: "12px",
  minWidth: "240px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
};

const productImg = {
  width: "70px",
  height: "70px",
  objectFit: "contain",
  borderRadius: "8px",
};

export default AdminOrders;
