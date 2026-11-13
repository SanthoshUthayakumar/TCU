import { useEffect, useRef, useState } from 'react';

/* Returns [ref, inView]. With once=true it flips to true a single time and stops observing. */
export default function useInView({ once = true, margin = '0px', threshold = 0.2 } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      },
      { rootMargin: margin, threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, margin, threshold]);
  return [ref, inView];
}
