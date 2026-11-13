import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Panel from '../comic/Panel';
import HalftoneImage from '../comic/HalftoneImage';
import SplitText from '../comic/SplitText';
import Button from '../ui/Button';
import { extProps } from '../../utils/links';
import { formatDate } from '../../utils/format';
import journal from '../../data/journal';

const SIZES = ['lg', 'sm', 'md'];

function Entry({ e, i }) {
  const body = (
    <>
      {e.image && <HalftoneImage src={e.image} alt="" ratio="3/2" />}
      <p className="jentry__date">{formatDate(e.date)}{e.placeholder ? ' / placeholder' : ''}</p>
      <h3 className="jentry__title">{e.title}</h3>
      <p className="jentry__excerpt">{e.excerpt}</p>
    </>
  );
  return (
    <li className={`jentry jentry--${SIZES[i % SIZES.length]}`}>
      <Panel index={i} tilt={i % 2 ? 0.6 : -0.6}>
        {e.href ? <a className="jentry__link" href={e.href} {...extProps(e.title)}>{body}</a> : <div className="jentry__link">{body}</div>}
      </Panel>
    </li>
  );
}

/* Editorial strip. Empty journal hides the whole section. */
export default function JournalSection({ limit, link = true }) {
  if (!journal.length) return null;
  const items = limit ? journal.slice(0, limit) : journal;
  return (
    <section className="journal" data-pg aria-label="Journal">
      <div className="journal__head">
        <SplitText text="FROM THE JOURNAL" className="journal__title" />
        {link && <Button to="/journal" icon={ArrowRight} size="sm" variant="ink">All entries</Button>}
      </div>
      <ul className="journal__strip">{items.map((e, i) => <Entry e={e} i={i} key={e.id} />)}</ul>
      {!link && <p className="journal__back"><Link to="/work">See the work</Link></p>}
    </section>
  );
}
