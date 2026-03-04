// ─── pages/OrderPlacedPage.jsx ───────────────────────────────────────────────
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cancelOrder } from "../services/orderService.js";
import { pink, white, dark } from "../components/theme.js";
import toast from "react-hot-toast";

export default function OrderPlacedPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const WINDOW = 3 * 60; // 3 min in seconds
  const [timer, setTimer] = useState(WINDOW);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTimer((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (timer === 0) nav(`/bill/${id}`);
  }, [timer]);

  const mm = String(Math.floor(timer / 60)).padStart(2, "0");
  const ss = String(timer % 60).padStart(2, "0");
  const pct = ((WINDOW - timer) / WINDOW) * 100;

  const handleCancel = async () => {
    try {
      setCancelling(true);
      await cancelOrder(id);
      toast.success("Order cancelled");
      nav("/menu");
    } catch (e) {
      toast.error(e.response?.data?.message || "Cannot cancel");
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          background: white,
          borderRadius: 22,
          padding: 28,
          width: "100%",
          maxWidth: 340,
          textAlign: "center",
          position: "relative",
        }}
      >
        <div style={{ fontSize: 52, marginBottom: 10 }}>✅</div>
        <div style={{ fontWeight: 900, fontSize: 20, marginBottom: 6 }}>
          Order Placed!
        </div>
        <div style={{ color: "#888", fontSize: 13, marginBottom: 20 }}>
          Your order has been successfully received
        </div>

        {/* Circular timer */}
        <div
          style={{
            position: "relative",
            width: 110,
            height: 110,
            margin: "0 auto 16px",
          }}
        >
          <svg width="110" height="110" style={{ transform: "rotate(-90deg)" }}>
            <circle
              cx="55"
              cy="55"
              r="48"
              fill="none"
              stroke="#f0f0f0"
              strokeWidth="8"
            />
            <circle
              cx="55"
              cy="55"
              r="48"
              fill="none"
              stroke={pink}
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 48}`}
              strokeDashoffset={`${2 * Math.PI * 48 * (pct / 100)}`}
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 26,
              color: dark,
            }}
          >
            {mm}:{ss}
          </div>
        </div>

        <div style={{ color: "#999", fontSize: 12, marginBottom: 6 }}>
          You can cancel or modify your order while this timer runs
        </div>
        <div style={{ color: "#bbb", fontSize: 11, marginBottom: 22 }}>
          After submission you will not be able to cancel the order
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={handleCancel}
            disabled={cancelling}
            style={{
              flex: 1,
              padding: "11px 0",
              border: `1.5px solid ${pink}`,
              borderRadius: 22,
              color: pink,
              background: white,
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            {cancelling ? "…" : "Cancel Order"}
          </button>
          <button
            onClick={() => nav(`/bill/${id}`)}
            style={{
              flex: 1,
              padding: "11px 0",
              border: "none",
              borderRadius: 22,
              background: dark,
              color: white,
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Keep Order
          </button>
        </div>
      </div>
    </div>
  );
}
