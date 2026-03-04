// ─── components/FoodCard.jsx ─────────────────────────────────────────────────
import QtyBtn from "./QtyBtn.jsx";
import Badge from "./Badge.jsx";
import { pink, white } from "./theme.js";

export default function FoodCard({ item, qty, onAdd, onRemove }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        marginBottom: 14,
        padding: 12,
        background: white,
        borderRadius: 14,
        boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>
          {item.name}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 4,
          }}
        >
          <span style={{ color: pink, fontWeight: 800, fontSize: 14 }}>
            ₹{item.price}
          </span>
          {item.originalPrice && (
            <span
              style={{
                textDecoration: "line-through",
                color: "#aaa",
                fontSize: 11,
              }}
            >
              ₹{item.originalPrice}
            </span>
          )}
        </div>
        <div
          style={{
            fontSize: 11,
            color: "#888",
            marginBottom: 6,
            lineHeight: 1.4,
          }}
        >
          {item.description}
        </div>
        <Badge veg={item.tag === "Veg"} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          minWidth: 72,
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 12,
            background: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 38,
          }}
        >
          {item.image}
        </div>
        {qty === 0 ? (
          <button
            onClick={onAdd}
            style={{
              background: pink,
              color: white,
              border: "none",
              borderRadius: 15,
              padding: "5px 14px",
              fontSize: 12,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Add +
          </button>
        ) : (
          <QtyBtn qty={qty} onAdd={onAdd} onRemove={onRemove} />
        )}
      </div>
    </div>
  );
}
