import { AnimatePresence, motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import useReducedMotion from '../../hooks/useReducedMotion';

/* Panels re-flow with layout animations when the filter changes. Panel size comes from project.layout. */
export default function ProjectGrid({ items }) {
  const reduced = useReducedMotion();
  return (
    <motion.ul className="pgrid" layout={!reduced}>
      <AnimatePresence mode="popLayout" initial={false}>
        {items.map((p, i) => (
          <motion.li
            key={p.slug}
            layout={!reduced}
            className={`pgrid__item`}
            initial={reduced ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -20 }}
            transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 32 }}
          >
            <ProjectCard project={p} index={i} />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
