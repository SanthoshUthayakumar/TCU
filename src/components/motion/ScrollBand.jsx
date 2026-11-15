import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';

/* Two lines of oversized text that slide in opposite directions as the page scrolls past them. */
export default function ScrollBand({ items }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const a = useTransform(p, [0, 1], ['6%', '-32%']);
  const b = useTransform(p, [0, 1], ['-32%', '6%']);
  const line = items.join('  /  ');
  const row = (k) => <span key={k}>{line}  /  </span>;
  return (
    <section className="band" ref={ref} aria-label={items.join(', ')}>
      <motion.p className="band__row" style={reduced ? undefined : { x: a }} aria-hidden="true">{[0, 1, 2].map(row)}</motion.p>
      <motion.p className="band__row band__row--soft" style={reduced ? undefined : { x: b }} aria-hidden="true">{[0, 1, 2].map(row)}</motion.p>
    </section>
  );
}
