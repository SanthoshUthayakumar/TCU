import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* Comic-style 3D props (cinema camera, film reels, clapperboard, studio light, editing timeline)
   that float and turn as the page scrolls. Everything is built from primitives: no model files.
   Cel shading + an inverted-hull ink outline give the comic look. */
const C = { ink: '#111111', paper: '#f3eee2', yellow: '#ffd21f', red: '#e5322d', news: '#e4ddcb' };
const TYPES = ['camera', 'clapper', 'reel', 'light', 'editing', 'camera', 'clapper', 'reel'];

export default function Scene3D() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = matchMedia('(max-width: 767px), (pointer: coarse)').matches;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !mobile, powerPreference: 'low-power' });
    } catch { return undefined; }
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.5 : 2));

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(C.paper, 14, 40);
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 80);
    scene.add(new THREE.AmbientLight('#ffffff', 1.1));
    const sun = new THREE.DirectionalLight('#ffffff', 2.4); sun.position.set(3, 5, 6); scene.add(sun);

    /* ---------- materials and part helper ---------- */
    const gm = new THREE.DataTexture(new Uint8Array([100, 175, 255]), 3, 1, THREE.RedFormat);
    gm.minFilter = THREE.NearestFilter; gm.magFilter = THREE.NearestFilter; gm.needsUpdate = true;
    const mats = {};
    const toon = (c) => (mats[c] ||= new THREE.MeshToonMaterial({ color: c, gradientMap: gm }));
    const hull = new THREE.MeshBasicMaterial({ color: C.ink, side: THREE.BackSide });
    const part = (geo, color, pos = [0, 0, 0], rot = [0, 0, 0], outline = true) => {
      const m = new THREE.Mesh(geo, toon(color));
      m.position.set(...pos); m.rotation.set(...rot);
      if (outline && color !== C.ink) { const h = new THREE.Mesh(geo, hull); h.scale.setScalar(1.09); m.add(h); }
      return m;
    };
    const box = (w, h, d) => new THREE.BoxGeometry(w, h, d);
    const cyl = (r1, r2, h, s = 24) => new THREE.CylinderGeometry(r1, r2, h, s);
    const X = Math.PI / 2;

    /* ---------- prop builders (each returns { g, tick }) ---------- */
    const buildCamera = () => {
      const g = new THREE.Group();
      g.add(part(box(1.5, 1, 1.1), C.yellow));
      g.add(part(cyl(0.38, 0.42, 0.9), C.paper, [0, 0, 1], [X, 0, 0]));
      g.add(part(cyl(0.47, 0.47, 0.18), C.ink, [0, 0, 1.5], [X, 0, 0]));
      g.add(part(box(1.1, 0.9, 0.5), C.ink, [0, 0, 1.95]));
      g.add(part(cyl(0.5, 0.5, 0.3), C.red, [0, 0.85, -0.3], [0, 0, X]));
      g.add(part(cyl(0.4, 0.4, 0.3), C.red, [0, 0.8, 0.5], [0, 0, X]));
      g.add(part(box(0.9, 0.1, 0.1), C.ink, [0, 1.4, 0.1], [0, 0, 0], false));
      g.add(part(box(0.5, 0.35, 0.4), C.paper, [0.55, 0.2, -0.75]));
      g.scale.setScalar(0.85); g.rotation.order = 'YXZ';
      return { g, tick: () => {} };
    };
    const buildReel = () => {
      const g = new THREE.Group();
      const s = new THREE.Shape(); s.absarc(0, 0, 1, 0, Math.PI * 2);
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2, h = new THREE.Path();
        h.absarc(Math.cos(a) * 0.55, Math.sin(a) * 0.55, 0.22, 0, Math.PI * 2, true); s.holes.push(h);
      }
      const c = new THREE.Path(); c.absarc(0, 0, 0.1, 0, Math.PI * 2, true); s.holes.push(c);
      const eg = new THREE.ExtrudeGeometry(s, { depth: 0.12, bevelEnabled: false, curveSegments: 20 });
      g.add(part(eg, C.yellow, [0, 0, 0.25]));
      g.add(part(eg, C.yellow, [0, 0, -0.37]));
      g.add(part(cyl(0.62, 0.62, 0.5), C.ink, [0, 0, 0], [X, 0, 0]));
      g.rotation.order = 'YXZ';
      return { g, tick: (d, now) => { g.children[0].parent.rotation.z = now * 0.0006 + d * 0.1; } };
    };
    const buildClapper = () => {
      const g = new THREE.Group();
      g.add(part(box(1.7, 1.1, 0.08), C.news));
      [-0.1, -0.3, -0.5].forEach((y) => g.add(part(box(1.4, 0.07, 0.02), C.ink, [0, y, 0.05], [0, 0, 0], false)));
      const stripes = (parent) => {
        for (let i = 0; i < 6; i++) parent.add(part(box(0.283, 0.26, 0.09), i % 2 ? C.paper : C.ink, [0.14 + i * 0.283, 0, 0]));
      };
      const lower = new THREE.Group(); lower.position.set(-0.85, 0.68, 0); stripes(lower); g.add(lower);
      const upper = new THREE.Group(); upper.position.set(-0.85, 0.56, 0.06); stripes(upper); g.add(upper);
      g.rotation.order = 'YXZ';
      return { g, tick: (d, now, i, vel) => { upper.rotation.z = 0.04 + Math.pow(Math.max(0, Math.sin(now * 0.0022 + i)), 3) * 0.55 + Math.min(0.5, vel * 6); } };
    };
    const buildLight = () => {
      const g = new THREE.Group();
      g.add(part(cyl(0.05, 0.05, 1.8), C.ink, [0, -0.9, 0], [0, 0, 0], false));
      g.add(part(cyl(0.6, 0.75, 0.12), C.ink, [0, -1.8, 0], [0, 0, 0], false));
      const head = new THREE.Group(); head.rotation.x = 0.35;
      head.add(part(cyl(0.5, 0.5, 0.8), C.red, [0, 0, 0], [X, 0, 0]));
      head.add(part(cyl(0.66, 0.5, 0.4), C.yellow, [0, 0, 0.6], [X, 0, 0]));
      head.add(part(box(1.3, 0.06, 0.4), C.ink, [0, 0.72, 0.85], [0, 0, 0], false));
      head.add(part(box(1.3, 0.06, 0.4), C.ink, [0, -0.72, 0.85], [0, 0, 0], false));
      const beam = new THREE.Mesh(new THREE.ConeGeometry(1.2, 3.4, 28, 1, true),
        new THREE.MeshBasicMaterial({ color: C.yellow, transparent: true, opacity: 0.16, side: THREE.DoubleSide, depthWrite: false }));
      beam.rotation.x = -X; beam.position.z = 2.4; head.add(beam);
      g.add(head); g.rotation.order = 'YXZ';
      return { g, tick: (d, now, i) => { head.rotation.y = Math.sin(now * 0.0007 + i) * 0.35; head.rotation.x = 0.3 + Math.sin(now * 0.0009 + i) * 0.1; } };
    };
    const buildEditing = () => {
      const g = new THREE.Group();
      g.add(part(box(2.7, 1.5, 0.08), C.news));
      const rows = [
        [0.45, [[-1.1, 0.9, C.yellow], [0.0, 0.7, C.paper], [0.8, 0.5, C.red]]],
        [0.05, [[-0.9, 0.5, C.red], [-0.2, 1.0, C.yellow], [0.85, 0.45, C.paper]]],
        [-0.35, [[-1.05, 0.6, C.paper], [-0.3, 0.45, C.red], [0.5, 0.9, C.yellow]]],
      ];
      rows.forEach(([y, segs]) => segs.forEach(([x, w, col]) => g.add(part(box(w, 0.26, 0.1), col, [x, y, 0.09]))));
      const head = new THREE.Group();
      head.add(part(box(0.05, 1.3, 0.12), C.red, [0, 0, 0], [0, 0, 0], false));
      head.add(part(new THREE.ConeGeometry(0.14, 0.2, 3), C.red, [0, 0.72, 0], [0, 0, Math.PI], false));
      head.position.z = 0.2; g.add(head); g.rotation.order = 'YXZ';
      return { g, tick: (d, now, i, vel, prog) => { head.position.x = -1.2 + (((prog * 3 + i * 0.37) % 1 + 1) % 1) * 2.4; } };
    };
    const builders = { camera: buildCamera, reel: buildReel, clapper: buildClapper, light: buildLight, editing: buildEditing };

    /* ---------- placement along the scroll path ---------- */
    const COUNT = mobile ? 5 : TYPES.length, SP = 9, L = COUNT * SP + 6;
    const items = [];
    for (let i = 0; i < COUNT; i++) {
      const { g, tick } = builders[TYPES[i]]();
      scene.add(g);
      items.push({ g, tick, i, z: -(i * SP + 3), side: i % 2 ? 1 : -1, y: ((i % 3) - 1) * 1.1, ph: Math.random() * 6 });
    }

    /* ---------- dust ---------- */
    const D = mobile ? 160 : 420, dp = new Float32Array(D * 3);
    for (let i = 0; i < D; i++) { dp[i * 3] = (Math.random() - 0.5) * 22; dp[i * 3 + 1] = (Math.random() - 0.5) * 14; dp[i * 3 + 2] = -Math.random() * L; }
    const dustGeo = new THREE.BufferGeometry(); dustGeo.setAttribute('position', new THREE.BufferAttribute(dp, 3));
    scene.add(new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: C.ink, size: mobile ? 0.06 : 0.045, transparent: true, opacity: 0.32, depthWrite: false })));

    /* ---------- sizing, scroll, pointer ---------- */
    let aspect = 1.6, baseSc = 1;
    const TAN = Math.tan((55 * Math.PI) / 360);
    const resize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight; if (!w || !h) return;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
      aspect = camera.aspect; baseSc = mobile ? 0.7 : 1;
      if (reduce) renderer.render(scene, camera);
    };
    const sizeObs = new ResizeObserver(resize); sizeObs.observe(canvas); resize();

    let max = 1, target = 0, prog = 0, vel = 0, spin = 0;
    const measure = () => { max = Math.max(1, document.documentElement.scrollHeight - innerHeight); };
    const onScroll = () => { target = Math.min(1, Math.max(0, scrollY / max)); };
    const bodyObs = new ResizeObserver(() => { measure(); onScroll(); }); bodyObs.observe(document.body);
    measure(); onScroll();
    const ptr = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
    const onMove = (ev) => { ptr.x = ev.clientX / innerWidth - 0.5; ptr.y = ev.clientY / innerHeight - 0.5; };
    addEventListener('scroll', onScroll, { passive: true });
    if (!mobile && !reduce) addEventListener('pointermove', onMove, { passive: true });

    const place = (now) => {
      const camZ = 6 - prog * (L - 6);
      camera.position.set(cur.x * 0.9, -cur.y * 0.6, camZ);
      camera.rotation.z = Math.sin(prog * 6) * 0.05;
      items.forEach((it) => {
        const d = camZ - it.z;                       // distance ahead of the camera
        it.g.visible = d > 5 && d < 36;              // never sit on top of the camera
        const bob = Math.sin(now * 0.0012 + it.ph) * 0.18;
        /* Keep props near the screen edges at every depth, drifting outward as they pass the camera. */
        const halfH = d * TAN, halfW = halfH * aspect;
        const f = 0.82 + Math.min(1, Math.max(0, (22 - d) / 22)) * 0.3 + Math.sin(now * 0.0004 + it.ph) * 0.03;
        it.g.position.set(it.side * halfW * f, (it.y / 1.1) * halfH * 0.5 + bob, it.z);
        it.g.scale.setScalar(baseSc * Math.min(1.9, 0.8 + d * 0.035));
        it.g.rotation.y = it.side * -0.7 + d * 0.16 + spin;
        it.g.rotation.x = 0.2 + Math.sin(d * 0.3 + it.ph) * 0.25;
        it.tick(d, now, it.i, vel, prog);
      });
    };

    let raf = 0, last = performance.now(), slow = 0;
    const draw = (now) => {
      raf = requestAnimationFrame(draw);
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const before = prog;
      prog += (target - prog) * (1 - Math.exp(-dt * 4));
      vel += ((Math.abs(prog - before) / Math.max(dt, 0.001)) - vel) * (1 - Math.exp(-dt * 6));
      spin += Math.sign(target - prog || 1) * vel * dt * 28;
      cur.x += (ptr.x - cur.x) * (1 - Math.exp(-dt * 3)); cur.y += (ptr.y - cur.y) * (1 - Math.exp(-dt * 3));
      place(now); renderer.render(scene, camera);
      slow = dt > 0.034 ? slow + 1 : Math.max(0, slow - 1);
      if (slow > 45 && renderer.getPixelRatio() > 1) { renderer.setPixelRatio(1); resize(); slow = 0; }
    };
    const onVis = () => { if (document.hidden) cancelAnimationFrame(raf); else { last = performance.now(); raf = requestAnimationFrame(draw); } };
    if (reduce) { place(0); renderer.render(scene, camera); } else { raf = requestAnimationFrame(draw); document.addEventListener('visibilitychange', onVis); }
    const lost = (ev) => ev.preventDefault(); canvas.addEventListener('webglcontextlost', lost);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('scroll', onScroll); removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVis); canvas.removeEventListener('webglcontextlost', lost);
      sizeObs.disconnect(); bodyObs.disconnect();
      scene.traverse((o) => { o.geometry?.dispose?.(); const m = o.material; if (m) (Array.isArray(m) ? m : [m]).forEach((x) => x.dispose()); });
      gm.dispose(); renderer.dispose();
    };
  }, []);
  return <canvas ref={ref} className="scene3d" aria-hidden="true" />;
}
