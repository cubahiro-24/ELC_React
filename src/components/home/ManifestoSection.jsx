import { ArrowRight } from "lucide-react";
import { useRouter } from "../../context/RouterContext.jsx";
import { MagneticButton } from "../ui/MagneticButton.jsx";
import { Reveal } from "../ui/Reveal.jsx";

export function ManifestoSection() {
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
