import { useState } from 'react';
import { Link } from 'react-router-dom';
import Panel from '../comic/Panel';
import HalftoneImage from '../comic/HalftoneImage';
import CaptionBox from '../comic/CaptionBox';
import useLongPress from '../../hooks/useLongPress';
import useMediaQuery from '../../hooks/useMediaQuery';
import useReducedMotion from '../../hooks/useReducedMotion';

export const RATIOS = { splash: '16/9', wide: '21/9', pair: '4/3', tall: '3/4' };
const TILTS = [-0.8, 0.6, 0, 1.1, -1.2, 0.4];

/* Hold (touch) or hover (desktop) to peek at the behind-the-scenes frame or muted preview. */
export default function ProjectCard({ project, index = 0, ratio, parallax = false }) {
  const [peek, setPeek] = useState(false);
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reduced = useReducedMotion();
  const bts = project.panels.find((p) => p.bts);
  const hasPeek = Boolean((project.previewVideo && !reduced) || bts);
  const { bind, consumeClick } = useLongPress(() => hasPeek && setPeek(true), () => setPeek(false));
  const tilt = TILTS[index % TILTS.length];
  const hover = hasPeek && canHover ? { onMouseEnter: () => setPeek(true), onMouseLeave: () => setPeek(false) } : {};

  return (
    <Panel index={index} tilt={tilt} className="pcard panel--lift" frameClass="pcard__frame">
      <Link
        to={`/work/${project.slug}`}
        className="pcard__link"
        data-cursor="view"
        onClick={(e) => { if (consumeClick()) e.preventDefault(); }}
        {...(hasPeek ? bind : {})}
        {...hover}
      >
        <div className="pcard__media">
          <HalftoneImage src={project.cover} alt={`${project.title} cover`} ratio={ratio || RATIOS[project.layout] || '4/3'} parallax={parallax} />
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
        <CaptionBox className="pcard__caption">
          <span className="pcard__title">{project.title}</span>
          <span className="pcard__meta">{project.category} / {project.year}</span>
          <span className="pcard__meta">{project.role}</span>
          {project.placeholder && <span className="pcard__tag">Placeholder</span>}
        </CaptionBox>
      </Link>
    </Panel>
  );
}
