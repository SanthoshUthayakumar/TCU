import React from 'react'
import { motion } from 'framer-motion'
import { FiCheck } from 'react-icons/fi'
import { about } from '../data.js'
import '../styles/About.css'
import logo1 from "./logo1.jpeg";

const useInView = (threshold = 0.2) => {
  const [isInView, setIsInView] = React.useState(false)
  const ref = React.useRef(null)
  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsInView(true)
    }, { threshold })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, isInView]
}

function About() {
  const [ref, inView] = useInView()

  return (
    <div className="about" ref={ref}>
      <div className="about-inner">
        {/* LEFT */}
        <div className="about-left">
          <motion.div
            className="section-label"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Who We Are
          </motion.div>

          <motion.h2
            className="about-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {about.heading.split(' ').slice(0, 2).join(' ')}<br />
            <span className="accent">{about.heading.split(' ').slice(2).join(' ')}</span>
          </motion.h2>

          <motion.p
            className="about-body"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {about.body}
          </motion.p>

          <motion.ul
            className="about-bullets"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {about.bullets.map((b, i) => (
              <motion.li
                key={i}
                className="about-bullet"
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
              >
                <span className="bullet-icon"><FiCheck /></span>
                <span>{b}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* RIGHT */}
        <motion.div
          className="about-right"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="about-visual">
            <div className="about-card-main">
              <div className="about-card-bg" />
              <div className="about-card-emoji">
                <div className='middlep'><img
                src={logo1}
                alt="TCU Logo"
                className="middlephoto"
              /></div></div>
              <div className="about-card-content">
                <h3>Tom Cinematic Universe </h3>
                <p>Visual Storyteller</p>
              </div>
            </div>
            <motion.div
              className="about-floating-badge"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            >
              5★<br />RATED
            </motion.div>
            <div className="about-tag">🏆 150+ Projects Done</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About
