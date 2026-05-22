import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "../context/RouterContext.jsx";
import { Reveal } from "../components/ui/Reveal.jsx";
import { getArticleBySlug, NEWS } from "../data/news.js";

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

export function ArticleDetailScreen({ slug }) {
  const { navigate } = useRouter();
  const article = getArticleBySlug(slug);
  const currentIndex = NEWS.findIndex((item) => item.slug === slug);
  const related = NEWS.filter((item) => item.slug !== slug && item.category === article?.category).slice(0, 2);

  if (!article) {
    return (
      <section style={{ padding: "180px 28px 140px", maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <h1 className="display" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 400, margin: "0 0 20px" }}>
          Article introuvable
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.6, opacity: 0.8, marginBottom: 32 }}>
          Cet article n'existe pas ou a été déplacé.
        </p>
        <button
          onClick={() => navigate("/news")}
          style={{
            background: "#1a1612", color: "#f4ede0", border: "none",
            padding: "14px 24px", borderRadius: 999, fontFamily: "inherit", fontSize: 14,
            display: "inline-flex", alignItems: "center", gap: 8,
          }}
        >
          <ArrowLeft size={16} /> Retour aux actualités
        </button>
      </section>
    );
  }

  return (
    <>
      <section style={{ padding: "140px 28px 0", maxWidth: 1200, margin: "0 auto" }}>
        <button
          onClick={() => navigate("/news")}
          style={{
            background: "none", border: "none", color: "#1a1612", fontFamily: "inherit",
            fontSize: 14, padding: 0, marginBottom: 40, display: "inline-flex",
            alignItems: "center", gap: 8, opacity: 0.7, transition: "opacity .3s, gap .3s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.gap = "12px"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.7"; e.currentTarget.style.gap = "8px"; }}
        >
          <ArrowLeft size={16} /> Retour aux actualités
        </button>

        <Reveal>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.55, marginBottom: 20 }}>
            § {article.category} · {article.date}
          </div>
          <h1 className="display" style={{
            fontSize: "clamp(40px, 7vw, 88px)", lineHeight: 1.0,
            letterSpacing: "-0.035em", fontWeight: 400, margin: "0 0 48px 0", maxWidth: 900,
          }}>
            {article.title}
          </h1>
        </Reveal>
      </section>

      <section style={{ padding: "0 28px 80px", maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{
            aspectRatio: "21/9", borderRadius: 4, overflow: "hidden",
            border: "1px solid rgba(26,22,18,0.15)", marginBottom: 60,
          }}>
            <ArticleArtwork variant={article.variant} />
          </div>
        </Reveal>

        <Reveal>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <p className="display" style={{
              fontSize: "clamp(22px, 2.8vw, 32px)", lineHeight: 1.45,
              fontStyle: "italic", fontWeight: 300, margin: "0 0 40px", opacity: 0.9,
            }}>
              {article.excerpt}
            </p>

            {article.content.map((paragraph, i) => (
              <p key={i} style={{
                fontSize: 18, lineHeight: 1.75, margin: "0 0 28px", opacity: 0.88,
              }}>
                {paragraph}
              </p>
            ))}

            <div style={{
              marginTop: 48, paddingTop: 32, borderTop: "1px solid rgba(26,22,18,0.15)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              flexWrap: "wrap", gap: 16,
            }}>
              <div className="mono" style={{ fontSize: 11, opacity: 0.55, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Publié le {article.date}
              </div>
              <button
                onClick={() => navigate("/contact")}
                style={{
                  background: "transparent", border: "1px solid #1a1612", color: "#1a1612",
                  padding: "12px 20px", borderRadius: 999, fontFamily: "inherit", fontSize: 14,
                  display: "inline-flex", alignItems: "center", gap: 8, transition: "all .3s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#1a1612"; e.currentTarget.style.color = "#f4ede0"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#1a1612"; }}
              >
                Nous contacter <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {related.length > 0 && (
        <section style={{ background: "rgba(217,119,6,0.06)", padding: "100px 28px 140px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Reveal>
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.55, marginBottom: 32 }}>
                § À lire aussi
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
                {related.map((item) => (
                  <button
                    key={item.slug}
                    onClick={() => navigate(`/news/${item.slug}`)}
                    style={{
                      background: "#fffaf0", border: "1px solid rgba(26,22,18,0.12)",
                      borderRadius: 4, padding: 28, textAlign: "left", cursor: "pointer",
                      fontFamily: "inherit", color: "inherit", transition: "transform .4s, box-shadow .4s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(26,22,18,0.08)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div className="mono" style={{ fontSize: 10, opacity: 0.55, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      {item.category} · {item.date}
                    </div>
                    <h3 className="display" style={{ fontSize: 22, fontWeight: 500, margin: "0 0 12px", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
                      {item.title}
                    </h3>
                    <span className="mono" style={{ fontSize: 11, opacity: 0.7 }}>Lire l'article →</span>
                  </button>
                ))}
              </div>

              {currentIndex >= 0 && currentIndex < NEWS.length - 1 && (
                <div style={{ marginTop: 48, textAlign: "center" }}>
                  <button
                    onClick={() => navigate(`/news/${NEWS[currentIndex + 1].slug}`)}
                    style={{
                      background: "none", border: "none", color: "#1a1612", fontFamily: "inherit",
                      fontSize: 15, display: "inline-flex", alignItems: "center", gap: 8,
                      textDecoration: "underline", textUnderlineOffset: 6, textDecorationColor: "#d97706",
                    }}
                  >
                    Article suivant <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
