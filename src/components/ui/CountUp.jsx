import { useEffect, useState } from 'react';
import { animate } from 'framer-motion';
import useInView from '../../hooks/useInView';
import useReducedMotion from '../../hooks/useReducedMotion';

export default function CountUp({ value, suffix = '', duration = 1.6 }) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView({ once: true, threshold: 0.4 });
  const [n, setN] = useState(0);
  const target = Number(value) || 0;
  useEffect(() => {
    if (!inView) return undefined;
    if (reduced) { setN(target); return undefined; }
    const controls = animate(0, target, { duration, ease: [0.2, 0.8, 0.2, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, target, duration, reduced]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}