const navItems = [
  "Dashboard",
  "Products",
  "Warranty Lookups",
  "Repair History",
  "Upload Warranties",
  "Users",
  "Settings",
];

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "240px",
        background: "#111827",
        color: "white",
        padding: "24px 20px",
      }}
    >
      <h3 style={{ margin: 0, marginBottom: "24px" }}>Navigation</h3>
      <nav style={{ display: "grid", gap: "12px" }}>
        {navItems.map((item) => (
          <div key={item} style={{ opacity: 0.9 }}>
            {item}
          </div>
        ))}
      </nav>
    </aside>
  );
}
