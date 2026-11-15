import { ArrowRight } from 'lucide-react';
import Marquee from '../ui/Marquee';
import CountUp from '../ui/CountUp';
import Button from '../ui/Button';
import Reveal3D from '../motion/Reveal3D';
import RiseText from '../motion/RiseText';
import projects from '../../data/projects';
import site from '../../data/site';

/* Client names scroll sideways, the numbers count up, and one button opens the gallery. */
export default function ClientsSection() {
  const clients = site.clients.filter(Boolean);
  const s = site.stats;
  const stats = [
    { label: 'Clients', value: Number(s.clients) || clients.length },
    { label: 'Events covered', value: Number(s.events) || 0 },
    { label: 'Views across platforms', value: Number(s.views) || 0, suffix: 'M+' },
    { label: 'Projects shot', value: Number(s.projects) || projects.length },
    { label: 'Years behind the camera', value: Number(s.years) || 0 },
  ].filter((x) => x.value > 0);

  return (
    <section className="sec sec--surface clients" id="clients" aria-label="Clients and numbers">
      <div className="wrap">
        {clients.length > 0 && (
          <>
            <p className="eyebrow">Trusted by</p>
            <RiseText text="Clients onboard" className="h2" />
          </>
        )}
      </div>
      {clients.length > 0 && <Marquee items={clients} base={-2.5} />}
      <div className="wrap">
        {stats.length > 0 && (
          <ul className="stats">
            {stats.map((x) => (
              <Reveal3D as="li" key={x.label} tilt={30} lift={50} className="stat">
                <p className="stat__num"><CountUp value={x.value} suffix={x.suffix || '+'} /></p>
                <p className="stat__label">{x.label}</p>
              </Reveal3D>
            ))}
          </ul>
        )}
        <Button to="/gallery" icon={ArrowRight} size="lg" className="clients__btn">View gallery</Button>
      </div>
    </section>
  );
}
