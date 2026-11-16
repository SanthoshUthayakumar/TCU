import site from '../data/site';

const clean = (v) => (v == null ? '' : String(v).trim());
const digits = (v) => clean(v).replace(/\D/g, '');
const handle = (v) => clean(v).replace(/^@/, '').replace(/\/+$/, '');
const toUrl = (v, base) => {
  const s = clean(v);
  if (!s) return '';
  return /^https?:\/\//i.test(s) ? s : base + s.replace(/^@/, '');
};

export const instagramProfile = () => (handle(site.instagramHandle) ? `https://www.instagram.com/${handle(site.instagramHandle)}/` : '');
export const instagramDM = () => (handle(site.instagramHandle) ? `https://ig.me/m/${handle(site.instagramHandle)}` : '');

export const instagramPermalink = (url) => {
  const m = clean(url).match(/instagram\.com\/(?:[\w.]+\/)?(p|reels?|tv)\/([\w-]+)/i);
  if (!m) return '';
  const type = m[1].toLowerCase().startsWith('reel') ? 'reel' : m[1].toLowerCase();
  return `https://www.instagram.com/${type}/${m[2]}/`;
};
export const whatsapp = (message = site.whatsappMessage) =>
  digits(site.whatsappNumber) ? `https://wa.me/${digits(site.whatsappNumber)}?text=${encodeURIComponent(message || '')}` : '';
export const mail = (subject = '', body = '') =>
  clean(site.email) ? `mailto:${clean(site.email)}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}` : '';
export const phone = () => (clean(site.phone) ? `tel:${clean(site.phone).replace(/[^\d+]/g, '')}` : '');

export const extProps = (label) => ({ target: '_blank', rel: 'noopener noreferrer', 'aria-label': `${label} (opens in a new tab)` });


export function socialList() {
  const list = [
    { id: 'instagram', label: 'Instagram', href: instagramProfile() },
    { id: 'youtube', label: 'YouTube', href: toUrl(site.youtube, 'https://www.youtube.com/') },
    { id: 'vimeo', label: 'Vimeo', href: toUrl(site.vimeo, 'https://vimeo.com/') },
    { id: 'behance', label: 'Behance', href: toUrl(site.behance, 'https://www.behance.net/') },
    { id: 'facebook', label: 'Facebook', href: toUrl(site.facebook, 'https://www.facebook.com/') },
    { id: 'x', label: 'X', href: toUrl(site.x, 'https://x.com/') },
    { id: 'tiktok', label: 'TikTok', href: toUrl(site.tiktok, 'https://www.tiktok.com/@') },
    { id: 'linkedin', label: 'LinkedIn', href: toUrl(site.linkedin, 'https://www.linkedin.com/') },
  ];
  return list.filter((i) => i.href);
}

export const hasDirectChannel = () => Boolean(whatsapp() || instagramDM() || mail());
