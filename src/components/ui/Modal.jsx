import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';
import { tokens } from '../../utils/motion';

export default function Modal({ open, onClose, label, className = '', children }) {
  const ref = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const reduced = useReducedMotion();
  const t = tokens();

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.activeElement;
    const onKey = (e) => {
      if (e.key === 'Escape') closeRef.current();
      if (e.key === 'Tab' && ref.current) {
        const f = ref.current.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.classList.add('is-locked');
    ref.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('is-locked');
      prev?.focus?.();
    };
  }, [open]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          className={`modal ${className}`.trim()}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          tabIndex={-1}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: t.base, ease: t.ease }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
