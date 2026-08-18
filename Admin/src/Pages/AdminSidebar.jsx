import { Link, useLocation } from "react-router-dom";

const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const isLargeScreen = window.innerWidth >= 992; // lg and above

  const sidebarStyle = {
    position: "fixed",
    top: 0,
    left: isLargeScreen ? "0" : isOpen ? "0" : "-240px",
    width: "230px",
    height: "100vh",
    background: "#111827",
    color: "#fff",
    paddingTop: "70px",
    zIndex: 1200,
    transition: "left 0.3s ease",
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.4)",
    zIndex: 1100,
  };

  const linkStyle = (path) => ({
    display: "block",
    padding: "12px 20px",
    color: location.pathname === path ? "#0d6efd" : "#e5e7eb",
    background:
      location.pathname === path ? "rgba(13,110,253,0.15)" : "transparent",
    textDecoration: "none",
    fontWeight: "500",
    borderLeft:
      location.pathname === path
        ? "4px solid #0d6efd"
        : "4px solid transparent",
  });

  return (
    <>
      {/* Overlay only for md & sm */}
      {!isLargeScreen && isOpen && (
        <div style={overlayStyle} onClick={onClose}></div>
      )}

      <div style={sidebarStyle}>
        <h5 className="text-center mb-4 fw-bold">ADMIN MENU</h5>

        <Link to="/admin" style={linkStyle("/admin")} onClick={onClose}>
          📊 Dashboard
        </Link>

        <Link to="/add-product" style={linkStyle("/add-product")} onClick={onClose}>
          ➕ Add Product
        </Link>

        <Link to="/orders" style={linkStyle("/orders")} onClick={onClose}>
          📦 Orders
        </Link>

        <Link to="/users" style={linkStyle("/users")} onClick={onClose}>
          👥 Users
        </Link>

        <Link to="/reports" style={linkStyle("/reports")} onClick={onClose}>
          📈 Reports
        </Link>
      </div>
    </>
  );
};

export default AdminSidebar;
