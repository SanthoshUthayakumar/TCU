import AboutSection from '../components/sections/AboutSection';
import ProcessSection from '../components/sections/ProcessSection';
import CreditsSection from '../components/sections/CreditsSection';
import ContactSection from '../components/sections/ContactSection';
import HalftoneField from '../components/comic/HalftoneField';
import usePageMeta from '../hooks/usePageMeta';
import site from '../data/site';

export default function About() {
  usePageMeta('About', 'Every frame tells a story. Every film creates a feeling. About Tom Cinematic Universe.');
  return (
    <div className="page page--about">
      <HalftoneField />
      <AboutSection />
      <CreditsSection credits={site.team} title="The crew" />
      <ProcessSection />
      <ContactSection compact />
    </div>
  );
}
