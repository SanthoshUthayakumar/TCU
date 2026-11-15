import { useState } from 'react';
import { Link } from 'react-router-dom';
import TiltCard from '../motion/TiltCard';
import useLongPress from '../../hooks/useLongPress';
import useMediaQuery from '../../hooks/useMediaQuery';
import useReducedMotion from '../../hooks/useReducedMotion';

export const RATIOS = { splash: '16/9', wide: '21/9', pair: '4/3', tall: '3/4' };

/* Hold (touch) or hover (desktop) to peek at the behind-the-scenes frame or muted preview. */
export default function ProjectCard({ project, index = 0, ratio, parallax = false }) {
  const [peek, setPeek] = useState(false);
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reduced = useReducedMotion();
  const bts = project.panels.find((p) => p.bts);
  const hasPeek = Boolean((project.previewVideo && !reduced) || bts);
  const { bind, consumeClick } = useLongPress(() => hasPeek && setPeek(true), () => setPeek(false));
  const hover = hasPeek && canHover ? { onMouseEnter: () => setPeek(true), onMouseLeave: () => setPeek(false) } : {};

  return (
    <TiltCard className="pcard">
      <Link
        to={`/work/${project.slug}`}
        className="pcard__link"
        onClick={(e) => { if (consumeClick()) e.preventDefault(); }}
        {...(hasPeek ? bind : {})}
        {...hover}
      >
        <div className="pcard__media">
          <img className="pcard__img" src={project.cover} alt={`${project.title} cover`} loading="lazy" style={{ aspectRatio: ratio || (project.layout === 'tall' ? '4/5' : '4/3') }} />
          {peek && (
            <div className="pcard__peek" aria-hidden="true">
              {project.previewVideo && !reduced ? (
                <video src={project.previewVideo} muted loop autoPlay playsInline />
              ) : (
                <img src={bts.src} alt="" />
              )}
              <span className="pcard__peeklabel">Behind the scenes</span>
            </div>
          )}
        </div>
        <div className="pcard__caption">
          <span className="pcard__title">{project.title}</span>
          <span className="pcard__meta">{project.category} / {project.year}</span>
          <span className="pcard__meta">{project.role}</span>
          {project.placeholder && <span className="pcard__tag">Placeholder</span>}
        </div>
      </Link>
    </TiltCard>
  );
}
