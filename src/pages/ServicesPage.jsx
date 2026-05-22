import { useState } from "react";
import {
  ArrowRight, CheckCircle2, ChevronDown,
  Headphones, PenTool, Target, TrendingUp,
} from "lucide-react";
import { useRouter } from "../context/RouterContext.jsx";
import { PageHero } from "../components/layout/PageHero.jsx";
import { Reveal } from "../components/ui/Reveal.jsx";
import { SERVICES } from "../data/services.js";

export function ServicesPage() {
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
