import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import useReducedMotion from '../../hooks/useReducedMotion';
import { scrollToTop } from '../../utils/scroll';

export default function BackToTop() {
  const [show, setShow] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    let raf = 0;
    const check = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setShow(window.scrollY > window.innerHeight * 1.5));
    };
    window.addEventListener('scroll', check, { passive: true });
    check();
    return () => { window.removeEventListener('scroll', check); cancelAnimationFrame(raf); };
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          className="totop"
          onClick={() => scrollToTop(reduced)}
          aria-label="Back to top"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
        >
          <ArrowUp size={22} strokeWidth={3} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
