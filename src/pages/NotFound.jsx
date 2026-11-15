import RiseText from '../components/motion/RiseText';
import Button from '../components/ui/Button';
import usePageMeta from '../hooks/usePageMeta';

export default function NotFound() {
  usePageMeta('Page not found', 'This page could not be found.');
  return (
    <div className="page page--notfound">
      <section className="sec notfound"><div className="wrap">
        <p className="eyebrow">Error 404</p>
        <RiseText as="h1" text="This page is blank." className="page__title" />
        <p>The page you opened does not exist. Try the archive or head home.</p>
        <div className="notfound__actions">
          <Button to="/work">See the work</Button>
          <Button to="/" variant="ghost">Home</Button>
        </div>
      </div></section>
    </div>
  );
}
