import { motion } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';

/* Only categories that contain projects are passed in. */
export default function CategoryFilter({ categories, active, onChange, counts }) {
  const reduced = useReducedMotion();
  const all = ['All', ...categories];
  return (
    <div className="cfilter" role="group" aria-label="Filter work by category">
      {all.map((c) => {
        const on = active === c;
        return (
          <button key={c} type="button" className={`cfilter__btn ${on ? 'is-on' : ''}`} aria-pressed={on} onClick={() => onChange(c)}>
            {on && <motion.span layoutId="cfilter-pill" className="cfilter__pill" transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 34 }} />}
            <span className="cfilter__text">{c}{counts?.[c] != null ? ` (${counts[c]})` : ''}</span>
          </button>
        );
      })}
    </div>
  );
}
