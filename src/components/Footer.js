import React from 'react'
import { FaInstagram, FaWhatsapp, FaYoutube, FaFacebook } from 'react-icons/fa'
import { company } from '../data.js'
import '../styles/Footer.css'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Packages', href: '#packages' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { icon: FaInstagram, href: company.instagram, label: 'Instagram' },
  { icon: FaWhatsapp, href: `https://wa.me/${company.whatsapp}`, label: 'WhatsApp' },
  
]

function Footer() {
  const handleNav = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <a className="footer-logo" href="#home" onClick={(e) => { e.preventDefault(); handleNav('#home') }}>
            
            <span className="footer-logo-name">Tom<span> Cinematic Universe</span></span>
          </a>
          <p className="footer-tagline">
            Professional mobile videography and cinematic Instagram reel editing for brands, events, and creators.
          </p>
          <div className="footer-socials">
            {socials.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label={label}>
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={(e) => { e.preventDefault(); handleNav(link.href) }}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <ul className="footer-links">
            <li><a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            <li><a href={company.instagram} target="_blank" rel="noopener noreferrer">Instagram DM</a></li>
            <li><a href={`mailto:${company.email}`}>{company.email}</a></li>
          </ul>
        </div>
      </div>

      
    </footer>
  )
}

export default Footer
