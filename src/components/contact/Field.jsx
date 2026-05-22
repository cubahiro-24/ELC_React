import React from "react";

export function Field({ label, children, required, focused }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span className="mono" style={{
        fontSize: 11, opacity: focused ? 1 : 0.6, color: focused ? "#d97706" : "inherit",
        letterSpacing: "0.1em", textTransform: "uppercase", transition: "color .3s, opacity .3s",
      }}>
        {label} {required && <span style={{ color: "#d97706" }}>·</span>}
      </span>
      {children}
    </label>
  );
}
