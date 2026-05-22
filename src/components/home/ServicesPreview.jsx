import { ArrowUpRight } from "lucide-react";
import { useRouter } from "../../context/RouterContext.jsx";
import { SERVICES } from "../../data/services.js";
import { MagneticButton } from "../ui/MagneticButton.jsx";
import { Reveal } from "../ui/Reveal.jsx";

export function ServicesPreview() {
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
