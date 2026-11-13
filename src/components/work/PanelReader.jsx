import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Maximize2 } from 'lucide-react';
import Button from '../ui/Button';
import VideoPlayer from '../ui/VideoPlayer';
import CaptionBox from '../comic/CaptionBox';
import CreditsSection from '../sections/CreditsSection';
import Lightbox from './Lightbox';
import useReducedMotion from '../../hooks/useReducedMotion';
import { tokens } from '../../utils/motion';
import { preload } from '../../utils/media';
import { pad } from '../../utils/format';

function ReaderPage({ page, project, onZoom, lazy }) {
  if (page.type === 'film') {
    return (
      <div className="reader__film">
        <VideoPlayer src={project.mainVideo} embed={project.embed} poster={project.cover} title={`${project.title} film`} />
      </div>
    );
  }
  if (page.type === 'credits') {
    return (
      <div className="reader__credits">
        <h2 className="reader__credits-title">The credits</h2>
        <dl className="facts">
          {project.client && (<div><dt>Client</dt><dd>{project.client}</dd></div>)}
          <div><dt>Year</dt><dd>{project.year}</dd></div>
          <div><dt>Role</dt><dd>{project.role}</dd></div>
          <div><dt>Category</dt><dd>{project.category}</dd></div>
        </dl>
        <CreditsSection credits={project.credits} title="Crew" bare />
      </div>
    );
  }
  return (
    <figure className="reader__fig">
      <div className="reader__imgwrap">
        <img className="reader__img" src={page.src} alt={page.alt} loading={lazy ? 'lazy' : 'eager'} decoding="async" draggable="false" />
        <button type="button" className="reader__zoom" onClick={() => onZoom(page)} aria-label="View photo large"><Maximize2 size={18} aria-hidden="true" /></button>
      </div>
      {(page.caption || page.bts) && (
        <CaptionBox as="figcaption" className="reader__caption">
          {page.bts && <strong>Behind the scenes. </strong>}{page.caption}
        </CaptionBox>
      )}
    </figure>
  );
}

export default function PanelReader({ project }) {
  const reduced = useReducedMotion();
  const t = tokens();
  const pages = useMemo(() => {
    const list = [];
    if (project.mainVideo || project.embed) list.push({ type: 'film' });
    project.panels.forEach((p) => list.push({ type: 'panel', ...p }));
    list.push({ type: 'credits' });
    return list;
  }, [project]);
  const last = pages.length - 1;
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [view, setView] = useState('pages');
  const [zoom, setZoom] = useState(null);

  useEffect(() => { setI(0); setDir(1); setView('pages'); }, [project.slug]);

  const go = (n) => {
    const next = Math.min(Math.max(n, 0), last);
    if (next === i) return;
    setDir(next > i ? 1 : -1);
    setI(next);
  };

  useEffect(() => {
    [i + 1, i + 2, i - 1].forEach((k) => pages[k]?.src && preload(pages[k].src));
  }, [i, pages]);

  useEffect(() => {
    if (view !== 'pages' || zoom) return undefined;
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
      if (e.key === 'ArrowRight') go(i + 1);
      else if (e.key === 'ArrowLeft') go(i - 1);
      else if (e.key === 'Home') go(0);
      else if (e.key === 'End') go(last);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const move = reduced ? 0 : 60;
  const variants = {
    enter: (d) => ({ x: d * move, rotate: reduced ? 0 : d * 2, opacity: 0 }),
    center: { x: 0, rotate: 0, opacity: 1 },
    exit: (d) => ({ x: -d * move, rotate: reduced ? 0 : -d * 2, opacity: 0 }),
  };
  const page = pages[i];

  return (
    <section className="reader" aria-roledescription="carousel" aria-label={`${project.title}, page reader`} data-pg>
      <div className="reader__bar">
        <p className="reader__count" aria-live="polite">PAGE {pad(i + 1)} / {pad(pages.length)}</p>
        <div className="reader__tools">
          <button type="button" className="reader__tool" onClick={() => setView(view === 'pages' ? 'scroll' : 'pages')}>{view === 'pages' ? 'Scroll view' : 'Page view'}</button>
          {view === 'pages' && i !== last && <button type="button" className="reader__tool" onClick={() => go(last)}>Skip to credits</button>}
        </div>
      </div>

      {view === 'pages' ? (
        <>
          <div className="reader__stage" tabIndex={0} aria-label="Use the left and right arrow keys to turn pages">
            <AnimatePresence mode="popLayout" custom={dir} initial={false}>
              <motion.div
                key={i}
                className="reader__page"
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: reduced ? 0 : t.base, ease: t.ease }}
                drag={page.type === 'panel' ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70 || info.velocity.x < -450) go(i + 1);
                  else if (info.offset.x > 70 || info.velocity.x > 450) go(i - 1);
                }}
              >
                <ReaderPage page={page} project={project} onZoom={setZoom} />
              </motion.div>
            </AnimatePresence>
            {page.type !== 'film' && (
              <>
                <button type="button" className="reader__edge reader__edge--prev" tabIndex={-1} aria-hidden="true" onClick={() => go(i - 1)} />
                <button type="button" className="reader__edge reader__edge--next" tabIndex={-1} aria-hidden="true" onClick={() => go(i + 1)} />
              </>
            )}
          </div>
          <div className="reader__nav">
            <Button variant="ink" icon={ArrowLeft} onClick={() => go(i - 1)} disabled={i === 0} aria-label="Previous page">Prev</Button>
            <Button icon={ArrowRight} onClick={() => go(i + 1)} disabled={i === last} aria-label="Next page">Next</Button>
          </div>
        </>
      ) : (
        <div className="reader__scroll">
          {pages.map((p, k) => (
            <div className="reader__scrollitem" key={k}>
              <p className="reader__scrollnum">PAGE {pad(k + 1)}</p>
              <ReaderPage page={p} project={project} onZoom={setZoom} lazy={k > 1} />
            </div>
          ))}
        </div>
      )}
      <Lightbox item={zoom} onClose={() => setZoom(null)} />
    </section>
  );
}
