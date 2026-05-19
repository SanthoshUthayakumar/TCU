import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar.js';
import Hero from './components/Hero.js';
import About from './components/About.js';
import Packages from './components/Packages.js';
import Contact from './components/Contact.js';
import Footer from './components/Footer.js';
import Loader from './components/Loader.js';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loading animation for 2.5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Show loader first
  if (loading) {
    return <Loader />;
  }

  // Show main website after loading
  return (
    <div className="app">
      <Navbar />

      <main>
        <section id="home">
          <Hero />
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
      </main>

      <Footer />
    </div>
  );
}

export default App;