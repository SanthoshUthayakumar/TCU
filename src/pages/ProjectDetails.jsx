import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PanelReader from '../components/work/PanelReader';
import SplitText from '../components/comic/SplitText';
import CaptionBox from '../components/comic/CaptionBox';
import SpeechBubble from '../components/comic/SpeechBubble';
import BookButton from '../components/ui/BookButton';
import Button from '../components/ui/Button';
import NotFound from './NotFound';
import usePageMeta from '../hooks/usePageMeta';
import projects from '../data/projects';

export default function ProjectDetails() {
  const { slug } = useParams();
  const idx = projects.findIndex((p) => p.slug === slug);
  const project = projects[idx];
  usePageMeta(project ? project.title : 'Not found', project ? `${project.title}: ${project.category}, ${project.year}. ${project.role}. Tom Cinematic Universe.` : undefined);
  if (!project) return <NotFound />;
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <div className="page page--project">
      <header className="page__head" data-pg>
        <Link to="/work" className="backlink"><ArrowLeft size={18} aria-hidden="true" /> All work</Link>
        <SplitText as="h1" text={project.title.toUpperCase()} className="page__title" />
        <CaptionBox>{project.category} / {project.year} / {project.role}{project.client ? ` / ${project.client}` : ''}</CaptionBox>
        {project.placeholder && <CaptionBox tone="paper">Placeholder project. Replace it in src/data/projects.js.</CaptionBox>}
        <SpeechBubble tipId="reader" tail="bl">Swipe, tap the edges, or use the arrow keys.</SpeechBubble>
      </header>

      <PanelReader project={project} />

      <section className="pnext" data-pg aria-label="More work">
        <div className="pnext__cta">
          <p className="pnext__line">Want something like this?</p>
          <BookButton size="lg" message={`Hi TCU, I'd like to book something like "${project.title}".`}>Book something like this</BookButton>
        </div>
        <div className="pnext__links">
          <Link to={`/work/${prev.slug}`} className="pnext__link" aria-label={`Previous project: ${prev.title}`}>
            <ArrowLeft size={20} aria-hidden="true" /><span><small>Previous</small>{prev.title}</span>
          </Link>
          <Link to={`/work/${next.slug}`} className="pnext__link pnext__link--next" aria-label={`Next project: ${next.title}`}>
            <span><small>Next</small>{next.title}</span><ArrowRight size={20} aria-hidden="true" />
          </Link>
        </div>
        <Button to="/contact" variant="ink">Start a project</Button>
      </section>
    </div>
  );
}
