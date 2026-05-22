import React from "react";

export function GlobalStyles() {
  return (
    <style>{`
      html { scroll-behavior: smooth; }
      ::selection { background: #d97706; color: #fffaf0; }
      .display { font-family: 'Fraunces', Georgia, serif; font-feature-settings: "ss01"; }
      .mono { font-family: 'JetBrains Mono', ui-monospace, monospace; letter-spacing: 0.02em; }
      a, button { cursor: pointer; }

      @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes slowSpin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
      @keyframes pulse { 0%,100% { opacity: .4; transform: scale(1); } 50% { opacity: 1; transform: scale(1.05); } }
      @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      @keyframes loadBar { from { width: 0%; } to { width: 100%; } }
      @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
      @keyframes wave { 0%,100% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } }
      @keyframes blink { 0%,50% { opacity: 1; } 51%,100% { opacity: 0; } }
      @keyframes scrollHint { 0% { transform: translateY(-12px); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(12px); opacity: 0; } }

      .reveal { opacity: 0; transform: translateY(40px); transition: opacity 1s cubic-bezier(.2,.7,.2,1), transform 1s cubic-bezier(.2,.7,.2,1); }
      .reveal.in { opacity: 1; transform: translateY(0); }
      .reveal-stagger > * { opacity: 0; transform: translateY(30px); transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1); }
      .reveal-stagger.in > * { opacity: 1; transform: translateY(0); }
      .reveal-stagger.in > *:nth-child(1) { transition-delay: 0s; }
      .reveal-stagger.in > *:nth-child(2) { transition-delay: .08s; }
      .reveal-stagger.in > *:nth-child(3) { transition-delay: .16s; }
      .reveal-stagger.in > *:nth-child(4) { transition-delay: .24s; }
      .reveal-stagger.in > *:nth-child(5) { transition-delay: .32s; }
      .reveal-stagger.in > *:nth-child(6) { transition-delay: .4s; }

      .magnetic { transition: transform .3s cubic-bezier(.2,.7,.2,1); }
      .card-invert { transition: transform .6s cubic-bezier(.2,.7,.2,1), background .5s, color .5s, border-color .5s; }
      .card-invert:hover { transform: translateY(-8px); background: #1a1612 !important; color: #f4ede0 !important; }
      .card-invert:hover .arr { transform: translate(6px,-6px); color: #d97706; }
      .arr { transition: transform .5s, color .5s; }
      .underline-anim { position: relative; display: inline-block; }
      .underline-anim::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 100%; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: right; transition: transform .6s cubic-bezier(.2,.7,.2,1); }
      .underline-anim:hover::after { transform: scaleX(1); transform-origin: left; }

      .text-mask { background: linear-gradient(110deg, #1a1612 30%, #d97706 50%, #1a1612 70%); background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; animation: shimmer 6s linear infinite; }

      .glow-on-hover { transition: filter .4s, transform .4s; }
      .glow-on-hover:hover { filter: drop-shadow(0 0 24px rgba(217,119,6,0.4)); transform: scale(1.02); }

      .btn-shine { position: relative; overflow: hidden; }
      .btn-shine::before { content: ''; position: absolute; inset: 0; background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%); transform: translateX(-100%); transition: transform .8s; }
      .btn-shine:hover::before { transform: translateX(100%); }
    `}</style>
  );
}
