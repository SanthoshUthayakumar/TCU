import JournalSection from '../components/sections/JournalSection';
import HalftoneField from '../components/comic/HalftoneField';
import usePageMeta from '../hooks/usePageMeta';
import journal from '../data/journal';
import { Link } from 'react-router-dom';

export default function Journal() {
  usePageMeta('Journal', 'Notes from shoots, edits and the studio.');
  return (
    <div className="page page--journal">
      <HalftoneField />
      {journal.length ? (
        <JournalSection link={false} />
      ) : (
        <section className="empty" data-pg>
          <p>No journal entries yet. Add one in src/data/journal.js.</p>
          <Link to="/work">See the work</Link>
        </section>
      )}
    </div>
  );
}
