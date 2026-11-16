let lenis = null;
export const setLenis = (l) => { lenis = l; };
export function scrollToTop(immediate = false) {
  if (lenis) lenis.scrollTo(0, { immediate, duration: 1.1 });
  else window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
}
