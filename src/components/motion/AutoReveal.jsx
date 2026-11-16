import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useReducedMotion from '../../hooks/useReducedMotion';

const SELECTOR = [
  '.eyebrow', '.page__sub', '.about__role', '.about__p', '.about__loc', '.about__actions', '.tags li', '.facts > div',
  '.stat__label', '.field', '.form__actions', '.contact__tip', '.contact .direct .btn', '.igcard', '.gtile', '.credits__row',
  '.cfilter__btn', '.reader__bar', '.pnext__link', '.pnext__line', '.footer__logo', '.footer__brand', '.footer__loc',
  '.footer__nav a', '.footer .social__link', '.footer__legal', '.gprev__head .btn', '.clients__btn', '.svc__line',
].join(',');

export default function AutoReveal() {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return undefined;
    const seen = new WeakSet();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.setAttribute('data-rv', 'in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    const scan = () => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (seen.has(el) || !el.parentElement) return;
        seen.add(el);
        const sibs = [...el.parentElement.children].filter((c) => c.matches(SELECTOR));
        el.style.setProperty('--d', `${Math.min(sibs.indexOf(el), 8) * 70}ms`);
        el.setAttribute('data-rv', 'out');
        io.observe(el);
      });
    };
    const ids = [60, 450, 1400].map((t) => setTimeout(scan, t));
    return () => { ids.forEach(clearTimeout); io.disconnect(); };
  }, [pathname, reduced]);
  return null;
}
