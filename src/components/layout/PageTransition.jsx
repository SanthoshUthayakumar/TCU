import { useRef } from 'react';
import { motion } from 'framer-motion';
import { tokens } from '../../utils/motion';

const ORDER = ['/', '/work', '/about', '/services', '/gallery', '/contact'];
const rank = (p) => {
  const i = ORDER.findIndex((o) => (o === '/' ? p === '/' : p.startsWith(o)));
  return i < 0 ? ORDER.length : i;
};
const depth = (p) => p.split('/').filter(Boolean).length;

/* Direction: +1 when the next page is "later" in the book, -1 when earlier. */
export function useRouteDirection(pathname) {
  const prev = useRef(pathname);
  const dir = useRef(1);
  if (prev.current !== pathname) {
    const a = rank(prev.current);
    const b = rank(pathname);
    dir.current = b !== a ? (b > a ? 1 : -1) : depth(pathname) >= depth(prev.current) ? 1 : -1;
    prev.current = pathname;
  }
  return dir.current;
}

export default function PageTransition({ dir, children }) {
  const t = tokens();
  return (
    <motion.div
      className="page-turn"
      custom={dir}
      variants={{
        initial: (d) => ({ opacity: 0, x: d * 56, rotateY: d * -6 }),
        enter: { opacity: 1, x: 0, rotateY: 0, transition: { duration: t.base * 0.65, ease: t.ease } },
        exit: (d) => ({ opacity: 0, x: d * -40, rotateY: d * 5, transition: { duration: t.base * 0.55, ease: t.ease } }),
      }}
      initial="initial"
      animate="enter"
      exit="exit"
      style={{ transformPerspective: 1400, transformOrigin: dir > 0 ? 'left center' : 'right center' }}
    >
      {children}
    </motion.div>
  );
}
