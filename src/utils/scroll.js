/* One shared handle on the Lenis instance so routing and buttons scroll the same way the wheel does. */
let lenis = null;
export const setLenis = (l) => { lenis = l; };
export function scrollToTop(immediate = false) {
  if (lenis) lenis.scrollTo(0, { immediate, duration: 1.1 });
  else window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
}
