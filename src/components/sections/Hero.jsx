import { useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import SplitText from '../comic/SplitText';
import CaptionBox from '../comic/CaptionBox';
import SfxBurst from '../comic/SfxBurst';
import SpeechBubble from '../comic/SpeechBubble';
import Button from '../ui/Button';
import BookButton from '../ui/BookButton';
import HeroSlides from './HeroSlides';
import { DirectButtons } from './SocialLinks';
import useReducedMotion from '../../hooks/useReducedMotion';
import site from '../../data/site';

/* Copy blocks pop in one after another. */
const group = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
const item = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 22 } },
};

export default function Hero() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  /* Scroll: text and photo drift at different speeds, the photo settles into its frame. */
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const splashY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const splashRotate = useTransform(scrollYProgress, [0, 1], [0, 2]);
  const frameScale = useTransform(scrollYProgress, [0, 0.35], [1.04, 1]);

  /* Desktop mouse: the photo frame tilts toward the pointer. */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 18 });
  const onMove = (e) => {
    if (reduced || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  const v = reduced ? {} : { variants: item };

  return (
    <section className="hero" ref={ref} data-pg>
      <motion.div className="hero__copy" variants={group} initial={reduced ? false : 'hidden'} animate="show" style={reduced ? undefined : { y: copyY }}>
        <motion.div {...v}><CaptionBox className="hero__disciplines">{site.disciplines.join(' - ')}</CaptionBox></motion.div>
        <motion.div className="hero__title" {...v}>
          <SplitText as="h1" text="TOM CINEMATIC UNIVERSE" className="hero__h1" />
        </motion.div>
        <motion.div className="hero__actions" {...v}>
          <Button href="#stories" icon={ArrowDown} size="lg">Start reading</Button>
          <BookButton variant="ink" size="lg" />
        </motion.div>
        <motion.div className="hero__directwrap" {...v}></motion.div>
        <motion.div {...v}><SpeechBubble tipId="home" tail="bl" className="hero__tip">Scroll down for the story behind each work.</SpeechBubble></motion.div>
      </motion.div>

      <motion.div
        className="hero__splash"
        style={reduced ? undefined : { scale: frameScale, y: splashY, rotate: splashRotate }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <span className="hero__lines" aria-hidden="true"><span /><span /><span /></span>
        <motion.div
          className="hero__tilt"
          style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
          initial={reduced ? false : { opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.3 }}
        >
          <div className="hero__float">
            {site.heroVideo && !reduced ? (
              <div className="hero__frame">
                <video className="hero__video" src={site.heroVideo} poster={site.heroPoster} autoPlay muted loop playsInline preload="metadata" />
              </div>
            ) : (
              <HeroSlides />
            )}
          </div>
        </motion.div>
        <SfxBurst word="WHAM" className="hero__sfx" />
      </motion.div>
    </section>
  );
}