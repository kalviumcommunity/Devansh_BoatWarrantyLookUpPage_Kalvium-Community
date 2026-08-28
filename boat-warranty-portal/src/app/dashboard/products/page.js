"use client";

import { useMemo, useState } from "react";
import Topbar from "@/components/Topbar";
import { SearchIcon, PlusIcon, HeadphonesIcon } from "@/components/Icons";

const PRODUCTS = [
  { name: "boAt Rockerz 450", category: "Headphones", count: 84 },
  { name: "boAt Airdopes 141", category: "True Wireless Earbuds", count: 156 },
  { name: "boAt Nirvana Ion", category: "TWS Earbuds", count: 42 },
  { name: "boAt Stone 1200", category: "Bluetooth Speaker", count: 65 },
  { name: "boAt Rockerz 550", category: "Headphones", count: 71 },
  { name: "boAt Airdopes 441", category: "True Wireless Earbuds", count: 98 },
  { name: "boAt Wave Flex", category: "Smartwatch", count: 33 },
  { name: "boAt Immortal 1300", category: "Gaming Headset", count: 27 },
];

const CATEGORIES = ["All categories", "Headphones", "True Wireless Earbuds", "TWS Earbuds", "Bluetooth Speaker", "Smartwatch", "Gaming Headset"];

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchesText = !q || p.name.toLowerCase().includes(q);
      const matchesCat = category === "All categories" || p.category === category;
      return matchesText && matchesCat;
    });
  }, [query, category]);

  return (
    <>
      <Topbar title="Products" subtitle="Manage the boAt product catalogue" />
      <div className="dash-content">
        <div className="panel">
          <div className="page-toolbar">
            <div className="toolbar-search">
              <span className="icon"><SearchIcon /></span>
              <input
                type="text"
                placeholder="Search products"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <select className="select-chip" value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <button className="btn btn-primary" onClick={() => alert("Add product form would open here (frontend demo).")}>
              <PlusIcon />
              Add Product
            </button>
          </div>
          <div className="products-grid">
            {filtered.map((p) => (
              <div className="product-card" key={p.name}>
                <div className="product-thumb"><HeadphonesIcon width="34" height="34" /></div>
                <div className="product-body">
                  <div className="pname">{p.name}</div>
                  <div className="pcat">{p.category}</div>
                  <div className="product-foot">
                    <span className="product-count">{p.count} units registered</span>
                    <span className="link-red" onClick={() => alert(`Editing ${p.name} (frontend demo).`)}>Edit</span>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ gridColumn: "1/-1", textAlign: "center", color: "var(--boat-muted)", padding: "24px 0" }}>
                No products match your filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
