import Button from './Button';
import { whatsapp } from '../../utils/links';
import site from '../../data/site';

/* Opens WhatsApp with a prefilled message when configured, otherwise goes to /contact. */
export default function BookButton({ message = site.whatsappMessage, children = 'Book a Shoot', ...props }) {
  const href = whatsapp(message);
  const text = typeof children === 'string' ? children : 'Book a Shoot';
  return href ? (
    <Button href={href} external label={`${text} on WhatsApp`} {...props}>{children}</Button>
  ) : (
    <Button to="/contact" {...props}>{children}</Button>
  );
}
