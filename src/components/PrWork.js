import '../styles/PrWork.css';
import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import img1 from '../assets/images/works/img1.png';
import img2 from '../assets/images/works/img2.png';
import img3 from '../assets/images/works/img3.png';
import img4 from '../assets/images/works/img4.png';
import img5 from '../assets/images/works/img5.png';
import img6 from '../assets/images/works/img6.png';
import nexa from '../assets/images/works/nexa.webp';
import nexa1 from '../assets/images/works/nexa1.webp';

const imageProjects = [
  { id: 21, title: 'Brand Marketing', category: 'NEXA', image: nexa1, gradient: 'linear-gradient(135deg, #1e0a2e, #d946ef)', size: 'tall' },
  { id: 20, title: 'Nexa', category: 'NEXA', image: nexa, gradient: 'linear-gradient(135deg, #0a1628, #2d6cdf)', size: 'normal' },
  { id: 2, title: 'Miss popular', category: 'SUNOSHINI', image: img2, gradient: 'linear-gradient(135deg, #0a1628, #2d6cdf)', size: 'tall' },
  { id: 3, title: 'WINNER', category: 'SUNOSHINI', image: img1, gradient: 'linear-gradient(135deg, #0a2818, #22c55e)', size: 'tall' },
  { id: 4, title: 'Instagram Campaign', category: 'SUNOSHINI', image: img3, gradient: 'linear-gradient(135deg, #2a1a0a, #f59e0b)', size: 'normal' },
  { id: 6, title: 'BK Catering', category: 'BK Catering', image: img5, gradient: 'linear-gradient(135deg, #0a1a2e, #ec4899)', size: 'normal' },
  { id: 7, title: 'Brand Marketing', category: 'BK Catering', image: img4, gradient: 'linear-gradient(135deg, #1e0a2e, #d946ef)', size: 'wide' },
  { id: 12, title: 'Photo Edits', category: 'Social Media', image: img6, gradient: 'linear-gradient(135deg, #2e1a0a, #FF5C35)', size: 'normal' },
];

const categories = ['All', 'SUNOSHINI', 'BK Catering','NEXA', 'Social Media'];

const ImageCard = React.forwardRef(({ project, index }, ref) => {
  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`pr-card pr-card--${project.size}`}
      aria-label={project.title}
    >
      <div className="pr-card-bg" style={{ background: project.gradient }} />
      <img
        className="pr-card-image"
        src={project.image}
        alt={project.title}
        loading="lazy"
      />
      <div className="pr-card-overlay">
        <span className="pr-card-category">{project.category}</span>
        <h3 className="pr-card-title">{project.title}</h3>
      </div>
    </motion.div>
  );
});

const PrWork = () => {
  const [filter, setFilter] = useState('All');
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });

  const filteredProjects = imageProjects.filter(
    (project) => filter === 'All' || project.category === filter
  );

  return (
    <section className="pr-work-page">
      <div className="pr-work-container">
        <Link to="/" className="back-link">
          <FiArrowLeft /> Back to Home
        </Link>

        <motion.div
          ref={headerRef}
          className="pr-work-header"
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="pr-work-title">
            PR <span className="accent-text">Work</span>
          </h1>
          <p className="pr-work-subtitle">Campaigns, brand marketing, and standout moments.</p>
        </motion.div>

        <motion.div
          className="pr-work-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className={`pr-work-filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="pr-work-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ImageCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default PrWork;