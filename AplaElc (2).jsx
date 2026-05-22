import React, { useState, useEffect, useRef, createContext, useContext, useCallback } from "react";
import {
  BookOpen, Languages, Mic, GraduationCap, Building2, Monitor,
  ArrowUpRight, ArrowRight, ArrowLeft, Mail, Phone, MapPin, Clock,
  Menu, X, ChevronRight, ChevronDown, Star, Award, Users, Globe,
  Calendar, Quote, CheckCircle2, Send, Sparkles, Play, Pause,
  PenTool, Headphones, Target, TrendingUp, Compass, Feather,
} from "lucide-react";

/* ============================================================
   APLA·ELC — Living Edition
   ----------------------------------------------------------
   Pages : Home · About · Services · News · Contact
   Style : Editorial · animated · immersive · alive
   ============================================================ */

const RouterContext = createContext({ path: "/", navigate: () => {} });
const useRouter = () => useContext(RouterContext);

export default function App() {
  const [path, setPath] = useState("/");
  const [transitioning, setTransitioning] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const navigate = (to) => {
    if (to === path) return;
    setTransitioning(true);
    setTimeout(() => {
      setPath(to);
      window.scrollTo({ top: 0, behavior: "instant" });
      setTimeout(() => setTransitioning(false), 80);
    }, 450);
  };

  useEffect(() => {
    const id = "apla-fonts";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT,WONK@9..144,300..900,0..100,0..1&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=JetBrains+Mono:wght@300;400;500&display=swap";
      document.head.appendChild(link);
    }
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      <div
        style={{
          background: "#f4ede0",
          color: "#1a1612",
          fontFamily: "'Newsreader', Georgia, serif",
          minHeight: "100vh",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {!loaded && <LoadingScreen />}
        <CustomCursor />
        <ScrollProgress />
        <GrainOverlay />
        <AmbientShapes />
        <Nav />

        <main
          style={{
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? "translateY(20px)" : "translateY(0)",
            transition: "opacity .45s cubic-bezier(.4,0,.2,1), transform .45s cubic-bezier(.4,0,.2,1)",
            position: "relative",
            zIndex: 2,
          }}
        >
          {path === "/" && <HomePage />}
          {path === "/about" && <AboutPage />}
          {path === "/services" && <ServicesPage />}
          {path === "/news" && <NewsPage />}
          {path === "/contact" && <ContactPage />}
        </main>

        <Footer />
        <GlobalStyles />
      </div>
    </RouterContext.Provider>
  );
}

/* ============================================================
   ATMOSPHERE — Loading, cursor, scroll progress, ambient shapes
   ============================================================ */

function LoadingScreen() {
  const [exiting, setExiting] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setExiting(true), 1400);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 999, background: "#1a1612",
      color: "#f4ede0", display: "flex", alignItems: "center", justifyContent: "center",
      transform: exiting ? "translateY(-100%)" : "translateY(0)",
      transition: "transform 1s cubic-bezier(.7,0,.3,1)",
      pointerEvents: exiting ? "none" : "auto",
    }}>
      <div style={{ textAlign: "center" }}>
        <div className="display" style={{
          fontSize: "clamp(64px, 10vw, 140px)", fontWeight: 300,
          fontStyle: "italic", letterSpacing: "-0.04em",
          animation: "fadeIn .8s both",
        }}>
          APLA<span style={{ color: "#d97706", fontStyle: "normal" }}>·</span>ELC
        </div>
        <div className="mono" style={{
          marginTop: 28, fontSize: 11, letterSpacing: "0.3em", opacity: 0.6,
          animation: "fadeIn 1s .3s both",
        }}>
          PREPARING THE STAGE
        </div>
        <div style={{
          marginTop: 28, width: 200, height: 1, background: "rgba(244,237,224,0.2)",
          overflow: "hidden", margin: "28px auto 0",
        }}>
          <div style={{ height: "100%", background: "#d97706", animation: "loadBar 1.3s cubic-bezier(.7,0,.3,1) both" }} />
        </div>
      </div>
    </div>
  );
}

function CustomCursor() {
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

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, height: 2,
      zIndex: 100, background: "rgba(26,22,18,0.06)", pointerEvents: "none",
    }}>
      <div style={{
        height: "100%", width: `${progress}%`,
        background: "linear-gradient(90deg, #d97706, #ea580c)",
        transition: "width .15s linear",
      }} />
    </div>
  );
}

function AmbientShapes() {
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

function GrainOverlay() {
  return (
    <div aria-hidden style={{
      position: "fixed", inset: 0, pointerEvents: "none", opacity: 0.32,
      mixBlendMode: "multiply", zIndex: 1,
      backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.1  0 0 0 0 0.08  0 0 0 0 0.06  0 0 0 0.18 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
    }} />
  );
}

function GlobalStyles() {
  return (
    <style>{`
      html { scroll-behavior: smooth; }
      ::selection { background: #d97706; color: #fffaf0; }
      .display { font-family: 'Fraunces', Georgia, serif; font-feature-settings: "ss01"; }
      .mono { font-family: 'JetBrains Mono', ui-monospace, monospace; letter-spacing: 0.02em; }
      a, button { cursor: pointer; }

      @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes slowSpin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
      @keyframes pulse { 0%,100% { opacity: .4; transform: scale(1); } 50% { opacity: 1; transform: scale(1.05); } }
      @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      @keyframes loadBar { from { width: 0%; } to { width: 100%; } }
      @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
      @keyframes wave { 0%,100% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } }
      @keyframes blink { 0%,50% { opacity: 1; } 51%,100% { opacity: 0; } }
      @keyframes scrollHint { 0% { transform: translateY(-12px); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(12px); opacity: 0; } }

      .reveal { opacity: 0; transform: translateY(40px); transition: opacity 1s cubic-bezier(.2,.7,.2,1), transform 1s cubic-bezier(.2,.7,.2,1); }
      .reveal.in { opacity: 1; transform: translateY(0); }
      .reveal-stagger > * { opacity: 0; transform: translateY(30px); transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1); }
      .reveal-stagger.in > * { opacity: 1; transform: translateY(0); }
      .reveal-stagger.in > *:nth-child(1) { transition-delay: 0s; }
      .reveal-stagger.in > *:nth-child(2) { transition-delay: .08s; }
      .reveal-stagger.in > *:nth-child(3) { transition-delay: .16s; }
      .reveal-stagger.in > *:nth-child(4) { transition-delay: .24s; }
      .reveal-stagger.in > *:nth-child(5) { transition-delay: .32s; }
      .reveal-stagger.in > *:nth-child(6) { transition-delay: .4s; }

      .magnetic { transition: transform .3s cubic-bezier(.2,.7,.2,1); }
      .card-invert { transition: transform .6s cubic-bezier(.2,.7,.2,1), background .5s, color .5s, border-color .5s; }
      .card-invert:hover { transform: translateY(-8px); background: #1a1612 !important; color: #f4ede0 !important; }
      .card-invert:hover .arr { transform: translate(6px,-6px); color: #d97706; }
      .arr { transition: transform .5s, color .5s; }
      .underline-anim { position: relative; display: inline-block; }
      .underline-anim::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 100%; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: right; transition: transform .6s cubic-bezier(.2,.7,.2,1); }
      .underline-anim:hover::after { transform: scaleX(1); transform-origin: left; }

      .text-mask { background: linear-gradient(110deg, #1a1612 30%, #d97706 50%, #1a1612 70%); background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; animation: shimmer 6s linear infinite; }

      .glow-on-hover { transition: filter .4s, transform .4s; }
      .glow-on-hover:hover { filter: drop-shadow(0 0 24px rgba(217,119,6,0.4)); transform: scale(1.02); }

      .btn-shine { position: relative; overflow: hidden; }
      .btn-shine::before { content: ''; position: absolute; inset: 0; background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%); transform: translateX(-100%); transition: transform .8s; }
      .btn-shine:hover::before { transform: translateX(100%); }
    `}</style>
  );
}

/* useReveal — intersection observer hook */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, stagger, className = "", style }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`${stagger ? "reveal-stagger" : "reveal"} ${visible ? "in" : ""} ${className}`} style={style}>
      {children}
    </div>
  );
}

/* Magnetic Button */
function MagneticButton({ children, onClick, style, ...rest }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = "translate(0,0)"; };
  return (
    <button
      ref={ref} onClick={onClick} onMouseMove={onMove} onMouseLeave={onLeave}
      className="magnetic btn-shine"
      style={style} {...rest}
    >
      {children}
    </button>
  );
}

/* ============================================================
   NAV
   ============================================================ */

