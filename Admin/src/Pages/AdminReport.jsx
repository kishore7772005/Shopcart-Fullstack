import React, { use, useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./Navbar";
import AdminSidebar from "./AdminSidebar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";

const AdminReport = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
 const navigate = useNavigate();
  /* ================= FETCH DATA ================= */

  const fetchReportData = async () => {
    setLoading(true);
    try {
      const [ordersRes, usersRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setOrders(ordersRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      console.error("Error loading report data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  

  /* ================= CALCULATIONS ================= */

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const statusCount = {
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  /* ================= PDF DOWNLOAD ================= */

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Admin Orders Report", 14, 20);

    doc.setFontSize(11);
    doc.text(`Total Orders: ${orders.length}`, 14, 30);
    doc.text(`Total Revenue: ₹${totalRevenue.toFixed(2)}`, 14, 37);
    doc.text(`Total Users: ${users.length}`, 14, 44);

    const tableData = orders.map((o) => [
      o.orderNumber || o._id.slice(-6),
      o.userId?.email || "N/A",
      new Date(o.createdAt).toLocaleDateString("en-IN"),
      `₹${o.total}`,
      o.status,
    ]);

    doc.autoTable({
      startY: 55,
      head: [["Order ID", "User", "Date", "Total", "Status"]],
      body: tableData,
      theme: "striped",
      headStyles: { fillColor: [17, 24, 39] },
    });

    doc.save("Admin_Report.pdf");
  };

  return (
    <>
      <AdminSidebar />
      <AdminNavbar />

      {/* ================= RESPONSIVE STYLES ================= */}
      <style>
        {`
        @media (max-width: 768px) {
          .admin-content {
            margin-left: 0 !important;
            padding: 15px !important;
          }
        }

        .table-wrapper {
          overflow-x: auto;
        }
        `}
      </style>

      {/* ================= MAIN CONTENT ================= */}
      <div
        className="admin-content"
        style={{
          marginLeft: "230px",
          marginTop: "70px",
          padding: "25px",
          fontFamily: "Segoe UI, sans-serif",
          background: "#f9fafb",
          minHeight: "100vh",
        }}
      >
        <h2 className="mb-3">📑 Admin Report</h2>

        {loading && <p>Loading report...</p>}

        {/* ================= SUMMARY CARDS ================= */}
        <div style={cardGrid}>
          <Card title="Total Orders" value={orders.length} bg="#dbeafe" />
          <Card
            title="Total Revenue"
            value={`₹ ${totalRevenue.toFixed(2)}`}
            bg="#dcfce7"
          />
          <Card title="Total Users" value={users.length} bg="#fef3c7" />
        </div>

        {/* ================= STATUS REPORT ================= */}
        <div style={cardGrid}>
          <Card title="Confirmed" value={statusCount.confirmed} bg="#dcfce7" />
          <Card title="Shipped" value={statusCount.shipped} bg="#86efac" />
          <Card title="Delivered" value={statusCount.delivered} bg="#dbeafe" />
          <Card title="Cancelled" value={statusCount.cancelled} bg="#fee2e2" />
        </div>

        {/* ================= TABLE REPORT ================= */}
        <div style={tableBox}>
          <h4 className="mb-3">Orders Report</h4>

          <div className="table-wrapper">
            <table style={table}>
              <thead style={{ background: "#111827", color: "#fff" }}>
                <tr>
                  <th style={th}>Order ID</th>
                  <th style={th}>User</th>
                  <th style={th}>Date</th>
                  <th style={th}>Total</th>
                  <th style={th}>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((o) => (
                  <tr key={o._id} style={{ textAlign: "center" }}>
                    <td style={td}>
                      {o.orderNumber || o._id.slice(-6)}
                    </td>
                    <td style={td}>{o.userId?.email || "N/A"}</td>
                    <td style={td}>
                      {new Date(o.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td style={td}>₹{o.total}</td>
                    <td style={td}>{o.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={downloadPDF}
            className="btn btn-danger mt-3 w-100 w-md-auto"
          >
            📄 Download Report (PDF)
          </button>
        </div>
        <div>
          <button
            onClick={() => navigate("/admin")}
            className="btn btn-secondary mt-3 me-1 w-md-auto"
          >
            🚪 Back to Admin Dashboard
          </button>
        </div>
      </div>
    </>
  );
};

/* ================= COMPONENTS ================= */

const Card = ({ title, value, bg }) => (
  <div
    style={{
      background: bg,
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      textAlign: "center",
      fontWeight: "600",
    }}
  >
    <div style={{ fontSize: "14px" }}>{title}</div>
    <div style={{ fontSize: "26px", marginTop: "8px" }}>{value}</div>
  </div>
);

/* ================= STYLES ================= */

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  marginBottom: "30px",
};

const tableBox = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const th = {
  padding: "12px",
  borderBottom: "1px solid #374151",
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #e5e7eb",
};

export default AdminReport;
