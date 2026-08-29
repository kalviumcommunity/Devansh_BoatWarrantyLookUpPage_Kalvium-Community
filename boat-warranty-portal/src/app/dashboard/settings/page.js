"use client";

import { useState } from "react";
import Topbar from "@/components/Topbar";
import { UserIcon, BellIcon, LockIcon, ShieldIcon } from "@/components/Icons";

const TABS = [
  { id: "profile", label: "Profile", icon: UserIcon },
  { id: "notifications", label: "Notifications", icon: BellIcon },
  { id: "security", label: "Security", icon: LockIcon },
  { id: "warranty", label: "Warranty Rules", icon: ShieldIcon },
];

function Toggle({ defaultChecked }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
      <span className="track"></span>
    </label>
  );
}

export default function SettingsPage() {
  const [tab, setTab] = useState("profile");

  return (
    <>
      <Topbar title="Settings" subtitle="Manage your admin account and system preferences" />
      <div className="dash-content">
        <div className="settings-grid">
          <div className="panel" style={{ padding: 10 }}>
            <div className="settings-tabs">
              {TABS.map(({ id, label, icon: Icon }) => (
                <div
                  key={id}
                  className={tab === id ? "settings-tab active" : "settings-tab"}
                  onClick={() => setTab(id)}
                >
                  <Icon width="16" height="16" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div>
            {tab === "profile" && (
              <div className="panel" style={{ marginBottom: 22 }}>
                <div className="panel-head"><h3>Profile</h3></div>
                <div style={{ padding: 20 }}>
                  <div className="avatar-upload" style={{ marginBottom: 22 }}>
                    <div className="avatar-big">AU</div>
                    <div>
                      <button type="button" className="btn btn-outline" style={{ padding: "8px 14px" }}>Change Photo</button>
                      <div style={{ fontSize: "0.75rem", color: "var(--boat-muted)", marginTop: 6 }}>JPG or PNG, max 2MB</div>
                    </div>
                  </div>
                  <form
                    style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
                    onSubmit={(e) => { e.preventDefault(); alert("Profile changes saved (frontend demo)."); }}
                  >
                    <div>
                      <label className="field-label">Full Name</label>
                      <input className="field-input no-icon" type="text" defaultValue="Admin User" />
                    </div>
                    <div>
                      <label className="field-label">Email</label>
                      <input className="field-input no-icon" type="email" defaultValue="admin@boat.com" />
                    </div>
                    <div style={{ gridColumn: "1/-1" }}>
                      <label className="field-label">Role</label>
                      <input
                        className="field-input no-icon"
                        type="text"
                        defaultValue="Super Admin"
                        disabled
                        style={{ background: "#F7F7F8", color: "var(--boat-muted)" }}
                      />
                    </div>
                    <div style={{ gridColumn: "1/-1" }}>
                      <button type="submit" className="btn btn-primary">Save Changes</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {tab === "notifications" && (
              <div className="panel" style={{ marginBottom: 22 }}>
                <div className="panel-head"><h3>Notifications</h3></div>
                <div style={{ padding: "6px 20px 12px" }}>
                  <div className="settings-row">
                    <div><div className="stitle">New warranty lookups</div><div className="sdesc">Get notified whenever a customer looks up a serial number.</div></div>
                    <Toggle defaultChecked />
                  </div>
                  <div className="settings-row">
                    <div><div className="stitle">Expiring warranties</div><div className="sdesc">Weekly digest of warranties expiring in the next 30 days.</div></div>
                    <Toggle defaultChecked />
                  </div>
                  <div className="settings-row">
                    <div><div className="stitle">Failed uploads</div><div className="sdesc">Alert when a warranty PDF fails to process.</div></div>
                    <Toggle defaultChecked />
                  </div>
                  <div className="settings-row">
                    <div><div className="stitle">Product marketing updates</div><div className="sdesc">Occasional news about new boAt product launches.</div></div>
                    <Toggle />
                  </div>
                </div>
              </div>
            )}

            {tab === "security" && (
              <div className="panel" style={{ marginBottom: 22 }}>
                <div className="panel-head"><h3>Security</h3></div>
                <div style={{ padding: 20 }}>
                  <form
                    style={{ display: "grid", gap: 16, maxWidth: 420 }}
                    onSubmit={(e) => { e.preventDefault(); alert("Password updated (frontend demo)."); }}
                  >
                    <div>
                      <label className="field-label">Current Password</label>
                      <input className="field-input no-icon" type="password" placeholder="Enter current password" />
                    </div>
                    <div>
                      <label className="field-label">New Password</label>
                      <input className="field-input no-icon" type="password" placeholder="Enter new password" />
                    </div>
                    <div>
                      <label className="field-label">Confirm New Password</label>
                      <input className="field-input no-icon" type="password" placeholder="Confirm new password" />
                    </div>
                    <div><button type="submit" className="btn btn-primary">Update Password</button></div>
                  </form>
                  <div className="settings-row" style={{ marginTop: 10 }}>
                    <div><div className="stitle">Two-factor authentication</div><div className="sdesc">Require a one-time code in addition to your password.</div></div>
                    <Toggle />
                  </div>
                </div>
              </div>
            )}

            {tab === "warranty" && (
              <div className="panel" style={{ marginBottom: 22 }}>
                <div className="panel-head"><h3>Warranty Rules</h3></div>
                <div style={{ padding: 20 }}>
                  <form
                    style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
                    onSubmit={(e) => { e.preventDefault(); alert("Warranty rules saved (frontend demo)."); }}
                  >
                    <div>
                      <label className="field-label">Default warranty period (months)</label>
                      <input className="field-input no-icon" type="number" defaultValue={12} />
                    </div>
                    <div>
                      <label className="field-label">Expiry reminder window (days)</label>
                      <input className="field-input no-icon" type="number" defaultValue={30} />
                    </div>
                    <div style={{ gridColumn: "1/-1" }}>
                      <button type="submit" className="btn btn-primary">Save Rules</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
