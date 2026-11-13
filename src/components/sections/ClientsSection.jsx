import { ArrowRight } from 'lucide-react';
import SplitText from '../comic/SplitText';
import Panel from '../comic/Panel';
import CaptionBox from '../comic/CaptionBox';
import Button from '../ui/Button';
import Marquee from '../ui/Marquee';
import CountUp from '../ui/CountUp';
import site from '../../data/site';
import projects from '../../data/projects';

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
    <section className="clients" id="clients" data-pg aria-label="Clients and numbers">
      {clients.length > 0 && (
        <>
          <SplitText text="Clients-Onboard" className="clients__title" />
          <Marquee items={clients} base={-2.5} />
          
        </>
      )}
      {stats.length > 0 && (
        <ul className="clients__stats">
          {stats.map((x, i) => (
            <li key={x.label}>
              <Panel index={i} tilt={[-0.8, 0.8, -0.4, 1, -1][i % 5]}>
                <div className="stat">
                  <p className="stat__num"><CountUp value={x.value} suffix={x.suffix || '+'} /></p>
                  <p className="stat__label">{x.label}</p>
                </div>
              </Panel>
            </li>
          ))}
        </ul>
      )}
      
      <Button to="/gallery" icon={ArrowRight} size="lg" className="clients__btn">View gallery</Button>
    </section>
  );
}