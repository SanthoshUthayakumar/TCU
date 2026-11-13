import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SplitText from '../comic/SplitText';
import ProjectCard from '../work/ProjectCard';
import Button from '../ui/Button';
import useMediaQuery from '../../hooks/useMediaQuery';
import useReducedMotion from '../../hooks/useReducedMotion';
import projects from '../../data/projects';

function Pinned({ items }) {
  /* Sticky pin: the page scrolls vertically while the track moves sideways. Native scrolling is untouched. */
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const [dist, setDist] = useState(0);
  useLayoutEffect(() => {
    const measure = () => setDist(Math.max(0, (trackRef.current?.scrollWidth || 0) - window.innerWidth + 48));
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [items.length]);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  return (
    <div ref={wrapRef} className="strip__pin" style={{ height: `calc(100svh + ${dist}px)` }}>
      <div className="strip__sticky">
        <Head />
        <motion.ul ref={trackRef} className="strip__track" style={{ x }}>
          {items.map((p, i) => (
            <li className="strip__item" key={p.slug}><ProjectCard project={p} index={i} ratio="4/3" /></li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}

function Head() {
  return (
    <div className="strip__head">
      <SplitText text="FEATURED WORK" className="strip__title" />
      <Button to="/work" icon={ArrowRight} size="sm">See the full archive</Button>
    </div>
  );
}

export default function FeaturedStrip() {
  const items = projects.filter((p) => p.featured);
  const desktop = useMediaQuery('(min-width: 768px)');
  const reduced = useReducedMotion();
  if (!items.length) return null;
  const pinned = desktop && !reduced;
  return (
    <section id="featured" className="strip" data-pg aria-label="Featured work">
      {pinned ? (
        <Pinned items={items} />
      ) : (
        <>
          <Head />
          <ul className="strip__snap">
            {items.map((p, i) => (
              <li className="strip__item" key={p.slug}><ProjectCard project={p} index={i} ratio="4/3" /></li>
            ))}
          </ul>
          {!desktop && <p className="strip__hint">Swipe sideways, or <Link to="/work">open the full archive</Link>.</p>}
        </>
      )}
    </section>
  );
}
