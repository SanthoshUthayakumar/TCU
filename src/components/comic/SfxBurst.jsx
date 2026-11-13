import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import useInView from '../../hooks/useInView';
import useReducedMotion from '../../hooks/useReducedMotion';

/* Fires once when it scrolls into view. Pop Red is reserved for these bursts. Max one per screen. */
export default function SfxBurst({ word, className = '' }) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView({ once: true, threshold: 0.6 });
  const fired = useRef(false);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (inView && !fired.current) {
      fired.current = true;
      setShow(true);
    }
  }, [inView]);
  if (reduced) return null;
  return (
    <span ref={ref} className={`sfx ${className}`.trim()} aria-hidden="true">
      {show && (
        <motion.span
          className="sfx__burst"
          initial={{ scale: 0, rotate: -18, opacity: 0 }}
          animate={{ scale: 1, rotate: -6, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 520, damping: 14 }}
        >
          <span className="sfx__word">{word}</span>
        </motion.span>
      )}
    </span>
  );
}
