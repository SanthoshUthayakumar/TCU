import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaWhatsapp, FaInstagram, FaYoutube, FaFacebook, FaEnvelope } from 'react-icons/fa'
import { contactLinks, company } from '../data.js'
import '../styles/Contact.css'

const iconMap = {
  whatsapp: FaWhatsapp,
  instagram: FaInstagram,
  youtube: FaYoutube,
  facebook: FaFacebook,
  email: FaEnvelope,
}

function Contact() {
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold: 0.15 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const waUrl = `https://wa.me/${company.whatsapp}?text=Hi%2C%20let%27s%20work%20together!`

  return (
    <div className="contact" ref={ref}>
      <div className="contact-bg" />
      <div className="contact-inner">
        <div className="contact-header">
          <motion.div
            className="section-label"
            style={{ justifyContent: 'center' }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Get In Touch
          </motion.div>
          <motion.h2
            className="contact-title"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            FIND US <span>EVERYWHERE</span>
          </motion.h2>
          <motion.p
            className="contact-subtitle"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Reach out through any platform — we respond fast.
          </motion.p>
        </div>

        <div className="contact-grid">
          {contactLinks.map((link, i) => {
            const Icon = iconMap[link.icon]
            return (
              <motion.a
  key={link.label}
  href={link.url}
  // Open email links in the same tab so the default mail app is triggered
  target={link.url.startsWith('mailto:') ? '_self' : '_blank'}
  rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
  className="contact-card"
  style={{ '--card-color': link.color }}
  initial={{ opacity: 0, y: 24 }}
  animate={inView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
>
  <div className="contact-card-icon">
    <Icon />
  </div>
  <span className="contact-card-label">{link.label}</span>
  <span className="contact-card-value">{link.value}</span>
</motion.a>
            )
          })}
        </div>

        <motion.div
          className="contact-cta"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <div className="contact-cta-content">
            <p className="contact-cta-eyebrow">Ready to Create?</p>
            <h3>LET'S WORK <span>TOGETHER</span></h3>
            <p>Your brand deserves visuals that stop the scroll. Let's build something extraordinary.</p>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-flex' }}>
              <FaWhatsapp style={{ fontSize: '1.1rem' }} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact
