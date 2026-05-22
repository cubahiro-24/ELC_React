import { useState } from "react";
import {
  Award, CheckCircle2, Clock, Compass, Mail, MapPin, Phone, Send, Users,
} from "lucide-react";
import { PageHero } from "../components/layout/PageHero.jsx";
import { Reveal } from "../components/ui/Reveal.jsx";
import { MagneticButton } from "../components/ui/MagneticButton.jsx";
import { Field } from "../components/contact/Field.jsx";
import { fieldStyle } from "../components/contact/fieldStyle.js";
import { InfoBlock } from "../components/contact/InfoBlock.jsx";
import { StylizedMap } from "../components/contact/StylizedMap.jsx";
import { SERVICES } from "../data/services.js";

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", program: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  return (
    <>
      <PageHero
        kicker="§ Contact · Commençons la conversation"
        line1="Parlons-en."
        line2=""
        line2Em=""
        intro="Que vous souhaitiez vous inscrire, consulter pour votre entreprise, ou simplement comprendre notre méthode — écrivez, appelez, ou passez nous voir. Nous répondons à chaque message."
      />

      <section style={{ padding: "60px 28px 80px", maxWidth: 1400, margin: "0 auto" }}>
        <Reveal>
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
            <div>
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.55, marginBottom: 24 }}>
                Envoyer un message
              </div>

              {submitted ? (
                <div style={{
                  padding: 40, background: "rgba(217,119,6,0.1)",
                  border: "1px solid rgba(217,119,6,0.3)", borderRadius: 8, textAlign: "center",
                  animation: "fadeUp .6s both",
                }}>
                  <CheckCircle2 size={48} style={{ color: "#d97706", margin: "0 auto 20px", display: "block", animation: "pulse 2s infinite" }} />
                  <h3 className="display" style={{ fontSize: 28, fontWeight: 500, margin: "0 0 12px" }}>Message reçu.</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.6, opacity: 0.85, margin: "0 0 24px" }}>
                    Merci, {form.name || "ami"}. Un membre de notre équipe vous répondra sous 48 heures.
                  </p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", program: "", message: "" }); }}
                    style={{
                      background: "#1a1612", color: "#f4ede0", border: "none",
                      padding: "12px 22px", borderRadius: 999, fontFamily: "inherit", fontSize: 14,
                    }}>
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                  <Field label="Votre nom" required focused={focused === "name"}>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                      required type="text" style={fieldStyle} placeholder="Annick Niyongabo" />
                  </Field>
                  <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                    <Field label="Email" required focused={focused === "email"}>
                      <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                        required type="email" style={fieldStyle} placeholder="vous@exemple.com" />
                    </Field>
                    <Field label="Téléphone" focused={focused === "phone"}>
                      <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                        type="tel" style={fieldStyle} placeholder="+257 ..." />
                    </Field>
                  </div>
                  <Field label="Je suis intéressé(e) par" focused={focused === "program"}>
                    <select value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value })}
                      onFocus={() => setFocused("program")} onBlur={() => setFocused(null)}
                      style={{ ...fieldStyle, appearance: "none",
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231a1612' stroke-width='2'><polyline points='6 9 12 15 18 9'/></svg>")`,
                        backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", backgroundSize: 16, paddingRight: 40
                      }}>
                      <option value="">Sélectionnez un programme</option>
                      {SERVICES.map((s) => <option key={s.title} value={s.title}>{s.title}</option>)}
                      <option value="other">Autre / question générale</option>
                    </select>
                  </Field>
                  <Field label="Votre message" required focused={focused === "message"}>
                    <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                      required rows={5}
                      style={{ ...fieldStyle, resize: "vertical", minHeight: 120, fontFamily: "inherit" }}
                      placeholder="Parlez-nous de vos objectifs, votre niveau, votre emploi du temps — tout ce qui peut nous aider." />
                  </Field>
                  <MagneticButton type="submit" style={{
                    alignSelf: "flex-start", background: "#1a1612", color: "#f4ede0",
                    border: "none", padding: "20px 36px", borderRadius: 999, fontFamily: "inherit",
                    fontSize: 16, display: "inline-flex", alignItems: "center", gap: 10,
                    transition: "background .3s",
                  }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#d97706")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#1a1612")}>
                    Envoyer le message <Send size={16} />
                  </MagneticButton>

                  <div className="mono" style={{ fontSize: 11, opacity: 0.5, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    ✦ Réponse garantie sous 48h
                  </div>
                </form>
              )}
            </div>

            <aside style={{ display: "flex", flexDirection: "column", gap: 36 }}>
              <div>
                <div className="mono" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.55, marginBottom: 14 }}>
                  Ou contactez-nous directement
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <InfoBlock icon={Mail} label="Email" value="elcbu@yahoo.fr" href="mailto:elcbu@yahoo.fr" />
                  <InfoBlock icon={Phone} label="Téléphone" value="+257 22 21 73 02" href="tel:+25722217302" />
                  <InfoBlock icon={MapPin} label="Adresse" value="Avenue Prince Louis Rwagasore, près de la BCB, en face de la CRDB · Bujumbura, Burundi" />
                </div>
              </div>

              <div style={{ borderTop: "1px solid rgba(26,22,18,0.2)", paddingTop: 36 }}>
                <div className="mono" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.55, marginBottom: 18 }}>
                  Horaires d'ouverture
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { d: "Lundi – Vendredi", h: "08h00 — 20h00", open: true },
                    { d: "Samedi", h: "10h00 — 14h00", open: true },
                    { d: "Dimanche", h: "Fermé", open: false },
                  ].map((r) => (
                    <div key={r.d} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(26,22,18,0.1)" }}>
                      <span style={{ fontSize: 15, display: "inline-flex", alignItems: "center", gap: 10 }}>
                        <span style={{
                          width: 6, height: 6, borderRadius: 999,
                          background: r.open ? "#22c55e" : "#94a3b8",
                          animation: r.open ? "pulse 2s infinite" : "none",
                        }} />
                        {r.d}
                      </span>
                      <span className="mono" style={{ fontSize: 13, opacity: 0.7 }}>{r.h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ aspectRatio: "5/3", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(26,22,18,0.2)" }}>
                <StylizedMap />
              </div>
            </aside>
          </div>

          <style>{`@media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; gap: 60px !important; } } @media (max-width: 500px) { .form-row { grid-template-columns: 1fr !important; } }`}</style>
        </Reveal>
      </section>

      {/* Reassurance band */}
      <section style={{ padding: "80px 28px 140px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal stagger>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 32 }}>
              {[
                { icon: Clock, t: "Réponse en 48h", d: "Chaque message reçoit une réponse personnalisée sous deux jours ouvrables." },
                { icon: Compass, t: "Évaluation gratuite", d: "Un placement complet et un plan personnalisé, sans engagement." },
                { icon: Award, t: "Diplôme reconnu", d: "Agrément ministériel N°530/078 — valeur officielle." },
                { icon: Users, t: "Communauté active", d: "Plus de 2 400 diplômés à travers l'Afrique de l'Est et au-delà." },
              ].map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.t} style={{ textAlign: "left" }}>
                    <Icon size={28} strokeWidth={1.4} style={{ color: "#d97706", marginBottom: 18 }} />
                    <h4 className="display" style={{ fontSize: 22, fontWeight: 500, margin: "0 0 8px", letterSpacing: "-0.01em" }}>{b.t}</h4>
                    <p style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.8, margin: 0 }}>{b.d}</p>
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
