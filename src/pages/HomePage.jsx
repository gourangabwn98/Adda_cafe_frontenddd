// ─── pages/HomePage.jsx ───────────────────────────────────────────────────────
import { useNavigate } from "react-router-dom";
import { pink, dark, white } from "../components/theme.js";

export default function HomePage() {
  const nav = useNavigate();
  return (
    <div
      style={{
        minHeight: "100vh",
        background: dark,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 28,
        gap: 32,
      }}
    >
      {/* Logo */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            background: pink,
            borderRadius: "50%",
            width: 90,
            height: 90,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 14px",
            fontSize: 40,
          }}
        >
          🍽️
        </div>
        <div
          style={{
            color: white,
            fontSize: 30,
            fontWeight: 900,
            letterSpacing: 3,
          }}
        >
          আড্ডা
        </div>
        <div
          style={{ color: pink, fontSize: 13, letterSpacing: 5, marginTop: 2 }}
        >
          ADDA CAFE
        </div>
      </div>

      {/* Order Type */}
      <div style={{ display: "flex", gap: 16 }}>
        {[
          { t: "Take Away", i: "🛍️" },
          { t: "Dining", i: "🪑" },
        ].map(({ t, i }) => (
          <button
            key={t}
            onClick={() => nav("/menu")}
            style={{
              background: t === "Take Away" ? pink : "transparent",
              border: `2px solid ${pink}`,
              color: white,
              borderRadius: 30,
              padding: "16px 22px",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: 14,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 8 }}>{i}</div>
            {t}
          </button>
        ))}
      </div>

      {/* QR */}
      <div
        style={{
          background: "rgba(255,255,255,0.07)",
          borderRadius: 18,
          padding: 24,
          textAlign: "center",
          width: "100%",
        }}
      >
        <div style={{ color: "#aaa", fontSize: 12, marginBottom: 12 }}>
          Scan QR to Start Ordering
        </div>
        <div
          style={{
            width: 130,
            height: 130,
            background: white,
            borderRadius: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            fontSize: 70,
          }}
        >
          ⬛
        </div>
      </div>

      <button
        onClick={() => nav("/login")}
        style={{
          color: pink,
          background: "none",
          border: `1.5px solid ${pink}`,
          borderRadius: 22,
          padding: "9px 28px",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Login / Sign Up
      </button>
    </div>
  );
}
