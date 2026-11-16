import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import RiseText from '../motion/RiseText';
import useMediaQuery from '../../hooks/useMediaQuery';
import useReducedMotion from '../../hooks/useReducedMotion';
import gallery from '../../data/gallery';

export default function GalleryPreview() {
  const items = gallery.slice(0, 6);
  const wide = useMediaQuery('(min-width: 900px)');
  const reduced = useReducedMotion();
  const pin = wide && !reduced;
  const outer = useRef(null);
  const rail = useRef(null);
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-14, 0, 14]);

  useEffect(() => {
    const measure = () => rail.current && setDist(Math.max(0, rail.current.scrollWidth - window.innerWidth + 80));
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [pin, items.length]);

  if (!items.length) return null;
  return (
    <section className={`gprev ${pin ? 'is-pinned' : ''}`} ref={outer} aria-label="Gallery preview">
      <div className="gprev__pin">
        <div className="wrap gprev__head">
          <div><p className="eyebrow">Gallery</p><RiseText text="From the gallery" className="h2" /></div>
          <Button to="/gallery" icon={ArrowRight} size="md" variant="ghost">Open the gallery</Button>
        </div>
        <motion.ul className="gprev__rail" ref={rail} style={pin ? { x } : undefined}>
          {items.map((g, i) => (
            <motion.li key={g.id} className="gprev__item" style={pin ? { rotateY, transformPerspective: 1300 } : undefined}>
              <Link to="/gallery" aria-label={`Open gallery: ${g.alt}`}>
                <img src={g.src} alt={g.alt} loading="lazy" style={{ aspectRatio: i % 3 === 0 ? '3/4' : '3/4' }} />
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
