import Hero from '../components/sections/Hero';
import ClientsSection from '../components/sections/ClientsSection';
import AboutSection from '../components/sections/AboutSection';
import ProcessSection from '../components/sections/ProcessSection';
import ServicesSection from '../components/sections/ServicesSection';
import WorkStories from '../components/sections/WorkStories';
import GalleryPreview from '../components/sections/GalleryPreview';
import ContactSection from '../components/sections/ContactSection';
import PageTurn from '../components/comic/PageTurn';
import HalftoneField from '../components/comic/HalftoneField';
import usePageMeta from '../hooks/usePageMeta';
import InstagramSection from '../components/sections/InstagramSection';


export default function Home() {
  usePageMeta('', 'Tom Cinematic Universe is a studio for cinematography, photography and visual storytelling. Films, photography, commercials, events, reels and behind the scenes.');
  return (
    <div className="page page--home">
      <HalftoneField />
      <Hero />
      <ClientsSection />
      <WorkStories />
      <PageTurn label="Page two" />
      <AboutSection teaser />
      <ProcessSection />
      <PageTurn label="Page three" flip />
      <ServicesSection />
      <GalleryPreview />
      <InstagramSection />
      <PageTurn label="Last page" />
      <ContactSection compact />
    </div>
  );
}