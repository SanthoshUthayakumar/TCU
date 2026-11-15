import { motion } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';

/* Image reveal: a shutter wipes open while the picture settles from a slight zoom. */
export default function Wipe({ children, className = '' }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={`wipe ${className}`.trim()}>{children}</div>;
  return (
    <motion.div className={`wipe ${className}`.trim()} initial={{ clipPath: 'inset(0 0 100% 0)' }} whileInView={{ clipPath: 'inset(0 0 0% 0)' }} viewport={{ once: true, margin: '0px 0px -12% 0px' }} transition={{ duration: 1.1, ease: [0.77, 0, 0.18, 1] }}>
      <motion.div className="wipe__in" initial={{ scale: 1.3 }} whileInView={{ scale: 1 }} viewport={{ once: true, margin: '0px 0px -12% 0px' }} transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}>{children}</motion.div>
    </motion.div>
  );
}
