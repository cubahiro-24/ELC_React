import React from "react";

export function MarqueeBand() {
  const items = [
    "Préparation TOEFL", "Coaching IELTS", "Anglais des affaires",
    "Accent américain", "Traductions certifiées", "Interprétariat",
    "Formation en entreprise", "Anglais diplomatique",
  ];
  const doubled = [...items, ...items];
  return (
    <div style={{
      background: "#1a1612", color: "#f4ede0", padding: "22px 0",
      overflow: "hidden", borderTop: "1px solid #1a1612", borderBottom: "1px solid #1a1612",
    }}>
      <div style={{ display: "flex", gap: 56, whiteSpace: "nowrap", animation: "marquee 38s linear infinite" }}>
        {doubled.map((it, i) => (
          <span key={i} className="display" style={{
            fontSize: 28, fontStyle: "italic", fontWeight: 300,
            display: "inline-flex", alignItems: "center", gap: 56,
          }}>
            {it}<span style={{ color: "#d97706", fontSize: 12 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
