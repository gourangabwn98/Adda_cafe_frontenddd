// ─── services/api.js  (axios base instance) ──────────────────────────────────
import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("addaUser") || "null");
  if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("addaUser");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  },
);

export default api;
