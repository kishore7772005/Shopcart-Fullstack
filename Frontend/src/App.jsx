import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Home from "./Pages/Home";
import Dynamic from "./Pages/Dynamic";
import Cart from "./Pages/Cart";
import Deals from "./Pages/Deals";
import BestProducts from "./Pages/BestProducts";
import NewPage from "./Pages/NewPage";
import Order from "./Pages/Order";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

import ProtectedRoute from "./protectedRoute";
import CartProvider from "./ContextProvider";
import AuthProvider, { AuthContext } from "./AuthContext";

// ScrollToTop Component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppRoutes = () => {
  const { token } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <ScrollToTop /> {/* <-- Add ScrollToTop here */}
      <CartProvider>
        <Routes>
          {/* PUBLIC */}
          <Route
            path="/login"
            element={!token ? <Login /> : <Navigate to="/" replace />}
          />
          <Route
            path="/register"
            element={!token ? <Register /> : <Navigate to="/" replace />}
          />

          {/* USER PROTECTED */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:productId"
            element={
              <ProtectedRoute>
                <Dynamic />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/deals"
            element={
              <ProtectedRoute>
                <Deals />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bestproducts"
            element={
              <ProtectedRoute>
                <BestProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/whatsnew"
            element={
              <ProtectedRoute>
                <NewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orderpage"
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            }
          />

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
