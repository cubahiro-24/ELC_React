import React from "react";

export function Monogram() {
  return (
    <svg width="38" height="38" viewBox="0 0 40 40" style={{ flexShrink: 0 }}>
      <circle cx="20" cy="20" r="19" fill="none" stroke="#1a1612" strokeWidth="1" />
      <text x="20" y="26" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="16" fontWeight="600" fill="#1a1612">A</text>
      <circle cx="32" cy="8" r="2.5" fill="#d97706">
        <animate attributeName="r" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
