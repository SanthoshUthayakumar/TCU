import { motion } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';
import { tokens } from '../../utils/motion';

/* Headline reveals word by word, once. Screen readers get the plain text. */
export default function SplitText({ text, as = 'h2', className = '', delay = 0 }) {
  const reduced = useReducedMotion();
  const t = tokens();
  const Tag = motion[as] || motion.h2;
  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{text}</Plain>;
  }
  const words = text.split(' ');
  return (
    <Tag
      className={`split ${className}`.trim()}
      initial="hide"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
    >
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="split__word" aria-hidden="true">
          <motion.span
            className="split__inner"
            variants={{ hide: { y: '110%', scale: 1.25, rotate: 4, opacity: 0 }, show: { y: '0%', scale: 1, rotate: 0, opacity: 1 } }}
            transition={{ duration: t.base, ease: t.ease }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
