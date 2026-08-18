import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { token, user } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }

  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default ProtectedRoute;
