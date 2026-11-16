import { useRef } from 'react';
import { motion } from 'framer-motion';

const ORDER = ['/', '/work', '/about', '/services', '/gallery', '/contact'];
const rank = (p) => {
  const i = ORDER.findIndex((o) => (o === '/' ? p === '/' : p.startsWith(o)));
  return i < 0 ? ORDER.length : i;
};
const depth = (p) => p.split('/').filter(Boolean).length;

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
  return (
    <motion.div
      className="page-turn"
      custom={dir}
      variants={{
        initial: (d) => ({ opacity: 0, y: 30, rotateX: 6, x: d * 24 }),
        enter: { opacity: 1, y: 0, rotateX: 0, x: 0, transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] } },
        exit: (d) => ({ opacity: 0, y: -16, rotateX: -4, x: d * -16, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } }),
      }}
      initial="initial" animate="enter" exit="exit"
      style={{ transformPerspective: 1400, transformOrigin: 'center top' }}
    >
      {children}
    </motion.div>
  );
}
