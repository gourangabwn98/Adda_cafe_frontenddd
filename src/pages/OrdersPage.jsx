// ─── pages/OrdersPage.jsx ────────────────────────────────────────────────────
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyOrders } from "../services/orderService.js";
import TopBar from "../components/TopBar.jsx";
import BottomNav from "../components/BottomNav.jsx";
import Loader from "../components/Loader.jsx";
import { pink, white } from "../components/theme.js";

export default function OrdersPage() {
  const nav = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders().then((r) => {
      setOrders(r.data);
      setLoading(false);
    });
  }, []);

  const statusColor = (s) =>
    ({
      Placed: "#f0a500",
      Preparing: "#2196f3",
      Ready: "green",
      Completed: "#888",
      Cancelled: "red",
    })[s] || "#888";

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <TopBar title="Order History" back />
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        {loading ? (
          <Loader />
        ) : orders.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: 80, color: "#bbb" }}>
            No orders yet
          </div>
        ) : (
          orders.map((o) => (
            <div
              key={o._id}
              style={{
                background: white,
                borderRadius: 14,
                padding: 14,
                marginBottom: 14,
                boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
              }}
            >
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ fontSize: 36 }}>🍔</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: pink }}>
                    {o.orderId}
                  </div>
                  <div style={{ fontSize: 11, color: "#999" }}>
                    {o.items
                      .map((i) => i.name)
                      .join(", ")
                      .slice(0, 38)}
                    …
                  </div>
                  <div style={{ fontSize: 10, color: "#ccc", marginTop: 2 }}>
                    {new Date(o.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700 }}>₹{o.total}</div>
                  <div
                    style={{
                      fontSize: 11,
                      color: statusColor(o.status),
                      fontWeight: 600,
                    }}
                  >
                    {o.status}
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  gap: 8,
                  justifyContent: "flex-end",
                }}
              >
                <button
                  onClick={() => nav(`/bill/${o._id}`)}
                  style={{
                    fontSize: 11,
                    color: pink,
                    background: "none",
                    border: `1px solid ${pink}`,
                    borderRadius: 14,
                    padding: "5px 12px",
                    cursor: "pointer",
                  }}
                >
                  Full Invoice
                </button>
                <button
                  onClick={() => nav(`/reorder/${o._id}`)}
                  style={{
                    fontSize: 11,
                    color: "#fff",
                    background: pink,
                    border: "none",
                    borderRadius: 14,
                    padding: "5px 12px",
                    cursor: "pointer",
                  }}
                >
                  Re-Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <BottomNav />
    </div>
  );
}
