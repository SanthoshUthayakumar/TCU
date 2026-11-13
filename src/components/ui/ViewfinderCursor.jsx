import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import useMediaQuery from '../../hooks/useMediaQuery';
import useReducedMotion from '../../hooks/useReducedMotion';

/* Desktop only. Corner brackets follow the pointer and read VIEW over [data-cursor="view"]. */
export default function ViewfinderCursor() {
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reduced = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 40 });
  const sy = useSpring(y, { stiffness: 600, damping: 40 });
  const [view, setView] = useState(false);
  const active = fine && !reduced;

  useEffect(() => {
    if (!active) return undefined;
    document.documentElement.classList.add('has-vf');
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setView(Boolean(e.target.closest?.('[data-cursor="view"]')));
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      document.documentElement.classList.remove('has-vf');
    };
  }, [active, x, y]);

  if (!active) return null;
  return (
    <motion.div className={`vf ${view ? 'is-view' : ''}`} style={{ x: sx, y: sy }} aria-hidden="true">
      <span className="vf__box">
        <span className="vf__label">VIEW</span>
      </span>
    </motion.div>
  );
}
