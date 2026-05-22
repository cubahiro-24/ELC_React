import { useReveal } from "../../hooks/useReveal.js";

export function Reveal({ children, stagger, className = "", style }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`${stagger ? "reveal-stagger" : "reveal"} ${visible ? "in" : ""} ${className}`} style={style}>
      {children}
    </div>
  );
}
