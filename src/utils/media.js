const seen = new Set();
export function preload(src) {
  if (!src || seen.has(src) || /\.(mp4|webm)$/i.test(src)) return;
  seen.add(src);
  const i = new Image();
  i.decoding = 'async';
  i.src = src;
}

/* Turn a YouTube or Vimeo link into an embeddable URL. Returns '' if unknown. */
export function embedUrl(url = '') {
  if (!url) return '';
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/i);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
  return /^https:\/\//.test(url) ? url : '';
}
