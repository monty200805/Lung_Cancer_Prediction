import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/predict", label: "New Prediction" },
  { to: "/history", label: "History" },
  { to: "/about", label: "About" },
];

export default function Sidebar() {
  return (
    <nav
      style={{
        width: 200,
        borderRight: "1px solid var(--color-border)",
        background: "var(--color-surface)",
        padding: "20px 12px",
        flexShrink: 0,
      }}
    >
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          style={({ isActive }) => ({
            display: "block",
            padding: "9px 14px",
            borderRadius: 7,
            fontSize: 14.5,
            marginBottom: 4,
            textDecoration: "none",
            color: isActive ? "#fff" : "var(--color-ink)",
            background: isActive ? "var(--color-primary)" : "transparent",
          })}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
