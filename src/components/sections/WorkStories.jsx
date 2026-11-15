import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Wipe from '../motion/Wipe';
import RiseText from '../motion/RiseText';
import useReducedMotion from '../../hooks/useReducedMotion';
import projects from '../../data/projects';

/* One card pins to the screen; as the next one slides over it, the card underneath tips back in 3D. */
function StackCard({ p, i, n }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -9]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.45]);
  return (
    <li className="stack__item" ref={ref} style={{ '--i': i }}>
      <motion.article className="story" style={reduced ? undefined : { scale, rotateX, transformPerspective: 1400, transformOrigin: 'center top' }}>
        <Link to={`/work/${p.slug}`} className="story__photo" aria-label={`Open ${p.title}`}>
          <Wipe className="wipe--fill"><img src={p.cover} alt={`${p.title} cover`} loading="lazy" /></Wipe>
        </Link>
        <div className="story__body">
          <p className="story__count">{String(i + 1).padStart(2, '0')} <span>/ {String(n).padStart(2, '0')}</span></p>
          <h3 className="story__name">{p.title}</h3>
          <p className="story__meta">{p.category} / {p.year} / {p.role}</p>
          {p.summary && <p className="story__text">{p.summary}</p>}
          <Link to={`/work/${p.slug}`} className="textlink">Open this story <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
        {!reduced && <motion.span className="story__shade" style={{ opacity: dim }} aria-hidden="true" />}
      </motion.article>
    </li>
  );
}

export default function WorkStories() {
  const items = [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)].slice(0, 5);
  if (!items.length) return null;
  return (
    <section className="sec sec--dark stories" id="stories" aria-label="Front-row frames">
      <div className="wrap">
        <p className="eyebrow">Selected work</p>
        <RiseText text="Front-row frames" className="h2" />
        <ol className="stack">
          {items.map((p, i) => <StackCard key={p.slug} p={p} i={i} n={items.length} />)}
        </ol>
      </div>
    </section>
  );
}
