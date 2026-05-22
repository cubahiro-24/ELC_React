import { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "../../context/RouterContext.jsx";
import { MagneticButton } from "../ui/MagneticButton.jsx";

export function CinematicHero() {
  const { navigate } = useRouter();
  const [scroll, setScroll] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    const onMove = (e) => {
      if (!heroRef.current) return;
      const r = heroRef.current.getBoundingClientRect();
      setMouse({
        x: (e.clientX - r.left - r.width / 2) / r.width,
        y: (e.clientY - r.top - r.height / 2) / r.height,
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const words = ["fluently", "boldly", "globally", "freely"];
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWordIdx((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={heroRef} style={{
      padding: "140px 28px 60px", minHeight: "100vh",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      position: "relative",
    }}>
      {/* Floating decorations */}
      <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "15%", right: "8%",
          transform: `translate(${mouse.x * 30}px, ${mouse.y * 30}px) rotate(${scroll * 0.05}deg)`,
          transition: "transform .8s cubic-bezier(.2,.7,.2,1)",
        }}>
          <svg width="120" height="120" viewBox="0 0 120 120" style={{ opacity: 0.7 }}>
            <circle cx="60" cy="60" r="50" fill="none" stroke="#d97706" strokeWidth="1" />
            <circle cx="60" cy="60" r="50" fill="none" stroke="#d97706" strokeWidth="0.5" strokeDasharray="2 6" />
            <text x="60" y="66" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="36" fontStyle="italic" fill="#d97706">A</text>
          </svg>
        </div>
        <div style={{
          position: "absolute", bottom: "25%", left: "6%",
          transform: `translate(${mouse.x * -20}px, ${mouse.y * -20}px)`,
          transition: "transform 1s cubic-bezier(.2,.7,.2,1)",
        }}>
          <svg width="80" height="80" viewBox="0 0 80 80" style={{ animation: "float 6s ease-in-out infinite" }}>
            <polygon points="40,8 50,30 72,30 54,46 60,68 40,56 20,68 26,46 8,30 30,30"
              fill="none" stroke="#1a1612" strokeWidth="1" opacity="0.4" />
          </svg>
        </div>
      </div>

      <div className="mono" style={{
        display: "flex", justifyContent: "space-between", fontSize: 11,
        opacity: 0.55, textTransform: "uppercase", letterSpacing: "0.1em",
        marginBottom: 40, flexWrap: "wrap", gap: 12,
        animation: "fadeIn 1s .2s both",
      }}>
        <span>Vol. XII · Édition Bujumbura</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: "#22c55e", animation: "pulse 2s infinite" }} />
          Inscriptions ouvertes
        </span>
        <span>Agrément Ministériel №530/078</span>
      </div>

      <div style={{ position: "relative" }}>
        <h1 className="display" style={{
          fontSize: "clamp(56px, 13vw, 200px)", lineHeight: 0.88,
          fontWeight: 400, letterSpacing: "-0.04em", margin: 0,
          animation: "fadeUp 1.2s cubic-bezier(.2,.7,.2,1) both",
        }}>
          Parler{" "}
          <span style={{
            position: "relative", display: "inline-block", minWidth: "5ch",
          }}>
            <em key={wordIdx} style={{
              fontStyle: "italic", fontWeight: 300, color: "#d97706",
              display: "inline-block",
              animation: "fadeUp .6s cubic-bezier(.2,.7,.2,1) both",
            }}>
              {words[wordIdx]}.
            </em>
          </span>
          <br />Penser{" "}
          <span style={{ position: "relative", display: "inline-block" }}>
            sans frontières.
            <svg viewBox="0 0 500 20" preserveAspectRatio="none"
              style={{ position: "absolute", left: 0, right: 0, bottom: "-12px", width: "100%", height: 18 }}>
              <path d="M 4 10 Q 100 2 200 10 T 400 10 T 496 8" stroke="#d97706" strokeWidth="3" fill="none" strokeLinecap="round"
                strokeDasharray="1000" strokeDashoffset="1000"
                style={{ animation: "drawIn 2s 1s cubic-bezier(.7,0,.3,1) both" }} />
            </svg>
            <style>{`@keyframes drawIn { to { stroke-dashoffset: 0; } }`}</style>
          </span>
        </h1>
      </div>

      <div className="hero-lower" style={{
        marginTop: 80, display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 40, alignItems: "end",
      }}>
        <p style={{
          fontSize: "clamp(16px, 1.6vw, 20px)", lineHeight: 1.55, maxWidth: 460, margin: 0, opacity: 0.85,
          animation: "fadeUp 1s .8s both",
        }}>
          Depuis plus d'une décennie, APLA·ELC forme à Bujumbura les diplomates, professionnels et étudiants ambitieux qui refusent que la langue soit une frontière.
        </p>
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 14,
          animation: "fadeUp 1s 1s both",
        }}>
          <MagneticButton onClick={() => navigate("/services")}
            style={{
              background: "#1a1612", color: "#f4ede0", padding: "22px 36px",
              borderRadius: 999, border: "none", fontSize: 16, fontFamily: "inherit",
              display: "inline-flex", alignItems: "center", gap: 10, transition: "background .3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#d97706")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#1a1612")}>
            Découvrir nos programmes <ArrowUpRight size={18} />
          </MagneticButton>
          <div className="mono" style={{
            fontSize: 11, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.1em",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <span style={{ display: "inline-block", animation: "scrollHint 2s infinite" }}>↓</span>
            Faire défiler · Explorer
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .hero-lower { grid-template-columns: 1fr !important; gap: 28px !important; }
          .hero-lower > div:last-child { align-items: flex-start !important; }
        }
      `}</style>
    </section>
  );
}
