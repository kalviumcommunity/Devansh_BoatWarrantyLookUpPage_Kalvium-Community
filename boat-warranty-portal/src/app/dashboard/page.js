"use client";

import { useState } from "react";
import Link from "next/link";
import Topbar from "@/components/Topbar";
import {
  SearchIcon,
  UploadIcon,
  BoxIcon,
  AlertTriangleIcon,
  CloudUploadIcon,
  FileIcon,
} from "@/components/Icons";

const LOOKUPS = [
  { id: "LKP1248", serial: "DT8S12345678", product: "boAt Rockerz 450", time: "14 May 2025, 11:45 AM", status: "found" },
  { id: "LKP1247", serial: "SN0987654321", product: "boAt Airdopes 141", time: "14 May 2025, 11:20 AM", status: "found" },
  { id: "LKP1246", serial: "SN1122334455", product: "boAt Nirvana Ion", time: "14 May 2025, 10:55 AM", status: "notfound" },
  { id: "LKP1245", serial: "SN5566778899", product: "boAt Stone 1200", time: "14 May 2025, 10:30 AM", status: "found" },
  { id: "LKP1244", serial: "SN6677889900", product: "boAt Rockerz 550", time: "14 May 2025, 10:10 AM", status: "found" },
];

export default function DashboardPage() {
  const [fileName, setFileName] = useState(null);
  const [dragging, setDragging] = useState(false);

  function handleFiles(files) {
    if (files && files.length) setFileName(files[0].name);
  }

  return (
    <>
      <Topbar title="Dashboard" subtitle="Overview of warranty system" />

      <div className="dash-content">
        <div className="stat-grid">
          <div className="stat-card">
            <div className="top">
              <div className="stat-ic" style={{ background: "#EAF1FF", color: "#2563EB" }}>
                <SearchIcon width="18" height="18" />
              </div>
              <span className="stat-delta up">↑ 12%</span>
            </div>
            <div className="label">Total Lookups</div>
            <div className="value">1,248</div>
          </div>
          <div className="stat-card">
            <div className="top">
              <div className="stat-ic" style={{ background: "var(--boat-green-bg)", color: "var(--boat-green)" }}>
                <UploadIcon width="18" height="18" />
              </div>
              <span className="stat-delta up">↑ 8%</span>
            </div>
            <div className="label">Warranties Uploaded</div>
            <div className="value">342</div>
          </div>
          <div className="stat-card">
            <div className="top">
              <div className="stat-ic" style={{ background: "#F3EBFF", color: "#7C3AED" }}>
                <BoxIcon width="18" height="18" />
              </div>
              <span className="stat-delta up">↑ 5%</span>
            </div>
            <div className="label">Total Products</div>
            <div className="value">256</div>
          </div>
          <div className="stat-card">
            <div className="top">
              <div className="stat-ic" style={{ background: "var(--boat-amber-bg)", color: "var(--boat-amber)" }}>
                <AlertTriangleIcon width="18" height="18" />
              </div>
              <span className="stat-delta down">↓ 4%</span>
            </div>
            <div className="label">Expiring Soon</div>
            <div className="value">18</div>
          </div>
        </div>

        <div className="panel" style={{ marginBottom: 22 }}>
          <div className="panel-head">
            <h3>Upload Warranty PDF</h3>
            <Link href="/dashboard/upload-warranties" className="link-red">Go to Uploads</Link>
          </div>
          <div
            className={dragging ? "dropzone drag" : "dropzone"}
            onClick={() => document.getElementById("dashFileInput").click()}
            onDragEnter={(e) => { e.preventDefault(); setDragging(true); }}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={(e) => { e.preventDefault(); setDragging(false); }}
            onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
          >
            <input
              id="dashFileInput"
              type="file"
              accept="application/pdf"
              style={{ display: "none" }}
              onChange={(e) => handleFiles(e.target.files)}
            />
            <div className="cloud"><CloudUploadIcon /></div>
            <div className="main-txt">Drag &amp; drop PDF file here</div>
            <div className="sub-txt">or</div>
            <button type="button" className="btn btn-primary" onClick={(e) => { e.stopPropagation(); document.getElementById("dashFileInput").click(); }}>
              Choose File
            </button>
            <div className="sub-txt" style={{ marginTop: 14, marginBottom: 0 }}>Max file size: 10MB</div>
            {fileName && (
              <div className="file-chip show">
                <FileIcon />
                <span>{fileName}</span>
              </div>
            )}
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <h3>Recent Warranty Lookups</h3>
            <Link href="/dashboard/warranty-lookups" className="link-red">View all</Link>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="wtable">
              <thead>
                <tr><th>Lookup ID</th><th>Serial Number</th><th>Product Name</th><th>Lookup Time</th><th>Status</th><th>Action</th></tr>
              </thead>
              <tbody>
                {LOOKUPS.map((l) => (
                  <tr key={l.id}>
                    <td>{l.id}</td>
                    <td>{l.serial}</td>
                    <td>{l.product}</td>
                    <td>{l.time}</td>
                    <td>
                      <span className={l.status === "found" ? "status-pill found" : "status-pill notfound"}>
                        {l.status === "found" ? "Found" : "Not Found"}
                      </span>
                    </td>
                    <td>
                      <span className="link-red" onClick={() => alert("Warranty details for serial: " + l.serial)}>
                        View Details
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
