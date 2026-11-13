import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import useLocalStorage from '../../hooks/useLocalStorage';
import useReducedMotion from '../../hooks/useReducedMotion';
import { tokens } from '../../utils/motion';

/* With tipId the bubble is a dismissible page tip, remembered in localStorage. */
export default function SpeechBubble({ tipId, tail = 'bl', className = '', children }) {
  const [dismissed, setDismissed] = useLocalStorage(`tcu-tip-${tipId || 'none'}`, false);
  const reduced = useReducedMotion();
  const t = tokens();
  const hidden = tipId && dismissed;
  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          className={`bubble bubble--${tail} ${className}`.trim()}
          initial={reduced ? false : { opacity: 0, scale: 0.85, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
          transition={{ duration: t.base, ease: t.ease }}
        >
          <p className="bubble__text">{children}</p>
          {tipId && (
            <button type="button" className="bubble__close" onClick={() => setDismissed(true)} aria-label="Dismiss tip">
              <X size={16} strokeWidth={3} aria-hidden="true" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
