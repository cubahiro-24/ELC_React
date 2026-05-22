import { useState, useEffect } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => {
      const tag = e.target.tagName;
      const isInteractive = tag === "A" || tag === "BUTTON" || e.target.closest("a, button, [data-cursor='hover']");
      setHover(!!isInteractive);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);
  return (
    <>
      <div
        className="cursor-dot"
        style={{
          position: "fixed", left: pos.x, top: pos.y, zIndex: 9998,
          width: hover ? 40 : 8, height: hover ? 40 : 8,
          borderRadius: 999, background: hover ? "transparent" : "#d97706",
          border: hover ? "1.5px solid #d97706" : "none",
          transform: "translate(-50%,-50%)", pointerEvents: "none",
          transition: "width .25s, height .25s, background .25s, border .25s",
          mixBlendMode: "difference",
        }}
      />
      <style>{`
        @media (pointer: coarse) { .cursor-dot { display: none !important; } }
        @media (pointer: fine) { * { cursor: none !important; } }
      `}</style>
    </>
  );
}
