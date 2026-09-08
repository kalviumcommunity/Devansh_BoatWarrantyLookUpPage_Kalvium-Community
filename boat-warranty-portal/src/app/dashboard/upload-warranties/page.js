"use client";

import { useEffect, useState } from "react";
import Topbar from "@/components/Topbar";
import { CloudUploadIcon } from "@/components/Icons";

const INITIAL_QUEUE = [
  {
    name: "Rockerz_450_warranty.pdf",
    size: "842 KB",
    status: "completed",
    label: "Processed",
    time: "14 May 2025, 11:40 AM",
  },
  {
    name: "Airdopes_141_batch.pdf",
    size: "1.2 MB",
    status: "completed",
    label: "Processed",
    time: "14 May 2025, 10:12 AM",
  },
  {
    name: "Stone_1200_warranty.pdf",
    size: "654 KB",
    status: "notfound",
    label: "Failed",
    time: "13 May 2025, 04:03 PM",
  },
];

function documentFileName(doc) {
  return doc.gcsFileUrl.split("/").pop();
}

export default function UploadWarrantiesPage() {
  const [dragging, setDragging] = useState(false);
  const [queue, setQueue] = useState(INITIAL_QUEUE);
  const [serialNumber, setSerialNumber] = useState("");

  const [existingDocs, setExistingDocs] = useState([]);
  const [docsLoading, setDocsLoading] = useState(false);
  const [docActionError, setDocActionError] = useState("");
  const [replacingId, setReplacingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  async function refreshDocs(serial) {
    if (!serial) {
      setExistingDocs([]);
      return;
    }
    setDocsLoading(true);
    try {
      const response = await fetch(
        `/api/admin/products?search=${encodeURIComponent(serial)}`,
      );
      const data = await response.json();
      setExistingDocs(
        response.ok ? data.results?.[0]?.documents || [] : [],
      );
    } catch {
      setExistingDocs([]);
    } finally {
      setDocsLoading(false);
    }
  }

  useEffect(() => {
    const trimmed = serialNumber.trim();
    const timer = setTimeout(() => refreshDocs(trimmed), 400);
    return () => clearTimeout(timer);
  }, [serialNumber]);

  async function handleFiles(files) {
    if (!files || !files.length) return;

    if (!serialNumber.trim()) {
      alert("Enter the product serial number before uploading.");
      return;
    }

    const additions = Array.from(files).map((file) => ({
      name: file.name,
      size: `${(file.size / 1024).toFixed(0)} KB`,
      status: "processing",
      label: "Processing",
      time: "Just now",
    }));
    setQueue((q) => [...additions, ...q]);

    const results = await Promise.all(
      Array.from(files).map(async (file, index) => {
        try {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("serialNumber", serialNumber.trim());
          const response = await fetch("/api/admin/warranty-upload", {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
          return {
            index,
            status: response.ok ? "completed" : "notfound",
            label: response.ok ? "Processed" : data.error || "Failed",
            documentId: data.documentId,
          };
        } catch {
          return { index, status: "notfound", label: "Upload failed" };
        }
      }),
    );

    setQueue((currentQueue) =>
      currentQueue.map((item, itemIndex) => {
        const result = results[itemIndex];
        if (!result) return item;
        return { ...item, ...result };
      }),
    );

    await refreshDocs(serialNumber.trim());
  }

  async function handleReplace(documentId, file) {
    setDocActionError("");
    setReplacingId(documentId);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(`/api/admin/warranty-upload/${documentId}`, {
        method: "PUT",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Could not replace the document");
      }
      await refreshDocs(serialNumber.trim());
    } catch (err) {
      setDocActionError(err.message);
    } finally {
      setReplacingId(null);
    }
  }

  async function handleDelete(documentId) {
    if (!confirm("Delete this warranty document?")) return;

    setDocActionError("");
    setDeletingId(documentId);
    try {
      const response = await fetch(`/api/admin/warranty-upload/${documentId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Could not delete the document");
      }
      await refreshDocs(serialNumber.trim());
    } catch (err) {
      setDocActionError(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <>
      <Topbar
        title="Upload Warranties"
        subtitle="Bulk upload and process warranty documents"
      />
      <div className="dash-content">
        <div className="panel" style={{ marginBottom: 22 }}>
          <div className="panel-head">
            <h3>Upload Warranty PDF</h3>
          </div>
          <div style={{ margin: "0 20px 16px", maxWidth: 320 }}>
            <label className="field-label">Product Serial Number</label>
            <input
              className="field-input no-icon"
              type="text"
              placeholder="e.g. BOAT-RKZ450-0001"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value.toUpperCase())}
            />
          </div>
          <div
            className={dragging ? "dropzone drag" : "dropzone"}
            onClick={() => document.getElementById("uploadFileInput").click()}
            onDragEnter={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={(e) => {
              e.preventDefault();
              setDragging(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              handleFiles(e.dataTransfer.files);
            }}
          >
            <input
              id="uploadFileInput"
              type="file"
              accept="application/pdf"
              multiple
              style={{ display: "none" }}
              onChange={(e) => handleFiles(e.target.files)}
            />
            <div className="cloud">
              <CloudUploadIcon />
            </div>
            <div className="main-txt">Drag &amp; drop PDF file here</div>
            <div className="sub-txt">or</div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={(e) => {
                e.stopPropagation();
                document.getElementById("uploadFileInput").click();
              }}
            >
              Choose File
            </button>
            <div className="sub-txt" style={{ marginTop: 14, marginBottom: 0 }}>
              Max file size: 5MB · PDF only
            </div>
          </div>
        </div>

        {serialNumber.trim() && (
          <div className="panel" style={{ marginBottom: 22 }}>
            <div className="panel-head">
              <h3>Existing Warranty Documents</h3>
            </div>
            {docActionError && (
              <div className="error-box show" style={{ margin: "0 20px 16px" }}>
                {docActionError}
              </div>
            )}
            <div style={{ overflowX: "auto" }}>
              <table className="wtable">
                <thead>
                  <tr>
                    <th>Document</th>
                    <th>Uploaded</th>
                    <th>Uploaded By</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {existingDocs.map((doc) => (
                    <tr key={doc.documentId}>
                      <td>{documentFileName(doc)}</td>
                      <td>{new Date(doc.uploadedAt).toLocaleString()}</td>
                      <td>{doc.uploadedBy}</td>
                      <td>
                        <span style={{ display: "flex", gap: 12 }}>
                          <input
                            id={`replace-${doc.documentId}`}
                            type="file"
                            accept="application/pdf"
                            style={{ display: "none" }}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              e.target.value = "";
                              if (file) handleReplace(doc.documentId, file);
                            }}
                          />
                          <span
                            className="link-red"
                            onClick={() =>
                              document
                                .getElementById(`replace-${doc.documentId}`)
                                .click()
                            }
                          >
                            {replacingId === doc.documentId
                              ? "Replacing..."
                              : "Replace"}
                          </span>
                          <span
                            className="link-red"
                            onClick={() => handleDelete(doc.documentId)}
                          >
                            {deletingId === doc.documentId
                              ? "Deleting..."
                              : "Delete"}
                          </span>
                        </span>
                      </td>
                    </tr>
                  ))}
                  {!docsLoading && existingDocs.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        style={{
                          textAlign: "center",
                          color: "var(--boat-muted)",
                          padding: "24px 20px",
                        }}
                      >
                        No documents on file for this serial number.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="panel">
          <div className="panel-head">
            <h3>Upload Queue</h3>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="wtable">
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Size</th>
                  <th>Status</th>
                  <th>Uploaded</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {queue.map((f, i) => (
                  <tr key={i}>
                    <td>{f.name}</td>
                    <td>{f.size}</td>
                    <td>
                      <span className={`status-pill ${f.status}`}>
                        {f.label}
                      </span>
                    </td>
                    <td>{f.time}</td>
                    <td>
                      <span>{f.documentId ? "Stored" : "-"}</span>
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
