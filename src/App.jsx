// ─── App.jsx ─────────────────────────────────────────────────────────────────
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.js";

import HomePage from "./pages/HomePage.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import OTPPage from "./pages/OTPPage.jsx";
import OrderPlaced from "./pages/OrderPlacedPage.jsx";
import BillPage from "./pages/BillPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import PayDonePage from "./pages/PayDonePage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import ReOrderPage from "./pages/ReOrderPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import EditProfilePage from "./pages/EditProfilePage.jsx";
import InvoicePage from "./pages/InvoicePage.jsx";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          fontFamily: "'Segoe UI',sans-serif",
          background: "#e8e8e8",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 390,
            minHeight: "100vh",
            background: "#f5f5f5",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 0 40px rgba(0,0,0,0.2)",
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/otp" element={<OTPPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <CartPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/order-placed/:id"
              element={
                <PrivateRoute>
                  <OrderPlaced />
                </PrivateRoute>
              }
            />
            <Route
              path="/bill/:id"
              element={
                <PrivateRoute>
                  <BillPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/payment/:id"
              element={
                <PrivateRoute>
                  <PaymentPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/pay-done/:id"
              element={
                <PrivateRoute>
                  <PayDonePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <OrdersPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/reorder/:id"
              element={
                <PrivateRoute>
                  <ReOrderPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/account"
              element={
                <PrivateRoute>
                  <AccountPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route
              path="/edit"
              element={
                <PrivateRoute>
                  <EditProfilePage />
                </PrivateRoute>
              }
            />
            <Route path="/invoices" element={<InvoicePage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
