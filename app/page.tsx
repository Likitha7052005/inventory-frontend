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
    fetch("http://localhost:5001/inventory")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <main style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Inventory Dashboard</h1>

      {items.length === 0 && <p>No inventory items found.</p>}

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <strong>{item.name}</strong>
          <p>Quantity: {item.quantity}</p>
          <p>Minimum Threshold: {item.minThreshold}</p>

          {item.quantity < item.minThreshold && (
            <p style={{ color: "red" }}>⚠ Low Stock</p>
          )}
        </div>
      ))}
    </main>
  );
}

