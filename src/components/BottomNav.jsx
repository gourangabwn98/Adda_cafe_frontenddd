// ─── components/BottomNav.jsx ────────────────────────────────────────────────
import { useNavigate, useLocation } from "react-router-dom";
import { pink, white } from "./theme.js";

const NAV = [
  { label: "Menu", icon: "🍽️", path: "/menu" },
  { label: "Generate Bill", icon: "🧾", path: "/orders" },
  { label: "Orders", icon: "📦", path: "/orders" },
  { label: "Account", icon: "👤", path: "/account" },
];

export default function BottomNav() {
  const nav = useNavigate();
  const loc = useLocation();

  return (
    <div
      style={{
        display: "flex",
        borderTop: "1px solid #eee",
        background: white,
        position: "fixed", // ⭐ changed from sticky
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
        height: 60,
      }}
    >
      {NAV.map((i) => {
        const active = loc.pathname === i.path;

        return (
          <button
            key={i.label}
            onClick={() => nav(i.path)}
            style={{
              flex: 1,
              padding: "8px 0",
              border: "none",
              background: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <span style={{ fontSize: 18 }}>{i.icon}</span>

            <span
              style={{
                fontSize: 10,
                color: active ? pink : "#999",
                fontWeight: active ? 700 : 400,
              }}
            >
              {i.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
