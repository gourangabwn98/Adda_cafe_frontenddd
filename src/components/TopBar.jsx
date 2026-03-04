// ─── components/TopBar.jsx ───────────────────────────────────────────────────
import { useNavigate } from "react-router-dom";
import { white } from "./theme.js";

export default function TopBar({ title, back, onBack, right }) {
  const nav = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "12px 16px",
        background: white,
        borderBottom: "1px solid #eee",
        gap: 10,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {back && (
        <button
          onClick={onBack || (() => nav(-1))}
          style={{
            background: "none",
            border: "none",
            fontSize: 22,
            cursor: "pointer",
            lineHeight: 1,
          }}
        >
          ‹
        </button>
      )}
      <span style={{ fontWeight: 700, fontSize: 16, flex: 1 }}>{title}</span>
      {right}
    </div>
  );
}
