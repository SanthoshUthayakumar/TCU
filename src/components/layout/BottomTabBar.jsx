import { Link, NavLink } from 'react-router-dom';
import { Clapperboard, Images, Layers, MessageCircle, User } from 'lucide-react';

const TABS = [
  { to: '/work', label: 'Work', Icon: Clapperboard },
  { to: '/about', label: 'About', Icon: User },
  { to: '/services', label: 'Services', Icon: Layers },
  { to: '/gallery', label: 'Gallery', Icon: Images },
  { to: '/contact', label: 'Contact', Icon: MessageCircle },
];

export default function BottomTabBar() {
  return (
    <nav className="tabbar" aria-label="Primary">
      <Link to="/" className="tabbar__stamp" aria-label="Tom Cinematic Universe, home">TCU</Link>
      {TABS.map(({ to, label, Icon }) => (
        <NavLink key={to} to={to} className={({ isActive }) => `tabbar__tab ${isActive ? 'is-active' : ''}`}>
          <Icon size={20} strokeWidth={2.5} aria-hidden="true" />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
