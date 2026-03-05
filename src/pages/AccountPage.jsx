// ─── pages/AccountPage.jsx ───────────────────────────────────────────────────
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { updateProfile } from "../services/authService.js";

import TopBar from "../components/TopBar.jsx";
import BottomNav from "../components/BottomNav.jsx";
import PinkBtn from "../components/PinkBtn.jsx";
import { pink, white } from "../components/theme.js";

import toast from "react-hot-toast";

export default function AccountPage() {
  const nav = useNavigate();
  const { user, logout, updateUser } = useAuth();

  const [vegMode, setVegMode] = useState(user?.vegMode || false);
  const [saving, setSaving] = useState(false);

  const toggleVeg = async () => {
    const next = !vegMode;
    setVegMode(next);

    try {
      setSaving(true);
      const { data } = await updateProfile({ vegMode: next });
      updateUser(data);

      toast.success(next ? "Veg Mode ON 🥗" : "Veg Mode OFF");
    } catch {
      setVegMode(!next);
      toast.error("Failed to update preference");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    nav("/");
    toast.success("Logged out!");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopBar title="My Account" />

      {/* Scroll Area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 16,
          paddingBottom: 110,
        }}
      >
        {/* Profile Header */}
        <div
          style={{
            background: pink,
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
            color: white,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 60,
                height: 60,
                background: "rgba(255,255,255,0.25)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
              }}
            >
              👤
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>
                {user?.name || "User"}
              </div>
              <div style={{ opacity: 0.8, fontSize: 13 }}>
                +91 {user?.phone}
              </div>
            </div>

            <button
              onClick={() => nav("/edit")}
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "none",
                color: white,
                borderRadius: 16,
                padding: "6px 14px",
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              Edit
            </button>
          </div>
        </div>

        {/* Preference */}
        <Card title="Your Preference">
          <Row icon="🥗" label="Veg Mode">
            <div
              onClick={toggleVeg}
              style={{
                width: 46,
                height: 26,
                borderRadius: 13,
                background: vegMode ? "green" : "#ddd",
                cursor: "pointer",
                position: "relative",
                transition: "0.3s",
                opacity: saving ? 0.6 : 1,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 3,
                  left: vegMode ? 22 : 3,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: white,
                  transition: "0.3s",
                }}
              />
            </div>
          </Row>

          <Row icon="🌐" label="Language">
            <span style={{ color: pink, fontWeight: 600 }}>
              {user?.language || "English"}
            </span>
          </Row>
        </Card>

        {/* Invoice */}
        <Card title="Invoice">
          <Row
            icon="📥"
            label="Download Invoices"
            onClick={() => nav("/invoices")}
          >
            <span>›</span>
          </Row>
        </Card>

        {/* More */}
        <Card title="More">
          <Row icon="💬" label="Send Feedback">
            <span>›</span>
          </Row>

          <Row icon="ℹ️" label="About Us">
            <span>›</span>
          </Row>

          <Row icon="⚙️" label="Settings">
            <span>›</span>
          </Row>
        </Card>

        {/* Logout */}
        <PinkBtn
          onClick={handleLogout}
          style={{
            background: "#f44336",
            marginTop: 12,
          }}
        >
          Log Out
        </PinkBtn>
      </div>

      <BottomNav />
    </div>
  );
}

const Card = ({ title, children }) => (
  <div
    style={{
      background: white,
      borderRadius: 14,
      padding: 16,
      marginBottom: 14,
      boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
    }}
  >
    <div style={{ fontWeight: 700, marginBottom: 10 }}>{title}</div>

    {children}
  </div>
);

const Row = ({ icon, label, children, onClick }) => (
  <div
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 0",
      borderBottom: "1px solid #f3f3f3",
      cursor: onClick ? "pointer" : "default",
    }}
  >
    <span style={{ fontSize: 18 }}>{icon}</span>
    <span style={{ flex: 1 }}>{label}</span>
    {children}
  </div>
);
