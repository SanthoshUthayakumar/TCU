import { Link } from 'react-router-dom';
import SplitText from '../comic/SplitText';
import Panel from '../comic/Panel';
import PanelRow from '../comic/PanelRow';
import HalftoneImage from '../comic/HalftoneImage';
import CaptionBox from '../comic/CaptionBox';
import BookButton from '../ui/BookButton';
import site from '../../data/site';

export default function AboutSection({ teaser = false }) {
  return (
    <section className="about" id="about" data-pg aria-label="About Us">
      <PanelRow pattern="a">
        <div className="about__text">
          <CaptionBox>About Us</CaptionBox>
          <SplitText as="h2" text={`HI, I'M TCU.`} className="about__title" />
          {site.ownerRole && <p className="about__role">{site.ownerRole}</p>}
          <p className="about__quote">Every frame tells a story. Every reel creates a feeling.</p>
          {site.aboutText.map((t, i) => <p key={i} className="about__p">{t}</p>)}
          <ul className="about__skills" aria-label="What I do">
            {site.disciplines.map((d) => <li key={d}><CaptionBox tone="paper">{d}</CaptionBox></li>)}
          </ul>
          {site.facts.length > 0 && (
            <dl className="about__facts">
              {site.facts.map((f) => <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}
            </dl>
          )}
          {site.location && <CaptionBox tone="paper">Based in {site.location}</CaptionBox>}
          <div className="about__actions">
            <BookButton size="sm">Work with me</BookButton>
            {teaser && <Link className="about__more" to="/about">More About Us</Link>}
          </div>
        </div>
        <Panel tilt={1} className="about__panel">
          <HalftoneImage src={site.aboutImage} alt={`Portrait of ${site.ownerName}, placeholder`} ratio="4/5" parallax />
          {site.aboutImageIsPlaceholder && <CaptionBox className="about__ph">..</CaptionBox>}
        </Panel>
      </PanelRow>
    </section>
  );
}
