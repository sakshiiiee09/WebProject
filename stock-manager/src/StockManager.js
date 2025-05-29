
import { useState, useEffect } from "react";

export default function StockManager() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", qty: "", location: "Ground" });

  useEffect(() => {
    const stored = localStorage.getItem("stock_items");
    if (stored) setItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("stock_items", JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (!form.name || !form.qty) return;
    const newItem = { ...form, qty: parseInt(form.qty), id: Date.now() };
    setItems([...items, newItem]);
    setForm({ name: "", qty: "", location: "Ground" });
  };

  const updateQty = (id, delta) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, qty: item.qty + delta } : item
      )
    );
  };

  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h1>Stock Manager</h1>
      <input
        placeholder="Search item..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.qty}
          onChange={(e) => setForm({ ...form, qty: e.target.value })}
        />
        <select
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        >
          <option>Ground</option>
          <option>Upper</option>
        </select>
        <button onClick={addItem}>Add Item</button>
      </div>
      {filtered.map((item) => (
        <div key={item.id} style={{ border: '1px solid #ccc', margin: '8px 0', padding: '8px' }}>
          <div>
            <strong>{item.name}</strong> (Qty: {item.qty}) - {item.location}
          </div>
          <button onClick={() => updateQty(item.id, 1)}>+1</button>
          <button onClick={() => updateQty(item.id, -1)} disabled={item.qty <= 0}>-1</button>
        </div>
      ))}
    </div>
  );
}
