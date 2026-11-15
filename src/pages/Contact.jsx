import ContactSection from '../components/sections/ContactSection';
import RiseText from '../components/motion/RiseText';
import SocialLinks from '../components/sections/SocialLinks';
import usePageMeta from '../hooks/usePageMeta';

export default function Contact() {
  usePageMeta('Contact', 'Have a story to tell? Message Tom Cinematic Universe on WhatsApp, Instagram or email.');
  return (
    <div className="page page--contact">
      <ContactSection />
      <div className="wrap contact__socialwrap"><SocialLinks className="contact__social" /></div>
    </div>
  );
}
