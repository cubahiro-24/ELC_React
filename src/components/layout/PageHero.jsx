import React from "react";

export function PageHero({ kicker, line1, line2, line2Em, intro }) {
  return (
    <section style={{ padding: "180px 28px 80px", position: "relative" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div className="mono" style={{
          fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.55, marginBottom: 32,
          animation: "fadeIn .8s both",
        }}>
          {kicker}
        </div>
        <h1 className="display" style={{
          fontSize: "clamp(56px, 11vw, 180px)", lineHeight: 0.9,
          letterSpacing: "-0.04em", fontWeight: 400, margin: 0,
          animation: "fadeUp 1.2s cubic-bezier(.2,.7,.2,1) both",
        }}>
          {line1}{line2 && <br />}
          {line2}{line2Em && <em style={{ fontStyle: "italic", fontWeight: 300, color: "#d97706" }}> {line2Em}</em>}
        </h1>
        {intro && (
          <p style={{
            fontSize: "clamp(16px, 1.5vw, 19px)", lineHeight: 1.6,
            maxWidth: 640, margin: "48px 0 0", opacity: 0.85,
            animation: "fadeUp 1s .3s both",
          }}>
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
