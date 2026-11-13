import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import SoundToggle from '../ui/SoundToggle';
import BookButton from '../ui/BookButton';
import SocialLinks from '../sections/SocialLinks';
import useReducedMotion from '../../hooks/useReducedMotion';
import { tokens } from '../../utils/motion';

export const NAV = [
  { to: '/work', label: 'Work', tip: 'The archive' },
  { to: '/about', label: 'About', tip: 'About us' },
  { to: '/services', label: 'Services', tip: 'What we shoot' },
  { to: '/gallery', label: 'Gallery', tip: 'All photos' },
  { to: '/contact', label: 'Contact', tip: 'Say hi' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  const t = tokens();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.classList.toggle('is-locked', open);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); document.body.classList.remove('is-locked'); };
  }, [open]);

  return (
    <>
      <header className="nav">
        <Link to="/" className="nav__brand" aria-label="Tom Cinematic Universe, home">
          <span className="nav__clap" aria-hidden="true">
            <span className="nav__clapbar" key={pathname} />
            <span className="nav__clapbody">TCU</span>
          </span>
          <span className="nav__word">Tom Cinematic Universe</span>
        </Link>
        <nav className="nav__links" aria-label="Main">
          {NAV.map((n, i) => (
            <NavLink key={n.to} to={n.to} data-tip={n.tip} style={{ '--r': `${[-1.6, 1.2, -0.8, 1.6, -1.2][i % 5]}deg` }} className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="nav__right">
          <SocialLinks variant="icons" className="nav__social" />
          <SoundToggle />
          <BookButton size="sm" className="nav__book" />
          <button type="button" className="nav__menu" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="menu" aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <X size={22} strokeWidth={3} aria-hidden="true" /> : <Menu size={22} strokeWidth={3} aria-hidden="true" />}
          </button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu"
            className="menu"
            initial={reduced ? false : { clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={reduced ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: t.base, ease: t.ease }}
          >
            <nav aria-label="Full menu" className="menu__nav">
              {[{ to: '/', label: 'Home' }, ...NAV].map((n, i) => (
                <motion.div key={n.to} initial={reduced ? false : { opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 * i + 0.1, duration: t.base, ease: t.ease }}>
                  <NavLink to={n.to} end={n.to === '/'} className={({ isActive }) => `menu__link ${isActive ? 'is-active' : ''}`}>
                    <span className="menu__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>{n.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="menu__foot">
              <BookButton size="lg" />
              <SocialLinks variant="tiles" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
