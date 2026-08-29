"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GridIcon,
  SearchIcon,
  UploadIcon,
  BoxIcon,
  WrenchIcon,
  UsersIcon,
  SettingsIcon,
  LogoutIcon,
} from "./Icons";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: GridIcon },
  { href: "/dashboard/warranty-lookups", label: "Warranty Lookups", icon: SearchIcon },
  { href: "/dashboard/upload-warranties", label: "Upload Warranties", icon: UploadIcon },
  { href: "/dashboard/products", label: "Products", icon: BoxIcon },
  { href: "/dashboard/repair-history", label: "Repair History", icon: WrenchIcon },
  { href: "/dashboard/users", label: "Users", icon: UsersIcon },
  { href: "/dashboard/settings", label: "Settings", icon: SettingsIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="dash-sidebar">
      <div className="dash-sidebar-header">
        <div className="boat-logo" style={{ fontSize: "1.25rem" }}>
          bo<span className="accent">A</span>t
        </div>
        <div className="sub">Warranty Admin</div>
      </div>

      <nav className="dash-nav">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={active ? "dash-nav-item active" : "dash-nav-item"}
            >
              <Icon />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="dash-sidebar-footer">
        <Link href="/signin" className="dash-nav-item" style={{ color: "#4B4F58" }}>
          <LogoutIcon />
          Logout
        </Link>
      </div>
    </aside>
  );
}
