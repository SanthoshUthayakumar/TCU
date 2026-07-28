import '../styles/Works.css';
import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiPlay, FiPause, FiVolume2, FiVolumeX } from 'react-icons/fi';
import img1 from '../assets/images/works/img1.png';
import img2 from '../assets/images/works/img2.png';
import img3 from '../assets/images/works/img3.png';
import img5 from '../assets/images/works/img5.png';
import img4 from '../assets/images/works/img4.png';
import vid1 from '../assets/videos/vid1.mp4';
import vid2 from '../assets/videos/vid2.mp4';
import vid3 from '../assets/videos/vid3.mp4';
/*
 * ──────────────────────────────────────────────
 *  HOW TO ADD YOUR OWN VIDEOS & IMAGES
 * ──────────────────────────────────────────────
 *  Videos → place in:  src/assets/videos/
 *  Images → place in:  src/assets/images/works/
 *
 *  Then import them below and assign to the
 *  matching project in the array.
 * ──────────────────────────────────────────────
 */

/* ── Import your videos here ── */
// ../assets/videos/IMG_8422.jpg
// import instagramVideo from '../../assets/videos/instagram-campaign.mp4';
// import corporateGalaVideo from '../../assets/videos/corporate-gala.mp4';
// import musicVideoClip from '../../assets/videos/music-video.mp4';
// import socialReelVideo from '../../assets/videos/social-reel.mp4';

/* ── Import your images here ── */
// import celebriteShoot from '../../assets/images/works/celebrity-shoot.jpg';
// import productLaunch from '../../assets/images/works/product-launch.jpg';
// import brandIdentity from '../../assets/images/works/brand-identity.jpg';

const projects = [
  {
    id: 1,
    title: 'MGM Title Winner 2026',
    client: '',
    category: 'SUNOSHINI',
    type: 'video',
    video: vid1,            // ← replace null with: brandFilmVideo
    gradient: 'linear-gradient(135deg, #1a0a2e, #FF5C35)',
    size: 'large',
  },
  {
    id: 2,
    title: 'Miss popular',
    client: '',
    category: 'SUNOSHINI',
    type: 'image',
    image: img2,            // ← replace null with: celebriteShoot
    gradient: 'linear-gradient(135deg, #0a1628, #2d6cdf)',
    size: 'normal',
  },
  {
    id: 3,
    title: 'WINNER',
    client: '',
    category: 'SUNOSHINI',
    type: 'image',
    image: img1,            // ← replace null with: productLaunch
    gradient: 'linear-gradient(135deg, #0a2818, #22c55e)',
    size: 'tall',
  },
  {
    id: 4,
    title: 'Instagram Campaign',
    client: '',
    category: 'SUNOSHINI',
    type: 'image',
    image: img3,            // ← replace null with: instagramVideo
    gradient: 'linear-gradient(135deg, #2a1a0a, #f59e0b)',
    size: 'normal',
  },
  {
    id: 5,
    title: 'Catering videography',
    client: '',
    category: 'BK Catering',
    type: 'video',
    video: vid2,            // ← replace null with: corporateGalaVideo
    gradient: 'linear-gradient(135deg, #1a0a2e, #a855f7)',
    size: 'tall',
  },
  {
    id: 6,
    title: 'BK Catering',
    client: '',
    category: 'BK Catering',
    type: 'image',
    image: img5,            // ← replace null with: musicVideoClip
    gradient: 'linear-gradient(135deg, #0a1a2e, #ec4899)',
    size: 'normal',
  },
  {
    id: 7,
    title: 'Brand Marketing',
    client: '',
    category: 'BK Catering',
    type: 'image',
    image: img4,            // ← replace null with: brandIdentity
    gradient: 'linear-gradient(135deg, #1e0a2e, #d946ef)',
    size: 'wide',
  },
  {
    id: 8,
    title: 'Social Media Reel',
    client: 'StreetBites',
    category: 'Social Media',
    type: 'video',
    video: null,            // ← replace null with: socialReelVideo
    gradient: 'linear-gradient(135deg, #2e1a0a, #FF5C35)',
    size: 'wide',
  },
  {
    id: 9,
    title: 'Social Media Reel',
    client: '',
    category: 'Social Media',
    type: 'video',
    video: vid3,            // ← replace null with: socialReelVideo
    gradient: 'linear-gradient(135deg, #2e1a0a, #FF5C35)',
    size: 'tall',
  },
];

const categories = ['All', 'SUNOSHINI', 'BK Catering', 'Social Media'];

/* ── Single Work Card ── */
const WorkCard = ({ project, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const handlePlay = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  const handleMuteToggle = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`works-card works-card--${project.size} ${isPlaying ? 'works-card--playing' : ''}`}
      aria-label={`${project.title} by ${project.client}`}
    >
      <div className="works-card-bg" style={{ background: project.gradient }} />

      {project.type === 'video' && (
        <>
          {project.video && (
            <video
              ref={videoRef}
              className="works-card-video"
              src={project.video}
              muted={isMuted}
              loop
              playsInline
              preload="metadata"
              onEnded={handleVideoEnd}
            />
          )}

          <div className="works-video-controls">
            <button
              className={`works-play-btn ${isPlaying ? 'works-play-btn--playing' : ''}`}
              onClick={handlePlay}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? <FiPause /> : <FiPlay />}
            </button>

            <button
              className="works-mute-btn"
              onClick={handleMuteToggle}
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? <FiVolumeX /> : <FiVolume2 />}
            </button>
          </div>
        </>
      )}

      {project.type === 'image' && project.image && (
        <img
          className="works-card-image"
          src={project.image}
          alt={`${project.title} — ${project.client}`}
          loading="lazy"
        />
      )}

      <div className={`works-card-overlay ${isPlaying ? 'works-card-overlay--dim' : ''}`}>
        <span className="works-card-category">{project.category}</span>
        <h3 className="works-card-title">{project.title}</h3>
        <span className="works-card-client">{project.client}</span>
      </div>
    </motion.div>
  );
};

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
          <p className="works-subtitle">
          </p>
        </motion.div>

        <motion.div
          className="works-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className={`works-filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="works-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <WorkCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Works;