import { useMemo, useState } from 'react';
import CategoryFilter from '../components/work/CategoryFilter';
import ProjectGrid from '../components/work/ProjectGrid';
import RiseText from '../components/motion/RiseText';
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
      <header className="sec sec--dark page__head">
        <div className="wrap">
          <p className="eyebrow">Work</p>
          <RiseText as="h1" text="The full archive" className="page__title" />
          <p className="page__sub">{projects.length} stories. Select a project to open it. Hover one to peek behind the scenes.</p>
        </div>
      </header>
      {projects.length ? (
        <section className="wrap" aria-label="Projects">
          <CategoryFilter categories={cats} active={active} onChange={setActive} counts={counts} />
          <ProjectGrid items={items} />
        </section>
      ) : (
        <p className="empty">No projects yet. Add one in src/data/projects.js.</p>
      )}
    </div>
  );
}
