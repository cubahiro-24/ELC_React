import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useRouter } from "../../context/RouterContext.jsx";
import { NAV_ITEMS } from "../../data/navigation.js";
import { MagneticButton } from "../ui/MagneticButton.jsx";
import { Monogram } from "./Monogram.jsx";

export function Nav() {
  const { path, navigate } = useRouter();
  const [scrollY, setScrollY] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const compact = scrollY > 40;
  const items = NAV_ITEMS;

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      padding: compact ? "14px 28px" : "26px 28px",
      transition: "padding .4s, background .4s, border-color .4s",
      background: compact ? "rgba(244,237,224,0.92)" : "transparent",
      backdropFilter: compact ? "blur(14px)" : "none",
      borderBottom: compact ? "1px solid rgba(26,22,18,0.08)" : "1px solid transparent",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <button onClick={() => { navigate("/"); setOpen(false); }}
        style={{ background: "none", border: "none", padding: 0, color: "inherit", display: "flex", alignItems: "center", gap: 12 }}>
        <Monogram />
        <div style={{ lineHeight: 1, textAlign: "left" }}>
          <div className="display" style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em" }}>
            APLA<span style={{ color: "#d97706" }}>·</span>ELC
          </div>
          <div className="mono" style={{ fontSize: 9, opacity: 0.6, marginTop: 4, textTransform: "uppercase" }}>
            Bujumbura · BI
          </div>
        </div>
      </button>

      <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 2 }}>
        {items.map((it, i) => {
          const active = path === it.to;
          return (
            <button key={it.label} onClick={() => navigate(it.to)}
              style={{
                background: "none", border: "none", padding: "10px 16px",
                color: "inherit", fontSize: 14, opacity: active ? 1 : 0.7,
                fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 6,
                position: "relative", transition: "opacity .3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = active ? "1" : "0.7")}>
              <span className="mono" style={{ fontSize: 10, opacity: 0.45 }}>0{i + 1}</span>
              {it.label}
              {active && (
                <span style={{
                  position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)",
                  width: 4, height: 4, borderRadius: 999, background: "#d97706",
                  animation: "pulse 2s ease-in-out infinite",
                }} />
              )}
            </button>
          );
        })}
        <MagneticButton onClick={() => navigate("/contact")}
          style={{
            marginLeft: 12, padding: "10px 18px", background: "#1a1612", color: "#f4ede0",
            border: "none", fontSize: 13, borderRadius: 999, fontFamily: "inherit",
            display: "inline-flex", alignItems: "center", gap: 6, transition: "background .3s",
          }}>
          S'inscrire <ArrowUpRight size={14} />
        </MagneticButton>
      </nav>

      <button onClick={() => setOpen(!open)} className="mobile-toggle"
        style={{
          display: "none", background: "transparent", border: "1px solid #1a1612",
          borderRadius: 999, padding: 10, color: "#1a1612",
        }} aria-label="Toggle menu">
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0, background: "#f4ede0",
          borderBottom: "1px solid rgba(26,22,18,0.1)", padding: 24,
          display: "flex", flexDirection: "column", gap: 4,
        }}>
          {items.map((it) => (
            <button key={it.label} onClick={() => { navigate(it.to); setOpen(false); }}
              className="display"
              style={{
                background: "none", border: "none", textAlign: "left",
                padding: "14px 8px", color: "#1a1612", fontSize: 26,
                borderBottom: "1px solid rgba(26,22,18,0.08)", fontFamily: "Fraunces, serif",
              }}>
              {it.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}
