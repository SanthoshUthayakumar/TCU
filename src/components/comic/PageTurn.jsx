import { motion } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';
import { tokens } from '../../utils/motion';

/* Section transition: an ink strip wipes across like a page turning. */
export default function PageTurn({ label = 'Next page', flip = false }) {
  const reduced = useReducedMotion();
  const t = tokens();
  return (
    <motion.div
      className={`pageturn ${flip ? 'pageturn--flip' : ''}`}
      initial={reduced ? false : { clipPath: flip ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' }}
      whileInView={reduced ? undefined : { clipPath: 'inset(0 0% 0 0%)' }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: t.slow, ease: t.ease }}
      aria-hidden="true"
    >
      <span className="pageturn__cut">
        <span className="pageturn__label">{label}</span>
      </span>
    </motion.div>
  );
}
