import { useRef } from "react";

export function MagneticButton({ children, onClick, style, ...rest }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = "translate(0,0)"; };
  return (
    <button
      ref={ref} onClick={onClick} onMouseMove={onMove} onMouseLeave={onLeave}
      className="magnetic btn-shine"
      style={style} {...rest}
    >
      {children}
    </button>
  );
}
