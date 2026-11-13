import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/* Shown on every page except Home. Always returns to the home page. */
export default function BackButton() {
  const { pathname } = useLocation();
  if (pathname === '/') return null;
  return (
    <div className="backbar">
      <Link to="/" className="btn btn--ink btn--sm backbar__btn">
        <ArrowLeft size={18} strokeWidth={3} aria-hidden="true" />
        <span className="btn__label">Back to home</span>
        <span className="btn__pop" aria-hidden="true" />
      </Link>
    </div>
  );
}
