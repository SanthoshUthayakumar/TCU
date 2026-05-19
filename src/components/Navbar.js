import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { company } from '../data.js'
import '../styles/Navbar.css'
import logo from "./logo.png";
const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Packages', href: '#packages' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
      const sections = ['home', 'about', 'packages', 'contact']
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const whatsappUrl = `https://wa.me/${company.whatsapp}?text=Hi%2C%20I%20want%20to%20book%20a%20shoot%20with%20TCU crewz.`

  return (
    <>
      <div className="noise-overlay" />
      <motion.nav
        className={`navbar${scrolled ? ' scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <a className="navbar-logo" href="#home" onClick={(e) => { e.preventDefault(); handleNav('#home') }}>
          <div className="navbar-logo-icon"><img
            src={logo}
            alt="TCU Logo"
            className="brand-core-logo"
          /></div>
          <span className="navbar-logo-name">T<span>c</span>U</span>
        </a>

        <ul className="navbar-nav">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={active === link.href.slice(1) ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar-cta">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary navbar-book"
          >
            <span>Book Now</span>
          </a>
        </div>

        <button className={`hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={(e) => { e.preventDefault(); handleNav(link.href) }}>
                {link.label}
              </a>
            ))}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ justifyContent: 'center' }}>
              <span>Book Now</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
