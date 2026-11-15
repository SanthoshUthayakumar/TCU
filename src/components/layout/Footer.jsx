import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import SocialLinks from '../sections/SocialLinks';
import RiseText from '../motion/RiseText';
import { NAV } from './Navbar';
import { currentYear } from '../../utils/format';
import site from '../../data/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <RiseText as="p" text="Stories beyond the frame." className="footer__outro" />
        <div className="footer__grid">
          <div>
            <img className="footer__logo" src={logo} alt="TCU Crewz logo" width="96" height="96" loading="lazy" />
            <p className="footer__brand">Tom Cinematic Universe</p>
            {site.location && <p className="footer__loc">{site.location}</p>}
          </div>
          <nav aria-label="Footer" className="footer__nav">
            {NAV.map((n) => <Link key={n.to} to={n.to}>{n.label}</Link>)}
          </nav>
          <SocialLinks />
        </div>
        <p className="footer__legal">&copy; {currentYear()} Tom Cinematic Universe.  Web Dev : @Leodas</p>
      </div>
    </footer>
  );
}
