// ─── components/QtyBtn.jsx ───────────────────────────────────────────────────
import { pink, white } from "./theme.js";
export default function QtyBtn({ qty, onAdd, onRemove }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <button
        onClick={onRemove}
        style={{
          width: 26,
          height: 26,
          borderRadius: "50%",
          border: `1.5px solid ${pink}`,
          background: white,
          color: pink,
          cursor: "pointer",
          fontWeight: 700,
          fontSize: 16,
          lineHeight: 1,
        }}
      >
        −
      </button>
      <span style={{ fontWeight: 700, minWidth: 18, textAlign: "center" }}>
        {qty}
      </span>
      <button
        onClick={onAdd}
        style={{
          width: 26,
          height: 26,
          borderRadius: "50%",
          border: "none",
          background: pink,
          color: white,
          cursor: "pointer",
          fontWeight: 700,
          fontSize: 16,
          lineHeight: 1,
        }}
      >
        +
      </button>
    </div>
  );
}
