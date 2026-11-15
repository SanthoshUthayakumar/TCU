import { Link } from 'react-router-dom';
import BookButton from '../ui/BookButton';
import Wipe from '../motion/Wipe';
import Reveal3D from '../motion/Reveal3D';
import RiseText from '../motion/RiseText';
import ScrollText from '../motion/ScrollText';
import site from '../../data/site';

export default function AboutSection({ teaser = false }) {
  return (
    <section className="sec about" id="about" aria-label="About Us">
      <div className="wrap about__grid">
        <div className="about__text">
          <p className="eyebrow">About Us</p>
          <RiseText as="h2" text="Hi, I'm TCU." className="h2" />
          {site.ownerRole && <p className="about__role">{site.ownerRole}</p>}
          <ScrollText text="Every frame tells a story. Every reel creates a feeling." className="about__quote" />
          {site.aboutText.map((t, i) => <p key={i} className="about__p">{t}</p>)}
          <ul className="tags" aria-label="What I do">
            {site.disciplines.map((d) => <li key={d}>{d}</li>)}
          </ul>
          {site.facts.length > 0 && (
            <dl className="facts">
              {site.facts.map((f) => <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}
            </dl>
          )}
          {site.location && <p className="about__loc">Based in {site.location}</p>}
          <div className="about__actions">
            <BookButton size="md">Work with me</BookButton>
            {teaser && <Link className="textlink" to="/about">More About Us</Link>}
          </div>
        </div>
        <Reveal3D className="about__photo" tilt={10} side={-24} depth={-200}>
          <Wipe><img src={site.aboutImage} alt={`Portrait of ${site.ownerName}`} loading="lazy" /></Wipe>
        </Reveal3D>
      </div>
    </section>
  );
}
