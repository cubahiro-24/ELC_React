import { ArrowRight, Mail, Phone } from "lucide-react";
import { useRouter } from "../../context/RouterContext.jsx";

export function Footer() {
  const { navigate } = useRouter();
  return (
    <footer style={{
      position: "relative", zIndex: 2, background: "#1a1612", color: "#f4ede0",
      padding: "100px 28px 40px",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.5, marginBottom: 24 }}>
          Fin de transmission
        </div>
        <h2 className="display" style={{
          fontSize: "clamp(48px, 9vw, 140px)", lineHeight: 0.9,
          letterSpacing: "-0.04em", fontWeight: 400, margin: "0 0 80px 0",
        }}>
          À <em style={{ fontStyle: "italic", color: "#d97706" }}>très bientôt.</em>
        </h2>

        <div className="footer-grid" style={{
          display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 60,
          paddingBottom: 60, borderBottom: "1px solid rgba(244,237,224,0.15)",
        }}>
          <div>
            <div className="mono" style={{ fontSize: 11, opacity: 0.5, marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.1em" }}>Nous trouver</div>
            <p style={{ fontSize: 16, lineHeight: 1.55, margin: 0 }}>
              Avenue Prince Louis Rwagasore,<br />
              près de la BCB, en face de la CRDB<br />
              <span style={{ opacity: 0.6 }}>Bujumbura, Burundi</span>
            </p>
          </div>
          <div>
            <div className="mono" style={{ fontSize: 11, opacity: 0.5, marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.1em" }}>Contact</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 15 }}>
              <a href="mailto:elcbu@yahoo.fr" style={{ color: "inherit", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "gap .3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.gap = "12px")} onMouseLeave={(e) => (e.currentTarget.style.gap = "8px")}>
                <Mail size={14} style={{ color: "#d97706" }} /> elcbu@yahoo.fr
              </a>
              <a href="tel:+25722217302" style={{ color: "inherit", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "gap .3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.gap = "12px")} onMouseLeave={(e) => (e.currentTarget.style.gap = "8px")}>
                <Phone size={14} style={{ color: "#d97706" }} /> +257 22 21 73 02
              </a>
            </div>
          </div>
          <div>
            <div className="mono" style={{ fontSize: 11, opacity: 0.5, marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.1em" }}>Horaires</div>
            <div style={{ fontSize: 15, lineHeight: 1.6 }}>
              <div>Lun–Ven <span style={{ opacity: 0.6 }}>08–20h</span></div>
              <div>Samedi <span style={{ opacity: 0.6 }}>10–14h</span></div>
              <div style={{ opacity: 0.4 }}>Dimanche fermé</div>
            </div>
          </div>
          <div>
            <div className="mono" style={{ fontSize: 11, opacity: 0.5, marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.1em" }}>Navigation</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 15 }}>
              {[{ l: "Accueil", to: "/" }, { l: "À propos", to: "/about" }, { l: "Services", to: "/services" }, { l: "Actualités", to: "/news" }, { l: "Contact", to: "/contact" }].map((it) => (
                <button key={it.l} onClick={() => navigate(it.to)}
                  style={{ background: "none", border: "none", color: "inherit", textAlign: "left", padding: 0, fontFamily: "inherit", fontSize: 15, display: "inline-flex", alignItems: "center", gap: 8, transition: "gap .3s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.gap = "14px")} onMouseLeave={(e) => (e.currentTarget.style.gap = "8px")}>
                  <ArrowRight size={12} style={{ color: "#d97706" }} /> {it.l}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: "80px 0 40px", textAlign: "center" }}>
          <div className="display" style={{
            fontSize: "clamp(72px, 18vw, 280px)", fontWeight: 300,
            letterSpacing: "-0.05em", lineHeight: 0.85, fontStyle: "italic",
          }}>
            APLA<span style={{ color: "#d97706", fontStyle: "normal" }}>·</span>ELC
          </div>
        </div>

        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingTop: 30, borderTop: "1px solid rgba(244,237,224,0.15)",
          flexWrap: "wrap", gap: 16,
        }}>
          <div className="mono" style={{ fontSize: 11, opacity: 0.5, letterSpacing: "0.1em" }}>
            © 2026 APLA·ELC — Tous droits réservés.
          </div>
          <div className="mono" style={{ fontSize: 11, opacity: 0.5, letterSpacing: "0.1em" }}>
            Bujumbura · Burundi · 🇧🇮
          </div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mono"
            style={{ background: "none", border: "none", color: "inherit", fontSize: 11, opacity: 0.7, letterSpacing: "0.1em", fontFamily: "inherit" }}>
            ↑ Retour en haut
          </button>
        </div>
      </div>

      <style>{`@media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 40px !important; } } @media (max-width: 560px) { .footer-grid { grid-template-columns: 1fr !important; } }`}</style>
    </footer>
  );
}
