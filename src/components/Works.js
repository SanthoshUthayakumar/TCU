import '../styles/Works.css';
import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import img1 from '../assets/images/works/img1.png';
import img2 from '../assets/images/works/img2.png';
import img3 from '../assets/images/works/img3.png';
import img4 from '../assets/images/works/img4.png';
import img5 from '../assets/images/works/img5.png';
import img6 from '../assets/images/works/img6.png';

const projects = [
  {
    id: 2,
    title: 'Miss popular',
    client: '',
    category: 'SUNOSHINI',
    image: img2,
    gradient: 'linear-gradient(135deg, #0a1628, #2d6cdf)',
    size: 'normal',
  },
  {
    id: 3,
    title: 'WINNER',
    client: '',
    category: 'SUNOSHINI',
    image: img1,
    gradient: 'linear-gradient(135deg, #0a2818, #22c55e)',
    size: 'tall',
  },
  {
    id: 4,
    title: 'Instagram Campaign',
    client: '',
    category: 'SUNOSHINI',
    image: img3,
    gradient: 'linear-gradient(135deg, #2a1a0a, #f59e0b)',
    size: 'normal',
  },
  {
    id: 6,
    title: 'BK Catering',
    client: '',
    category: 'BK Catering',
    image: img5,
    gradient: 'linear-gradient(135deg, #0a1a2e, #ec4899)',
    size: 'normal',
  },
  {
    id: 7,
    title: 'Brand Marketing',
    client: '',
    category: 'BK Catering',
    image: img4,
    gradient: 'linear-gradient(135deg, #1e0a2e, #d946ef)',
    size: 'wide',
  },
  {
    id: 12,
    title: 'Photo Edits',
    client: '',
    category: 'Social Media',
    image: img6,
    gradient: 'linear-gradient(135deg, #2e1a0a, #FF5C35)',
    size: 'normal',
  },
];

const categories = ['All', 'SUNOSHINI', 'BK Catering', 'Social Media'];

/* ── Single Work Card ── */
const WorkCard = React.forwardRef(({ project, index }, ref) => {
  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`works-card works-card--${project.size}`}
      aria-label={`${project.title} by ${project.client}`}
    >
      <div className="works-card-bg" style={{ background: project.gradient }} />

      <img
        className="works-card-image"
        src={project.image}
        alt={`${project.title} — ${project.client}`}
        loading="lazy"
      />

      <div className="works-card-overlay">
        <span className="works-card-category">{project.category}</span>
        <h3 className="works-card-title">{project.title}</h3>
        <span className="works-card-client">{project.client}</span>
      </div>
    </motion.div>
  );
});

/* ── Works Section ── */
const Works = () => {
  const [filter, setFilter] = useState('All');

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });

  const filteredProjects = projects.filter(
    (project) => filter === 'All' || project.category === filter
  );

  return (
    <section id="works" className="works">
      <div className="works-container">
        <motion.div
          ref={headerRef}
          className="works-header"
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="works-title">Our <span className="accent-text">Works</span></h2>
          <p className="works-subtitle"></p>
        </motion.div>

        

        <motion.div
          className="works-page-links"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link to="/videography" className="works-page-link">
            <span>🎬</span>
            <div>
              <strong>Videography</strong>
              <small>View all videos & shoots</small>
            </div>
            <FiArrowRight />
          </Link>

          <Link to="/pr-work" className="works-page-link">
            <span>📢</span>
            <div>
              <strong>PR Work</strong>
              <small>View PR campaigns & events</small>
            </div>
            <FiArrowRight />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default Works;