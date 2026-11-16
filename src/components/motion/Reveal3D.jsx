import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';

export default function Reveal3D({ as: Tag = 'div', tilt = 22, side = 0, depth = -160, lift = 70, className = '', children, ...rest }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start 98%', 'start 58%'] });
  const rotateX = useTransform(p, [0, 1], [tilt, 0]);
  const rotateY = useTransform(p, [0, 1], [side, 0]);
  const y = useTransform(p, [0, 1], [lift, 0]);
  const z = useTransform(p, [0, 1], [depth, 0]);
  const opacity = useTransform(p, [0, 0.5], [0, 1]);
  const M = motion[Tag];
  return (
    <M ref={ref} className={className} style={reduced ? undefined : { rotateX, rotateY, y, z, opacity, transformPerspective: 1100 }} {...rest}>
      {children}
    </M>
  );
}
