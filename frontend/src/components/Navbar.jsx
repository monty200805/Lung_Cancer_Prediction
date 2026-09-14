import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 28px",
        borderBottom: "1px solid var(--color-border)",
        background: "var(--color-surface)",
      }}
    >
      <div style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "var(--color-primary)" }}>
        Lung Cancer Risk Prediction
      </div>
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 14, color: "var(--color-ink-soft)" }}>{user.name}</span>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Log out
          </button>
        </div>
      )}
    </header>
  );
}
