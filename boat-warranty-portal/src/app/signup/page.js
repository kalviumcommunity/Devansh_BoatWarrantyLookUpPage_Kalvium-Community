"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserIcon, ShieldIcon, MailIcon, LockIcon, EyeIcon, PhoneIcon } from "@/components/Icons";

export default function SignUpPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState("user");
  const [showPwd1, setShowPwd1] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = {};

    if (form.fullName.trim().length < 2) nextErrors.fullName = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      nextErrors.email = "Enter a valid email address.";
    if (!/^\d{10}$/.test(form.phone.trim()))
      nextErrors.phone = "Enter a valid 10-digit phone number.";
    if (form.password.length < 6) nextErrors.password = "Password must be at least 6 characters.";
    if (form.confirmPassword !== form.password || form.confirmPassword.length === 0)
      nextErrors.confirmPassword = "Passwords do not match.";
    if (!form.terms) nextErrors.terms = "You must accept the terms to continue.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    router.push("/signin");
  }

  return (
    <div className="auth-shell">
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

        <h1 style={{ fontSize: "1.75rem", margin: "36px 0 8px" }}>Create an account</h1>
        <p style={{ color: "var(--boat-muted)", fontSize: "0.875rem", margin: 0 }}>
          Join to manage and track your warranty easily
        </p>

        <div className="product-stage">
          <svg width="220" height="180" viewBox="0 0 220 180" fill="none">
            <ellipse cx="110" cy="150" rx="80" ry="10" fill="#E4E6EA" />
            <rect x="45" y="98" width="130" height="46" rx="23" fill="#141416" />
            <rect x="70" y="82" width="18" height="34" rx="9" fill="#1C1C1E" />
            <rect x="132" y="82" width="18" height="34" rx="9" fill="#1C1C1E" />
            <circle cx="79" cy="70" r="16" fill="#1C1C1E" />
            <circle cx="141" cy="70" r="16" fill="#1C1C1E" />
            <path d="M79 54c8-14 22-14 30 0" stroke="#3A3A3D" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M141 54c8-14 22-14 30 0" stroke="#3A3A3D" strokeWidth="6" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        <div style={{ fontSize: "0.75rem", color: "var(--boat-muted)", marginTop: 22 }}>
          © 2025 boAt. All rights reserved.
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-inner">
          <h2 style={{ fontSize: "1.625rem", margin: "0 0 6px" }}>Sign Up</h2>
          <p style={{ color: "var(--boat-muted)", fontSize: "0.875rem", margin: "0 0 24px" }}>
            Create your account to get started
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
              </span>
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div style={{ marginBottom: 16 }}>
              <label className="field-label">Full Name</label>
              <div className="field-input-wrap">
                <span className="icon">
                  <UserIcon width="16" height="16" />
                </span>
                <input
                  className={errors.fullName ? "field-input field-error" : "field-input"}
                  type="text"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.fullName && <div className="field-error-text show">{errors.fullName}</div>}
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="field-label">Email</label>
              <div className="field-input-wrap">
                <span className="icon">
                  <MailIcon />
                </span>
                <input
                  className={errors.email ? "field-input field-error" : "field-input"}
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <div className="field-error-text show">{errors.email}</div>}
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="field-label">Phone Number</label>
              <div className="field-input-wrap">
                <span className="icon">
                  <PhoneIcon />
                </span>
                <input
                  className={errors.phone ? "field-input field-error" : "field-input"}
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
              {errors.phone && <div className="field-error-text show">{errors.phone}</div>}
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="field-label">Password</label>
              <div className="field-input-wrap">
                <span className="icon">
                  <LockIcon />
                </span>
                <input
                  className={errors.password ? "field-input pr-icon field-error" : "field-input pr-icon"}
                  type={showPwd1 ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  placeholder="Create a password"
                />
                <span className="icon icon-right" onClick={() => setShowPwd1((v) => !v)}>
                  <EyeIcon />
                </span>
              </div>
              {errors.password && <div className="field-error-text show">{errors.password}</div>}
            </div>

            <div style={{ marginBottom: 18 }}>
              <label className="field-label">Confirm Password</label>
              <div className="field-input-wrap">
                <span className="icon">
                  <LockIcon />
                </span>
                <input
                  className={
                    errors.confirmPassword ? "field-input pr-icon field-error" : "field-input pr-icon"
                  }
                  type={showPwd2 ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) => update("confirmPassword", e.target.value)}
                  placeholder="Confirm your password"
                />
                <span className="icon icon-right" onClick={() => setShowPwd2((v) => !v)}>
                  <EyeIcon />
                </span>
              </div>
              {errors.confirmPassword && (
                <div className="field-error-text show">{errors.confirmPassword}</div>
              )}
            </div>

            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
                fontSize: "0.8125rem",
                color: "var(--boat-muted)",
                marginBottom: 6,
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={form.terms}
                onChange={(e) => update("terms", e.target.checked)}
                style={{ marginTop: 2 }}
              />
              I agree to the{" "}
              <Link href="#" style={{ color: "var(--boat-red)", fontWeight: 600 }}>
                Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link href="#" style={{ color: "var(--boat-red)", fontWeight: 600 }}>
                Privacy Policy
              </Link>
            </label>
            {errors.terms && (
              <div className="field-error-text show" style={{ marginBottom: 14 }}>
                {errors.terms}
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: 12 }}>
              Sign Up
            </button>

            <p style={{ textAlign: "center", fontSize: "0.8125rem", color: "var(--boat-muted)", marginTop: 20 }}>
              Already have an account?{" "}
              <Link href="/signin" style={{ color: "var(--boat-red)", fontWeight: 600 }}>
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
