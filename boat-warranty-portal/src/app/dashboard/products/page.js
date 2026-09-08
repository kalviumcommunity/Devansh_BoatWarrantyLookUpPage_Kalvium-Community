"use client";

import { useEffect, useState } from "react";
import Topbar from "@/components/Topbar";
import { SearchIcon, HeadphonesIcon, FileIcon } from "@/components/Icons";

function warrantyStatus(purchaseDate, warrantyDurationMonths) {
  const expiry = new Date(purchaseDate);
  expiry.setMonth(expiry.getMonth() + warrantyDurationMonths);
  return expiry >= new Date() ? "ACTIVE" : "EXPIRED";
}

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) return;

    const timer = setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `/api/admin/products?search=${encodeURIComponent(trimmed)}`,
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Search failed");
        setResults(data.results || []);
      } catch (err) {
        setError(err.message);
        setResults([]);
      } finally {
        setLoading(false);
        setSearched(true);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <>
      <Topbar
        title="Products"
        subtitle="Search the registered product catalogue by serial number"
      />
      <div className="dash-content">
        <div className="panel">
          <div className="page-toolbar">
            <div className="toolbar-search">
              <span className="icon">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search by exact serial number"
                value={query}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase();
                  setQuery(value);
                  if (!value.trim()) {
                    setResults([]);
                    setError("");
                    setSearched(false);
                  }
                }}
              />
            </div>
          </div>

          {error && (
            <div className="error-box show" style={{ margin: "0 20px 16px" }}>
              {error}
            </div>
          )}

          <div className="products-grid">
            {results.map((product) => {
              const status = warrantyStatus(
                product.purchaseDate,
                product.warrantyDurationMonths,
              );
              return (
                <div className="product-card" key={product.serialNumber}>
                  <div className="product-thumb">
                    <HeadphonesIcon width="34" height="34" />
                  </div>
                  <div className="product-body">
                    <div className="pname">{product.modelName}</div>
                    <div className="pcat">{product.serialNumber}</div>
                    <div className="product-foot">
                      <span className="product-count">
                        {new Date(product.purchaseDate).toLocaleDateString()}{" "}
                        · {product.warrantyDurationMonths} mo
                      </span>
                      <span
                        className={`status-pill ${
                          status === "ACTIVE" ? "completed" : "notfound"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                    <div
                      style={{
                        marginTop: 10,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: "0.75rem",
                        color: "var(--boat-muted)",
                      }}
                    >
                      <FileIcon />
                      {product.documents.length} warranty document
                      {product.documents.length === 1 ? "" : "s"}
                    </div>
                  </div>
                </div>
              );
            })}
            {!loading && searched && results.length === 0 && (
              <div
                style={{
                  gridColumn: "1/-1",
                  textAlign: "center",
                  color: "var(--boat-muted)",
                  padding: "24px 0",
                }}
              >
                No product matches that serial number.
              </div>
            )}
            {!searched && !loading && (
              <div
                style={{
                  gridColumn: "1/-1",
                  textAlign: "center",
                  color: "var(--boat-muted)",
                  padding: "24px 0",
                }}
              >
                Enter a serial number to search the registry.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
