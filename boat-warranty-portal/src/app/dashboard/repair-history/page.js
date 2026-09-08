"use client";

import { useState } from "react";
import Topbar from "@/components/Topbar";
import { SearchIcon, PlusIcon } from "@/components/Icons";

const emptyForm = { repairDate: "", issueDescription: "", serviceCenterCode: "" };

export default function RepairHistoryPage() {
  const [serial, setSerial] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadProduct(serialNumber) {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `/api/admin/products?search=${encodeURIComponent(serialNumber)}`,
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Search failed");
      if (!data.results?.length) {
        setProduct(null);
        setError("No product matches that serial number.");
      } else {
        setProduct(data.results[0]);
      }
    } catch (err) {
      setProduct(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    const trimmed = serial.trim();
    if (!trimmed) return;
    setFormOpen(false);
    loadProduct(trimmed);
  }

  function openAddForm() {
    setEditingId(null);
    setForm(emptyForm);
    setFormError("");
    setFormOpen(true);
  }

  function openEditForm(record) {
    setEditingId(record.repairId);
    setForm({
      repairDate: record.repairDate.slice(0, 10),
      issueDescription: record.issueDescription,
      serviceCenterCode: record.serviceCenterCode,
    });
    setFormError("");
    setFormOpen(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setFormError("");

    const url = editingId
      ? `/api/admin/repair-history/${editingId}`
      : "/api/admin/repair-history";
    const method = editingId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, serialNumber: product.serialNumber }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Could not save the repair record");
      }

      setFormOpen(false);
      await loadProduct(product.serialNumber);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <Topbar
        title="Repair History"
        subtitle="Search a product to manage its repair records"
      />
      <div className="dash-content">
        <div className="panel" style={{ marginBottom: 22 }}>
          <form className="page-toolbar" onSubmit={handleSearch}>
            <div className="toolbar-search">
              <span className="icon">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search by exact serial number"
                value={serial}
                onChange={(e) => setSerial(e.target.value.toUpperCase())}
              />
            </div>
            <button type="submit" className="btn btn-outline" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </button>
            {product && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={openAddForm}
              >
                <PlusIcon />
                Add Repair Entry
              </button>
            )}
          </form>

          {error && (
            <div className="error-box show" style={{ margin: "0 20px 16px" }}>
              {error}
            </div>
          )}

          {formOpen && product && (
            <form
              onSubmit={handleSave}
              style={{
                margin: "0 20px 20px",
                padding: 16,
                border: "1px solid var(--boat-border)",
                borderRadius: "var(--radius-md)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                  marginBottom: 14,
                }}
              >
                <div>
                  <label className="field-label">Repair Date</label>
                  <input
                    className="field-input no-icon"
                    type="date"
                    value={form.repairDate}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, repairDate: e.target.value }))
                    }
                    required
                  />
                </div>
                <div>
                  <label className="field-label">Service Center Code</label>
                  <input
                    className="field-input no-icon"
                    type="text"
                    value={form.serviceCenterCode}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        serviceCenterCode: e.target.value.toUpperCase(),
                      }))
                    }
                    required
                  />
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label className="field-label">Issue Description</label>
                <textarea
                  className="field-input no-icon"
                  rows={3}
                  value={form.issueDescription}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, issueDescription: e.target.value }))
                  }
                  required
                />
              </div>
              {formError && (
                <div
                  className="field-error-text show"
                  style={{ marginBottom: 12 }}
                >
                  {formError}
                </div>
              )}
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? "Saving..." : editingId ? "Update Entry" : "Add Entry"}
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setFormOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {product && (
          <div className="panel">
            <div className="panel-head">
              <h3>
                {product.modelName} · {product.serialNumber}
              </h3>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table className="wtable">
                <thead>
                  <tr>
                    <th>Repair Date</th>
                    <th>Issue Reported</th>
                    <th>Service Center</th>
                    <th>Logged By</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {product.repairHistory?.map((r) => (
                    <tr key={r.repairId}>
                      <td>{new Date(r.repairDate).toLocaleDateString()}</td>
                      <td>{r.issueDescription}</td>
                      <td>{r.serviceCenterCode}</td>
                      <td>{r.createdBy}</td>
                      <td>
                        <span
                          className="link-red"
                          onClick={() => openEditForm(r)}
                        >
                          Edit
                        </span>
                      </td>
                    </tr>
                  ))}
                  {(!product.repairHistory ||
                    product.repairHistory.length === 0) && (
                    <tr>
                      <td
                        colSpan={5}
                        style={{
                          textAlign: "center",
                          color: "var(--boat-muted)",
                          padding: "24px 20px",
                        }}
                      >
                        No repair records yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
