import React from "react";

export function ArticleArtwork({ variant }) {
  const variants = {
    a: (
      <svg viewBox="0 0 400 300" style={{ width: "100%", height: "100%" }}>
        <rect width="400" height="300" fill="#fef3e2" />
        {[...Array(8)].map((_, i) => (
          <line key={i} x1="0" y1={40 + i * 28} x2="400" y2={20 + i * 30} stroke="#d97706" strokeWidth="1" opacity={0.2 + i * 0.07} />
        ))}
        <circle cx="280" cy="160" r="50" fill="#d97706" />
        <text x="200" y="270" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="42" fontStyle="italic" fontWeight="300" fill="#1a1612">Dépêche</text>
      </svg>
    ),
    b: (
      <svg viewBox="0 0 400 300" style={{ width: "100%", height: "100%" }}>
        <rect width="400" height="300" fill="#1a1612" />
        <text x="40" y="120" fontFamily="Fraunces, serif" fontSize="80" fontWeight="400" fill="#d97706">A</text>
        <text x="120" y="180" fontFamily="Fraunces, serif" fontSize="100" fontStyle="italic" fontWeight="300" fill="#f4ede0">B</text>
        <text x="220" y="240" fontFamily="Fraunces, serif" fontSize="120" fontWeight="500" fill="#f4ede0" opacity="0.9">C</text>
        <circle cx="60" cy="220" r="6" fill="#d97706" />
      </svg>
    ),
    c: (
      <svg viewBox="0 0 400 300" style={{ width: "100%", height: "100%" }}>
        <rect width="400" height="300" fill="#fef3e2" />
        {[...Array(40)].map((_, i) => (
          <circle key={i} cx={20 + (i % 8) * 50} cy={30 + Math.floor(i / 8) * 50} r={2 + ((i * 7) % 4)} fill="#1a1612" opacity={0.3 + ((i * 13) % 4) * 0.1} />
        ))}
        <rect x="100" y="100" width="200" height="100" fill="#d97706" opacity="0.9" />
        <text x="200" y="160" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="14" fill="#1a1612" letterSpacing="3">ATELIER</text>
      </svg>
    ),
    d: (
      <svg viewBox="0 0 400 300" style={{ width: "100%", height: "100%" }}>
        <rect width="400" height="300" fill="#7c2d12" />
        <path d="M 0 200 Q 100 120 200 180 T 400 160 L 400 300 L 0 300 Z" fill="#d97706" />
        <path d="M 0 230 Q 100 170 200 220 T 400 200 L 400 300 L 0 300 Z" fill="#1a1612" opacity="0.4" />
        <circle cx="320" cy="80" r="32" fill="#f4ede0" opacity="0.95" />
      </svg>
    ),
  };
  return variants[variant] || variants.a;
}
