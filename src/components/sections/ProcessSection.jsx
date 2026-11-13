import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SplitText from '../comic/SplitText';
import SfxBurst from '../comic/SfxBurst';
import useReducedMotion from '../../hooks/useReducedMotion';

const STEPS = [
  { n: 1, name: 'Brief', text: 'You tell us the story and where it will live.' },
  { n: 2, name: 'Frame', text: 'We pick the look, the locations and the shot list.' },
  { n: 3, name: 'Shoot', text: 'Camera rolls. Light, movement, performance.' },
  { n: 4, name: 'Cut', text: 'Edit, colour and delivery in the formats you need.' },
];

function Step({ step, i }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  /* Each panel locks into place as it travels up the screen. */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 95%', 'start 55%'] });
  const y = useTransform(scrollYProgress, [0, 1], [70, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [i % 2 ? -4 : 4, i % 2 ? -0.8 : 0.8]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  return (
    <li className={`process__step process__step--${i % 2 ? 'r' : 'l'}`} ref={ref}>
      <motion.div className="process__panel" style={reduced ? undefined : { y, rotate, scale }}>
        <span className="process__num" aria-hidden="true">{step.n}</span>
        <h3 className="process__name">{step.name}</h3>
        <p className="process__text">{step.text}</p>
        {step.n === 4 && <SfxBurst word="ZOOM" className="process__sfx" />}
      </motion.div>
    </li>
  );
}

export default function ProcessSection() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const clip = useTransform(scrollYProgress, [0, 1], ['inset(0 0 100% 0)', 'inset(0 0 0% 0)']);
  return (
    <section className="process" ref={ref} data-pg aria-label="How a project runs">
      <SplitText text="FOUR PANELS, ONE FILM" className="process__title" />
      <div className="process__body">
        <motion.svg className="process__line" viewBox="0 0 100 400" preserveAspectRatio="none" aria-hidden="true" style={reduced ? undefined : { clipPath: clip }}>
          <path d="M20 0 C 90 60, 10 120, 80 180 S 10 300, 50 400" />
        </motion.svg>
        <ol className="process__list">
          {STEPS.map((s, i) => <Step step={s} i={i} key={s.n} />)}
        </ol>
      </div>
    </section>
  );
}
