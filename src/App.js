import React from 'react'
import Navbar from './components/Navbar.js'
import Hero from './components/Hero.js'
import About from './components/About.js'
import Packages from './components/Packages.js'
import Contact from './components/Contact.js'
import Footer from './components/Footer.js'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <section id="home"><Hero /></section>
        <section id="about"><About /></section>
        <section id="packages"><Packages /></section>
        <section id="contact"><Contact /></section>
      </main>
      <Footer />
    </div>
  )
}

export default App
