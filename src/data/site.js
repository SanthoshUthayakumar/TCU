import aboutImage from '../assets/images/abt.png';
import heroPoster from '../assets/images/img1.webp';
import slidehero1 from '../assets/images/img2.webp';
import slidehero2 from '../assets/images/img3.webp';
import slidehero3 from '../assets/images/img4.webp';
import slidehero5 from '../assets/images/img6.webp';
import slidehero4 from '../assets/images/img5.webp';
import slidehero6 from '../assets/images/img7.webp';
import slidehero7 from '../assets/images/img8.webp';
import slidehero8 from '../assets/images/img9.webp';
import slidehero9 from '../assets/images/img10.webp';

import r1 from '../assets/images/reel/r1.jpg';
import r2 from '../assets/images/reel/r2.jpg';
import r3 from '../assets/images/reel/r3.jpg';
import r4 from '../assets/images/reel/r4.jpg';
import r5 from '../assets/images/reel/r5.jpg';
import r6 from '../assets/images/reel/r6.jpg';

/*
  EDIT ME. Every value here is optional.
  Empty strings hide the matching link or section. Nothing is invented for you.
  - whatsappNumber: international digits only, no + or spaces (example shape: 15551234567)
  - instagramHandle: without the @
  - youtube, facebook, linkedin, behance, vimeo: full profile URL
  - x, tiktok: handle or full URL
*/
const site = {
  name: 'Tom Cinematic Universe',
  short: 'TCU',
  disciplines: ['Cinematography', 'Photography', 'Visual storytelling'],

  instagramHandle: 'tcu_crewz',
  whatsappNumber: '+91 73056 64736',
  whatsappMessage: "Hi TCU, I'd like to talk about a project.",
  email: 'tcucrewz@gmail.com',
  phone: '+91 73056 64736',
  youtube: '',
  facebook: '',
  x: '',
  linkedin: '',
  behance: '',
  vimeo: '',
  tiktok: '',
  location: 'Chennai & all over Tamilnadu',

  // Hero: a muted looping video (mp4/webm URL or imported file). Empty shows the poster.
  heroVideo: '',
  heroPoster,
  // Clients marquee + numbers on the home page. Replace the placeholders; an empty list hides the marquee.
  clients: ['NEXA FUSION', 'BK CATERING', 'BLACK BAND', 'TRAPFITT', 'ATMAN EVENTS', 'KRISHNA CATERING', 'JUSSSWAP', 'E2R FOOD ZONE','',''],
  // clients: leave '' to count the list above. events: number of events covered (0 hides it).
  stats: { clients: '', events: 50, views:50},
  statsArePlaceholder: true,
  // Hero slideshow (changes every 5 seconds). Leave empty to use the covers of your featured projects.
  // Format: [{ src: importedImage, alt: 'Describe the photo', label: 'Short caption' }]
  heroSlides: [{ src:heroPoster, alt: 'Cm Vijay Anna ', label: '@ TVK campaign '},{ src: slidehero7, alt: 'iSai', label: '@ OM Audio Launch '},{ src: slidehero1, alt: 'Vettri Maaran', label: '@ Mandaadi Success Meet '},
    { src: slidehero8, alt: 'Sai pallavi', label: '@ OM Audio Launch '},
    { src:slidehero5, alt: ' U1 ', label: '@ U1 Concert '},{ src: slidehero9, alt: 'Dhanush', label: '@ Om Audio Launch '},{ src:slidehero3, alt: ' EPS ', label: '@ AIADMK campaign '},{ src:slidehero2, alt: ' Actor Soori ', label: '@ Mandaadi Success Meet '},
    { src:slidehero4, alt: ' Poovaiyar ', label: '@ Maharishi School Event '},{ src:slidehero6, alt: ' sunoshini ', label: '@ Miss Grand Malaysia '}],
  
  
  
  instagramPosts: [{ url: 'https://www.instagram.com/reel/DcYY9FfyGxF/?utm_source=ig_web_copy_link&vrfl=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==', image: r1, caption: 'Black Band' },
    {url: 'https://www.instagram.com/reel/DfpLNlcz5IT/?utm_source=ig_web_copy_link&srtk=MzRlODBiNWFlZA==', image: r2, caption: 'OM' },
    {url: 'https://www.instagram.com/reel/DdiEV1hTry8/?utm_source=ig_web_copy_link', image: r3, caption: 'Mandaaadi' },
    {url: 'https://www.instagram.com/reel/DbHuKARSmfW/?utm_source=ig_web_copy_link&dlrf=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==', image: r4, caption: 'BK Caterings Promotion' },
    {url: 'https://www.instagram.com/reel/DejpLeUhoBt/?utm_source=ig_web_copy_link&psln=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==', image: r5, caption: 'Sri Krishna Caterings Promotion' },
    {url: 'https://www.instagram.com/reel/DcbO9xwPTbX/?utm_source=ig_web_copy_link&mdxt=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==', image: r6, caption: 'Trapfitt Promotion' },
],
  // About me: replace the placeholders. Empty `facts` hides the facts list.
  
  
  ownerName: 'Tom',
  ownerRole: 'Cinematography and photography',
  aboutText: [
    '',
    '',
  ],
  facts: [], // [{ label: 'Based in', value: 'City' }]
  aboutImage,
  aboutImageIsPlaceholder: true,

  team: [{ role: 'Director', name: 'Tamizharasu ' },{ role: '', name: '' }],
  
};


export default site;
