import { useState } from "react";
import { ArrowRight, Send } from "lucide-react";
import { PageHero } from "../components/layout/PageHero.jsx";
import { Reveal } from "../components/ui/Reveal.jsx";
import { FeaturedArtwork } from "../components/news/FeaturedArtwork.jsx";
import { ArticleArtwork } from "../components/news/ArticleArtwork.jsx";
import { NEWS } from "../data/news.js";

export function NewsPage() {
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
