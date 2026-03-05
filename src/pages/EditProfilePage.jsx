// ─── pages/EditProfilePage.jsx ───────────────────────────────────────────────
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { updateProfile } from "../services/authService.js";
import { useAuth } from "../hooks/useAuth.js";

import TopBar from "../components/TopBar.jsx";
import PinkBtn from "../components/PinkBtn.jsx";

import toast from "react-hot-toast";

export default function EditProfilePage() {
  const nav = useNavigate();
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [loading, setLoading] = useState(false);

  const save = async () => {
    if (!name) return toast.error("Enter name");

    try {
      setLoading(true);

      const { data } = await updateProfile({ name });

      updateUser(data);

      toast.success("Profile updated");

      nav("/account");
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopBar title="Edit Profile" />

      <div style={{ padding: 20 }}>
        <label
          style={{
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 6,
            display: "block",
          }}
        >
          Name
        </label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            border: "1px solid #ddd",
            borderRadius: 12,
            marginBottom: 20,
          }}
        />

        <PinkBtn onClick={save} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </PinkBtn>
      </div>
    </div>
  );
}
