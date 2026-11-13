import { useEffect } from 'react';
import Lenis from 'lenis';
import { setLenis } from '../utils/scroll';

/* Smooth wheel scrolling on desktop; touch devices keep native momentum scrolling (Lenis leaves them alone). */
export default function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1, anchors: true });
    setLenis(lenis);
    /* Pause smooth scrolling while a modal or menu locks the page (body.is-locked). */
    const sync = () => (document.body.classList.contains('is-locked') ? lenis.stop() : lenis.start());
    const mo = new MutationObserver(sync);
    mo.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => { mo.disconnect(); setLenis(null); lenis.destroy(); };
  }, []);
}
