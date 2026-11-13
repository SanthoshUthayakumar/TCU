import el4 from '../assets/images/elect/el4.webp';
import el1 from '../assets/images/elect/el1.webp';
import el2 from '../assets/images/elect/el2.webp';
import el3 from '../assets/images/elect/el3.webp';
import el5 from '../assets/images/elect/el5.webp';

import m1 from '../assets/images/mandaadi/m1.webp';
import m2 from '../assets/images/mandaadi/m2.webp';
import m3 from '../assets/images/mandaadi/m3.webp';
import m4 from '../assets/images/mandaadi/m4.webp';
import m5 from '../assets/images/mandaadi/m5.webp';

import om1 from '../assets/images/om/om1.webp';
import om2 from '../assets/images/om/om2.webp';
import om3 from '../assets/images/om/om3.webp';
import om4 from '../assets/images/om/om4.webp';
import om5 from '../assets/images/om/om5.webp';
import om6 from '../assets/images/om/om6.webp';

import s1 from '../assets/images/sun/s1.webp';
import s2 from '../assets/images/sun/s2.webp';
import s3 from '../assets/images/sun/s3.webp';

import t0 from '../assets/images/trapfit/t0.webp'
import t1 from '../assets/images/trapfit/t1.webp'
import t2 from '../assets/images/trapfit/t2.webp'
import t3 from '../assets/images/trapfit/t3.webp'

import cat0 from '../assets/images/cat/cat0.webp'
import cat1 from '../assets/images/cat/cat1.webp'
import cat2 from '../assets/images/cat/cat2.webp'
import cat3 from '../assets/images/cat/cat3.webp'

import ph1 from '../assets/images/img1.webp';
import ph2 from '../assets/images/img2.webp';
import ph3 from '../assets/images/img3.webp';
import ph4 from '../assets/images/img4.webp';
import ph5 from '../assets/images/img5.webp';
import ph6 from '../assets/images/img6.webp';
import ph7 from '../assets/images/img7.webp';
import ph8 from '../assets/images/ph-8.svg';
/*
  ONE FILE DRIVES THE WORK PAGES.
  Every entry below is a PLACEHOLDER (placeholder: true). Replace covers and panels with your files,
  then delete `placeholder: true`.

  Fields: slug, title, client, category, year, role, cover, previewVideo, mainVideo | embed,
          panels[{ src, ratio, caption, alt, bts? }], credits[{ role, name }], layout, featured
  layout: 'splash' (full width) | 'wide' (letterbox) | 'pair' (half) | 'tall' (portrait)
  embed: a YouTube or Vimeo link. mainVideo: an mp4/webm URL or imported file.

  HOW TO ADD IMAGES: import the file at the top, then use the import name directly,
  e.g. cover: myPhoto, and panel(myPhoto, '3/2', 'Caption', 'Alt text').
*/

// panel(image, ratio, caption, alt, isBehindTheScenes)
const panel = (src, ratio, caption, alt, bts = false) => ({ src, ratio, caption, alt, bts });

export const CATEGORIES = ['Candid', 'Commercials', 'Events', 'PR WORKS', ''];

