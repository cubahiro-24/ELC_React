import { ChevronRight } from "lucide-react";
import { useRouter } from "../../context/RouterContext.jsx";
import { MagneticButton } from "../ui/MagneticButton.jsx";
import { Reveal } from "../ui/Reveal.jsx";

export function FinalCTA() {
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
