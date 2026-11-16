import { motion } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';

export default function RiseText({ text, as: Tag = 'h2', className = '', delay = 0 }) {
  const reduced = useReducedMotion();
  if (reduced) return <Tag className={className}>{text}</Tag>;
  return (
    <Tag className={`rise ${className}`.trim()} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span className="rise__mask" aria-hidden="true" key={i}>
          <motion.span
            className="rise__word"
            initial={{ y: '115%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.8, delay: delay + i * 0.07, ease: [0.2, 0.8, 0.2, 1] }}
          >{w}</motion.span>{' '}
        </span>
      ))}
    </Tag>
  );
}
