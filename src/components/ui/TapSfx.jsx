import { useEffect, useRef, useState } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion';

const WORDS = ['POP', 'BAM', 'ZAP', 'POW'];

function blip() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.value = 320;
    gain.gain.value = 0.04;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.07);
    setTimeout(() => ctx.close(), 200);
  } catch { /* audio unavailable */ }
}

/* Tap or click anywhere: a small visual pop at the point, optional sound, light vibration. */
export default function TapSfx() {
  const reduced = useReducedMotion();
  const [pops, setPops] = useState([]);
  const id = useRef(0);

  useEffect(() => {
    const onClick = (e) => {
      if (e.detail === 0) return; // keyboard activation
      try { if (JSON.parse(localStorage.getItem('tcu-sound') || 'false')) blip(); } catch { /* ignore */ }
      if (navigator.vibrate) navigator.vibrate(8);
      if (reduced) return;
      const n = ++id.current;
      setPops((p) => [...p.slice(-2), { n, x: e.clientX, y: e.clientY, w: WORDS[n % WORDS.length] }]);
      setTimeout(() => setPops((p) => p.filter((q) => q.n !== n)), 450);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [reduced]);

  return (
    <div className="tapsfx" aria-hidden="true">
      {pops.map((p) => (
        <span key={p.n} className="tapsfx__pop" style={{ left: p.x, top: p.y }}>{p.w}</span>
      ))}
    </div>
  );
}
