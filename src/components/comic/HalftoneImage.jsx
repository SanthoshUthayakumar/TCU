import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import useMediaQuery from '../../hooks/useMediaQuery';
import useReducedMotion from '../../hooks/useReducedMotion';

function ParallaxImg({ wrapRef, ...props }) {
  /* Photo travels slower than the page (about 0.9x) inside its clipped panel. */
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
  return <motion.img {...props} style={{ y, scale: 1.12 }} />;
}

export default function HalftoneImage({ src, alt, ratio = '3/2', position = '50% 50%', parallax = false, priority = false, className = '' }) {
  const wrap = useRef(null);
  const img = useRef(null);
  const [done, setDone] = useState(false);
  const desktop = useMediaQuery('(min-width: 768px)');
  const reduced = useReducedMotion();
  const useParallax = parallax && desktop && !reduced;

  useEffect(() => {
    setDone(false);
    const el = wrap.current?.querySelector('img');
    if (el && el.complete && el.naturalWidth > 0) setDone(true);
  }, [src]);

  const common = {
    className: 'himg__img',
    src,
    alt,
    loading: priority ? 'eager' : 'lazy',
    decoding: 'async',
    onLoad: () => setDone(true),
    onError: () => setDone(true),
  };

  return (
    <div ref={wrap} className={`himg ${className}`.trim()} style={{ aspectRatio: ratio }}>
      {useParallax ? (
        <ParallaxImg wrapRef={wrap} {...common} style={undefined} />
      ) : (
        <img ref={img} {...common} style={{ objectPosition: position }} />
      )}
      <span className={`himg__dots ${done ? 'is-done' : ''}`} aria-hidden="true" />
    </div>
  );
}
