import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar.js';
import Hero from './components/Hero.js';
import About from './components/About.js';
import Packages from './components/Packages.js';
import Contact from './components/Contact.js';
import Footer from './components/Footer.js';
import Loader from './components/Loader.js';
import Services from './components/Services.js';
import Work from './components/Works.js';
import Videography from './components/Videography.js';
import PrWork from './components/PrWork.js';

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loader onFinish={() => setLoading(false)} />;
  }

  return (
    <div className="app">
      <Navbar />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section id="home">
                  <Hero />
                </section>
                
                <section id="Works">
                  <Work />
                </section>

                <section id="services">
                  <Services />
                </section>

                <section id="about">
                  <About />
                </section>

                <section id="packages">
                  <Packages />
                </section>

                <section id="contact">
                  <Contact />
                </section>
              </>
            }
          />

          <Route
            path="/videography"
            element={<Videography />}
          />

          <Route
            path="/pr-work"
            element={<PrWork />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;