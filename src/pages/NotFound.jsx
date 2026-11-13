import SfxBurst from '../components/comic/SfxBurst';
import SplitText from '../components/comic/SplitText';
import Button from '../components/ui/Button';
import usePageMeta from '../hooks/usePageMeta';

export default function NotFound() {
  usePageMeta('Page not found', 'This page could not be found.');
  return (
    <div className="page page--notfound">
      <section className="notfound" data-pg>
        <SfxBurst word="OOPS" className="notfound__sfx" />
        <SplitText as="h1" text="THIS PANEL IS BLANK." className="page__title" />
        <p>The page you opened does not exist. Try the archive or head home.</p>
        <div className="notfound__actions">
          <Button to="/work">See the work</Button>
          <Button to="/" variant="ink">Home</Button>
        </div>
      </section>
    </div>
  );
}
