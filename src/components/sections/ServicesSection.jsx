import { useState } from 'react';
import { motion } from 'framer-motion';
import SplitText from '../comic/SplitText';
import SpeechBubble from '../comic/SpeechBubble';
import Panel from '../comic/Panel';
import useReducedMotion from '../../hooks/useReducedMotion';
import { tokens } from '../../utils/motion';
import services from '../../data/services';

const TILTS = [-1, 0.7, -0.4, 1.1, -0.8];

function Flip({ svc, index }) {
  const [flipped, setFlipped] = useState(false);
  const reduced = useReducedMotion();
  const t = tokens();
  return (
    <Panel index={index} tilt={TILTS[index % TILTS.length]} className="svc">
      <button type="button" className={`svc__btn ${reduced ? 'is-static' : ''}`} aria-expanded={reduced ? true : flipped} onClick={() => setFlipped(!flipped)}>
        <motion.span className="svc__inner" animate={{ rotateY: flipped && !reduced ? 180 : 0 }} transition={{ duration: t.slow, ease: t.ease }}>
          <span className="svc__face svc__face--front">
            <span className="svc__name">{svc.name}</span>
            <span className="svc__line">{svc.front}</span>
            {!reduced && <span className="svc__flip">Tap to flip</span>}
          </span>
          <span className="svc__face svc__face--back">
            <span className="svc__name">{svc.name}</span>
            <span className="svc__list">
              {svc.back.map((b) => <span className="svc__item" key={b}>{b}</span>)}
            </span>
          </span>
        </motion.span>
      </button>
    </Panel>
  );
}

export default function ServicesSection({ heading = true }) {
  if (!services.length) return null;
  return (
    <section className="services" data-pg aria-label="Services">
      {heading && <SplitText text="WHAT -WE -SHOOT" className="services__title" />}
      <SpeechBubble tipId="services" tail="br" className="services__tip">Tap a panel to flip it.</SpeechBubble>
      <div className="services__grid">
        {services.map((s, i) => <Flip svc={s} index={i} key={s.id} />)}
      </div>
    </section>
  );
}
