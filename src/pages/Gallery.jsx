import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CategoryFilter from '../components/work/CategoryFilter';
import Lightbox from '../components/work/Lightbox';
import Wipe from '../components/motion/Wipe';
import RiseText from '../components/motion/RiseText';
import useReducedMotion from '../hooks/useReducedMotion';
import usePageMeta from '../hooks/usePageMeta';
import gallery from '../data/gallery';
import { CATEGORIES } from '../data/projects';

export default function Gallery() {
  usePageMeta('Gallery', 'Every photograph and still frame from Tom Cinematic Universe, in one place.');
  const reduced = useReducedMotion();
  const [active, setActive] = useState('All');
  const [open, setOpen] = useState(null);
  const cats = useMemo(() => CATEGORIES.filter((c) => gallery.some((g) => g.category === c)), []);
  const counts = useMemo(() => {
    const o = { All: gallery.length };
    cats.forEach((c) => { o[c] = gallery.filter((g) => g.category === c).length; });
    return o;
  }, [cats]);
  const items = active === 'All' ? gallery : gallery.filter((g) => g.category === active);

  return (
    <div className="page page--gallery">
      <header className="sec sec--dark page__head">
        <div className="wrap">
          <p className="eyebrow">Gallery</p>
          <RiseText as="h1" text="The gallery" className="page__title" />
          <p className="page__sub">{gallery.length} frames. Select any photo to view it large.</p>
        </div>
      </header>
      {gallery.length ? (
        <section className="wrap" aria-label="Photos">
          <CategoryFilter categories={cats} active={active} onChange={setActive} counts={counts} />
          <ul className="gmasonry">
            <AnimatePresence initial={false}>
              {items.map((g) => (
                <motion.li key={g.id} className="gtile" initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.3 }}>
                  <button type="button" className="gtile__btn" onClick={() => setOpen({ src: g.src, alt: g.alt, caption: `${g.title} / ${g.category}${g.caption ? `. ${g.caption}` : ''}` })} aria-label={`View large: ${g.alt}`}>
                    <Wipe><img src={g.src} alt={g.alt} loading="lazy" decoding="async" style={{ aspectRatio: g.ratio }} /></Wipe>
                    <span className="gtile__cap">{g.title}</span>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </section>
      ) : (
        <p className="empty">No photos yet. Add panels to a project in src/data/projects.js.</p>
      )}
      <Lightbox item={open} onClose={() => setOpen(null)} />
    </div>
  );
}
