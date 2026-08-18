import React from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = ({ onToggle }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/admin-login");
  };

  return (
    <nav
      className="navbar navbar-dark bg-dark px-3 d-flex align-items-center justify-content-between"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "70px", // Increased height slightly for better LG look
        zIndex: 1300,
      }}
    >
      <div className="d-flex align-items-center gap-2">
        <button
          className="btn btn-outline-light d-lg-none"
          onClick={onToggle}
          style={{ padding: "2px 10px", fontSize: "1.2rem" }}
        >
          ☰
        </button>

        {/* Responsive Brand Name */}
        <span className="navbar-brand fw-bold mb-0 brand-text">
          🛒 
          <span className="d-inline d-md-none"> Admin</span>
          <span className="d-none d-md-inline"> Admin Dashboard</span>
        </span>
      </div>

      <button
        className="btn btn-danger logout-btn"
        onClick={logout}
      >
        Logout
      </button>

      <style>{`
        /* Default Mobile Styles */
        .brand-text {
          font-size: 1.1rem;
        }
        .logout-btn {
          font-size: 0.85rem;
          padding: 5px 12px;
        }

        /* Large Screen Styles (Desktop) */
        @media (min-width: 992px) {
          .brand-text {
            font-size: 1.6rem; /* Bigger font for LG */
          }
          .logout-btn {
            font-size: 1.1rem; /* Bigger button for LG */
            padding: 8px 20px;
          }
        }
      `}</style>
    </nav>
  );
};

export default AdminNavbar;