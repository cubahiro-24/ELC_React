import React from "react";

export function FeaturedArtwork() {
  return (
    <div style={{ aspectRatio: "5/4", background: "#1a1612", borderRadius: 4, position: "relative", overflow: "hidden" }}>
      <svg viewBox="0 0 500 400" style={{ width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="warm" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d97706" /><stop offset="100%" stopColor="#7c2d12" />
          </linearGradient>
        </defs>
        <rect width="500" height="400" fill="#1a1612" />
        <circle cx="380" cy="120" r="80" fill="url(#warm)" opacity="0.85">
          <animate attributeName="r" values="80;90;80" dur="6s" repeatCount="indefinite" />
        </circle>
        <circle cx="380" cy="120" r="80" fill="none" stroke="#f4ede0" strokeWidth="1" opacity="0.3" />
        <circle cx="380" cy="120" r="120" fill="none" stroke="#f4ede0" strokeWidth="1" opacity="0.15" />
        <circle cx="380" cy="120" r="160" fill="none" stroke="#f4ede0" strokeWidth="1" opacity="0.08" />
        <text x="60" y="260" fontFamily="Fraunces, serif" fontSize="64" fontStyle="italic" fontWeight="300" fill="#f4ede0">Nouveau</text>
        <text x="60" y="320" fontFamily="Fraunces, serif" fontSize="64" fontWeight="400" fill="#d97706">chapitre.</text>
        <text x="60" y="362" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#f4ede0" opacity="0.5" letterSpacing="2">
          INSCRIPTIONS · OUVERTES
        </text>
      </svg>
    </div>
  );
}
