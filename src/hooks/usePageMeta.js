import { useEffect } from 'react';

const set = (selector, attr, value) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

export default function usePageMeta(title, description) {
  useEffect(() => {
    const full = title ? `${title} | Tom Cinematic Universe` : 'Tom Cinematic Universe | Stories beyond the frame';
    document.title = full;
    if (description) {
      set('meta[name="description"]', 'content', description);
      set('meta[property="og:description"]', 'content', description);
    }
    set('meta[property="og:title"]', 'content', full);
  }, [title, description]);
}
