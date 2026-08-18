import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./Pages/AdminDashboard";
import AddProduct from "./Pages/AddProduct";
import EditProduct from "./Pages/EditProduct";
import AdminLogin from "./Pages/AdminLogin";
import AdminOrders from "./Pages/AdminOrder";
import AdminUsers from "./Pages/AdminUser";


import AuthProvider from "./AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import AdminReport from "./Pages/AdminReport";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ADMIN LOGIN */}
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* ADMIN PROTECTED ROUTES */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-product"
            element={
              <ProtectedRoute adminOnly>
                <AddProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute adminOnly>
                <EditProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={     
          <ProtectedRoute adminOnly>
                <AdminOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/users"
            element={
              <ProtectedRoute adminOnly>
                <AdminUsers />
              </ProtectedRoute>
            }
          />  
          <Route path="/reports" element={ 
            <ProtectedRoute adminOnly>
              <AdminReport />
            </ProtectedRoute>
          }></Route>

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/admin-login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
