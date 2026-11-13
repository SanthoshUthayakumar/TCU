import { useMemo, useState } from 'react';
import CategoryFilter from '../components/work/CategoryFilter';
import ProjectGrid from '../components/work/ProjectGrid';
import SplitText from '../components/comic/SplitText';
import SpeechBubble from '../components/comic/SpeechBubble';
import CaptionBox from '../components/comic/CaptionBox';
import HalftoneField from '../components/comic/HalftoneField';
import projects, { CATEGORIES } from '../data/projects';
import usePageMeta from '../hooks/usePageMeta';

export default function Work() {
  usePageMeta('Work', 'Every film, photo set, commercial, event, reel and behind-the-scenes story from Tom Cinematic Universe.');
  const [active, setActive] = useState('All');
  const cats = useMemo(() => CATEGORIES.filter((c) => projects.some((p) => p.category === c)), []);
  const counts = useMemo(() => {
    const o = { All: projects.length };
    cats.forEach((c) => { o[c] = projects.filter((p) => p.category === c).length; });
    return o;
  }, [cats]);
  const items = active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="page page--work">
      <HalftoneField />
      <header className="page__head" data-pg>
        <SplitText as="h1" text="THE FULL ARCHIVE" className="page__title" />
        <CaptionBox tone="paper">{projects.length} stories. Tap a panel to open it. Hold one to peek behind the scenes.</CaptionBox>
        <SpeechBubble tipId="work" tail="bl">Filter by category. The panels re-flow.</SpeechBubble>
      </header>
      {projects.length ? (
        <section data-pg aria-label="Projects">
          <CategoryFilter categories={cats} active={active} onChange={setActive} counts={counts} />
          <ProjectGrid items={items} />
        </section>
      ) : (
        <p className="empty">No projects yet. Add one in src/data/projects.js.</p>
      )}
    </div>
  );
}
