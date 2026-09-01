import { BellIcon, UserIcon } from "./Icons";

export default function Topbar({ title, subtitle }) {
  return (
    <div className="dash-topbar">
      <div>
        <h1 style={{ fontSize: "1.25rem", margin: 0 }}>{title}</h1>
        <div style={{ fontSize: "0.8125rem", color: "var(--boat-muted)", marginTop: 1 }}>
          {subtitle}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div className="bell-btn">
          <BellIcon />
          <span className="bell-dot" />
        </div>
        <div className="admin-chip">
          <div className="admin-avatar">
            <UserIcon width="16" height="16" />
          </div>
          <div>
            <div style={{ fontSize: "0.8125rem", fontWeight: 600, lineHeight: 1.2 }}>
              Admin User
            </div>
            <div style={{ fontSize: "0.6875rem", color: "var(--boat-muted)" }}>
              admin@boat.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
