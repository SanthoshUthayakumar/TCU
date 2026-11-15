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

/* Pinned hero. Scrolling grows the portrait photo in the centre while the title splits to the left and right sides. */
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

  const lRef = useRef(null);
  const rRef = useRef(null);
  const [tw, setTw] = useState({ l: 0, r: 0 });
  /* Title size is driven by the screen; the measured widths let the side words shrink to fit their gutter. */
  const F = wide ? Math.min(vp.w * 0.15, vp.h * 0.2) : vp.w * 0.145;
  useEffect(() => {
    const m = () => lRef.current && rRef.current && setTw({ l: lRef.current.offsetWidth, r: rRef.current.offsetWidth });
    m();
    document.fonts?.ready.then(m);
  }, [F, wide]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 });
  const END = 0.62;

  /* Portrait frame: starts as a framed card, ends centred and large with both sides free. */
  const w0 = wide ? Math.min(vp.h * 0.6 * 0.8, vp.w * 0.78) : Math.min(vp.h * 0.4 * 0.8, vp.w * 0.62);
  const h0 = w0 / 0.8;
  const w1 = wide ? Math.min(vp.h * 0.8, vp.w * 0.56) : vp.w * 0.62;
  const h1 = wide ? vp.h : Math.min(vp.h * 0.8, w1 / 0.62);
  const width = useTransform(p, [0, END], [w0, w1]);
  const height = useTransform(p, [0, END], [h0, h1]);
  const radius = useTransform(p, [0, END], [12, wide ? 0 : 12]);
  const bOp = useTransform(p, [0, 0.45, END], [1, 1, wide ? 1 : 1]);

  /* Title: three stacked lines in the middle at first, then "TOM CINEMATIC" goes left and "UNIVERSE" goes right.
     On phones the gutters are narrow, so the words turn and run vertically along the photo. */
  const lineH = F * 0.84;
  const nL = wide ? 2 : 1;
  const total = (nL + 1) * lineH;
  const yL0 = -(total / 2 - (nL * lineH) / 2);
  const yR0 = total / 2 - lineH / 2;
  const sideW = (vp.w - w1) / 2;
  const dx = w1 / 2 + sideW / 2;
  const longest = Math.max(tw.l, tw.r, 1);
  const s = wide ? Math.min(1, (sideW * 0.86) / longest) : Math.min(1, (sideW * 0.86) / lineH, (vp.h * 0.78) / longest);
  const lx = useTransform(p, [0, END], [0, -dx]);
  const rx = useTransform(p, [0, END], [0, dx]);
  const ly = useTransform(p, [0, END], [yL0, 0]);
  const ry = useTransform(p, [0, END], [yR0, 0]);
  const lrot = useTransform(p, [0, END], [0, wide ? 0 : -90]);
  const rrot = useTransform(p, [0, END], [0, wide ? 0 : 90]);
  const sc = useTransform(p, [0, END], [1, s]);
  const uiOp = useTransform(p, [0, 0.3], [1, 0]);
  const live = (v) => (reduced ? undefined : v);
  const still = (x, rot) => ({ x, y: 0, rotate: rot, scale: s });

  return (
    <section className="hero" ref={ref}>
      <div className="hero__pin">
        {scene && <Suspense fallback={null}><Scene3D /></Suspense>}

        <motion.div className="hero__window" style={reduced ? { width: w1, height: h1 } : { width, height }}>
          <motion.div className="hero__clip" style={reduced ? undefined : { borderRadius: radius }}>
            {site.heroVideo && !reduced ? <video className="hero__video" src={site.heroVideo} poster={site.heroPoster} autoPlay muted loop playsInline preload="metadata" /> : <HeroSlides />}
          </motion.div>
          {!reduced && <motion.div className="hero__brackets" style={{ opacity: bOp }} aria-hidden="true"><i /><i /><i /><i /></motion.div>}
        </motion.div>

        <div className="hero__title" style={{ '--F': `${F}px` }}>
          <h1 className="hero__h1" aria-label="Tom Cinematic Universe">
            <motion.span ref={lRef} className="hero__side" style={reduced ? { y: 0, ...still(-dx, wide ? 0 : -90) } : { x: lx, y: ly, rotate: lrot, scale: sc }}>
              {(wide ? ['TOM', 'CINEMATIC'] : ['TOM CINEMATIC']).map((t, i) => <span className="hero__line" key={t}><Letters text={t} delay={0.2 + i * 0.25} reduced={reduced} /></span>)}
            </motion.span>
            <motion.span ref={rRef} className="hero__side hero__side--r" style={reduced ? still(dx, wide ? 0 : 90) : { x: rx, y: ry, rotate: rrot, scale: sc }}>
              <span className="hero__line"><Letters text="UNIVERSE" delay={0.8} reduced={reduced} /></span>
            </motion.span>
          </h1>
        </div>

        <motion.div className="hero__top" style={live({ opacity: uiOp })}>
          <p className="eyebrow">{site.disciplines.join('  - ')}</p>
          <Timecode reduced={reduced} />
        </motion.div>

        <motion.div className="hero__bottom" style={live({ opacity: uiOp })} initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.8 }}>
          <div className="hero__actions">
            <Magnetic><Button href="#stories" icon={ArrowDown} size={wide ? 'lg' : 'sm'}>Start reading</Button></Magnetic>
            <Magnetic><BookButton variant="ghost" size={wide ? 'lg' : 'sm'} /></Magnetic>
          </div>
          
          <p className="hero__cue" aria-hidden="true"><span>Scroll</span><i /></p>
        </motion.div>
      </div>
    </section>
  );
}
