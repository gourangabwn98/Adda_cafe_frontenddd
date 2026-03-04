// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

// ─── main.jsx ────────────────────────────────────────────────────────────────
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2500,
            style: { borderRadius: 12, fontWeight: 600 },
          }}
        />
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
);
