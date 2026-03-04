// ─── pages/PaymentPage.jsx ────────────────────────────────────────────────────
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { payOrder, rateOrder } from "../services/orderService.js";
import TopBar from "../components/TopBar.jsx";
import PinkBtn from "../components/PinkBtn.jsx";
import { pink, dark, white } from "../components/theme.js";
import toast from "react-hot-toast";

export default function PaymentPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [done, setDone] = useState(false);
  const [stars, setStars] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate payment processing
    payOrder(id)
      .then(() => {
        setTimeout(() => setDone(true), 2000);
      })
      .catch(() => toast.error("Payment failed"));
  }, [id]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (stars) await rateOrder(id, stars);
      nav(`/pay-done/${id}`);
    } catch {
      nav(`/pay-done/${id}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "#1a1a2e",
      }}
    >
      <TopBar title="Payment" back />
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <div
          style={{
            background: white,
            borderRadius: 22,
            padding: 28,
            width: "100%",
            maxWidth: 320,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 6 }}>☕</div>
          <div style={{ fontWeight: 900, fontSize: 16 }}>ADDA CAFE</div>
          <div style={{ color: "#bbb", fontSize: 11, marginBottom: 20 }}>
            Payment
          </div>

          {!done ? (
            <>
              <div
                style={{
                  position: "relative",
                  width: 100,
                  height: 100,
                  margin: "0 auto 18px",
                }}
              >
                <svg
                  width="100"
                  height="100"
                  style={{ animation: "spin 1s linear infinite" }}
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#f0f0f0"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke={pink}
                    strokeWidth="8"
                    strokeDasharray="66 198"
                  />
                </svg>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    color: "#888",
                  }}
                >
                  Processing
                </div>
              </div>
              <div style={{ fontWeight: 700, color: "#555" }}>
                Your Payment is Under Processing
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 54, marginBottom: 10 }}>✅</div>
              <div style={{ fontWeight: 800, color: "green", fontSize: 16 }}>
                Payment Successful!
              </div>
              <div style={{ fontWeight: 700, margin: "16px 0 10px" }}>
                How Would You Rate Your Experience?
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 8,
                  marginBottom: 20,
                }}
              >
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    onClick={() => setStars(s)}
                    style={{ fontSize: 28, cursor: "pointer" }}
                  >
                    {s <= stars ? "⭐" : "☆"}
                  </span>
                ))}
              </div>
              <PinkBtn onClick={handleSubmit} disabled={loading}>
                {loading ? "…" : "Submit"}
              </PinkBtn>
            </>
          )}
          <div style={{ color: "#bbb", fontSize: 11, marginTop: 16 }}>
            THANKS FOR VISIT AGAIN...
          </div>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
