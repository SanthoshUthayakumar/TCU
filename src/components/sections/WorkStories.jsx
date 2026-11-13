import { ArrowRight } from 'lucide-react';
import Panel from '../comic/Panel';
import HalftoneImage from '../comic/HalftoneImage';
import CaptionBox from '../comic/CaptionBox';
import SplitText from '../comic/SplitText';
import Button from '../ui/Button';
import projects from '../../data/projects';

/* Five slides: photo on the left, the story of that work on the right. Stacks on mobile. */
export default function WorkStories() {
  const items = [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)].slice(0, 5);
  if (!items.length) return null;
  return (
    <section className="stories" data-pg aria-label="Front-row frames">
      <section className="stories" id="stories" data-pg aria-label="Front-row frames"></section>
      <SplitText text="Front-row frames" className="stories__title" />
      <ol className="stories__list">
        {items.map((p, i) => (
          <li className="story" key={p.slug}>
            <Panel tilt={i % 2 ? 0.6 : -0.6} className="story__photo panel--lift" data-cursor="view">
              <HalftoneImage src={p.cover} alt={`${p.title} cover`} ratio="4/3" parallax />
            </Panel>
            <div className="story__body">
              <CaptionBox>Slide {i + 1} of {items.length}</CaptionBox>
              <h3 className="story__name">{p.title}</h3>
              <p className="story__meta">{p.category} / {p.year} / {p.role}</p>
              {p.summary && <p className="story__text">{p.summary}</p>}
              <Button to={`/work/${p.slug}`} icon={ArrowRight} size="sm">Open this story</Button>
            </div>
          </li>
        ))}
      </ol>
    </section>
    
  );
}
