// ─── pages/CartPage.jsx ───────────────────────────────────────────────────────
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart.js";
import { useAuth } from "../hooks/useAuth.js";
import { placeOrder } from "../services/orderService.js";
import TopBar from "../components/TopBar.jsx";
import QtyBtn from "../components/QtyBtn.jsx";
import PinkBtn from "../components/PinkBtn.jsx";
import { pink, white } from "../components/theme.js";
import toast from "react-hot-toast";
import { useState } from "react";

export default function CartPage() {
  const nav = useNavigate();
  const {
    cart,
    addItem,
    removeItem,
    subtotal,
    tax,
    discount,
    total,
    itemCount,
    clearCart,
    orderType,
  } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (!user) return nav("/login");
    try {
      setLoading(true);
      const items = cart.map((i) => ({ menuItemId: i._id, qty: i.qty }));
      const { data } = await placeOrder({ items, orderType });
      clearCart();
      nav(`/order-placed/${data._id}`);
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <TopBar
        title="Cart"
        back
        right={
          <button
            onClick={() => nav("/menu")}
            style={{
              background: "#222",
              color: white,
              border: "none",
              borderRadius: 15,
              padding: "4px 12px",
              fontSize: 11,
              cursor: "pointer",
            }}
          >
            + Add More
          </button>
        }
      />

      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        {cart.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              marginTop: 80,
              color: "#bbb",
              fontSize: 15,
            }}
          >
            🛒 Your cart is empty
          </div>
        ) : (
          cart.map((f) => (
            <div
              key={f._id}
              style={{
                display: "flex",
                gap: 12,
                marginBottom: 14,
                padding: 14,
                background: white,
                borderRadius: 14,
                boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: 38 }}>{f.image}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{f.name}</div>
                <div style={{ color: pink, fontWeight: 800 }}>₹{f.price}</div>
              </div>
              <QtyBtn
                qty={f.qty}
                onAdd={() => addItem(f)}
                onRemove={() => removeItem(f._id)}
              />
            </div>
          ))
        )}

        {cart.length > 0 && (
          <div
            style={{
              background: white,
              borderRadius: 14,
              padding: 16,
              marginTop: 6,
              boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 14, fontSize: 15 }}>
              Order Summary
            </div>
            {cart.map((f) => (
              <div
                key={f._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 13,
                  marginBottom: 7,
                  color: "#555",
                }}
              >
                <span>
                  {f.name} × {f.qty}
                </span>
                <span>₹{f.price * f.qty}</span>
              </div>
            ))}
            <hr
              style={{
                border: "none",
                borderTop: "1px dashed #eee",
                margin: "10px 0",
              }}
            />
            <Row label="Subtotal" val={`₹${subtotal}`} />
            <Row label="GST (18%)" val={`₹${tax}`} small />
            {discount > 0 && (
              <Row label="Discount" val={`-₹${discount}`} small green />
            )}
            <hr
              style={{
                border: "none",
                borderTop: "1.5px solid #eee",
                margin: "10px 0",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: 800,
                fontSize: 15,
              }}
            >
              <span>Total Bill</span>
              <span style={{ color: pink }}>₹{total}</span>
            </div>
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div style={{ padding: 16 }}>
          <PinkBtn onClick={handlePlaceOrder} disabled={loading}>
            {loading ? "Placing…" : "Place Order"}
          </PinkBtn>
        </div>
      )}
    </div>
  );
}

const Row = ({ label, val, small, green }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      fontSize: small ? 12 : 13,
      color: green ? "green" : "#777",
      marginBottom: 6,
    }}
  >
    <span>{label}</span>
    <span>{val}</span>
  </div>
);
