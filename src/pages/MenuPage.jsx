// ─── pages/MenuPage.jsx ───────────────────────────────────────────────────────
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart.js";
import { getMenu, getCategoriesWithImage } from "../services/menuService.js";

import FoodCard from "../components/FoodCard.jsx";
import BottomNav from "../components/BottomNav.jsx";
import Loader from "../components/Loader.jsx";
import { pink, white } from "../components/theme.js";
import { changeOrderTypeById } from "../services/orderService.js";

export default function MenuPage() {
  const nav = useNavigate();
  const { addItem, removeItem, getQty, itemCount, total } = useCart();

  const [items, setItems] = useState([]);
  const [cats, setCats] = useState([]);
  const [cat, setCat] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [orderType, setOrderType] = useState("Dining");
  const [vegOnly, setVegOnly] = useState(false);

  const orderId = localStorage.getItem("orderId");

  // Fetch categories
  useEffect(() => {
    getCategoriesWithImage().then((r) => {
      setCats(r.data);
      setCat(r.data[0]?.category || "");
    });
  }, []);

  // Fetch menu
  useEffect(() => {
    if (!cat) return;

    setLoading(true);

    getMenu({
      category: cat,
      search,
      vegOnly,
    }).then((r) => {
      setItems(r.data);
      setLoading(false);
    });
  }, [cat, search, vegOnly]);

  // Change order type
  const handleOrderType = async (type) => {
    setOrderType(type);

    try {
      await changeOrderTypeById(orderId, {
        orderType: type,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div style={{ minHeight: "100vh", paddingBottom: 120 }}>
      {/* Header */}
      <div
        style={{
          background: white,
          padding: "10px 16px",
          borderBottom: "1px solid #eee",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <div style={{ color: pink, fontWeight: 900, fontSize: 22 }}>
            আড্ডা
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            {/* Order Type Dropdown */}
            <select
              value={orderType}
              onChange={(e) => handleOrderType(e.target.value)}
              style={{
                background: pink,
                color: white,
                border: "none",
                borderRadius: 16,
                padding: "5px 12px",
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <option value="Dining">Dining</option>
              <option value="Take Away">Take Away</option>
            </select>

            {/* Veg Toggle */}
            <button
              onClick={() => setVegOnly(!vegOnly)}
              style={{
                background: vegOnly ? "#2ecc71" : "#ddd",
                color: vegOnly ? white : "#555",
                border: "none",
                borderRadius: 16,
                padding: "5px 12px",
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {vegOnly ? "🥦 Veg Only" : "🍗 All"}
            </button>
          </div>
        </div>

        {/* Search */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search Your Food"
          style={{
            width: "100%",
            padding: "9px 14px",
            borderRadius: 22,
            border: "1px solid #eee",
            fontSize: 13,
            boxSizing: "border-box",
            outline: "none",
          }}
        />
      </div>

      {/* Banner */}
      <div
        style={{
          background: "linear-gradient(135deg,#1a1a2e 0%,#e91e8c 100%)",
          margin: "12px",
          borderRadius: 14,
          padding: "14px 18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>
            Ramadan
          </div>

          <div
            style={{
              color: white,
              fontWeight: 900,
              fontSize: 22,
              lineHeight: 1,
            }}
          >
            IFTAR
          </div>

          <div
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: 11,
              marginTop: 4,
            }}
          >
            Special Offer 40% off
          </div>
        </div>

        <div style={{ fontSize: 54 }}>🌙</div>
      </div>

      {/* Categories */}
      <div
        style={{
          display: "flex",
          gap: 12,
          padding: "10px 12px",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {cats.map((c) => (
          <button
            key={c.category}
            onClick={() => setCat(c.category)}
            style={{
              borderRadius: "50%",
              border: `2px solid ${cat === c.category ? pink : "#ddd"}`,
              background: white,
              padding: 8,
              cursor: "pointer",
              minWidth: 60,
              minHeight: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 30 }}>{c.categoryImage}</span>
          </button>
        ))}
      </div>

      {/* Food List */}
      <div style={{ padding: "0 12px 10px" }}>
        <div style={{ fontWeight: 700, marginBottom: 10 }}>{cat}</div>

        {loading ? (
          <Loader />
        ) : (
          items.map((f) => (
            <FoodCard
              key={f._id}
              item={f}
              qty={getQty(f._id)}
              onAdd={() => addItem(f)}
              onRemove={() => removeItem(f._id)}
            />
          ))
        )}

        {!loading && items.length === 0 && (
          <div style={{ textAlign: "center", color: "#aaa", padding: 40 }}>
            No items found
          </div>
        )}
      </div>

      {/* Cart Bar */}
      {itemCount > 0 && (
        <div
          onClick={() => nav("/cart")}
          style={{
            position: "fixed",
            bottom: 70,
            left: 12,
            right: 12,
            background: pink,
            borderRadius: 28,
            padding: "14px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(233,30,140,0.4)",
          }}
        >
          <span
            style={{
              background: "rgba(255,255,255,0.3)",
              color: white,
              borderRadius: "50%",
              width: 26,
              height: 26,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 12,
            }}
          >
            {itemCount}
          </span>

          <span style={{ color: white, fontWeight: 700 }}>
            Your Cart · ₹{total}
          </span>

          <span style={{ color: white, fontWeight: 700 }}>View Cart ›</span>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
