import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Button from '../ui/Button';
import BookButton from '../ui/BookButton';
import Magnetic from '../motion/Magnetic';
import HeroSlides from './HeroSlides';
import { DirectButtons } from './SocialLinks';
import useMediaQuery from '../../hooks/useMediaQuery';
import useReducedMotion from '../../hooks/useReducedMotion';
import site from '../../data/site';

const Scene3D = lazy(() => import('../Scene3D'));

/* Each letter flips up out of the floor, one after another. */
function Letters({ text, delay = 0, reduced }) {
  if (reduced) return text;
  return [...text].map((c, i) => (c === ' ' ? <span className="hero__sp" key={i} /> : (
    <motion.span key={i} className="hero__ch" aria-hidden="true" style={{ transformPerspective: 700 }}
      initial={{ rotateX: -100, y: '45%', opacity: 0 }} animate={{ rotateX: 0, y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: delay + i * 0.045, ease: [0.2, 0.8, 0.2, 1] }}>{c}</motion.span>
  )));
}

/* Running timecode, like a camera display. Updated straight on the node: no React re-render. */
function Timecode({ reduced }) {
  const ref = useRef(null);
  useEffect(() => {
    if (reduced) return undefined;
    let raf; const t0 = performance.now();
    const p = (n) => String(n).padStart(2, '0');
    const tick = (t) => {
      const f = Math.floor(((t - t0) / 1000) * 24);
      if (ref.current) ref.current.textContent = `${p(Math.floor(f / 86400))}:${p(Math.floor(f / 1440) % 60)}:${p(Math.floor(f / 24) % 60)}:${p(f % 24)}`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);
  return <p className="hero__tc"><i aria-hidden="true" />REC <span ref={ref}>00:00:00:00</span></p>;
}

/* Pinned hero. Scrolling opens the viewfinder: the photo grows to full screen while the title splits apart. */
export default function Hero() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const wide = useMediaQuery('(min-width: 768px)');
  const [vp, setVp] = useState({ w: 1280, h: 800 });
  useEffect(() => {
    const m = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    m();
    window.addEventListener('resize', m);
    return () => window.removeEventListener('resize', m);
  }, []);
  const [scene, setScene] = useState(false);
  useEffect(() => {
    const weak = (navigator.deviceMemory && navigator.deviceMemory <= 2) || navigator.hardwareConcurrency <= 2;
    if (!weak && !reduced) { const id = setTimeout(() => setScene(true), 400); return () => clearTimeout(id); }
    return undefined;
  }, [reduced]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 });
  /* Portrait 4:5 frame. It starts as a framed card and grows to the full height of the screen without ever cropping the photo. */
  /* Phones start with a smaller card so the title, buttons and dock all have room. */
  const w0 = wide ? Math.min(vp.h * 0.6 * 0.8, vp.w * 0.78) : Math.min(vp.h * 0.4 * 0.8, vp.w * 0.62);
  const h0 = w0 / 0.8;
  const w1 = Math.min(vp.w, vp.h * 0.8);
  const width = useTransform(p, [0, 0.62], [w0, w1]);
  const height = useTransform(p, [0, 0.62], [h0, vp.h]);
  const radius = useTransform(p, [0, 0.62], [12, 0]);
  const bOp = useTransform(p, [0, 0.45, 0.62], [1, 1, 0]);
  const row1 = useTransform(p, [0, 0.5], ['0%', '-70%']);
  const row2 = useTransform(p, [0, 0.5], ['0%', '70%']);
  const titleOp = useTransform(p, [0.18, 0.5], [1, 0]);
  const titleZ = useTransform(p, [0, 0.5], [0, 220]);
  const uiOp = useTransform(p, [0, 0.3], [1, 0]);
  const live = (v) => (reduced ? undefined : v);

  return (
    <section className="hero" ref={ref}>
      <div className="hero__pin">
        {scene && <Suspense fallback={null}><Scene3D /></Suspense>}

        <motion.div className="hero__window" style={reduced ? { width: w1, height: vp.h } : { width, height }}>
          <motion.div className="hero__clip" style={reduced ? undefined : { borderRadius: radius }}>
            {site.heroVideo && !reduced ? <video className="hero__video" src={site.heroVideo} poster={site.heroPoster} autoPlay muted loop playsInline preload="metadata" /> : <HeroSlides />}
          </motion.div>
          {!reduced && <motion.div className="hero__brackets" style={{ opacity: bOp }} aria-hidden="true"><i /><i /><i /><i /></motion.div>}
        </motion.div>

        <motion.div className="hero__title" style={live({ opacity: titleOp, z: titleZ, transformPerspective: 900 })}>
          <h1 className="hero__h1" aria-label="Tom Cinematic Universe">
            <motion.span className="hero__line" style={live({ x: row1 })}><Letters text="TOM CINEMATIC" delay={0.2} reduced={reduced} /></motion.span>
            <motion.span className="hero__line hero__line--2" style={live({ x: row2 })}><Letters text="UNIVERSE" delay={0.75} reduced={reduced} /></motion.span>
          </h1>
        </motion.div>

        <motion.div className="hero__top" style={live({ opacity: uiOp })}>
          <p className="eyebrow">{site.disciplines.join('  /  ')}</p>
          <Timecode reduced={reduced} />
        </motion.div>

        <motion.div className="hero__bottom" style={live({ opacity: uiOp })} initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.8 }}>
          <div className="hero__actions">
            <Magnetic><Button href="#stories" icon={ArrowDown} size={wide ? 'lg' : 'sm'}>Start reading</Button></Magnetic>
            <Magnetic><BookButton variant="ghost" size={wide ? 'lg' : 'sm'} /></Magnetic>
          </div>
          
         
        </motion.div>
      </div>
    </section>
  );
}
