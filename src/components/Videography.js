import '../styles/Videography.css';
import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import vid1 from '../assets/videos/vid1.mp4';
import vid2 from '../assets/videos/vid2.mp4';
import vid3 from '../assets/videos/vid3.mp4';
import vid4 from '../assets/videos/vid4.mp4';
import vid5 from '../assets/videos/vid5.mp4';
import vid6 from '../assets/videos/vid6.mp4';
import vid8 from '../assets/videos/vid8.mp4';

const videoProjects = [
  { id: 1, title: 'MGM Title Winner 2026', category: 'SUNOSHINI', video: vid1, gradient: 'linear-gradient(135deg, #1a0a2e, #FF5C35)', size: 'large' },
  { id: 5, title: 'Catering videography', category: 'BK Catering', video: vid2, gradient: 'linear-gradient(135deg, #1a0a2e, #a855f7)', size: 'tall' },
  { id: 12, title: 'Celebritity Edit', category: 'Social Media', video: vid8, gradient: 'linear-gradient(135deg, #2e1a0a, #FF5C35)', size: 'tall' },
  { id: 8, title: 'Wedding Edit', category: 'Events', video: vid6, gradient: 'linear-gradient(135deg, #2e1a0a, #FF5C35)', size: 'wide' },
  { id: 9, title: 'Social Media Reel', category: 'Social Media', video: vid3, gradient: 'linear-gradient(135deg, #2e1a0a, #FF5C35)', size: 'tall' },
  { id: 10, title: 'Birthday Edit', category: 'Events', video: vid4, gradient: 'linear-gradient(135deg, #2e1a0a, #FF5C35)', size: 'tall' },
  { id: 11, title: 'Candid Edit', category: 'Social Media', video: vid5, gradient: 'linear-gradient(135deg, #2e1a0a, #FF5C35)', size: 'tall' },
  
];

const categories = ['All', 'SUNOSHINI', 'BK Catering', 'Social Media', 'Events'];

const VideoCard = React.forwardRef(({ project, index }, ref) => {
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

  const handleVideoEnd = () => setIsPlaying(false);

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`video-card video-card--${project.size} ${isPlaying ? 'video-card--playing' : ''}`}
      aria-label={project.title}
    >
      <div className="video-card-bg" style={{ background: project.gradient }} />

      <video
        ref={videoRef}
        className="video-card-video"
        src={project.video}
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        onEnded={handleVideoEnd}
      />

      <div className="video-controls">
        <button
          className={`video-play-btn ${isPlaying ? 'video-play-btn--playing' : ''}`}
          onClick={handlePlay}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? <FiPause /> : <FiPlay />}
        </button>
        <button
          className="video-mute-btn"
          onClick={handleMuteToggle}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <FiVolumeX /> : <FiVolume2 />}
        </button>
      </div>

      <div className={`video-card-overlay ${isPlaying ? 'video-card-overlay--dim' : ''}`}>
        <span className="video-card-category">{project.category}</span>
        <h3 className="video-card-title">{project.title}</h3>
      </div>
    </motion.div>
  );
});

const Videography = () => {
  const [filter, setFilter] = useState('All');
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });

  const filteredProjects = videoProjects.filter(
    (project) => filter === 'All' || project.category === filter
  );

  return (
    <section className="videography-page">
      <div className="videography-container">
        <Link to="/" className="back-link">
          <FiArrowLeft /> Back to Home
        </Link>

        <motion.div
          ref={headerRef}
          className="videography-header"
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="videography-title">
            Videography <span className="accent-text">Showcase</span>
          </h1>
          <p className="videography-subtitle"></p>
        </motion.div>

        <motion.div
          className="videography-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className={`videography-filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="videography-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <VideoCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Videography;