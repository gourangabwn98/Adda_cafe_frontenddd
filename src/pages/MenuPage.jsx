// pages/MenuPage.jsx
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

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      title: "Ramadan",
      subtitle: "IFTAR",
      offer: "Special Offer 40% off",
      emoji: "🌙",
    },
    {
      title: "Summer",
      subtitle: "COOLERS",
      offer: "Up to 30% Off on Beverages",
      emoji: "🥤",
    },
    {
      title: "Weekend",
      subtitle: "FEAST",
      offer: "Buy 1 Get 1 Free on Select Items",
      emoji: "🍔",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => setCurrentSlide(index);

  const orderId = localStorage.getItem("orderId");

  // Fetch categories
  useEffect(() => {
    getCategoriesWithImage().then((r) => {
      setCats(r.data);
      if (r.data?.length > 0) {
        setCat(r.data[0].category || "");
      }
    });
  }, []);

  // Fetch menu items
  useEffect(() => {
    if (!cat) return;

    setLoading(true);

    getMenu({
      category: cat,
      search,
      vegOnly,
    }).then((r) => {
      setItems(r.data || []);
      setLoading(false);
    });
  }, [cat, search, vegOnly]);

  const handleOrderType = async (type) => {
    setOrderType(type);
    if (!orderId) return;

    try {
      await changeOrderTypeById(orderId, { orderType: type });
    } catch (e) {
      console.error("Failed to update order type:", e);
    }
  };

  return (
    <div
      style={{ minHeight: "100vh", paddingBottom: 120, background: "#f8f8f8" }}
    >
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
          <div style={{ color: pink, fontWeight: 900, fontSize: 24 }}>
            আড্ডা
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <select
              value={orderType}
              onChange={(e) => handleOrderType(e.target.value)}
              style={{
                background: pink,
                color: white,
                border: "none",
                borderRadius: 16,
                padding: "6px 12px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <option value="Dining">Dining</option>
              <option value="Take Away">Take Away</option>
            </select>

            <button
              onClick={() => setVegOnly(!vegOnly)}
              style={{
                background: vegOnly ? "#2ecc71" : "#ddd",
                color: vegOnly ? white : "#555",
                border: "none",
                borderRadius: 16,
                padding: "6px 12px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {vegOnly ? "🥦 Veg Only" : "🍗 All"}
            </button>
          </div>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search Your Food"
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: 24,
            border: "1px solid #ddd",
            fontSize: 14,
            boxSizing: "border-box",
            outline: "none",
          }}
        />
      </div>

      {/* Banner Carousel */}
      <div
        style={{
          margin: "12px",
          borderRadius: 16,
          overflow: "hidden",
          position: "relative",
          background: "#000",
        }}
      >
        <div
          style={{
            display: "flex",
            transition: "transform 0.6s ease-in-out",
            transform: `translateX(-${currentSlide * 100}%)`,
            width: `${banners.length * 100}%`,
          }}
        >
          {banners.map((banner, idx) => (
            <div
              key={idx}
              style={{
                width: "100%",
                flexShrink: 0,
                background: "linear-gradient(135deg, #1a1a2e 0%, #e91e8c 100%)",
                padding: "16px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxSizing: "border-box",
              }}
            >
              <div>
                <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 12 }}>
                  {banner.title}
                </div>
                <div
                  style={{
                    color: white,
                    fontWeight: 900,
                    fontSize: 24,
                    lineHeight: 1.1,
                    margin: "4px 0",
                  }}
                >
                  {banner.subtitle}
                </div>
                <div style={{ color: "rgba(255,255,255,0.9)", fontSize: 12 }}>
                  {banner.offer}
                </div>
              </div>
              <div style={{ fontSize: 60 }}>{banner.emoji}</div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: 10,
          }}
        >
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                border: "none",
                background:
                  currentSlide === idx ? white : "rgba(255,255,255,0.45)",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
      </div>

      {/* Categories */}
      <div
        style={{
          display: "flex",
          gap: 16,
          padding: "12px 12px 8px",
          overflowX: "auto",
          scrollbarWidth: "none",
          whiteSpace: "nowrap",
        }}
      >
        {cats.map((c) => (
          <button
            key={c.category}
            onClick={() => setCat(c.category)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: 72,
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                border: `3px solid ${cat === c.category ? pink : "#e0e0e0"}`,
                overflow: "hidden",
                background: white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow:
                  cat === c.category
                    ? "0 0 0 4px rgba(233,30,140,0.18)"
                    : "none",
                transition: "all 0.2s",
              }}
            >
              {c.categoryImageUrl ? (
                <img
                  src={c.categoryImageUrl}
                  alt={c.category}
                  style={{ width: "85%", height: "85%", objectFit: "contain" }}
                />
              ) : (
                <span style={{ fontSize: 36 }}>{c.categoryImage || "🍔"}</span>
              )}
            </div>
            <span
              style={{
                marginTop: 6,
                fontSize: 12,
                fontWeight: cat === c.category ? 700 : 500,
                color: cat === c.category ? pink : "#444",
              }}
            >
              {c.category}
            </span>
          </button>
        ))}
      </div>

      {/* Items */}
      <div style={{ padding: "0 12px 20px" }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: 18,
            margin: "12px 0 8px",
            color: "#222",
          }}
        >
          {cat || "Menu"}
        </div>

        {loading ? (
          <Loader />
        ) : items.length === 0 ? (
          <div
            style={{ textAlign: "center", color: "#aaa", padding: "60px 20px" }}
          >
            No items found
          </div>
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
      </div>

      {/* Floating Cart Bar */}
      {itemCount > 0 && (
        <div
          onClick={() => nav("/cart")}
          style={{
            position: "fixed",
            bottom: 80,
            left: 16,
            right: 16,
            background: pink,
            borderRadius: 32,
            padding: "14px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
            boxShadow: "0 6px 20px rgba(233,30,140,0.35)",
            zIndex: 100,
          }}
        >
          <span
            style={{
              background: "rgba(255,255,255,0.35)",
              color: white,
              borderRadius: "50%",
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            {itemCount}
          </span>

          <span style={{ color: white, fontWeight: 700, fontSize: 15 }}>
            ₹{total.toFixed(2)}
          </span>

          <span style={{ color: white, fontWeight: 700, fontSize: 15 }}>
            View Cart →
          </span>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
