import { ArrowUpRight, Facebook, Instagram, Linkedin, MessageCircle, Send, Twitter, Youtube } from 'lucide-react';
import { extProps, instagramDM, socialList, whatsapp } from '../../utils/links';
import Button from '../ui/Button';

const ICONS = { instagram: Instagram, facebook: Facebook, youtube: Youtube, linkedin: Linkedin, x: Twitter };
const GLYPH = { vimeo: 'Vi', behance: 'Be', tiktok: 'Tk' };


export function SocialIcon({ id, size = 20 }) {
  const Icon = ICONS[id];
  if (Icon) return <Icon size={size} strokeWidth={2} aria-hidden="true" />;
  return <span className="social__glyph" aria-hidden="true">{GLYPH[id] || '*'}</span>;
}


export default function SocialLinks({ className = '', variant = 'chips' }) {
  const list = socialList();
  if (!list.length) return null;
  return (
    <ul className={`social social--${variant} ${className}`.trim()} aria-label="Social links">
      {list.map((s) => (
        <li key={s.id}>
          <a className="social__link" href={s.href} data-tip={s.label} {...extProps(`${s.label} profile`)}>
            <SocialIcon id={s.id} size={variant === 'tiles' ? 26 : 20} />
            {variant !== 'icons' && <span className="social__name">{s.label}</span>}
            {variant === 'chips' && <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />}
          </a>
        </li>
      ))}
    </ul>
  );
}


export function DirectButtons({ size = 'lg', message, className = '' }) {
  const wa = whatsapp(message);
  const ig = instagramDM();
  if (!wa && !ig) return null;
  return (
    <div className={`direct ${className}`.trim()}>
      {wa && <Button href={wa} external label="Message on WhatsApp" size={size} icon={MessageCircle}>Message on WhatsApp</Button>}
      {ig && <Button href={ig} external label="DM on Instagram" size={size} variant="ghost" icon={Send}>DM on Instagram</Button>}
    </div>
  );
}
