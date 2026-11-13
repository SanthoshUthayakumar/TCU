import ServicesSection from '../components/sections/ServicesSection';
import ContactSection from '../components/sections/ContactSection';
import HalftoneField from '../components/comic/HalftoneField';
import usePageMeta from '../hooks/usePageMeta';

export default function Services() {
  usePageMeta('Services', 'Films, photography, commercials, events and reels from Tom Cinematic Universe.');
  return (
    <div className="page page--services">
      <HalftoneField />
      <ServicesSection />
      <ContactSection compact />
    </div>
  );
}
