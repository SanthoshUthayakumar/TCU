import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';

function Word({ w, p, a, b }) {
  const opacity = useTransform(p, [a, b], [0.16, 1]);
  return <motion.span style={{ opacity }}>{w} </motion.span>;
}

/* Scroll-linked text: words fill in one by one as the paragraph travels up the screen. */
export default function ScrollText({ text, as: Tag = 'p', className = '' }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] });
  if (reduced) return <Tag className={className}>{text}</Tag>;
  const words = text.split(' ');
  return (
    <Tag ref={ref} className={`scrolltext ${className}`.trim()} aria-label={text}>
      {words.map((w, i) => <Word key={i} w={w} p={scrollYProgress} a={i / words.length} b={(i + 1) / words.length} />)}
    </Tag>
  );
}
