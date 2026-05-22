import { useState, useEffect } from "react";
import { Pause, Play, Quote } from "lucide-react";
import { Reveal } from "../ui/Reveal.jsx";

export function TestimonialReel() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const items = [
    { quote: "Je suis arrivée sans pouvoir commander un café en anglais. Six mois plus tard, je donnais la conférence d'ouverture régionale. Chez APLA·ELC, on ne vous enseigne pas l'anglais — on vous tend un micro et on vous met au défi de l'utiliser.", name: "Annick N.", role: "Cheffe de projet · ONU Burundi" },
    { quote: "La préparation au TOEFL était rigoureuse, méthodique, et franchement transformatrice. J'ai obtenu 112. J'étudie aujourd'hui à McGill avec une bourse complète. J'envoie chaque cousin ambitieux que j'ai chez APLA.", name: "Patrick H.", role: "Étudiant en master · Université McGill" },
    { quote: "Toute notre équipe de direction s'est inscrite au programme entreprise. En un an, nous avions ouvert des bureaux à Kampala et Nairobi. L'investissement s'est remboursé dix fois.", name: "Béatrice M.", role: "PDG · Lake Tanganyika Logistics" },
    { quote: "Les enseignants ne lâchent rien. Ils corrigent, encouragent, exigent. C'est exactement ce qu'il fallait. J'ai obtenu ma bourse Mastercard à six mois de la date butoir.", name: "Christian B.", role: "Boursier Mastercard · ALU Rwanda" },
  ];

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 7000);
    return () => clearInterval(t);
  }, [paused, items.length]);

  return (
    <section style={{ padding: "120px 28px", background: "rgba(217,119,6,0.06)", position: "relative", overflow: "hidden" }}>
      <Reveal>
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.55 }}>
              § Voix de notre communauté
            </div>
            <button onClick={() => setPaused((p) => !p)} aria-label={paused ? "Resume" : "Pause"}
              style={{
                background: "transparent", border: "1px solid rgba(26,22,18,0.2)",
                borderRadius: 999, padding: 10, color: "#1a1612",
                display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11,
                fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.05em",
              }}>
              {paused ? <Play size={12} /> : <Pause size={12} />}
              {paused ? "REPRENDRE" : "PAUSE"}
            </button>
          </div>

          <Quote size={48} strokeWidth={1} style={{ color: "#d97706", margin: "0 auto 30px", display: "block" }} />

          <div style={{ position: "relative", minHeight: 280 }}>
            {items.map((it, i) => (
              <div key={i} style={{
                position: i === idx ? "relative" : "absolute",
                top: 0, left: 0, right: 0,
                opacity: i === idx ? 1 : 0,
                transform: i === idx ? "translateY(0)" : "translateY(20px)",
                transition: "opacity .8s, transform .8s",
                pointerEvents: i === idx ? "auto" : "none",
              }}>
                <blockquote className="display" style={{
                  fontSize: "clamp(22px, 3.2vw, 38px)", lineHeight: 1.3, fontStyle: "italic",
                  fontWeight: 300, textAlign: "center", margin: "0 0 40px 0", letterSpacing: "-0.01em",
                }}>
                  "{it.quote}"
                </blockquote>
                <div style={{ textAlign: "center" }}>
                  <div className="display" style={{ fontSize: 20, fontWeight: 500 }}>{it.name}</div>
                  <div className="mono" style={{ fontSize: 12, opacity: 0.6, marginTop: 6, letterSpacing: "0.05em" }}>{it.role}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 60 }}>
            {items.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)}
                style={{
                  width: i === idx ? 40 : 8, height: 8, borderRadius: 999,
                  background: i === idx ? "#d97706" : "rgba(26,22,18,0.2)",
                  border: "none", transition: "width .4s, background .4s",
                }}
                aria-label={`Témoignage ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
