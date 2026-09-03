"use client";

import { useState } from "react";
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

export default function UploadWarrantiesPage() {
  const [dragging, setDragging] = useState(false);
  const [queue, setQueue] = useState(INITIAL_QUEUE);

  async function handleFiles(files) {
    if (!files || !files.length) return;
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
          const response = await fetch("/api/admin/warranty-upload", {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
          return {
            index,
            status: response.ok ? "completed" : "notfound",
            label: response.ok ? "Processed" : data.error || "Failed",
            url: data.url,
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
              Max file size: 10MB · PDF only
            </div>
          </div>
        </div>

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
                      {f.url ? (
                        <a
                          className="link-red"
                          href={f.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View
                        </a>
                      ) : (
                        <span>{f.label === "Failed" ? "Failed" : "-"}</span>
                      )}
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
