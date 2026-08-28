"use client";

import { useMemo, useState } from "react";
import Topbar from "@/components/Topbar";
import { SearchIcon } from "@/components/Icons";

const REPAIRS = [
  { id: "SRV1234567", product: "boAt Rockerz 450", serial: "DT8S12345678", date: "10 Feb 2025", issue: "Sound distortion in left earcup", status: "completed", label: "Completed", center: "boAt Service Center - Mumbai" },
  { id: "SRV1234568", product: "boAt Airdopes 141", serial: "SN0987654321", date: "09 Feb 2025", issue: "Mic not working", status: "completed", label: "Completed", center: "boAt Service Center - Delhi" },
  { id: "SRV1234569", product: "boAt Stone 1200", serial: "SN5566778899", date: "08 Feb 2025", issue: "Bluetooth pairing issue", status: "found", label: "In Progress", center: "boAt Service Center - Kochi" },
  { id: "SRV1234570", product: "boAt Rockerz 550", serial: "SN6677889900", date: "07 Feb 2025", issue: "Sound not working", status: "completed", label: "Completed", center: "boAt Service Center - Pune" },
  { id: "SRV1234571", product: "boAt Wave Flex", serial: "SN8899001122", date: "05 Feb 2025", issue: "Screen not responding", status: "notfound", label: "Pending", center: "boAt Service Center - Bengaluru" },
];

export default function RepairHistoryPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return REPAIRS.filter((r) => {
      const text = `${r.id} ${r.product} ${r.serial} ${r.issue} ${r.center}`.toLowerCase();
      const matchesText = !q || text.includes(q);
      const matchesStatus = statusFilter === "all" || r.status === statusFilter;
      return matchesText && matchesStatus;
    });
  }, [query, statusFilter]);

  return (
    <>
      <Topbar title="Repair History" subtitle="Track service requests across all service centers" />
      <div className="dash-content">
        <div className="panel">
          <div className="page-toolbar">
            <div className="toolbar-search">
              <span className="icon"><SearchIcon /></span>
              <input
                type="text"
                placeholder="Search by service ID, product, or serial number"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <select className="select-chip" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All statuses</option>
              <option value="completed">Completed</option>
              <option value="found">In Progress</option>
              <option value="notfound">Pending</option>
            </select>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="wtable">
              <thead>
                <tr><th>Service ID</th><th>Product</th><th>Serial Number</th><th>Request Date</th><th>Issue Reported</th><th>Status</th><th>Service Center</th><th>Details</th></tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id + r.issue}>
                    <td>{r.id}</td>
                    <td>{r.product}</td>
                    <td>{r.serial}</td>
                    <td>{r.date}</td>
                    <td>{r.issue}</td>
                    <td><span className={`status-pill ${r.status}`}>{r.label}</span></td>
                    <td>{r.center}</td>
                    <td>
                      <span className="link-red" onClick={() => alert("Repair ticket: " + r.id)}>View</span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={8} style={{ textAlign: "center", color: "var(--boat-muted)", padding: "24px 20px" }}>No results match your filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", fontSize: "0.8125rem", color: "var(--boat-muted)" }}>
            <span>Showing 1 to {filtered.length} of 342 entries</span>
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
