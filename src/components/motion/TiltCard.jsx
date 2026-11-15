import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';

/* Hover 3D tilt that follows the pointer. Touch devices and reduced motion get a flat card. */
export default function TiltCard({ as: Tag = 'div', max = 7, className = '', children, ...rest }) {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [max, -max]), { stiffness: 180, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-max, max]), { stiffness: 180, damping: 20 });
  const M = motion[Tag];
  const move = (e) => {
    if (reduced || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const leave = () => { mx.set(0); my.set(0); };
  return (
    <M className={`tilt ${className}`.trim()} style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 900 }} onPointerMove={move} onPointerLeave={leave} {...rest}>
      {children}
    </M>
  );
}
