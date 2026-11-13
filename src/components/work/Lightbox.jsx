import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, X } from 'lucide-react';
import Modal from '../ui/Modal';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/* Pinch to zoom (two fingers), wheel or buttons on desktop, swipe down to close at 1x. */
export default function Lightbox({ item, onClose }) {
  const [scale, setScale] = useState(1);
  const pts = useRef(new Map());
  const start = useRef({ d: 0, s: 1 });
  const dist = () => { const [a, b] = [...pts.current.values()]; return Math.hypot(a.x - b.x, a.y - b.y) || 1; };

  const down = (e) => {
    pts.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.current.size === 2) start.current = { d: dist(), s: scale };
  };
  const move = (e) => {
    if (!pts.current.has(e.pointerId)) return;
    pts.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.current.size === 2) setScale(clamp((start.current.s * dist()) / start.current.d, 1, 4));
  };
  const up = (e) => pts.current.delete(e.pointerId);

  return (
    <Modal open={Boolean(item)} onClose={() => { setScale(1); onClose(); }} label={item?.alt || 'Enlarged photo'} className="lightbox">
      {item && (
        <>
          <div className="lightbox__bar">
            <button type="button" className="lightbox__btn" onClick={() => setScale((s) => clamp(s - 0.5, 1, 4))} aria-label="Zoom out"><Minus size={20} aria-hidden="true" /></button>
            <button type="button" className="lightbox__btn" onClick={() => setScale((s) => clamp(s + 0.5, 1, 4))} aria-label="Zoom in"><Plus size={20} aria-hidden="true" /></button>
            <button type="button" className="lightbox__btn" onClick={() => { setScale(1); onClose(); }} aria-label="Close"><X size={20} aria-hidden="true" /></button>
          </div>
          <motion.div
            key={scale > 1 ? 'pan' : 'fixed'}
            className="lightbox__stage"
            drag={scale > 1 ? true : 'y'}
            dragElastic={scale > 1 ? 0.1 : 0.4}
            dragSnapToOrigin={scale === 1}
            onDragEnd={(_, info) => { if (scale === 1 && (info.offset.y > 110 || info.velocity.y > 700)) onClose(); }}
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={up}
            onPointerCancel={up}
            onWheel={(e) => setScale((s) => clamp(s - e.deltaY * 0.002, 1, 4))}
            onDoubleClick={() => setScale((s) => (s > 1 ? 1 : 2))}
          >
            <img className="lightbox__img" src={item.src} alt={item.alt} draggable="false" style={{ transform: `scale(${scale})` }} />
          </motion.div>
          {item.caption && <p className="lightbox__caption">{item.caption}</p>}
          <p className="lightbox__hint">Pinch or double-tap to zoom. Swipe down to close.</p>
        </>
      )}
    </Modal>
  );
}
