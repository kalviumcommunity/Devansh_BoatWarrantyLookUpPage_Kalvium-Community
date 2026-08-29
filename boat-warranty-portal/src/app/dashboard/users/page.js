"use client";

import { useMemo, useState } from "react";
import Topbar from "@/components/Topbar";
import { SearchIcon, PlusIcon } from "@/components/Icons";

const USERS = [
  { name: "Aarav Sharma", email: "aarav.sharma@gmail.com", role: "user", joined: "14 May 2025" },
  { name: "Priya Nair", email: "priya.nair@gmail.com", role: "user", joined: "13 May 2025" },
  { name: "Admin User", email: "admin@boat.com", role: "admin", joined: "01 Jan 2025" },
  { name: "Rohan Mehta", email: "rohan.mehta@gmail.com", role: "user", joined: "12 May 2025" },
  { name: "Sanya Kapoor", email: "sanya.kapoor@gmail.com", role: "user", joined: "11 May 2025" },
  { name: "Vivek Rao", email: "vivek.rao@boat.com", role: "admin", joined: "20 Mar 2025" },
];

function initials(name) {
  return name.split(" ").slice(0, 2).map((p) => p[0]).join("").toUpperCase();
}

export default function UsersPage() {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return USERS.filter((u) => {
      const text = `${u.name} ${u.email}`.toLowerCase();
      const matchesText = !q || text.includes(q);
      const matchesRole = roleFilter === "all" || u.role === roleFilter;
      return matchesText && matchesRole;
    });
  }, [query, roleFilter]);

  return (
    <>
      <Topbar title="Users" subtitle="Manage user and admin accounts" />
      <div className="dash-content">
        <div className="panel">
          <div className="page-toolbar">
            <div className="toolbar-search">
              <span className="icon"><SearchIcon /></span>
              <input
                type="text"
                placeholder="Search users by name or email"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <select className="select-chip" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
              <option value="all">All roles</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button className="btn btn-primary" onClick={() => alert("Invite user form would open here (frontend demo).")}>
              <PlusIcon />
              Invite User
            </button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="wtable">
              <thead>
                <tr><th>User</th><th>Role</th><th>Joined</th><th>Status</th><th>Action</th></tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.email}>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar-sm">{initials(u.name)}</div>
                        <div>
                          <div className="uname">{u.name}</div>
                          <div className="uemail">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className={`role-badge ${u.role}`}>{u.role === "admin" ? "Admin" : "User"}</span></td>
                    <td>{u.joined}</td>
                    <td><span className="status-pill completed">Active</span></td>
                    <td>
                      <span className="link-red" onClick={() => alert("Manage user: " + u.name)}>Manage</span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={5} style={{ textAlign: "center", color: "var(--boat-muted)", padding: "24px 20px" }}>No users match your filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}