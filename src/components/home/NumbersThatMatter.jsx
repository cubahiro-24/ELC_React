import { Reveal } from "../ui/Reveal.jsx";
import { CountUp } from "../ui/CountUp.jsx";

export function NumbersThatMatter() {
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
