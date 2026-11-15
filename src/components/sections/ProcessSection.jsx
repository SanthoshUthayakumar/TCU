import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Reveal3D from '../motion/Reveal3D';
import RiseText from '../motion/RiseText';
import useReducedMotion from '../../hooks/useReducedMotion';

const STEPS = [
  { n: 1, name: 'Brief', text: 'You tell us the story and where it will live.' },
  { n: 2, name: 'Frame', text: 'We pick the look, the locations and the shot list.' },
  { n: 3, name: 'Shoot', text: 'Camera rolls. Light, movement, performance.' },
  { n: 4, name: 'Cut', text: 'Edit, colour and delivery in the formats you need.' },
];

export default function ProcessSection() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 65%'] });
  return (
    <section className="sec sec--dark process" ref={ref} aria-label="How a project runs">
      <div className="wrap">
        <p className="eyebrow">Process</p>
        <RiseText text="Four steps, one film" className="h2" />
        <div className="process__track" aria-hidden="true"><motion.span style={reduced ? undefined : { scaleX: scrollYProgress }} /></div>
        <ol className="process__list">
          {STEPS.map((s, i) => (
            <Reveal3D as="li" key={s.n} className="pstep" tilt={34} side={i % 2 ? 14 : -14} lift={60}>
              <span className="pstep__num" aria-hidden="true">{String(s.n).padStart(2, '0')}</span>
              <h3 className="pstep__name">{s.name}</h3>
              <p className="pstep__text">{s.text}</p>
            </Reveal3D>
          ))}
        </ol>
      </div>
    </section>
  );
}
