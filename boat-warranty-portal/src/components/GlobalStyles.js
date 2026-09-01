"use client";

export default function GlobalStyles() {
  return (
    <style jsx global>{`
/* ============================================================
   boAt Warranty System — shared styles
   Brand tokens derived from the boAt storefront + admin mockups
   ============================================================ */

:root {
  --boat-red: #ED1C24;
  --boat-red-dark: #C6151C;
  --boat-black: #0A0A0A;
  --boat-ink: #17181B;
  --boat-panel: #F4F5F7;
  --boat-border: #E4E6EA;
  --boat-muted: #6B7280;
  --boat-green: #16A34A;
  --boat-green-bg: #E9F9EF;
  --boat-red-bg: #FDEAEA;
  --boat-amber: #B45309;
  --boat-amber-bg: #FEF3E0;
  --shadow-soft: 0 1px 2px rgba(16,18,23,0.04), 0 8px 24px -12px rgba(16,18,23,0.12);
  --shadow-card: 0 1px 2px rgba(16,18,23,0.03), 0 2px 8px rgba(16,18,23,0.05);
  --radius-lg: 16px;
  --radius-md: 12px;
  --radius-sm: 8px;
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  color: var(--boat-ink);
  background: #fff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, .display {
  font-family: 'Sora', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  letter-spacing: -0.02em;
}

a { color: inherit; text-decoration: none; }

::selection { background: var(--boat-red); color: #fff; }

:focus-visible {
  outline: 2px solid var(--boat-red);
  outline-offset: 2px;
  border-radius: 4px;
}

/* ---------- Logo ---------- */
.boat-logo {
  font-family: 'Sora', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 800;
  font-size: 1.5rem;
  letter-spacing: -0.02em;
  color: var(--boat-black);
  display: inline-flex;
  align-items: baseline;
  gap: 2px;
}
.boat-logo .accent { color: var(--boat-red); }
.boat-logo.on-dark { color: #fff; }

/* ---------- Buttons ---------- */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  font-size: 0.9375rem;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  cursor: pointer;
  transition: transform .12s ease, box-shadow .15s ease, background-color .15s ease, border-color .15s ease;
  white-space: nowrap;
}
.btn:active { transform: translateY(1px); }
.btn-primary {
  background: var(--boat-red);
  color: #fff;
  padding: 13px 20px;
  box-shadow: 0 6px 16px -6px rgba(237,28,36,0.55);
}
.btn-primary:hover { background: var(--boat-red-dark); }
.btn-outline {
  background: #fff;
  color: var(--boat-ink);
  border-color: var(--boat-border);
  padding: 12px 19px;
}
.btn-outline:hover { border-color: var(--boat-ink); }
.btn-ghost {
  background: transparent;
  color: var(--boat-muted);
  padding: 8px 12px;
}
.btn-ghost:hover { color: var(--boat-ink); }

/* ---------- Inputs ---------- */
.field-label {
  display: block;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--boat-ink);
  margin-bottom: 6px;
}
.field-input-wrap { position: relative; }
.field-input-wrap .icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #A0A4AC;
  display: flex;
}
.field-input-wrap .icon-right {
  left: auto;
  right: 14px;
  cursor: pointer;
}
.field-input {
  width: 100%;
  padding: 12px 14px 12px 42px;
  border-radius: var(--radius-sm);
  border: 1.5px solid var(--boat-border);
  font-size: 0.9375rem;
  font-family: inherit;
  color: var(--boat-ink);
  background: #fff;
  transition: border-color .15s ease, box-shadow .15s ease;
}
.field-input.no-icon { padding-left: 14px; }
.field-input.pr-icon { padding-right: 42px; }
.field-input:focus {
  border-color: var(--boat-red);
  box-shadow: 0 0 0 4px rgba(237,28,36,0.10);
  outline: none;
}
.field-input::placeholder { color: #A0A4AC; }
.field-error { border-color: #E11D2E !important; box-shadow: 0 0 0 4px rgba(225,29,46,0.08) !important; }
.field-error-text { color: #E11D2E; font-size: 0.8125rem; margin-top: 6px; display: none; }
.field-error-text.show { display: block; }

/* ---------- Auth split layout ---------- */
.auth-shell { min-height: 100vh; display: flex; }
.auth-panel {
  width: 42%;
  min-width: 380px;
  background: var(--boat-panel);
  padding: 48px 56px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}
.auth-panel::after {
  content: "";
  position: absolute;
  right: -120px;
  top: -120px;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(237,28,36,0.08), transparent 70%);
}
.auth-form-side {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: #fff;
}
.auth-form-inner { width: 100%; max-width: 400px; }

.info-row { display: flex; gap: 14px; align-items: flex-start; margin-bottom: 18px; }
.info-icon {
  width: 38px; height: 38px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid var(--boat-border);
  display: flex; align-items: center; justify-content: center;
  color: var(--boat-red);
  flex-shrink: 0;
}
.info-row h4 { margin: 0 0 2px; font-size: 0.9375rem; font-weight: 600; }
.info-row p { margin: 0; font-size: 0.8125rem; color: var(--boat-muted); line-height: 1.4; }

.type-toggle {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 24px;
}
.type-toggle-opt {
  border: 1.5px solid var(--boat-border);
  border-radius: var(--radius-sm);
  padding: 12px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  background: #fff;
  transition: border-color .15s ease, background-color .15s ease;
  text-align: left;
}
.type-toggle-opt .badge-ic {
  width: 30px; height: 30px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  background: #F1F2F4; color: #9AA0A8;
  flex-shrink: 0;
  transition: background-color .15s ease, color .15s ease;
}
.type-toggle-opt strong { display: block; font-size: 0.875rem; font-weight: 600; line-height: 1.2; }
.type-toggle-opt span { display: block; font-size: 0.75rem; color: var(--boat-muted); margin-top: 1px; }
.type-toggle-opt.active { border-color: var(--boat-red); background: var(--boat-red-bg); }
.type-toggle-opt.active .badge-ic { background: var(--boat-red); color: #fff; }

.product-stage {
  margin-top: auto;
  display: flex;
  justify-content: center;
  padding-top: 24px;
}

/* ---------- Dashboard shell ---------- */
.dash-shell { display: flex; min-height: 100vh; background: #FAFAFB; }
.dash-sidebar {
  width: 240px;
  background: #fff;
  border-right: 1px solid var(--boat-border);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
}
.dash-sidebar-header { padding: 22px 22px 18px; border-bottom: 1px solid var(--boat-border); }
.dash-sidebar-header .sub { font-size: 0.75rem; color: var(--boat-muted); margin-top: 2px; }
.dash-nav { padding: 14px 12px; flex: 1; display: flex; flex-direction: column; gap: 2px; }
.dash-nav-item {
  display: flex; align-items: center; gap: 11px;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
  color: #4B4F58;
  cursor: pointer;
  transition: background-color .15s ease, color .15s ease;
}
.dash-nav-item svg { flex-shrink: 0; }
.dash-nav-item:hover { background: #F5F5F7; }
.dash-nav-item.active { background: var(--boat-red); color: #fff; box-shadow: 0 4px 12px -4px rgba(237,28,36,0.5); }
.dash-sidebar-footer { padding: 14px 12px 18px; border-top: 1px solid var(--boat-border); }

.dash-main { flex: 1; min-width: 0; }
.dash-topbar {
  height: 72px;
  border-bottom: 1px solid var(--boat-border);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 28px;
  background: #fff;
  position: sticky; top: 0; z-index: 5;
}
.dash-content { padding: 26px 28px 60px; }

.bell-btn {
  position: relative;
  width: 38px; height: 38px;
  border-radius: 50%;
  border: 1px solid var(--boat-border);
  background: #fff;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  color: #55585F;
}
.bell-dot {
  position: absolute; top: 6px; right: 7px;
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--boat-red); border: 2px solid #fff;
}
.admin-chip { display: flex; align-items: center; gap: 10px; }
.admin-avatar {
  width: 34px; height: 34px; border-radius: 50%;
  background: #F0E9EA; display: flex; align-items: center; justify-content: center;
  color: var(--boat-red);
}

.stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-bottom: 22px; }
.stat-card {
  background: #fff; border: 1px solid var(--boat-border); border-radius: var(--radius-lg);
  padding: 18px 18px 16px; box-shadow: var(--shadow-card);
}
.stat-card .top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.stat-ic {
  width: 38px; height: 38px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
}
.stat-card .label { font-size: 0.8125rem; color: var(--boat-muted); margin-bottom: 4px; }
.stat-card .value { font-size: 1.625rem; font-weight: 700; letter-spacing: -0.02em; }
.stat-delta { font-size: 0.75rem; font-weight: 600; padding: 3px 7px; border-radius: 20px; }
.stat-delta.up { color: var(--boat-green); background: var(--boat-green-bg); }
.stat-delta.down { color: var(--boat-red); background: var(--boat-red-bg); }

.panel {
  background: #fff; border: 1px solid var(--boat-border); border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
}
.panel-head { display: flex; align-items: center; justify-content: space-between; padding: 18px 20px; border-bottom: 1px solid var(--boat-border); }
.panel-head h3 { margin: 0; font-size: 0.9375rem; font-weight: 700; }

.dropzone {
  margin: 20px; border: 1.5px dashed var(--boat-border); border-radius: var(--radius-md);
  padding: 40px 20px; text-align: center; background: #FCFCFD;
  transition: border-color .15s ease, background-color .15s ease;
  cursor: pointer;
}
.dropzone.drag { border-color: var(--boat-red); background: var(--boat-red-bg); }
.dropzone .cloud { color: #B7BBC2; margin-bottom: 10px; }
.dropzone .main-txt { font-size: 0.875rem; color: var(--boat-ink); font-weight: 500; }
.dropzone .sub-txt { font-size: 0.75rem; color: var(--boat-muted); margin: 4px 0 16px; }
.dropzone .file-chip {
  display: none; align-items: center; justify-content: center; gap: 8px;
  margin-top: 14px; font-size: 0.8125rem; color: var(--boat-ink); font-weight: 600;
}
.dropzone .file-chip.show { display: flex; }

table.wtable { width: 100%; border-collapse: collapse; }
table.wtable th {
  text-align: left; font-size: 0.75rem; text-transform: uppercase; letter-spacing: .04em;
  color: var(--boat-muted); font-weight: 600; padding: 10px 20px; border-bottom: 1px solid var(--boat-border);
}
table.wtable td { padding: 13px 20px; font-size: 0.875rem; border-bottom: 1px solid #F1F2F4; color: #2B2D33; }
table.wtable tr:last-child td { border-bottom: none; }
.status-pill { font-size: 0.75rem; font-weight: 600; padding: 4px 10px; border-radius: 20px; display: inline-block; }
.status-pill.found { color: var(--boat-green); background: var(--boat-green-bg); }
.status-pill.notfound { color: var(--boat-red); background: var(--boat-red-bg); }
.status-pill.completed { color: var(--boat-green); background: var(--boat-green-bg); }
.link-red { color: var(--boat-red); font-weight: 600; font-size: 0.8125rem; cursor: pointer; }
.link-red:hover { text-decoration: underline; }

/* ---------- Storefront ---------- */
.store-header { background: var(--boat-black); color: #fff; }
.store-nav { display: flex; align-items: center; gap: 26px; padding: 16px 40px; max-width: 1280px; margin: 0 auto; }
.store-nav .navlink { font-size: 0.875rem; color: #D6D6D8; display: flex; align-items: center; gap: 4px; cursor: pointer; }
.store-nav .navlink:hover { color: #fff; }
.store-search {
  flex: 1; display: flex; align-items: center;
  background: #1C1C1E; border-radius: 8px; padding: 9px 14px; gap: 10px; color: #8B8B8E;
  max-width: 340px; margin-left: auto;
}
.store-search input { background: transparent; border: none; outline: none; color: #fff; font-size: 0.8125rem; width: 100%; }
.store-icon-btn { position: relative; color: #fff; cursor: pointer; display: flex; }
.cart-badge {
  position: absolute; top: -7px; right: -8px; background: var(--boat-red); color: #fff;
  font-size: 0.625rem; font-weight: 700; width: 16px; height: 16px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}

.hero { max-width: 1280px; margin: 0 auto; padding: 64px 40px 40px; display: grid; grid-template-columns: 1fr auto 1fr; gap: 40px; align-items: center; }
.hero h1 { font-size: 2.5rem; line-height: 1.1; margin: 0 0 10px; font-weight: 800; }
.hero h1 .red { color: var(--boat-red); }
.hero p { color: var(--boat-muted); margin: 0; font-size: 0.9375rem; }

.serial-card { background: #fff; border: 1px solid var(--boat-border); border-radius: var(--radius-lg); padding: 22px; box-shadow: var(--shadow-soft); width: 360px; }
.serial-card h3 { margin: 0 0 12px; font-size: 0.9375rem; }
.hint-text { font-size: 0.75rem; color: var(--boat-muted); display: flex; gap: 6px; align-items: flex-start; margin-top: 8px; }

.pod {
  width: 340px; height: 340px; border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #FF4B52, var(--boat-red) 60%, var(--boat-red-dark) 100%);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 30px 60px -20px rgba(237,28,36,0.45);
}

.result-card {
  max-width: 1200px; margin: 0 auto 28px; padding: 0 40px;
}
.result-inner {
  background: linear-gradient(120deg,#fff 62%, var(--boat-red-bg) 100%);
  border: 1px solid var(--boat-border); border-radius: var(--radius-lg);
  padding: 22px 26px; display: flex; align-items: center; gap: 26px; flex-wrap: wrap;
  box-shadow: var(--shadow-soft);
}
.result-thumb {
  width: 64px; height: 64px; border-radius: 12px; background: #F1F2F4;
  display: flex; align-items: center; justify-content: center; color: var(--boat-ink); flex-shrink: 0;
}
.result-meta strong { display: block; font-size: 1rem; }
.result-meta span { font-size: 0.8125rem; color: var(--boat-muted); display: block; margin-top: 1px; }
.result-stat { text-align: left; }
.result-stat .k { font-size: 0.75rem; color: var(--boat-muted); margin-bottom: 3px; }
.result-stat .v { font-weight: 700; font-size: 0.9375rem; }
.result-stat .v.green { color: var(--boat-green); }

.error-box {
  margin-top: 12px; background: var(--boat-red-bg); color: #C6151C; border: 1px solid #F6C9CB;
  border-radius: var(--radius-sm); padding: 10px 14px; font-size: 0.8125rem; font-weight: 500;
  display: none; align-items: center; gap: 8px;
}
.error-box.show { display: flex; }

.footer { background: var(--boat-black); color: #A2A2A5; margin-top: 40px; }
.footer-inner { max-width: 1280px; margin: 0 auto; padding: 44px 40px 26px; display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 30px; }
.footer h5 { color: #fff; font-size: 0.8125rem; letter-spacing: .04em; margin: 0 0 14px; text-transform: uppercase; }
.footer ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; font-size: 0.8125rem; }
.footer ul li a:hover { color: #fff; }
.footer .socials { display: flex; gap: 10px; }
.footer .socials a {
  width: 32px; height: 32px; border-radius: 50%; border: 1px solid #3A3A3D;
  display: flex; align-items: center; justify-content: center;
}
.footer-bottom { border-top: 1px solid #2A2A2C; padding: 16px 40px; font-size: 0.75rem; text-align: center; max-width: 1280px; margin: 0 auto; }

/* ---------- Toolbar / filters (list pages) ---------- */
.page-toolbar { display: flex; align-items: center; gap: 12px; padding: 18px 20px; flex-wrap: wrap; }
.toolbar-search { flex: 1; min-width: 220px; position: relative; }
.toolbar-search input {
  width: 100%; padding: 10px 14px 10px 38px; border-radius: var(--radius-sm);
  border: 1.5px solid var(--boat-border); font-size: 0.875rem; font-family: inherit;
}
.toolbar-search input:focus { border-color: var(--boat-red); box-shadow: 0 0 0 4px rgba(237,28,36,0.10); outline: none; }
.toolbar-search .icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #A0A4AC; display: flex; }
.select-chip {
  padding: 10px 14px; border-radius: var(--radius-sm); border: 1.5px solid var(--boat-border);
  font-size: 0.8125rem; font-family: inherit; background: #fff; color: var(--boat-ink); cursor: pointer;
}

/* ---------- Products grid ---------- */
.products-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; padding: 4px 20px 20px; }
.product-card { border: 1px solid var(--boat-border); border-radius: var(--radius-md); overflow: hidden; background: #fff; transition: box-shadow .15s ease, transform .15s ease; }
.product-card:hover { box-shadow: var(--shadow-soft); transform: translateY(-2px); }
.product-thumb { height: 120px; background: linear-gradient(135deg,#F4F5F7,#EDEEF1); display: flex; align-items: center; justify-content: center; color: #B7BBC2; }
.product-body { padding: 14px 16px 16px; }
.product-body .pname { font-size: 0.875rem; font-weight: 600; margin-bottom: 3px; }
.product-body .pcat { font-size: 0.75rem; color: var(--boat-muted); margin-bottom: 10px; }
.product-foot { display: flex; align-items: center; justify-content: space-between; }
.product-count { font-size: 0.75rem; color: var(--boat-muted); }

/* ---------- Role badges ---------- */
.role-badge { font-size: 0.75rem; font-weight: 600; padding: 4px 10px; border-radius: 20px; display: inline-block; }
.role-badge.admin { color: #7C3AED; background: #F3EBFF; }
.role-badge.user { color: #2563EB; background: #EAF1FF; }
.user-avatar-sm {
  width: 32px; height: 32px; border-radius: 50%; background: #F1F2F4; color: #6B7280;
  display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; flex-shrink: 0;
}
.user-cell { display: flex; align-items: center; gap: 10px; }
.user-cell .uname { font-weight: 600; font-size: 0.875rem; }
.user-cell .uemail { font-size: 0.75rem; color: var(--boat-muted); }

/* ---------- Settings ---------- */
.settings-grid { display: grid; grid-template-columns: 240px 1fr; gap: 22px; align-items: start; }
.settings-tabs { display: flex; flex-direction: column; gap: 2px; }
.settings-tab {
  padding: 10px 14px; border-radius: var(--radius-sm); font-size: 0.875rem; font-weight: 500;
  color: #4B4F58; cursor: pointer; display: flex; align-items: center; gap: 10px;
}
.settings-tab:hover { background: #F5F5F7; }
.settings-tab.active { background: var(--boat-red-bg); color: var(--boat-red-dark); font-weight: 600; }
.settings-row { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #F1F2F4; gap: 20px; }
.settings-row:last-child { border-bottom: none; }
.settings-row .stitle { font-size: 0.875rem; font-weight: 600; margin-bottom: 2px; }
.settings-row .sdesc { font-size: 0.8125rem; color: var(--boat-muted); }
.toggle-switch { position: relative; width: 42px; height: 24px; flex-shrink: 0; }
.toggle-switch input { opacity: 0; width: 0; height: 0; }
.toggle-switch .track {
  position: absolute; inset: 0; background: #DADCE0; border-radius: 20px; cursor: pointer; transition: background-color .15s ease;
}
.toggle-switch .track::before {
  content: ""; position: absolute; width: 18px; height: 18px; left: 3px; top: 3px; background: #fff; border-radius: 50%;
  transition: transform .15s ease; box-shadow: 0 1px 3px rgba(0,0,0,0.25);
}
.toggle-switch input:checked + .track { background: var(--boat-red); }
.toggle-switch input:checked + .track::before { transform: translateX(18px); }

.avatar-upload { display: flex; align-items: center; gap: 16px; }
.avatar-big {
  width: 68px; height: 68px; border-radius: 50%; background: var(--boat-red-bg); color: var(--boat-red);
  display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.25rem; flex-shrink: 0;
}

@media (max-width: 1080px) {
  .stat-grid { grid-template-columns: repeat(2,1fr); }
  .hero { grid-template-columns: 1fr; text-align: center; }
  .serial-card { margin: 0 auto; }
  .footer-inner { grid-template-columns: 1fr 1fr; }
  .products-grid { grid-template-columns: repeat(2,1fr); }
  .settings-grid { grid-template-columns: 1fr; }
}
@media (max-width: 860px) {
  .auth-panel { display: none; }
  .dash-sidebar { position: fixed; z-index: 20; transform: translateX(-100%); transition: transform .2s ease; }
  .dash-sidebar.open { transform: translateX(0); }
}


    `}</style>
  );
}
