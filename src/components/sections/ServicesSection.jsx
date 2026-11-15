import { useState } from 'react';
import { motion } from 'framer-motion';
import Reveal3D from '../motion/Reveal3D';
import RiseText from '../motion/RiseText';
import useReducedMotion from '../../hooks/useReducedMotion';
import services from '../../data/services';

function Flip({ svc, index }) {
  const [flipped, setFlipped] = useState(false);
  const reduced = useReducedMotion();
  return (
    <Reveal3D as="li" className="svc" tilt={28} lift={60} side={index % 2 ? 10 : -10}>
      <button type="button" className={`svc__btn ${reduced ? 'is-static' : ''}`} aria-expanded={reduced ? true : flipped} onClick={() => setFlipped(!flipped)}>
        <motion.span className="svc__inner" animate={{ rotateY: flipped && !reduced ? 180 : 0 }} transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}>
          <span className="svc__face svc__face--front">
            <span className="svc__idx">{String(index + 1).padStart(2, '0')}</span>
            <span className="svc__name">{svc.name}</span>
            <span className="svc__line">{svc.front}</span>
            {!reduced && <span className="svc__flip">View details</span>}
          </span>
          <span className="svc__face svc__face--back">
            <span className="svc__name">{svc.name}</span>
            <span className="svc__list">{svc.back.map((b) => <span className="svc__item" key={b}>{b}</span>)}</span>
          </span>
        </motion.span>
      </button>
    </Reveal3D>
  );
}

export default function ServicesSection({ heading = true }) {
  if (!services.length) return null;
  return (
    <section className="sec services" aria-label="Services">
      <div className="wrap">
        {heading && (<><p className="eyebrow">Services</p><RiseText text="What we shoot" className="h2" /></>)}
        <ul className="services__grid">
          {services.map((s, i) => <Flip svc={s} index={i} key={s.id} />)}
        </ul>
      </div>
    </section>
  );
}
