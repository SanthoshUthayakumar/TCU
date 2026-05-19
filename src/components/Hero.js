import React from 'react'
import { motion } from 'framer-motion'
import { FaInstagram, FaWhatsapp, FaPhoneAlt } from 'react-icons/fa'
import { company } from '../data.js'
import '../styles/Hero.css'
import logo from "./logo.png";
import { label } from 'framer-motion/client'

const socials = [
  { icon: FaInstagram, href: company.instagram, label: 'Instagram' },
  { icon: FaWhatsapp, href: `https://wa.me/${company.whatsapp}`, label: 'WhatsApp' },
  { icon: FaPhoneAlt, href: `tel:${company.phone}`, label: 'Call' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

function Hero() {
  const whatsappUrl = `https://wa.me/${company.whatsapp}?text=Hi%2C%20I%20want%20to%20book%20a%20shoot%20with%20TCU CREWZ.`

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="hero">
      <div className="hero-bg">
        <div className="hero-bg-gradient" />
        <div className="hero-grid" />
      </div>

      <div className="hero-content">
        {/* LEFT */}
        <div className="hero-left">
          <motion.div {...fadeUp(0.1)} className="section-label">
            Premium Visual Storytelling
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="hero-badge">
            Available for bookings
          </motion.div>

          <motion.h1 {...fadeUp(0.3)} className="hero-title">
            TOM<br />
            <span className="line-accent">CINEMATIC</span><br />
            UNIVERSE
          </motion.h1>

          <motion.p {...fadeUp(0.45)} className="hero-subtitle">
            {company.tagline}
          </motion.p>

          <motion.div {...fadeUp(0.55)} className="hero-actions">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <FaWhatsapp style={{ fontSize: '1.1rem' }} />
              <span>Book Now on WhatsApp</span>
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.65)} style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span className="hero-socials-label">Follow Us</span>
            <div className="hero-socials">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label={label}>
                  <Icon />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="hero-badge-ring">
            <motion.div
              className="ring ring-1"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="ring ring-2"
              animate={{ rotate: -360 }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="ring ring-3"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            />
            <div className="ring-dot ring-dot-1" />
            <div className="ring-dot ring-dot-2" />
            <div className="ring-dot ring-dot-3" />

            <motion.div
  className="brand-core"
  animate={{ y: [0, -10, 0] }}
  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
>
  {/* Replace emoji with your logo image */}
  <img
  src={logo}
  alt="TCU Logo"
  className="brand-core-logo"
/>

  <span className="brand-core-text">TCU</span>
  <span className="brand-core-sub">PRODUCT</span>
</motion.div>
            <motion.div
              className="floating-stat floating-stat-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <span className="stat-num">150+</span>
              <span className="stat-label">Happy<br />Clients</span>
            </motion.div>

            <motion.div
              className="floating-stat floating-stat-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <span className="stat-num">2+</span>
              <span className="stat-label">Years<br />Experience</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* SCROLL INDICATOR 
      <motion.div
        className="scroll-indicator"
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <span className="scroll-indicator-text">Scroll</span>
        <div className="scroll-mouse">
          <motion.div
            className="scroll-dot"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div> */}
    </div>
  )
}

export default Hero
