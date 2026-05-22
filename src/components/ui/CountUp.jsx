import { useState, useEffect } from "react";
import { useReveal } from "../../hooks/useReveal.js";

export function CountUp({ to, suffix = "", duration = 2000 }) {
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
