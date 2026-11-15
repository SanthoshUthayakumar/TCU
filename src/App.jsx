import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ScrollProgress from './components/layout/ScrollProgress';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingContact from './components/layout/FloatingContact';
import PageTransition, { useRouteDirection } from './components/layout/PageTransition';
import BackToTop from './components/ui/BackToTop';
import useReducedMotion from './hooks/useReducedMotion';
import useSmoothScroll from './hooks/useSmoothScroll';
import { scrollToTop } from './utils/scroll';
import Home from './pages/Home';
import Work from './pages/Work';
import ProjectDetails from './pages/ProjectDetails';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
  const location = useLocation();
  const reduced = useReducedMotion();
  const dir = useRouteDirection(location.pathname);

  useSmoothScroll();

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
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollProgress />
      <Navbar />
      <main id="main" className="app-main">
        {reduced ? (
          routes
        ) : (
          <AnimatePresence mode="wait" custom={dir} initial={false} onExitComplete={() => scrollToTop(true)}>
            <PageTransition key={location.pathname} dir={dir}>{routes}</PageTransition>
          </AnimatePresence>
        )}
      </main>
      <Footer />
      <FloatingContact />
      <BackToTop />
    </>
  );
}
