import { useState, useEffect, useRef } from "react";
import {
  ArrowRight, ArrowUpRight, ChevronRight, Pause, Play, Quote,
} from "lucide-react";
import { useRouter } from "../context/RouterContext.jsx";
import { SERVICES } from "../data/services.js";
import { MagneticButton } from "../components/ui/MagneticButton.jsx";
import { Reveal } from "../components/ui/Reveal.jsx";
import { useReveal } from "../hooks/useReveal.js";

function CountUp({ to, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal(0.3);
  useEffect(() => {
    if (!visible) return;
    const start = Date.now();
    const numericTo = parseFloat(String(to).replace(/[^\d.]/g, ""));
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(numericTo * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    tick();
  }, [visible, to, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function CinematicHero() {
  const { navigate } = useRouter();
  const [scroll, setScroll] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    const onMove = (e) => {
      if (!heroRef.current) return;
      const r = heroRef.current.getBoundingClientRect();
      setMouse({
        x: (e.clientX - r.left - r.width / 2) / r.width,
        y: (e.clientY - r.top - r.height / 2) / r.height,
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const words = ["fluently", "boldly", "globally", "freely"];
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWordIdx((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={heroRef} style={{
      padding: "140px 28px 60px", minHeight: "100vh",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      position: "relative",
    }}>
      {/* Floating decorations */}
      <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "15%", right: "8%",
          transform: `translate(${mouse.x * 30}px, ${mouse.y * 30}px) rotate(${scroll * 0.05}deg)`,
          transition: "transform .8s cubic-bezier(.2,.7,.2,1)",
        }}>
          <svg width="120" height="120" viewBox="0 0 120 120" style={{ opacity: 0.7 }}>
            <circle cx="60" cy="60" r="50" fill="none" stroke="#d97706" strokeWidth="1" />
            <circle cx="60" cy="60" r="50" fill="none" stroke="#d97706" strokeWidth="0.5" strokeDasharray="2 6" />
            <text x="60" y="66" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="36" fontStyle="italic" fill="#d97706">A</text>
          </svg>
        </div>
        <div style={{
          position: "absolute", bottom: "25%", left: "6%",
          transform: `translate(${mouse.x * -20}px, ${mouse.y * -20}px)`,
          transition: "transform 1s cubic-bezier(.2,.7,.2,1)",
        }}>
          <svg width="80" height="80" viewBox="0 0 80 80" style={{ animation: "float 6s ease-in-out infinite" }}>
            <polygon points="40,8 50,30 72,30 54,46 60,68 40,56 20,68 26,46 8,30 30,30"
              fill="none" stroke="#1a1612" strokeWidth="1" opacity="0.4" />
          </svg>
        </div>
      </div>

      <div className="mono" style={{
        display: "flex", justifyContent: "space-between", fontSize: 11,
        opacity: 0.55, textTransform: "uppercase", letterSpacing: "0.1em",
        marginBottom: 40, flexWrap: "wrap", gap: 12,
        animation: "fadeIn 1s .2s both",
      }}>
        <span>Vol. XII · Édition Bujumbura</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: "#22c55e", animation: "pulse 2s infinite" }} />
          Inscriptions ouvertes
        </span>
        <span>Agrément Ministériel №530/078</span>
      </div>

      <div style={{ position: "relative" }}>
        <h1 className="display" style={{
          fontSize: "clamp(56px, 13vw, 200px)", lineHeight: 0.88,
          fontWeight: 400, letterSpacing: "-0.04em", margin: 0,
          animation: "fadeUp 1.2s cubic-bezier(.2,.7,.2,1) both",
        }}>
          Parler{" "}
          <span style={{
            position: "relative", display: "inline-block", minWidth: "5ch",
          }}>
            <em key={wordIdx} style={{
              fontStyle: "italic", fontWeight: 300, color: "#d97706",
              display: "inline-block",
              animation: "fadeUp .6s cubic-bezier(.2,.7,.2,1) both",
            }}>
              {words[wordIdx]}.
            </em>
          </span>
          <br />Penser{" "}
          <span style={{ position: "relative", display: "inline-block" }}>
            sans frontières.
            <svg viewBox="0 0 500 20" preserveAspectRatio="none"
              style={{ position: "absolute", left: 0, right: 0, bottom: "-12px", width: "100%", height: 18 }}>
              <path d="M 4 10 Q 100 2 200 10 T 400 10 T 496 8" stroke="#d97706" strokeWidth="3" fill="none" strokeLinecap="round"
                strokeDasharray="1000" strokeDashoffset="1000"
                style={{ animation: "drawIn 2s 1s cubic-bezier(.7,0,.3,1) both" }} />
            </svg>
            <style>{`@keyframes drawIn { to { stroke-dashoffset: 0; } }`}</style>
          </span>
        </h1>
      </div>

      <div className="hero-lower" style={{
        marginTop: 80, display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 40, alignItems: "end",
      }}>
        <p style={{
          fontSize: "clamp(16px, 1.6vw, 20px)", lineHeight: 1.55, maxWidth: 460, margin: 0, opacity: 0.85,
          animation: "fadeUp 1s .8s both",
        }}>
          Depuis plus d'une décennie, APLA·ELC forme à Bujumbura les diplomates, professionnels et étudiants ambitieux qui refusent que la langue soit une frontière.
        </p>
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 14,
          animation: "fadeUp 1s 1s both",
        }}>
          <MagneticButton onClick={() => navigate("/services")}
            style={{
              background: "#1a1612", color: "#f4ede0", padding: "22px 36px",
              borderRadius: 999, border: "none", fontSize: 16, fontFamily: "inherit",
              display: "inline-flex", alignItems: "center", gap: 10, transition: "background .3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#d97706")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#1a1612")}>
            Découvrir nos programmes <ArrowUpRight size={18} />
          </MagneticButton>
          <div className="mono" style={{
            fontSize: 11, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.1em",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <span style={{ display: "inline-block", animation: "scrollHint 2s infinite" }}>↓</span>
            Faire défiler · Explorer
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .hero-lower { grid-template-columns: 1fr !important; gap: 28px !important; }
          .hero-lower > div:last-child { align-items: flex-start !important; }
        }
      `}</style>
    </section>
  );
}

function MarqueeBand() {
  const items = [
    "Préparation TOEFL", "Coaching IELTS", "Anglais des affaires",
    "Accent américain", "Traductions certifiées", "Interprétariat",
    "Formation en entreprise", "Anglais diplomatique",
  ];
  const doubled = [...items, ...items];
  return (
    <div style={{
      background: "#1a1612", color: "#f4ede0", padding: "22px 0",
      overflow: "hidden", borderTop: "1px solid #1a1612", borderBottom: "1px solid #1a1612",
    }}>
      <div style={{ display: "flex", gap: 56, whiteSpace: "nowrap", animation: "marquee 38s linear infinite" }}>
        {doubled.map((it, i) => (
          <span key={i} className="display" style={{
            fontSize: 28, fontStyle: "italic", fontWeight: 300,
            display: "inline-flex", alignItems: "center", gap: 56,
          }}>
            {it}<span style={{ color: "#d97706", fontSize: 12 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function ManifestoSection() {
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

function ServicesPreview() {
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

function NumbersThatMatter() {
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

function TestimonialReel() {
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

function FaqAccordion() {
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

function FinalCTA() {
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

export function HomeScreen() {
  return (
    <>
      <CinematicHero />
      <MarqueeBand />
      <ManifestoSection />
      <ServicesPreview />
      <NumbersThatMatter />
      <TestimonialReel />
      <FaqAccordion />
      <FinalCTA />
    </>
  );
}
