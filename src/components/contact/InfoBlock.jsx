import React from "react";

export function InfoBlock({ icon: Icon, label, value, href }) {
  const inner = (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 16, transition: "transform .3s" }}
      className="info-block"
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(6px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}>
      <div style={{
        width: 44, height: 44, borderRadius: 999, background: "rgba(217,119,6,0.12)",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <Icon size={18} style={{ color: "#d97706" }} />
      </div>
      <div>
        <div className="mono" style={{ fontSize: 10, opacity: 0.55, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 16, lineHeight: 1.5 }}>{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} style={{ color: "inherit", textDecoration: "none" }}>{inner}</a> : inner;
}
