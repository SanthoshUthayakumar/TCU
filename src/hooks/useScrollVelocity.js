import { useScroll, useSpring, useVelocity } from 'framer-motion';

export default function useScrollVelocity() {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  return useSpring(velocity, { damping: 50, stiffness: 400 });
}
