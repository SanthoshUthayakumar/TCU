import { Link } from 'react-router-dom';
import SocialLinks from '../sections/SocialLinks';
import SplitText from '../comic/SplitText';
import { NAV } from './Navbar';
import { currentYear } from '../../utils/format';
import site from '../../data/site';

export default function Footer() {
  return (
    <footer className="footer" data-pg>
      <SplitText as="p" text="THE END... OR IS IT?" className="footer__outro" />
      <div className="footer__grid">
        <div>
          <p className="footer__brand">Tom Cinematic Universe</p>
          {site.location && <p className="footer__loc">{site.location}</p>}
        </div>
        <nav aria-label="Footer" className="footer__nav">
          {NAV.map((n) => <Link key={n.to} to={n.to}>{n.label}</Link>)}
        </nav>
        <SocialLinks />
      </div>
      <p className="footer__legal">&copy; {currentYear()} Tom Cinematic Universe. All rights reserved. Website developed by Team TCU</p>
    </footer>
  );
}
