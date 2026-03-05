// ─── pages/HomePage.jsx ─────────────────────────────────────────
import { useNavigate } from "react-router-dom";
import { changeOrderTypeById } from "../services/orderService";

export default function HomePage() {
  const nav = useNavigate();
  const orderId = localStorage.getItem("orderId");

  const changeType = async (type) => {
    try {
      if (orderId) {
        await changeOrderTypeById(orderId, type);
      }

      localStorage.setItem("orderType", type);
      nav("/menu");
    } catch (err) {
      console.log(err);
    }
  };

  const cardBase = {
    width: "100%",
    height: 250,
    borderRadius: 28,
    overflow: "hidden",
    position: "relative",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const overlay = {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
  };

  const text = {
    position: "relative",
    color: "white",
    fontWeight: 700,
    fontSize: 28,
    textAlign: "center",
    zIndex: 2,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f3f3",
        padding: 16,
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        {/* Logo */}
        <div style={{ fontSize: 32, fontWeight: 900, color: "#7b3f3f" }}>
          আড্ডা
        </div>

        {/* Language Button */}
        <button
          style={{
            border: "2px solid #ff2e6a",
            background: "white",
            borderRadius: 20,
            padding: "6px 14px",
            fontSize: 13,
            cursor: "pointer",
            color: "#ff2e6a",
            fontWeight: 600,
          }}
        >
          English
        </button>
      </div>

      {/* TAKE AWAY CARD */}
      <div
        onClick={() => changeType("Take Away")}
        style={{
          ...cardBase,
          border: "6px solid #FFC107",
          transform: "rotate(-3deg)",
          marginBottom: 30,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1600891964599-f61ba0e24092)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div style={overlay}></div>

        <div style={text}>
          <div style={{ fontSize: 40 }}>🥡</div>
          Take A Way
        </div>
      </div>

      {/* DINING CARD */}
      <div
        onClick={() => changeType("Dining")}
        style={{
          ...cardBase,
          border: "6px solid #ff2e6a",
          transform: "rotate(3deg)",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1550547660-d9450f859349)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div style={overlay}></div>

        <div style={text}>
          <div style={{ fontSize: 40 }}>🍔</div>
          Dining
        </div>
      </div>
    </div>
  );
}
