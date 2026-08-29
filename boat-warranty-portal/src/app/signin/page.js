"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserIcon, ShieldIcon, MailIcon, LockIcon, EyeIcon } from "@/components/Icons";

export default function SignInPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState("user");
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = {};

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailOk) nextErrors.email = "Enter a valid email address.";

    const pwdOk = password.length >= 4;
    if (!pwdOk) nextErrors.password = "Password must be at least 4 characters.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    router.push(accountType === "admin" ? "/dashboard" : "/warranty");
  }

  return (
    <div className="auth-shell">
      {/* Left info panel */}
      <div className="auth-panel">
        <div className="boat-logo">
          bo<span className="accent">A</span>t
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: "0.6875rem",
              letterSpacing: ".06em",
              color: "var(--boat-muted)",
              textTransform: "uppercase",
              marginLeft: 2,
            }}
          >
            Warranty System
          </div>
        </div>

        <h1 style={{ fontSize: "1.75rem", margin: "36px 0 26px" }}>Good to see you again!</h1>

        <div className="info-row">
          <div className="info-icon">
            <UserIcon width="18" height="18" />
          </div>
          <div>
            <h4>User Dashboard</h4>
            <p>Check warranty status, view repair history and more.</p>
          </div>
        </div>

        <div className="info-row">
          <div className="info-icon">
            <ShieldIcon width="18" height="18" />
          </div>
          <div>
            <h4>Admin Dashboard</h4>
            <p>Manage warranties, products, repairs and users.</p>
          </div>
        </div>

        <div className="product-stage">
          <svg width="230" height="180" viewBox="0 0 230 180" fill="none">
            <ellipse cx="115" cy="164" rx="95" ry="12" fill="#E4E6EA" />
            <path
              d="M50 92c0-38 29-68 65-68s65 30 65 68"
              stroke="#111"
              strokeWidth="9"
              fill="none"
              strokeLinecap="round"
            />
            <rect x="34" y="88" width="34" height="52" rx="17" fill="#141416" />
            <rect x="162" y="88" width="34" height="52" rx="17" fill="#141416" />
            <circle cx="51" cy="118" r="4" fill="#3A3A3D" />
            <circle cx="179" cy="118" r="4" fill="#3A3A3D" />
          </svg>
        </div>

        <div style={{ fontSize: "0.75rem", color: "var(--boat-muted)", marginTop: 22 }}>
          © 2025 boAt. All rights reserved.
        </div>
      </div>

      {/* Right form */}
      <div className="auth-form-side">
        <div className="auth-form-inner">
          <h2 style={{ fontSize: "1.625rem", margin: "0 0 6px" }}>Sign In</h2>
          <p style={{ color: "var(--boat-muted)", fontSize: "0.875rem", margin: "0 0 26px" }}>
            Choose your account type and login
          </p>

          <div className="type-toggle">
            <button
              type="button"
              className={accountType === "user" ? "type-toggle-opt active" : "type-toggle-opt"}
              onClick={() => setAccountType("user")}
            >
              <span className="badge-ic">
                <UserIcon width="15" height="15" />
              </span>
              <span>
                <strong>User</strong>
                <span>Access your account</span>
              </span>
            </button>
            <button
              type="button"
              className={accountType === "admin" ? "type-toggle-opt active" : "type-toggle-opt"}
              onClick={() => setAccountType("admin")}
            >
              <span className="badge-ic">
                <ShieldIcon width="15" height="15" />
              </span>
              <span>
                <strong>Admin</strong>
                <span>Admin panel access</span>
              </span>
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div style={{ marginBottom: 18 }}>
              <label className="field-label">Email</label>
              <div className="field-input-wrap">
                <span className="icon">
                  <MailIcon />
                </span>
                <input
                  className={errors.email ? "field-input field-error" : "field-input"}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={accountType === "admin" ? "Admin@gmail.com" : "User@gmail.com"}
                />
              </div>
              {errors.email && <div className="field-error-text show">{errors.email}</div>}
            </div>

            <div style={{ marginBottom: 8 }}>
              <label className="field-label">Password</label>
              <div className="field-input-wrap">
                <span className="icon">
                  <LockIcon />
                </span>
                <input
                  className={errors.password ? "field-input pr-icon field-error" : "field-input pr-icon"}
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <span className="icon icon-right" onClick={() => setShowPwd((v) => !v)}>
                  <EyeIcon />
                </span>
              </div>
              {errors.password && <div className="field-error-text show">{errors.password}</div>}
            </div>

            <div style={{ textAlign: "right", marginBottom: 22 }}>
              <Link href="#" style={{ fontSize: "0.8125rem", color: "var(--boat-red)", fontWeight: 600 }}>
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
              Sign In
            </button>

            <p style={{ textAlign: "center", fontSize: "0.8125rem", color: "var(--boat-muted)", marginTop: 20 }}>
              Don&apos;t have an account?{" "}
              <Link href="/signup" style={{ color: "var(--boat-red)", fontWeight: 600 }}>
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
