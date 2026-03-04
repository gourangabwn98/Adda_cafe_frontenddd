// ─── components/Badge.jsx ────────────────────────────────────────────────────
export default function Badge({ veg }) {
  const c = veg ? "green" : "red";
  return (
    <span
      style={{
        border: `2px solid ${c}`,
        padding: "1px 6px",
        borderRadius: 3,
        fontSize: 9,
        color: c,
        fontWeight: 700,
        letterSpacing: 0.5,
      }}
    >
      ● {veg ? "VEG" : "NON VEG"}
    </span>
  );
}
