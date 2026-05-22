import { useState } from "react";
import { Reveal } from "../ui/Reveal.jsx";

export function FaqAccordion() {
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