const projects = [
  {
    slug: 'By-Election', title: 'BY_ELECTION 2026', client: '', category: 'Candid', year: 2026, role: 'Photography',
    cover: el4, previewVideo: '', mainVideo: '', embed: '', layout: 'tall', featured: true,
    panels: [
      panel(el4, '3/2', 'CM VIJAY ANNA (TVK CAMPAIGN)'),
      panel(el5, '3/2', 'On set, between takes.', ''),
      panel(el3, '4/5', 'Second beat.', ''),
      panel(el2, '3/2', 'The turn.', ''),
      panel(el1, '3/2', 'On set, between takes.', ''),
      
    ],
    credits: [{ role: 'Director of photography', name: 'Team TCU' }, { role: 'Edit', name: 'Team TCU' }],
  },
  {
    slug: 'Mandaadi', title: 'Mandaadi Success Meet', client: '', category: 'Events', year: 2026, role: 'Photography',
    cover: m5, previewVideo: '', mainVideo: '', embed: '', layout: 'tall', featured: true,
    panels: [
      panel(m5, '4/5', 'Stall light.', ''),
      panel(m1, '3/2', 'Crowd at dusk.', ''),
      panel(m2, '4/5', 'Last customer.', ''),
      panel(m3, '4/5', 'Last customer.', ''),
      panel(m4, '4/5', 'Last customer.', ''),
    ],
    credits: [{ role: 'Director of photography', name: 'Team Nexa Fusion' }, { role: 'Edit', name: 'Team TCU' }],
  },
  {
    slug: 'OM', title: 'OM Pre-Release Event', client: '', category: 'Events', year: 2026, role: 'Photography',
    cover: om1, previewVideo: '', mainVideo: '', embed: '', layout: 'tall', featured: true, 
    panels: [
      panel(om1, '3/2', 'Dhanush ', ''),
      panel(om2, '3/2', 'Mammootty', ''),
      panel(om3, '3/2', 'iSAI', ''),
      panel(om4, '3/2', 'Sai Pallavi', ''),
      panel(om5, '3/2', 'Sreeleela', ''),
      panel(om6, '3/2', 'Sandy Master', ''),
    ],
    credits: [{ role: 'Director of photography', name: 'Team Nexa Fusion' }, { role: 'Edit', name: 'Team TCU' }],
  },
  {
    slug: 'Trapfitt', title: 'Trapfitt Clothing', client: '', category: 'Commercials', year: 2026, role: 'Photo,video and Promotion',
    cover: t0, previewVideo: '', mainVideo: '', embed: '', layout: 'pair', featured: true, 
    panels: [
      panel(t3, '3/2', '', ''),
      panel(t2, '3/2', '', ''),
      panel(t1, '3/2', '', ''),
    ],
    credits: [{ role: 'Model', name: 'Maddychallenger' }, { role: 'Edit', name: 'Team TCU' }],
  },
  {
    slug: 'catering promotion', title: 'CATERING PROMOTION', client: '', category: 'Commercials', year: 2026, role: 'Shoot,edit and Promotion',
    cover: cat0, previewVideo: '', mainVideo: '', embed: '', layout: 'pair', featured: true,
    panels: [
      panel(cat1, '4/5', 'BK Caterings.'),
      panel(cat2, '4/5', 'Sri Krishna Caterings.'),
      panel(cat3, '4/5', 'E2R Food Zone'),
    ],
    credits: [{ role: 'PR Work', name: 'Team TCU' }],
  },
  {
    slug: 'MGM', title: ' Miss Grand Malaysia 2026 PR WORK', client: '', category: 'PR WORKS', year: 2024, role: 'Cinematography',
    cover: s3, previewVideo: '', mainVideo: '', embed: '', layout: 'tall', featured: true,
    panels: [
      panel(s3, '4/5', 'Morning.', ''),
      panel(s2, '4/5', 'Window.', ''),
      panel(s1, '4/5', 'Night.', ''),
    ],
    credits: [{ role: 'Model', name: 'Sunoshini Dhanabalan' }, { role: 'PR Work', name: 'Team TCU' }],
  },
];

/* Short text for the "slide by slide" section on the home page. [Placeholder] copy: replace with your own. */
const SUMMARIES = {
  coastline: '[Placeholder] One or two sentences on what this film is about and what you shot.',
  'night-market': '[Placeholder] A photo story: where it was made and what it shows.',
  'studio-spot': '[Placeholder] A commercial: the idea, the look, the result.',
  'harvest-day': '[Placeholder] Event coverage: what the day was and how you covered it.',
  'loop-01': '[Placeholder] A vertical reel: the concept and the format.',
  'on-set-diary': '[Placeholder] Behind the scenes: what happened between takes.',
  'quiet-hours': '[Placeholder] A short film: the mood and the story.',
  'portrait-series': '[Placeholder] A portrait series: who, where and why.',
};

export default projects.map((p) => ({ ...p, summary: SUMMARIES[p.slug] || '' }));