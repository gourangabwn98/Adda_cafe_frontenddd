// ─── services/authService.js ─────────────────────────────────────────────────
import api from "./api.js";
export const sendOTP = (phone) => api.post("/auth/send-otp", { phone });
export const verifyOTP = (phone, otp, name) =>
  api.post("/auth/verify-otp", { phone, otp, name });
export const getProfile = () => api.get("/auth/profile");
export const updateProfile = (data) => api.put("/auth/profile", data);
