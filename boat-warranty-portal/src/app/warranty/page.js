"use client";

import { useState } from "react";
import Link from "next/link";
import {
  UserIcon,
  CartIcon,
  SearchIcon,
  ChevronDownIcon,
  ScanIcon,
  InfoIcon,
  AlertCircleIcon,
  ShieldIcon,
  FileIcon,
  WrenchIcon,
} from "@/components/Icons";

const KNOWN_SERIAL = "DT8S12345678";

const REPAIRS = [
  { id: "SRV1234567", date: "10 Feb 2025", issue: "Sound distortion in left earcup", center: "boAt Service Center - Mumbai" },
  { id: "SRV1234567", date: "10 Feb 2025", issue: "Mic not working", center: "boAt Service Center - Delhi" },
  { id: "SRV1234567", date: "10 Feb 2025", issue: "Sound distortion in right earcup", center: "boAt Service Center - Kochi" },
  { id: "SRV1234567", date: "10 Feb 2025", issue: "Sound not working", center: "boAt Service Center - Pune" },
];

export default function WarrantyPage() {
  const [serial, setSerial] = useState("");
  const [status, setStatus] = useState("idle"); // idle | found | notfound | empty

  function handleSubmit(e) {
    e.preventDefault();
    const val = serial.trim().toUpperCase();

    if (!val) {
      setStatus("empty");
      return;
    }
    setStatus(val === KNOWN_SERIAL ? "found" : "notfound");
  }

  return (
    <>
      {/* Store header */}
      <header className="store-header">
        <div className="store-nav">
          <div className="boat-logo on-dark" style={{ fontSize: "1.3rem" }}>
            bo<span className="accent">A</span>t
          </div>
          <div className="navlink">
            Categories <ChevronDownIcon />
          </div>
          <div className="navlink">Daily Deals</div>
          <div className="navlink">Gift with boAt</div>
          <div className="navlink">
            More <ChevronDownIcon />
          </div>
          <div className="store-search">
            <SearchIcon width="14" height="14" />
            <input type="text" placeholder='Search "boAt Airdopes"' />
          </div>
          <Link href="/signin" className="store-icon-btn" title="Account">
            <UserIcon width="19" height="19" />
          </Link>
          <div className="store-icon-btn" title="Cart">
            <CartIcon />
            <span className="cart-badge">0</span>
          </div>
        </div>
      </header>

      {/* Hero / lookup */}
      <section className="hero">
        <div>
          <h1>
            Check your
            <br />
            <span className="red">Warranty Status</span>
          </h1>
          <p>Enter your product details to check warranty status and repair history</p>
        </div>

        <div className="serial-card">
          <h3>Enter your Serial Number</h3>
          <form onSubmit={handleSubmit} noValidate>
            <div className="field-input-wrap">
              <span className="icon">
                <ScanIcon />
              </span>
              <input
                className={status === "empty" ? "field-input field-error" : "field-input"}
                type="text"
                value={serial}
                onChange={(e) => setSerial(e.target.value)}
                placeholder="e.g. DT8S12345678"
              />
            </div>
            <div className="hint-text">
              <InfoIcon style={{ flexShrink: 0, marginTop: 2 }} />
              You can find the serial number on the product or the box
            </div>
            {status === "notfound" && (
              <div className="error-box show">
                <AlertCircleIcon />
                <span>No product found with this serial number</span>
              </div>
            )}
            <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: 14 }}>
              Check Warranty
            </button>
          </form>
        </div>

        <div className="pod">
          <svg width="230" height="230" viewBox="0 0 230 230" fill="none">
            <path
              d="M55 100c0-42 32-76 72-76s72 34 72 76"
              stroke="#0A0A0A"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
            />
            <rect x="38" y="96" width="36" height="58" rx="18" fill="#0A0A0A" />
            <rect x="156" y="96" width="36" height="58" rx="18" fill="#0A0A0A" />
            <circle cx="56" cy="128" r="9" fill="#2A2A2C" />
            <circle cx="174" cy="128" r="9" fill="#2A2A2C" />
            <text x="115" y="132" fontFamily="Sora" fontWeight="700" fontSize="11" fill="#F5F5F5" textAnchor="middle">
              boAt
            </text>
          </svg>
        </div>
      </section>

      {/* Result: found state */}
      {status === "found" && (
        <>
          <section className="result-card">
            <div className="result-inner">
              <div className="result-thumb">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M4 14v-2a8 8 0 0116 0v2" />
                  <rect x="2" y="14" width="5" height="7" rx="2" />
                  <rect x="17" y="14" width="5" height="7" rx="2" />
                </svg>
              </div>
              <div className="result-meta" style={{ flex: 1, minWidth: 180 }}>
                <strong>boAt Rockerz 450</strong>
                <span>Serial Number: {KNOWN_SERIAL}</span>
                <span>Product Category : Headphones</span>
                <span>Colour : Active Black</span>
              </div>
              <div className="result-stat">
                <div className="k">Warranty Status</div>
                <div className="v green" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <ShieldIcon width="14" height="14" />
                  Active
                </div>
              </div>
              <div className="result-stat">
                <div className="k">Warranty Start Date</div>
                <div className="v">15 May 2024</div>
              </div>
              <div className="result-stat">
                <div className="k">Warranty End Date</div>
                <div className="v green">14 May 2026</div>
                <div style={{ fontSize: "0.75rem", color: "var(--boat-muted)", marginTop: 2 }}>
                  Remaining <span style={{ color: "var(--boat-green)", fontWeight: 600 }}>285 Days</span>
                </div>
              </div>
              <div className="result-stat" style={{ textAlign: "center" }}>
                <FileIcon width="26" height="26" style={{ stroke: "#C6151C" }} />
                <div style={{ fontSize: "0.8125rem", fontWeight: 600, marginTop: 4 }}>
                  View Warranty Document
                </div>
                <div style={{ fontSize: "0.6875rem", color: "var(--boat-muted)" }}>(PDF)</div>
              </div>
            </div>
          </section>

          {/* Repair history */}
          <section className="result-card">
            <div className="panel">
              <div className="panel-head">
                <h3 style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <WrenchIcon width="16" height="16" />
                  Repair History
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.8125rem", color: "var(--boat-muted)" }}>
                  Show
                  <select
                    style={{
                      border: "1px solid var(--boat-border)",
                      borderRadius: 6,
                      padding: "4px 8px",
                      fontSize: "0.8125rem",
                    }}
                  >
                    <option>5</option>
                    <option>10</option>
                    <option>20</option>
                  </select>
                  entries
                </div>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table className="wtable">
                  <thead>
                    <tr>
                      <th>Service ID</th>
                      <th>Request Date</th>
                      <th>Issue Reported</th>
                      <th>Status</th>
                      <th>Service Center</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {REPAIRS.map((r, i) => (
                      <tr key={i}>
                        <td>{r.id}</td>
                        <td>{r.date}</td>
                        <td>{r.issue}</td>
                        <td>
                          <span className="status-pill completed">Completed</span>
                        </td>
                        <td>{r.center}</td>
                        <td>
                          <span
                            className="link-red"
                            onClick={() => alert("Opening service detail (frontend demo).")}
                          >
                            View Details
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 20px",
                  fontSize: "0.8125rem",
                  color: "var(--boat-muted)",
                }}
              >
                <span>Showing 1 to 5 of 12 entries</span>
                <div style={{ display: "flex", gap: 6 }}>
                  <button className="btn btn-outline" style={{ padding: "6px 11px" }}>‹</button>
                  <button className="btn btn-primary" style={{ padding: "6px 12px" }}>1</button>
                  <button className="btn btn-outline" style={{ padding: "6px 12px" }}>2</button>
                  <button className="btn btn-outline" style={{ padding: "6px 12px" }}>3</button>
                  <button className="btn btn-outline" style={{ padding: "6px 11px" }}>›</button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="boat-logo on-dark" style={{ fontSize: "1.3rem" }}>
              bo<span className="accent">A</span>t
            </div>
            <p style={{ fontSize: "0.8125rem", color: "#8B8B8E", marginTop: 12, maxWidth: 260 }}>
              India&apos;s #1 audio and wearable brand. Plugged in, tuned in, always switched on.
            </p>
          </div>
          <div>
            <h5>Support</h5>
            <ul>
              <li><Link href="#">Contact Us</Link></li>
              <li><Link href="#">FAQs</Link></li>
              <li><Link href="#">Warranty &amp; Claim</Link></li>
            </ul>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              <li><Link href="#">About boAt</Link></li>
              <li><Link href="#">Newsroom</Link></li>
              <li><Link href="#">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h5>Legal</h5>
            <ul>
              <li><Link href="#">Terms of Service</Link></li>
              <li><Link href="#">Privacy Policy</Link></li>
              <li><Link href="#">Shipping Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">© 2025 boAt. All Rights Reserved.</div>
      </footer>
    </>
  );
}