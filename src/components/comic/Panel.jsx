import { motion } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';
import { tokens } from '../../utils/motion';

/* Clip insets extend past the box so the hard shadow is never cut off. */
const HIDE = 'inset(-10% 100% -10% -10%)';
const SHOW = 'inset(-10% -10% -10% -10%)';

export default function Panel({ as = 'div', index = 0, tilt = 0, className = '', frameClass = '', children, ...rest }) {
  const reduced = useReducedMotion();
  const t = tokens();
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={`panel ${className}`.trim()}
      initial={reduced ? false : { opacity: 0, scale: 0.96, rotate: tilt - 1.5, clipPath: HIDE }}
      whileInView={reduced ? undefined : { opacity: 1, scale: 1, rotate: tilt, clipPath: SHOW }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: t.slow, delay: (index % 4) * 0.08, ease: t.ease }}
      {...rest}
    >
      <div className={`panel__frame ${frameClass}`.trim()}>{children}</div>
    </Tag>
  );
}
