import { Award } from "lucide-react";
import { PageHero } from "../components/layout/PageHero.jsx";
import { Reveal } from "../components/ui/Reveal.jsx";
import { TIMELINE } from "../data/timeline.js";

export function AboutPage() {
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
