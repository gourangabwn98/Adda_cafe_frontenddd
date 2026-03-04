// ─── pages/PayDonePage.jsx ────────────────────────────────────────────────────
import { useNavigate } from "react-router-dom";
import PinkBtn from "../components/PinkBtn.jsx";
import { white } from "../components/theme.js";

export default function PayDonePage() {
  const nav = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "#1a1a2e",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          background: white,
          borderRadius: 22,
          padding: 32,
          width: "100%",
          maxWidth: 320,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 6 }}>☕</div>
        <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 4 }}>
          ADDA CAFE
        </div>
        <div style={{ fontSize: 60, margin: "18px 0" }}>✅</div>
        <div
          style={{
            fontWeight: 800,
            color: "green",
            fontSize: 18,
            marginBottom: 8,
          }}
        >
          Thank You!
        </div>
        <div style={{ color: "#777", fontSize: 13, marginBottom: 24 }}>
          Your Payment Has Been Completed Successfully.
        </div>
        <div style={{ color: "#bbb", fontSize: 11, marginBottom: 20 }}>
          THANKS FOR VISIT AGAIN...
        </div>
        <PinkBtn onClick={() => nav("/orders")}>View Order History</PinkBtn>
      </div>
    </div>
  );
}
