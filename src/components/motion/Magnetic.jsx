import { motion, useMotionValue, useSpring } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';

export default function Magnetic({ children, strength = 0.3 }) {
  const reduced = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  const move = (e) => {
    if (reduced || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const leave = () => { x.set(0); y.set(0); };
  return <motion.span className="magnetic" style={{ x, y }} onPointerMove={move} onPointerLeave={leave}>{children}</motion.span>;
}
