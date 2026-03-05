// ─── services/menuService.js ─────────────────────────────────────────────────
import api from "./api.js";
export const getMenu = (params) => api.get("/menu", { params });
export const getCategories = () => api.get("/menu/categories");
export const getCategoriesWithImage = () => api.get("/menu/categoriesimage");
