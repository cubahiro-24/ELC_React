import { useState, useEffect } from "react";

export function AmbientShapes() {
  const [scroll, setScroll] = useState(0);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    const onMove = (e) => setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);
  return (
    <div aria-hidden style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      <div style={{
        position: "absolute",
        top: `${10 - scroll * 0.05}%`,
        left: `${5 + (mouse.x - 0.5) * 3}%`,
        width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(217,119,6,0.18), transparent 70%)",
        filter: "blur(40px)", transition: "left .8s ease-out",
      }} />
      <div style={{
        position: "absolute",
        top: `${60 - scroll * 0.08}%`,
        right: `${10 + (mouse.x - 0.5) * -4}%`,
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,45,18,0.12), transparent 70%)",
        filter: "blur(60px)", transition: "right 1s ease-out",
      }} />
    </div>
  );
}
