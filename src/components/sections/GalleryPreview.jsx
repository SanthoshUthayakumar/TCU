import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Panel from '../comic/Panel';
import HalftoneImage from '../comic/HalftoneImage';
import SplitText from '../comic/SplitText';
import Button from '../ui/Button';
import gallery from '../../data/gallery';

export default function GalleryPreview() {
  const items = gallery.slice(0, 9);
  if (!items.length) return null;
  return (
    <section className="gprev" data-pg aria-label="Gallery preview">
      <div className="gprev__head">
        <SplitText text="FROM THE GALLERY" className="gprev__title" />
        <Button to="/gallery" icon={ArrowRight} size="sm" variant="ink">Open the gallery</Button>
      </div>
      <ul className="gprev__grid">
        {items.map((g, i) => (
          <li key={g.id} className={`gprev__item gprev__item--${i % 3}`}>
            <Link to="/gallery" aria-label={`Open gallery: ${g.alt}`}>
              <Panel index={i} tilt={i % 2 ? 0.7 : -0.7}>
                <HalftoneImage src={g.src} alt={g.alt} ratio={i % 3 === 0 ? '4/3' : '4/3'} />
              </Panel>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
