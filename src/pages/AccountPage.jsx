// ─── pages/AccountPage.jsx ───────────────────────────────────────────────────
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { updateProfile } from "../services/authService.js";
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
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {/* Pink header */}
      <div style={{ background: pink, padding: "24px 16px 48px" }}>
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
            <div style={{ color: white, fontWeight: 800, fontSize: 17 }}>
              {user?.name || "User"}
            </div>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 12 }}>
              +91 {user?.phone}
            </div>
          </div>
          <button
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              color: white,
              borderRadius: 16,
              padding: "5px 14px",
              fontSize: 11,
              cursor: "pointer",
            }}
          >
            Edit
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: 16, marginTop: -28 }}>
        {/* Preference card */}
        <Card title="Your Preference">
          <Row2 icon="🥗" label="Veg Mode">
            <div
              onClick={toggleVeg}
              style={{
                width: 46,
                height: 26,
                borderRadius: 13,
                background: vegMode ? "green" : "#ddd",
                cursor: "pointer",
                position: "relative",
                transition: "background .3s",
                opacity: saving ? 0.5 : 1,
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
                  transition: "left .3s",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                }}
              />
            </div>
          </Row2>
          <Row2 icon="🌐" label="Language">
            <span style={{ color: pink, fontSize: 13, fontWeight: 600 }}>
              {user?.language || "English"}
            </span>
          </Row2>
        </Card>

        {/* Invoice */}
        <Card title="Invoice">
          <Row2
            icon="📥"
            label="Download Invoices"
            onClick={() => nav("/orders")}
          >
            <span style={{ color: "#bbb" }}>›</span>
          </Row2>
        </Card>

        {/* More */}
        <Card title="More">
          {[
            ["💬", "Send Your Feedback"],
            ["ℹ️", "About Us"],
            ["⚙️", "Settings"],
          ].map(([icon, label]) => (
            <Row2 key={label} icon={icon} label={label}>
              <span style={{ color: "#bbb" }}>›</span>
            </Row2>
          ))}
        </Card>

        <PinkBtn
          onClick={handleLogout}
          style={{ background: "#f44336", marginTop: 8 }}
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
    <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 15 }}>
      {title}
    </div>
    {children}
  </div>
);
const Row2 = ({ icon, label, children, onClick }) => (
  <div
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "9px 0",
      borderBottom: "1px solid #f5f5f5",
      cursor: onClick ? "pointer" : "default",
    }}
  >
    <span style={{ fontSize: 18 }}>{icon}</span>
    <span style={{ flex: 1, fontSize: 13 }}>{label}</span>
    {children}
  </div>
);
