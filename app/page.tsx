"use client";

import { useEffect, useState } from "react";

type InventoryItem = {
  id: number;
  name: string;
  quantity: number;
  minThreshold: number;
};

export default function Home() {
  const [items, setItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/inventory`)
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        padding: "40px",
        fontFamily: "Inter, Arial, sans-serif",
        color: "#fff",
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: "30px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
          📦 Inventory Dashboard
        </h1>
        <p style={{ color: "#cbd5e1", marginTop: "8px" }}>
          Real-time visibility into material stock levels
        </p>
      </header>

      {/* Inventory Cards */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {items.length === 0 && (
          <p style={{ color: "#e5e7eb" }}>No inventory items available.</p>
        )}

        {items.map((item) => {
          const isLowStock = item.quantity < item.minThreshold;

          return (
            <div
              key={item.id}
              style={{
                background: "#111827",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
                border: isLowStock
                  ? "2px solid #ef4444"
                  : "2px solid transparent",
              }}
            >
              <h2 style={{ fontSize: "20px", fontWeight: 600 }}>
                {item.name}
              </h2>

              <div style={{ marginTop: "12px", color: "#d1d5db" }}>
                <p>
                  <strong>Quantity:</strong> {item.quantity}
                </p>
                <p>
                  <strong>Minimum Threshold:</strong> {item.minThreshold}
                </p>
              </div>

              {isLowStock ? (
                <div
                  style={{
                    marginTop: "16px",
                    padding: "8px 12px",
                    background: "#7f1d1d",
                    borderRadius: "8px",
                    color: "#fecaca",
                    fontWeight: 500,
                  }}
                >
                  ⚠ Low Stock – Reorder Required
                </div>
              ) : (
                <div
                  style={{
                    marginTop: "16px",
                    padding: "8px 12px",
                    background: "#064e3b",
                    borderRadius: "8px",
                    color: "#a7f3d0",
                    fontWeight: 500,
                  }}
                >
                  ✅ Stock Level Healthy
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Footer */}
      <footer style={{ marginTop: "60px", color: "#9ca3af" }}>
        <p>
          Built with Next.js & Express • Inventory Visibility System
        </p>
      </footer>
    </main>
  );
}

