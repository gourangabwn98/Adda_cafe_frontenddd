// ─── components/PinkBtn.jsx ──────────────────────────────────────────────────
import { pink, white } from "./theme.js";
export default function PinkBtn({ children, onClick, disabled, style = {} }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? "#ccc" : pink,
        color: white,
        border: "none",
        borderRadius: 25,
        padding: "13px 0",
        width: "100%",
        fontWeight: 700,
        fontSize: 14,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "opacity .2s",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
