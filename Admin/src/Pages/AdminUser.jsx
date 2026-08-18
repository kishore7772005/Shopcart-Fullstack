import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./Navbar";
import AdminSidebar from "./AdminSidebar";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  /* ================= HANDLE RESIZE ================= */
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 992);
      if (window.innerWidth >= 992) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <AdminNavbar onToggle={() => setSidebarOpen(true)} />

      {/* SIDEBAR */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* ================= MAIN CONTENT ================= */}
      <div
        style={{
          marginLeft: isLargeScreen ? "230px" : "0",
          marginTop: "70px",
          padding: "20px",
          fontFamily: "Segoe UI, sans-serif",
          background: "#f9fafb",
          minHeight: "100vh",
          transition: "margin-left 0.3s ease",
        }}
      >
        <h2>👤 Admin Users</h2>

        {loading && <p>Loading users...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && users.length === 0 && <p>No users found.</p>}

        {!loading && !error && users.length > 0 && (
          /* ✅ RESPONSIVE TABLE WRAPPER */
          <div style={{ overflowX: "auto", marginTop: "15px" }}>
            <table
              style={{
                width: "100%",
                minWidth: "650px",
                borderCollapse: "collapse",
                background: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <thead
                style={{
                  backgroundColor: "#111827",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                <tr>
                  <th style={th}>Username</th>
                  <th style={th}>Email</th>
                  <th style={th}>Role</th>
                  <th style={th}>Registered Date & Time</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id} style={{ textAlign: "center" }}>
                    <td style={td}>{user.username}</td>
                    <td style={td}>{user.email}</td>
                    <td style={td}>
                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: "12px",
                          background:
                            user.role === "admin" ? "#fee2e2" : "#dcfce7",
                          color:
                            user.role === "admin" ? "#b91c1c" : "#166534",
                          fontWeight: "600",
                          fontSize: "13px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td style={{ ...td, whiteSpace: "nowrap" }}>
                      {new Date(user.createdAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* BACK BUTTON */}
        <div className="d-flex justify-content-end">
          <button
            onClick={() => navigate("/admin")}
            className="btn btn-secondary mt-4"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </>
  );
};

/* ================= STYLES ================= */

const th = {
  padding: "12px",
  borderBottom: "1px solid #374151",
  whiteSpace: "nowrap",
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #e5e7eb",
  whiteSpace: "nowrap",
};

export default AdminUsers;
