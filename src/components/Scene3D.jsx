import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* A tunnel (hero only) of thin film-frame outlines. The camera travels down it and banks as the page scrolls.
   Flat line colour only: no gradients, no fog, no textures. */
export default function Scene3D() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = matchMedia('(max-width: 767px), (pointer: coarse)').matches;
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !mobile, powerPreference: 'low-power' }); } catch { return undefined; }
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.5 : 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 120);
    const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(3.2, 1.8, 0.04));
    const navy = new THREE.LineBasicMaterial({ color: 0xedeae2, transparent: true, opacity: 0.22 });
    const brass = new THREE.LineBasicMaterial({ color: 0xc9a961, transparent: true, opacity: 0.55 });

    const N = mobile ? 14 : 24;
    const group = new THREE.Group();
    for (let i = 0; i < N; i += 1) {
      const m = new THREE.LineSegments(edges, i % 6 === 0 ? brass : navy);
      const a = i * 0.72;
      m.position.set(Math.cos(a) * 4.2, Math.sin(a) * 2.6, -i * 3.2);
      m.rotation.set(Math.sin(a) * 0.35, Math.cos(a) * 0.5, a * 0.3);
      group.add(m);
    }
    scene.add(group);

    const resize = () => {
      const w = innerWidth; const h = innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    };
    resize();
    addEventListener('resize', resize);

    let target = 0; let cur = 0; let raf = 0; let t = 0;
    const onScroll = () => {
      target = Math.min(1, scrollY / (innerHeight * 1.6));
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });

    const draw = () => {
      cur += (target - cur) * 0.06;
      t += 0.004;
      camera.position.z = 4 - cur * (N * 3.2 - 14);
      camera.rotation.z = cur * 1.4;
      camera.position.x = Math.sin(cur * 6) * 0.8;
      group.rotation.z = reduce ? 0 : Math.sin(t) * 0.04;
      renderer.render(scene, camera);
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();
    if (reduce) { addEventListener('scroll', draw, { passive: true }); }

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('resize', resize);
      removeEventListener('scroll', onScroll);
      removeEventListener('scroll', draw);
      edges.dispose(); navy.dispose(); brass.dispose(); renderer.dispose();
    };
  }, []);
  return <canvas ref={ref} className="hero__scene" aria-hidden="true" />;
}
