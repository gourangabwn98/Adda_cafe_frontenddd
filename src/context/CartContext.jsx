// ─── context/CartContext.jsx ─────────────────────────────────────────────────
import { createContext, useState, useCallback } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orderType, setOrderType] = useState("Dining");

  const addItem = useCallback((item) => {
    setCart((prev) => {
      const ex = prev.find((x) => x._id === item._id);
      return ex
        ? prev.map((x) => (x._id === item._id ? { ...x, qty: x.qty + 1 } : x))
        : [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((id) => {
    setCart((prev) => {
      const ex = prev.find((x) => x._id === id);
      if (!ex) return prev;
      return ex.qty === 1
        ? prev.filter((x) => x._id !== id)
        : prev.map((x) => (x._id === id ? { ...x, qty: x.qty - 1 } : x));
    });
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const getQty = (id) => cart.find((x) => x._id === id)?.qty || 0;
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = Math.round(subtotal * 0.18);
  const discount = subtotal > 400 ? 10 : 0;
  const total = subtotal + tax - discount;
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clearCart,
        getQty,
        subtotal,
        tax,
        discount,
        total,
        itemCount,
        orderType,
        setOrderType,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
