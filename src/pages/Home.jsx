import Hero from '../components/sections/Hero';
import ClientsSection from '../components/sections/ClientsSection';
import AboutSection from '../components/sections/AboutSection';
import ProcessSection from '../components/sections/ProcessSection';
import ServicesSection from '../components/sections/ServicesSection';
import WorkStories from '../components/sections/WorkStories';
import GalleryPreview from '../components/sections/GalleryPreview';
import ContactSection from '../components/sections/ContactSection';
import InstagramSection from '../components/sections/InstagramSection';
import ScrollBand from '../components/motion/ScrollBand';
import usePageMeta from '../hooks/usePageMeta';
import site from '../data/site';

export default function Home() {
  usePageMeta('', 'Tom Cinematic Universe is a studio for cinematography, photography and visual storytelling. Films, photography, commercials, events, reels and behind the scenes.');
  return (
    <div className="page page--home">
      <Hero />
      <ScrollBand items={site.disciplines} />
      <ClientsSection />
      <WorkStories />
      <AboutSection teaser />
      <ProcessSection />
      <ServicesSection />
      <GalleryPreview />
      <InstagramSection />
      <ContactSection compact />
    </div>
  );
}
