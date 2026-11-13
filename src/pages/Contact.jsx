import ContactSection from '../components/sections/ContactSection';
import HalftoneField from '../components/comic/HalftoneField';
import SocialLinks from '../components/sections/SocialLinks';
import usePageMeta from '../hooks/usePageMeta';

export default function Contact() {
  usePageMeta('Contact', 'Have a story to tell? Message Tom Cinematic Universe on WhatsApp, Instagram or email.');
  return (
    <div className="page page--contact">
      <HalftoneField />
      <ContactSection />
      <SocialLinks className="contact__social" />
    </div>
  );
}
