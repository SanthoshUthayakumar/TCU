import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/* Shown on every page except Home. Always returns to the home page. */
export default function BackButton() {
  const { pathname } = useLocation();
  if (pathname === '/') return null;
  return (
    <div className="backbar">
      <Link to="/" className="backlink"><ArrowLeft size={16} aria-hidden="true" /> Back to home</Link>
    </div>
  );
}
