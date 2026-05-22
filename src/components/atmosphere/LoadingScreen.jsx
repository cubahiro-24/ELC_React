import { useState, useEffect } from "react";

export function LoadingScreen() {
  const [exiting, setExiting] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setExiting(true), 1400);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 999, background: "#1a1612",
      color: "#f4ede0", display: "flex", alignItems: "center", justifyContent: "center",
      transform: exiting ? "translateY(-100%)" : "translateY(0)",
      transition: "transform 1s cubic-bezier(.7,0,.3,1)",
      pointerEvents: exiting ? "none" : "auto",
    }}>
      <div style={{ textAlign: "center" }}>
        <div className="display" style={{
          fontSize: "clamp(64px, 10vw, 140px)", fontWeight: 300,
          fontStyle: "italic", letterSpacing: "-0.04em",
          animation: "fadeIn .8s both",
        }}>
          APLA<span style={{ color: "#d97706", fontStyle: "normal" }}>·</span>ELC
        </div>
        <div className="mono" style={{
          marginTop: 28, fontSize: 11, letterSpacing: "0.3em", opacity: 0.6,
          animation: "fadeIn 1s .3s both",
        }}>
          PREPARING THE STAGE
        </div>
        <div style={{
          marginTop: 28, width: 200, height: 1, background: "rgba(244,237,224,0.2)",
          overflow: "hidden", margin: "28px auto 0",
        }}>
          <div style={{ height: "100%", background: "#d97706", animation: "loadBar 1.3s cubic-bezier(.7,0,.3,1) both" }} />
        </div>
      </div>
    </div>
  );
}
