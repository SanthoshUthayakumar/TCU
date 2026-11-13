import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { pg } from '../../utils/format';
import { useLocation } from 'react-router-dom';

/* Thin comic page-progress bar plus a "PG 03 / 12" indicator that follows the sections. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const { pathname } = useLocation();
  const [label, setLabel] = useState('');

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const sections = Array.from(document.querySelectorAll('main [data-pg]'));
      let current = 1;
      let total = sections.length;
      if (total) {
        const line = window.innerHeight * 0.4;
        sections.forEach((s, i) => { if (s.getBoundingClientRect().top <= line) current = i + 1; });
      } else {
        total = Math.max(1, Math.ceil(document.documentElement.scrollHeight / window.innerHeight));
        current = Math.min(total, Math.floor(window.scrollY / window.innerHeight) + 1);
      }
      setLabel(pg(current, total));
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    const first = setTimeout(update, 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      clearTimeout(first);
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  return (
    <>
      <div className="progress" aria-hidden="true">
        <motion.div className="progress__bar" style={{ scaleX: scrollYProgress }} />
      </div>
      <div className="progress__pg" aria-hidden="true">{label}</div>
    </>
  );
}
