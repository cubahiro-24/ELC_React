import React from "react";

export function GrainOverlay() {
  return (
    <div aria-hidden style={{
      position: "fixed", inset: 0, pointerEvents: "none", opacity: 0.32,
      mixBlendMode: "multiply", zIndex: 1,
      backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.1  0 0 0 0 0.08  0 0 0 0 0.06  0 0 0 0.18 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
    }} />
  );
}
