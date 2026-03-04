// ─── services/orderService.js ────────────────────────────────────────────────
import api from "./api.js";
export const placeOrder = (data) => api.post("/orders", data);
export const getMyOrders = () => api.get("/orders/my");
export const getOrderById = (id) => api.get(`/orders/${id}`);
export const cancelOrder = (id) => api.put(`/orders/${id}/cancel`);
export const payOrder = (id) => api.put(`/orders/${id}/pay`);
export const rateOrder = (id, rating) =>
  api.put(`/orders/${id}/rate`, { rating });
