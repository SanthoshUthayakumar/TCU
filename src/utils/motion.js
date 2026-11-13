/* Reads the motion tokens from tokens.css so JS and CSS share one easing curve and three durations. */
let cache;
export function tokens() {
  if (cache) return cache;
  const cs = getComputedStyle(document.documentElement);
  const ms = (name, fallback) => (parseFloat(cs.getPropertyValue(name)) || fallback) / 1000;
  const raw = cs.getPropertyValue('--ease');
  const nums = raw ? raw.match(/-?\d*\.?\d+/g) : null;
  const value = {
    fast: ms('--d1', 150),
    base: ms('--d2', 300),
    slow: ms('--d3', 600),
    ease: nums && nums.length === 4 ? nums.map(Number) : [0.2, 0.8, 0.2, 1],
  };
  if (raw) cache = value;
  return value;
}
export const wrap = (min, max, v) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};
