import { motion, useScroll, useTransform } from 'framer-motion';
import useMediaQuery from '../../hooks/useMediaQuery';
import useReducedMotion from '../../hooks/useReducedMotion';

/* Section background dots. They drift slowly with scroll on desktop and sit still elsewhere. */
export default function HalftoneField() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => `${(v * 0.06) % 40}px`);
  const desktop = useMediaQuery('(min-width: 1024px)');
  const reduced = useReducedMotion();
  return <motion.span className="hfield" aria-hidden="true" style={desktop && !reduced ? { y } : undefined} />;
}
