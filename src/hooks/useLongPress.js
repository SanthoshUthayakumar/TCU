import { useRef } from 'react';

/* Touch/pen long press. Mouse users get hover instead. consumeClick() lets a link ignore the click that follows a hold. */
export default function useLongPress(onStart, onEnd, ms = 450) {
  const timer = useRef(0);
  const fired = useRef(false);
  const start = (e) => {
    if (e.pointerType === 'mouse') return;
    fired.current = false;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      fired.current = true;
      onStart?.();
    }, ms);
  };
  const stop = () => {
    clearTimeout(timer.current);
    if (fired.current) onEnd?.();
  };
  return {
    bind: {
      onPointerDown: start,
      onPointerUp: stop,
      onPointerLeave: stop,
      onPointerCancel: stop,
      onContextMenu: (e) => {
        if (fired.current) e.preventDefault();
      },
    },
    consumeClick: () => {
      const was = fired.current;
      fired.current = false;
      return was;
    },
  };
}
