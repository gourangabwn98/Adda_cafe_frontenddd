// ─── pages/InvoicePage.jsx ───────────────────────────────────────────────────
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar.jsx";

export default function InvoicePage() {
  const nav = useNavigate();

  const invoices = [
    {
      id: "ALV09844545",
      status: "Take A Way",
      amount: 496,
      date: "06 Feb, 2026",
      time: "11:11 am",
    },
    {
      id: "APIJ9844654",
      status: "Dining",
      amount: 96,
      date: "06 Feb, 2026",
      time: "11:11 am",
    },
    {
      id: "ALV09844545",
      status: "Take A Way",
      amount: 199,
      date: "06 Feb, 2026",
      time: "06:11 pm",
    },
    {
      id: "APIJ9844654",
      status: "Dining",
      amount: 1198,
      date: "06 Feb, 2026",
      time: "07:30 pm",
    },
  ];

  const downloadInvoice = (orderId) => {
    alert("Download invoice for " + orderId);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
      }}
    >
      <TopBar title="Invoice" />

      <div style={{ padding: 16 }}>
        {invoices.map((item, i) => (
          <InvoiceCard
            key={i}
            item={item}
            onDownload={() => downloadInvoice(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

function InvoiceCard({ item, onDownload }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 14,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontWeight: 700 }}>Order ID : {item.id}</div>

          <div style={{ fontSize: 13, marginTop: 4 }}>
            Status :
            <span
              style={{
                color: item.status === "Dining" ? "#00a86b" : "#00a86b",
                fontWeight: 600,
                marginLeft: 4,
              }}
            >
              {item.status}
            </span>
          </div>

          <div style={{ fontSize: 13 }}>Total Amount : {item.amount}.00</div>
        </div>

        {/* Download Button */}
        <div
          onClick={onDownload}
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "1px solid #ddd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: 20,
          }}
        >
          ⬇️
        </div>
      </div>

      <div
        style={{
          borderTop: "1px dashed #ddd",
          marginTop: 12,
          paddingTop: 8,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          color: "#777",
        }}
      >
        <span>Date: {item.date}</span>
        <span>Time: {item.time}</span>
      </div>
    </div>
  );
}
