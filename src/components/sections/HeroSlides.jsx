import { useCallback, useEffect, useMemo, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import site from '../../data/site';
import projects from '../../data/projects';
import { preload } from '../../utils/media';

const INTERVAL = 5000;

/*
  Slideshow, changes every 5 seconds.
  Each photo slowly zooms in, the next one zooms out (CSS, so pause really pauses it).
  No transition between photos. Reduced motion turns the zoom off (global rule in reset.css).
*/
export default function HeroSlides() {
  const slides = useMemo(() => {
    if (site.heroSlides.length) return site.heroSlides.slice(0, 8);
    const order = [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)];
    return order.slice(0, 5).map((p) => ({ src: p.cover, alt: `${p.title}, ${p.category}`, label: `${p.title} / ${p.category}` }));
  }, []);
  const [i, setI] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const n = slides.length;

  const go = useCallback((next) => {
    setI(((next % n) + n) % n);
    setCycle((c) => c + 1);
  }, [n]);

  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  useEffect(() => {
    if (n < 2 || paused || hidden) return undefined;
    const id = setTimeout(() => go(i + 1), INTERVAL);
    return () => clearTimeout(id);
  }, [n, paused, hidden, i, cycle, go]);

  useEffect(() => { preload(slides[(i + 1) % n]?.src); }, [i, slides, n]);

  if (!n) return null;
  const s = slides[i];

  return (
    <div className={`slides ${paused ? 'is-paused' : ''}`} role="group" aria-roledescription="slideshow" aria-label="Featured photos">
      <div className="slides__frame">
        <div className="slides__slide">
          <img key={cycle} className={`slides__img ${i % 2 === 0 ? 'zoom-in' : 'zoom-out'}`} src={s.src} alt={s.alt} />
        </div>
      </div>

      <div className="slides__bar">
        <ol className="slides__dots" aria-label="Choose photo">
          {slides.map((x, k) => (
            <li key={k}>
              <button type="button" className={`slides__dot ${k === i ? 'is-on' : ''}`} onClick={() => k !== i && go(k)} aria-label={`Photo ${k + 1} of ${n}`} aria-current={k === i}>
                {k === i && <span className="slides__fill" key={cycle} aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ol>
        <button type="button" className="slides__pause" onClick={() => { setPaused(!paused); setCycle((c) => c + 1); }} aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}>
          {paused ? <Play size={18} strokeWidth={3} aria-hidden="true" /> : <Pause size={18} strokeWidth={3} aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}