import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PanelReader from '../components/work/PanelReader';
import RiseText from '../components/motion/RiseText';
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
      <header className="sec sec--dark page__head">
        <div className="wrap">
          <Link to="/work" className="backlink"><ArrowLeft size={16} aria-hidden="true" /> All work</Link>
          <RiseText as="h1" text={project.title.trim()} className="page__title" />
          <p className="page__sub">{project.category} / {project.year} / {project.role}{project.client ? ` / ${project.client}` : ''}</p>
          {project.placeholder && <p className="page__note">Placeholder project. Replace it in src/data/projects.js.</p>}
        </div>
      </header>

      <PanelReader project={project} />

      <section className="sec sec--dark pnext" aria-label="More work"><div className="wrap">
        <div className="pnext__cta">
          <p className="pnext__line">Want something like this?</p>
          <BookButton size="lg" message={`Hi TCU, I'd like to book something like "${project.title}".`}>Book something like this</BookButton>
        </div>
        <div className="pnext__links">
          <Link to={`/work/${prev.slug}`} className="pnext__link" aria-label={`Previous project: ${prev.title}`}>
            <ArrowLeft size={18} aria-hidden="true" /><span><small>Previous</small>{prev.title}</span>
          </Link>
          <Link to={`/work/${next.slug}`} className="pnext__link pnext__link--next" aria-label={`Next project: ${next.title}`}>
            <span><small>Next</small>{next.title}</span><ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <Button to="/contact" variant="light">Start a project</Button>
      </div></section>
    </div>
  );
}