function Nav() {
  const { path, navigate } = useRouter();
  const [scrollY, setScrollY] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const compact = scrollY > 40;
  const items = [
    { label: "Accueil", to: "/" },
    { label: "À propos", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Actualités", to: "/news" },
    { label: "Contact", to: "/contact" },
  ];

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

function Monogram() {
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

/* ============================================================
   HOMEPAGE — Cinematic
   ============================================================ */

function HomePage() {
  const { navigate } = useRouter();
  return (
    <>
      <CinematicHero />
      <MarqueeBand />
      <ManifestoSection />
      <ServicesPreview />
      <NumbersThatMatter />
      <TestimonialReel />
      <FaqAccordion />
      <FinalCTA />
    </>
  );
}

function CinematicHero() {
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

function MarqueeBand() {
  const items = [
    "Préparation TOEFL", "Coaching IELTS", "Anglais des affaires",
    "Accent américain", "Traductions certifiées", "Interprétariat",
    "Formation en entreprise", "Anglais diplomatique",
  ];
  const doubled = [...items, ...items];
  return (
    <div style={{
      background: "#1a1612", color: "#f4ede0", padding: "22px 0",
      overflow: "hidden", borderTop: "1px solid #1a1612", borderBottom: "1px solid #1a1612",
    }}>
      <div style={{ display: "flex", gap: 56, whiteSpace: "nowrap", animation: "marquee 38s linear infinite" }}>
        {doubled.map((it, i) => (
          <span key={i} className="display" style={{
            fontSize: 28, fontStyle: "italic", fontWeight: 300,
            display: "inline-flex", alignItems: "center", gap: 56,
          }}>
            {it}<span style={{ color: "#d97706", fontSize: 12 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function ManifestoSection() {
  const { navigate } = useRouter();
  return (
    <section style={{ padding: "140px 28px", maxWidth: 1400, margin: "0 auto" }}>
      <div className="feature-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }}>
        <Reveal style={{ position: "sticky", top: 120 }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.55, marginBottom: 16 }}>
            § Manifeste · Notre conviction
          </div>
          <h2 className="display" style={{
            fontSize: "clamp(38px, 5vw, 64px)", lineHeight: 1.0,
            letterSpacing: "-0.03em", fontWeight: 400, margin: 0,
          }}>
            On n'apprend pas l'anglais. <em style={{ fontStyle: "italic", color: "#d97706" }}>On le prend en main.</em>
          </h2>
          <p style={{ marginTop: 28, fontSize: 16, lineHeight: 1.6, opacity: 0.8, maxWidth: 380 }}>
            Chez nous, vous ne récitez pas des tableaux de grammaire. Vous débattez, vous écrivez, vous présentez, vous persuadez — jusqu'à ce que la langue cesse d'être un mur et devienne un outil.
          </p>
          <MagneticButton onClick={() => navigate("/about")}
            style={{
              marginTop: 28, background: "transparent", border: "1px solid #1a1612",
              padding: "14px 22px", borderRadius: 999, color: "#1a1612", fontFamily: "inherit",
              fontSize: 14, display: "inline-flex", alignItems: "center", gap: 8, transition: "background .3s, color .3s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#1a1612"; e.currentTarget.style.color = "#f4ede0"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#1a1612"; }}>
            Notre philosophie <ArrowRight size={14} />
          </MagneticButton>
        </Reveal>

        <Reveal stagger>
          {[
            { word: "Professionnalisme.", body: "Chaque enseignant est sélectionné, chaque programme est étudié, chaque certificat fait foi. Nous prenons la langue au sérieux, parce qu'elle le mérite." },
            { word: "Inclusivité.", body: "Du débutant absolu à l'universitaire publié, nos salles sont conçues pour que chaque apprenant trouve son rythme — puis le dépasse." },
            { word: "Dévouement.", body: "Notre succès ne se mesure pas en inscriptions, mais en diplômés : en promotions obtenues, bourses décrochées, conversations qui ne font plus peur." },
          ].map((v, i) => (
            <div key={v.word} style={{
              padding: "36px 0", borderTop: "1px solid rgba(26,22,18,0.15)",
              borderBottom: i === 2 ? "1px solid rgba(26,22,18,0.15)" : "none",
              display: "grid", gridTemplateColumns: "auto 1fr", gap: 28, alignItems: "baseline",
            }}>
              <div className="mono" style={{ fontSize: 12, opacity: 0.45 }}>{String(i + 1).padStart(2, "0")}</div>
              <div>
                <h3 className="display" style={{
                  fontSize: "clamp(28px, 3.4vw, 44px)", fontWeight: 400,
                  letterSpacing: "-0.02em", margin: "0 0 12px 0",
                }}>{v.word}</h3>
                <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0, maxWidth: 560, opacity: 0.85 }}>{v.body}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
      <style>{`@media (max-width: 900px) { .feature-grid { grid-template-columns: 1fr !important; gap: 40px !important; } .feature-grid > div:first-child { position: static !important; } }`}</style>
    </section>
  );
}

function ServicesPreview() {
  const { navigate } = useRouter();
  return (
    <section style={{ background: "#1a1612", color: "#f4ede0", padding: "120px 28px", position: "relative" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 60, flexWrap: "wrap", gap: 20 }}>
            <div>
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.5, marginBottom: 16 }}>
                § Nos programmes
              </div>
              <h2 className="display" style={{
                fontSize: "clamp(44px, 7vw, 96px)", lineHeight: 0.95,
                letterSpacing: "-0.035em", fontWeight: 400, margin: 0,
              }}>
                Six voies.<br />
                <em style={{ fontStyle: "italic", color: "#d97706", fontWeight: 300 }}>Une destination.</em>
              </h2>
            </div>
            <MagneticButton onClick={() => navigate("/services")}
              style={{
                background: "transparent", border: "1px solid rgba(244,237,224,0.3)",
                color: "#f4ede0", padding: "14px 22px", borderRadius: 999, fontFamily: "inherit",
                fontSize: 14, display: "inline-flex", alignItems: "center", gap: 8, transition: "all .3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#d97706"; e.currentTarget.style.borderColor = "#d97706"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(244,237,224,0.3)"; }}>
              Tous nos services <ArrowUpRight size={14} />
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal stagger>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 1, background: "rgba(244,237,224,0.15)", border: "1px solid rgba(244,237,224,0.15)",
          }}>
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <article key={s.title} onClick={() => navigate("/services")} className="card-invert"
                  style={{
                    background: "#1a1612", padding: "40px 32px", display: "flex",
                    flexDirection: "column", gap: 20, minHeight: 280, cursor: "pointer",
                  }}>
                  <header style={{ display: "flex", justifyContent: "space-between" }}>
                    <span className="mono" style={{ fontSize: 11, opacity: 0.5, letterSpacing: "0.1em" }}>{s.kicker} /06</span>
                    <ArrowUpRight size={20} className="arr" style={{ opacity: 0.55 }} />
                  </header>
                  <Icon size={28} strokeWidth={1.4} style={{ color: "#d97706" }} />
                  <h3 className="display" style={{ fontSize: 26, fontWeight: 400, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.05 }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.55, margin: 0, opacity: 0.75, marginTop: "auto" }}>{s.short}</p>
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* Animated counter */
function CountUp({ to, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal(0.3);
  useEffect(() => {
    if (!visible) return;
    const start = Date.now();
    const numericTo = parseFloat(String(to).replace(/[^\d.]/g, ""));
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(numericTo * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    tick();
  }, [visible, to, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function NumbersThatMatter() {
  const stats = [
    { n: 10, suffix: "+", l: "Années d'enseignement" },
    { n: 2400, suffix: "", l: "Étudiants formés" },
    { n: 6, suffix: "", l: "Programmes spécialisés" },
    { n: 100, suffix: "%", l: "Certifié par l'État" },
  ];
  return (
    <section style={{ padding: "100px 28px" }}>
      <Reveal>
        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.55, marginBottom: 20, textAlign: "center" }}>
          § Les chiffres parlent
        </div>
        <h2 className="display" style={{
          fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.05, textAlign: "center",
          letterSpacing: "-0.03em", fontWeight: 400, margin: "0 0 80px 0",
        }}>
          Une décennie à <em style={{ fontStyle: "italic", color: "#d97706" }}>former</em>, en quatre nombres.
        </h2>
      </Reveal>
      <div style={{
        maxWidth: 1400, margin: "0 auto", display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        borderTop: "1px solid rgba(26,22,18,0.2)", borderBottom: "1px solid rgba(26,22,18,0.2)",
      }}>
        {stats.map((s, i, arr) => (
          <div key={s.l} style={{
            padding: "48px 28px",
            borderRight: i < arr.length - 1 ? "1px solid rgba(26,22,18,0.15)" : "none",
            textAlign: "center",
          }}>
            <div className="display" style={{ fontSize: "clamp(48px, 6vw, 84px)", fontWeight: 400, letterSpacing: "-0.04em", lineHeight: 1 }}>
              <CountUp to={s.n} suffix={s.suffix} />
            </div>
            <div className="mono" style={{ marginTop: 14, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.6 }}>
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialReel() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const items = [
    { quote: "Je suis arrivée sans pouvoir commander un café en anglais. Six mois plus tard, je donnais la conférence d'ouverture régionale. Chez APLA·ELC, on ne vous enseigne pas l'anglais — on vous tend un micro et on vous met au défi de l'utiliser.", name: "Annick N.", role: "Cheffe de projet · ONU Burundi" },
    { quote: "La préparation au TOEFL était rigoureuse, méthodique, et franchement transformatrice. J'ai obtenu 112. J'étudie aujourd'hui à McGill avec une bourse complète. J'envoie chaque cousin ambitieux que j'ai chez APLA.", name: "Patrick H.", role: "Étudiant en master · Université McGill" },
    { quote: "Toute notre équipe de direction s'est inscrite au programme entreprise. En un an, nous avions ouvert des bureaux à Kampala et Nairobi. L'investissement s'est remboursé dix fois.", name: "Béatrice M.", role: "PDG · Lake Tanganyika Logistics" },
    { quote: "Les enseignants ne lâchent rien. Ils corrigent, encouragent, exigent. C'est exactement ce qu'il fallait. J'ai obtenu ma bourse Mastercard à six mois de la date butoir.", name: "Christian B.", role: "Boursier Mastercard · ALU Rwanda" },
  ];

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 7000);
    return () => clearInterval(t);
  }, [paused, items.length]);

  return (
    <section style={{ padding: "120px 28px", background: "rgba(217,119,6,0.06)", position: "relative", overflow: "hidden" }}>
      <Reveal>
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.55 }}>
              § Voix de notre communauté
            </div>
            <button onClick={() => setPaused((p) => !p)} aria-label={paused ? "Resume" : "Pause"}
              style={{
                background: "transparent", border: "1px solid rgba(26,22,18,0.2)",
                borderRadius: 999, padding: 10, color: "#1a1612",
                display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11,
                fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.05em",
              }}>
              {paused ? <Play size={12} /> : <Pause size={12} />}
              {paused ? "REPRENDRE" : "PAUSE"}
            </button>
          </div>

          <Quote size={48} strokeWidth={1} style={{ color: "#d97706", margin: "0 auto 30px", display: "block" }} />

          <div style={{ position: "relative", minHeight: 280 }}>
            {items.map((it, i) => (
              <div key={i} style={{
                position: i === idx ? "relative" : "absolute",
                top: 0, left: 0, right: 0,
                opacity: i === idx ? 1 : 0,
                transform: i === idx ? "translateY(0)" : "translateY(20px)",
                transition: "opacity .8s, transform .8s",
                pointerEvents: i === idx ? "auto" : "none",
              }}>
                <blockquote className="display" style={{
                  fontSize: "clamp(22px, 3.2vw, 38px)", lineHeight: 1.3, fontStyle: "italic",
                  fontWeight: 300, textAlign: "center", margin: "0 0 40px 0", letterSpacing: "-0.01em",
                }}>
                  "{it.quote}"
                </blockquote>
                <div style={{ textAlign: "center" }}>
                  <div className="display" style={{ fontSize: 20, fontWeight: 500 }}>{it.name}</div>
                  <div className="mono" style={{ fontSize: 12, opacity: 0.6, marginTop: 6, letterSpacing: "0.05em" }}>{it.role}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 60 }}>
            {items.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)}
                style={{
                  width: i === idx ? 40 : 8, height: 8, borderRadius: 999,
                  background: i === idx ? "#d97706" : "rgba(26,22,18,0.2)",
                  border: "none", transition: "width .4s, background .4s",
                }}
                aria-label={`Témoignage ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function FaqAccordion() {
  const [open, setOpen] = useState(0);
  const faqs = [
    { q: "Combien de temps faut-il pour devenir fluide en anglais ?", a: "Cela dépend de votre niveau de départ et de votre engagement. Un débutant complet atteint en général un niveau conversationnel solide (B1) en 8 à 12 mois avec deux cours par semaine. Pour les niveaux avancés (C1/C2), comptez 18 à 24 mois. Notre évaluation initiale vous donne une feuille de route précise." },
    { q: "Vos certificats sont-ils reconnus à l'étranger ?", a: "Oui. Nos diplômes sont délivrés sous l'agrément ministériel N°530/078 et reconnus par les universités, ambassades et employeurs à travers l'EAC. Pour les études à l'étranger, nous préparons en plus aux examens internationaux (TOEFL, IELTS) qui sont la norme universelle." },
    { q: "Puis-je suivre les cours en ligne depuis l'étranger ?", a: "Absolument. Nous accueillons régulièrement des étudiants depuis le Kenya, l'Ouganda, le Rwanda et la diaspora. Les cours en ligne ont la même qualité, les mêmes enseignants et les mêmes certificats que les cours sur place." },
    { q: "Quels sont les horaires des cours ?", a: "Nous proposons trois créneaux : matin (8h–12h), soirée (17h–20h), et samedi (10h–14h). Vous choisissez celui qui correspond à votre vie professionnelle ou universitaire." },
    { q: "Que se passe-t-il si je n'arrive pas à suivre le rythme ?", a: "Chaque étudiant bénéficie d'un suivi individuel mensuel. Si vous décrochez, vous ne décrochez pas seul : nous ajustons le rythme, proposons des heures de soutien, ou décalons vers un cohorte plus adaptée. Personne n'est laissé en arrière." },
  ];
  return (
    <section style={{ padding: "120px 28px", maxWidth: 1100, margin: "0 auto" }}>
      <Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, alignItems: "start" }} className="faq-grid">
          <div style={{ position: "sticky", top: 120 }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.55, marginBottom: 16 }}>
              § Questions fréquentes
            </div>
            <h2 className="display" style={{
              fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.0,
              letterSpacing: "-0.03em", fontWeight: 400, margin: 0,
            }}>
              Vos questions, <em style={{ fontStyle: "italic", color: "#d97706" }}>nos réponses</em> directes.
            </h2>
            <p style={{ marginTop: 24, fontSize: 16, lineHeight: 1.6, opacity: 0.75, maxWidth: 320 }}>
              Une question qui n'est pas ici ? Écrivez-nous. Nous répondons à chaque message en moins de 48 heures.
            </p>
          </div>

          <div>
            {faqs.map((f, i) => (
              <div key={i} style={{
                borderTop: "1px solid rgba(26,22,18,0.15)",
                borderBottom: i === faqs.length - 1 ? "1px solid rgba(26,22,18,0.15)" : "none",
              }}>
                <button onClick={() => setOpen(open === i ? -1 : i)}
                  style={{
                    width: "100%", textAlign: "left", background: "none", border: "none",
                    padding: "28px 0", display: "flex", justifyContent: "space-between",
                    alignItems: "center", gap: 24, color: "inherit", fontFamily: "inherit",
                  }}>
                  <span className="display" style={{ fontSize: "clamp(18px, 2.4vw, 26px)", fontWeight: 500, letterSpacing: "-0.01em" }}>
                    {f.q}
                  </span>
                  <div style={{
                    width: 36, height: 36, borderRadius: 999, flexShrink: 0,
                    border: "1px solid rgba(26,22,18,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transform: open === i ? "rotate(45deg)" : "rotate(0)",
                    transition: "transform .4s, background .3s, color .3s",
                    background: open === i ? "#d97706" : "transparent",
                    color: open === i ? "#fff" : "#1a1612",
                  }}>
                    <span style={{ fontSize: 20, lineHeight: 1 }}>+</span>
                  </div>
                </button>
                <div style={{
                  maxHeight: open === i ? 300 : 0, overflow: "hidden",
                  transition: "max-height .5s cubic-bezier(.2,.7,.2,1), padding .4s",
                  paddingBottom: open === i ? 28 : 0,
                }}>
                  <p style={{ fontSize: 16, lineHeight: 1.65, margin: 0, opacity: 0.85, maxWidth: 640 }}>
                    {f.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media (max-width: 800px) { .faq-grid { grid-template-columns: 1fr !important; gap: 40px !important; } .faq-grid > div:first-child { position: static !important; } }`}</style>
      </Reveal>
    </section>
  );
}

function FinalCTA() {
  const { navigate } = useRouter();
  return (
    <section style={{ padding: "140px 28px", textAlign: "center", position: "relative" }}>
      <Reveal>
        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative" }}>
          <svg aria-hidden width="80" height="80" viewBox="0 0 80 80"
            style={{ margin: "0 auto 40px", display: "block", animation: "slowSpin 30s linear infinite" }}>
            <defs><path id="circle" d="M 40, 40 m -30, 0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0" /></defs>
            <text fontSize="9" fontFamily="JetBrains Mono, monospace" fill="#1a1612" letterSpacing="3">
              <textPath href="#circle">★ S'INSCRIRE AUJOURD'HUI · COMMENCER DEMAIN · ALLER PLUS LOIN · </textPath>
            </text>
            <circle cx="40" cy="40" r="4" fill="#d97706" />
          </svg>

          <h2 className="display" style={{
            fontSize: "clamp(48px, 8vw, 120px)", lineHeight: 0.95,
            letterSpacing: "-0.04em", fontWeight: 400, margin: "0 0 28px 0",
          }}>
            Votre avenir, <em style={{ fontStyle: "italic", color: "#d97706" }}>dans une autre langue.</em>
          </h2>
          <p style={{ fontSize: 19, lineHeight: 1.6, maxWidth: 620, margin: "0 auto 40px", opacity: 0.8 }}>
            Entrez dans nos salles. Repartez avec le monde à portée de mots. Les inscriptions sont ouvertes chaque trimestre.
          </p>

          <div style={{ display: "inline-flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
            <MagneticButton onClick={() => navigate("/contact")}
              style={{
                background: "#1a1612", color: "#f4ede0", padding: "22px 40px",
                borderRadius: 999, border: "none", fontSize: 17, fontFamily: "inherit",
                display: "inline-flex", alignItems: "center", gap: 12, transition: "background .3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#d97706")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#1a1612")}>
              Commencer mon inscription <ChevronRight size={18} />
            </MagneticButton>
            <MagneticButton onClick={() => navigate("/services")}
              style={{
                background: "transparent", border: "1px solid #1a1612", color: "#1a1612",
                padding: "22px 40px", borderRadius: 999, fontFamily: "inherit", fontSize: 17,
                display: "inline-flex", alignItems: "center", gap: 12, transition: "all .3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#1a1612"; e.currentTarget.style.color = "#f4ede0"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#1a1612"; }}>
              Voir les programmes
            </MagneticButton>
          </div>

          <div className="mono" style={{ marginTop: 60, fontSize: 11, opacity: 0.5, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            ★ Réponse garantie sous 48h ★ Évaluation initiale gratuite ★
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ============================================================
   ABOUT PAGE
   ============================================================ */

function AboutPage() {
  return (
    <>
      <PageHero
        kicker="§ À propos · L'institution"
        line1="Une école bâtie"
        line2="pour une génération"
        line2Em="sans frontières."
        intro="APLA·ELC a été fondée à Bujumbura sur une conviction simple : la maîtrise de l'anglais ne serait plus un luxe, mais un passeport. Notre mission : délivrer ce passeport."
      />

      <Reveal>
        <section style={{ padding: "80px 28px 140px", maxWidth: 1400, margin: "0 auto" }}>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
            {[
              { num: "I.", label: "Mission", title: "Ouvrir les portes que la langue avait fermées.", body: "Nous formons des Burundais et des Est-Africains de tous horizons à lire, écrire, parler et penser en anglais avec aisance — pour les universités, les entreprises, les conversations qui façonneront leur avenir." },
              { num: "II.", label: "Vision", title: "Une région dont la voix porte.", body: "Nous voyons un avenir où aucun chercheur, entrepreneur ou diplomate est-africain ne sera freiné par la langue. APLA·ELC est l'institution qui, méthodiquement, rend cet avenir réel." },
            ].map((b) => (
              <div key={b.label}>
                <div className="display" style={{ fontSize: 80, color: "#d97706", fontStyle: "italic", fontWeight: 300, lineHeight: 0.8 }}>{b.num}</div>
                <div className="mono" style={{ marginTop: 18, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.55 }}>{b.label}</div>
                <h3 className="display" style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.15, margin: "16px 0 20px" }}>{b.title}</h3>
                <p style={{ fontSize: 17, lineHeight: 1.65, margin: 0, opacity: 0.8 }}>{b.body}</p>
              </div>
            ))}
          </div>
          <style>{`@media (max-width: 800px) { .two-col { grid-template-columns: 1fr !important; gap: 60px !important; } }`}</style>
        </section>
      </Reveal>

      <section style={{ background: "#1a1612", color: "#f4ede0", padding: "140px 28px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.5, marginBottom: 20 }}>
              § Notre trajectoire
            </div>
            <h2 className="display" style={{
              fontSize: "clamp(40px, 6vw, 84px)", lineHeight: 1.0,
              letterSpacing: "-0.035em", fontWeight: 400, margin: "0 0 80px 0",
            }}>
              Une décennie, <em style={{ fontStyle: "italic", color: "#d97706" }}>chapitrée.</em>
            </h2>
          </Reveal>

          <Reveal stagger>
            <div style={{ position: "relative" }}>
              <div className="timeline-line" style={{ position: "absolute", left: 80, top: 0, bottom: 0, width: 1, background: "rgba(244,237,224,0.2)" }} />
              {TIMELINE.map((t, i) => (
                <div key={t.year} className="timeline-row" style={{
                  display: "grid", gridTemplateColumns: "80px 1fr 1.5fr",
                  gap: 40, padding: "32px 0",
                  borderBottom: i < TIMELINE.length - 1 ? "1px solid rgba(244,237,224,0.1)" : "none",
                  alignItems: "start", position: "relative",
                }}>
                  <div className="display" style={{ fontSize: 28, fontWeight: 400, color: "#d97706" }}>{t.year}</div>
                  <div style={{ position: "relative", paddingLeft: 24 }}>
                    <div style={{
                      position: "absolute", left: -7, top: 8, width: 14, height: 14,
                      background: "#d97706", borderRadius: 999,
                      boxShadow: "0 0 0 4px rgba(217,119,6,0.2)",
                    }} />
                    <h3 className="display" style={{ fontSize: 22, fontWeight: 500, margin: 0, letterSpacing: "-0.01em" }}>{t.title}</h3>
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.65, margin: 0, opacity: 0.8 }}>{t.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <style>{`@media (max-width: 700px) { .timeline-row { grid-template-columns: 60px 1fr !important; } .timeline-row > p { grid-column: 1 / -1; padding-left: 84px; } .timeline-line { left: 60px !important; } }`}</style>
      </section>

      <section style={{ padding: "140px 28px", maxWidth: 1400, margin: "0 auto" }}>
        <Reveal>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.55, marginBottom: 20 }}>
            § Les enseignants
          </div>
          <h2 className="display" style={{
            fontSize: "clamp(40px, 6vw, 84px)", lineHeight: 1.0,
            letterSpacing: "-0.035em", fontWeight: 400, margin: "0 0 80px 0",
          }}>
            Des gens qui <em style={{ fontStyle: "italic", color: "#d97706" }}>vivent pour enseigner</em>.
          </h2>
        </Reveal>

        <Reveal stagger>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
            {[
              { initials: "TC", name: "Tony C. Ariel", role: "Fondateur · Directeur", bio: "Linguiste, méthodologue, architecte du programme APLA·ELC. Deux décennies d'enseignement de l'anglais en Afrique de l'Est." },
              { initials: "EM", name: "Espérance M.", role: "Responsable TOEFL", bio: "Examinatrice formée à Cambridge. A coaché personnellement plus de 400 étudiants vers leurs scores cibles." },
              { initials: "JK", name: "Jean-Paul K.", role: "Chef de traduction", bio: "Traducteur assermenté (Fr/En/Sw/Kr). Douze ans d'expérience en traduction juridique, académique et diplomatique." },
              { initials: "AR", name: "Aline R.", role: "Programmes entreprise", bio: "Conçoit des programmes sur mesure pour les organisations. Ancienne formatrice au secrétariat de la Communauté Est-Africaine." },
            ].map((p) => (
              <article key={p.name} style={{
                padding: "32px 28px", background: "rgba(255,251,242,0.5)",
                border: "1px solid rgba(26,22,18,0.15)", borderRadius: 4,
                transition: "transform .5s, background .4s, box-shadow .4s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.background = "#fffaf0"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(26,22,18,0.08)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "rgba(255,251,242,0.5)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div className="display" style={{
                  width: 80, height: 80, borderRadius: 999, background: "#1a1612", color: "#f4ede0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 28, fontWeight: 400, marginBottom: 20, letterSpacing: "-0.02em",
                }}>{p.initials}</div>
                <h3 className="display" style={{ fontSize: 22, fontWeight: 500, margin: "0 0 4px", letterSpacing: "-0.01em" }}>{p.name}</h3>
                <div className="mono" style={{ fontSize: 11, opacity: 0.55, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>{p.role}</div>
                <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0, opacity: 0.85 }}>{p.bio}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section style={{ background: "rgba(217,119,6,0.06)", padding: "140px 28px", textAlign: "center" }}>
        <Reveal>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <Award size={56} strokeWidth={1} style={{ color: "#d97706", margin: "0 auto 32px", display: "block", animation: "float 4s ease-in-out infinite" }} />
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.55, marginBottom: 20 }}>
              Reconnaissance officielle
            </div>
            <h2 className="display" style={{
              fontSize: "clamp(32px, 4.5vw, 56px)", lineHeight: 1.1,
              letterSpacing: "-0.025em", fontWeight: 400, margin: "0 0 24px 0",
            }}>
              Agréé par Ordonnance Ministérielle <em style={{ fontStyle: "italic", color: "#d97706" }}>N°530/078</em>
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.65, opacity: 0.8 }}>
              Nos certifications font foi dans toute la République du Burundi et sont reconnues par les universités, ambassades et employeurs à travers la Communauté Est-Africaine.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}

/* ============================================================
   SERVICES PAGE
   ============================================================ */

function ServicesPage() {
  const { navigate } = useRouter();
  const [active, setActive] = useState(0);

  return (
    <>
      <PageHero
        kicker="§ Services · Six voies"
        line1="Un programme pour"
        line2="chaque ambition,"
        line2Em="chaque étape."
        intro="Que vous prépariez un examen, une réunion de direction ou votre première conversation en anglais, APLA·ELC propose six parcours dédiés — chacun fondé sur une méthode éprouvée et animé par des professionnels en exercice."
      />

      <section style={{ padding: "60px 28px 140px", maxWidth: 1400, margin: "0 auto" }}>
        <Reveal>
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const open = active === i;
            return (
              <article key={s.title} style={{
                borderTop: "1px solid rgba(26,22,18,0.2)",
                borderBottom: i === SERVICES.length - 1 ? "1px solid rgba(26,22,18,0.2)" : "none",
                padding: "32px 0", cursor: "pointer",
                transition: "background .3s",
              }}
                onClick={() => setActive(open ? -1 : i)}
                onMouseEnter={(e) => { if (!open) e.currentTarget.style.background = "rgba(217,119,6,0.04)"; }}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                <div className="service-row" style={{
                  display: "grid", gridTemplateColumns: "auto 1fr auto auto",
                  gap: 28, alignItems: "center",
                }}>
                  <div className="mono" style={{ fontSize: 11, opacity: 0.5, width: 32 }}>{s.kicker}</div>
                  <h3 className="display" style={{
                    fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 400,
                    letterSpacing: "-0.025em", margin: 0, lineHeight: 1.05,
                    transition: "color .3s",
                    color: open ? "#d97706" : "#1a1612",
                  }}>{s.title}</h3>
                  <Icon size={32} strokeWidth={1.3} style={{ color: "#d97706", opacity: 0.7 }} className="service-icon" />
                  <div style={{
                    width: 48, height: 48, borderRadius: 999,
                    border: "1px solid rgba(26,22,18,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background .3s, border-color .3s, transform .5s",
                    transform: open ? "rotate(180deg)" : "rotate(0)",
                    background: open ? "#1a1612" : "transparent",
                    color: open ? "#f4ede0" : "#1a1612",
                  }}>
                    <ChevronDown size={20} />
                  </div>
                </div>

                <div style={{
                  maxHeight: open ? 800 : 0, overflow: "hidden",
                  transition: "max-height .6s cubic-bezier(.2,.7,.2,1), margin-top .4s",
                  marginTop: open ? 32 : 0,
                }}>
                  <div style={{
                    paddingLeft: 60, display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 40,
                  }} className="service-detail">
                    <div>
                      <p style={{ fontSize: 17, lineHeight: 1.7, margin: "0 0 24px", opacity: 0.9 }}>
                        {s.detail}
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {s.bullets.map((b) => (
                          <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                            <CheckCircle2 size={18} style={{ color: "#d97706", flexShrink: 0, marginTop: 2 }} />
                            <span style={{ fontSize: 15, lineHeight: 1.5 }}>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <aside style={{
                      background: "rgba(217,119,6,0.08)", border: "1px solid rgba(217,119,6,0.2)",
                      borderRadius: 4, padding: 28,
                    }}>
                      <div className="mono" style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.6, marginBottom: 14 }}>
                        Format
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        {Object.entries(s.format).map(([k, v]) => (
                          <div key={k}>
                            <div className="mono" style={{ fontSize: 10, opacity: 0.55, marginBottom: 2, textTransform: "uppercase" }}>{k}</div>
                            <div style={{ fontSize: 14 }}>{v}</div>
                          </div>
                        ))}
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); navigate("/contact"); }}
                        style={{
                          marginTop: 24, width: "100%", background: "#1a1612", color: "#f4ede0",
                          border: "none", padding: "12px 18px", borderRadius: 999, fontFamily: "inherit",
                          fontSize: 13, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
                          transition: "background .3s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#d97706")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "#1a1612")}>
                        Me renseigner <ArrowRight size={14} />
                      </button>
                    </aside>
                  </div>
                </div>
              </article>
            );
          })}
          <style>{`@media (max-width: 800px) { .service-row { grid-template-columns: auto 1fr auto !important; } .service-icon { display: none !important; } .service-detail { padding-left: 0 !important; grid-template-columns: 1fr !important; } }`}</style>
        </Reveal>
      </section>

      <section style={{ background: "#1a1612", color: "#f4ede0", padding: "140px 28px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <Reveal>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.5, marginBottom: 20 }}>
              § Notre méthode
            </div>
            <h2 className="display" style={{
              fontSize: "clamp(40px, 6vw, 84px)", lineHeight: 1.0,
              letterSpacing: "-0.035em", fontWeight: 400, margin: "0 0 80px 0",
            }}>
              La <em style={{ fontStyle: "italic", color: "#d97706" }}>méthode APLA</em>, en quatre temps.
            </h2>
          </Reveal>

          <Reveal stagger>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 32 }}>
              {[
                { icon: Target, n: "01", title: "Diagnostiquer", body: "Chaque étudiant commence par un placement complet : écrit, oral, écoute. Nous ne devinons pas votre niveau — nous le mesurons." },
                { icon: PenTool, n: "02", title: "Concevoir", body: "Votre programme est construit autour de vos objectifs. Bourse ? Carrière ? Voyage ? La destination définit le chemin." },
                { icon: Headphones, n: "03", title: "Immerger", body: "Les cours se déroulent entièrement en anglais dès la première semaine. L'inconfort fait partie du design. La percée aussi." },
                { icon: TrendingUp, n: "04", title: "Mesurer", body: "Bilans mensuels, comptes rendus écrits, examens blancs. Le progrès est documenté, jamais supposé." },
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <div key={m.n} style={{ padding: "28px 0", borderTop: "1px solid rgba(244,237,224,0.2)" }}>
                    <div className="mono" style={{ fontSize: 11, opacity: 0.55, marginBottom: 16 }}>{m.n}</div>
                    <Icon size={32} strokeWidth={1.3} style={{ color: "#d97706", marginBottom: 20 }} />
                    <h3 className="display" style={{ fontSize: 26, fontWeight: 400, margin: "0 0 12px", letterSpacing: "-0.02em" }}>{m.title}</h3>
                    <p style={{ fontSize: 14, lineHeight: 1.65, margin: 0, opacity: 0.8 }}>{m.body}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ============================================================
   NEWS PAGE
   ============================================================ */

function NewsPage() {
  const [filter, setFilter] = useState("Tout");
  const cats = ["Tout", "Actualité", "Événement", "Atelier", "Annonce"];
  const filtered = filter === "Tout" ? NEWS : NEWS.filter((n) => n.category === filter);

  return (
    <>
      <PageHero
        kicker="§ Actualités &amp; Événements"
        line1="Ce qui se passe"
        line2="cette"
        line2Em="saison."
        intro="Des journées portes ouvertes aux dates limites des bourses, des conférences publiques aux cérémonies de remise de diplômes — voici ce qui anime la communauté APLA·ELC."
      />

      <Reveal>
        <section style={{ padding: "60px 28px", maxWidth: 1400, margin: "0 auto" }}>
          <div className="feat-grid" style={{
            display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 60, alignItems: "center",
            padding: "60px 0", borderTop: "1px solid rgba(26,22,18,0.2)",
            borderBottom: "1px solid rgba(26,22,18,0.2)",
          }}>
            <div>
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.55, marginBottom: 16 }}>
                ★ À la une · {NEWS[0].date}
              </div>
              <h2 className="display" style={{
                fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.05,
                letterSpacing: "-0.03em", fontWeight: 400, margin: "0 0 24px 0",
              }}>{NEWS[0].title}</h2>
              <p style={{ fontSize: 17, lineHeight: 1.65, margin: "0 0 28px", opacity: 0.85 }}>{NEWS[0].excerpt}</p>
              <button style={{
                background: "none", border: "none", color: "#1a1612", fontFamily: "inherit",
                fontSize: 15, padding: 0, textDecoration: "underline", textUnderlineOffset: 6,
                textDecorationColor: "#d97706", textDecorationThickness: 2,
                display: "inline-flex", alignItems: "center", gap: 6, transition: "gap .3s",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.gap = "12px")}
                onMouseLeave={(e) => (e.currentTarget.style.gap = "6px")}>
                Lire la suite <ArrowRight size={14} />
              </button>
            </div>
            <FeaturedArtwork />
          </div>
          <style>{`@media (max-width: 800px) { .feat-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
        </section>
      </Reveal>

      <section style={{ padding: "60px 28px 20px", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {cats.map((c) => (
            <button key={c} onClick={() => setFilter(c)}
              style={{
                padding: "10px 18px", borderRadius: 999, fontFamily: "inherit", fontSize: 13,
                background: filter === c ? "#1a1612" : "transparent",
                color: filter === c ? "#f4ede0" : "#1a1612",
                border: "1px solid #1a1612", transition: "background .3s, color .3s",
              }}>{c}</button>
          ))}
        </div>
      </section>

      <Reveal stagger>
        <section style={{ padding: "40px 28px 140px", maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 40 }}>
            {filtered.map((n) => (
              <article key={n.title} style={{ cursor: "pointer" }} className="news-card">
                <div style={{
                  aspectRatio: "4/3", borderRadius: 4, overflow: "hidden",
                  background: n.bgColor, position: "relative",
                  marginBottom: 24, border: "1px solid rgba(26,22,18,0.15)",
                  transition: "transform .5s",
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                  <ArticleArtwork color={n.bgColor} variant={n.variant} />
                  <div className="mono" style={{
                    position: "absolute", top: 16, left: 16, background: "#1a1612", color: "#f4ede0",
                    padding: "6px 14px", borderRadius: 999, fontSize: 11, letterSpacing: "0.05em",
                  }}>{n.category}</div>
                </div>
                <div className="mono" style={{ fontSize: 11, opacity: 0.55, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
                  {n.date}
                </div>
                <h3 className="display" style={{
                  fontSize: 24, fontWeight: 500, margin: "0 0 12px",
                  letterSpacing: "-0.015em", lineHeight: 1.2,
                }}>
                  <span className="underline-anim">{n.title}</span>
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, opacity: 0.8, margin: "0 0 14px" }}>{n.excerpt}</p>
                <span className="mono" style={{ fontSize: 11, opacity: 0.7, letterSpacing: "0.05em" }}>
                  Lire l'article →
                </span>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <section style={{ background: "rgba(217,119,6,0.06)", padding: "120px 28px", textAlign: "center" }}>
        <Reveal>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <Send size={40} strokeWidth={1.3} style={{ color: "#d97706", margin: "0 auto 24px", display: "block" }} />
            <h2 className="display" style={{
              fontSize: "clamp(32px, 4.5vw, 56px)", lineHeight: 1.05,
              letterSpacing: "-0.025em", fontWeight: 400, margin: "0 0 16px 0",
            }}>
              La <em style={{ fontStyle: "italic", color: "#d97706" }}>lettre mensuelle.</em>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.8, marginBottom: 32 }}>
              Un email par mois. Journées portes ouvertes, bourses, conseils linguistiques, et de temps en temps une belle histoire. Rien d'autre.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Merci. Nous serons en contact."); }}
              style={{
                display: "flex", gap: 8, maxWidth: 480, margin: "0 auto", padding: 6,
                background: "#fffaf0", borderRadius: 999, border: "1px solid rgba(26,22,18,0.15)",
              }}>
              <input type="email" required placeholder="votre.email@exemple.com"
                style={{
                  flex: 1, background: "transparent", border: "none", outline: "none",
                  fontFamily: "inherit", fontSize: 15, padding: "10px 16px",
                }} />
              <button type="submit" style={{
                background: "#1a1612", color: "#f4ede0", border: "none",
                padding: "10px 22px", borderRadius: 999, fontFamily: "inherit", fontSize: 14,
                display: "inline-flex", alignItems: "center", gap: 6,
              }}>S'abonner <ArrowRight size={14} /></button>
            </form>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function FeaturedArtwork() {
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

function ArticleArtwork({ variant }) {
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

/* ============================================================
   CONTACT PAGE — The crown jewel
   ============================================================ */

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", program: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  return (
    <>
      <PageHero
        kicker="§ Contact · Commençons la conversation"
        line1="Parlons-en."
        line2=""
        line2Em=""
        intro="Que vous souhaitiez vous inscrire, consulter pour votre entreprise, ou simplement comprendre notre méthode — écrivez, appelez, ou passez nous voir. Nous répondons à chaque message."
      />

      <section style={{ padding: "60px 28px 80px", maxWidth: 1400, margin: "0 auto" }}>
        <Reveal>
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
            <div>
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.55, marginBottom: 24 }}>
                Envoyer un message
              </div>

              {submitted ? (
                <div style={{
                  padding: 40, background: "rgba(217,119,6,0.1)",
                  border: "1px solid rgba(217,119,6,0.3)", borderRadius: 8, textAlign: "center",
                  animation: "fadeUp .6s both",
                }}>
                  <CheckCircle2 size={48} style={{ color: "#d97706", margin: "0 auto 20px", display: "block", animation: "pulse 2s infinite" }} />
                  <h3 className="display" style={{ fontSize: 28, fontWeight: 500, margin: "0 0 12px" }}>Message reçu.</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.6, opacity: 0.85, margin: "0 0 24px" }}>
                    Merci, {form.name || "ami"}. Un membre de notre équipe vous répondra sous 48 heures.
                  </p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", program: "", message: "" }); }}
                    style={{
                      background: "#1a1612", color: "#f4ede0", border: "none",
                      padding: "12px 22px", borderRadius: 999, fontFamily: "inherit", fontSize: 14,
                    }}>
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                  <Field label="Votre nom" required focused={focused === "name"}>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                      required type="text" style={fieldStyle} placeholder="Annick Niyongabo" />
                  </Field>
                  <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                    <Field label="Email" required focused={focused === "email"}>
                      <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                        required type="email" style={fieldStyle} placeholder="vous@exemple.com" />
                    </Field>
                    <Field label="Téléphone" focused={focused === "phone"}>
                      <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                        type="tel" style={fieldStyle} placeholder="+257 ..." />
                    </Field>
                  </div>
                  <Field label="Je suis intéressé(e) par" focused={focused === "program"}>
                    <select value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value })}
                      onFocus={() => setFocused("program")} onBlur={() => setFocused(null)}
                      style={{ ...fieldStyle, appearance: "none",
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231a1612' stroke-width='2'><polyline points='6 9 12 15 18 9'/></svg>")`,
                        backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", backgroundSize: 16, paddingRight: 40
                      }}>
                      <option value="">Sélectionnez un programme</option>
                      {SERVICES.map((s) => <option key={s.title} value={s.title}>{s.title}</option>)}
                      <option value="other">Autre / question générale</option>
                    </select>
                  </Field>
                  <Field label="Votre message" required focused={focused === "message"}>
                    <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                      required rows={5}
                      style={{ ...fieldStyle, resize: "vertical", minHeight: 120, fontFamily: "inherit" }}
                      placeholder="Parlez-nous de vos objectifs, votre niveau, votre emploi du temps — tout ce qui peut nous aider." />
                  </Field>
                  <MagneticButton type="submit" style={{
                    alignSelf: "flex-start", background: "#1a1612", color: "#f4ede0",
                    border: "none", padding: "20px 36px", borderRadius: 999, fontFamily: "inherit",
                    fontSize: 16, display: "inline-flex", alignItems: "center", gap: 10,
                    transition: "background .3s",
                  }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#d97706")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#1a1612")}>
                    Envoyer le message <Send size={16} />
                  </MagneticButton>

                  <div className="mono" style={{ fontSize: 11, opacity: 0.5, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    ✦ Réponse garantie sous 48h
                  </div>
                </form>
              )}
            </div>

            <aside style={{ display: "flex", flexDirection: "column", gap: 36 }}>
              <div>
                <div className="mono" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.55, marginBottom: 14 }}>
                  Ou contactez-nous directement
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <InfoBlock icon={Mail} label="Email" value="elcbu@yahoo.fr" href="mailto:elcbu@yahoo.fr" />
                  <InfoBlock icon={Phone} label="Téléphone" value="+257 22 21 73 02" href="tel:+25722217302" />
                  <InfoBlock icon={MapPin} label="Adresse" value="Avenue Prince Louis Rwagasore, près de la BCB, en face de la CRDB · Bujumbura, Burundi" />
                </div>
              </div>

              <div style={{ borderTop: "1px solid rgba(26,22,18,0.2)", paddingTop: 36 }}>
                <div className="mono" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.55, marginBottom: 18 }}>
                  Horaires d'ouverture
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { d: "Lundi – Vendredi", h: "08h00 — 20h00", open: true },
                    { d: "Samedi", h: "10h00 — 14h00", open: true },
                    { d: "Dimanche", h: "Fermé", open: false },
                  ].map((r) => (
                    <div key={r.d} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(26,22,18,0.1)" }}>
                      <span style={{ fontSize: 15, display: "inline-flex", alignItems: "center", gap: 10 }}>
                        <span style={{
                          width: 6, height: 6, borderRadius: 999,
                          background: r.open ? "#22c55e" : "#94a3b8",
                          animation: r.open ? "pulse 2s infinite" : "none",
                        }} />
                        {r.d}
                      </span>
                      <span className="mono" style={{ fontSize: 13, opacity: 0.7 }}>{r.h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ aspectRatio: "5/3", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(26,22,18,0.2)" }}>
                <StylizedMap />
              </div>
            </aside>
          </div>

          <style>{`@media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; gap: 60px !important; } } @media (max-width: 500px) { .form-row { grid-template-columns: 1fr !important; } }`}</style>
        </Reveal>
      </section>

      {/* Reassurance band */}
      <section style={{ padding: "80px 28px 140px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal stagger>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 32 }}>
              {[
                { icon: Clock, t: "Réponse en 48h", d: "Chaque message reçoit une réponse personnalisée sous deux jours ouvrables." },
                { icon: Compass, t: "Évaluation gratuite", d: "Un placement complet et un plan personnalisé, sans engagement." },
                { icon: Award, t: "Diplôme reconnu", d: "Agrément ministériel N°530/078 — valeur officielle." },
                { icon: Users, t: "Communauté active", d: "Plus de 2 400 diplômés à travers l'Afrique de l'Est et au-delà." },
              ].map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.t} style={{ textAlign: "left" }}>
                    <Icon size={28} strokeWidth={1.4} style={{ color: "#d97706", marginBottom: 18 }} />
                    <h4 className="display" style={{ fontSize: 22, fontWeight: 500, margin: "0 0 8px", letterSpacing: "-0.01em" }}>{b.t}</h4>
                    <p style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.8, margin: 0 }}>{b.d}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({ label, children, required, focused }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span className="mono" style={{
        fontSize: 11, opacity: focused ? 1 : 0.6, color: focused ? "#d97706" : "inherit",
        letterSpacing: "0.1em", textTransform: "uppercase", transition: "color .3s, opacity .3s",
      }}>
        {label} {required && <span style={{ color: "#d97706" }}>·</span>}
      </span>
      {children}
    </label>
  );
}

const fieldStyle = {
  background: "transparent", border: "none", borderBottom: "1px solid rgba(26,22,18,0.3)",
  padding: "10px 0", fontFamily: "'Newsreader', serif", fontSize: 16, color: "#1a1612",
  outline: "none", transition: "border-color .3s", width: "100%",
};

function InfoBlock({ icon: Icon, label, value, href }) {
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

function StylizedMap() {
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

/* ============================================================
   SHARED — PageHero, Footer
   ============================================================ */

function PageHero({ kicker, line1, line2, line2Em, intro }) {
  return (
    <section style={{ padding: "180px 28px 80px", position: "relative" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div className="mono" style={{
          fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.55, marginBottom: 32,
          animation: "fadeIn .8s both",
        }}>
          {kicker}
        </div>
        <h1 className="display" style={{
          fontSize: "clamp(56px, 11vw, 180px)", lineHeight: 0.9,
          letterSpacing: "-0.04em", fontWeight: 400, margin: 0,
          animation: "fadeUp 1.2s cubic-bezier(.2,.7,.2,1) both",
        }}>
          {line1}{line2 && <br />}
          {line2}{line2Em && <em style={{ fontStyle: "italic", fontWeight: 300, color: "#d97706" }}> {line2Em}</em>}
        </h1>
        {intro && (
          <p style={{
            fontSize: "clamp(16px, 1.5vw, 19px)", lineHeight: 1.6,
            maxWidth: 640, margin: "48px 0 0", opacity: 0.85,
            animation: "fadeUp 1s .3s both",
          }}>
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}

function Footer() {
  const { navigate } = useRouter();
  return (
    <footer style={{
      position: "relative", zIndex: 2, background: "#1a1612", color: "#f4ede0",
      padding: "100px 28px 40px",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.5, marginBottom: 24 }}>
          Fin de transmission
        </div>
        <h2 className="display" style={{
          fontSize: "clamp(48px, 9vw, 140px)", lineHeight: 0.9,
          letterSpacing: "-0.04em", fontWeight: 400, margin: "0 0 80px 0",
        }}>
          À <em style={{ fontStyle: "italic", color: "#d97706" }}>très bientôt.</em>
        </h2>

        <div className="footer-grid" style={{
          display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 60,
          paddingBottom: 60, borderBottom: "1px solid rgba(244,237,224,0.15)",
        }}>
          <div>
            <div className="mono" style={{ fontSize: 11, opacity: 0.5, marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.1em" }}>Nous trouver</div>
            <p style={{ fontSize: 16, lineHeight: 1.55, margin: 0 }}>
              Avenue Prince Louis Rwagasore,<br />
              près de la BCB, en face de la CRDB<br />
              <span style={{ opacity: 0.6 }}>Bujumbura, Burundi</span>
            </p>
          </div>
          <div>
            <div className="mono" style={{ fontSize: 11, opacity: 0.5, marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.1em" }}>Contact</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 15 }}>
              <a href="mailto:elcbu@yahoo.fr" style={{ color: "inherit", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "gap .3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.gap = "12px")} onMouseLeave={(e) => (e.currentTarget.style.gap = "8px")}>
                <Mail size={14} style={{ color: "#d97706" }} /> elcbu@yahoo.fr
              </a>
              <a href="tel:+25722217302" style={{ color: "inherit", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "gap .3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.gap = "12px")} onMouseLeave={(e) => (e.currentTarget.style.gap = "8px")}>
                <Phone size={14} style={{ color: "#d97706" }} /> +257 22 21 73 02
              </a>
            </div>
          </div>
          <div>
            <div className="mono" style={{ fontSize: 11, opacity: 0.5, marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.1em" }}>Horaires</div>
            <div style={{ fontSize: 15, lineHeight: 1.6 }}>
              <div>Lun–Ven <span style={{ opacity: 0.6 }}>08–20h</span></div>
              <div>Samedi <span style={{ opacity: 0.6 }}>10–14h</span></div>
              <div style={{ opacity: 0.4 }}>Dimanche fermé</div>
            </div>
          </div>
          <div>
            <div className="mono" style={{ fontSize: 11, opacity: 0.5, marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.1em" }}>Navigation</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 15 }}>
              {[{ l: "Accueil", to: "/" }, { l: "À propos", to: "/about" }, { l: "Services", to: "/services" }, { l: "Actualités", to: "/news" }, { l: "Contact", to: "/contact" }].map((it) => (
                <button key={it.l} onClick={() => navigate(it.to)}
                  style={{ background: "none", border: "none", color: "inherit", textAlign: "left", padding: 0, fontFamily: "inherit", fontSize: 15, display: "inline-flex", alignItems: "center", gap: 8, transition: "gap .3s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.gap = "14px")} onMouseLeave={(e) => (e.currentTarget.style.gap = "8px")}>
                  <ArrowRight size={12} style={{ color: "#d97706" }} /> {it.l}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: "80px 0 40px", textAlign: "center" }}>
          <div className="display" style={{
            fontSize: "clamp(72px, 18vw, 280px)", fontWeight: 300,
            letterSpacing: "-0.05em", lineHeight: 0.85, fontStyle: "italic",
          }}>
            APLA<span style={{ color: "#d97706", fontStyle: "normal" }}>·</span>ELC
          </div>
        </div>

        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingTop: 30, borderTop: "1px solid rgba(244,237,224,0.15)",
          flexWrap: "wrap", gap: 16,
        }}>
          <div className="mono" style={{ fontSize: 11, opacity: 0.5, letterSpacing: "0.1em" }}>
            © 2026 APLA·ELC — Tous droits réservés.
          </div>
          <div className="mono" style={{ fontSize: 11, opacity: 0.5, letterSpacing: "0.1em" }}>
            Bujumbura · Burundi · 🇧🇮
          </div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mono"
            style={{ background: "none", border: "none", color: "inherit", fontSize: 11, opacity: 0.7, letterSpacing: "0.1em", fontFamily: "inherit" }}>
            ↑ Retour en haut
          </button>
        </div>
      </div>

      <style>{`@media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 40px !important; } } @media (max-width: 560px) { .footer-grid { grid-template-columns: 1fr !important; } }`}</style>
    </footer>
  );
}

/* ============================================================
   DATA
   ============================================================ */

const SERVICES = [
  {
    icon: BookOpen, title: "Formation linguistique", kicker: "01",
    short: "Cours d'anglais sur mesure du débutant à l'avancé. Petits groupes, méthode immersive.",
    detail: "Notre programme phare. Six niveaux d'enseignement structuré — du débutant absolu aux apprenants avancés préparant des études internationales. Les cohortes sont volontairement petites (12 étudiants maximum) pour que chaque apprenant parle, écrive et soit corrigé chaque jour.",
    bullets: ["Six niveaux : A1 à C2 (cadre CECRL)", "Cohortes plafonnées à 12 étudiants", "Évaluations mensuelles", "Certificat à chaque niveau"],
    format: { Durée: "12 semaines par niveau", Horaires: "Matin, soir ou samedi", Groupe: "12 étudiants max.", Certificat: "Oui, par niveau" },
  },
  {
    icon: Languages, title: "Traduction de documents", kicker: "02",
    short: "Traduction certifiée de diplômes, documents juridiques, rapports et relevés.",
    detail: "Traduction assermentée entre l'anglais, le français, le swahili et le kirundi. Diplômes, relevés de notes, contrats, documents judiciaires, dossiers médicaux, rapports d'entreprise — avec la précision et la confidentialité que ces documents exigent.",
    bullets: ["Traductions assermentées", "EN · FR · SW · KR", "Acceptées par ambassades et universités", "Traitement confidentiel garanti"],
    format: { Délai: "3 à 7 jours ouvrables", Tarif: "Au document (devis sur demande)", Langues: "EN · FR · SW · KR", Livraison: "Papier + numérique" },
  },
  {
    icon: Mic, title: "Interprétariat", kicker: "03",
    short: "Interprètes simultanés et consécutifs pour conférences, négociations et événements.",
    detail: "Interprétation en direct pour conférences, conseils d'administration, événements diplomatiques et missions de terrain. Nos interprètes sont des vétérans du circuit de la Communauté Est-Africaine — sollicités par les ONG, ambassades et entreprises qui opèrent dans la région des Grands Lacs.",
    bullets: ["Interprétation simultanée (en cabine)", "Interprétation consécutive", "Chuchotage sur demande", "Événements multi-jours"],
    format: { Tarif: "Journée / demi-journée", Langues: "EN ↔ FR ↔ SW ↔ KR", Délai: "Idéal avec 1+ semaine de préavis", Matériel: "Cabines et casques disponibles" },
  },
  {
    icon: GraduationCap, title: "Préparation TOEFL & IELTS", kicker: "04",
    short: "Préparation aux examens avec module d'accent américain inclus.",
    detail: "Préparation intensive et méthodique au TOEFL iBT et à l'IELTS Academic. Nos diplômés franchissent régulièrement les seuils exigés par les universités nord-américaines, britanniques et australiennes. Examens blancs hebdomadaires, retours écrits et bilans de scores personnalisés.",
    bullets: ["TOEFL iBT — objectif 100+", "IELTS Academic — objectif 7.0+", "Examens blancs hebdomadaires", "Module accent américain inclus"],
    format: { Durée: "8 ou 12 semaines", Horaires: "Intensifs en soirée", Groupe: "10 étudiants max.", Inclus: "Manuels officiels complets" },
  },
  {
    icon: Building2, title: "Programmes entreprise", kicker: "05",
    short: "Programmes linguistiques sur mesure conçus pour votre secteur et votre équipe.",
    detail: "Enseignement de l'anglais sur mesure pour les organisations — banques, ONG, ministères et entreprises privées. Nous concevons un programme autour du vocabulaire de votre secteur, du niveau de votre équipe et de votre emploi du temps. Sur place ou à distance. Nous avons formé cadres, fonctionnaires et équipes de terrain.",
    bullets: ["Sur place ou dans notre centre", "Vocabulaire sectoriel intégré", "Évaluations avant/après", "Rapports de progression pour RH"],
    format: { Durée: "Sur projet (8 à 24 semaines)", Horaires: "Adaptés à votre équipe", Groupe: "Sur mesure (5 à 30)", Tarification: "Devis par mission" },
  },
  {
    icon: Monitor, title: "Apprentissage en ligne", kicker: "06",
    short: "Classes virtuelles en direct et cours asynchrones. Apprenez de partout.",
    detail: "Tous nos programmes de base sont disponibles entièrement en ligne. Classes virtuelles interactives en direct avec les mêmes enseignants qu'en présentiel — plus une bibliothèque de cours asynchrones, conférences enregistrées et exercices accessibles 24h/24.",
    bullets: ["Classes virtuelles en direct", "Cours et exercices enregistrés", "Mêmes certificats qu'en présentiel", "Accompagnement technique inclus"],
    format: { Plateforme: "Zoom + LMS dédié", Groupe: "12 étudiants max.", Horaires: "Plusieurs fuseaux servis", Équipement: "Webcam + bonne connexion" },
  },
];

const TIMELINE = [
  { year: "2010", title: "Fondation", body: "APLA·ELC ouvre ses portes sur l'Avenue Prince Louis Rwagasore avec trois salles de classe et quatre enseignants fondateurs. Première cohorte : 28 étudiants." },
  { year: "2014", title: "Agrément ministériel", body: "Reconnue par l'Ordonnance Ministérielle N°530/078. Nos certificats acquièrent le poids de la reconnaissance officielle de l'État burundais." },
  { year: "2017", title: "Lancement de la division entreprise", body: "Suite à la demande des banques et ONG locales, nous lançons une branche dédiée aux services linguistiques pour entreprises. Trois grandes institutions financières parmi les premiers clients." },
  { year: "2020", title: "Programme en ligne", body: "Accélération imposée par la pandémie : en six semaines, l'ensemble du programme migre en ligne, ouvrant les inscriptions aux étudiants de toute la région des Grands Lacs." },
  { year: "2023", title: "Traduction et interprétariat", body: "Nos services de traduction et d'interprétariat deviennent une offre autonome, avec une équipe dédiée de traducteurs assermentés." },
  { year: "2026", title: "Et la suite", body: "Plus de 2 400 diplômés. Six programmes complets. Un engagement, inchangé depuis le premier cours." },
];

const NEWS = [
  { title: "Inscriptions hiver ouvertes — les places filent vite", category: "Annonce", date: "20 mai 2026", excerpt: "Nos cohortes de janvier 2027 ont officiellement ouvert les inscriptions. La préparation TOEFL et l'anglais des affaires sont déjà à 60% de capacité. Inscription anticipée jusqu'au 15 juin.", bgColor: "#fef3e2", variant: "a" },
  { title: "Conférence publique : « Pourquoi l'Afrique de l'Est lit en anglais »", category: "Événement", date: "12 mai 2026", excerpt: "Rejoignez-nous le 28 mai, 18h, pour une conférence publique du Pr. M. Niyonkuru sur la politique et l'économie de l'adoption de l'anglais dans l'EAC. Gratuit, sur inscription.", bgColor: "#1a1612", variant: "b" },
  { title: "Atelier de traduction pour les professionnels du droit", category: "Atelier", date: "5 mai 2026", excerpt: "Un atelier intensif de deux jours sur la traduction de documents juridiques entre l'anglais et le français, animé par notre chef de service traduction. Limité à 16 participants.", bgColor: "#fef3e2", variant: "c" },
  { title: "Promotion 2026 : 187 nouveaux diplômés rejoignent le réseau", category: "Actualité", date: "28 avril 2026", excerpt: "Notre cérémonie de remise de diplômes de printemps a vu 187 étudiants recevoir leur certificat — dont 42 diplômés TOEFL, dont 31 avec un score supérieur à 100. Nous sommes immensément fiers.", bgColor: "#7c2d12", variant: "d" },
  { title: "Nouveau partenariat : passerelle de bourses avec deux universités est-africaines", category: "Actualité", date: "14 avril 2026", excerpt: "Nous sommes ravis d'annoncer de nouveaux partenariats de bourses qui orienteront les meilleurs diplômés APLA·ELC vers deux grandes universités régionales.", bgColor: "#fef3e2", variant: "a" },
  { title: "Journée portes ouvertes — venez rencontrer notre équipe", category: "Événement", date: "30 mars 2026", excerpt: "Chaque premier samedi du mois, nos portes sont ouvertes de 10h à 14h. Visitez les salles, échangez avec les enseignants, passez un test de placement gratuit. Sans inscription.", bgColor: "#1a1612", variant: "b" },
];
