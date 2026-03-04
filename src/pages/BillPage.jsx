// ─── pages/BillPage.jsx ───────────────────────────────────────────────────────
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderById } from "../services/orderService.js";
import TopBar from "../components/TopBar.jsx";
import PinkBtn from "../components/PinkBtn.jsx";
import BottomNav from "../components/BottomNav.jsx";
import Loader from "../components/Loader.jsx";
import { pink, dark, white } from "../components/theme.js";

export default function BillPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getOrderById(id).then((r) => setOrder(r.data));
  }, [id]);

  if (!order) return <Loader />;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <TopBar title="Generate Bill" back />
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 16,
          background: "#f8f8f8",
        }}
      >
        <div
          style={{
            background: white,
            borderRadius: 18,
            padding: 22,
            boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              background: "#f0f0f0",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 8px",
              fontSize: 30,
            }}
          >
            ☕
          </div>
          <div style={{ fontWeight: 900, fontSize: 18, color: dark }}>
            ADDA CAFE
          </div>
          <div style={{ color: "#999", fontSize: 11, marginBottom: 18 }}>
            {new Date(order.createdAt).toLocaleString()}
          </div>

          <div
            style={{
              background: "#ffd700",
              borderRadius: 22,
              padding: "6px 22px",
              display: "inline-block",
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            Total Payment
          </div>
          <div
            style={{
              fontWeight: 900,
              fontSize: 32,
              color: dark,
              marginBottom: 18,
            }}
          >
            ₹{order.total}
          </div>

          {order.items.map((f, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13,
                padding: "7px 0",
                borderBottom: "1px dashed #eee",
              }}
            >
              <span>
                {f.name} × {f.qty}
              </span>
              <span>₹{f.price * f.qty}</span>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              color: "#999",
              padding: "7px 0",
            }}
          >
            <span>GST (18%)</span>
            <span>₹{order.tax}</span>
          </div>
          {order.discount > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 12,
                color: "green",
                padding: "7px 0",
              }}
            >
              <span>Discount</span>
              <span>-₹{order.discount}</span>
            </div>
          )}

          {/* Barcode */}
          <div
            style={{
              margin: "18px 0",
              padding: 12,
              background: "#f5f5f5",
              borderRadius: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 0.8,
                justifyContent: "center",
                marginBottom: 4,
              }}
            >
              {Array.from({ length: 36 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i % 3 === 0 ? 3 : 1.5,
                    height: 44,
                    background: dark,
                  }}
                />
              ))}
            </div>
            <div style={{ fontSize: 10, color: "#888", letterSpacing: 2 }}>
              {order.orderId}
            </div>
          </div>
          <div style={{ color: "#aaa", fontSize: 11 }}>
            THANKS FOR VISIT AGAIN...
          </div>
        </div>
      </div>
      <div style={{ padding: 16 }}>
        <PinkBtn onClick={() => nav(`/payment/${id}`)}>
          Proceed to Payment
        </PinkBtn>
      </div>
      <BottomNav />
    </div>
  );
}
