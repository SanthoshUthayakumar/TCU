import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import ScrollProgress from './components/layout/ScrollProgress';
import Navbar from './components/layout/Navbar';
import BottomTabBar from './components/layout/BottomTabBar';
import Footer from './components/layout/Footer';
import FloatingContact from './components/layout/FloatingContact';
import PageTransition, { useRouteDirection } from './components/layout/PageTransition';
import BackToTop from './components/ui/BackToTop';
import TapSfx from './components/ui/TapSfx';
import ViewfinderCursor from './components/ui/ViewfinderCursor';
import useReducedMotion from './hooks/useReducedMotion';
import useSmoothScroll from './hooks/useSmoothScroll';
import { scrollToTop } from './utils/scroll';
import Home from './pages/Home';
import Work from './pages/Work';
import ProjectDetails from './pages/ProjectDetails';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import BackButton from './components/layout/BackButton';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

/* three.js is only downloaded after first paint, and never on very weak devices. */
const Scene3D = lazy(() => import('./components/Scene3D'));

export default function App() {
  const location = useLocation();
  const reduced = useReducedMotion();
  const dir = useRouteDirection(location.pathname);
  const [scene, setScene] = useState(false);

  useSmoothScroll();

  useEffect(() => {
    const weak = (navigator.deviceMemory && navigator.deviceMemory <= 2) || navigator.hardwareConcurrency <= 2;
    if (weak) return undefined;
    const idle = 'requestIdleCallback' in window;
    const id = idle ? requestIdleCallback(() => setScene(true), { timeout: 1500 }) : setTimeout(() => setScene(true), 800);
    return () => (idle ? cancelIdleCallback(id) : clearTimeout(id));
  }, []);

  useEffect(() => {
    if (reduced) scrollToTop(true);
  }, [location.pathname, reduced]);

  const routes = (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/work" element={<Work />} />
      <Route path="/work/:slug" element={<ProjectDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/journal" element={<Navigate to="/gallery" replace />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollProgress />
      {scene && <Suspense fallback={null}><Scene3D /></Suspense>}
      <Navbar />
      <main id="main" className="app-main">
        <BackButton />
        {reduced ? (
          routes
        ) : (
          <AnimatePresence mode="wait" custom={dir} initial={false} onExitComplete={() => scrollToTop(true)}>
            <PageTransition key={location.pathname} dir={dir}>{routes}</PageTransition>
          </AnimatePresence>
        )}
      </main>
      <Footer />
      <BottomTabBar />
      <FloatingContact />
      <BackToTop />
      <TapSfx />
      <ViewfinderCursor />
    </>
  );
}
