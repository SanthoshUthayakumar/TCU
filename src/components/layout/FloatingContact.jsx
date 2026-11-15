import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, MessageCircle, Send, X } from 'lucide-react';
import { extProps, instagramDM, mail, whatsapp } from '../../utils/links';
import useReducedMotion from '../../hooks/useReducedMotion';
import { tokens } from '../../utils/motion';

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const t = tokens();

  const items = [
    { href: whatsapp(), label: 'Message on WhatsApp', text: 'WhatsApp', Icon: MessageCircle, ext: true },
    { href: instagramDM(), label: 'DM on Instagram', text: 'Instagram DM', Icon: Send, ext: true },
    { href: mail('Project enquiry'), label: 'Send an email', text: 'Email', Icon: Mail, ext: false },
  ].filter((i) => i.href);
  if (!items.length) return null;

  return (
    <div className="fcontact">
      <AnimatePresence>
        {open && (
          <motion.ul className="fcontact__list" initial="hide" animate="show" exit="hide" transition={{ staggerChildren: 0.05 }}>
            {items.map((i) => (
              <motion.li key={i.text} variants={{ hide: { opacity: 0, y: 12, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1 } }} transition={{ duration: t.base, ease: t.ease }}>
                <a className="fcontact__item" href={i.href} {...(i.ext ? extProps(i.label) : { 'aria-label': i.label })}>
                  <i.Icon size={18} strokeWidth={2} aria-hidden="true" />
                  {i.text}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      <button type="button" className={`fcontact__btn`} aria-expanded={open} aria-label={open ? 'Close contact options' : 'Open contact options'} onClick={() => setOpen(!open)}>
        {open ? <X size={26} strokeWidth={2} aria-hidden="true" /> : <MessageCircle size={26} strokeWidth={2} aria-hidden="true" />}
      </button>
    </div>
  );
}
