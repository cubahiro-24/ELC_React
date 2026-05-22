import React from "react";

export function StylizedMap() {
  return (
    <svg viewBox="0 0 500 300" style={{ width: "100%", height: "100%", background: "#1a1612" }}>
      <path d="M -20 80 Q 80 60 140 140 Q 200 220 100 280 Q 0 320 -20 280 Z" fill="#0c4a6e" opacity="0.7" />
      <path d="M -20 80 Q 80 60 140 140 Q 200 220 100 280 Q 0 320 -20 280 Z" fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.4" />
      <g stroke="#f4ede0" strokeWidth="1" opacity="0.25" fill="none">
        <line x1="100" y1="0" x2="500" y2="200" /><line x1="200" y1="0" x2="500" y2="120" />
        <line x1="0" y1="180" x2="500" y2="100" /><line x1="160" y1="0" x2="400" y2="300" />
        <line x1="300" y1="0" x2="300" y2="300" />
      </g>
      <line x1="180" y1="40" x2="310" y2="160" stroke="#d97706" strokeWidth="2" opacity="0.8" strokeDasharray="4 4" />
      <g transform="translate(310, 160)">
        <circle cx="0" cy="0" r="32" fill="#d97706" opacity="0.2">
          <animate attributeName="r" values="28;42;28" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="0" cy="0" r="14" fill="#d97706" />
        <circle cx="0" cy="0" r="6" fill="#f4ede0" />
      </g>
      <text x="40" y="180" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#38bdf8" opacity="0.6" letterSpacing="2">LAC TANGANYIKA</text>
      <text x="340" y="160" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#f4ede0" opacity="0.9" letterSpacing="1">APLA·ELC</text>
      <text x="340" y="178" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#f4ede0" opacity="0.55" letterSpacing="1">Av. P.L. Rwagasore</text>
      <text x="20" y="290" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#f4ede0" opacity="0.4" letterSpacing="2">BUJUMBURA · BI</text>
      <g transform="translate(450, 50)" stroke="#f4ede0" fill="none" opacity="0.5">
        <circle r="14" /><line x1="0" y1="-10" x2="0" y2="10" /><line x1="-10" y1="0" x2="10" y2="0" />
        <polygon points="0,-12 -3,-6 3,-6" fill="#d97706" stroke="none" />
      </g>
      <text x="450" y="86" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#f4ede0" opacity="0.6" textAnchor="middle">N</text>
    </svg>
  );
}
