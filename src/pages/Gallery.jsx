import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CategoryFilter from '../components/work/CategoryFilter';
import Lightbox from '../components/work/Lightbox';
import SplitText from '../components/comic/SplitText';
import SpeechBubble from '../components/comic/SpeechBubble';
import CaptionBox from '../components/comic/CaptionBox';
import HalftoneField from '../components/comic/HalftoneField';
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
      <HalftoneField />
      <header className="page__head" data-pg>
        <SplitText as="h1" text="THE GALLERY" className="page__title" />
        <CaptionBox tone="paper">{gallery.length} frames. Tap any photo to view it large.</CaptionBox>
        <SpeechBubble tipId="gallery" tail="bl">Pinch to zoom. Swipe down to close.</SpeechBubble>
      </header>
      {gallery.length ? (
        <section data-pg aria-label="Photos">
          <CategoryFilter categories={cats} active={active} onChange={setActive} counts={counts} />
          <ul className="gmasonry">
            <AnimatePresence initial={false}>
              {items.map((g) => (
                <motion.li key={g.id} className="gtile" initial={reduced ? false : { opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.3 }}>
                  <button type="button" className="gtile__btn" data-cursor="view" onClick={() => setOpen({ src: g.src, alt: g.alt, caption: `${g.title} / ${g.category}${g.caption ? `. ${g.caption}` : ''}` })} aria-label={`View large: ${g.alt}`}>
                    <img src={g.src} alt={g.alt} loading="lazy" decoding="async" style={{ aspectRatio: g.ratio }} />
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
