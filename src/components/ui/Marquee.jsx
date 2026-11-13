import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';
import { useRef } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion';
import useScrollVelocity from '../../hooks/useScrollVelocity';
import { wrap } from '../../utils/motion';

/* Ticker: speed follows scroll velocity, direction follows scroll direction. */
export default function Marquee({ items, base = -3 }) {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const velocity = useScrollVelocity();
  const dir = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const v = velocity.get() / 1000;
    if (v < -0.02) dir.current = -1;
    else if (v > 0.02) dir.current = 1;
    let move = dir.current * base * (delta / 1000);
    move += dir.current * move * Math.min(Math.abs(v) * 5, 8);
    baseX.set(baseX.get() + move);
  });

  const row = (key, hidden) => (
    <span className="marquee__row" key={key} aria-hidden={hidden || undefined}>
      {items.map((w) => (
        <span className="marquee__item" key={w}>{w}<span className="marquee__sep" aria-hidden="true">✭</span></span>
      ))}
    </span>
  );

  if (reduced) {
    return <div className="marquee marquee--static">{row('s', false)}</div>;
  }
  return (
    <div className="marquee">
      <span className="sr-only">{items.join(', ')}</span>
      <motion.div className="marquee__track" style={{ x }}>
        {[0, 1, 2, 3].map((i) => row(i, true))}
      </motion.div>
    </div>
  );
}
