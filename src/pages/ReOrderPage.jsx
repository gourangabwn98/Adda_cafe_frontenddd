// ─── pages/ReOrderPage.jsx ───────────────────────────────────────────────────
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderById } from "../services/orderService.js";
import { useCart } from "../hooks/useCart.js";
import { placeOrder } from "../services/orderService.js";
import TopBar from "../components/TopBar.jsx";
import QtyBtn from "../components/QtyBtn.jsx";
import PinkBtn from "../components/PinkBtn.jsx";
import Loader from "../components/Loader.jsx";
import { pink, white } from "../components/theme.js";
import toast from "react-hot-toast";

export default function ReOrderPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const {
    addItem,
    removeItem,
    getQty,
    cart,
    subtotal,
    tax,
    discount,
    total,
    clearCart,
  } = useCart();
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getOrderById(id).then((r) => {
      const mapped = r.data.items.map((i) => ({
        _id: i.menuItem,
        name: i.name,
        price: i.price,
        image: "🍔",
      }));
      setItems(mapped);
      mapped.forEach((m) => addItem(m));
      setLoading(false);
    });
  }, [id]);

  const handlePlace = async () => {
    try {
      setPlacing(true);
      const payload = cart.map((i) => ({ menuItemId: i._id, qty: i.qty }));
      const { data } = await placeOrder({ items: payload });
      clearCart();
      nav(`/order-placed/${data._id}`);
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed");
    } finally {
      setPlacing(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <TopBar title="Re Order" back />
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        {items.map((f) => (
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
            <div style={{ fontSize: 36 }}>{f.image}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{f.name}</div>
              <div style={{ color: pink, fontWeight: 800 }}>₹{f.price}</div>
            </div>
            <QtyBtn
              qty={getQty(f._id)}
              onAdd={() => addItem(f)}
              onRemove={() => removeItem(f._id)}
            />
          </div>
        ))}
        {total > 0 && (
          <div
            style={{
              background: white,
              borderRadius: 14,
              padding: 16,
              boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 10 }}>
              Order Summary
            </div>
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
      <div style={{ padding: 16 }}>
        <PinkBtn onClick={handlePlace} disabled={placing}>
          {placing ? "Placing…" : "Place Order"}
        </PinkBtn>
      </div>
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
