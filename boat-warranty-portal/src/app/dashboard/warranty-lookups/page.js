"use client";

import { useMemo, useState } from "react";
import Topbar from "@/components/Topbar";
import { SearchIcon, DownloadIcon } from "@/components/Icons";

const ROWS = [
  { id: "LKP1248", serial: "DT8S12345678", product: "boAt Rockerz 450", time: "14 May 2025, 11:45 AM", status: "found" },
  { id: "LKP1247", serial: "SN0987654321", product: "boAt Airdopes 141", time: "14 May 2025, 11:20 AM", status: "found" },
  { id: "LKP1246", serial: "SN1122334455", product: "boAt Nirvana Ion", time: "14 May 2025, 10:55 AM", status: "notfound" },
  { id: "LKP1245", serial: "SN5566778899", product: "boAt Stone 1200", time: "14 May 2025, 10:30 AM", status: "found" },
  { id: "LKP1244", serial: "SN6677889900", product: "boAt Rockerz 550", time: "14 May 2025, 10:10 AM", status: "found" },
  { id: "LKP1243", serial: "SN7788990011", product: "boAt Airdopes 441", time: "14 May 2025, 09:52 AM", status: "found" },
  { id: "LKP1242", serial: "SN8899001122", product: "boAt Wave Flex", time: "14 May 2025, 09:30 AM", status: "notfound" },
  { id: "LKP1241", serial: "SN9900112233", product: "boAt Rockerz 245", time: "13 May 2025, 06:14 PM", status: "found" },
  { id: "LKP1240", serial: "SN0011223344", product: "boAt Immortal 1300", time: "13 May 2025, 05:47 PM", status: "found" },
  { id: "LKP1239", serial: "SN1234567890", product: "boAt Storm Call", time: "13 May 2025, 04:58 PM", status: "found" },
];

export default function WarrantyLookupsPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ROWS.filter((r) => {
      const matchesText = !q || r.serial.toLowerCase().includes(q) || r.product.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || r.status === statusFilter;
      return matchesText && matchesStatus;
    });
  }, [query, statusFilter]);

  return (
    <>
      <Topbar title="Warranty Lookups" subtitle="Search and review all warranty lookup activity" />
      <div className="dash-content">
        <div className="panel">
          <div className="page-toolbar">
            <div className="toolbar-search">
              <span className="icon"><SearchIcon /></span>
              <input
                type="text"
                placeholder="Search by serial number or product name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <select className="select-chip" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All statuses</option>
              <option value="found">Found</option>
              <option value="notfound">Not Found</option>
            </select>
            <button className="btn btn-outline">
              <DownloadIcon />
              Export CSV
            </button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="wtable">
              <thead>
                <tr><th>Lookup ID</th><th>Serial Number</th><th>Product Name</th><th>Lookup Time</th><th>Status</th><th>Action</th></tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.serial}</td>
                    <td>{r.product}</td>
                    <td>{r.time}</td>
                    <td>
                      <span className={r.status === "found" ? "status-pill found" : "status-pill notfound"}>
                        {r.status === "found" ? "Found" : "Not Found"}
                      </span>
                    </td>
                    <td>
                      <span className="link-red" onClick={() => alert("Warranty details for serial: " + r.serial)}>
                        View Details
                      </span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} style={{ textAlign: "center", color: "var(--boat-muted)", padding: "24px 20px" }}>No results match your filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", fontSize: "0.8125rem", color: "var(--boat-muted)" }}>
            <span>Showing 1 to {filtered.length} of 1,248 entries</span>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn btn-outline" style={{ padding: "6px 11px" }}>‹</button>
              <button className="btn btn-primary" style={{ padding: "6px 12px" }}>1</button>
              <button className="btn btn-outline" style={{ padding: "6px 12px" }}>2</button>
              <button className="btn btn-outline" style={{ padding: "6px 12px" }}>3</button>
              <button className="btn btn-outline" style={{ padding: "6px 11px" }}>›</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}