import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { Clapperboard, Home, Images, Layers, Menu, MessageCircle, X } from 'lucide-react';
import BookButton from '../ui/BookButton';
import SocialLinks from '../sections/SocialLinks';
import useReducedMotion from '../../hooks/useReducedMotion';

export const NAV = [
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];
const DOCK = [
  { to: '/', label: 'Home', Icon: Home },
  { to: '/work', label: 'Work', Icon: Clapperboard },
  { to: '/services', label: 'Services', Icon: Layers },
  { to: '/gallery', label: 'Gallery', Icon: Images },
  { to: '/contact', label: 'Contact', Icon: MessageCircle },
];
const isOn = (path, to) => (to === '/' ? path === '/' : path === to || path.startsWith(`${to}/`));

/* Menu button wrapped in a ring that fills as the page scrolls. */
function MenuRing({ open, onClick }) {
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.2 });
  return (
    <button type="button" className="nav__menu" onClick={onClick} aria-expanded={open} aria-controls="menu" aria-label={open ? 'Close menu' : 'Open menu'}>
      <svg className="nav__ring" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="21" className="nav__ring-bg" />
        <motion.circle cx="24" cy="24" r="21" className="nav__ring-fg" style={{ pathLength }} />
      </svg>
      {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
    </button>
  );
}

/* Desktop: three separate floating pieces (brand, numbered capsule with a roaming highlight, action ring).
   Mobile: brand + menu ring at the top, and a dock at the bottom whose active tab expands. */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hover, setHover] = useState(null);
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setHidden(y > (scrollY.getPrevious() ?? 0) && y > 180));
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.classList.toggle('is-locked', open);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); document.body.classList.remove('is-locked'); };
  }, [open]);

  return (
    <>
      <motion.header className="nav" animate={{ y: hidden && !open ? '-160%' : '0%' }} transition={{ duration: reduced ? 0 : 0.5, ease: [0.2, 0.8, 0.2, 1] }}>
        <Link to="/" className="nav__brand" aria-label="Tom Cinematic Universe, home">
          <span className="nav__mark">TCU</span>
          <span className="nav__word">Tom Cinematic<br />Universe</span>
        </Link>
        <nav className="nav__caps" aria-label="Main" onMouseLeave={() => setHover(null)}>
          {NAV.map((n, i) => {
            const active = isOn(pathname, n.to);
            return (
              <NavLink key={n.to} to={n.to} className={`nav__link ${active ? 'is-active' : ''} ${hover === n.to ? 'is-hover' : ''}`} onMouseEnter={() => setHover(n.to)} onFocus={() => setHover(n.to)} onBlur={() => setHover(null)}>
                {hover === n.to && <motion.span layoutId="nav-hover" className="nav__hover" transition={{ type: 'spring', stiffness: 520, damping: 36 }} />}
                <span className="nav__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className="nav__text">{n.label}</span>
                {active && <motion.i layoutId="nav-dot" className="nav__dot" aria-hidden="true" />}
              </NavLink>
            );
          })}
        </nav>
        <div className="nav__end">
          <BookButton size="sm" className="nav__book" />
          <MenuRing open={open} onClick={() => setOpen(!open)} />
        </div>
      </motion.header>

      <nav className="dock" aria-label="Primary">
        {DOCK.map(({ to, label, Icon }) => {
          const active = isOn(pathname, to);
          return (
            <Link key={to} to={to} className={`dock__tab ${active ? 'is-active' : ''}`} aria-current={active ? 'page' : undefined}>
              {active && <motion.span layoutId="dock-blob" className="dock__blob" transition={{ type: 'spring', stiffness: 460, damping: 34 }} />}
              <Icon size={20} aria-hidden="true" />
              <span className="dock__label">{label}</span>
            </Link>
          );
        })}
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div id="menu" className="menu" initial={reduced ? false : { clipPath: 'circle(0% at calc(100% - 44px) 44px)' }} animate={{ clipPath: 'circle(150% at calc(100% - 44px) 44px)' }} exit={reduced ? { opacity: 0 } : { clipPath: 'circle(0% at calc(100% - 44px) 44px)' }} transition={{ duration: 0.7, ease: [0.77, 0, 0.18, 1] }}>
            <nav aria-label="Full menu" className="menu__nav">
              {[{ to: '/', label: 'Home' }, ...NAV].map((n, i) => (
                <motion.div key={n.to} initial={reduced ? false : { opacity: 0, y: 60, rotateX: -50 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: 0.12 * i + 0.3, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }} style={{ transformPerspective: 800 }}>
                  <NavLink to={n.to} end={n.to === '/'} className={({ isActive }) => `menu__link ${isActive ? 'is-active' : ''}`}>
                    <span className="menu__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>{n.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="menu__foot"><BookButton size="lg" /><SocialLinks /></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
