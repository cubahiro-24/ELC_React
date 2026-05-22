import { useState } from "react";
import { ArrowRight, Send } from "lucide-react";
import { useRouter } from "../context/RouterContext.jsx";
import { PageHero } from "../components/layout/PageHero.jsx";
import { Reveal } from "../components/ui/Reveal.jsx";
import { NEWS } from "../data/news.js";

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

export function NewsScreen() {
  const { navigate } = useRouter();
  const [filter, setFilter] = useState("Tout");
  const cats = ["Tout", "Actualité", "Événement", "Atelier", "Annonce"];
  const filtered = filter === "Tout" ? NEWS : NEWS.filter((n) => n.category === filter);
  const openArticle = (slug) => navigate(`/news/${slug}`);

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
              <button
                onClick={() => openArticle(NEWS[0].slug)}
                style={{
                background: "none", border: "none", color: "#1a1612", fontFamily: "inherit",
                fontSize: 15, padding: 0, textDecoration: "underline", textUnderlineOffset: 6,
                textDecorationColor: "#d97706", textDecorationThickness: 2,
                display: "inline-flex", alignItems: "center", gap: 6, transition: "gap .3s",
                cursor: "pointer",
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
              <article
                key={n.slug}
                role="button"
                tabIndex={0}
                onClick={() => openArticle(n.slug)}
                onKeyDown={(e) => e.key === "Enter" && openArticle(n.slug)}
                style={{ cursor: "pointer" }}
                className="news-card"
              >
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
